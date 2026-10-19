/**
 * NIST AI RMF AI Roles & Responsibilities Matrix Dataset
 * Aligned with NIST AI RMF 1.0 (GOVERN 2.1, 2.2, 2.3, 3.2) & docs/01-govern/AI-Roles-Matrix.md
 */

const ROLES_CATALOG = [
  // 1. Governance & Leadership
  {
    id: "gov-comm",
    name: "AI Governance Committee",
    tier: "Governance & Leadership",
    reportsTo: "Board of Directors",
    vetoPower: true,
    description: "Cross-functional senior body that sets AI policy, reviews risk posture, approves high-risk deployments, and receives escalations."
  },
  {
    id: "caio",
    name: "Chief AI Officer (CAIO)",
    tier: "Governance & Leadership",
    reportsTo: "Chief Executive Officer (CEO)",
    vetoPower: true,
    description: "Organization-wide accountability for AI strategy, governance policies, and systemic risk management."
  },
  {
    id: "ai-risk-off",
    name: "AI Risk Officer",
    tier: "Governance & Leadership",
    reportsTo: "Chief AI Officer",
    vetoPower: true,
    description: "Identifies, assesses, tracks, and reports AI risks across the organization's AI portfolio."
  },
  {
    id: "ai-ethics-off",
    name: "AI Ethics Officer",
    tier: "Governance & Leadership",
    reportsTo: "Chief AI Officer",
    vetoPower: true,
    description: "Oversees fairness, transparency, societal impact, and affected stakeholder engagement for AI systems."
  },
  {
    id: "legal-comp",
    name: "Legal & Compliance Officer",
    tier: "Governance & Leadership",
    reportsTo: "General Counsel",
    vetoPower: true,
    description: "Ensures AI systems meet legal, statutory data privacy, consumer protection, and contractual obligations."
  },
  {
    id: "dpo",
    name: "Data Protection Officer (DPO)",
    tier: "Governance & Leadership",
    reportsTo: "General Counsel / CAIO",
    vetoPower: true,
    description: "Oversees data privacy, data lineage, consent mechanisms, and regulatory data compliance for AI models."
  },

  // 2. Project-Level Roles
  {
    id: "ai-proj-lead",
    name: "AI Project Lead",
    tier: "Project-Level",
    reportsTo: "CAIO / Business Unit Head",
    vetoPower: false,
    description: "Day-to-day accountability for specific AI systems; coordinates engineering team, timelines, and technical documentation."
  },
  {
    id: "ml-eng",
    name: "AI/ML Engineer",
    tier: "Project-Level",
    reportsTo: "AI Project Lead",
    vetoPower: false,
    description: "Designs, trains, fine-tunes, tests, and maintains AI models and technical serving pipelines."
  },
  {
    id: "data-eng",
    name: "Data Engineer / Scientist",
    tier: "Project-Level",
    reportsTo: "AI Project Lead",
    vetoPower: false,
    description: "Manages data pipelines, data cleansing, labeling, dataset provenance, and quality benchmarks."
  },
  {
    id: "haii-spec",
    name: "Human-AI Interaction (HAII) Specialist",
    tier: "Project-Level",
    reportsTo: "AI Project Lead",
    vetoPower: false,
    description: "Designs and evaluates human-AI interfaces, override affordances, and user oversight configurations."
  },
  {
    id: "tevv-lead",
    name: "TEVV Team Lead",
    tier: "Project-Level",
    reportsTo: "AI Risk Officer",
    vetoPower: true,
    description: "Directs independent Testing, Evaluation, Verification, and Validation activities separate from the dev team."
  },
  {
    id: "tevv-analyst",
    name: "TEVV Analyst",
    tier: "Project-Level",
    reportsTo: "TEVV Team Lead",
    vetoPower: false,
    description: "Executes adversarial testing, fairness/bias audits, stress tests, and safety benchmark validations."
  },

  // 3. Operational Roles
  {
    id: "ai-operator",
    name: "AI System Operator",
    tier: "Operational",
    reportsTo: "Operations Manager",
    vetoPower: false,
    description: "Runs, monitors, and operates deployed AI systems in production; handles escalated alerts and manual overrides."
  },
  {
    id: "inv-mgr",
    name: "AI Inventory Manager",
    tier: "Operational",
    reportsTo: "AI Risk Officer",
    vetoPower: false,
    description: "Maintains the organization's AI System Inventory registry; ensures quarterly review updates and accuracy."
  },
  {
    id: "incident-lead",
    name: "Incident Response Lead",
    tier: "Operational",
    reportsTo: "AI Risk Officer",
    vetoPower: false,
    description: "Coordinates rapid response, triage, containment, and logging for AI incidents, bias anomalies, and security events."
  },
  {
    id: "comms-lead",
    name: "Communications Lead",
    tier: "Operational",
    reportsTo: "CAIO / Corporate Comms",
    vetoPower: false,
    description: "Manages transparent internal and external disclosures and user notifications regarding AI operations."
  },

  // 4. External / Advisory Roles
  {
    id: "ext-auditor",
    name: "External Auditor",
    tier: "External / Advisory",
    reportsTo: "Audit Committee (3rd Line of Defense)",
    vetoPower: true,
    description: "Independent third-party auditing body that validates governance efficacy and TEVV audit trails."
  },
  {
    id: "red-team",
    name: "Adversarial Red Team",
    tier: "External / Advisory",
    reportsTo: "AI Risk Officer",
    vetoPower: false,
    description: "Independent adversarial security team testing for prompt injection, jailbreaks, data exfiltration, and evasion."
  }
];

