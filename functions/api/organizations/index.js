import { ensureUser, jsonResponse, readJson } from "../../_lib/auth.js";

export async function onRequestGet(context) {
  const user = await ensureUser(context);
  const result = await context.env.DB.prepare(`
    SELECT o.id, o.name, o.slug, m.role
    FROM organization_members m
    JOIN organizations o ON o.id = m.organization_id
    WHERE m.user_id = ? AND o.is_sample = 0
    ORDER BY o.name COLLATE NOCASE
  `).bind(user.id).all();
  return jsonResponse(result.results || []);
}

export async function onRequestPost(context) {
  const parsed = await readJson(context.request);
  if (parsed.error) return parsed.error;
  const name = String(parsed.body?.name || "").trim();
  if (!name || name.length > 150) {
    return jsonResponse({ error: "Company name is required and must be 150 characters or fewer." }, 400);
  }

  const user = await ensureUser(context);
  const id = crypto.randomUUID();
  const slug = `${slugify(name).slice(0, 60)}-${id.slice(0, 8)}`;
  await context.env.DB.batch([
    context.env.DB.prepare(`
      INSERT INTO organizations (id, name, slug, created_by)
      VALUES (?, ?, ?, ?)
    `).bind(id, name, slug, user.id),
    context.env.DB.prepare(`
      INSERT INTO organization_members (organization_id, user_id, role)
      VALUES (?, ?, 'owner')
    `).bind(id, user.id),
    context.env.DB.prepare(`
      INSERT INTO audit_events (id, organization_id, actor_user_id, action, target_type, target_id)
      VALUES (?, ?, ?, 'created', 'organization', ?)
    `).bind(crypto.randomUUID(), id, user.id, id)
  ]);
  return jsonResponse({ id, name, slug, role: "owner" }, 201);
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "company";
}
