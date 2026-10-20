/**
 * rmf-extensions-data.js
 * SamaBrains AI Governance Hub — Full NIST AI RMF 1.0 Coverage Extension
 *
 * This file provides data for all subcategories NOT yet covered in the
 * primary modules (inventory-data, roles-data, policy-data, map-data,
 * measure-data, manage-data).
 *
 * Labelled exactly as GOVERN 1.1, MAP 2.3, MEASURE 4.1 etc.
 * for precise traceability to the NIST AI RMF 1.0 framework.
 */

/* ============================================================
   GOVERN — MISSING SUBCATEGORIES
   ============================================================ */

// GOVERN 1.1 — Org-wide AI risk policies (extends existing policy module)
// GOVERN 1.2 — Accountability structures (extends principles in policy)
// GOVERN 1.5 — Risk tolerance configuration
// GOVERN 1.7 — Decommissioning procedures (partially in policy)
// GOVERN 2.3 — Cross-team collaboration
// GOVERN 3.1 — Org leadership decision alignment
// GOVERN 4.1 — Culture of responsible AI
// GOVERN 5.2 — Third-party risk monitoring
// GOVERN 6.1 — Assessment review cadence
// GOVERN 6.2 — Risk process improvement

const GOVERN_RISK_TOLERANCE = {
  levels: [
    {
      tier: 'Critical Risk',
      color: 'red',
      threshold: 'Impact ≥ 8/10 OR Likelihood ≥ 7/10',
      response: 'STOP — board sign-off required before any deployment',
      review: 'Immediate (same day)',
      examples: ['Autonomous financial decisions without human review', 'Medical diagnosis without clinician override']
    },
    {
      tier: 'High Risk',
      color: 'orange',
      threshold: 'Impact 6–7/10 OR Likelihood 5–6/10',
      response: 'Conditional PROCEED — AI Risk Officer + Legal approval + mandatory monitoring plan',
      review: 'Monthly',
      examples: ['Credit scoring AI', 'Hiring screening tools', 'Customer sentiment scoring']
    },
    {
      tier: 'Medium Risk',
      color: 'yellow',
      threshold: 'Impact 4–5/10 OR Likelihood 3–4/10',
      response: 'PROCEED with standard controls — TEVV complete, monitoring in place',
      review: 'Quarterly',
      examples: ['Document summarisation', 'Internal FAQ chatbot', 'Product recommendation engine']
    },
    {
      tier: 'Low Risk',
      color: 'green',
      threshold: 'Impact ≤ 3/10 AND Likelihood ≤ 2/10',
      response: 'PROCEED — standard monitoring, annual review sufficient',
      review: 'Annually',
      examples: ['Internal analytics dashboards', 'Grammar/spell check tools', 'Scheduling assistants']
    }
  ],
  acceptanceCriteria: [
    { id: 'TOLS-01', criterion: 'No AI system operates in a Critical risk tier without board attestation on file', ref: 'GOVERN 1.5' },
    { id: 'TOLS-02', criterion: 'High-risk systems require AI Risk Officer sign-off renewed every 12 months', ref: 'GOVERN 1.5' },
    { id: 'TOLS-03', criterion: 'Residual risk above tolerance triggers mandatory escalation to CAIO within 24 hours', ref: 'GOVERN 1.5' },
    { id: 'TOLS-04', criterion: 'All risk tolerance thresholds are reviewed and confirmed annually by the AI Ethics Committee', ref: 'GOVERN 1.5 & 6.2' },
    { id: 'TOLS-05', criterion: 'Risk tolerance settings are documented in system profiles and linked to AIIA reports', ref: 'GOVERN 1.5 & MANAGE 1.4' }
  ]
};

const GOVERN_CROSS_TEAM_COLLABORATION = [
  {
    id: 'COLLAB-01',
    practice: 'AI Risk Review Board (ARRB)',
    ref: 'GOVERN 2.3',
    frequency: 'Monthly',
    participants: ['CAIO', 'AI Risk Officer', 'Data Protection Officer', 'Legal Counsel', 'CISO'],
    purpose: 'Cross-functional review of all AI risk incidents, new deployments, and policy updates',
    output: 'ARRB Minutes & Action Register'
  },
  {
    id: 'COLLAB-02',
    practice: 'Pre-Deployment Cross-Functional Gate Review',
    ref: 'GOVERN 2.3 & GOVERN 1.3',
    frequency: 'Per deployment',
    participants: ['AI/ML Engineering', 'Product Owner', 'TEVV Team', 'AI Ethics Officer', 'Legal', 'Infosec'],
    purpose: 'Ensure all teams have reviewed and signed off before production release',
    output: 'GATE-04 Deployment Clearance Certificate'
  },
  {
    id: 'COLLAB-03',
    practice: 'AI Ethics Working Group',
    ref: 'GOVERN 2.3 & GOVERN 4.1',
    frequency: 'Bi-monthly',
    participants: ['AI Ethics Officer', 'HR Representative', 'Customer Advocacy Lead', 'Domain SME'],
    purpose: 'Ongoing ethical review, societal impact assessment, and stakeholder feedback integration',
    output: 'Ethics Working Group Report'
  },
  {
    id: 'COLLAB-04',
    practice: 'Vendor AI Risk Quarterly Review',
    ref: 'GOVERN 2.3 & GOVERN 5.2',
    frequency: 'Quarterly',
    participants: ['Procurement', 'AI Risk Officer', 'Legal', 'Infosec'],
    purpose: 'Assess third-party AI vendor SLA compliance, bias incidents, and contractual obligations',
    output: 'Third-Party Risk Scorecard'
  },
  {
    id: 'COLLAB-05',
    practice: 'Annual AI Risk Culture Survey',
    ref: 'GOVERN 4.1',
    frequency: 'Annual',
    participants: ['All AI-facing staff (≈ 450 personnel)'],
    purpose: 'Measure organisational awareness of AI risks, policy compliance, and ethical culture maturity',
    output: 'Culture Maturity Report submitted to Board'
  }
];

const GOVERN_LEADERSHIP_ALIGNMENT = [
  {
    id: 'LEAD-01',
    commitment: 'Board-Level AI Policy Endorsement',
    ref: 'GOVERN 3.1',
    cadence: 'Annual',
    evidence: 'Board resolution on file — AI Governance Policy v1.0 (Jan 2026)',
    owner: 'Board of Directors',
    status: 'Confirmed'
  },
  {
    id: 'LEAD-02',
    commitment: 'CAIO Mandate & Direct Board Reporting',
    ref: 'GOVERN 3.1',
    cadence: 'Quarterly report',
    evidence: 'CAIO reports directly to CEO; AI risk is standing Board agenda item',
    owner: 'CAIO / CEO',
    status: 'Confirmed'
  },
  {
    id: 'LEAD-03',
    commitment: 'AI Risk Tolerance Ratified by Executive Committee',
    ref: 'GOVERN 3.1 & GOVERN 1.5',
    cadence: 'Annual review',
    evidence: 'Executive Committee resolution — AI Risk Tolerance Framework v1.0',
    owner: 'Executive Committee',
    status: 'Confirmed'
  },
  {
    id: 'LEAD-04',
    commitment: 'Mandatory AI Ethics Training for all Senior Leaders',
    ref: 'GOVERN 3.1 & GOVERN 2.2',
    cadence: 'Annual',
    evidence: '100% completion by C-suite and VPs (Oct 2026 cohort)',
    owner: 'CAIO / HR',
    status: 'Confirmed'
  },
  {
    id: 'LEAD-05',
    commitment: 'AI Impact Assessment Mandatory for Critical Systems',
    ref: 'GOVERN 3.1 & GOVERN 4.2',
    cadence: 'Per deployment',
    evidence: 'AIIA process embedded in SDLC; non-compliance is a deployment blocker',
    owner: 'AI Risk Officer',
    status: 'Confirmed'
  }
];

