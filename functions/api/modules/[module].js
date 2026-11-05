import { ensureUser, getOrganizationMembership, jsonResponse, readJson } from "../../_lib/auth.js";

const MODULE_KEYS = new Set(["roles", "policy", "map", "measure", "manage", "assessment"]);
const MAX_DATA_BYTES = 100_000;

export async function onRequestGet(context) {
  const access = await getModuleAccess(context);
  if (access.response) return access.response;

  const row = await context.env.DB.prepare(`
    SELECT data_json, revision, updated_at
    FROM organization_module_data
    WHERE organization_id = ? AND module_key = ?
  `).bind(access.organizationId, access.moduleKey).first();

  return jsonResponse(row ? {
    data: JSON.parse(row.data_json),
    revision: row.revision,
    updatedAt: row.updated_at
  } : null);
}

export async function onRequestPost(context) {
  const access = await getModuleAccess(context);
  if (access.response) return access.response;
  if (!canEdit(access.membership.role)) {
    return jsonResponse({ error: "You do not have permission to initialize workspace module data." }, 403);
  }

  const parsed = await readJson(context.request);
  if (parsed.error) return parsed.error;
  const validation = validateData(parsed.body?.data);
  if (validation) return jsonResponse({ error: validation }, 400);

  const user = await ensureUser(context);
  await context.env.DB.prepare(`
    INSERT OR IGNORE INTO organization_module_data (
      organization_id, module_key, data_json, created_by, updated_by
    ) VALUES (?, ?, ?, ?, ?)
  `).bind(access.organizationId, access.moduleKey, JSON.stringify(parsed.body.data), user.id, user.id).run();

  const row = await context.env.DB.prepare(`
    SELECT data_json, revision, updated_at
    FROM organization_module_data
    WHERE organization_id = ? AND module_key = ?
  `).bind(access.organizationId, access.moduleKey).first();

  if (!row) throw new Error("Workspace module data could not be initialized.");
  return jsonResponse({
    data: JSON.parse(row.data_json),
    revision: row.revision,
    updatedAt: row.updated_at
  }, 201);
}

export async function onRequestPut(context) {
  const access = await getModuleAccess(context);
  if (access.response) return access.response;
  if (!canEdit(access.membership.role)) {
    return jsonResponse({ error: "You do not have permission to edit workspace module data." }, 403);
  }

  const parsed = await readJson(context.request);
  if (parsed.error) return parsed.error;
  const validation = validateData(parsed.body?.data);
  if (validation) return jsonResponse({ error: validation }, 400);
  const revision = parsed.body?.revision;
  if (!Number.isSafeInteger(revision) || revision < 1) {
    return jsonResponse({ error: "A valid module revision is required." }, 400);
  }

  const user = await ensureUser(context);
  const result = await context.env.DB.prepare(`
    UPDATE organization_module_data
    SET data_json = ?, revision = revision + 1, updated_by = ?, updated_at = CURRENT_TIMESTAMP
    WHERE organization_id = ? AND module_key = ? AND revision = ?
  `).bind(
    JSON.stringify(parsed.body.data),
    user.id,
    access.organizationId,
    access.moduleKey,
    revision
  ).run();

  if (!result.meta?.changes) {
    return jsonResponse({ error: "This module changed in another session. Reload the workspace before saving again." }, 409);
  }

  await context.env.DB.prepare(`
    INSERT INTO audit_events (id, organization_id, actor_user_id, action, target_type, target_id)
    VALUES (?, ?, ?, 'updated', 'workspace_module', ?)
  `).bind(crypto.randomUUID(), access.organizationId, user.id, access.moduleKey).run();

  const row = await context.env.DB.prepare(`
    SELECT data_json, revision, updated_at
    FROM organization_module_data
    WHERE organization_id = ? AND module_key = ?
  `).bind(access.organizationId, access.moduleKey).first();
  return jsonResponse({
    data: JSON.parse(row.data_json),
    revision: row.revision,
    updatedAt: row.updated_at
  });
}

async function getModuleAccess(context) {
  const moduleKey = String(context.params.module || "").toLowerCase();
  if (!MODULE_KEYS.has(moduleKey)) {
    return { response: jsonResponse({ error: "Workspace module not found." }, 404) };
  }
  const organizationId = new URL(context.request.url).searchParams.get("organizationId");
  if (!organizationId) {
    return { response: jsonResponse({ error: "Select a company workspace first." }, 400) };
  }

  const membership = await getOrganizationMembership(context, organizationId);
  if (!membership) {
    return { response: jsonResponse({ error: "Company workspace not found." }, 404) };
  }
  return { moduleKey, organizationId, membership };
}

function validateData(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return "Workspace module data must be a JSON object.";
  }
  if (new TextEncoder().encode(JSON.stringify(data)).byteLength > MAX_DATA_BYTES) {
    return "Workspace module data is too large.";
  }
  return "";
}

function canEdit(role) {
  return ["owner", "admin", "editor"].includes(role);
}
