/**
 * SamaBrains NIST AI Governance Hub — MANAGE Function Data Module
 * Dedicated exclusively to NIST AI Risk Management Framework 1.0 (NIST AI 100-1 — MANAGE Function: MANAGE 1.1 – MANAGE 4.3)
 * Aligned with docs/04-manage/AI-Incident-Log.md, MANAGE-Incident-Response-Playbook.md, MANAGE-Risk-Response-Plan.md, and MANAGE-Continuous-Improvement-Log.csv
 * Standardized Date: 2026
 */

const MANAGE_METADATA = {
  title: "SamaBrains NIST AI RMF MANAGE & Incident Response Framework",
  framework: "NIST AI Risk Management Framework 1.0 (NIST AI 100-1 — MANAGE Function)",
  version: "1.0",
  year: "2026",
  owner: "AI Risk Officer · Incident Response Lead · Dr. Elena Vance (Head of AI Governance)",
  containmentSla: "15 minutes (SEV-1 Critical Incidents)",
  systemTarget: "FinAssist AI (SYS-FIN-001 / AI-001) & Enterprise AI Inventory"
};

// Registered AI Incidents from docs/04-manage/AI-Incident-Log.md
const MANAGE_INCIDENTS_REGISTER = [
  {
    id: "INC-2026-001",
    title: "Off-Label Retirement Tax Advisory Hallucination",
    systemId: "SYS-FIN-001",
    systemName: "FinAssist AI",
    date: "2026-02-14",
    timeDetected: "14:22 UTC",
    severity: "P2-Major",
    severityClass: "tag-high",
    type: "Hallucination / Off-Label Advice",
    source: "Automated Monitoring Alert (M-02 Spike)",
    affectedUsers: 14,
    description: "FinAssist AI generated informal advice regarding pension lump-sum tax deductions during a multi-turn user conversation, exceeding its informational-only CONOPS envelope.",
    immediateAction: "Restricted conversational envelope to pre-approved FAQ responses; triggered real-time intent filter update.",
    containmentTime: "11 minutes (< 15 min SLA)",
    rootCause: "Knowledge base chunk lacked negative constraint prompt instructing LLM to refrain from tax computations.",
    resolutionStatus: "Resolved",
    statusBadge: "approved",
    postMortemRef: "PIR-2026-001",
    correctiveAction: "Updated prompt guardrails and knowledge base disclaimer; re-ran TS-01 and TS-04."
  },
  {
    id: "INC-2026-002",
    title: "Bereavement Distress Escalation Delay",
    systemId: "SYS-FIN-001",
    systemName: "FinAssist AI",
    date: "2026-04-18",
    timeDetected: "09:45 UTC",
    severity: "P2-Major",
    severityClass: "tag-high",
    type: "Distress Escalation Failure",
    source: "Agent Feedback via Escalation Portal",
    affectedUsers: 1,
    description: "Customer reporting the death of an account holder received standard bureaucratic procedural scripts rather than immediate compassionate human escalation.",
    immediateAction: "Human CS supervisor immediately took over dialogue; contacted customer with senior bereavement banking specialist.",
    containmentTime: "8 minutes (< 15 min SLA)",
    rootCause: "Sentiment classifier missed nuanced euphemisms for deceased relatives ('late spouse' not caught by primary regex).",
    resolutionStatus: "Resolved",
    statusBadge: "approved",
    postMortemRef: "PIR-2026-002",
    correctiveAction: "Expanded distress keyword taxonomy with 45 bereavement variations; lowered sentiment threshold to 0.70."
  },
  {
    id: "INC-2026-003",
    title: "Adversarial Prompt Injection Probing Attempt",
    systemId: "SYS-FIN-001",
    systemName: "FinAssist AI",
    date: "2026-06-22",
    timeDetected: "22:15 UTC",
    severity: "P4-Near-Miss",
    severityClass: "tag-low",
    type: "Security / Jailbreak Probing",
    source: "Automated Security Telemetry (Cloudflare WAF)",
    affectedUsers: 0,
    description: "Coordinated penetration probing attempted role-play jailbreak sequences ('DAN-style' financial system override) from multiple overseas IP ranges.",
    immediateAction: "Input sanitization and Cloudflare rate limiting automatically blocked all 84 attempts; zero prompt leakage.",
    containmentTime: "Instant (< 50ms automated)",
    rootCause: "External threat actor testing perimeter defenses against retail banking conversational endpoints.",
    resolutionStatus: "Resolved",
    statusBadge: "approved",
    postMortemRef: "PIR-2026-003",
    correctiveAction: "Added probe signatures to red-team regression benchmark (TS-05); updated edge WAF rules."
  },
  {
    id: "INC-2026-004",
    title: "Synthetic Identity Data Leakage False Alarm",
    systemId: "SYS-FIN-001",
    systemName: "FinAssist AI",
    date: "2026-08-05",
    timeDetected: "11:05 UTC",
    severity: "P3-Minor",
    severityClass: "tag-med",
    type: "Privacy Scanner Alert",
    source: "Automated PII Scanner (M-03)",
    affectedUsers: 0,
    description: "Automated scanner flagged simulated credit card format numbers in tutorial documentation as live PII leakage.",
    immediateAction: "DPO verified output contained standard test numbers ('4111-XXXX-XXXX-1111') with zero live customer data.",
    containmentTime: "14 minutes",
    rootCause: "Scanner lacked exemption rule for documentation test strings used in knowledge base tutorials.",
    resolutionStatus: "Resolved",
    statusBadge: "approved",
    postMortemRef: "PIR-2026-004",
    correctiveAction: "Refined regex patterns to differentiate dummy test strings from active account credentials."
  },
  {
    id: "INC-2026-005",
    title: "Regional Edge Node Transit Latency Degradation",
    systemId: "SYS-FIN-001",
    systemName: "FinAssist AI",
    date: "2026-09-19",
    timeDetected: "16:40 UTC",
    severity: "P3-Minor",
    severityClass: "tag-med",
    type: "Performance / Latency Spike",
    source: "APM Telemetry (M-06 p95 > 4,200ms)",
    affectedUsers: 180,
    description: "Submarine cable fiber cut caused inference routing to reroute across secondary transatlantic data centers, raising p95 latency.",
    immediateAction: "Infrastructure shifted inference traffic to regional sovereign edge nodes within sovereign borders.",
    containmentTime: "9 minutes",
    rootCause: "Third-party network fiber outage external to application code.",
    resolutionStatus: "Resolved",
    statusBadge: "approved",
    postMortemRef: "PIR-2026-005",
    correctiveAction: "Reconfigured dynamic edge load balancing to failover to local sovereign nodes."
  },
  {
    id: "INC-2026-006",
    title: "Dialectal Query Classification Confusion",
    systemId: "SYS-FIN-001",
    systemName: "FinAssist AI",
    date: "2026-10-12",
    timeDetected: "18:30 UTC",
    severity: "P3-Minor",
    severityClass: "tag-med",
    type: "Fairness / Classification",
    source: "Weekly Supervisor Sampling Audit",
    affectedUsers: 8,
    description: "Regional colloquial banking terms ('drawing account' vs. 'checking account') caused chatbot to misclassify queries as unknown intent.",
    immediateAction: "Customer queries routed to human agents; knowledge base updated with regional synonyms.",
    containmentTime: "25 minutes",
    rootCause: "Lexicon embeddings biased toward standard formal banking nomenclature.",
    resolutionStatus: "Resolved",
    statusBadge: "approved",
    postMortemRef: "PIR-2026-006",
    correctiveAction: "Logged in IMP-004; updated embedding synonym index with 120 regional dialectal financial terms."
  }
];

