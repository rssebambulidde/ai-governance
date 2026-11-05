CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS organizations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  is_sample INTEGER NOT NULL DEFAULT 0 CHECK (is_sample IN (0, 1)),
  created_by TEXT REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS organization_members (
  organization_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'editor', 'viewer')),
  joined_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (organization_id, user_id)
);

INSERT OR IGNORE INTO organizations (id, name, slug, is_sample)
VALUES ('legacy-sample', 'SamaBrains Sample Data', 'samabrains-sample-data', 1);

DROP INDEX IF EXISTS idx_ai_systems_risk;
DROP INDEX IF EXISTS idx_ai_systems_status;
DROP INDEX IF EXISTS idx_ai_systems_next_review;
ALTER TABLE ai_systems RENAME TO ai_systems_legacy;

CREATE TABLE ai_systems (
  organization_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  department TEXT DEFAULT '',
  purpose TEXT DEFAULT '',
  task_type TEXT DEFAULT '',
  deployment_status TEXT DEFAULT 'Planning / Pre-Development',
  risk_level TEXT DEFAULT 'Low',
  data_types TEXT DEFAULT '',
  third_party TEXT DEFAULT '',
  accountable_owner TEXT DEFAULT '',
  project_lead TEXT DEFAULT '',
  dev_team TEXT DEFAULT '',
  operator_team TEXT DEFAULT '',
  tevv_status TEXT DEFAULT 'Not Started',
  last_review_date TEXT,
  next_review_date TEXT,
  assessment_status TEXT DEFAULT 'Not Started',
  doc_link TEXT DEFAULT '',
  incident_log_link TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_by TEXT REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (organization_id, id)
);

INSERT INTO ai_systems (
  organization_id, id, name, department, purpose, task_type, deployment_status,
  risk_level, data_types, third_party, accountable_owner, project_lead, dev_team,
  operator_team, tevv_status, last_review_date, next_review_date,
  assessment_status, doc_link, incident_log_link, notes, created_at, updated_at
)
SELECT
  'legacy-sample', id, name, department, purpose, task_type, deployment_status,
  risk_level, data_types, third_party, accountable_owner, project_lead, dev_team,
  operator_team, tevv_status, last_review_date, next_review_date,
  assessment_status, doc_link, incident_log_link, notes, created_at, updated_at
FROM ai_systems_legacy;

DROP TABLE ai_systems_legacy;

CREATE INDEX idx_ai_systems_org_risk ON ai_systems(organization_id, risk_level);
CREATE INDEX idx_ai_systems_org_status ON ai_systems(organization_id, deployment_status);
CREATE INDEX idx_ai_systems_org_review ON ai_systems(organization_id, next_review_date);

CREATE TABLE organization_invitations (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  invited_email TEXT NOT NULL COLLATE NOCASE,
  role TEXT NOT NULL CHECK (role IN ('editor', 'viewer')),
  token_hash TEXT NOT NULL UNIQUE,
  invited_by TEXT NOT NULL REFERENCES users(id),
  expires_at TEXT NOT NULL,
  accepted_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_organization_invitations_org
  ON organization_invitations(organization_id, accepted_at, expires_at);

CREATE TABLE audit_events (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  actor_user_id TEXT NOT NULL REFERENCES users(id),
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  details_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_events_org_created
  ON audit_events(organization_id, created_at);
