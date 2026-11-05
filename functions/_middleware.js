import { authenticateAccessRequest, jsonResponse } from "./_lib/auth.js";

export async function onRequest(context) {
  const result = await authenticateAccessRequest(context.request, context.env);
  if (!result.user) {
    return jsonResponse({ error: result.error }, result.status);
  }

  context.data.user = result.user;
  return context.next();
}
