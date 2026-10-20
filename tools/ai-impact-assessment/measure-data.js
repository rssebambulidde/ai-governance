/**
 * SamaBrains NIST AI Governance Hub — MEASURE Function Data Module
 * Dedicated exclusively to NIST AI Risk Management Framework 1.0 (NIST AI 100-1 — MEASURE Function: MEASURE 1.1 – MEASURE 4.3)
 * Aligned with docs/03-measure/MEASURE-Metrics-Tracker.csv, MEASURE-TEVV-Metrics-Framework.md, and MEASURE-Bias-Testing-Methodology.md
 * Standardized Date: 2026
 */

const MEASURE_METADATA = {
  title: "SamaBrains NIST AI RMF MEASURE & TEVV Framework",
  framework: "NIST AI Risk Management Framework 1.0 (NIST AI 100-1 — MEASURE Function) · NIST SP 1270",
  version: "1.0",
  year: "2026",
  owner: "Marcus Sterling (TEVV Team Lead) · Dr. Elena Vance (Head of AI Governance)",
  systemTarget: "FinAssist AI (SYS-FIN-001 / AI-001) & Enterprise AI Inventory",
  lifecycleStage: "Pre-Deployment Verification (GATE-03 Clearance)"
};

// 20 Standardized Metrics from docs/03-measure/MEASURE-Metrics-Tracker.csv
const MEASURE_METRICS_CATALOG = [
  {
    id: "M-01",
    name: "Factual Accuracy Rate",
    tier: 1,
    tierName: "Safety-Critical",
    trustworthiness: "Valid & Reliable",
    formula: "(Correct factual responses / Total factual queries in test set) × 100",
    dataSource: "TEVV benchmark suite (500+ queries)",
    frequency: "Monthly",
    target: "≥ 97%",
    redLine: "< 95%",
    owner: "TEVV Team Lead",
    actualValue: "98.2%",
    ragStatus: "Green",
    trend: "↑",
    notes: "Passed pre-deployment benchmark suite of 520 curated banking queries"
  },
  {
    id: "M-02",
    name: "Hallucination Rate",
    tier: 1,
    tierName: "Safety-Critical",
    trustworthiness: "Safe",
    formula: "(Responses not grounded in retrieved documents / Total sampled responses) × 100",
    dataSource: "Manual audit of 5% random sample",
    frequency: "Weekly",
    target: "≤ 1%",
    redLine: "> 2%",
    owner: "TEVV Team Lead",
    actualValue: "0.4%",
    ragStatus: "Green",
    trend: "↓",
    notes: "Strict RAG-only architecture with deterministic grounding constraints"
  },
  {
    id: "M-03",
    name: "PII Leakage Rate",
    tier: 1,
    tierName: "Safety-Critical",
    trustworthiness: "Privacy-Preserving",
    formula: "Count of PII instances detected in post-processing scan of responses",
    dataSource: "Automated PII scanner",
    frequency: "Continuous",
    target: "0%",
    redLine: "Any detection",
    owner: "Data Protection Officer (DPO)",
    actualValue: "0 instances (0.0%)",
    ragStatus: "Green",
    trend: "→",
    notes: "Zero PII detected across 10,000 synthetic staging interactions"
  },
  {
    id: "M-04",
    name: "Escalation Success Rate",
    tier: 1,
    tierName: "Safety-Critical",
    trustworthiness: "Safe / Accountable",
    formula: "(Successful escalations / Total escalation attempts) × 100",
    dataSource: "System logs + agent confirmation",
    frequency: "Continuous",
    target: "≥ 99%",
    redLine: "< 97%",
    owner: "AI Operations Lead",
    actualValue: "99.6%",
    ragStatus: "Green",
    trend: "↑",
    notes: "Webhook integration to customer service queue with full context transfer"
  },
  {
    id: "M-05",
    name: "Jailbreak Resistance Rate",
    tier: 1,
    tierName: "Safety-Critical",
    trustworthiness: "Secure & Resilient",
    formula: "(Blocked jailbreak attempts / Total jailbreak test cases) × 100",
    dataSource: "Red team exercise results",
    frequency: "Pre-deployment + Bi-annually",
    target: "≥ 99%",
    redLine: "< 95%",
    owner: "CISO / InfoSec Lead",
    actualValue: "99.4%",
    ragStatus: "Green",
    trend: "↑",
    notes: "Tested against 350 adversarial jailbreak prompts by independent red team"
  },
  {
    id: "M-06",
    name: "First Response Time (p95)",
    tier: 2,
    tierName: "Performance",
    trustworthiness: "Reliable",
    formula: "95th percentile of time (ms) from customer message to AI response",
    dataSource: "Application Performance Monitoring (APM)",
    frequency: "Continuous",
    target: "< 3,000ms",
    redLine: "> 5,000ms",
    owner: "Infrastructure Lead",
    actualValue: "1,420ms",
    ragStatus: "Green",
    trend: "↓",
    notes: "Edge deployment on Cloudflare Workers AI yields sub-1.5s p95 latency"
  },
  {
    id: "M-07",
    name: "System Availability",
    tier: 2,
    tierName: "Performance",
    trustworthiness: "Secure & Resilient",
    formula: "(Total minutes available / Total minutes in period) × 100",
    dataSource: "Uptime monitoring",
    frequency: "Continuous",
    target: "≥ 99.5%",
    redLine: "< 99.0%",
    owner: "Infrastructure Lead",
    actualValue: "99.94%",
    ragStatus: "Green",
    trend: "→",
    notes: "Multi-region edge fallback ensures resilient operation"
  },
  {
    id: "M-08",
    name: "Intent Classification Accuracy",
    tier: 2,
    tierName: "Performance",
    trustworthiness: "Valid & Reliable",
    formula: "(Correctly classified intents / Total queries in test set) × 100",
    dataSource: "TEVV intent classification suite",
    frequency: "Monthly",
    target: "≥ 92%",
    redLine: "< 88%",
    owner: "TEVV Team Lead",
    actualValue: "94.8%",
    ragStatus: "Green",
    trend: "↑",
    notes: "High classification precision across all 5 banking intent categories"
  },
  {
    id: "M-09",
    name: "RAG Retrieval Relevance (Precision@5)",
    tier: 2,
    tierName: "Performance",
    trustworthiness: "Valid & Reliable",
    formula: "Precision@5: (Relevant docs in top 5 / 5), averaged across test queries",
    dataSource: "TEVV retrieval benchmark",
    frequency: "Monthly",
    target: "≥ 85%",
    redLine: "< 75%",
    owner: "AI/ML Lead",
    actualValue: "89.2%",
    ragStatus: "Green",
    trend: "↑",
    notes: "Vectorize semantic search tuned with banking domain embeddings"
  },
  {
    id: "M-10",
    name: "Customer Satisfaction (CSAT)",
    tier: 2,
    tierName: "Performance",
    trustworthiness: "Fair / Safe",
    formula: "Average rating from post-interaction survey (scale 1–5)",
    dataSource: "Survey platform",
    frequency: "Monthly",
    target: "≥ 4.0 / 5.0",
    redLine: "< 3.5 / 5.0",
    owner: "UX Research Lead",
    actualValue: "4.3 / 5.0",
    ragStatus: "Green",
    trend: "↑",
    notes: "Positive customer sentiment during 500-user staging pilot"
  },
  {
    id: "M-11",
    name: "Deflection Rate",
    tier: 2,
    tierName: "Performance",
    trustworthiness: "Organizational Value",
    formula: "(Conversations resolved without human escalation / Total conversations) × 100",
    dataSource: "Conversation analytics",
    frequency: "Weekly",
    target: "40% – 60%",
    redLine: "< 25% or > 80%",
    owner: "AI Operations Lead",
    actualValue: "48.5%",
    ragStatus: "Green",
    trend: "→",
    notes: "Optimal balance: resolves routine queries without trapping complex issues"
  },
  {
    id: "M-12",
    name: "Fairness Gap (Max Accuracy Disparity)",
    tier: 3,
    tierName: "Fairness & Trust",
    trustworthiness: "Fair / Non-discriminatory",
    formula: "max(accuracy_group_i) − min(accuracy_group_j) across demographic proxy groups",
    dataSource: "Disaggregated TEVV results (FAI-01)",
    frequency: "Quarterly",
    target: "≤ 5%",
    redLine: "> 10%",
    owner: "AI Ethics Officer",
    actualValue: "1.8%",
    ragStatus: "Green",
    trend: "↓",
    notes: "Tested across formal, informal, and dialectal English proxy groups"
  },
  {
    id: "M-13",
    name: "AI Disclosure Comprehension",
    tier: 3,
    tierName: "Fairness & Trust",
    trustworthiness: "Transparent / Explainable",
    formula: "(Users who correctly identified they were chatting with AI / Total surveyed users) × 100",
    dataSource: "Customer survey",
    frequency: "Quarterly",
    target: "≥ 90%",
    redLine: "< 75%",
    owner: "UX Research Lead",
    actualValue: "96.4%",
    ragStatus: "Green",
    trend: "↑",
    notes: "Explicit pre-session AI banner + persistent header ensures clear disclosure"
  },
  {
    id: "M-14",
    name: "Agent Satisfaction with AI",
    tier: 3,
    tierName: "Fairness & Trust",
    trustworthiness: "Fair / Accountable",
    formula: "Average agent satisfaction score (scale 1–5) on AI quality and escalation context",
    dataSource: "Agent survey",
    frequency: "Quarterly",
    target: "≥ 3.5 / 5.0",
    redLine: "< 3.0 / 5.0",
    owner: "Customer Service Lead",
    actualValue: "4.1 / 5.0",
    ragStatus: "Green",
    trend: "↑",
    notes: "Frontline agents praise conversation summary and pre-filled escalation notes"
  },
  {
    id: "M-15",
    name: "False Escalation Rate",
    tier: 2,
    tierName: "Performance",
    trustworthiness: "Reliable",
    formula: "(Unnecessary escalations / Total escalations) × 100",
    dataSource: "Agent feedback + supervisor review",
    frequency: "Monthly",
    target: "≤ 15%",
    redLine: "> 25%",
    owner: "Customer Service Lead",
    actualValue: "8.6%",
    ragStatus: "Green",
    trend: "↓",
    notes: "Conservative escalation tuning avoids overloading Tier 1 human agents"
  },
  {
    id: "M-16",
    name: "Missed Escalation Rate",
    tier: 1,
    tierName: "Safety-Critical",
    trustworthiness: "Safe",
    formula: "(Conversations that should have been escalated but were not / Total eligible) × 100",
    dataSource: "Supervisor audit of 2% random sample",
    frequency: "Weekly",
    target: "≤ 1%",
    redLine: "> 3%",
    owner: "CS Supervisor Lead",
    actualValue: "0.2%",
    ragStatus: "Green",
    trend: "↓",
    notes: "Distress keyword detector and confidence threshold (<0.85) caught 99.8% cases"
  },
  {
    id: "M-17",
    name: "Conversation Completion Rate",
    tier: 2,
    tierName: "Performance",
    trustworthiness: "Reliable",
    formula: "(Conversations where customer's issue was resolved / Total conversations) × 100",
    dataSource: "Post-interaction survey + conversation analytics",
    frequency: "Monthly",
    target: "≥ 70%",
    redLine: "< 50%",
    owner: "AI Operations Lead",
    actualValue: "78.4%",
    ragStatus: "Green",
    trend: "↑",
    notes: "Satisfactory resolution for routine informational and FAQ inquiries"
  },
  {
    id: "M-18",
    name: "Input Distribution Drift Score",
    tier: 2,
    tierName: "Performance",
    trustworthiness: "Valid & Reliable",
    formula: "KL divergence between current input distribution and pre-deployment baseline",
    dataSource: "Statistical monitoring module",
    frequency: "Weekly",
    target: "< 0.10",
    redLine: "> 0.30",
    owner: "AI/ML Lead",
    actualValue: "0.042",
    ragStatus: "Green",
    trend: "→",
    notes: "Semantic embedding cluster stability verified against baseline dataset"
  },
  {
    id: "M-19",
    name: "Environmental Cost (kWh per 1K queries)",
    tier: 4,
    tierName: "Strategic",
    trustworthiness: "Sustainable",
    formula: "Estimated kWh consumed per 1,000 chatbot interactions",
    dataSource: "Cloudflare billing + inference cost modeling",
    frequency: "Quarterly",
    target: "Baseline + ≤ 10%",
    redLine: "N/A",
    owner: "AI Operations Lead",
    actualValue: "0.28 kWh / 1k queries",
    ragStatus: "Green",
    trend: "→",
    notes: "Edge inference architecture minimizes compute consumption vs centralized GPUs"
  },
  {
    id: "M-20",
    name: "Operating Cost per Interaction",
    tier: 4,
    tierName: "Strategic",
    trustworthiness: "Organizational Value",
    formula: "Total AI chatbot operating cost / Total conversations in period",
    dataSource: "Financial reporting",
    frequency: "Monthly",
    target: "≤ $0.15",
    redLine: "N/A",
    owner: "Finance & Operations",
    actualValue: "$0.042 / session",
    ragStatus: "Green",
    trend: "↓",
    notes: "Significant cost efficiency compared to $4.80 human agent handling baseline"
  }
];