// 7 Incident Response Playbooks (Playbooks A through G) from docs/04-manage/MANAGE-Incident-Response-Playbook.md
const MANAGE_PLAYBOOKS = [
  {
    id: "PLAYBOOK-A",
    title: "Hallucination & Materially Incorrect Financial Information",
    trigger: "Confirmed hallucination providing incorrect financial terms, OR M-02 (Hallucination Rate) > 2.0%",
    severity: "P1-Critical / P2-Major",
    leadRole: "AI Risk Officer + CS Lead",
    containmentSla: "< 15 minutes",
    containmentSteps: [
      "Restrict system immediately: switch chatbot to FAQ-only pre-approved response mode.",
      "Disable open-ended generative inference pathways.",
      "Notify AI Risk Officer, CS Lead, and Chief AI Officer via incident pager.",
      "CS Lead briefs human agent queues: 'Increased escalation expected; verify all AI-assisted queries'."
    ],
    impactAssessmentSteps: [
      "Query conversation logs for last 72 hours matching similar prompts to isolate affected users.",
      "Legal & Compliance review: assess whether direct customer remediation or notices are required.",
      "Prioritize proactive callback to any customer who acted on hallucinated terms."
    ],
    rootCauseSteps: [
      "TEVV Team re-runs TS-01 (Accuracy) and TS-04 (Safety) on staging environment.",
      "AI/ML Engineering checks recent changes (knowledge base updates, model version changes, prompt drift).",
      "Formally record findings in AI-Incident-Log.md."
    ],
    restorationSteps: [
      "Deploy prompt guardrail patches and verified knowledge base chunk updates.",
      "Re-run TS-01 with ≥ 97% pass rate required for reinstatement.",
      "Obtain signed sign-off from AI Risk Officer prior to lifting restrictions."
    ]
  },
  {
    id: "PLAYBOOK-B",
    title: "PII & Customer Data Exposure Breach",
    trigger: "Any confirmed PII leakage in chatbot output, OR M-03 (PII Leakage) > 0",
    severity: "P1-Critical",
    leadRole: "Data Protection Officer (DPO) + CISO",
    containmentSla: "< 15 minutes",
    containmentSteps: [
      "Immediate isolation: terminate active session and flush edge caching buffers.",
      "Engage hard client-side PII scrub filter before any response rendering.",
      "Alert DPO, CISO, Legal Counsel, and Head of AI Governance within 15 minutes."
    ],
    impactAssessmentSteps: [
      "Identify scope: number of customer records exposed, sensitivity classification (names, accounts, card numbers).",
      "Statutory Assessment: determine GDPR / statutory 72-hour regulatory notification obligation.",
      "Secure encrypted forensic audit logs for regulatory supervisory examination."
    ],
    rootCauseSteps: [
      "Determine ingestion path: did user input sensitive PII, or did RAG retrieve cross-tenant data?",
      "Audit Vectorize embedding indices for unauthorized data chunk contamination.",
      "Execute TS-06 (Privacy Test Suite) against fixed deployment."
    ],
    restorationSteps: [
      "Deploy deterministic regex masking and PII tokenization layer.",
      "Formal written approval from DPO confirming zero residual exposure risk.",
      "Post-Incident Review (PIR) filed within 48 hours."
    ]
  },
  {
    id: "PLAYBOOK-C",
    title: "Adversarial Security Attack & Prompt Injection Jailbreak",
    trigger: "Successful jailbreak sequence bypassing safety guardrails, OR M-05 < 95.0%",
    severity: "P1-Critical",
    leadRole: "CISO / InfoSec Lead + Red Team",
    containmentSla: "< 15 minutes",
    containmentSteps: [
      "Instantly block source IP subnet and user session token via Cloudflare WAF.",
      "Activate hardened heuristic input firewall capping token lengths and blocking injection syntax.",
      "Notify InfoSec Incident Commander, AI Project Lead, and CISO."
    ],
    impactAssessmentSteps: [
      "Audit system telemetry for data exfiltration or unauthorized system instructions.",
      "Verify whether injection succeeded in accessing backend tools or APIs.",
      "Review past 24 hours of conversation telemetry for precursor reconnaissance probes."
    ],
    rootCauseSteps: [
      "Adversarial Red Team analyzes jailbreak prompt syntax and bypass mechanism.",
      "Synthesize attack variant into TS-05 regression test benchmark.",
      "Update system prompt delimiter hardening and edge classifier rules."
    ],
    restorationSteps: [
      "Re-evaluate adversarial suite TS-05 achieving ≥ 99.0% resistance.",
      "Verify zero regression on benign banking queries.",
      "InfoSec Lead signs off on production release clearance."
    ]
  },
  {
    id: "PLAYBOOK-D",
    title: "Failure to Escalate Distressed Customer",
    trigger: "Missed escalation of customer expressing extreme distress, suicide risk, or severe hardship (M-16 > 3%)",
    severity: "P1-Critical / P2-Major",
    leadRole: "Customer Service Lead + AI Ethics Officer",
    containmentSla: "< 15 minutes",
    containmentSteps: [
      "Supervisor instantly intervenes and initiates emergency priority human outreach.",
      "Connect customer directly with licensed crisis resources and specialized human banking managers.",
      "Notify Customer Service Director and AI Ethics Officer."
    ],
    impactAssessmentSteps: [
      "Verify customer safety and immediate financial security status.",
      "Audit prior conversation turns to determine why intent/sentiment classifier failed to trip.",
      "Check for similar unresolved distress cases across active session pool."
    ],
    rootCauseSteps: [
      "Extract unrecognized distress phrases and analyze sentiment classifier confidence scoring.",
      "Inspect auto-escalation webhook latency and agent queue routing rules.",
      "Update distress taxonomy in knowledge base."
    ],
    restorationSteps: [
      "Lower confidence threshold for distress triggers to 0.70.",
      "Verify 100% escalation pass on FAI-05 Vulnerable Cohort stress suite.",
      "CS Lead and AI Ethics Officer joint sign-off."
    ]
  },
  {
    id: "PLAYBOOK-E",
    title: "System Outage & Edge Infrastructure Degradation",
    trigger: "Full conversational endpoint downtime, OR M-07 (Availability) < 99.0%",
    severity: "P2-Major",
    leadRole: "Infrastructure Lead + SRE On-Call",
    containmentSla: "< 15 minutes",
    containmentSteps: [
      "Activate client-side graceful degradation mode: display static FAQ + direct 'Call Human Agent' hotline.",
      "Failover traffic to secondary Cloudflare Workers edge regions.",
      "Notify AI Operations on-call engineer and Infrastructure Lead."
    ],
    impactAssessmentSteps: [
      "Calculate total customer session dropouts and deflected calls diverted to human contact centers.",
      "Check if human agent queue wait times exceed service level targets."
    ],
    rootCauseSteps: [
      "Diagnose root cause: Cloudflare platform status, DNS failure, API gateway throttling, or deployment crash.",
      "Review error logs and APM telemetry (M-06 / M-07)."
    ],
    restorationSteps: [
      "Verify health checks pass across 100% of sovereign edge nodes.",
      "Gradually ramp traffic from 10% to 100% while observing response latencies.",
      "SRE on-call sign-off."
    ]
  },
  {
    id: "PLAYBOOK-F",
    title: "Regulatory Inquiry & Statutory Examination",
    trigger: "Formal request for information, audit notice, or inquiry from financial regulatory authority",
    severity: "P2-Major",
    leadRole: "Head of Compliance + Legal Counsel",
    containmentSla: "< 2 hours",
    containmentSteps: [
      "Notify Chief AI Officer, AI Risk Officer, and Executive Committee immediately.",
      "Freeze all model version updates and knowledge base modifications under legal hold.",
      "Assemble Regulatory Response Task Force."
    ],
    impactAssessmentSteps: [
      "Review scope of regulatory notice: specific system, customer complaint, fairness audit, or algorithmic transparency.",
      "Verify statutory response deadline."
    ],
    rootCauseSteps: [
      "Compile official audit dossier: AI System Inventory record, MAP Context Dossier, MEASURE TEVV validation, and incident logs.",
      "Legal & Compliance review all evidentiary artifacts before submission."
    ],
    restorationSteps: [
      "Submit certified compliance response and artifact package.",
      "Incorporate regulatory recommendations into continuous improvement backlog.",
      "Head of Compliance formal sign-off."
    ]
  },
  {
    id: "PLAYBOOK-G",
    title: "Algorithmic Bias & Fairness Disparity Finding",
    trigger: "Quarterly audit detects accuracy disparity > 5.0% across proxy groups, OR M-12 > 10.0%",
    severity: "P2-Major",
    leadRole: "AI Ethics Officer + AI/ML Engineering Lead",
    containmentSla: "< 24 hours",
    containmentSteps: [
      "Flag affected customer journey segments for mandatory human oversight.",
      "Notify AI Governance Committee and CAIO of statistical disparity.",
      "Convene algorithmic fairness review panel."
    ],
    impactAssessmentSteps: [
      "Identify affected protected/proxy groups and specific query categories with disparity.",
      "Assess whether disparate service completion resulted in financial or service harm."
    ],
    rootCauseSteps: [
      "Investigate source of bias: representation gap in test data, RAG retrieval language bias, or tokenizer limitations.",
      "Execute disaggregated analysis across all proxy dimensions (FAI-01 to FAI-04)."
    ],
    restorationSteps: [
      "Rebalance retrieval embeddings and prompt instructions to ensure dialectal parity.",
      "Re-evaluate fairness benchmark (TS-07) demonstrating gap ≤ 5.0%.",
      "AI Ethics Officer formal sign-off."
    ]
  }
];

