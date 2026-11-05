CREATE TABLE IF NOT EXISTS ai_systems (
  id TEXT PRIMARY KEY,
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
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ai_systems_risk ON ai_systems(risk_level);
CREATE INDEX IF NOT EXISTS idx_ai_systems_status ON ai_systems(deployment_status);
CREATE INDEX IF NOT EXISTS idx_ai_systems_next_review ON ai_systems(next_review_date);
