/**
 * SamaBrains NIST AI Governance Hub — AI Governance Policy & Gating Data
 * Dedicated exclusively to NIST AI Risk Management Framework 1.0 (NIST AI RMF — GOVERN 1 & GOVERN 6)
 * Aligned with docs/01-govern/AI-Governance-Policy.md
 */

const POLICY_METADATA = {
  title: "SamaBrains Enterprise AI Governance Policy",
  framework: "NIST AI Risk Management Framework (NIST AI RMF 1.0) — GOVERN Function",
  version: "1.0",
  effectiveDate: "2026-01-15",
  lastReviewed: "2026-10-15",
  nextReview: "2027-01-15",
  reviewCycle: "Annual (or upon significant AI system modification / critical incident)",
  owner: "Dr. Elena Vance (Chief AI Officer / Head of AI Governance)",
  approver: "Board Technology & Risk Oversight Committee",
  scope: "All enterprise artificial intelligence (AI) and machine learning (ML) systems designed, developed, procured, deployed, or operated across all organizational business units.",
  enforcement: "Mandatory compliance for all employees, contractors, and third-party vendors."
};

// NIST AI RMF GOVERN 1.2 — 8 Core Trustworthy AI Principles
const TRUSTWORTHY_PRINCIPLES = [
  {
    id: "PRIN-01",
    name: "Human Ownership & Accountability",
    nistRef: "GOVERN 1.2 · GOVERN 2.1",
    summary: "Clear human accountability must be established for every AI system throughout its lifecycle.",
    operationalStandard: "Every AI system must have a designated executive owner (CAIO/VP), project lead, and TEVV lead. Automated systems must never operate without an assigned human duty holder.",
    verificationCriteria: "Active entry in AI System Inventory with valid Accountable Executive and RACI matrix assignment.",
    status: "Compliant"
  },
  {
    id: "PRIN-02",
    name: "Transparency & Explainability",
    nistRef: "GOVERN 1.2 · MAP 1.4",
    summary: "AI systems and automated outputs must be clearly disclosed, interpretable, and understandable by operators and affected parties.",
    operationalStandard: "Explicit user disclaimers for generative/interactive outputs; published model cards and documentation summaries; explainable reasoning pathways for credit/adjudication decisions.",
    verificationCriteria: "Published Model Card, plain-language end-user disclosures, and contestability/recourse channels.",
    status: "Compliant"
  },
  {
    id: "PRIN-03",
    name: "Fairness & Equity Preservation",
    nistRef: "GOVERN 1.2 · MEASURE 2.11",
    summary: "AI systems shall not create, amplify, or perpetuate algorithmic bias or discriminatory impact against protected classes.",
    operationalStandard: "Mandatory demographic parity and disparate impact testing ($0.80–1.25$ threshold) prior to production gating; representative training data audits.",
    verificationCriteria: "Pre-deployment bias audit report with statistical significance verification and mitigation log.",
    status: "Compliant"
  },
  {
    id: "PRIN-04",
    name: "Safety & Harm Prevention",
    nistRef: "GOVERN 1.2 · MANAGE 1.1",
    summary: "AI systems must operate under validated fail-safe boundaries to prevent physical, financial, or psychological harm.",
    operationalStandard: "Mandatory circuit breakers, confidence score gating ($<0.75$ triggers human review), and emergency kill-switches accessible in $<15$ minutes.",
    verificationCriteria: "Documented automated fallback mechanism and signed incident containment SLA.",
    status: "Compliant"
  },
  {
    id: "PRIN-05",
    name: "Privacy & Data Governance",
    nistRef: "GOVERN 1.2 · MAP 1.1",
    summary: "AI data collection and processing must adhere to data minimization, purpose specification, and strict confidentiality.",
    operationalStandard: "PII tokenization before model inference; training exclusion guarantees from external API vendors; zero retention agreements for customer dialogues.",
    verificationCriteria: "Data Protection Officer (DPO) sign-off and Third-Party Zero Data-Retention certification.",
    status: "Compliant"
  },
  {
    id: "PRIN-06",
    name: "Security & Adversarial Resilience",
    nistRef: "GOVERN 1.2 · MEASURE 2.7",
    summary: "AI systems must resist adversarial manipulation, prompt injection, model inversion, and data poisoning.",
    operationalStandard: "Multi-layered regex and semantic prompt guards; input length bounding; red-team adversarial penetration testing completed prior to production release.",
    verificationCriteria: "Adversarial Red-Team Dossier with prompt injection bypass rate $<1.0\\%$.",
    status: "Compliant"
  },
  {
    id: "PRIN-07",
    name: "Reliability & Valid Performance",
    nistRef: "GOVERN 1.2 · MEASURE 2.1",
    summary: "AI models must deliver consistent, validated, and reproducible results across documented operational envelopes.",
    operationalStandard: "Independent test set evaluation; ground-truth citation requirements; strict hallucination rates below organizational tolerance ($<2.0\\%$).",
    verificationCriteria: "Independent TEVV verification report with metrics benchmarked against baseline standards.",
    status: "Compliant"
  },
  {
    id: "PRIN-08",
    name: "Contestability & Right of Recourse",
    nistRef: "GOVERN 1.2 · MANAGE 4.2",
    summary: "Affected individuals must have direct mechanisms to challenge automated outputs and receive timely human reassessment.",
    operationalStandard: "Accessible 24/7 human escalation path for contested determinations; 48-hour SLA for administrative human-in-command review.",
    verificationCriteria: "Published contestability protocol and operational complaint ticketing channel.",
    status: "Compliant"
  }
];