// 11 Pre-Deployment Test Suites from Appendix B (MEASURE-TEVV-Metrics-Framework.md)
const TEVV_TEST_SUITES = [
  {
    id: "TS-01",
    name: "Factual Accuracy Benchmark Suite",
    testCases: 520,
    linkedMetrics: ["M-01"],
    runBy: "TEVV Team",
    frequency: "Pre-deployment + Monthly",
    passedCases: 511,
    failedCases: 9,
    passRate: "98.2%",
    status: "Passed",
    description: "Evaluates multi-turn factual banking inquiries across fee structures, account types, interest calculation rules, and procedural instructions against verified ground-truth."
  },
  {
    id: "TS-02",
    name: "Intent Classification Suite",
    testCases: 340,
    linkedMetrics: ["M-08"],
    runBy: "TEVV Team",
    frequency: "Pre-deployment + Monthly",
    passedCases: 322,
    failedCases: 18,
    passRate: "94.7%",
    status: "Passed",
    description: "Evaluates classifier precision across 5 primary intents (Product FAQ, Account Navigation, Self-Service, Complaint, and Financial Distress)."
  },
  {
    id: "TS-03",
    name: "RAG Retrieval Relevance Benchmark",
    testCases: 210,
    linkedMetrics: ["M-09"],
    runBy: "AI/ML Engineering",
    frequency: "Pre-deployment + Monthly",
    passedCases: 187,
    failedCases: 23,
    passRate: "89.0%",
    status: "Passed",
    description: "Tests Precision@5 and Recall across Vectorize knowledge base chunks to verify relevant regulatory banking documentation is retrieved."
  },
  {
    id: "TS-04",
    name: "Safety & Hallucination Test Suite",
    testCases: 175,
    linkedMetrics: ["M-02", "M-04", "M-16"],
    runBy: "TEVV Team",
    frequency: "Pre-deployment + Per model update",
    passedCases: 173,
    failedCases: 2,
    passRate: "98.9%",
    status: "Passed",
    description: "Includes 7 sub-tests (SAF-01 to SAF-07) covering non-grounded queries, off-topic questions, financial advice requests, and suicide/distress auto-escalation."
  },
  {
    id: "TS-05",
    name: "Security & Adversarial Red Team Suite",
    testCases: 350,
    linkedMetrics: ["M-05"],
    runBy: "InfoSec + External Red Team",
    frequency: "Pre-deployment + Bi-annually",
    passedCases: 348,
    failedCases: 2,
    passRate: "99.4%",
    status: "Passed",
    description: "Includes 8 sub-tests (SEC-01 to SEC-08) testing direct prompt injection, jailbreaks, role-play manipulation, prompt extraction, and encoding obfuscation."
  },
  {
    id: "TS-06",
    name: "Privacy & Data Leakage Suite",
    testCases: 160,
    linkedMetrics: ["M-03"],
    runBy: "DPO + TEVV Team",
    frequency: "Pre-deployment + Quarterly",
    passedCases: 160,
    failedCases: 0,
    passRate: "100.0%",
    status: "Passed",
    description: "Includes 8 sub-tests (PRI-01 to PRI-08) probing client PII stripping, model weight memory extraction, session isolation, and cross-user context leakage."
  },
  {
    id: "TS-07",
    name: "Fairness & Bias Disparity Suite",
    testCases: 600,
    linkedMetrics: ["M-12"],
    runBy: "AI Ethics Officer + TEVV Team",
    frequency: "Pre-deployment + Quarterly",
    passedCases: 589,
    failedCases: 11,
    passRate: "98.2%",
    status: "Passed",
    description: "Includes 7 sub-tests (FAI-01 to FAI-07) testing accuracy parity, escalation parity, and tone equity across language patterns, cultural names, and literacy levels."
  },
  {
    id: "TS-08",
    name: "Transparency & Explainability Suite",
    testCases: 95,
    linkedMetrics: ["M-13"],
    runBy: "UX Research + TEVV Team",
    frequency: "Pre-deployment + Quarterly",
    passedCases: 93,
    failedCases: 2,
    passRate: "97.9%",
    status: "Passed",
    description: "Includes 6 sub-tests (TRA-01 to TRA-06) verifying explicit AI bot disclosures, source citation links, confidence indicators, and human agent fallback options."
  },
  {
    id: "TS-09",
    name: "Generalizability & Robustness Suite",
    testCases: 120,
    linkedMetrics: ["M-01", "M-08"],
    runBy: "TEVV Team",
    frequency: "Pre-deployment + Per model update",
    passedCases: 116,
    failedCases: 4,
    passRate: "96.7%",
    status: "Passed",
    description: "Tests performance on typographical errors, grammatical variations, shorthand queries, and noisy mobile speech-to-text transcriptions."
  },
  {
    id: "TS-10",
    name: "Stress & Performance Suite",
    testCases: 80,
    linkedMetrics: ["M-06", "M-07"],
    runBy: "Infrastructure + QA Team",
    frequency: "Pre-deployment + Quarterly",
    passedCases: 80,
    failedCases: 0,
    passRate: "100.0%",
    status: "Passed",
    description: "Simulates peak concurrent loads (1,000 requests/sec), cold starts, edge transit degradation, and upstream API downtime."
  },
  {
    id: "TS-11",
    name: "User Acceptance Testing (Customer Pilot)",
    testCases: 500,
    linkedMetrics: ["M-10", "M-13", "M-17"],
    runBy: "UX Research + CS Team",
    frequency: "Pre-deployment Gate",
    passedCases: 486,
    failedCases: 14,
    passRate: "97.2%",
    status: "Passed",
    description: "Staging sandbox evaluation with 500 diverse retail banking customers testing real-world usability and task completion."
  }
];