const GOVERN_RESPONSIBLE_AI_CULTURE = [
  {
    id: 'CULT-01',
    initiative: 'AI Ethics Code of Conduct',
    ref: 'GOVERN 4.1',
    scope: 'All employees',
    description: 'Binding ethical code covering data use, AI decision transparency, human dignity, and escalation obligations',
    status: 'Active — v2.0 (Mar 2026)',
    measurable: 'Zero tolerance violations; tracked via ethics breach register'
  },
  {
    id: 'CULT-02',
    initiative: 'Responsible AI Champions Programme',
    ref: 'GOVERN 4.1',
    scope: '24 departmental champions (4 per business unit)',
    description: 'Embedded advocates trained quarterly on NIST AI RMF; surface risk signals to the AI Risk Officer',
    status: 'Active — cohort 3 (Q3 2026)',
    measurable: 'Monthly champion reports; ≥ 90% departments engaged'
  },
  {
    id: 'CULT-03',
    initiative: 'Anonymous AI Risk Reporting Hotline',
    ref: 'GOVERN 4.1',
    scope: 'All employees and contractors',
    description: 'Protected channel to report AI risks, ethical concerns, or policy violations without fear of reprisal',
    status: 'Active — hotline@samabrains-ai-hub.internal',
    measurable: '≥ 3 reports reviewed per quarter; all actioned within 5 business days'
  },
  {
    id: 'CULT-04',
    initiative: 'AI Risk in Performance Reviews',
    ref: 'GOVERN 4.1',
    scope: 'All AI project owners and engineers',
    description: 'AI risk management responsibility included as criterion in annual performance assessments',
    status: 'Active — embedded in Q4 2026 cycle',
    measurable: '100% of AI roles have AI risk KPI in their performance plan'
  }
];

const GOVERN_THIRD_PARTY_MONITORING = [
  {
    id: 'TPMON-01',
    vendor: 'OpenAI (GPT-4o Inference API)',
    ref: 'GOVERN 5.2',
    riskLevel: 'High',
    contractClause: 'SLA §7.4 — Model drift notification within 48 hours of major update',
    monitoringFrequency: 'Real-time (drift alerts) + Quarterly audit',
    lastAudit: 'Sep 2026',
    complianceStatus: 'Compliant',
    openFindings: 0
  },
  {
    id: 'TPMON-02',
    vendor: 'Pinecone (Vector Search)',
    ref: 'GOVERN 5.2',
    riskLevel: 'Medium',
    contractClause: 'DPA §3.1 — Data residency EU/UK only; no cross-border training',
    monitoringFrequency: 'Quarterly audit + Annual penetration test',
    lastAudit: 'Aug 2026',
    complianceStatus: 'Compliant',
    openFindings: 0
  },
  {
    id: 'TPMON-03',
    vendor: 'AWS (Transcribe + S3 Data Lake)',
    ref: 'GOVERN 5.2',
    riskLevel: 'High',
    contractClause: 'MSA §12.2 — GDPR Art.28 DPA in force; SOC2 Type II annual attestation required',
    monitoringFrequency: 'Continuous compliance monitoring + Annual SOC2 review',
    lastAudit: 'Oct 2026',
    complianceStatus: 'Compliant',
    openFindings: 1
  },
  {
    id: 'TPMON-04',
    vendor: 'Palantir (Model Explainability Layer)',
    ref: 'GOVERN 5.2',
    riskLevel: 'Medium',
    contractClause: 'MSA §5.1 — Explainability outputs must meet FCA interpretability guidance',
    monitoringFrequency: 'Semi-annual audit',
    lastAudit: 'Jul 2026',
    complianceStatus: 'Under Review',
    openFindings: 2
  }
];

const GOVERN_ASSESSMENT_REVIEW = [
  {
    id: 'REV-01',
    system: 'SYS-FIN-001 (FinAssist AI)',
    ref: 'GOVERN 6.1',
    riskTier: 'Critical',
    reviewCycle: 'Quarterly',
    lastReview: 'Oct 2026',
    nextReview: 'Jan 2027',
    reviewedBy: 'AI Risk Officer + Legal',
    findings: '0 material changes; continuous monitoring thresholds confirmed',
    status: 'Current'
  },
  {
    id: 'REV-02',
    system: 'SYS-HR-002 (TalentScore AI)',
    ref: 'GOVERN 6.1',
    riskTier: 'High',
    reviewCycle: 'Quarterly',
    lastReview: 'Sep 2026',
    nextReview: 'Dec 2026',
    reviewedBy: 'AI Ethics Officer + HR Director',
    findings: 'Updated bias thresholds after Q3 audit; new protected attribute proxy added',
    status: 'Current'
  },
  {
    id: 'REV-03',
    system: 'SYS-CRD-003 (CreditWise AI)',
    ref: 'GOVERN 6.1',
    riskTier: 'Critical',
    reviewCycle: 'Monthly',
    lastReview: 'Oct 2026',
    nextReview: 'Nov 2026',
    reviewedBy: 'AI Risk Officer + Compliance',
    findings: 'Regulatory guidance updated; 2 new monitoring metrics added',
    status: 'Current'
  },
  {
    id: 'REV-04',
    system: 'SYS-OPS-004 (OpsOptimiser AI)',
    ref: 'GOVERN 6.1',
    riskTier: 'Medium',
    reviewCycle: 'Bi-annual',
    lastReview: 'Jun 2026',
    nextReview: 'Dec 2026',
    reviewedBy: 'AI Risk Officer',
    findings: 'No material changes; scope extension to logistics routing under review',
    status: 'Current'
  }
];

const GOVERN_PROCESS_IMPROVEMENT = [
  {
    id: 'IMP-G-01',
    improvement: 'Automated Risk Tolerance Breach Alerts',
    ref: 'GOVERN 6.2',
    trigger: 'Manual breach discovery in Q2 2026 audit',
    action: 'Integrated automated threshold alerting into monitoring pipeline',
    outcome: 'P1 breach detection time reduced from 48h → 2h',
    status: 'Completed',
    quarter: 'Q3 2026'
  },
  {
    id: 'IMP-G-02',
    improvement: 'Streamlined AIIA Sign-Off Workflow',
    ref: 'GOVERN 6.2',
    trigger: 'Average AIIA completion time was 18 days',
    action: 'Digital workflow with role-based approval routing and auto-reminders',
    outcome: 'Average AIIA completion time reduced to 7 days',
    status: 'Completed',
    quarter: 'Q2 2026'
  },
  {
    id: 'IMP-G-03',
    improvement: 'Quarterly Third-Party Vendor Scorecard',
    ref: 'GOVERN 6.2 & GOVERN 5.2',
    trigger: 'Vendor monitoring was ad-hoc; no formal cadence',
    action: 'Introduced structured quarterly vendor risk scorecard with mandatory senior review',
    outcome: 'All 4 high-risk vendors now formally reviewed; 3 open findings tracked',
    status: 'Completed',
    quarter: 'Q1 2026'
  },
  {
    id: 'IMP-G-04',
    improvement: 'Plain-Language AI Policy Summary for Non-Technical Staff',
    ref: 'GOVERN 6.2 & GOVERN 4.1',
    trigger: 'Culture survey showed only 54% of non-technical staff understood AI policy',
    action: 'Created a 1-page plain-language summary; embedded in onboarding and annual training',
    outcome: 'Survey comprehension rate improved to 88% (Q4 2026)',
    status: 'In Progress',
    quarter: 'Q4 2026'
  }
];

/* ============================================================
   MAP — MISSING SUBCATEGORIES
   ============================================================ */

// MAP 1.2 — Scientific knowledge & research
// MAP 1.3 — AI task classification
// MAP 1.5 — Risk tolerance applied
// MAP 1.6 — Practices & documentation
// MAP 2.1–2.3 — Scientific risk principles, expertise, data lineage
// MAP 4.2 — Internal expert review
// MAP 5.3 — External transparency

const MAP_AI_TASK_CLASSIFICATION = [
  {
    id: 'TASK-01',
    taskType: 'Natural Language Processing (NLP) — Information Retrieval',
    ref: 'MAP 1.3',
    description: 'System retrieves, summarises, and answers questions from structured knowledge bases',
    exampleSystems: ['SYS-FIN-001 FinAssist AI', 'SYS-LEG-005 ContractGuard AI'],
    riskProfile: 'High — factual accuracy and hallucination risk; regulatory exposure in financial/legal domains',
    nistCategory: 'MAP 1.3 — Context Establishment'
  },
  {
    id: 'TASK-02',
    taskType: 'Automated Decision-Making (ADM) — Scoring & Classification',
    ref: 'MAP 1.3',
    description: 'System produces a score, tier, or binary classification used to influence real-world outcomes',
    exampleSystems: ['SYS-CRD-003 CreditWise AI', 'SYS-HR-002 TalentScore AI'],
    riskProfile: 'Critical — high-stakes decisions affect individuals; fairness and human rights scrutiny mandatory',
    nistCategory: 'MAP 1.3 — Context Establishment'
  },
  {
    id: 'TASK-03',
    taskType: 'Predictive Analytics — Forecasting & Optimisation',
    ref: 'MAP 1.3',
    description: 'System predicts future outcomes or optimises operational parameters based on historical patterns',
    exampleSystems: ['SYS-OPS-004 OpsOptimiser AI'],
    riskProfile: 'Medium — data distribution shift risk; requires ongoing re-validation',
    nistCategory: 'MAP 1.3 — Context Establishment'
  },
  {
    id: 'TASK-04',
    taskType: 'Generative AI — Content Creation & Synthesis',
    ref: 'MAP 1.3',
    description: 'System creates novel text, code, or media outputs based on prompts',
    exampleSystems: ['SYS-MKT-006 ContentGen AI'],
    riskProfile: 'High — misinformation, copyright, and brand risk; content provenance tracking required',
    nistCategory: 'MAP 1.3 — Context Establishment'
  },
  {
    id: 'TASK-05',
    taskType: 'Anomaly Detection — Monitoring & Alerting',
    ref: 'MAP 1.3',
    description: 'System detects deviations from normal patterns and triggers alerts or interventions',
    exampleSystems: ['SYS-FIN-001 (fraud detection component)'],
    riskProfile: 'Medium — false positive rate must be controlled; human review required before action',
    nistCategory: 'MAP 1.3 — Context Establishment'
  }
];

