const ACCESS_KEYS_TTL_MS = 5 * 60 * 1000;
let cachedKeys;
let cachedKeysUntil = 0;

export async function authenticateAccessRequest(request, env) {
  const assertion = request.headers.get("cf-access-jwt-assertion");
  if (!assertion) return { error: "Sign in with your organization account to continue.", status: 401 };
  if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) {
    return { error: "Cloudflare Access is not configured for this environment.", status: 503 };
  }

  try {
    const claims = await verifyAccessToken(assertion, env);
    const email = String(claims.email || "").trim().toLowerCase();
    const id = String(claims.sub || email).trim();
    if (!email) throw new Error("Access token is missing an email.");
    return { user: { id, email, name: String(claims.name || email) } };
  } catch (error) {
    console.error("Cloudflare Access assertion verification failed.", error);
    return { error: "Your sign-in could not be verified. Please sign in again.", status: 401 };
  }
}

async function verifyAccessToken(token, env) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT format.");

  const header = JSON.parse(decodeBase64Url(parts[0]));
  const claims = JSON.parse(decodeBase64Url(parts[1]));
  const issuer = normalizeIssuer(env.ACCESS_TEAM_DOMAIN);
  const audience = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  const now = Math.floor(Date.now() / 1000);

  if (header.alg !== "RS256" || typeof header.kid !== "string") {
    throw new Error("Unsupported JWT signing algorithm.");
  }
  if (claims.iss !== issuer) throw new Error("JWT issuer does not match.");
  if (!audience.includes(env.ACCESS_AUD)) throw new Error("JWT audience does not match.");
  if (!Number.isFinite(claims.exp) || claims.exp <= now) throw new Error("JWT has expired.");
  if (Number.isFinite(claims.nbf) && claims.nbf > now) throw new Error("JWT is not yet valid.");

  const keys = await getAccessKeys(issuer);
  const jwk = keys.find((key) => key.kid === header.kid && key.kty === "RSA");
  if (!jwk) throw new Error("JWT signing key was not found.");

  const publicKey = await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const signatureValid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    publicKey,
    decodeBase64UrlBytes(parts[2]),
    new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
  );
  if (!signatureValid) throw new Error("JWT signature is invalid.");
  return claims;
}

async function getAccessKeys(issuer) {
  if (cachedKeys && Date.now() < cachedKeysUntil) return cachedKeys;
  const response = await fetch(`${issuer}/cdn-cgi/access/certs`, {
    headers: { Accept: "application/json" },
    cf: { cacheTtl: 300, cacheEverything: true }
  });
  if (!response.ok) throw new Error(`Cloudflare Access key request failed (${response.status}).`);
  const data = await response.json();
  if (!Array.isArray(data.keys) || data.keys.length === 0) {
    throw new Error("Cloudflare Access returned no signing keys.");
  }
  cachedKeys = data.keys;
  cachedKeysUntil = Date.now() + ACCESS_KEYS_TTL_MS;
  return cachedKeys;
}

function normalizeIssuer(value) {
  const normalized = String(value).trim().replace(/\/+$/, "");
  return normalized.startsWith("https://") ? normalized : `https://${normalized}`;
}

function decodeBase64Url(value) {
  return new TextDecoder().decode(decodeBase64UrlBytes(value));
}

function decodeBase64UrlBytes(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(normalized + "=".repeat((4 - normalized.length % 4) % 4));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

export async function ensureUser(context) {
  const user = context.data?.user;
  if (!user) throw new Error("Authenticated user is required.");
  await context.env.DB.prepare(`
    INSERT INTO users (id, email, name, last_seen_at)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET
      email = excluded.email,
      name = excluded.name,
      last_seen_at = CURRENT_TIMESTAMP
  `).bind(user.id, user.email, user.name).run();
  return user;
}

export async function getOrganizationMembership(context, organizationId) {
  const user = await ensureUser(context);
  return context.env.DB.prepare(`
    SELECT m.organization_id, m.role, o.name, o.slug
    FROM organization_members m
    JOIN organizations o ON o.id = m.organization_id
    WHERE m.user_id = ? AND m.organization_id = ? AND o.is_sample = 0
  `).bind(user.id, organizationId).first();
}

export function jsonResponse(value, status = 200) {
  return Response.json(value, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

export async function readJson(request) {
  try {
    return { body: await request.json() };
  } catch {
    return { error: jsonResponse({ error: "Invalid JSON request body" }, 400) };
  }
}