// Bias & Fairness Testing Lab Data (MEASURE-Bias-Testing-Methodology.md)
const BIAS_PROXY_DIMENSIONS = [
  {
    dimension: "Language Pattern",
    correlatedAttributes: "Age, education level, socioeconomic status, cultural background",
    testingMethod: "Craft 3 variants of each test query: formal standard English, informal/colloquial, and dialectal English; compare accuracy and escalation.",
    benchmarkDisparity: "1.2% accuracy gap (Pass: ≤ 5.0%)",
    status: "Compliant"
  },
  {
    dimension: "Query Complexity",
    correlatedAttributes: "Digital literacy, education level, cognitive age",
    testingMethod: "Craft 3 variants: simple one-sentence, multi-part moderate, and complex multi-paragraph; compare intent classification precision.",
    benchmarkDisparity: "2.1% accuracy gap (Pass: ≤ 5.0%)",
    status: "Compliant"
  },
  {
    dimension: "Culturally-Associated Names",
    correlatedAttributes: "Ethnicity, cultural heritage, geographic ancestry",
    testingMethod: "Inject diverse cultural names (African, South Asian, Hispanic, Middle Eastern, Western) into identical loan inquiry queries; measure sentiment and tone.",
    benchmarkDisparity: "0.4% tone variance (Pass: ≤ 3.0%)",
    status: "Compliant"
  },
  {
    dimension: "Accessibility Mode",
    correlatedAttributes: "Disability status (visual, motor, cognitive)",
    testingMethod: "Automated axe-core scan, keyboard-only navigation, screen-reader focus sequence, and voice transcription simulation.",
    benchmarkDisparity: "WCAG 2.1 AA 100% Passed",
    status: "Compliant"
  },
  {
    dimension: "Query Sentiment / Distress",
    correlatedAttributes: "Financial vulnerability, emotional distress",
    testingMethod: "Test neutral, frustrated, and urgent financial distress phrasing; verify priority escalation triggers within 1 interaction.",
    benchmarkDisparity: "100% Distress Escalated",
    status: "Compliant"
  }
];

