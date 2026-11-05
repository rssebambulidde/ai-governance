import { ensureUser, getOrganizationMembership, jsonResponse, readJson } from "../../_lib/auth.js";

export async function onRequestGet(context) {
  const organizationId = new URL(context.request.url).searchParams.get("organizationId");
  if (!organizationId) return jsonResponse({ error: "Select a company workspace first." }, 400);
  const membership = await getOrganizationMembership(context, organizationId);
  if (!membership) return jsonResponse({ error: "Company workspace not found." }, 404);
  if (!["owner", "admin"].includes(membership.role)) {
    return jsonResponse({ error: "Only workspace owners and admins can view membership details." }, 403);
  }

  const [membersResult, invitationsResult] = await Promise.all([
    context.env.DB.prepare(`
      SELECT u.name, u.email, m.role, m.joined_at
      FROM organization_members m
      JOIN users u ON u.id = m.user_id
      WHERE m.organization_id = ?
      ORDER BY CASE m.role WHEN 'owner' THEN 0 WHEN 'admin' THEN 1 ELSE 2 END, u.name COLLATE NOCASE
    `).bind(organizationId).all(),
    context.env.DB.prepare(`
      SELECT invited_email, role, expires_at, accepted_at, created_at
      FROM organization_invitations
      WHERE organization_id = ?
      ORDER BY created_at DESC
      LIMIT 50
    `).bind(organizationId).all()
  ]);
  const now = Date.now();
  const invitations = (invitationsResult.results || [])
    .filter(invitation => !invitation.accepted_at)
    .map(invitation => ({
      email: invitation.invited_email,
      role: invitation.role,
      expiresAt: invitation.expires_at,
      status: Date.parse(invitation.expires_at) > now ? "Pending" : "Expired"
    }));
  return jsonResponse({
    members: membersResult.results || [],
    invitations
  });
}

export async function onRequestPost(context) {
  const parsed = await readJson(context.request);
  if (parsed.error) return parsed.error;
  const organizationId = String(parsed.body?.organizationId || "").trim();
  const email = String(parsed.body?.email || "").trim().toLowerCase();
  const role = parsed.body?.role;
  if (!organizationId) return jsonResponse({ error: "Company workspace is required." }, 400);
  if (!["editor", "viewer"].includes(role)) {
    return jsonResponse({ error: "Invitation role must be editor or viewer." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return jsonResponse({ error: "Enter a valid colleague email address." }, 400);
  }

  const membership = await getOrganizationMembership(context, organizationId);
  if (!membership || !["owner", "admin"].includes(membership.role)) {
    return jsonResponse({ error: "Only workspace owners and admins can invite colleagues." }, 403);
  }
  const user = await ensureUser(context);
  const existing = await context.env.DB.prepare(`
    SELECT 1 FROM organization_members m
    JOIN users u ON u.id = m.user_id
    WHERE m.organization_id = ? AND u.email = ?
  `).bind(organizationId, email).first();
  if (existing) return jsonResponse({ error: "This person is already a member of the workspace." }, 409);

  const token = randomToken();
  const tokenHash = await hashToken(token);
  const invitationId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  await context.env.DB.batch([
    context.env.DB.prepare(`
      INSERT INTO organization_invitations (
        id, organization_id, invited_email, role, token_hash, invited_by, expires_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(invitationId, organizationId, email, role, tokenHash, user.id, expiresAt),
    context.env.DB.prepare(`
      INSERT INTO audit_events (id, organization_id, actor_user_id, action, target_type, target_id, details_json)
      VALUES (?, ?, ?, 'invited', 'invitation', ?, ?)
    `).bind(crypto.randomUUID(), organizationId, user.id, invitationId, JSON.stringify({ email, role }))
  ]);

  const inviteUrl = new URL(context.request.url);
  inviteUrl.pathname = "/";
  inviteUrl.search = "";
  inviteUrl.hash = "";
  inviteUrl.searchParams.set("invite", token);
  return jsonResponse({ invitationUrl: inviteUrl.toString(), email, role, expiresAt }, 201);
}

export async function onRequestPut(context) {
  const parsed = await readJson(context.request);
  if (parsed.error) return parsed.error;
  const token = String(parsed.body?.token || "").trim();
  if (!token || token.length > 200) return jsonResponse({ error: "Invitation token is required." }, 400);

  const user = await ensureUser(context);
  const tokenHash = await hashToken(token);
  const invitation = await context.env.DB.prepare(`
    SELECT id, organization_id, invited_email, role
    FROM organization_invitations
    WHERE token_hash = ? AND accepted_at IS NULL AND julianday(expires_at) > julianday('now')
  `).bind(tokenHash).first();
  if (!invitation) return jsonResponse({ error: "This invitation is invalid, expired, or already used." }, 404);
  if (invitation.invited_email.toLowerCase() !== user.email) {
    return jsonResponse({ error: "Sign in with the email address this invitation was sent to." }, 403);
  }

  const result = await context.env.DB.batch([
    context.env.DB.prepare(`
      INSERT OR IGNORE INTO organization_members (organization_id, user_id, role)
      SELECT organization_id, ?, role
      FROM organization_invitations
      WHERE id = ? AND accepted_at IS NULL AND julianday(expires_at) > julianday('now')
    `).bind(user.id, invitation.id),
    context.env.DB.prepare(`
      UPDATE organization_invitations
      SET accepted_at = CURRENT_TIMESTAMP
      WHERE id = ? AND accepted_at IS NULL AND julianday(expires_at) > julianday('now')
    `).bind(invitation.id)
  ]);
  if (!result[1]?.meta?.changes) {
    return jsonResponse({ error: "This invitation is invalid, expired, or already used." }, 409);
  }

  await context.env.DB.prepare(`
    INSERT INTO audit_events (id, organization_id, actor_user_id, action, target_type, target_id)
    VALUES (?, ?, ?, 'accepted', 'invitation', ?)
  `).bind(crypto.randomUUID(), invitation.organization_id, user.id, invitation.id).run();
  const organization = await context.env.DB.prepare(`
    SELECT o.id, o.name, o.slug, m.role
    FROM organizations o
    JOIN organization_members m ON m.organization_id = o.id
    WHERE o.id = ? AND m.user_id = ?
  `).bind(invitation.organization_id, user.id).first();
  return jsonResponse({ organization });
}

function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function hashToken(token) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
