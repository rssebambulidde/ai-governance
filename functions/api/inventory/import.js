import { ensureUser, getOrganizationMembership, jsonResponse, readJson } from "../../_lib/auth.js";

const MAX_IMPORT_ROWS = 200;
const REQUIRED_FIELDS = [
  "id", "name", "department", "purpose", "taskType", "deploymentStatus",
  "riskLevel", "dataTypes", "accountableOwner", "projectLead", "tevvStatus",
  "assessmentStatus"
];
const DEPLOYMENT_STATUSES = [
  "Planning / Pre-Development", "Development", "Testing / TEVV", "Piloting", "Production", "Decommissioned"
];
const RISK_LEVELS = ["Low", "Medium", "High", "Critical"];
const TEVV_STATUSES = ["Not Started", "In Progress", "Passed", "Failed"];
const ASSESSMENT_STATUSES = ["Not Started", "In Progress", "Signed Off"];

export async function onRequestPost(context) {
  const parsed = await readJson(context.request);
  if (parsed.error) return parsed.error;
  const organizationId = String(parsed.body?.organizationId || "").trim();
  const systems = parsed.body?.systems;
  if (!organizationId) return jsonResponse({ error: "Select a company workspace before importing." }, 400);
  if (!Array.isArray(systems) || systems.length === 0) {
    return jsonResponse({ error: "The import must contain at least one valid system record." }, 400);
  }
  if (systems.length > MAX_IMPORT_ROWS) {
    return jsonResponse({ error: `Import up to ${MAX_IMPORT_ROWS} systems at a time.` }, 413);
  }

  const membership = await getOrganizationMembership(context, organizationId);
  if (!membership) return jsonResponse({ error: "Company workspace not found." }, 404);
  if (!["owner", "admin", "editor"].includes(membership.role)) {
    return jsonResponse({ error: "You do not have permission to import records into this workspace." }, 403);
  }

  const rowErrors = [];
  const seenIds = new Set();
  systems.forEach((system, index) => {
    const error = validateSystem(system);
    if (error) {
      rowErrors.push({ row: index + 2, message: error });
      return;
    }
    const id = system.id.trim();
    if (seenIds.has(id)) rowErrors.push({ row: index + 2, message: `Duplicate system ID "${id}" in this file.` });
    seenIds.add(id);
  });
  if (rowErrors.length) return jsonResponse({ error: "Import validation failed. No records were changed.", rowErrors }, 400);

  const user = await ensureUser(context);
  const statements = systems.flatMap(system => {
    const record = { ...system };
    for (const field of [
      "thirdParty", "devTeam", "operatorTeam", "lastReviewDate",
      "nextReviewDate", "docLink", "incidentLogLink", "notes"
    ]) {
      if (record[field] === null || record[field] === undefined) record[field] = "";
    }
    const id = system.id.trim();
    return [
      context.env.DB.prepare(`
        INSERT INTO ai_systems (
          organization_id, id, name, department, purpose, task_type, deployment_status,
          risk_level, data_types, third_party, accountable_owner, project_lead, dev_team,
          operator_team, tevv_status, last_review_date, next_review_date,
          assessment_status, doc_link, incident_log_link, notes, created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT (organization_id, id) DO UPDATE SET
          name = excluded.name,
          department = excluded.department,
          purpose = excluded.purpose,
          task_type = excluded.task_type,
          deployment_status = excluded.deployment_status,
          risk_level = excluded.risk_level,
          data_types = excluded.data_types,
          third_party = excluded.third_party,
          accountable_owner = excluded.accountable_owner,
          project_lead = excluded.project_lead,
          dev_team = excluded.dev_team,
          operator_team = excluded.operator_team,
          tevv_status = excluded.tevv_status,
          last_review_date = excluded.last_review_date,
          next_review_date = excluded.next_review_date,
          assessment_status = excluded.assessment_status,
          doc_link = excluded.doc_link,
          incident_log_link = excluded.incident_log_link,
          notes = excluded.notes,
          updated_at = CURRENT_TIMESTAMP
      `).bind(
        organizationId, id, record.name.trim(), record.department.trim(), record.purpose.trim(),
        record.taskType.trim(), record.deploymentStatus, record.riskLevel, record.dataTypes.trim(),
        record.thirdParty.trim(), record.accountableOwner.trim(), record.projectLead.trim(),
        record.devTeam.trim(), record.operatorTeam.trim(), record.tevvStatus,
        record.lastReviewDate || null, record.nextReviewDate || null, record.assessmentStatus,
        record.docLink.trim(), record.incidentLogLink.trim(), record.notes.trim(), user.id
      ),
      context.env.DB.prepare(`
        INSERT INTO audit_events (id, organization_id, actor_user_id, action, target_type, target_id, details_json)
        VALUES (?, ?, ?, 'imported', 'ai_system', ?, ?)
      `).bind(
        crypto.randomUUID(), organizationId, user.id, id,
        JSON.stringify({ source: "csv_import" })
      )
    ];
  });

  try {
    await context.env.DB.batch(statements);
  } catch (error) {
    console.error("AI inventory CSV import transaction failed.", error);
    return jsonResponse({ error: "The import could not be completed. No records were changed; check the CSV and try again." }, 500);
  }
  return jsonResponse({ imported: systems.length });
}

function validateSystem(system) {
  if (!system || typeof system !== "object" || Array.isArray(system)) return "A system record is required.";
  for (const [key, value] of Object.entries(system)) {
    if (value !== null && value !== undefined && typeof value !== "string") {
      return `The ${key} field must be text.`;
    }
    if (typeof value === "string" && value.length > 10000) return `The ${key} field is too long.`;
  }
  for (const field of REQUIRED_FIELDS) {
    if (!String(system[field] || "").trim()) return `${fieldLabel(field)} is required.`;
  }
  if (system.id.trim().length > 100 || system.name.trim().length > 250) return "System ID or name is too long.";
  if (!RISK_LEVELS.includes(system.riskLevel)) return "Risk level must be Low, Medium, High, or Critical.";
  if (!DEPLOYMENT_STATUSES.includes(system.deploymentStatus)) return "Lifecycle status is not recognized.";
  if (!TEVV_STATUSES.includes(system.tevvStatus)) return "TEVV status is not recognized.";
  if (!ASSESSMENT_STATUSES.includes(system.assessmentStatus)) return "Impact assessment status is not recognized.";
  for (const field of ["lastReviewDate", "nextReviewDate"]) {
    if (system[field] && !isValidDate(system[field])) {
      return `${fieldLabel(field)} must use YYYY-MM-DD format.`;
    }
  }
  return "";
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function fieldLabel(field) {
  return ({
    id: "System ID",
    name: "System name",
    department: "Department",
    purpose: "Business purpose",
    taskType: "AI task type",
    deploymentStatus: "Lifecycle status",
    riskLevel: "Risk level",
    dataTypes: "Data types",
    accountableOwner: "Accountable owner",
    projectLead: "Project lead",
    tevvStatus: "TEVV status",
    assessmentStatus: "Impact assessment status",
    lastReviewDate: "Last review date",
    nextReviewDate: "Next review date"
  })[field] || field;
}