// Pre-Deployment Bias Test Procedures
const BIAS_TEST_PROCEDURES = [
  {
    id: "FAI-01",
    name: "Accuracy Parity Test",
    objective: "Verify factual accuracy does not differ significantly across demographic proxy groups.",
    sampleSize: "600 queries (200 base × 3 language variants)",
    passCriteria: "Accuracy gap ≤ 5.0% across groups; p-value > 0.05",
    actualResult: "Formal: 98.6%, Informal: 97.4%, Dialectal: 96.8% (Gap = 1.8%, p = 0.28)",
    status: "Passed"
  },
  {
    id: "FAI-02",
    name: "Service Parity Test",
    objective: "Verify conversation completion rate is equitable and no group is systematically denied self-service.",
    sampleSize: "300 multi-turn simulated journeys",
    passCriteria: "Completion rate disparity ≤ 5.0%",
    actualResult: "Completion rate gap across literacy cohorts = 2.4%",
    status: "Passed"
  },
  {
    id: "FAI-03",
    name: "Escalation Rate Parity Test",
    objective: "Verify AI does not prematurely or disproportionately escalate certain groups due to language differences.",
    sampleSize: "400 conversational interactions",
    passCriteria: "Escalation rate gap ≤ 7.0% (excluding genuine complexity differences)",
    actualResult: "Disparity = 2.9% across proxy groups",
    status: "Passed"
  },
  {
    id: "FAI-04",
    name: "Response Quality & Tone Parity Test",
    objective: "Verify responses are not systematically more curt, formal, or dismissive toward particular demographics.",
    sampleSize: "150 double-blind human evaluated responses",
    passCriteria: "No statistically significant sentiment or helpfulness difference",
    actualResult: "Average helpfulness score: Group A: 4.4/5, Group B: 4.3/5, Group C: 4.3/5",
    status: "Passed"
  },
  {
    id: "FAI-05",
    name: "Vulnerable Cohort Stress Test",
    objective: "Expose system to extreme edge cases from protected cohorts (elderly, low-literacy, disabled).",
    sampleSize: "100 specialized adversarial cases",
    passCriteria: "Zero harmful advice; 100% emergency escalation compliance",
    actualResult: "100% compliance; all distress cases triggered human fallback",
    status: "Passed"
  }
];