const MAP_SCIENTIFIC_PRINCIPLES = [
  {
    id: 'SCI-01',
    principle: 'Reproducibility & Experimental Rigour',
    ref: 'MAP 2.1',
    description: 'All model training experiments are version-controlled, reproducible, and peer-reviewed before sign-off',
    implementation: 'MLflow experiment tracking; mandatory dual-engineer code review for all model training scripts',
    owner: 'AI/ML Engineering Lead',
    evidence: 'Training reproducibility audit Q3 2026 — 100% of tracked experiments reproducible'
  },
  {
    id: 'SCI-02',
    principle: 'Statistical Significance in TEVV Results',
    ref: 'MAP 2.1 & MEASURE 2.1',
    description: 'Test results must achieve p < 0.05 significance and confidence interval ≤ ±2% before deployment clearance',
    implementation: 'TEVV team uses bootstrapped confidence intervals across all 11 test suites',
    owner: 'TEVV Team Lead',
    evidence: 'All 11 test suites pass significance requirements — validated Oct 2026'
  },
  {
    id: 'SCI-03',
    principle: 'External Benchmark Comparison',
    ref: 'MAP 2.1',
    description: 'AI system performance is compared against published academic and industry benchmarks before deployment',
    implementation: 'Mandatory comparison to HELM, BIG-Bench, and domain-specific financial benchmarks',
    owner: 'AI Research Lead',
    evidence: 'FinAssist AI benchmark report vs. HELM Financial v2.1 — on file'
  },
  {
    id: 'SCI-04',
    principle: 'Uncertainty Quantification',
    ref: 'MAP 2.1 & MEASURE 2.3',
    description: 'Systems must quantify and communicate their confidence levels, especially in high-stakes outputs',
    implementation: 'Calibrated confidence scores displayed on all AI-generated recommendations; low-confidence outputs routed to human review',
    owner: 'AI/ML Engineering + UX',
    evidence: 'Confidence calibration tested — ECE score 0.03 (target ≤ 0.05)'
  }
];

const MAP_DATA_LINEAGE = [
  {
    id: 'DL-01',
    system: 'SYS-FIN-001 (FinAssist AI)',
    ref: 'MAP 2.3',
    trainingData: 'Internal banking FAQ corpus (2019–2024), FCA guidance documents, internal policy library',
    dataVolume: '2.3M Q&A pairs + 18k policy documents',
    dataClassification: 'Restricted — Internal & Public',
    piiPresent: false,
    retentionPeriod: '7 years (FCA regulatory)',
    dataQualityChecks: 'Automated schema validation, de-duplication, manually curated golden set (5k samples)',
    lastRefresh: 'Q3 2026',
    lineageOwner: 'Data Engineering Team'
  },
  {
    id: 'DL-02',
    system: 'SYS-CRD-003 (CreditWise AI)',
    ref: 'MAP 2.3',
    trainingData: 'Historical credit applications (anonymised), repayment records, bureau data (Experian)',
    dataVolume: '4.8M anonymised credit records (2016–2024)',
    dataClassification: 'Confidential — Pseudonymised PII',
    piiPresent: true,
    retentionPeriod: '6 years (FCA/ICO compliance)',
    dataQualityChecks: 'Fairness audit on training set — demographic parity check quarterly; outlier detection',
    lastRefresh: 'Aug 2026',
    lineageOwner: 'Data Science + DPO'
  },
  {
    id: 'DL-03',
    system: 'SYS-HR-002 (TalentScore AI)',
    ref: 'MAP 2.3',
    trainingData: 'Historical job applications + hiring decisions (anonymised), performance outcome data',
    dataVolume: '280k anonymised candidate records',
    dataClassification: 'Restricted — Special Category Data (anonymised)',
    piiPresent: false,
    retentionPeriod: '5 years',
    dataQualityChecks: 'Protected attribute removal verified; proxy variable audit (postcode, name patterns)',
    lastRefresh: 'Jun 2026',
    lineageOwner: 'HR Data Lead + DPO'
  }
];

const MAP_EXPERT_REVIEW = [
  {
    id: 'EXPERT-01',
    reviewType: 'Independent Red Team Assessment',
    ref: 'MAP 4.2',
    system: 'SYS-FIN-001 (FinAssist AI)',
    reviewer: 'External AI Security Firm (KPMG Forensic AI)',
    scope: 'Adversarial prompt injection, jailbreak resistance, data extraction attempts',
    findings: '3 low-severity findings; all remediated before deployment',
    date: 'Aug 2026',
    signedOff: 'AI Risk Officer + CISO'
  },
  {
    id: 'EXPERT-02',
    reviewType: 'Fairness & Bias Audit (Independent)',
    ref: 'MAP 4.2',
    system: 'SYS-HR-002 (TalentScore AI)',
    reviewer: 'External AI Ethics Consultant (Alan Turing Institute)',
    scope: 'Demographic parity, equalised odds, disparate impact analysis across 6 protected proxies',
    findings: '1 medium finding (postcode proxy); mitigated via feature removal',
    date: 'Sep 2026',
    signedOff: 'AI Ethics Officer + Legal'
  },
  {
    id: 'EXPERT-03',
    reviewType: 'Regulatory Compliance Review',
    ref: 'MAP 4.2',
    system: 'SYS-CRD-003 (CreditWise AI)',
    reviewer: 'FCA Regulatory Counsel (Internal Legal + External Advisors)',
    scope: 'Consumer Duty compliance, EU AI Act Annex III high-risk classification review, GDPR Art.22',
    findings: '0 compliance gaps; model card submitted to FCA supervisory review',
    date: 'Oct 2026',
    signedOff: 'Legal Director + Compliance Officer'
  }
];

const MAP_EXTERNAL_TRANSPARENCY = [
  {
    id: 'TRANS-01',
    disclosure: 'AI Interaction Notice',
    ref: 'MAP 5.3',
    channel: 'Customer-facing (web, mobile, branch kiosk)',
    content: 'Clear notice that customer is interacting with an AI system; escalation to human available at any point',
    format: 'Banner notification + "Speak to a Human" button always visible',
    status: 'Active'
  },
  {
    id: 'TRANS-02',
    disclosure: 'Model Card (Public)',
    ref: 'MAP 5.3',
    channel: 'Public website / regulatory submission',
    content: 'Intended use, limitations, training data summary, fairness metrics, contact for disputes',
    format: 'Published model card per system — linked from product pages',
    status: 'Published for SYS-FIN-001 and SYS-CRD-003'
  },
  {
    id: 'TRANS-03',
    disclosure: 'Adverse Action Explanation',
    ref: 'MAP 5.3 & GOVERN 4.2',
    channel: 'Customer notification (post-decision)',
    content: 'When an AI-assisted decision negatively affects a customer (e.g., credit decline), a plain-language explanation is provided within 5 business days',
    format: 'Written notice + right to human review request',
    status: 'Active — mandatory for SYS-CRD-003'
  },
  {
    id: 'TRANS-04',
    disclosure: 'Annual AI Transparency Report',
    ref: 'MAP 5.3',
    channel: 'Public / Regulatory',
    content: 'Annual report covering AI systems in use, risk findings, incident summary, and governance improvements',
    format: 'Published PDF report',
    status: 'Q4 2026 report in preparation'
  }
];

/* ============================================================
   MEASURE — MISSING SUBCATEGORIES
   ============================================================ */

