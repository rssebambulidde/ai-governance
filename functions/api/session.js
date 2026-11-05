import { ensureUser, jsonResponse } from "../_lib/auth.js";

export async function onRequestGet(context) {
  const user = await ensureUser(context);
  const result = await context.env.DB.prepare(`
    SELECT o.id, o.name, o.slug, m.role
    FROM organization_members m
    JOIN organizations o ON o.id = m.organization_id
    WHERE m.user_id = ? AND o.is_sample = 0
    ORDER BY o.name COLLATE NOCASE
  `).bind(user.id).all();

  return jsonResponse({
    user,
    organizations: result.results || []
  });
}
