import { ensureUser, getOrganizationMembership, jsonResponse, readJson } from "../../_lib/auth.js";

export async function onRequestPut(context) {
  const organizationId = new URL(context.request.url).searchParams.get("organizationId");
  if (!organizationId) return jsonResponse({ error: "Select a company workspace first." }, 400);
  const membership = await getOrganizationMembership(context, organizationId);
  if (!membership) return jsonResponse({ error: "Company workspace not found." }, 404);
  if (!["owner", "admin", "editor"].includes(membership.role)) {
    return jsonResponse({ error: "You do not have permission to edit this register." }, 403);
  }
  const id = context.params.id;
  const parsed = await readJson(context.request);
  if (parsed.error) return parsed.error;
  const body = parsed.body;

  if (body?.id !== id) {
    return jsonResponse({ error: "System ID cannot be changed." }, 400);
  }
  if (!String(body?.name || "").trim()) {
    return jsonResponse({ error: "System name is required." }, 400);
  }
  if (typeof body !== "object" || Array.isArray(body)) {
    return jsonResponse({ error: "A system record is required." }, 400);
  }
  if (String(body.name).length > 250 || String(body.id).length > 100) {
    return jsonResponse({ error: "System ID or name is too long." }, 400);
  }
  for (const [key, value] of Object.entries(body)) {
    if (value !== null && value !== undefined && typeof value !== "string") {
      return jsonResponse({ error: `The ${key} field must be text.` }, 400);
    }
    if (typeof value === "string" && value.length > 10000) {
      return jsonResponse({ error: `The ${key} field is too long.` }, 400);
    }
  }

  const user = await ensureUser(context);
  const result = await context.env.DB.prepare(`
    UPDATE ai_systems SET
      name = ?, department = ?, purpose = ?, task_type = ?,
      deployment_status = ?, risk_level = ?, data_types = ?, third_party = ?,
      accountable_owner = ?, project_lead = ?, dev_team = ?, operator_team = ?,
      tevv_status = ?, last_review_date = ?, next_review_date = ?,
      assessment_status = ?, doc_link = ?, incident_log_link = ?, notes = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE organization_id = ? AND id = ?
  `).bind(
    String(body.name).trim(), body.department || "", body.purpose || "",
    body.taskType || "", body.deploymentStatus || "Planning / Pre-Development",
    body.riskLevel || "Low", body.dataTypes || "", body.thirdParty || "",
    body.accountableOwner || "", body.projectLead || "", body.devTeam || "",
    body.operatorTeam || "", body.tevvStatus || "Not Started",
    body.lastReviewDate || null, body.nextReviewDate || null,
    body.assessmentStatus || "Not Started", body.docLink || "",
    body.incidentLogLink || "", body.notes || "", organizationId, id
  ).run();

  if (!result.meta?.changes) return jsonResponse({ error: "AI system not found." }, 404);
  await context.env.DB.prepare(`
    INSERT INTO audit_events (id, organization_id, actor_user_id, action, target_type, target_id)
    VALUES (?, ?, ?, 'updated', 'ai_system', ?)
  `).bind(crypto.randomUUID(), organizationId, user.id, id).run();
  return jsonResponse({ ...body, id });
}

export async function onRequestDelete(context) {
  const organizationId = new URL(context.request.url).searchParams.get("organizationId");
  if (!organizationId) return jsonResponse({ error: "Select a company workspace first." }, 400);
  const membership = await getOrganizationMembership(context, organizationId);
  if (!membership) return jsonResponse({ error: "Company workspace not found." }, 404);
  if (!["owner", "admin", "editor"].includes(membership.role)) {
    return jsonResponse({ error: "You do not have permission to edit this register." }, 403);
  }
  const id = context.params.id;
  const user = await ensureUser(context);
  const result = await context.env.DB.prepare(
    "DELETE FROM ai_systems WHERE organization_id = ? AND id = ?"
  ).bind(organizationId, id).run();

  if (!result.meta?.changes) return jsonResponse({ error: "AI system not found." }, 404);
  await context.env.DB.prepare(`
    INSERT INTO audit_events (id, organization_id, actor_user_id, action, target_type, target_id)
    VALUES (?, ?, ?, 'deleted', 'ai_system', ?)
  `).bind(crypto.randomUUID(), organizationId, user.id, id).run();
  return jsonResponse({ id, deleted: true });
}