// 13 Mapped Risk Response Plans from docs/04-manage/MANAGE-Risk-Response-Plan.md
const MANAGE_RISK_RESPONSES = [
  {
    id: "R-01",
    name: "Hallucinated Financial Advice / Terms",
    priority: "P1-Critical",
    strategy: "Mitigate",
    owner: "AI/ML Lead + CS Lead",
    monitoringCadence: "Continuous + Weekly Audit",
    fallbackTrigger: "Hallucination rate > 1% in weekly sample OR single verified advice complaint",
    fallbackAction: "Instantly restrict system to static pre-approved answers; disable open generation.",
    residualRisk: "Low"
  },
  {
    id: "R-02",
    name: "Customer Distress Escalation Failure",
    priority: "P2-Active",
    strategy: "Mitigate",
    owner: "CS Lead + AI Ethics Officer",
    monitoringCadence: "Continuous + Weekly Sample",
    fallbackTrigger: "Missed escalation rate > 1% in weekly sample",
    fallbackAction: "Lower sentiment threshold to 0.70; add prominent emergency human contact banner.",
    residualRisk: "Low"
  },
  {
    id: "R-03",
    name: "Bias & Demographic Disparities in Service Quality",
    priority: "P2-Active",
    strategy: "Mitigate",
    owner: "AI Ethics Officer",
    monitoringCadence: "Quarterly Audit (FAI-01..07)",
    fallbackTrigger: "Accuracy gap > 5% between demographic proxy groups in quarterly audit",
    fallbackAction: "Mandatory human review for underperforming dialect segments until rebalanced.",
    residualRisk: "Low"
  },
  {
    id: "R-04",
    name: "PII & Credential Leakage in Chat Logs",
    priority: "P1-Critical",
    strategy: "Mitigate",
    owner: "DPO + InfoSec Lead",
    monitoringCadence: "Continuous Automated Scan",
    fallbackTrigger: "Single verified PII instance detected in output or unencrypted logs",
    fallbackAction: "Activate Playbook B; disable affected chat endpoint; purge cache buffers.",
    residualRisk: "Low"
  },
  {
    id: "R-05",
    name: "Adversarial Prompt Injection & Jailbreaks",
    priority: "P2-Active",
    strategy: "Mitigate",
    owner: "InfoSec Lead",
    monitoringCadence: "Bi-annual Red Team + Continuous WAF",
    fallbackTrigger: "Successful jailbreak in red-team test OR detected in production",
    fallbackAction: "Deploy emergency regex filter; cap user prompt tokens at 250 characters.",
    residualRisk: "Low"
  },
  {
    id: "R-06",
    name: "Unreliable Knowledge Base Retrieval (Stale/Conflicting)",
    priority: "P3-Routine",
    strategy: "Mitigate",
    owner: "Knowledge Base Curator",
    monitoringCadence: "Monthly Accuracy Benchmarking",
    fallbackTrigger: "Retrieval relevance Precision@5 < 85% OR product fee update missed",
    fallbackAction: "Re-index Vectorize chunking database; roll back to previous verified document state.",
    residualRisk: "Low"
  },
  {
    id: "R-07",
    name: "Customer Over-Reliance on AI Without Verification",
    priority: "P3-Routine",
    strategy: "Mitigate",
    owner: "UX Research Lead",
    monitoringCadence: "Quarterly User Comprehension Survey",
    fallbackTrigger: "Comprehension survey < 90% awareness of AI identity",
    fallbackAction: "Increase prominent AI identity disclosures at start and during every response.",
    residualRisk: "Low"
  },
  {
    id: "R-08",
    name: "Failure to Disclose AI Identity to Consumers",
    priority: "P3-Routine",
    strategy: "Mitigate",
    owner: "Compliance + UX Lead",
    monitoringCadence: "Monthly Compliance Audit",
    fallbackTrigger: "Session initiated without explicit AI disclosure banner",
    fallbackAction: "Immediate frontend patch enforcing mandatory pre-session disclosure modal.",
    residualRisk: "Low"
  },
  {
    id: "R-09",
    name: "Customer Service Agent Displacement Anxiety",
    priority: "P3-Routine",
    strategy: "Mitigate",
    owner: "HR + CS Lead",
    monitoringCadence: "Quarterly Staff Pulse Survey",
    fallbackTrigger: "Agent satisfaction score < 3.5 / 5.0 OR turnover spike",
    fallbackAction: "Conduct agent feedback town hall; reinforce 'AI-augmented, no-layoffs' charter.",
    residualRisk: "Medium"
  },
  {
    id: "R-10",
    name: "Regulatory Non-Compliance with Consumer Rules",
    priority: "P1-Critical",
    strategy: "Mitigate",
    owner: "Head of Compliance",
    monitoringCadence: "Quarterly Review + Ongoing Horizon Scan",
    fallbackTrigger: "New binding central bank circular issued affecting conversational AI",
    fallbackAction: "Convene compliance task force; update policies within 10 business days.",
    residualRisk: "Low"
  },
  {
    id: "R-11",
    name: "System Outage With No Fallback",
    priority: "P3-Routine",
    strategy: "Mitigate",
    owner: "Infrastructure Lead",
    monitoringCadence: "Continuous Uptime Telemetry",
    fallbackTrigger: "API response latency > 5s for > 5 mins OR 5xx error rate > 1%",
    fallbackAction: "Graceful degradation: display static customer FAQ + direct human call link.",
    residualRisk: "Low"
  },
  {
    id: "R-12",
    name: "Cross-Border Sovereign Data Residency Violation",
    priority: "P3-Routine",
    strategy: "Mitigate",
    owner: "DPO + Infrastructure Lead",
    monitoringCadence: "Monthly Edge Routing Audit",
    fallbackTrigger: "Inference session routed to edge node outside sovereign geographic boundary",
    fallbackAction: "Lock edge worker deployment to strict sovereign regional jurisdiction.",
    residualRisk: "Low"
  },
  {
    id: "R-13",
    name: "Insufficient Audit Trail for Supervisory Examination",
    priority: "P3-Routine",
    strategy: "Mitigate",
    owner: "Compliance + Data Lead",
    monitoringCadence: "Quarterly Audit Trail Test",
    fallbackTrigger: "Audit trail completeness check < 99.9% OR missing conversation metadata",
    fallbackAction: "Remediate logging ingestion pipeline; re-test with sample supervisory audit.",
    residualRisk: "Low"
  }
];