// MEASURE 1.3 — Internal expert review of evaluation approaches
// MEASURE 2.2 — Architecture documentation for evaluation
// MEASURE 2.3 — Trustworthiness characteristics evaluated
// MEASURE 2.4 — Scientific methods
// MEASURE 2.7 — Human factors & usability
// MEASURE 2.8 — Third-party component risks evaluated
// MEASURE 2.9, 2.10 — Privacy risk evaluation & PETs
// MEASURE 2.11 — Environmental impact
// MEASURE 2.12 — Metrics documented & communicated
// MEASURE 2.13 — Effectiveness of controls evaluated
// MEASURE 3.2 — Risk metrics updated & monitored
// MEASURE 4.1, 4.2 — Measurement improvement & feedback

const MEASURE_EXPERT_REVIEW_APPROACHES = [
  {
    id: 'MEXP-01',
    reviewType: 'TEVV Framework Peer Review',
    ref: 'MEASURE 1.3',
    reviewedBy: 'Senior AI Research Lead + External Academic Advisor (UCL)',
    frequency: 'Annual',
    lastReview: 'Q1 2026',
    scope: 'All 11 TEVV test suites — coverage, statistical validity, and alignment to NIST SP 1270',
    outcome: 'Added 3 new adversarial test cases; updated significance thresholds',
    status: 'Current'
  },
  {
    id: 'MEXP-02',
    reviewType: 'Metrics Catalog Validation',
    ref: 'MEASURE 1.3',
    reviewedBy: 'AI Risk Officer + Data Science Lead',
    frequency: 'Bi-annual',
    lastReview: 'Jun 2026',
    scope: '20 production metrics — formula accuracy, collection methodology, threshold calibration',
    outcome: 'Revised M-15 hallucination detection formula; added M-20 energy consumption metric',
    status: 'Current'
  }
];

const MEASURE_ARCHITECTURE_DOCUMENTATION = [
  {
    id: 'ARCH-01',
    system: 'SYS-FIN-001 (FinAssist AI)',
    ref: 'MEASURE 2.2',
    modelType: 'Retrieval-Augmented Generation (RAG) — GPT-4o + Pinecone vector index',
    contextWindow: '128k tokens',
    inputTypes: 'Natural language text prompts',
    outputTypes: 'Natural language answers with source citations',
    inferenceInfrastructure: 'Azure OpenAI Service (UK South region)',
    monitoringHooks: 'LangSmith tracing; Azure Monitor; custom drift detector',
    evaluabilityNotes: 'All intermediate retrieval steps logged; full chain-of-thought available for audit',
    lastUpdated: 'Oct 2026'
  },
  {
    id: 'ARCH-02',
    system: 'SYS-CRD-003 (CreditWise AI)',
    ref: 'MEASURE 2.2',
    modelType: 'XGBoost Gradient Boosted Decision Tree ensemble (v2.1)',
    contextWindow: '47 tabular features per application',
    inputTypes: 'Structured application data (income, employment, credit history)',
    outputTypes: 'Credit score 0–1000 + approval tier (A/B/C/D)',
    inferenceInfrastructure: 'AWS SageMaker (EU-West-2)',
    monitoringHooks: 'Feature drift detection (PSI); performance monitoring via custom MLOps pipeline',
    evaluabilityNotes: 'SHAP values computed per decision; model fully explainable; all inputs logged',
    lastUpdated: 'Sep 2026'
  }
];

const MEASURE_TRUSTWORTHINESS_EVALUATION = [
  {
    id: 'TRUST-01',
    characteristic: 'Accuracy',
    ref: 'MEASURE 2.3',
    evaluationMethod: 'Benchmark accuracy on held-out golden test set (n=5000); factual grounding rate',
    threshold: '≥ 97% factual accuracy; ≤ 1% hallucination rate',
    currentStatus: '98.2% accuracy / 0.4% hallucination',
    verdict: 'Met'
  },
  {
    id: 'TRUST-02',
    characteristic: 'Reliability & Robustness',
    ref: 'MEASURE 2.3',
    evaluationMethod: 'Adversarial perturbation testing; out-of-distribution input testing; load testing at 10× peak',
    threshold: 'Performance degradation ≤ 3% under stress; zero catastrophic failures',
    currentStatus: '1.8% degradation under stress; 0 failures',
    verdict: 'Met'
  },
  {
    id: 'TRUST-03',
    characteristic: 'Safety',
    ref: 'MEASURE 2.3',
    evaluationMethod: 'Red team jailbreak testing (350 adversarial prompts); content safety classifier evaluation',
    threshold: '≥ 99% jailbreak resistance; zero harmful content in 5% random sample audit',
    currentStatus: '99.4% resistance; 0 harmful outputs detected',
    verdict: 'Met'
  },
  {
    id: 'TRUST-04',
    characteristic: 'Fairness (Bias & Disparity)',
    ref: 'MEASURE 2.3 & MEASURE 2.5',
    evaluationMethod: 'Demographic proxy disparity analysis; four-fifths rule; equalised odds across cohorts',
    threshold: 'Max disparity gap ≤ 5%; four-fifths ratio ≥ 0.80',
    currentStatus: '1.8% gap; ratio 0.983',
    verdict: 'Met'
  },
  {
    id: 'TRUST-05',
    characteristic: 'Explainability & Transparency',
    ref: 'MEASURE 2.3',
    evaluationMethod: 'SHAP value audit; user comprehension study (n=50 customer-facing outputs); model card completeness check',
    threshold: '≥ 80% user comprehension of AI explanation; SHAP available for all decisions',
    currentStatus: '86% comprehension score; SHAP active for all CreditWise decisions',
    verdict: 'Met'
  },
  {
    id: 'TRUST-06',
    characteristic: 'Privacy',
    ref: 'MEASURE 2.3 & MEASURE 2.9',
    evaluationMethod: 'PII leakage test (automated scanner on 100% outputs); GDPR data minimisation audit',
    threshold: 'Zero PII in outputs; data minimisation compliance rate 100%',
    currentStatus: '0 PII leakage events; 100% minimisation compliance',
    verdict: 'Met'
  },
  {
    id: 'TRUST-07',
    characteristic: 'Security & Resilience',
    ref: 'MEASURE 2.3',
    evaluationMethod: 'Penetration test by external firm; prompt injection testing; supply chain risk assessment',
    threshold: 'Zero critical/high findings unmitigated at deployment; jailbreak resistance ≥ 99%',
    currentStatus: 'All critical findings resolved; 99.4% jailbreak resistance',
    verdict: 'Met'
  }
];

const MEASURE_HUMAN_FACTORS = [
  {
    id: 'HF-01',
    evaluationType: 'User Comprehension Study',
    ref: 'MEASURE 2.7',
    scope: 'Customer-facing AI outputs (FinAssist AI explanations)',
    method: 'Moderated usability sessions (n=50 customers); think-aloud protocol',
    metric: 'Comprehension rate of AI-generated explanations',
    result: '86% comprehension rate (target ≥ 80%)',
    findingsActioned: 'Simplified 3 output templates; added "What this means for you" plain-language footer',
    status: 'Complete'
  },
  {
    id: 'HF-02',
    evaluationType: 'Automation Bias Assessment',
    ref: 'MEASURE 2.7',
    scope: 'Internal staff using TalentScore AI recommendations',
    method: 'Behavioural observation study (n=20 HR staff); over-reliance measurement',
    metric: 'Override rate vs. AI recommendation; time-to-decision',
    result: 'Override rate 24% (healthy); no evidence of rubber-stamping',
    findingsActioned: 'Added mandatory "Explain your decision" field when overriding AI recommendation',
    status: 'Complete'
  },
  {
    id: 'HF-03',
    evaluationType: 'Accessibility & Inclusive Design Review',
    ref: 'MEASURE 2.7',
    scope: 'All customer-facing AI interfaces',
    method: 'WCAG 2.2 Level AA conformance audit + screen reader testing',
    metric: 'Accessibility conformance score',
    result: 'WCAG 2.2 AA: 97% pass rate; 3 minor issues under remediation',
    findingsActioned: 'Colour contrast fixes and alternative text additions scheduled for Q4 2026',
    status: 'In Progress'
  }
];