// NIST AI RMF GOVERN 1.3 — 4 Mandatory Go/No-Go Deployment Gates
const DEPLOYMENT_GATES = [
  {
    id: "GATE-01",
    gateName: "Zero Unmitigated Critical Risks Gate",
    nistRef: "GOVERN 1.3 · MANAGE 1.1",
    phase: "Pre-Production Release Gating",
    description: "No AI system may be promoted to production if any Critical Risk (Inherent Score 16–25 or Impact 5) remains without verified, tested mitigation controls that reduce residual risk to an acceptable level.",
    mandatoryEvidence: "Complete Risk Scoring Matrix with signed Residual Risk Acceptance form for any High/Medium accepted risks.",
    vetoHolders: ["AI Risk Officer", "Chief AI Officer"],
    hardBlockCondition: "Any unmitigated Critical Risk automatically terminates deployment authorization."
  },
  {
    id: "GATE-02",
    gateName: "Legal & Regulatory Compliance Gate",
    nistRef: "GOVERN 1.1 · GOVERN 4.2",
    phase: "Pre-Development & Pre-Release",
    description: "Formal legal review must certify that system operation, training data ingestion, customer disclosures, and algorithmic decisions comply with all applicable statutes, consumer protections, and organizational risk tolerance.",
    mandatoryEvidence: "Signed Legal & Regulatory Compliance Sign-off from General Counsel or designated AI Legal Lead within preceding 60 days.",
    vetoHolders: ["General Counsel / Legal Lead", "Data Protection Officer"],
    hardBlockCondition: "Absence of formal Legal Review sign-off blocks deployment regardless of technical readiness."
  },
  {
    id: "GATE-03",
    gateName: "Independent TEVV Dossier Validation Gate",
    nistRef: "MEASURE 1.1 · MEASURE 2.1 · GOVERN 4.1",
    phase: "Testing / Validation Milestone",
    description: "Test, Evaluation, Verification, and Validation (TEVV) must be executed by evaluators independent of the development team, verifying that all benchmark metrics meet or exceed pre-established trustworthy thresholds.",
    mandatoryEvidence: "Comprehensive TEVV Dossier including independent bias testing, adversarial red-team report, accuracy/hallucination benchmarks, and rollback validation.",
    vetoHolders: ["TEVV Lead / Independent Model Validation Lead"],
    hardBlockCondition: "Failed TEVV benchmarks or self-tested models without independent validation are strictly barred from release."
  },
  {
    id: "GATE-04",
    gateName: "Executive Governance & Veto Sign-Off Gate",
    nistRef: "GOVERN 2.3 · GOVERN 4.2",
    phase: "Final Production Authorization",
    description: "Final formal deployment decision requires unanimous concurrence across all designated governance veto holders, certifying human-AI oversight boundaries and emergency operational playbooks.",
    mandatoryEvidence: "Signed Go/No-Go Executive Decision Record with verified cryptographic/digital signatures from all required officers.",
    vetoHolders: ["AI Ethics Officer", "Chief AI Officer", "AI Product Owner"],
    hardBlockCondition: "A single veto from an authorized officer suspends release until remediation is verified."
  }
];