// Continuous Improvement Log Items from docs/04-manage/MANAGE-Continuous-Improvement-Log.csv
const MANAGE_IMPROVEMENT_ITEMS = [
  {
    id: "IMP-001",
    dateIdentified: "2026-02-16",
    source: "Incident PIR-2026-001",
    description: "Update system prompt with negative constraint blocking pension tax calculations and retirement formulas.",
    category: "Technical / Guardrails",
    priority: "P1-Critical",
    linkedRisk: "R-01",
    linkedMetric: "M-02",
    owner: "AI/ML Lead",
    status: "Complete",
    targetDate: "2026-02-25",
    dateCompleted: "2026-02-22",
    tevvRequired: "Yes",
    tevvSuite: "TS-04 (Safety)",
    tevvResult: "Pass (0% tax advice)",
    approvedBy: "AI Risk Officer",
    outcome: "Eliminated unauthorized tax advisory outputs; TS-04 re-test passed."
  },
  {
    id: "IMP-002",
    dateIdentified: "2026-04-20",
    source: "Incident PIR-2026-002",
    description: "Expand distress keyword taxonomy with 45 bereavement and grief euphemisms to accelerate auto-escalation.",
    category: "Knowledge Base / NLP",
    priority: "P1-Critical",
    linkedRisk: "R-02",
    linkedMetric: "M-16",
    owner: "CS Lead",
    status: "Complete",
    targetDate: "2026-04-30",
    dateCompleted: "2026-04-28",
    tevvRequired: "Yes",
    tevvSuite: "FAI-05 (Vulnerable Stress)",
    tevvResult: "Pass (100% escalated)",
    approvedBy: "AI Ethics Officer",
    outcome: "100% of bereavement dialogue test cases now successfully transfer to human operators."
  },
  {
    id: "IMP-003",
    dateIdentified: "2026-06-25",
    source: "Incident PIR-2026-003",
    description: "Incorporate 84 novel adversarial jailbreak probing prompts into bi-annual security regression benchmark.",
    category: "Security / Red Team",
    priority: "P2-High",
    linkedRisk: "R-05",
    linkedMetric: "M-05",
    owner: "InfoSec Lead",
    status: "Complete",
    targetDate: "2026-07-10",
    dateCompleted: "2026-07-08",
    tevvRequired: "Yes",
    tevvSuite: "TS-05 (Security)",
    tevvResult: "Pass (99.4% resistance)",
    approvedBy: "CISO",
    outcome: "Hardened perimeter against overseas jailbreak attempts."
  },
  {
    id: "IMP-004",
    dateIdentified: "2026-10-14",
    source: "Incident PIR-2026-006",
    description: "Augment semantic embedding dictionary with 120 regional dialectal banking terms to eliminate intent misclassifications.",
    category: "Knowledge Base / NLP",
    priority: "P2-High",
    linkedRisk: "R-03",
    linkedMetric: "M-08",
    owner: "AI/ML Lead",
    status: "Complete",
    targetDate: "2026-10-25",
    dateCompleted: "2026-10-18",
    tevvRequired: "Yes",
    tevvSuite: "TS-02 (Intent)",
    tevvResult: "Pass (94.7% accuracy)",
    approvedBy: "TEVV Team Lead",
    outcome: "Dialectal intent accuracy improved from 88.2% to 94.7%."
  },
  {
    id: "IMP-005",
    dateIdentified: "2026-09-01",
    source: "Customer Satisfaction Survey",
    description: "Redesign 'Speak with a Person' button with persistent floating placement across all mobile screen sizes.",
    category: "UX / Accessibility",
    priority: "P3-Medium",
    linkedRisk: "R-07",
    linkedMetric: "M-10",
    owner: "UX Research Lead",
    status: "Complete",
    targetDate: "2026-09-20",
    dateCompleted: "2026-09-15",
    tevvRequired: "Yes",
    tevvSuite: "TS-11 (UAT)",
    tevvResult: "Pass (CSAT 4.3/5)",
    approvedBy: "Head of Retail Banking",
    outcome: "Customer pilot satisfaction rose from 3.9 to 4.3."
  },
  {
    id: "IMP-006",
    dateIdentified: "2026-10-05",
    source: "Agent Feedback Portal",
    description: "Automatically pre-populate human agent triage screen with conversation summary and customer sentiment badge.",
    category: "Process / Tooling",
    priority: "P3-Medium",
    linkedRisk: "R-09",
    linkedMetric: "M-14",
    owner: "AI Operations Lead",
    status: "In Progress",
    targetDate: "2026-11-15",
    dateCompleted: "—",
    tevvRequired: "No",
    tevvSuite: "N/A",
    tevvResult: "N/A",
    approvedBy: "CS Lead",
    outcome: "Pending deployment in sprint 24."
  }
];