const RACI_ACTIVITIES = [
  // Phase 1: Governance & Policy (GOVERN 1.x, 2.x)
  {
    id: "act-01",
    phase: "Governance & Policy",
    ref: "GOVERN 1.1",
    activity: "Approve organizational AI Governance Policy",
    raci: { "gov-comm": "A", "caio": "R", "ai-risk-off": "C", "ai-ethics-off": "C", "legal-comp": "C", "dpo": "C" }
  },
  {
    id: "act-02",
    phase: "Governance & Policy",
    ref: "GOVERN 1.2",
    activity: "Set organizational AI risk tolerance thresholds",
    raci: { "gov-comm": "A", "caio": "R", "ai-risk-off": "C", "ai-ethics-off": "C", "legal-comp": "C", "dpo": "I" }
  },
  {
    id: "act-03",
    phase: "Governance & Policy",
    ref: "GOVERN 1.6",
    activity: "Maintain AI System Inventory registry & metadata",
    raci: { "caio": "A", "ai-risk-off": "R", "inv-mgr": "R", "ai-proj-lead": "C", "gov-comm": "I" }
  },
  {
    id: "act-04",
    phase: "Governance & Policy",
    ref: "GOVERN 2.1",
    activity: "Report AI risk posture & metrics to Executive Board",
    raci: { "gov-comm": "I", "caio": "A", "ai-risk-off": "R", "ai-ethics-off": "C" }
  },
  {
    id: "act-05",
    phase: "Governance & Policy",
    ref: "GOVERN 1.7",
    activity: "Establish decommissioning & transition policy",
    raci: { "caio": "A", "ai-risk-off": "R", "legal-comp": "C", "gov-comm": "I" }
  },

  // Phase 2: AI Project Lifecycle (MAP + MEASURE + MANAGE)
  {
    id: "act-06",
    phase: "Project Lifecycle",
    ref: "MAP 1.1",
    activity: "Conduct context mapping & define intended purpose",
    raci: { "ai-proj-lead": "A", "ml-eng": "R", "haii-spec": "R", "ai-risk-off": "C", "ai-ethics-off": "C" }
  },
  {
    id: "act-07",
    phase: "Project Lifecycle",
    ref: "MAP 1.5",
    activity: "Identify affected stakeholder groups & disparate impact",
    raci: { "ai-proj-lead": "A", "ai-ethics-off": "R", "haii-spec": "R", "legal-comp": "I" }
  },
  {
    id: "act-08",
    phase: "Project Lifecycle",
    ref: "MAP 2.1",
    activity: "Collect, curate, and govern training/evaluation datasets",
    raci: { "ai-proj-lead": "A", "data-eng": "R", "dpo": "C", "legal-comp": "C" }
  },
  {
    id: "act-09",
    phase: "Project Lifecycle",
    ref: "MAP 2.2",
    activity: "Develop, train, and fine-tune AI model components",
    raci: { "ai-proj-lead": "A", "ml-eng": "R", "data-eng": "C" }
  },
  {
    id: "act-10",
    phase: "Project Lifecycle",
    ref: "GOVERN 3.2",
    activity: "Design human-AI configuration & override controls",
    raci: { "ai-proj-lead": "A", "haii-spec": "R", "ai-operator": "C", "ai-ethics-off": "C" }
  },
  {
    id: "act-11",
    phase: "Project Lifecycle",
    ref: "MEASURE 1.1",
    activity: "Execute independent TEVV testing & benchmark audits",
    raci: { "tevv-lead": "A", "tevv-analyst": "R", "ai-risk-off": "C", "ml-eng": "I" }
  },
  {
    id: "act-12",
    phase: "Project Lifecycle",
    ref: "MEASURE 2.11",
    activity: "Conduct demographic fairness and bias testing",
    raci: { "ai-ethics-off": "A", "tevv-lead": "R", "tevv-analyst": "R", "legal-comp": "I" }
  },
  {
    id: "act-13",
    phase: "Project Lifecycle",
    ref: "GOVERN 4.2",
    activity: "Complete and document AI Impact Assessment (AIIA)",
    raci: { "ai-proj-lead": "A", "ai-ethics-off": "R", "ai-risk-off": "C", "legal-comp": "C" }
  },
  {
    id: "act-14",
    phase: "Project Lifecycle",
    ref: "GOVERN 2.3",
    activity: "Approve deployment sign-off (Go / No-Go decision)",
    raci: { "caio": "A", "ai-risk-off": "R", "ai-ethics-off": "C", "legal-comp": "C", "gov-comm": "A" }
  },

  // Phase 3: Post-Deployment Monitoring (MANAGE 4.x)
  {
    id: "act-15",
    phase: "Deployment & Monitoring",
    ref: "MANAGE 4.1",
    activity: "Execute continuous post-deployment monitoring plan",
    raci: { "ai-proj-lead": "A", "ai-operator": "R", "ai-risk-off": "C", "inv-mgr": "I" }
  },
  {
    id: "act-16",
    phase: "Deployment & Monitoring",
    ref: "MANAGE 4.2",
    activity: "Detect and flag performance drift & hallucinations",
    raci: { "ai-risk-off": "A", "ai-operator": "R", "ml-eng": "C" }
  },
  {
    id: "act-17",
    phase: "Deployment & Monitoring",
    ref: "MEASURE 2.7",
    activity: "Conduct post-deployment adversarial red-teaming",
    raci: { "ai-risk-off": "A", "red-team": "R", "tevv-lead": "R", "ml-eng": "I" }
  },
  {
    id: "act-18",
    phase: "Deployment & Monitoring",
    ref: "GOVERN 1.6",
    activity: "Conduct quarterly inventory & risk review",
    raci: { "ai-risk-off": "A", "inv-mgr": "R", "ai-proj-lead": "C", "caio": "I" }
  },

  // Phase 4: Incident Response (GOVERN 4.3, MANAGE 4.3)
  {
    id: "act-19",
    phase: "Incident Response",
    ref: "MANAGE 4.3",
    activity: "Detect, log, and triage AI incident / safety event",
    raci: { "incident-lead": "A", "ai-operator": "R", "ai-risk-off": "C" }
  },
  {
    id: "act-20",
    phase: "Incident Response",
    ref: "MANAGE 4.3",
    activity: "Classify incident severity & trigger emergency controls",
    raci: { "ai-risk-off": "A", "incident-lead": "R", "caio": "I", "legal-comp": "C" }
  },
  {
    id: "act-21",
    phase: "Incident Response",
    ref: "GOVERN 4.3",
    activity: "Notify affected users, leadership & regulators",
    raci: { "caio": "A", "comms-lead": "R", "legal-comp": "R", "gov-comm": "I" }
  },
  {
    id: "act-22",
    phase: "Incident Response",
    ref: "MANAGE 4.3",
    activity: "Conduct post-incident root cause analysis & log update",
    raci: { "ai-risk-off": "A", "incident-lead": "R", "ml-eng": "C" }
  },

  // Phase 5: Decommissioning (GOVERN 1.7, MANAGE 2.4)
  {
    id: "act-23",
    phase: "Decommissioning",
    ref: "GOVERN 1.7",
    activity: "Identify decommissioning trigger & formal decision",
    raci: { "caio": "A", "ai-risk-off": "R", "ai-proj-lead": "C", "gov-comm": "I" }
  },
  {
    id: "act-24",
    phase: "Decommissioning",
    ref: "MANAGE 2.4",
    activity: "Archive or delete model weights & training data per policy",
    raci: { "dpo": "A", "data-eng": "R", "ml-eng": "R", "legal-comp": "C" }
  },
  {
    id: "act-25",
    phase: "Decommissioning",
    ref: "GOVERN 1.6",
    activity: "Update AI System Inventory record to Decommissioned",
    raci: { "ai-risk-off": "A", "inv-mgr": "R", "ai-proj-lead": "I" }
  },

  // Phase 6: Third-Party AI Management (GOVERN 6.1, 6.2)
  {
    id: "act-26",
    phase: "Third-Party AI",
    ref: "GOVERN 6.1",
    activity: "Conduct vendor AI risk due diligence & security review",
    raci: { "ai-risk-off": "A", "ai-proj-lead": "R", "legal-comp": "C", "tevv-lead": "C" }
  },
  {
    id: "act-27",
    phase: "Third-Party AI",
    ref: "GOVERN 6.2",
    activity: "Review vendor contracts for AI safety clauses & SLA",
    raci: { "legal-comp": "A", "legal-comp": "R", "dpo": "C", "ai-risk-off": "C" }
  },
  {
    id: "act-28",
    phase: "Third-Party AI",
    ref: "GOVERN 6.1",
    activity: "Establish contingency plans for third-party API outage",
    raci: { "ai-proj-lead": "A", "ml-eng": "R", "ai-operator": "C" }
  }
];