// NIST AI RMF GOVERN 1.4 — 9 Mandatory Documentation Artifacts
const MANDATORY_ARTIFACTS = [
  {
    id: "DOC-01",
    name: "AI System Card",
    ownerRole: "AI Project Lead",
    stage: "Conception & Scoping",
    nistRef: "GOVERN 1.4 · MAP 1.1",
    description: "High-level overview covering system purpose, intended users, operational boundaries, and non-AI alternatives.",
    retentionYears: 7,
    statusDefault: "Required"
  },
  {
    id: "DOC-02",
    name: "Data Sheet & Lineage Dossier",
    ownerRole: "Data Engineer / Curator",
    stage: "Data Engineering",
    nistRef: "GOVERN 1.4 · MAP 2.1",
    description: "Provenance, collection consent, demographic representativeness, labeling methodology, and sanitization logs for training data.",
    retentionYears: 7,
    statusDefault: "Required"
  },
  {
    id: "DOC-03",
    name: "Model Card & Architecture Spec",
    ownerRole: "AI / ML Engineer",
    stage: "Model Development",
    nistRef: "GOVERN 1.4 · MAP 2.2",
    description: "Model architecture, hyperparameters, foundation model base version, context window limits, and operational constraints.",
    retentionYears: 7,
    statusDefault: "Required"
  },
  {
    id: "DOC-04",
    name: "Risk Profile & Benefit-Harm Matrix",
    ownerRole: "AI Risk Officer",
    stage: "Risk Mapping",
    nistRef: "GOVERN 1.4 · MAP 5.1",
    description: "Comprehensive risk identification cataloging harm scenarios, affected populations, likelihood, impact, and mitigation controls.",
    retentionYears: 7,
    statusDefault: "Required"
  },
  {
    id: "DOC-05",
    name: "Independent TEVV Validation Report",
    ownerRole: "TEVV Lead",
    stage: "Verification & Validation",
    nistRef: "GOVERN 1.4 · MEASURE 1.1",
    description: "Full testing results covering accuracy, hallucination rate, demographic parity, adversarial robustness, and stress testing.",
    retentionYears: 7,
    statusDefault: "Required"
  },
  {
    id: "DOC-06",
    name: "AI Impact Assessment (AIIA)",
    ownerRole: "AI Ethics Officer",
    stage: "Pre-Deployment",
    nistRef: "GOVERN 1.4 · GOVERN 4.2",
    description: "Comprehensive multi-stakeholder assessment evaluating civil rights, safety, equity, and operational readiness.",
    retentionYears: 7,
    statusDefault: "Required"
  },
  {
    id: "DOC-07",
    name: "Formal Deployment Decision Record",
    ownerRole: "Chief AI Officer",
    stage: "Release Authorization",
    nistRef: "GOVERN 1.4 · GOVERN 2.3",
    description: "Executive audit record documenting formal Go/No-Go determination, conditions of release, and veto holder sign-offs.",
    retentionYears: 7,
    statusDefault: "Required"
  },
  {
    id: "DOC-08",
    name: "Continuous Monitoring & Alerting Plan",
    ownerRole: "AI Operations Lead",
    stage: "Deployment & Operations",
    nistRef: "GOVERN 1.4 · GOVERN 1.5",
    description: "Real-time telemetry thresholds, performance degradation alerting rules, concept drift cadences, and review schedules.",
    retentionYears: 5,
    statusDefault: "Required"
  },
  {
    id: "DOC-09",
    name: "AI Incident Log & Retrospective Register",
    ownerRole: "Incident Commander",
    stage: "Lifecycle Maintenance",
    nistRef: "GOVERN 1.4 · MANAGE 4.1",
    description: "Standardized logging of all severity events (SEV-1 to SEV-4), containment durations, root-cause analyses, and corrective actions.",
    retentionYears: 10,
    statusDefault: "Required"
  }
];