// Pre-evaluated MANAGE Profiles for all 6 Inventory Systems
const SYSTEM_MANAGE_PROFILES = {
  "AI-001": {
    systemId: "SYS-FIN-001",
    name: "FinAssist AI",
    dept: "Retail Banking",
    riskTier: "High",
    operationalStatus: "Normal Operations",
    activeP1Count: 0,
    totalIncidents: 6,
    resolvedIncidents: 6,
    containmentSlaRate: "100% (< 15 min)",
    playbooksActive: "7 Playbooks Ready",
    managedRisksCount: "13 of 13 Mapped",
    improvementsTotal: 6,
    improvementsComplete: 5,
    lastIncidentDate: "2026-10-12"
  },
  "SYS-FIN-001": {
    systemId: "SYS-FIN-001",
    name: "FinAssist AI",
    dept: "Retail Banking",
    riskTier: "High",
    operationalStatus: "Normal Operations",
    activeP1Count: 0,
    totalIncidents: 6,
    resolvedIncidents: 6,
    containmentSlaRate: "100% (< 15 min)",
    playbooksActive: "7 Playbooks Ready",
    managedRisksCount: "13 of 13 Mapped",
    improvementsTotal: 6,
    improvementsComplete: 5,
    lastIncidentDate: "2026-10-12"
  },
  "AI-002": {
    systemId: "SYS-HR-002",
    name: "TalentMatch AI",
    dept: "Human Resources",
    riskTier: "Critical",
    operationalStatus: "Restricted (Deployment Blocked)",
    activeP1Count: 1,
    totalIncidents: 4,
    resolvedIncidents: 3,
    containmentSlaRate: "75%",
    playbooksActive: "Playbook G Active",
    managedRisksCount: "11 of 13 Mapped",
    improvementsTotal: 4,
    improvementsComplete: 2,
    lastIncidentDate: "2026-09-28"
  },
  "SYS-HR-002": {
    systemId: "SYS-HR-002",
    name: "TalentMatch AI",
    dept: "Human Resources",
    riskTier: "Critical",
    operationalStatus: "Restricted (Deployment Blocked)",
    activeP1Count: 1,
    totalIncidents: 4,
    resolvedIncidents: 3,
    containmentSlaRate: "75%",
    playbooksActive: "Playbook G Active",
    managedRisksCount: "11 of 13 Mapped",
    improvementsTotal: 4,
    improvementsComplete: 2,
    lastIncidentDate: "2026-09-28"
  },
  "AI-003": {
    systemId: "SYS-CRD-003",
    name: "CreditScorer Pro",
    dept: "Risk Management",
    riskTier: "Critical",
    operationalStatus: "Normal Operations",
    activeP1Count: 0,
    totalIncidents: 2,
    resolvedIncidents: 2,
    containmentSlaRate: "100%",
    playbooksActive: "All Playbooks Ready",
    managedRisksCount: "13 of 13 Mapped",
    improvementsTotal: 3,
    improvementsComplete: 3,
    lastIncidentDate: "2026-07-15"
  },
  "SYS-CRD-003": {
    systemId: "SYS-CRD-003",
    name: "CreditScorer Pro",
    dept: "Risk Management",
    riskTier: "Critical",
    operationalStatus: "Normal Operations",
    activeP1Count: 0,
    totalIncidents: 2,
    resolvedIncidents: 2,
    containmentSlaRate: "100%",
    playbooksActive: "All Playbooks Ready",
    managedRisksCount: "13 of 13 Mapped",
    improvementsTotal: 3,
    improvementsComplete: 3,
    lastIncidentDate: "2026-07-15"
  },
  "AI-004": {
    systemId: "SYS-OPS-004",
    name: "OpsMonitor Realtime",
    dept: "Operations",
    riskTier: "Medium",
    operationalStatus: "Monitoring Mode",
    activeP1Count: 0,
    totalIncidents: 3,
    resolvedIncidents: 3,
    containmentSlaRate: "100%",
    playbooksActive: "Playbook E Active",
    managedRisksCount: "10 of 13 Mapped",
    improvementsTotal: 3,
    improvementsComplete: 2,
    lastIncidentDate: "2026-10-04"
  },
  "SYS-OPS-004": {
    systemId: "SYS-OPS-004",
    name: "OpsMonitor Realtime",
    dept: "Operations",
    riskTier: "Medium",
    operationalStatus: "Monitoring Mode",
    activeP1Count: 0,
    totalIncidents: 3,
    resolvedIncidents: 3,
    containmentSlaRate: "100%",
    playbooksActive: "Playbook E Active",
    managedRisksCount: "10 of 13 Mapped",
    improvementsTotal: 3,
    improvementsComplete: 2,
    lastIncidentDate: "2026-10-04"
  },
  "AI-005": {
    systemId: "SYS-LEG-005",
    name: "ClauseScan Legal AI",
    dept: "Legal & Compliance",
    riskTier: "High",
    operationalStatus: "Normal Operations",
    activeP1Count: 0,
    totalIncidents: 1,
    resolvedIncidents: 1,
    containmentSlaRate: "100%",
    playbooksActive: "Playbook F Ready",
    managedRisksCount: "12 of 13 Mapped",
    improvementsTotal: 2,
    improvementsComplete: 2,
    lastIncidentDate: "2026-08-30"
  },
  "SYS-LEG-005": {
    systemId: "SYS-LEG-005",
    name: "ClauseScan Legal AI",
    dept: "Legal & Compliance",
    riskTier: "High",
    operationalStatus: "Normal Operations",
    activeP1Count: 0,
    totalIncidents: 1,
    resolvedIncidents: 1,
    containmentSlaRate: "100%",
    playbooksActive: "Playbook F Ready",
    managedRisksCount: "12 of 13 Mapped",
    improvementsTotal: 2,
    improvementsComplete: 2,
    lastIncidentDate: "2026-08-30"
  },
  "AI-006": {
    systemId: "SYS-MKT-006",
    name: "CampaignGen Pro",
    dept: "Marketing",
    riskTier: "Low",
    operationalStatus: "Normal Operations",
    activeP1Count: 0,
    totalIncidents: 1,
    resolvedIncidents: 1,
    containmentSlaRate: "100%",
    playbooksActive: "Standard Playbooks",
    managedRisksCount: "8 of 13 Mapped",
    improvementsTotal: 1,
    improvementsComplete: 1,
    lastIncidentDate: "2026-09-14"
  },
  "SYS-MKT-006": {
    systemId: "SYS-MKT-006",
    name: "CampaignGen Pro",
    dept: "Marketing",
    riskTier: "Low",
    operationalStatus: "Normal Operations",
    activeP1Count: 0,
    totalIncidents: 1,
    resolvedIncidents: 1,
    containmentSlaRate: "100%",
    playbooksActive: "Standard Playbooks",
    managedRisksCount: "8 of 13 Mapped",
    improvementsTotal: 1,
    improvementsComplete: 1,
    lastIncidentDate: "2026-09-14"
  }
};