const MEASURE_THIRD_PARTY_RISK_EVALUATION = [
  {
    id: 'TPRE-01',
    component: 'OpenAI GPT-4o (Inference)',
    ref: 'MEASURE 2.8',
    riskDimension: 'Model drift without notice',
    evaluationMethod: 'Weekly performance regression tests; model version pinning via API',
    currentMitigation: 'API version locked to gpt-4o-2024-08-06; automated drift detector on daily sample',
    residualRisk: 'Low',
    lastAssessment: 'Oct 2026'
  },
  {
    id: 'TPRE-02',
    component: 'Pinecone Vector Index',
    ref: 'MEASURE 2.8',
    riskDimension: 'Data residency violation / latency spikes',
    evaluationMethod: 'Monthly data residency audit; P99 latency monitoring (target ≤ 200ms)',
    currentMitigation: 'EU region enforced; latency SLA in contract; circuit breaker at 500ms',
    residualRisk: 'Low',
    lastAssessment: 'Sep 2026'
  },
  {
    id: 'TPRE-03',
    component: 'AWS Transcribe',
    ref: 'MEASURE 2.8',
    riskDimension: 'PII in voice transcription; WER degradation on accents',
    evaluationMethod: 'PII scan on transcription outputs; Word Error Rate (WER) disaggregated by accent group',
    currentMitigation: 'PII masking post-transcription; WER tested across 6 accent groups',
    residualRisk: 'Medium — 1 open finding on regional accent WER',
    lastAssessment: 'Aug 2026'
  }
];

const MEASURE_PRIVACY_EVALUATION = [
  {
    id: 'PRIV-01',
    system: 'SYS-FIN-001 (FinAssist AI)',
    ref: 'MEASURE 2.9',
    privacyRisk: 'Inadvertent PII disclosure in AI responses',
    evaluationMethod: 'Automated PII scanner (regex + NER model) on 100% of all outputs in test',
    threshold: 'Zero PII in outputs',
    result: '0 PII incidents in 50,000 test outputs',
    petApplied: 'Output filtering; entity recognition post-processor',
    gdprBasis: 'Legitimate Interest (FCA regulated service)',
    dpiaCompleted: true
  },
  {
    id: 'PRIV-02',
    system: 'SYS-CRD-003 (CreditWise AI)',
    ref: 'MEASURE 2.9',
    privacyRisk: 'Special category data inference; model inversion attacks',
    evaluationMethod: 'Membership inference attack simulation; attribute inference risk assessment',
    threshold: 'Model inversion success rate ≤ 1%',
    result: 'Attack success rate: 0.3% (acceptable)',
    petApplied: 'Differential privacy noise added to training (ε=8); k-anonymity k≥20 on training set',
    gdprBasis: 'Contractual necessity + GDPR Art.22 safeguards',
    dpiaCompleted: true
  }
];

const MEASURE_PRIVACY_ENHANCING_TECH = [
  {
    id: 'PET-01',
    technique: 'Differential Privacy',
    ref: 'MEASURE 2.10',
    appliedTo: 'CreditWise AI (SYS-CRD-003) training pipeline',
    implementation: 'ε=8, δ=10⁻⁶ privacy budget using Google DP library v3.0',
    tradeoff: '~0.8% accuracy reduction accepted in exchange for provable privacy guarantee',
    status: 'Production'
  },
  {
    id: 'PET-02',
    technique: 'Data Minimisation & Purpose Limitation',
    ref: 'MEASURE 2.10',
    appliedTo: 'All 6 registered AI systems',
    implementation: 'Feature selection policy — only features with proven predictive value retained; personal data fields stripped where not required',
    tradeoff: 'Minimal performance impact; reduces GDPR exposure significantly',
    status: 'Active'
  },
  {
    id: 'PET-03',
    technique: 'Pseudonymisation of Training Data',
    ref: 'MEASURE 2.10',
    appliedTo: 'TalentScore AI (SYS-HR-002), CreditWise AI (SYS-CRD-003)',
    implementation: 'HMAC-SHA256 tokenisation of all personal identifiers; lookup table access restricted to DPO',
    tradeoff: 'No performance impact; satisfies GDPR Art.25 data protection by design',
    status: 'Active'
  },
  {
    id: 'PET-04',
    technique: 'Synthetic Data for Testing',
    ref: 'MEASURE 2.10',
    appliedTo: 'TEVV test suite execution for all systems',
    implementation: 'Synthetically generated customer profiles (Faker + domain-specific rules) used in all TEVV runs',
    tradeoff: 'Eliminates real PII from test environments; slight representativeness trade-off accepted',
    status: 'Active'
  }
];

const MEASURE_ENVIRONMENTAL_IMPACT = {
  ref: 'MEASURE 2.11',
  overview: 'Environmental impact is evaluated as part of the pre-deployment TEVV sign-off (GATE-03). Carbon footprint and energy consumption are tracked as Tier-4 strategic metrics.',
  systems: [
    {
      system: 'SYS-FIN-001 (FinAssist AI)',
      inferenceEnergyPerQuery: '~0.003 kWh (cloud-hosted GPT-4o)',
      monthlyQueries: '~850,000',
      estimatedMonthlyCO2: '1.2 kg CO₂e (Azure UK South — 100% renewables)',
      carbonOffsetScheme: 'Azure Climate Pledge — net zero infrastructure',
      energyMetricId: 'M-20',
      status: 'Monitored'
    },
    {
      system: 'SYS-CRD-003 (CreditWise AI)',
      inferenceEnergyPerQuery: '~0.0001 kWh (tabular XGBoost — very low)',
      monthlyQueries: '~120,000',
      estimatedMonthlyCO2: '< 0.1 kg CO₂e',
      carbonOffsetScheme: 'AWS re:Climate Pledge',
      energyMetricId: 'M-20',
      status: 'Monitored'
    }
  ],
  improvementTarget: 'Reduce total inference energy by 20% by Q2 2027 via model distillation and caching'
};

const MEASURE_METRICS_COMMUNICATION = [
  {
    id: 'COMM-01',
    audience: 'Board of Directors',
    ref: 'MEASURE 2.12',
    metricsShared: ['Total AI systems in production', 'Critical/High risk count', 'AIIA compliance rate', 'Active incidents', 'P1 SLA compliance'],
    format: 'Quarterly AI Risk Dashboard (1-page executive summary)',
    cadence: 'Quarterly',
    owner: 'CAIO'
  },
  {
    id: 'COMM-02',
    audience: 'AI Risk Review Board (ARRB)',
    ref: 'MEASURE 2.12',
    metricsShared: ['All 20 production metrics RAG status', 'TEVV pass/fail summary', 'Bias audit results', 'Vendor scorecard'],
    format: 'ARRB Monthly Report (detailed)',
    cadence: 'Monthly',
    owner: 'AI Risk Officer'
  },
  {
    id: 'COMM-03',
    audience: 'AI Engineering & MLOps Teams',
    ref: 'MEASURE 2.12',
    metricsShared: ['Real-time M-01 to M-20 telemetry', 'P99 latency', 'Drift detection status', 'Alert SLA queue'],
    format: 'Live observability dashboard (Grafana)',
    cadence: 'Real-time',
    owner: 'AI/ML Engineering Lead'
  },
  {
    id: 'COMM-04',
    audience: 'Customers (External)',
    ref: 'MEASURE 2.12 & MAP 5.3',
    metricsShared: ['AI interaction notice', 'Accuracy claim (general)', 'Right to explanation', 'Escalation path'],
    format: 'Published model card + product disclosure notice',
    cadence: 'Static (updated with major model changes)',
    owner: 'Communications + DPO'
  }
];

const MEASURE_CONTROL_EFFECTIVENESS = [
  {
    id: 'CE-01',
    control: 'Hallucination Detection Filter',
    ref: 'MEASURE 2.13',
    linkedRisk: 'R-01 Hallucinated Financial Terms (MAP 3.2)',
    evaluationMethod: 'Weekly sampled audit of 500 random outputs; automated confidence score below threshold triggers human review queue',
    effectivenessScore: '97.4% detection rate',
    lastEvaluated: 'Oct 2026',
    verdict: 'Effective'
  },
  {
    id: 'CE-02',
    control: 'Demographic Proxy Disparity Guardrail',
    ref: 'MEASURE 2.13',
    linkedRisk: 'R-07 Protected-Attribute Proxy Bias',
    evaluationMethod: 'Monthly disaggregated accuracy analysis across 6 proxy cohorts; four-fifths rule enforced',
    effectivenessScore: 'Max gap 1.8% (target ≤ 5%); ratio 0.983 (rule ≥ 0.80)',
    lastEvaluated: 'Oct 2026',
    verdict: 'Effective'
  },
  {
    id: 'CE-03',
    control: 'PII Output Filter',
    ref: 'MEASURE 2.13',
    linkedRisk: 'R-03 Customer PII Exposure',
    evaluationMethod: 'Automated scanner on 100% of outputs in production; monthly adversarial PII extraction test',
    effectivenessScore: '0 PII incidents in 8 months of production',
    lastEvaluated: 'Oct 2026',
    verdict: 'Effective'
  },
  {
    id: 'CE-04',
    control: 'Jailbreak & Prompt Injection Defence',
    ref: 'MEASURE 2.13',
    linkedRisk: 'R-05 Adversarial Prompt Injection',
    evaluationMethod: 'Monthly red team exercise (50 novel attack prompts); automated classifier on all inputs',
    effectivenessScore: '99.4% resistance rate; 0 successful injections in 4 months',
    lastEvaluated: 'Oct 2026',
    verdict: 'Effective'
  }
];