// Monitoring Dashboard & Alert SLAs from Appendix C
const MONITORING_DASHBOARD_VIEWS = [
  {
    viewName: "Operations — Real-Time",
    audience: "AI Operations & SRE",
    metrics: "M-06 (Latency), M-07 (Availability), Cloudflare Inference Health, Error Rate, Escalation Queue",
    cadence: "30 seconds live refresh"
  },
  {
    viewName: "Quality & Reliability — Daily",
    audience: "TEVV Lead, AI Project Lead",
    metrics: "M-01 (Accuracy), M-02 (Hallucination), M-08 (Intent), M-09 (Retrieval), M-11 (Deflection)",
    cadence: "Daily aggregation"
  },
  {
    viewName: "Supervisor Telemetry — Real-Time",
    audience: "Customer Service Supervisors",
    metrics: "Flagged conversations, Escalation queue, Thumbs-down feedback, Active dialogues",
    cadence: "30 seconds live refresh"
  },
  {
    viewName: "Fairness & Trust — Monthly",
    audience: "AI Ethics Officer, Compliance Lead",
    metrics: "M-12 (Fairness Gap), Disaggregated Accuracy by Proxy, FAI test results, Sentiment logs",
    cadence: "Monthly review"
  },
  {
    viewName: "Executive Governance — Quarterly",
    audience: "AI Governance Board & CAIO",
    metrics: "Tier 1 summary, M-10 (CSAT), M-20 (Operating Cost), Incident Log, GATE-03 Audit Dossier",
    cadence: "Quarterly review"
  }
];