const HUMAN_AI_CONFIGS = [
  {
    systemId: "AI-001",
    systemName: "FinAssist AI",
    level: "Human-in-the-Loop",
    roleInOutput: "Customer support agent reviews escalated queries; agent can edit or reject AI drafted answer.",
    overrideAuthority: "Senior Support Agent / Call Center Supervisor",
    mandatoryReview: "Yes — mandatory for balance transfers, dispute filings, or negative sentiment."
  },
  {
    systemId: "AI-002",
    systemName: "CreditSense Underwriting AI",
    level: "Human-in-the-Loop",
    roleInOutput: "Loan officer must review risk score and explanatory factors before any loan approval or denial.",
    overrideAuthority: "Credit Committee Chair / Senior Underwriter",
    mandatoryReview: "Yes — 100% of adverse lending recommendations must be human validated."
  },
  {
    systemId: "AI-003",
    systemName: "DocuExtract OCR",
    level: "Human-on-the-Loop",
    roleInOutput: "Extracts identity fields automatically; operator reviews flagged documents with OCR confidence < 95%.",
    overrideAuthority: "KYC Verification Analyst",
    mandatoryReview: "Conditional — confidence score threshold < 95% triggers mandatory review."
  },
  {
    systemId: "AI-004",
    systemName: "FraudShield Real-Time Monitor",
    level: "Human-on-the-Loop",
    roleInOutput: "Autonomous real-time card step-up challenges; fraud analyst investigates flagged high-value account holds.",
    overrideAuthority: "SOC Incident Lead / Fraud Operations Manager",
    mandatoryReview: "Conditional — account freeze > $5,000 requires human analyst concurrence."
  },
  {
    systemId: "AI-005",
    systemName: "TalentMatch Screener",
    level: "Human-in-the-Loop",
    roleInOutput: "AI generates candidate match rankings; recruiter conducts human review of all applicants before disqualification.",
    overrideAuthority: "Talent Acquisition Lead",
    mandatoryReview: "Yes — fully prohibited from autonomous applicant rejection."
  },
  {
    systemId: "AI-006",
    systemName: "MarketPulse Treasury Forecaster",
    level: "Full Human Control",
    roleInOutput: "Advisory-only scenario generator; Treasury committee manually reviews and decides all hedge positions.",
    overrideAuthority: "Head of Treasury Operations",
    mandatoryReview: "Yes — AI output is advisory informational input only."
  }
];