const MEASURE_METRICS_MONITORING = [
  {
    id: 'MON-01',
    metricId: 'M-01',
    ref: 'MEASURE 3.2',
    name: 'Factual Accuracy Rate',
    currentValue: '98.2%',
    previousValue: '97.9%',
    trend: '↑ Improving',
    nextScheduledReview: 'Nov 2026',
    alertStatus: '🟢 Green'
  },
  {
    id: 'MON-02',
    metricId: 'M-04',
    ref: 'MEASURE 3.2',
    name: 'Hallucination Rate',
    currentValue: '0.4%',
    previousValue: '0.7%',
    trend: '↑ Improving',
    nextScheduledReview: 'Nov 2026',
    alertStatus: '🟢 Green'
  },
  {
    id: 'MON-03',
    metricId: 'M-08',
    ref: 'MEASURE 3.2',
    name: 'P99 Latency (ms)',
    currentValue: '187ms',
    previousValue: '212ms',
    trend: '↑ Improving',
    nextScheduledReview: 'Nov 2026',
    alertStatus: '🟢 Green'
  },
  {
    id: 'MON-04',
    metricId: 'M-11',
    ref: 'MEASURE 3.2',
    name: 'Max Demographic Fairness Gap',
    currentValue: '1.8%',
    previousValue: '2.3%',
    trend: '↑ Improving',
    nextScheduledReview: 'Nov 2026',
    alertStatus: '🟢 Green'
  },
  {
    id: 'MON-05',
    metricId: 'M-16',
    ref: 'MEASURE 3.2',
    name: 'Explanation Satisfaction Score (CSAT)',
    currentValue: '4.3 / 5',
    previousValue: '4.1 / 5',
    trend: '↑ Improving',
    nextScheduledReview: 'Nov 2026',
    alertStatus: '🟢 Green'
  }
];

const MEASURE_METHODOLOGY_IMPROVEMENT = [
  {
    id: 'MIMP-01',
    improvement: 'Automated Drift Detection Added to All Systems',
    ref: 'MEASURE 4.1',
    trigger: 'Manual Q2 2026 review found 3-week delay in spotting accuracy drift in SYS-HR-002',
    action: 'Deployed Population Stability Index (PSI) monitoring on all 6 systems via MLflow + custom alerting',
    outcome: 'Drift detection latency reduced from 3 weeks → 6 hours',
    quarter: 'Q3 2026',
    status: 'Completed'
  },
  {
    id: 'MIMP-02',
    improvement: 'Environmental Energy Metric (M-20) Added to Metrics Catalog',
    ref: 'MEASURE 4.1',
    trigger: 'ESG reporting requirement; Board sustainability commitment',
    action: 'Added M-20 (inference energy kWh per 1000 queries) to Tier-4 strategic metrics',
    outcome: 'Energy data now available for all 6 systems; included in quarterly ESG reporting',
    quarter: 'Q2 2026',
    status: 'Completed'
  },
  {
    id: 'MIMP-03',
    improvement: 'Confidence Calibration Testing Added to TEVV Suite',
    ref: 'MEASURE 4.1',
    trigger: 'External audit found TS-01 accuracy tests did not assess calibration quality',
    action: 'Added Expected Calibration Error (ECE) as mandatory TS-01 sub-test',
    outcome: 'ECE target ≤ 0.05; current value 0.03 for FinAssist AI',
    quarter: 'Q1 2026',
    status: 'Completed'
  }
];

const MEASURE_FRAMEWORK_FEEDBACK = [
  {
    id: 'MFDB-01',
    feedbackSource: 'TEVV Team Post-Sprint Retrospective',
    ref: 'MEASURE 4.2',
    cycle: 'Q3 2026',
    finding: 'TS-06 (Privacy Testing) was taking too long; delaying full TEVV completion by 2 weeks',
    actionTaken: 'Automated PII scanner integrated into CI/CD pipeline; TS-06 now runs automatically on every build',
    impactOnRMF: 'MEASURE 2.9 coverage improved; deployment cycle shortened',
    incorporatedInto: 'TEVV framework v2.1'
  },
  {
    id: 'MFDB-02',
    feedbackSource: 'AI Risk Review Board (ARRB) Feedback',
    ref: 'MEASURE 4.2',
    cycle: 'Q2 2026',
    finding: 'Board requested plain-language summary of metric status alongside technical RAG report',
    actionTaken: 'Added 1-page executive metric summary to quarterly ARRB pack',
    impactOnRMF: 'MEASURE 2.12 (communication) and GOVERN 3.1 (leadership alignment) both improved',
    incorporatedInto: 'ARRB reporting template v3'
  }
];

/* ============================================================
   MANAGE — MISSING SUBCATEGORIES
   ============================================================ */

// MANAGE 1.2 — Resources allocated for risk response
// MANAGE 1.3 — Risk responses documented
// MANAGE 1.4 — Residual risks & risk acceptance
// MANAGE 2.1 — AI system trustworthiness maintained
// MANAGE 2.2 — Shutdown / decommission criteria
// MANAGE 2.4 — Stakeholder engagement in risk response
// MANAGE 3.2 — Risk management processes updated from learnings
// MANAGE 4.3 — Post-incident analysis

const MANAGE_RESOURCE_ALLOCATION = {
  ref: 'MANAGE 1.2',
  overview: 'Dedicated resources are allocated to AI risk response activities, ensuring all identified risks have funded mitigations.',
  roles: [
    { role: 'AI Risk Officer', fte: 1.0, primaryFunction: 'Risk prioritisation, escalation management, board reporting', budget: 'Dedicated headcount (permanent)' },
    { role: 'TEVV Team (3 FTE)', fte: 3.0, primaryFunction: 'Test, evaluation, validation; TEVV suite maintenance; bias audits', budget: 'Dedicated headcount (permanent)' },
    { role: 'AI Ethics Officer', fte: 0.5, primaryFunction: 'Ethical review, culture programme, stakeholder engagement', budget: 'Shared headcount (50% allocation)' },
    { role: 'Data Protection Officer', fte: 0.5, primaryFunction: 'Privacy risk evaluation, GDPR compliance, DPIAs', budget: 'Shared headcount (50% allocation)' },
    { role: 'External Red Team Budget', fte: 0, primaryFunction: 'Annual adversarial testing by independent security firm', budget: '£85k annual contract' },
    { role: 'AI Governance Technology Budget', fte: 0, primaryFunction: 'MLflow, LangSmith, Grafana, monitoring tooling', budget: '£120k annual SaaS spend' }
  ],
  totalAnnualBudget: '~£1.2M (AI governance + risk management)',
  reviewCycle: 'Annual (budget review) + quarterly headcount assessment'
};

const MANAGE_RISK_RESPONSE_DOCUMENTATION = [
  {
    id: 'DOC-01',
    document: 'AI Risk Response Register',
    ref: 'MANAGE 1.3',
    description: 'Comprehensive register of all identified AI risks, their assigned response strategies, and treatment owners',
    location: 'docs/04-manage/MANAGE-Risk-Response-Register.csv',
    format: 'CSV — imported from this hub (13 Risk Response Plans)',
    lastUpdated: 'Oct 2026',
    owner: 'AI Risk Officer',
    retentionPeriod: '7 years'
  },
  {
    id: 'DOC-02',
    document: 'AI Incident Log',
    ref: 'MANAGE 1.3 & MANAGE 4.1',
    description: 'Chronological log of all AI incidents, severity, containment times, root causes, and closure evidence',
    location: 'docs/04-manage/AI-Incident-Log.md',
    format: 'Markdown — auto-generated from this hub',
    lastUpdated: 'Oct 2026',
    owner: 'AI Risk Officer',
    retentionPeriod: '7 years'
  },
  {
    id: 'DOC-03',
    document: '7 Incident Response Playbooks',
    ref: 'MANAGE 1.3 & MANAGE 4.2',
    description: 'Pre-approved step-by-step response protocols for 7 incident categories; tested in tabletop exercises',
    location: 'docs/04-manage/ — Playbooks A through G',
    format: 'Markdown — stored in hub manage-data.js',
    lastUpdated: 'Sep 2026',
    owner: 'AI Risk Officer + CISO',
    retentionPeriod: 'Indefinite (updated per major revision)'
  },
  {
    id: 'DOC-04',
    document: 'Continuous Improvement Log',
    ref: 'MANAGE 1.3 & MANAGE 3.1',
    description: 'Audit trail of governance and technical improvements actioned since system inception',
    location: 'docs/04-manage/MANAGE-Continuous-Improvement-Log.csv',
    format: 'CSV — exported from this hub',
    lastUpdated: 'Oct 2026',
    owner: 'AI Risk Officer',
    retentionPeriod: '5 years'
  }
];