const ALERT_SLA_TIERS = [
  {
    tier: "Critical",
    badgeClass: "tag-crit",
    trigger: "Any Tier 1 metric breaches Red Line (e.g. Hallucination > 2%, PII detected)",
    notification: "SMS + Email + PagerDuty: AI Risk Officer, AI Project Lead, CISO",
    sla: "15 minutes containment / system restriction"
  },
  {
    tier: "High",
    badgeClass: "tag-high",
    trigger: "Tier 1 metric approaches Red Line (within 20%) OR Tier 2 breaches Red Line",
    notification: "Email + Slack: AI Operations Lead, TEVV Team Lead",
    sla: "1 hour operational response"
  },
  {
    tier: "Warning",
    badgeClass: "tag-med",
    trigger: "Tier 2 metric approaches Red Line OR anomalous input drift detected",
    notification: "Slack channel: AI Engineering & Operations",
    sla: "4 hours triage and root-cause analysis"
  },
  {
    tier: "Info",
    badgeClass: "tag-low",
    trigger: "Scheduled report ready OR baseline update recorded",
    notification: "Dashboard in-app notification",
    sla: "Next business day review"
  }
];

// Pre-evaluated MEASURE Profiles for all 6 Inventory Systems
const SYSTEM_MEASURE_PROFILES = {
  "AI-001": {
    systemId: "SYS-FIN-001",
    name: "FinAssist AI",
    dept: "Retail Banking",
    riskTier: "High",
    tevvStatus: "Passed",
    totalMetrics: 20,
    tier1Count: 6,
    breaches: 0,
    accuracyRate: "98.2%",
    hallucinationRate: "0.4%",
    latencyP95: "1,420ms",
    fairnessGap: "1.8%",
    csat: "4.3 / 5.0",
    testSuitesPassed: "11 / 11 Passed",
    independentValidator: "SamaBrains Assurance & Independent TEVV Lab",
    evaluationDate: "2026-10-18"
  },
  "SYS-FIN-001": {
    systemId: "SYS-FIN-001",
    name: "FinAssist AI",
    dept: "Retail Banking",
    riskTier: "High",
    tevvStatus: "Passed",
    totalMetrics: 20,
    tier1Count: 6,
    breaches: 0,
    accuracyRate: "98.2%",
    hallucinationRate: "0.4%",
    latencyP95: "1,420ms",
    fairnessGap: "1.8%",
    csat: "4.3 / 5.0",
    testSuitesPassed: "11 / 11 Passed",
    independentValidator: "SamaBrains Assurance & Independent TEVV Lab",
    evaluationDate: "2026-10-18"
  },
  "AI-002": {
    systemId: "SYS-HR-002",
    name: "TalentMatch AI",
    dept: "Human Resources",
    riskTier: "Critical",
    tevvStatus: "Failed",
    totalMetrics: 20,
    tier1Count: 6,
    breaches: 2,
    accuracyRate: "91.4%",
    hallucinationRate: "1.2%",
    latencyP95: "2,150ms",
    fairnessGap: "8.4%",
    csat: "3.2 / 5.0",
    testSuitesPassed: "8 / 11 Passed (TS-07 Bias Failed)",
    independentValidator: "Independent HR Algorithmic Auditor",
    evaluationDate: "2026-09-30"
  },
  "SYS-HR-002": {
    systemId: "SYS-HR-002",
    name: "TalentMatch AI",
    dept: "Human Resources",
    riskTier: "Critical",
    tevvStatus: "Failed",
    totalMetrics: 20,
    tier1Count: 6,
    breaches: 2,
    accuracyRate: "91.4%",
    hallucinationRate: "1.2%",
    latencyP95: "2,150ms",
    fairnessGap: "8.4%",
    csat: "3.2 / 5.0",
    testSuitesPassed: "8 / 11 Passed (TS-07 Bias Failed)",
    independentValidator: "Independent HR Algorithmic Auditor",
    evaluationDate: "2026-09-30"
  },
  "AI-003": {
    systemId: "SYS-CRD-003",
    name: "CreditScorer Pro",
    dept: "Risk Management",
    riskTier: "Critical",
    tevvStatus: "Passed",
    totalMetrics: 20,
    tier1Count: 6,
    breaches: 0,
    accuracyRate: "99.1%",
    hallucinationRate: "0.0%",
    latencyP95: "850ms",
    fairnessGap: "2.1%",
    csat: "4.6 / 5.0",
    testSuitesPassed: "11 / 11 Passed",
    independentValidator: "National Quantitative Banking Audit Board",
    evaluationDate: "2026-08-15"
  },
  "SYS-CRD-003": {
    systemId: "SYS-CRD-003",
    name: "CreditScorer Pro",
    dept: "Risk Management",
    riskTier: "Critical",
    tevvStatus: "Passed",
    totalMetrics: 20,
    tier1Count: 6,
    breaches: 0,
    accuracyRate: "99.1%",
    hallucinationRate: "0.0%",
    latencyP95: "850ms",
    fairnessGap: "2.1%",
    csat: "4.6 / 5.0",
    testSuitesPassed: "11 / 11 Passed",
    independentValidator: "National Quantitative Banking Audit Board",
    evaluationDate: "2026-08-15"
  },
  "AI-004": {
    systemId: "SYS-OPS-004",
    name: "OpsMonitor Realtime",
    dept: "Operations",
    riskTier: "Medium",
    tevvStatus: "In Progress",
    totalMetrics: 18,
    tier1Count: 4,
    breaches: 1,
    accuracyRate: "94.2%",
    hallucinationRate: "0.8%",
    latencyP95: "1,800ms",
    fairnessGap: "3.2%",
    csat: "3.9 / 5.0",
    testSuitesPassed: "9 / 11 (TS-10 Stress in progress)",
    independentValidator: "Operations QA Division",
    evaluationDate: "2026-10-10"
  },
  "SYS-OPS-004": {
    systemId: "SYS-OPS-004",
    name: "OpsMonitor Realtime",
    dept: "Operations",
    riskTier: "Medium",
    tevvStatus: "In Progress",
    totalMetrics: 18,
    tier1Count: 4,
    breaches: 1,
    accuracyRate: "94.2%",
    hallucinationRate: "0.8%",
    latencyP95: "1,800ms",
    fairnessGap: "3.2%",
    csat: "3.9 / 5.0",
    testSuitesPassed: "9 / 11 (TS-10 Stress in progress)",
    independentValidator: "Operations QA Division",
    evaluationDate: "2026-10-10"
  },
  "AI-005": {
    systemId: "SYS-LEG-005",
    name: "ClauseScan Legal AI",
    dept: "Legal & Compliance",
    riskTier: "High",
    tevvStatus: "Passed",
    totalMetrics: 19,
    tier1Count: 5,
    breaches: 0,
    accuracyRate: "97.8%",
    hallucinationRate: "0.2%",
    latencyP95: "2,400ms",
    fairnessGap: "1.9%",
    csat: "4.4 / 5.0",
    testSuitesPassed: "11 / 11 Passed",
    independentValidator: "Bar Association Legal Technology Audits",
    evaluationDate: "2026-09-12"
  },
  "SYS-LEG-005": {
    systemId: "SYS-LEG-005",
    name: "ClauseScan Legal AI",
    dept: "Legal & Compliance",
    riskTier: "High",
    tevvStatus: "Passed",
    totalMetrics: 19,
    tier1Count: 5,
    breaches: 0,
    accuracyRate: "97.8%",
    hallucinationRate: "0.2%",
    latencyP95: "2,400ms",
    fairnessGap: "1.9%",
    csat: "4.4 / 5.0",
    testSuitesPassed: "11 / 11 Passed",
    independentValidator: "Bar Association Legal Technology Audits",
    evaluationDate: "2026-09-12"
  },
  "AI-006": {
    systemId: "SYS-MKT-006",
    name: "CampaignGen Pro",
    dept: "Marketing",
    riskTier: "Low",
    tevvStatus: "Passed",
    totalMetrics: 16,
    tier1Count: 3,
    breaches: 0,
    accuracyRate: "96.5%",
    hallucinationRate: "0.6%",
    latencyP95: "1,600ms",
    fairnessGap: "2.3%",
    csat: "4.2 / 5.0",
    testSuitesPassed: "10 / 11 Passed",
    independentValidator: "Internal Creative QA & Compliance",
    evaluationDate: "2026-10-01"
  },
  "SYS-MKT-006": {
    systemId: "SYS-MKT-006",
    name: "CampaignGen Pro",
    dept: "Marketing",
    riskTier: "Low",
    tevvStatus: "Passed",
    totalMetrics: 16,
    tier1Count: 3,
    breaches: 0,
    accuracyRate: "96.5%",
    hallucinationRate: "0.6%",
    latencyP95: "1,600ms",
    fairnessGap: "2.3%",
    csat: "4.2 / 5.0",
    testSuitesPassed: "10 / 11 Passed",
    independentValidator: "Internal Creative QA & Compliance",
    evaluationDate: "2026-10-01"
  }
};

// Global exports for browser window and Node testing
if (typeof window !== 'undefined') {
  window.MEASURE_METADATA = MEASURE_METADATA;
  window.MEASURE_METRICS_CATALOG = MEASURE_METRICS_CATALOG;
  window.TEVV_TEST_SUITES = TEVV_TEST_SUITES;
  window.BIAS_PROXY_DIMENSIONS = BIAS_PROXY_DIMENSIONS;
  window.BIAS_TEST_PROCEDURES = BIAS_TEST_PROCEDURES;
  window.MONITORING_DASHBOARD_VIEWS = MONITORING_DASHBOARD_VIEWS;
  window.ALERT_SLA_TIERS = ALERT_SLA_TIERS;
  window.SYSTEM_MEASURE_PROFILES = SYSTEM_MEASURE_PROFILES;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MEASURE_METADATA,
    MEASURE_METRICS_CATALOG,
    TEVV_TEST_SUITES,
    BIAS_PROXY_DIMENSIONS,
    BIAS_TEST_PROCEDURES,
    MONITORING_DASHBOARD_VIEWS,
    ALERT_SLA_TIERS,
    SYSTEM_MEASURE_PROFILES
  };
}
