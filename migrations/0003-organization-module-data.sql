CREATE TABLE IF NOT EXISTS organization_module_data (
  organization_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  module_key TEXT NOT NULL CHECK (module_key IN ('roles', 'policy', 'map', 'measure', 'manage', 'assessment')),
  data_json TEXT NOT NULL,
  revision INTEGER NOT NULL DEFAULT 1,
  created_by TEXT NOT NULL REFERENCES users(id),
  updated_by TEXT NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (organization_id, module_key)
);