const MANAGE_RESIDUAL_RISK_ACCEPTANCE = [
  {
    id: 'RA-01',
    system: 'SYS-FIN-001 (FinAssist AI)',
    ref: 'MANAGE 1.4',
    riskId: 'R-01',
    riskDescription: 'Hallucinated financial terms in edge-case Q&A',
    residualRiskScore: '2 / 10',
    acceptanceBasis: 'Confidence threshold filter + mandatory disclaimer; residual rate 0.4% within FCA tolerance',
    acceptedBy: 'AI Risk Officer',
    acceptanceDate: 'Sep 2026',
    nextReviewDate: 'Mar 2027',
    reviewTrigger: 'If hallucination rate exceeds 1.0% at any monitoring check'
  },
  {
    id: 'RA-02',
    system: 'SYS-CRD-003 (CreditWise AI)',
    ref: 'MANAGE 1.4',
    riskId: 'R-07',
    riskDescription: 'Residual disparity on accent-based voice transcription (AWS Transcribe)',
    residualRiskScore: '3 / 10',
    acceptanceBasis: 'WER gap 4.2% between accent groups — within 5% tolerance; alternative transcription vendor evaluation underway',
    acceptedBy: 'AI Risk Officer + Legal',
    acceptanceDate: 'Aug 2026',
    nextReviewDate: 'Feb 2027',
    reviewTrigger: 'Quarterly WER audit; immediate review if gap > 5%'
  },
  {
    id: 'RA-03',
    system: 'SYS-OPS-004 (OpsOptimiser AI)',
    ref: 'MANAGE 1.4',
    riskId: 'R-12',
    riskDescription: 'Model performance degradation during supply chain volatility events (out-of-distribution inputs)',
    residualRiskScore: '3 / 10',
    acceptanceBasis: 'Human review fallback enforced during anomalous market conditions; OOD detector active',
    acceptedBy: 'AI Risk Officer',
    acceptanceDate: 'Jul 2026',
    nextReviewDate: 'Jan 2027',
    reviewTrigger: 'If OOD detector fires more than 3× in any 30-day window'
  }
];

const MANAGE_TRUSTWORTHINESS_MAINTENANCE = [
  {
    id: 'TM-01',
    activity: 'Monthly Production Performance Review',
    ref: 'MANAGE 2.1',
    cadence: 'Monthly',
    scope: 'All 20 metrics across 6 systems',
    owner: 'AI/ML Engineering Lead',
    output: 'Monthly RAG Metric Dashboard (shared with ARRB)',
    automaticTrigger: 'Any metric entering Amber or Red immediately triggers ARRB notification'
  },
  {
    id: 'TM-02',
    activity: 'Quarterly Bias & Fairness Re-evaluation',
    ref: 'MANAGE 2.1 & MEASURE 2.5',
    cadence: 'Quarterly',
    scope: 'All systems with demographic exposure (SYS-FIN-001, SYS-CRD-003, SYS-HR-002)',
    owner: 'AI Ethics Officer + TEVV Team',
    output: 'Fairness Audit Report (stored in docs/03-measure/)',
    automaticTrigger: 'If proxy disparity gap increases by > 1% between audits'
  },
  {
    id: 'TM-03',
    activity: 'Semi-Annual Full TEVV Re-run',
    ref: 'MANAGE 2.1 & MEASURE 2.1',
    cadence: 'Every 6 months or after any major model update',
    scope: 'All 11 test suites for the updated system',
    owner: 'TEVV Team Lead',
    output: 'Updated TEVV Validation Dossier',
    automaticTrigger: 'Any model version change ≥ minor; any significant data distribution shift'
  }
];

const MANAGE_DECOMMISSION_CRITERIA = [
  {
    id: 'DECOM-01',
    trigger: 'Sustained Accuracy Below Red Line',
    ref: 'MANAGE 2.2',
    threshold: 'Factual accuracy < 92% for 3 consecutive months',
    immediateAction: 'Suspend AI output; route all interactions to human agents',
    boardNotification: 'Within 24 hours',
    decommissionTimeline: '30 days to remediate or fully decommission',
    replacementPlan: 'Human-only service restored while remediation is in progress'
  },
  {
    id: 'DECOM-02',
    trigger: 'Critical Safety Incident (P1)',
    ref: 'MANAGE 2.2 & MANAGE 4.2',
    threshold: 'Any P1 incident where root cause cannot be fully contained within 15-minute SLA',
    immediateAction: 'Immediate circuit breaker activation; system taken offline',
    boardNotification: 'Immediately (same call as incident declaration)',
    decommissionTimeline: 'System remains offline until full root-cause investigation complete (typically 5–10 business days)',
    replacementPlan: 'Playbook A fallback procedures'
  },
  {
    id: 'DECOM-03',
    trigger: 'Regulatory Prohibition',
    ref: 'MANAGE 2.2',
    threshold: 'Any binding regulatory directive prohibiting continued operation',
    immediateAction: 'Immediate suspension; Legal Director notified',
    boardNotification: 'Same day',
    decommissionTimeline: 'Per regulatory directive timeline',
    replacementPlan: 'Legal and compliance team to define compliant replacement pathway'
  },
  {
    id: 'DECOM-04',
    trigger: 'Planned End-of-Life',
    ref: 'MANAGE 2.2 & GOVERN 1.7',
    threshold: 'System has been superseded by a successor system or business need has ceased',
    immediateAction: 'Formal decommission plan approved by AI Risk Officer and system owner',
    boardNotification: 'Quarterly ARRB notification 3 months in advance',
    decommissionTimeline: '90-day planned wind-down with data deletion and audit trail preserved',
    replacementPlan: 'Successor system must complete full GATE 1–4 clearance before go-live'
  }
];

const MANAGE_STAKEHOLDER_ENGAGEMENT_RESPONSE = [
  {
    id: 'SE-01',
    stakeholder: 'Affected Customers',
    ref: 'MANAGE 2.4',
    engagementType: 'Post-incident notification',
    trigger: 'Any incident where a customer received incorrect or biased AI output',
    method: 'Written notice within 5 business days; right to human review; complaint pathway',
    owner: 'Customer Advocacy Lead + AI Risk Officer',
    evidenceRequired: 'Notification log; customer acknowledgement record'
  },
  {
    id: 'SE-02',
    stakeholder: 'Regulator (FCA / ICO)',
    ref: 'MANAGE 2.4',
    engagementType: 'Regulatory notification (mandatory)',
    trigger: 'P1 incidents with material customer harm; personal data breach',
    method: 'Formal regulatory notification per FCA SYSC and ICO breach notification rules',
    owner: 'Compliance Officer + Legal Director',
    evidenceRequired: 'Notification reference number; regulator correspondence on file'
  },
  {
    id: 'SE-03',
    stakeholder: 'Internal Staff (Affected Teams)',
    ref: 'MANAGE 2.4',
    engagementType: 'Incident debrief & communication',
    trigger: 'All incidents P1–P3',
    method: 'Post-incident debrief session within 48 hours; lessons learned shared with relevant teams',
    owner: 'AI Risk Officer',
    evidenceRequired: 'Debrief minutes; attendance register; action items log'
  },
  {
    id: 'SE-04',
    stakeholder: 'Board of Directors',
    ref: 'MANAGE 2.4',
    engagementType: 'Governance escalation',
    trigger: 'P1 incidents; any risk tolerance breach; significant regulatory finding',
    method: 'Immediate CAIO notification; board briefing note within 24 hours',
    owner: 'CAIO',
    evidenceRequired: 'Board briefing note; board minutes acknowledging receipt'
  }
];