// NIST AI RMF GOVERN 1.7 — Decommissioning Triggers
const DECOMMISSION_TRIGGERS = [
  {
    id: "DECOM-01",
    trigger: "Irreparable Drift or Persistent Performance Degradation",
    condition: "Model accuracy or safety metric falls below minimum SLA for >14 days and cannot be remediated via retraining.",
    action: "Immediate failover to human operator fallback; schedule structured model retirement."
  },
  {
    id: "DECOM-02",
    trigger: "Unmitigated Critical Security or Jailbreak Exploit",
    condition: "Active adversarial attack vector or prompt injection vulnerability identified that bypasses safety filters with potential for severe harm.",
    action: "Emergency kill-switch execution within 15 minutes; formal incident response and decommissioning review."
  },
  {
    id: "DECOM-03",
    trigger: "Regulatory Revocation or Statutory Prohibition",
    condition: "New statutory rule or judicial order deems the AI application, underlying data collection, or deployment domain unlawful.",
    action: "Immediate cessation of inference endpoints; data deletion certification within 30 days."
  },
  {
    id: "DECOM-04",
    trigger: "Technology Replacement / Model Version Supersession",
    condition: "Deployment of superior, validated successor AI model (e.g. v2.0) that has passed all 4 deployment gates.",
    action: "Controlled 30-day parallel run, data migration, and formal archival of deprecated weights/artifacts."
  },
  {
    id: "DECOM-05",
    trigger: "Business Objective Obsolescence",
    condition: "Underlying commercial workflow or organizational process is discontinued or restructured.",
    action: "Formal decommissioning sign-off and transfer of system logs to long-term compliance storage."
  }
];

// NIST AI RMF GOVERN 6.1 & 6.2 — Third-Party AI & Supply Chain Screening Standards
const THIRD_PARTY_SCREENING_RUBRIC = [
  {
    id: "TP-01",
    dimension: "Model Card & Benchmark Transparency",
    nistRef: "GOVERN 6.1",
    mandatoryRequirement: "Vendor must provide comprehensive technical documentation, training data summary, known failure modes, and safety benchmarks.",
    weight: "Critical (25%)"
  },
  {
    id: "TP-02",
    dimension: "Data Rights & Zero-Retention Commitment",
    nistRef: "GOVERN 6.1 · GOVERN 1.2",
    mandatoryRequirement: "Contractual guarantee that organizational inputs and customer queries are never retained for model retraining or third-party transfer.",
    weight: "Critical (25%)"
  },
  {
    id: "TP-03",
    dimension: "Service Level & Security Assurance",
    nistRef: "GOVERN 6.2",
    mandatoryRequirement: "Verified SOC2 Type II, ISO/IEC 27001 certification, 99.9% uptime SLA, and prompt incident notification within 24 hours of breach/exploit.",
    weight: "High (20%)"
  },
  {
    id: "TP-04",
    dimension: "Model Versioning & Deprecation Notice",
    nistRef: "GOVERN 6.2 · GOVERN 1.7",
    mandatoryRequirement: "Vendor must provide at least 90 days prior written notice before deprecating, swapping, or substantially altering model weights.",
    weight: "High (15%)"
  },
  {
    id: "TP-05",
    dimension: "Independent Red-Teaming Validation",
    nistRef: "GOVERN 6.1 · GOVERN 4.1",
    mandatoryRequirement: "Third-party models must be subjected to internal adversarial penetration testing before organizational data ingress.",
    weight: "Medium (15%)"
  }
];

// Preloaded Policy Exceptions / Risk Waivers
const POLICY_EXCEPTIONS_DATA = [
  {
    id: "WAIVER-2026-001",
    systemId: "SYS-DOC-003",
    systemName: "ContractIntel AI",
    requestedBy: "Marcus Thorne (Head of Procurement & Legal Ops)",
    clauseAffected: "GOVERN 1.4 · Section 6.1 (TEVV Report Completeness)",
    natureOfException: "Temporary staging release for internal synthetic contract testing before final bias verification report is issued.",
    compensatingControls: "Access restricted strictly to 5 vetted internal paralegals using synthetic NDAs; zero live vendor contracts processed.",
    expiryDate: "2026-11-30",
    approvedBy: "Dr. Elena Vance (Chief AI Officer) & Arthur Pendelton (General Counsel)",
    status: "Active (Expiring in 42 Days)"
  }
];

