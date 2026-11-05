import { ensureUser, getOrganizationMembership, jsonResponse, readJson } from "../../_lib/auth.js";

export async function onRequestGet(context) {
  const organizationId = new URL(context.request.url).searchParams.get("organizationId");
  if (!organizationId) return jsonResponse({ error: "Select a company workspace first." }, 400);

  const membership = await getOrganizationMembership(context, organizationId);
  if (!membership) return jsonResponse({ error: "Company workspace not found." }, 404);

  const result = await context.env.DB.prepare(`
    SELECT * FROM ai_systems
    WHERE organization_id = ?
    ORDER BY created_at DESC, id ASC
  `).bind(organizationId).all();
  return jsonResponse((result.results || []).map(toFrontEndSystem));
}

export async function onRequestPost(context) {
  const organizationId = new URL(context.request.url).searchParams.get("organizationId");
  if (!organizationId) return jsonResponse({ error: "Select a company workspace first." }, 400);

  const membership = await getOrganizationMembership(context, organizationId);
  if (!membership) return jsonResponse({ error: "Company workspace not found." }, 404);
  if (!["owner", "admin", "editor"].includes(membership.role)) {
    return jsonResponse({ error: "You do not have permission to edit this register." }, 403);
  }

  const parsed = await readJson(context.request);
  if (parsed.error) return parsed.error;
  const validationError = validateSystem(parsed.body);
  if (validationError) return jsonResponse({ error: validationError }, 400);
  const user = await ensureUser(context);

  try {
    await context.env.DB.batch([
      context.env.DB.prepare(`
        INSERT INTO ai_systems (
          organization_id, id, name, department, purpose, task_type, deployment_status,
          risk_level, data_types, third_party, accountable_owner, project_lead, dev_team,
          operator_team, tevv_status, last_review_date, next_review_date,
          assessment_status, doc_link, incident_log_link, notes, created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(organizationId, ...systemValues(parsed.body), user.id),
      context.env.DB.prepare(`
        INSERT INTO audit_events (id, organization_id, actor_user_id, action, target_type, target_id)
        VALUES (?, ?, ?, 'created', 'ai_system', ?)
      `).bind(crypto.randomUUID(), organizationId, user.id, String(parsed.body.id).trim())
    ]);
    return jsonResponse(toFrontEndSystem({ ...toDatabaseRow(parsed.body), organization_id: organizationId }), 201);
  } catch (error) {
    if (String(error.message || error).includes("UNIQUE")) {
      return jsonResponse({ error: "A system with this ID already exists in this company register." }, 409);
    }
    throw error;
  }
}

function validateSystem(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return "A system record is required.";
  if (!String(body.id || "").trim()) return "System ID is required.";
  if (!String(body.name || "").trim()) return "System name is required.";
  if (String(body.id).length > 100 || String(body.name).length > 250) {
    return "System ID or name is too long.";
  }
  for (const [key, value] of Object.entries(body)) {
    if (value !== null && value !== undefined && typeof value !== "string") {
      return `The ${key} field must be text.`;
    }
    if (typeof value === "string" && value.length > 10000) {
      return `The ${key} field is too long.`;
    }
  }
  return "";
}

function systemValues(body) {
  return [
    String(body.id).trim(),
    String(body.name).trim(),
    body.department || "",
    body.purpose || "",
    body.taskType || "",
    body.deploymentStatus || "Planning / Pre-Development",
    body.riskLevel || "Low",
    body.dataTypes || "",
    body.thirdParty || "",
    body.accountableOwner || "",
    body.projectLead || "",
    body.devTeam || "",
    body.operatorTeam || "",
    body.tevvStatus || "Not Started",
    body.lastReviewDate || null,
    body.nextReviewDate || null,
    body.assessmentStatus || "Not Started",
    body.docLink || "",
    body.incidentLogLink || "",
    body.notes || ""
  ];
}

function toDatabaseRow(body) {
  return {
    id: String(body.id).trim(),
    name: String(body.name).trim(),
    department: body.department || "",
    purpose: body.purpose || "",
    task_type: body.taskType || "",
    deployment_status: body.deploymentStatus || "Planning / Pre-Development",
    risk_level: body.riskLevel || "Low",
    data_types: body.dataTypes || "",
    third_party: body.thirdParty || "",
    accountable_owner: body.accountableOwner || "",
    project_lead: body.projectLead || "",
    dev_team: body.devTeam || "",
    operator_team: body.operatorTeam || "",
    tevv_status: body.tevvStatus || "Not Started",
    last_review_date: body.lastReviewDate || null,
    next_review_date: body.nextReviewDate || null,
    assessment_status: body.assessmentStatus || "Not Started",
    doc_link: body.docLink || "",
    incident_log_link: body.incidentLogLink || "",
    notes: body.notes || ""
  };
}

function toFrontEndSystem(row) {
  return {
    id: row.id,
    name: row.name,
    department: row.department,
    purpose: row.purpose,
    taskType: row.task_type,
    deploymentStatus: row.deployment_status,
    riskLevel: row.risk_level,
    dataTypes: row.data_types,
    thirdParty: row.third_party,
    accountableOwner: row.accountable_owner,
    projectLead: row.project_lead,
    devTeam: row.dev_team,
    operatorTeam: row.operator_team,
    tevvStatus: row.tevv_status,
    lastReviewDate: row.last_review_date,
    nextReviewDate: row.next_review_date,
    assessmentStatus: row.assessment_status,
    docLink: row.doc_link,
    incidentLogLink: row.incident_log_link,
    notes: row.notes
  };
}