// Aliases for compatibility
const MANAGE_INCIDENTS_DATA = MANAGE_INCIDENTS_REGISTER;
const MANAGE_IMPROVEMENTS_DATA = MANAGE_IMPROVEMENT_ITEMS;

// Global exports for browser window and Node testing
if (typeof window !== 'undefined') {
  window.MANAGE_METADATA = MANAGE_METADATA;
  window.MANAGE_INCIDENTS_REGISTER = MANAGE_INCIDENTS_REGISTER;
  window.MANAGE_INCIDENTS_DATA = MANAGE_INCIDENTS_DATA;
  window.MANAGE_PLAYBOOKS = MANAGE_PLAYBOOKS;
  window.MANAGE_RISK_RESPONSES = MANAGE_RISK_RESPONSES;
  window.MANAGE_IMPROVEMENT_ITEMS = MANAGE_IMPROVEMENT_ITEMS;
  window.MANAGE_IMPROVEMENTS_DATA = MANAGE_IMPROVEMENTS_DATA;
  window.SYSTEM_MANAGE_PROFILES = SYSTEM_MANAGE_PROFILES;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MANAGE_METADATA,
    MANAGE_INCIDENTS_REGISTER,
    MANAGE_INCIDENTS_DATA,
    MANAGE_PLAYBOOKS,
    MANAGE_RISK_RESPONSES,
    MANAGE_IMPROVEMENT_ITEMS,
    MANAGE_IMPROVEMENTS_DATA,
    SYSTEM_MANAGE_PROFILES
  };
}