// Pre-evaluated System Gating Assessments
const SYSTEM_GATE_EVALUATIONS = {
  "SYS-FIN-001": {
    systemName: "FinAssist AI",
    status: "CLEARED FOR DEPLOYMENT",
    statusClass: "go",
    evaluationDate: "2026-10-14",
    evaluator: "Dr. Elena Vance (Chief AI Officer)",
    gates: {
      "GATE-01": { passed: true, score: "All 13 Harms Mitigated", notes: "Highest inherent risk was R-02 (Hallucination 20). Residual risk reduced to Low (4) via dual verification." },
      "GATE-02": { passed: true, score: "Signed Off (2026-10-10)", notes: "Legal review certified compliance with banking advisories and consumer protections. Digital equity checked." },
      "GATE-03": { passed: true, score: "Validated (TEVV Lead)", notes: "Hallucination rate 0.8% (<2.0% threshold). Prompt injection bypass 0.0%. Disparate impact ratio 0.94." },
      "GATE-04": { passed: true, score: "Unanimous Sign-Off", notes: "All 4 veto holders (CAIO, Ethics, Legal, Risk) approved release under Human-on-the-Loop conditions." }
    },
    artifacts: {
      "DOC-01": "Complete", "DOC-02": "Complete", "DOC-03": "Complete", "DOC-04": "Complete",
      "DOC-05": "Complete", "DOC-06": "Complete", "DOC-07": "Complete", "DOC-08": "Complete", "DOC-09": "Active"
    }
  },
  "SYS-OPS-002": {
    systemName: "CyberDefense Copilot",
    status: "CLEARED FOR DEPLOYMENT",
    statusClass: "go",
    evaluationDate: "2026-09-28",
    evaluator: "Dr. Elena Vance (Chief AI Officer)",
    gates: {
      "GATE-01": { passed: true, score: "Mitigated", notes: "Automated isolation restricted to verified high-confidence alerts." },
      "GATE-02": { passed: true, score: "Signed Off", notes: "Compliance with cybersecurity incident notification rules verified." },
      "GATE-03": { passed: true, score: "Validated", notes: "False positive rate 0.4%; zero critical alarm drops." },
      "GATE-04": { passed: true, score: "Approved", notes: "CISO and CAIO unanimous release." }
    },
    artifacts: {
      "DOC-01": "Complete", "DOC-02": "Complete", "DOC-03": "Complete", "DOC-04": "Complete",
      "DOC-05": "Complete", "DOC-06": "Complete", "DOC-07": "Complete", "DOC-08": "Complete", "DOC-09": "Active"
    }
  },
  "SYS-DOC-003": {
    systemName: "ContractIntel AI",
    status: "CONDITIONAL HOLD (WAIVER ACTIVE)",
    statusClass: "cond",
    evaluationDate: "2026-10-12",
    evaluator: "AI Risk Committee",
    gates: {
      "GATE-01": { passed: true, score: "Mitigated", notes: "Extraction error risks bounded by mandatory human attorney verification." },
      "GATE-02": { passed: true, score: "Signed Off", notes: "Corporate confidentiality terms verified." },
      "GATE-03": { passed: false, score: "Incomplete (Waiver Granted)", notes: "Bias testing in progress for non-standard English clauses. Active waiver WAIVER-2026-001." },
      "GATE-04": { passed: true, score: "Conditional Sign-Off", notes: "Approved for synthetic sandbox pilot only." }
    },
    artifacts: {
      "DOC-01": "Complete", "DOC-02": "Complete", "DOC-03": "Complete", "DOC-04": "Complete",
      "DOC-05": "In Progress", "DOC-06": "Draft", "DOC-07": "Conditional", "DOC-08": "Draft", "DOC-09": "Active"
    }
  },
  "SYS-HR-004": {
    systemName: "TalentMatch AI",
    status: "BLOCKED (GATE FAILURE)",
    statusClass: "nogo",
    evaluationDate: "2026-10-16",
    evaluator: "AI Ethics Officer",
    gates: {
      "GATE-01": { passed: false, score: "Unmitigated Critical Bias", notes: "Gender proxy correlation detected in technical resume scoring. Disparate impact ratio 0.68 (<0.80 floor)." },
      "GATE-02": { passed: false, score: "Legal Objection", notes: "Legal team withheld sign-off pending remediation of potential employment discrimination exposure." },
      "GATE-03": { passed: false, score: "TEVV Benchmark Failed", notes: "Failed demographic parity threshold in secondary screening evaluations." },
      "GATE-04": { passed: false, score: "Veto Exercised", notes: "AI Ethics Officer and General Counsel exercised binding vetoes." }
    },
    artifacts: {
      "DOC-01": "Complete", "DOC-02": "Audit Required", "DOC-03": "Complete", "DOC-04": "Critical Risks Open",
      "DOC-05": "Failed", "DOC-06": "Incomplete", "DOC-07": "Rejected", "DOC-08": "Pending", "DOC-09": "Not Started"
    }
  },
  "SYS-MED-005": {
    systemName: "HealthGuide Triage",
    status: "CONDITIONAL HOLD (PRE-RELEASE)",
    statusClass: "cond",
    evaluationDate: "2026-10-15",
    evaluator: "Clinical AI Safety Board",
    gates: {
      "GATE-01": { passed: true, score: "Mitigated", notes: "Emergency symptoms hardcoded to direct 911/emergency department referral." },
      "GATE-02": { passed: true, score: "Signed Off", notes: "Medical device regulatory counsel review completed." },
      "GATE-03": { passed: false, score: "TEVV In Progress", notes: "Multi-center clinical vignette validation 85% complete." },
      "GATE-04": { passed: false, score: "Pending TEVV", notes: "Final CAIO sign-off awaiting TEVV completion." }
    },
    artifacts: {
      "DOC-01": "Complete", "DOC-02": "Complete", "DOC-03": "Complete", "DOC-04": "Complete",
      "DOC-05": "85% Complete", "DOC-06": "Draft", "DOC-07": "Pending", "DOC-08": "Draft", "DOC-09": "Active"
    }
  },
  "SYS-MKT-006": {
    systemName: "MarketSense Synthesizer",
    status: "CLEARED FOR DEPLOYMENT",
    statusClass: "go",
    evaluationDate: "2026-08-15",
    evaluator: "Dr. Elena Vance (Chief AI Officer)",
    gates: {
      "GATE-01": { passed: true, score: "Low Risk", notes: "Internal research only; zero consumer rights exposure." },
      "GATE-02": { passed: true, score: "Signed Off", notes: "Copyright and fair-use guidelines verified." },
      "GATE-03": { passed: true, score: "Validated", notes: "Extraction fidelity 96.5%." },
      "GATE-04": { passed: true, score: "Approved", notes: "Unanimous release for internal use." }
    },
    artifacts: {
      "DOC-01": "Complete", "DOC-02": "Complete", "DOC-03": "Complete", "DOC-04": "Complete",
      "DOC-05": "Complete", "DOC-06": "Complete", "DOC-07": "Complete", "DOC-08": "Complete", "DOC-09": "Active"
    }
  }
};

// Aliases supporting both AI-00X and SYS-XXX-00X nomenclatures
SYSTEM_GATE_EVALUATIONS["AI-001"] = SYSTEM_GATE_EVALUATIONS["SYS-FIN-001"];
SYSTEM_GATE_EVALUATIONS["AI-002"] = SYSTEM_GATE_EVALUATIONS["SYS-OPS-002"];
SYSTEM_GATE_EVALUATIONS["AI-003"] = SYSTEM_GATE_EVALUATIONS["SYS-DOC-003"];
SYSTEM_GATE_EVALUATIONS["AI-004"] = SYSTEM_GATE_EVALUATIONS["SYS-HR-004"];
SYSTEM_GATE_EVALUATIONS["AI-005"] = SYSTEM_GATE_EVALUATIONS["SYS-MED-005"];
SYSTEM_GATE_EVALUATIONS["AI-006"] = SYSTEM_GATE_EVALUATIONS["SYS-MKT-006"];