const MANAGE_PROCESS_IMPROVEMENT_FROM_LEARNINGS = [
  {
    id: 'PIM-01',
    improvement: 'Playbook A Updated After INC-001',
    ref: 'MANAGE 3.2',
    trigger: 'INC-001 revealed that the 15-minute containment protocol did not include DPO notification step',
    change: 'Added DPO mandatory notification within 10 minutes of P1 declaration to Playbook A',
    playBookUpdated: 'Playbook A v1.2 (Sep 2026)',
    evidenceOfChange: 'Updated playbook on file; ARRB ratified at Oct 2026 meeting',
    preventedRecurrence: 'Zero DPO notification failures since update'
  },
  {
    id: 'PIM-02',
    improvement: 'Automated Jailbreak Detection Added After INC-003',
    ref: 'MANAGE 3.2',
    trigger: 'INC-003 showed that manual review of adversarial inputs was too slow (3-hour detection gap)',
    change: 'Deployed real-time prompt injection classifier on all chat inputs; automated block + alert within 50ms',
    playBookUpdated: 'Playbook C v2.0 + TEVV suite TS-05 updated',
    evidenceOfChange: 'TS-05 automated; 0 successful injections since deployment',
    preventedRecurrence: 'Jailbreak detection now real-time; 4-month clean record'
  },
  {
    id: 'PIM-03',
    improvement: 'Post-Incident ARRB Review Made Mandatory',
    ref: 'MANAGE 3.2',
    trigger: 'INC-004 lessons were not formally incorporated — discovered by Q3 audit',
    change: 'Mandatory post-incident ARRB agenda item added; all lessons learned tracked to closure',
    playBookUpdated: 'ARRB Terms of Reference v2.0',
    evidenceOfChange: 'ToR updated Oct 2026; 2 subsequent incidents fully ARRB-reviewed within 30 days',
    preventedRecurrence: '100% of P1/P2 incidents now have ARRB follow-up on record'
  }
];

const MANAGE_POST_INCIDENT_ANALYSIS = [
  {
    id: 'PIA-001',
    incidentRef: 'INC-001',
    ref: 'MANAGE 4.3',
    systemAffected: 'SYS-FIN-001 (FinAssist AI)',
    incidentSummary: 'Financial product misquote (APR hallucination) caused incorrect customer guidance',
    rootCauseAnalysis: '5-Whys analysis: 1) Output not validated against product DB; 2) Retrieval index not refreshed; 3) Index refresh cadence too low; 4) No automated freshness check; 5) Monitoring gap in deployment',
    contributingFactors: ['RAG index staleness', 'Missing automated freshness SLA', 'No pre-output product DB validation step'],
    lessonsLearned: ['All financial figures must be validated against live product database before output', 'Index freshness monitoring is now a Tier-1 metric'],
    actionsCompleted: ['Live product DB validator added to output pipeline', 'Index freshness metric M-19 added', 'Playbook A updated'],
    recurrencePrevented: 'Zero hallucinated product figures since Aug 2026',
    closedDate: 'Sep 2026',
    signedOff: 'AI Risk Officer + Legal'
  },
  {
    id: 'PIA-002',
    incidentRef: 'INC-003',
    ref: 'MANAGE 4.3',
    systemAffected: 'SYS-FIN-001 (FinAssist AI)',
    incidentSummary: 'Adversarial jailbreak prompt bypassed content guardrails — 2 harmful outputs before detection',
    rootCauseAnalysis: '5-Whys: 1) Novel prompt pattern not in training data for classifier; 2) Classifier not updated since deployment; 3) No automated adversarial refresh schedule; 4) Red team exercises annual only; 5) Attack surface monitoring gap',
    contributingFactors: ['Outdated prompt classifier', 'Insufficient red team cadence', 'No real-time attack surface monitoring'],
    lessonsLearned: ['Prompt injection classifier must be updated monthly with new attack patterns', 'Real-time jailbreak detector needed as additional layer'],
    actionsCompleted: ['Real-time prompt injection classifier deployed (50ms latency)', 'Monthly classifier update schedule', 'Red team frequency increased to quarterly'],
    recurrencePrevented: '0 successful jailbreaks in 4 months since remediation',
    closedDate: 'Sep 2026',
    signedOff: 'CISO + AI Risk Officer'
  }
];

// Export all data objects
if (typeof window !== 'undefined') {
  // GOVERN extensions
  window.GOVERN_RISK_TOLERANCE = GOVERN_RISK_TOLERANCE;
  window.GOVERN_CROSS_TEAM_COLLABORATION = GOVERN_CROSS_TEAM_COLLABORATION;
  window.GOVERN_LEADERSHIP_ALIGNMENT = GOVERN_LEADERSHIP_ALIGNMENT;
  window.GOVERN_RESPONSIBLE_AI_CULTURE = GOVERN_RESPONSIBLE_AI_CULTURE;
  window.GOVERN_THIRD_PARTY_MONITORING = GOVERN_THIRD_PARTY_MONITORING;
  window.GOVERN_ASSESSMENT_REVIEW = GOVERN_ASSESSMENT_REVIEW;
  window.GOVERN_PROCESS_IMPROVEMENT = GOVERN_PROCESS_IMPROVEMENT;

  // MAP extensions
  window.MAP_AI_TASK_CLASSIFICATION = MAP_AI_TASK_CLASSIFICATION;
  window.MAP_SCIENTIFIC_PRINCIPLES = MAP_SCIENTIFIC_PRINCIPLES;
  window.MAP_DATA_LINEAGE = MAP_DATA_LINEAGE;
  window.MAP_EXPERT_REVIEW = MAP_EXPERT_REVIEW;
  window.MAP_EXTERNAL_TRANSPARENCY = MAP_EXTERNAL_TRANSPARENCY;

  // MEASURE extensions
  window.MEASURE_EXPERT_REVIEW_APPROACHES = MEASURE_EXPERT_REVIEW_APPROACHES;
  window.MEASURE_ARCHITECTURE_DOCUMENTATION = MEASURE_ARCHITECTURE_DOCUMENTATION;
  window.MEASURE_TRUSTWORTHINESS_EVALUATION = MEASURE_TRUSTWORTHINESS_EVALUATION;
  window.MEASURE_HUMAN_FACTORS = MEASURE_HUMAN_FACTORS;
  window.MEASURE_THIRD_PARTY_RISK_EVALUATION = MEASURE_THIRD_PARTY_RISK_EVALUATION;
  window.MEASURE_PRIVACY_EVALUATION = MEASURE_PRIVACY_EVALUATION;
  window.MEASURE_PRIVACY_ENHANCING_TECH = MEASURE_PRIVACY_ENHANCING_TECH;
  window.MEASURE_ENVIRONMENTAL_IMPACT = MEASURE_ENVIRONMENTAL_IMPACT;
  window.MEASURE_METRICS_COMMUNICATION = MEASURE_METRICS_COMMUNICATION;
  window.MEASURE_CONTROL_EFFECTIVENESS = MEASURE_CONTROL_EFFECTIVENESS;
  window.MEASURE_METRICS_MONITORING = MEASURE_METRICS_MONITORING;
  window.MEASURE_METHODOLOGY_IMPROVEMENT = MEASURE_METHODOLOGY_IMPROVEMENT;
  window.MEASURE_FRAMEWORK_FEEDBACK = MEASURE_FRAMEWORK_FEEDBACK;

  // MANAGE extensions
  window.MANAGE_RESOURCE_ALLOCATION = MANAGE_RESOURCE_ALLOCATION;
  window.MANAGE_RISK_RESPONSE_DOCUMENTATION = MANAGE_RISK_RESPONSE_DOCUMENTATION;
  window.MANAGE_RESIDUAL_RISK_ACCEPTANCE = MANAGE_RESIDUAL_RISK_ACCEPTANCE;
  window.MANAGE_TRUSTWORTHINESS_MAINTENANCE = MANAGE_TRUSTWORTHINESS_MAINTENANCE;
  window.MANAGE_DECOMMISSION_CRITERIA = MANAGE_DECOMMISSION_CRITERIA;
  window.MANAGE_STAKEHOLDER_ENGAGEMENT_RESPONSE = MANAGE_STAKEHOLDER_ENGAGEMENT_RESPONSE;
  window.MANAGE_PROCESS_IMPROVEMENT_FROM_LEARNINGS = MANAGE_PROCESS_IMPROVEMENT_FROM_LEARNINGS;
  window.MANAGE_POST_INCIDENT_ANALYSIS = MANAGE_POST_INCIDENT_ANALYSIS;
}