const TRAINING_TRACKER = [
  {
    name: "Dr. Elena Vance",
    role: "Chief AI Officer",
    basics: true,
    nistRmf: true,
    biasFairness: true,
    securityPrivacy: true,
    incidentResp: true,
    policy: true,
    lastDate: "2026-08-10"
  },
  {
    name: "Marcus Sterling",
    role: "Lead AI Engineer",
    basics: true,
    nistRmf: true,
    biasFairness: true,
    securityPrivacy: true,
    incidentResp: true,
    policy: true,
    lastDate: "2026-08-15"
  },
  {
    name: "Sarah Namubiru",
    role: "Senior Legal Counsel",
    basics: true,
    nistRmf: true,
    biasFairness: true,
    securityPrivacy: true,
    incidentResp: false,
    policy: true,
    lastDate: "2026-09-01"
  },
  {
    name: "Amina Nakato",
    role: "Senior Data Scientist",
    basics: true,
    nistRmf: true,
    biasFairness: true,
    securityPrivacy: false,
    incidentResp: false,
    policy: true,
    lastDate: "2026-09-05"
  },
  {
    name: "Patrick Ssemwogerere",
    role: "Principal Security Engineer",
    basics: true,
    nistRmf: true,
    biasFairness: false,
    securityPrivacy: true,
    incidentResp: true,
    policy: true,
    lastDate: "2026-09-20"
  },
  {
    name: "Grace Atim",
    role: "Chief Risk & Compliance Officer",
    basics: true,
    nistRmf: true,
    biasFairness: true,
    securityPrivacy: true,
    incidentResp: true,
    policy: true,
    lastDate: "2026-08-25"
  }
];
