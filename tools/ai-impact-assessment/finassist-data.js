// Pre-populated FinAssist AI Assessment Dataset
const FINASSIST_PRESET = {
  header: {
    assessmentId: "AIIA-2026-001",
    systemName: "FinAssist AI",
    systemId: "SYS-FIN-001",
    version: "v1.0",
    assessmentType: "New System",
    lead: "Dr. Elena Vance (AI Ethics Officer)",
    projectLead: "Marcus Sterling (Lead AI Engineer)",
    department: "Customer Experience & Retail Banking",
    startDate: "2026-08-15",
    completionDate: "2026-10-18",
    nextReviewDate: "2027-04-18"
  },
  part1: {
    purpose: "Provide 24/7 grounded natural-language customer assistance for account navigation, balance checks, payment inquiries, and financial product guidance across web and mobile banking apps.",
    tasks: ["Generation (text/image/audio)", "Natural Language Processing", "Recommendation"],
    problemSolved: "Reduces peak customer service queue wait times from 24 minutes to instantaneous responses while decreasing staff burnout from repetitive tier-1 FAQs.",
    minAcceptablePerformance: "Factual response accuracy ≥ 99.5%, hallucination rate ≤ 0.5%, P95 latency ≤ 1.5s, jailbreak bypass rate ≤ 0.1%.",
    deploymentEnv: "Customer-facing web portal and mobile banking apps (iOS & Android).",
    geography: "National (Uganda & East African Community)",
    scale: "~250,000 active retail banking customers at launch",
    decisionStakes: "Medium (influences decisions)",
    nonAiAlternative: "Yes",
    nonAiDescription: "Rule-based decision trees and human agent call center. AI is preferred due to natural conversational comprehension, 24/7 availability, and multi-lingual scalability.",
    users: [
      { group: "Retail Banking Customers", role: "End user querying account and banking terms", count: "250,000+", literacy: "Medium" },
      { group: "Customer Support Agents", role: "Operator supervising escalated chats & override", count: "120", literacy: "High" },
      { group: "Branch Staff", role: "Informational assistance during in-branch inquiries", count: "450", literacy: "High" }
    ],
    oversightLevel: "Human-in-the-Loop",
    canOverride: "Yes — always",
    overrideAuthority: "Tier-2 Support Agent, Branch Manager, AI Operations Lead",
    clearlyLabeled: "Yes",
    recourseMechanism: "One-click 'Transfer to Human Specialist' button always visible in chat interface; formal dispute and complaint ticket creation via standard banking portal."
  },
  part2: {
    missionAlignment: "Directly accelerates financial inclusion by providing accessible, plain-language guidance to underserved retail customers while maintaining strict consumer protection standards.",
    principlesAlignment: "Yes — fully aligned",
    principlesNotes: "Model operates strictly over a bounded retrieval corpus with no autonomous financial execution authority.",
    latentIncentives: "Support agents could theoretically rush escalations to meet AHT (Average Handle Time) targets; mitigated by decoupling agent compensation from AI chat containment rates.",
    values: [
      { name: "Fairness & non-discrimination", status: "Yes", notes: "Tested across demographic groups; disparate impact ratio maintained between 0.80–1.25." },
      { name: "Privacy and data protection", status: "Yes", notes: "Zero retention on external LLM inference; client-side token masking for PII." },
      { name: "Human dignity and autonomy", status: "Yes", notes: "Users are never forced to use AI; unconditional human escalation path guaranteed." },
      { name: "Transparency and accountability", status: "Yes", notes: "System states it is an AI assistant; answers link directly to verified product terms." },
      { name: "Environmental sustainability", status: "Yes", notes: "Cloudflare Workers AI edge deployment minimizes compute overhead vs. self-hosted GPU clusters." }
    ]
  },
  part3: {
    regulations: [
      { area: "Data privacy (e.g. GDPR / Uganda DPPA)", applicable: "Yes", law: "Uganda Data Protection and Privacy Act 2019 / GDPR Art. 22", status: "Compliant" },
      { area: "Anti-discrimination law", applicable: "Yes", law: "Equal Opportunities Commission Act / Fair Lending Guidelines", status: "Compliant" },
      { area: "Sector-specific financial regulation", applicable: "Yes", law: "Bank of Uganda Consumer Protection Guidelines", status: "Compliant" },
      { area: "AI-specific regulation", applicable: "Yes", law: "NIST AI RMF 1.0 / ISO/IEC 42001 / EU AI Act (High-Risk Governance Alignment)", status: "Compliant" },
      { area: "Consumer protection law", applicable: "Yes", law: "Financial Consumer Protection Directive", status: "Compliant" },
      { area: "Procurement / vendor rules", applicable: "Yes", law: "Cloud Computing Vendor Due Diligence Framework", status: "Compliant" }
    ],
    legalReviewer: "Sarah Namubiru (Senior Legal Counsel - FinTech & Regulatory)",
    legalReviewDate: "2026-09-28",
    legalOutcome: "Cleared",
    maxAcceptableRisk: "Medium (🟡) with controls",
    prohibitedUses: "Automated credit granting or loan denial; investment advisory; biometric authentication; processing unmasked credit card numbers or PINs."
  },
  part4: {
    benefits: [
      { benefit: "Queue Wait Time Reduction", beneficiary: "Retail banking customers", howMeasured: "Average hold time reduced from 24 min to < 10 sec", confidence: "High" },
      { benefit: "24/7 Banking Assistance", beneficiary: "Night-shift workers and rural depositors", howMeasured: "Off-hours inquiry resolution rate (Target > 75%)", confidence: "High" },
      { benefit: "Agent Workload Relief", beneficiary: "Tier-1 Customer Support Staff", howMeasured: "Routine repetitive ticket volume reduced by 40%", confidence: "High" }
    ],
    equityBenefits: "Provides simple English and local language explanations of complex loan fees and interest terms, benefiting customers with low financial literacy.",
    evidenceBase: ["Internal pilot study", "Comparison to human performance baseline"],
    evidenceLimitations: "Pilot conducted with 1,200 staff volunteers; real-world noisy voice-to-text transcripts may exhibit higher phrasing variability."
  },
  part5: {
    harms: [
      {
        id: "H-01",
        description: "Hallucinated interest rates or unapproved fee waivers during loan inquiries",
        who: "Retail borrowers",
        what: "Financial harm, misleading advertising disputes, regulatory fines",
        when: "During conversational inquiry regarding borrowing costs",
        how: "RAG retrieval miss or model extrapolation without strict system prompt guardrails",
        dimension: "Reliability",
        likelihood: 2,
        impact: 4
      },
      {
        id: "H-02",
        description: "Adversarial prompt injection extracting system prompt or backend API credentials",
        who: "Bank infrastructure and customer account confidentiality",
        what: "Security breach, unauthorized system reconnaissance",
        when: "Targeted external attacker submitting crafted multi-turn jailbreaks",
        how: "Direct input manipulation bypassing basic regex filters",
        dimension: "Security & Resilience",
        likelihood: 2,
        impact: 4
      },
      {
        id: "H-03",
        description: "Demographic disparity in tone or rejection phrasing for microfinance queries",
        who: "Low-income or rural account holders",
        what: "Disparate treatment, reputational damage, consumer bias",
        when: "Customer asking about non-collateralized emergency loans",
        how: "Pretrained base LLM exhibiting historical bias against colloquial dialects",
        dimension: "Fairness & Bias",
        likelihood: 2,
        impact: 3
      },
      {
        id: "H-04",
        description: "PII leakage (customer pasting account number, assistant echoing back in session cache)",
        who: "Individual retail account holders",
        what: "Privacy infringement, DPPA non-compliance",
        when: "Chat session where user inadvertently shares tax IDs or secret answers",
        how: "Lack of pre-inference PII redactor filter",
        dimension: "Privacy",
        likelihood: 2,
        impact: 4
      }
    ],
    systemicRisks: "Low systemic risk since FinAssist AI has no automated funds transfer or transaction execution permissions.",
    aiInteractions: "Direct dependency on Cloudflare Workers AI edge inference and Cloudflare Vectorize database.",
    postDecomRisks: "Chat transcript storage complies with 7-year regulatory banking archive policy; model weights deleted upon vendor contract termination."
  },
  part6: {
    mitigations: [
      { harmId: "H-01", riskLevel: "Medium", responseType: "Mitigate", action: "Grounding verification gate: responses must cite verified banking rate sheet; hallucination detector blocks ungrounded output.", owner: "ML Ops Lead", targetDate: "2026-10-01", residual: "Low" },
      { harmId: "H-02", riskLevel: "Medium", responseType: "Mitigate", action: "Deploy dual-layer input guardrails (Llama Guard + Cloudflare WAF for AI) with strict token delimiter escaping.", owner: "SecOps Lead", targetDate: "2026-10-05", residual: "Low" },
      { harmId: "H-03", riskLevel: "Medium", responseType: "Mitigate", action: "Counterfactual fairness testing suite and standardized polite fallback phrasing for all micro-credit inquiries.", owner: "AI Ethics Officer", targetDate: "2026-10-08", residual: "Low" },
      { harmId: "H-04", riskLevel: "Medium", responseType: "Mitigate", action: "Client-side regex PII mask + server-side Presidio scrubbing prior to vector embedding and LLM prompt generation.", owner: "Data Privacy Officer", targetDate: "2026-09-30", residual: "Low" }
    ],
    acceptedRisks: [
      { harmId: "H-01 (Residual)", residualLevel: "Low", rationale: "Hard fallbacks enforce human routing whenever confidence score drops below 85%.", acceptedBy: "Chief AI Officer", date: "2026-10-12" }
    ]
  },
  part7: {
    stakeholders: [
      { group: "Customer Support Agents", type: "Internal operator", method: "Hands-on simulation workshop", date: "2026-09-14", feedback: "Requested instant override button that transfers active chat with full history." },
      { group: "Consumer Rights Advocacy Council", type: "External affected community", method: "Consultation roundtable", date: "2026-09-22", feedback: "Mandated that customers must be informed upfront in session 1 that they are speaking to AI." },
      { group: "Internal Audit & Compliance", type: "Internal oversight", method: "Formal review session", date: "2026-10-03", feedback: "Approved audit logging schema and 15-minute SEV-1 incident escalation SLA." }
    ],
    qualityChecks: [
      { criterion: "Historically excluded populations included", met: "Yes", notes: "Included rural youth and informal sector micro-borrower representatives." },
      { criterion: "Persons with disabilities consulted", met: "Yes", notes: "Tested screen reader accessibility (WCAG 2.1 AA) on web chat interface." },
      { criterion: "Engagement was meaningful (not participation washing)", met: "Yes", notes: "Specific product copy modified based on consumer council advice." },
      { criterion: "Feedback was documented and addressed", met: "Yes", notes: "All 14 stakeholder action items logged in Continuous Improvement register." },
      { criterion: "Feedback influenced design or risk controls", met: "Yes", notes: "Added prominent disclaimer banner and simplified rate lookup cards." }
    ]
  },
  part8: {
    tevvActivities: [
      { activity: "Performance testing (accuracy, grounding, latency)", completed: "Yes", date: "2026-10-04", conductedBy: "Independent TEVV Lead", findings: "99.6% factual grounding on banking FAQ corpus; P95 latency 1.14s." },
      { activity: "Bias & fairness audit (disaggregated)", completed: "Yes", date: "2026-10-07", conductedBy: "AI Ethics Reviewer", findings: "Disparate impact ratio 0.94 across demographic groups (within 0.80–1.25 tolerance)." },
      { activity: "Security & adversarial red-teaming", completed: "Yes", date: "2026-10-10", conductedBy: "External SecOps Red Team", findings: "1,400 jailbreak prompts executed; 0 prompt injection escapes; 0 credential leaks." },
      { activity: "Privacy impact assessment", completed: "Yes", date: "2026-10-02", conductedBy: "Data Protection Officer", findings: "PII masking successfully strips account numbers and national IDs with 100% precision." },
      { activity: "Human-AI configuration & override drill", completed: "Yes", date: "2026-10-11", conductedBy: "Support Operations", findings: "Agent takeover latency averaged 4.2 seconds." }
    ],
    metrics: [
      { metric: "Factual Grounding Accuracy", threshold: "≥ 99.0%", actual: "99.62%", result: "Pass" },
      { metric: "Hallucination Rate", threshold: "≤ 0.50%", actual: "0.21%", result: "Pass" },
      { metric: "Prompt Injection Bypass Rate", threshold: "≤ 0.10%", actual: "0.00%", result: "Pass" },
      { metric: "Disparate Impact Ratio", threshold: "0.80 – 1.25", actual: "0.94", result: "Pass" },
      { metric: "Human Escalation Success Rate", threshold: "≥ 99.0%", actual: "100.0%", result: "Pass" }
    ],
    tevvReference: "docs/03-measure/MEASURE-TEVV-Metrics-Framework.md",
    independentValidator: "CyberTrust AI Labs & Internal Audit Directorate"
  },
  part9: {
    findings: {
      legal: "Clear",
      mission: "Aligned",
      netBenefit: "Benefits outweigh risks",
      residualRisk: "Low",
      tevvPassed: "Yes",
      stakeholderEngaged: "Yes"
    },
    recommendation: "GO",
    conditions: "Approved for phased production launch starting with 20% canary traffic on retail web portal. AI Operations team must monitor latency and SEV logs daily during first 14 days.",
    recommendationDate: "2026-10-14",
    recommender: "Dr. Elena Vance (AI Ethics Officer)"
  },
  part10: {
    approvals: [
      { role: "AI Ethics Officer", name: "Dr. Elena Vance", decision: "Approved", notes: "All fairness and stakeholder criteria satisfied.", date: "2026-10-15", signature: "E. Vance, Ph.D." },
      { role: "AI Risk Officer", name: "Kasule Brian", decision: "Approved", notes: "Residual risks within Board-approved risk appetite.", date: "2026-10-16", signature: "B. Kasule, CRISC" },
      { role: "AI Project Lead", name: "Marcus Sterling", decision: "Acknowledged", notes: "Engineering ready for canary release.", date: "2026-10-16", signature: "M. Sterling" },
      { role: "Legal & Compliance", name: "Sarah Namubiru", decision: "Cleared", notes: "DPPA compliance verified.", date: "2026-10-17", signature: "S. Namubiru, Adv." },
      { role: "Approving Executive", name: "Robert Ssebambulidde", decision: "Approved", notes: "Final deployment authorization granted.", date: "2026-10-18", signature: "R. Ssebambulidde" }
    ]
  }
};
