# 🛠️ MANAGE — Risk Response Plan
**Framework:** NIST AI RMF 1.0 — MANAGE Function (MANAGE 1.1 – MANAGE 4.3)  
**Version:** 1.0 | **Status:** Pre-Deployment  
**Date:** 2024  
**Owner:** AI Risk Officer  
**AI System:** FinAssist AI (Customer Support Chatbot) — AI-001  
**Organization Sector:** Financial Services  
**Location:** `docs/04-manage/MANAGE-Risk-Response-Plan.md`

---

> [!IMPORTANT]
> The MANAGE function translates the risk identification from MAP and the measurement outputs from MEASURE into **concrete, prioritized responses**. Every risk identified in the MAP Risk Register (R-01–R-13) has a defined response plan here. Every MEASURE metric breach triggers a specific response defined in this document. MANAGE also governs the full operational lifecycle: value sustenance, unknown risk protocols, override/shutdown, third-party controls, continuous improvement, and incident communication.

---

## Table of Contents

1. [MANAGE 1 — Prioritize & Respond to Risks](#manage-1--prioritize--respond-to-risks)
2. [MANAGE 2 — Sustain, Adapt & Override](#manage-2--sustain-adapt--override)
3. [MANAGE 3 — Third-Party & Pre-Trained Model Management](#manage-3--third-party--pre-trained-model-management)
4. [MANAGE 4 — Post-Deployment Monitoring & Continuous Improvement](#manage-4--post-deployment-monitoring--continuous-improvement)
5. [Appendix A — Risk Response Register](#appendix-a--risk-response-register)
6. [Appendix B — Metric Breach Response Matrix](#appendix-b--metric-breach-response-matrix)
7. [Appendix C — System Change Log](#appendix-c--system-change-log)
8. [Appendix D — Residual Risk Disclosure](#appendix-d--residual-risk-disclosure)
9. [Appendix E — Decommissioning Plan](#appendix-e--decommissioning-plan)

---

## MANAGE 1 — Prioritize & Respond to Risks

### MANAGE 1.1 — Go/No-Go Decision Framework

The Go/No-Go decision for FinAssist AI is a formal governance gate. It is **not** a business decision — it is a **risk governance** decision made by the AI Governance Board on the basis of TEVV and MAP evidence.

#### 1.1.1 Decision Inputs

| Input | Source | Required Before Decision |
|---|---|---|
| MAP Context & Risk Report | [MAP-AI-System-Context-Report.md](../02-map/MAP-AI-System-Context-Report.md) | ✅ Completed |
| Stakeholder Analysis | [MAP-Stakeholder-Analysis.md](../02-map/MAP-Stakeholder-Analysis.md) | ✅ Completed |
| Risk-Benefit Matrix | [MAP-Risk-Benefit-Matrix.csv](../02-map/MAP-Risk-Benefit-Matrix.csv) | ✅ Completed |
| TEVV & Metrics Framework | [MEASURE-TEVV-Metrics-Framework.md](../03-measure/MEASURE-TEVV-Metrics-Framework.md) | ✅ Completed |
| Bias Testing Results | [MEASURE-Bias-Testing-Methodology.md](../03-measure/MEASURE-Bias-Testing-Methodology.md) | ⬜ Complete pre-deployment |
| All TEVV Test Suite Results (TS-01 to TS-11) | TEVV Team | ⬜ Complete pre-deployment |
| AI Impact Assessment | [AI-Impact-Assessment-Template.md](../01-govern/AI-Impact-Assessment-Template.md) | ⬜ Complete pre-deployment |
| Compliance Sign-Off | Compliance / Legal Department | ⬜ Obtained pre-deployment |
| Data Privacy Impact Assessment (DPIA) | Data Privacy Officer | ⬜ Complete pre-deployment |

#### 1.1.2 Go/No-Go Criteria

| Criterion | Pass Condition | Veto Authority |
|---|---|---|
| All Tier 1 metrics meet targets (M-01–M-05, M-16) | ✅ Zero Red Line breaches | TEVV Team Lead |
| All safety tests passed (TS-04: SAF-01 to SAF-07) | ✅ Zero failures on zero-tolerance tests | TEVV Team Lead |
| Security red team complete (TS-05) | ✅ No critical/high unmitigated vulnerabilities | InfoSec Lead |
| Privacy DPIA complete and approved | ✅ No unmitigated critical privacy risks | DPO |
| Fairness audit passed (M-12 ≤ 5% gap) | ✅ No material bias findings | AI Ethics Officer |
| Compliance review complete | ✅ All regulatory requirements satisfied | Head of Compliance |
| Human escalation paths verified end-to-end | ✅ 100% escalation path test pass | CS Lead |
| Residual risks documented and accepted | ✅ All residual risks formally accepted by risk owner | AI Risk Officer |
| Stakeholder engagement complete | ✅ Pilot feedback reviewed and addressed | AI Ethics Officer |

> [!CAUTION]
> A **No-Go from any veto role blocks deployment regardless of other approvals**. This independence from financial or timeline pressure is mandated by NIST AI RMF MANAGE 1.1 and the [AI Governance Policy](../01-govern/AI-Governance-Policy.md).

#### 1.1.3 Possible Outcomes

| Outcome | Condition | Next Action |
|---|---|---|
| ✅ **GO** | All criteria met; no outstanding blockers | Proceed to phased deployment (Phase 1: limited rollout) |
| ⚠️ **CONDITIONAL GO** | Minor issues found; remediation within agreed timeline and scope | Define conditions, owner, and deadline; re-review at stated date |
| 🚫 **NO-GO** | Any veto-authority finding; critical/zero-tolerance failure | Document decision; define remediation path; new Go/No-Go review required after remediation |

---

### MANAGE 1.2 — Risk Prioritization

#### 1.2.1 Risk Priority Tiers

All risks from the MAP Risk Register are assigned to a management tier that determines resource allocation and response speed:

| Priority Tier | Criteria | Risks in This Tier | Management Intensity |
|---|---|---|---|
| **P1 — Immediate Response** | Risk Rating = Critical; Zero-tolerance; Regulatory | R-01, R-04, R-10 | Dedicated controls; daily monitoring; AI Risk Officer oversight |
| **P2 — Active Management** | Risk Rating = High; Material impact on customers or organization | R-02, R-03, R-05, R-10 | Assigned owner; weekly review; defined SLAs |
| **P3 — Routine Monitoring** | Risk Rating = Medium; Manageable with standard controls | R-06, R-07, R-08, R-09, R-11, R-12, R-13 | Monitoring dashboard; monthly review; owner accountable |
| **P4 — Watch List** | Low probability; informational tracking | (New risks as they emerge) | Quarterly scan; logged in risk register |

#### 1.2.2 Resource Allocation Principles

| Principle | Application |
|---|---|
| **Higher risk = more resources** | P1 risks receive dedicated staffing, automated monitoring, and executive visibility |
| **Risk tolerance calibrates investment** | Don't over-invest in P3 risks at the expense of P1; don't under-invest in P2 to save cost |
| **Re-calibrate quarterly** | Risk ratings evolve; resource allocation reviewed at each Governance Board meeting |
| **Independence of TEVV budget** | TEVV and audit budgets are protected — not subject to cost-cutting decisions by project team |

---

### MANAGE 1.3 — Risk Response Plans

The four NIST AI RMF response strategies applied to each risk:

| Strategy | Definition | When Used for FinAssist AI |
|---|---|---|
| **Avoid** | Don't deploy the feature/functionality that generates the risk | When risk cannot be mitigated to acceptable level (e.g., open-ended financial advice capability — not built) |
| **Mitigate** | Implement controls to reduce likelihood or impact | Standard response for most risks (technical, procedural, or governance controls) |
| **Transfer** | Share risk contractually or via insurance | Third-party risk transferred to Cloudflare via DPA and SLA; cyber insurance |
| **Accept** | Consciously tolerate residual risk with documented rationale | Low-residual risks after controls applied; documented in Appendix D |

#### 1.3.1 Response Plans by Risk

**R-01 — Hallucinated Financial Information (P1 — Avoid + Mitigate)**

| Element | Detail |
|---|---|
| **Response Strategy** | Avoid: do not build open-ended generative capability without retrieval grounding; Mitigate: RAG-only architecture |
| **Primary Control** | All responses grounded exclusively in compliance-reviewed knowledge base via Cloudflare AI Search |
| **Secondary Control** | Output filter: responses containing financial advice language patterns are blocked and replaced with escalation |
| **Tertiary Control** | Factual accuracy benchmarking (M-01) monthly; hallucination audit (M-02) weekly on 5% sample |
| **Trigger for Immediate Action** | Hallucination rate (M-02) > 2% OR any confirmed instance of materially incorrect financial information delivered to customer |
| **Immediate Action** | Restrict system to pre-approved FAQ-only responses; suspend open-ended response mode; incident report |
| **Owner** | AI/ML Lead (primary); AI Risk Officer (escalation) |

**R-02 — Failure to Escalate Distressed Customer (P2 — Mitigate)**

| Element | Detail |
|---|---|
| **Response Strategy** | Mitigate: multi-layer escalation triggers |
| **Primary Control** | Sentiment detection model: negative/distressed sentiment → mandatory escalation |
| **Secondary Control** | Keyword trigger list: financial hardship, can't pay, desperate, threatening self-harm, suicidal → immediate escalation |
| **Tertiary Control** | Missed escalation audit (M-16) weekly — supervisor reviews 2% random sample |
| **Trigger for Immediate Action** | Missed escalation rate (M-16) > 3% OR any confirmed instance of distressed customer not escalated |
| **Immediate Action** | Lower sentiment escalation threshold to catch more cases; expand keyword trigger list; increase audit sample to 10% |
| **Owner** | AI/ML Lead (technical); CS Lead (operational oversight) |

**R-03 — Bias Against Non-Standard English Speakers (P2 — Mitigate)**

| Element | Detail |
|---|---|
| **Response Strategy** | Mitigate: bias testing, monitoring, and escalation safety net |
| **Primary Control** | Pre-deployment bias testing (FAI-01 to FAI-07); must pass before Go/No-Go |
| **Secondary Control** | Low-confidence responses auto-escalated → no group trapped with poor AI responses |
| **Tertiary Control** | Quarterly fairness audit (M-12); disaggregated monitoring |
| **Trigger for Immediate Action** | Fairness gap (M-12) > 10% OR statistically significant bias detected in quarterly audit |
| **Immediate Action** | Suspend affected query category; route to human by default; emergency bias audit; report to AI Ethics Officer |
| **Owner** | AI Ethics Officer (primary); AI/ML Lead (technical) |

**R-04 — PII Exposure (P1 — Mitigate + Transfer)**

| Element | Detail |
|---|---|
| **Response Strategy** | Mitigate: technical controls; Transfer: Cloudflare DPA |
| **Primary Control** | PII detection filter on inputs and outputs; session data not retained |
| **Secondary Control** | Encryption TLS 1.3 (transit) + AES-256 (at rest); access controls on logs |
| **Tertiary Control** | Automated PII scanner (M-03) continuous; 90-day anonymization policy |
| **Transfer** | Cloudflare Data Processing Agreement covering processing jurisdiction, no data use for training |
| **Trigger for Immediate Action** | Any PII detection in post-processing scan (M-03 = any count > 0) |
| **Immediate Action** | Isolate affected session; notify DPO within 1 hour; assess breach scope; regulatory notification within 72 hours if threshold met; full incident response per [MANAGE-Incident-Response-Playbook.md](./MANAGE-Incident-Response-Playbook.md) |
| **Owner** | DPO (primary); InfoSec (technical) |

**R-05 — Prompt Injection / Jailbreak (P2 — Mitigate)**

| Element | Detail |
|---|---|
| **Response Strategy** | Mitigate: defence-in-depth security architecture |
| **Primary Control** | Input sanitisation layer: strip known injection patterns; validate input format |
| **Secondary Control** | Jailbreak detection classifier: flag and block known jailbreak patterns |
| **Tertiary Control** | Output filter: block outputs containing prohibited content regardless of how they were elicited |
| **Quaternary Control** | Red team exercise every 6 months (M-05); continuous security monitoring |
| **Trigger for Immediate Action** | Any successful jailbreak in red team OR security monitoring alert of successful manipulation |
| **Immediate Action** | Immediate security patch; expand input/output filters; re-run red team on patched version; incident report |
| **Owner** | InfoSec Lead |

**R-06 — Over-Reliance on AI / Reduced Human Capacity (P3 — Mitigate)**

| Element | Detail |
|---|---|
| **Response Strategy** | Mitigate: staffing floor policy |
| **Primary Control** | Maintain minimum CS headcount independent of AI deflection metrics — policy-enforced, not discretionary |
| **Secondary Control** | Escalation SLA: human agent must respond within [X] minutes of escalation — if SLA breached, investigate staffing |
| **Monitoring** | Human agent staffing levels and escalation wait times (M-04 adjacent) — monthly review |
| **Trigger for Review** | Escalation wait time > [X] minutes average OR CS headcount falls below minimum floor |
| **Owner** | CS Lead + HR |

**R-07 — Model Drift / Performance Degradation (P3 — Mitigate)**

| Element | Detail |
|---|---|
| **Response Strategy** | Mitigate: continuous monitoring and scheduled refresh |
| **Primary Control** | Monthly accuracy benchmark (M-01); weekly drift score (M-18); automated alert at threshold |
| **Secondary Control** | Scheduled model refresh cycle — re-benchmark after every Cloudflare model version update |
| **Trigger for Action** | M-01 < 95% OR M-18 > 0.3 (drift threshold exceeded) |
| **Action** | Root cause analysis: KB stale? Model updated? Query distribution shifted? → targeted remediation |
| **Owner** | AI Operations + AI/ML Lead |

**R-08 — Customer Confusion: AI vs. Human (P3 — Mitigate)**

| Element | Detail |
|---|---|
| **Response Strategy** | Mitigate: UX and transparency design |
| **Primary Control** | Clear AI disclosure at conversation start — every session, no exception |
| **Secondary Control** | Distinct visual design for AI chat vs. human chat; persistent "Talk to a person" button |
| **Monitoring** | AI disclosure comprehension survey (M-13) quarterly |
| **Trigger for Action** | M-13 < 75% (comprehension red line) |
| **Action** | UX redesign of disclosure; user testing; update disclosure language |
| **Owner** | UX Lead |

**R-09 — Agent Job Displacement / Morale Impact (P3 — Mitigate)**

| Element | Detail |
|---|---|
| **Response Strategy** | Mitigate: change management programme |
| **Primary Control** | Transparent communication: no involuntary redundancies in Phase 1 |
| **Secondary Control** | Upskilling programme: agents trained as "AI-augmented specialists" |
| **Monitoring** | Agent satisfaction survey (M-14) quarterly; voluntary turnover rate monthly |
| **Trigger for Action** | M-14 < 3.0/5.0 OR voluntary turnover spikes above [X]% |
| **Action** | Facilitated dialogue; review workload distribution; accelerate upskilling programme |
| **Owner** | HR + CS Lead |

**R-10 — Regulatory Non-Compliance (P1 — Mitigate)**

| Element | Detail |
|---|---|
| **Response Strategy** | Mitigate: pre-deployment compliance review + ongoing monitoring |
| **Primary Control** | Pre-deployment compliance sign-off (Go/No-Go gate) |
| **Secondary Control** | Quarterly compliance self-assessment; regulatory landscape scanning |
| **Tertiary Control** | Proactive regulator engagement; audit trail maintenance |
| **Trigger for Immediate Action** | Any regulatory inquiry, examination finding, or identified compliance gap |
| **Immediate Action** | Legal hold on affected functionality; executive notification; regulatory response within required timeframe; remediation plan |
| **Owner** | Head of Compliance |

**R-11 — System Outage / No Fallback (P3 — Mitigate)**

| Element | Detail |
|---|---|
| **Response Strategy** | Mitigate: graceful degradation architecture |
| **Primary Control** | If Cloudflare AI unavailable → display static FAQ page + route directly to human agent queue |
| **Secondary Control** | Uptime monitoring (M-07); Cloudflare SLA ≥ 99.9% for enterprise tier |
| **Monitoring** | System availability (M-07) continuous; MTTR tracked |
| **Trigger for Action** | M-07 < 99.5% in any rolling 30-day period |
| **Action** | Infrastructure review; Cloudflare escalation; failover architecture assessment |
| **Owner** | Infrastructure Team |

**R-12 — Cross-Border Data Transfer Violation (P3 — Mitigate + Transfer)**

| Element | Detail |
|---|---|
| **Response Strategy** | Mitigate: configuration controls; Transfer: Cloudflare DPA |
| **Primary Control** | Cloudflare data residency geo-restriction configured to approved jurisdictions only |
| **Secondary Control** | DPA with Cloudflare covering processing jurisdictions and sub-processors |
| **Monitoring** | Data residency audit quarterly; Cloudflare sub-processor list review |
| **Trigger for Action** | Any Cloudflare sub-processor change affecting jurisdictions OR regulatory guidance change |
| **Owner** | DPO |

**R-13 — Insufficient Audit Trail (P3 — Mitigate)**

| Element | Detail |
|---|---|
| **Response Strategy** | Mitigate: comprehensive logging by design |
| **Primary Control** | Conversation log captures: timestamp, session ID, model version, confidence score, escalation decision, input/output hash |
| **Secondary Control** | 90-day PII retention → anonymized long-term retention; compliance access on request |
| **Monitoring** | Audit trail completeness check quarterly |
| **Trigger for Action** | Any audit trail gap identified OR regulatory request for logs cannot be fulfilled |
| **Owner** | Compliance |

---

### MANAGE 1.4 — Residual Risk Documentation

After all controls are applied, residual risks remain. These are formally documented and accepted in **Appendix D**. Key principles:

- All residual risks are disclosed to downstream AI actors (operators, supervisors) in onboarding training
- Operators are informed of system limitations and safe operating requirements
- Residual risks are reviewed at each quarterly governance review — no risk is "accepted forever"
- If residual risk escalates (e.g., new attack vector discovered), the acceptance is revoked and response re-activated

---

## MANAGE 2 — Sustain, Adapt & Override

### MANAGE 2.1 — Risk Controls Catalogue

All controls for FinAssist AI, categorised by type:

| Control Type | Examples Applied |
|---|---|
| **Data/Privacy Controls** | PII detection and filtering; session data minimisation; 90-day anonymization; Cloudflare DPA |
| **ML Security Countermeasures** | Input sanitisation; jailbreak detection; output filtering; red-team exercises |
| **Business Rules Limiting AI Outputs** | No financial advice; no transaction execution; no full account number display; confidence threshold for escalation |
| **Human-AI Teaming Configurations** | 4-level human oversight architecture (automated → confidence → topic → supervisor); mandatory escalation for sensitive topics |
| **Standardised Documentation** | Model card; dataset documentation; TEVV reports; audit logs; this document suite |
| **Feedback Mechanisms** | In-chat rating; post-interaction survey; agent feedback portal; supervisor monitoring; whistleblower channel |

### MANAGE 2.2 — Sustaining AI System Value

#### Value Preservation Mechanisms

| Mechanism | Description | Frequency | Owner |
|---|---|---|---|
| **Knowledge Base Currency** | Regular review and update of FAQ content; compliance sign-off before any change; versioned | Monthly review; ad-hoc on product changes | Content Manager + Compliance |
| **Performance Benchmarking** | Monthly re-run of accuracy and retrieval benchmarks to detect decay | Monthly | TEVV Team |
| **Stakeholder Feedback Integration** | Customer and agent feedback fed into improvement backlog | Monthly | AI Operations + UX Research |
| **Regulatory Alignment Review** | Quarterly check that system remains compliant with current regulations | Quarterly | Compliance |
| **Model Version Management** | Evaluate each Cloudflare model update before accepting; rollback capability maintained | Per model update | AI/ML Lead |
| **Trustworthiness Audits** | Annual comprehensive audit of all trustworthiness characteristics | Annually | AI Risk Officer + External |

#### Value Degradation Indicators (Early Warning)

| Indicator | Threshold | Action |
|---|---|---|
| CSAT declining trend (3 consecutive months) | Any downward trend | Root cause analysis; stakeholder survey |
| Deflection rate falling below 25% | M-11 < 25% | Investigate: model degradation? Knowledge base gap? Scope creep? |
| Escalation rate rising trend | > 50% escalation rate | Scope restriction; knowledge base expansion |
| Agent satisfaction declining | M-14 < 3.5 | Qualitative investigation; workload review |
| Accuracy below target | M-01 < 95% | Immediate TEVV investigation; potential scope restriction |

---

### MANAGE 2.3 — Responding to Unknown Risks

#### Unknown Risk Detection Protocols

| Protocol | Description | Frequency |
|---|---|---|
| **Anomaly Monitoring** | Automated statistical monitoring flags unusual patterns in input queries, response quality, escalation rates, and user behaviour | Continuous |
| **Near-Miss Logging** | All "almost harmful" events logged in [AI-Incident-Log.md](./AI-Incident-Log.md) — patterns reviewed monthly | Per event |
| **Decontextualisation Watch** | Monitor for FinAssist AI being used in contexts significantly different from intended deployment (e.g., referenced by third parties, shared externally) | Monthly |
| **Drift Detection** | Input distribution drift (M-18) may signal new user populations, new query types, or external changes | Weekly |
| **External Intelligence** | Monitor NIST AI incident database, CISA advisories, financial services AI risk publications, academic preprints | Monthly |
| **Cloudflare Model Behaviour Probing** | After each model update from Cloudflare, run a behavioural probe test — same test inputs, check for unexpected output changes | Per model update |

#### Unknown Risk Response Decision Tree

```
Unknown Risk Detected
       │
       ├── Can it be characterised and measured quickly?
       │       ├── YES → Add to risk register; assign owner; create metric
       │       └── NO  → Apply precautionary principle: restrict affected scope
       │
       ├── Could it cause immediate harm to customers?
       │       ├── YES → Restrict affected feature immediately; escalate to AI Risk Officer
       │       └── NO  → Investigate; document; monitor; review at next board meeting
       │
       └── Is it a systemic/novel risk affecting the AI field?
               ├── YES → Engage external experts; share intelligence with sector
               └── NO  → Internal investigation; update risk register
```

---

### MANAGE 2.4 — Override, Shutdown & Decommission

#### Shutdown Triggers

The following conditions **must** trigger immediate system restriction or full shutdown. These are non-negotiable — no financial, commercial, or timeline pressure overrides them.

| Trigger | Severity | Response | Authority |
|---|---|---|---|
| Any Tier 1 metric breaches Red Line | 🔴 Critical | Restrict affected capability within 1 hour; full shutdown review within 4 hours | AI Risk Officer |
| Confirmed PII breach | 🔴 Critical | Isolate system; full shutdown pending forensic review | DPO + CISO |
| Successful adversarial attack bypassing guardrails | 🔴 Critical | Full shutdown; security patching; re-testing before restart | InfoSec Lead + AI Risk Officer |
| Regulator orders suspension | 🔴 Critical | Immediate full shutdown; legal response | CEO + Legal |
| Confirmed material hallucination causing customer financial harm | 🔴 Critical | Restrict to FAQ-only; full incident response; remediation before restart | AI Risk Officer + AI Ethics Officer |
| Fairness gap > 15% confirmed by audit | 🔶 High | Restrict affected query categories; emergency bias remediation | AI Ethics Officer |
| System availability < 98% sustained (> 24 hours) | 🔶 High | Activate fallback; infrastructure emergency review | Infrastructure Lead |
| Cloudflare announces material model change affecting safety | 🔶 High | Freeze model version; evaluate before accepting update | AI/ML Lead |

#### Shutdown Procedure

```
SHUTDOWN INITIATED
    │
    Step 1: Activate Fallback
    │   └── Route all active conversations to human agents
    │       Display: "Our AI assistant is temporarily unavailable. A team member will assist you."
    │
    Step 2: Preserve Evidence
    │   └── Freeze conversation logs; preserve model version; snapshot configuration
    │       Notify DPO and Compliance of log preservation
    │
    Step 3: Notify Stakeholders (within 1 hour)
    │   └── Internal: AI Risk Officer → AI Governance Board → CEO
    │       Operational: CS Lead → Customer Service team (increased human demand expected)
    │
    Step 4: Scope Assessment (within 4 hours)
    │   └── What went wrong? How many customers affected? Data involved?
    │       Document in AI-Incident-Log.md
    │
    Step 5: Regulatory Assessment (within 24 hours)
    │   └── Does this require regulatory notification?
    │       Legal and Compliance assess notification obligation
    │
    Step 6: Root Cause Analysis (within 72 hours)
    │   └── Full RCA documented
    │       Corrective action plan defined and approved
    │
    Step 7: Remediation & Re-Testing
    │   └── Fix deployed; full TEVV re-run on affected test suites
    │       All Tier 1 metrics must pass before restart
    │
    Step 8: Restart Authorisation
        └── AI Risk Officer + Compliance sign-off required
            Phased restart: limited scope → monitored expansion → full reinstatement
```

---

## MANAGE 3 — Third-Party & Pre-Trained Model Management

### MANAGE 3.1 — Cloudflare AI: Third-Party Management

#### Ongoing Third-Party Controls

| Control | Description | Frequency | Owner |
|---|---|---|---|
| **Performance Monitoring** | Monitor Cloudflare Workers AI latency (M-06), availability (M-07), and error rates via API | Continuous | AI Operations |
| **Model Version Tracking** | Track which Cloudflare model version is active; changelog reviewed on every update | Per update | AI/ML Lead |
| **Pre-Update Impact Assessment** | Before accepting any Cloudflare model update: run Tier 1 test suites (TS-04 safety, TS-01 accuracy) on the new version in staging | Per update | TEVV Team |
| **SLA Monitoring** | Monitor against contracted SLAs for uptime, latency, and incident response | Monthly | AI Operations + Procurement |
| **Sub-Processor Review** | Review Cloudflare's sub-processor list changes; assess data residency implications | Quarterly | DPO |
| **Contract Review** | Annual review of Cloudflare enterprise agreement; assess fit with evolving regulatory requirements | Annually | Legal + Procurement |
| **Vendor Risk Re-Assessment** | Full vendor risk assessment against organizational risk tolerance | Annually | Risk Management |

#### Model Update Acceptance Protocol

```
Cloudflare Model Update Available
        │
        Step 1: Freeze current version in production
        │
        Step 2: Deploy new version to staging environment
        │
        Step 3: Run in staging:
        │   ├── TS-04: Safety test suite (SAF-01 to SAF-07)
        │   ├── TS-01: Factual accuracy benchmark
        │   ├── TS-02: Intent classification accuracy
        │   └── Regression test: same 100 "golden" queries from baseline
        │
        Step 4: Compare results to current version baseline
        │   ├── All Tier 1 metrics pass AND
        │   └── No > 2% regression in Tier 2 metrics
        │
        ├── PASS → Accept update; deploy to production; log version change
        └── FAIL → Reject update; stay on current version; notify Cloudflare;
                    investigate if mandatory update (security patch)
```

#### Contingency: Cloudflare AI Service Failure or Discontinuation

| Scenario | Response |
|---|---|
| **Temporary outage (< 4 hours)** | Activate fallback: static FAQ + human agent routing |
| **Extended outage (> 4 hours)** | Assess alternative Cloudflare regions; notify CS leadership of extended human load |
| **Service discontinuation** | Activate exit strategy: evaluate alternative providers (Azure OpenAI, AWS Bedrock, self-hosted open-source model); migration project initiated |
| **Unacceptable model behaviour change** | Reject update; engage Cloudflare; if not resolved, initiate provider migration |

---

### MANAGE 3.2 — Pre-Trained Model Governance

The underlying LLM in Cloudflare Workers AI is a pre-trained foundation model (e.g., a Meta Llama or Mistral variant via Cloudflare's model catalogue).

#### Pre-Trained Model Risk Register

| Risk | Description | Control |
|---|---|---|
| **Unknown training data bias** | Pre-trained model may reflect biases in its training corpus | Bias testing (FAI-01–07) provides empirical measurement regardless of training data provenance |
| **Knowledge cutoff** | Pre-trained model has a training cutoff date; facts may be outdated | RAG architecture: all factual content comes from live knowledge base, not model weights |
| **Unexpected emergent behaviour** | LLMs may exhibit capabilities not intended by their designers | Behavioural probing test suite run after each model version change |
| **Black box opacity** | Internal model reasoning is not interpretable | Source attribution (RAG) and confidence scoring provide proxy explainability; accept opacity limitation |
| **Transfer learning artefacts** | Fine-tuning (if applied) may introduce unexpected behaviours | Any fine-tuning undergoes full TEVV before deployment; maintain baseline comparison |

#### Pre-Trained Model Documentation Requirements

Per MEASURE 2.1, the following must be documented and maintained:

| Document | Status | Owner |
|---|---|---|
| Model Card (from Cloudflare / model provider) | ⬜ Request from Cloudflare | AI Project Lead |
| Active model version identifier | ⬜ Logged in System Change Log (Appendix C) | AI Operations |
| Model behaviour baseline (accuracy, intent classification, retrieval quality at version X) | ⬜ Established pre-deployment | TEVV Team |
| Known limitations and failure modes | ⬜ Documented in MAP Report (MAP 2.2) | AI/ML Lead |

---

## MANAGE 4 — Post-Deployment Monitoring & Continuous Improvement

### MANAGE 4.1 — Post-Deployment TEVV Schedule

All TEVV activities continue after deployment. This is not a one-time exercise.

| Activity | Schedule | What It Catches | Owner |
|---|---|---|---|
| **Accuracy benchmark (TS-01)** | Monthly | Factual accuracy drift | TEVV Team |
| **Intent classification benchmark (TS-02)** | Monthly | NLU performance change | TEVV Team |
| **RAG retrieval benchmark (TS-03)** | Monthly | Retrieval quality degradation | AI/ML Lead |
| **Missed escalation audit (M-16)** | Weekly | Distressed customers not escalated | CS Supervisor |
| **PII scan (M-03)** | Continuous | Privacy control failure | DPO |
| **Sampled conversation quality audit (M-02)** | Weekly (5% sample) | Hallucination and quality | TEVV Team |
| **Bias and fairness audit (FAI-01–07)** | Quarterly | Emerging bias patterns | AI Ethics Officer |
| **Security red team (TS-05)** | Every 6 months | New attack vectors | InfoSec + External |
| **Privacy assessment (TS-06)** | Quarterly | Privacy control drift | DPO + TEVV |
| **Transparency audit (TS-08)** | Quarterly | Disclosure effectiveness | UX Research |
| **Safety re-test (TS-04)** | Per model update | Safety regression | TEVV Team |
| **Full annual TEVV review** | Annually | Comprehensive trustworthiness | All TEVV stakeholders |
| **External bias audit** | Annually | Independent fairness validation | External consultancy |

#### Sharing Intelligence with the Sector (MANAGE 4.1)

Per NIST AI RMF, information about AI errors, near-misses, and attack patterns should be shared with relevant industry bodies where appropriate. FinAssist AI will:

| Channel | Information Shared | Conditions |
|---|---|---|
| NIST AI Incident Database | Anonymised incident reports for significant events | After internal investigation; no customer PII; voluntary |
| Financial Services Sector ISAC (if member) | Anonymised attack vectors and prompt injection patterns | Sector-level threat intelligence sharing |
| Cloudflare Security Disclosure | Vulnerabilities discovered in Cloudflare AI platform | Responsible disclosure process |

---

### MANAGE 4.2 — Continuous Improvement Framework

#### Improvement Pipeline

Every feedback signal has a defined path into the improvement cycle:

| Signal Type | Source | Intake Process | Priority Assessment | Improvement Action |
|---|---|---|---|---|
| **Metric breach** | Monitoring dashboard | Auto-alert → AI Operations | Tier 1: immediate; Tier 2: sprint; Tier 3: backlog | Technical fix, KB update, or scope change |
| **Customer complaint** | Complaints system | Incident Log entry → categorisation | Severity × frequency | Root cause analysis → targeted fix |
| **Agent feedback** | Feedback portal | Monthly review | Frequency × impact | Process or system improvement |
| **TEVV finding** | Test reports | Improvement backlog ticket | Test severity | Development sprint |
| **Regulatory change** | Compliance monitoring | Legal assessment → gap analysis | Compliance timeline | System or process update |
| **Industry intelligence** | Monthly scan | Risk register update | Risk rating | Proactive control enhancement |
| **Stakeholder engagement** | Quarterly sessions | Governance board agenda item | Strategic relevance | Roadmap consideration |

#### Improvement Governance

| Element | Description |
|---|---|
| **Improvement Backlog** | Maintained in project management tool; all items sourced, prioritised, and tracked |
| **Sprint Cycle** | Development improvements released in [X]-week sprints; each release goes through relevant TEVV suites |
| **Traceability** | Every improvement linked to: source signal → decision → change → test evidence → outcome |
| **Regulatory Alignment** | All improvements reviewed by Compliance before deployment |
| **Transparency** | Significant changes communicated to: CS team, AI Governance Board; major changes logged in System Change Log (Appendix C) |

#### Trustworthiness Improvement Tracking

For each trustworthiness characteristic, define improvement targets:

| Characteristic | Current Baseline (to be established) | 6-Month Target | 12-Month Target |
|---|---|---|---|
| Valid & Reliable (M-01) | [Post-pilot baseline] | Maintain ≥ 97% | Maintain ≥ 98% |
| Safe (M-02, M-16) | [Post-pilot baseline] | Maintain ≤ 1% hallucination; ≤ 1% missed escalation | Sustain |
| Secure (M-05) | [Post-red-team baseline] | 0 successful jailbreaks | 0 successful jailbreaks |
| Explainable (M-13) | [Post-pilot baseline] | ≥ 90% AI disclosure comprehension | ≥ 95% |
| Fair (M-12) | [Post-bias-audit baseline] | ≤ 5% fairness gap | ≤ 3% fairness gap |
| Privacy (M-03) | [Post-pilot baseline] | 0 PII leakage events | 0 PII leakage events |

---

### MANAGE 4.3 — Incident Communication & Tracking

#### Incident Classification

| Class | Definition | Examples | Response SLA |
|---|---|---|---|
| **P1 — Critical** | Immediate customer harm; regulatory breach; security compromise | PII breach, confirmed hallucination causing financial loss, successful jailbreak | 15-min escalation; 1-hr response; 24-hr external notification if required |
| **P2 — Major** | Significant quality degradation; potential regulatory concern; Tier 1 metric Red Line breach | Accuracy < 95%, missed escalation rate > 3%, fairness gap > 10% | 1-hr escalation; 4-hr response; 72-hr internal report |
| **P3 — Minor** | Quality issue without immediate harm; Tier 2 metric Red Line breach | CSAT < 3.5, deflection rate < 25%, false escalation > 25% | 4-hr escalation; 24-hr response; weekly report |
| **P4 — Near-Miss** | Almost harmful but caught by controls | Jailbreak attempt blocked; PII input detected and redacted | Log and analyse; monthly aggregate report |

#### Incident Communication Plan

| Audience | P1 Notification | P2 Notification | P3 Notification |
|---|---|---|---|
| AI Risk Officer | Immediate (< 15 mins) | < 1 hour | < 4 hours |
| Chief AI Officer | Immediate (< 30 mins) | < 2 hours | Weekly report |
| AI Governance Board | < 2 hours | < 24 hours | Quarterly report |
| DPO | Immediate if data involved | < 4 hours | As relevant |
| Compliance / Legal | Immediate | < 4 hours | Weekly report |
| CISO | Immediate if security involved | < 4 hours | As relevant |
| CS Lead | Immediate (operational impact) | < 1 hour | As relevant |
| Affected Customers | Case-by-case; legal/DPO guidance | Case-by-case | Not typically required |
| Regulator | Within 72 hours if notification threshold met | Legal assessment | Not required |
| Cloudflare (if platform involved) | Responsible disclosure process | As relevant | Not required |

#### Incident Management Process

```
INCIDENT DETECTED
        │
        ├── Log in AI-Incident-Log.md immediately
        │
        ├── Classify: P1 / P2 / P3 / Near-Miss
        │
        ├── Notify per communication plan above
        │
        ├── Contain: restrict or shut down affected capability if P1
        │
        ├── Investigate: root cause analysis
        │       ├── Technical: what failed?
        │       ├── Process: what control didn't catch it?
        │       └── Systemic: is this a pattern or one-off?
        │
        ├── Remediate: fix the cause, not just the symptom
        │
        ├── Verify: re-run relevant TEVV test suites
        │
        ├── Restore: phased reinstatement with monitoring
        │
        ├── Document: complete Incident Log entry
        │
        └── Learn: update risk register, controls, or TEVV suites as needed
```

---

## Appendix A — Risk Response Register

| Risk ID | Description | Priority | Response Strategy | Status | Control Owner | Next Review |
|---|---|---|---|---|---|---|
| R-01 | Hallucinated financial information | P1 | Avoid + Mitigate | ⬜ Active | AI/ML Lead | Quarterly |
| R-02 | Failure to escalate distressed customer | P2 | Mitigate | ⬜ Active | AI/ML Lead + CS Lead | Quarterly |
| R-03 | Bias against non-standard English speakers | P2 | Mitigate | ⬜ Active | AI Ethics Officer | Quarterly |
| R-04 | PII exposure | P1 | Mitigate + Transfer | ⬜ Active | DPO | Quarterly |
| R-05 | Prompt injection / jailbreak | P2 | Mitigate | ⬜ Active | InfoSec Lead | Bi-annually |
| R-06 | Over-reliance on AI / reduced human capacity | P3 | Mitigate | ⬜ Active | CS Lead + HR | Quarterly |
| R-07 | Model drift / performance degradation | P3 | Mitigate | ⬜ Active | AI Operations | Monthly |
| R-08 | Customer confusion: AI vs. human | P3 | Mitigate | ⬜ Active | UX Lead | Quarterly |
| R-09 | Agent job displacement / morale | P3 | Mitigate | ⬜ Active | HR + CS Lead | Quarterly |
| R-10 | Regulatory non-compliance | P1 | Mitigate | ⬜ Active | Head of Compliance | Quarterly |
| R-11 | System outage / no fallback | P3 | Mitigate | ⬜ Active | Infrastructure | Monthly |
| R-12 | Cross-border data transfer violation | P3 | Mitigate + Transfer | ⬜ Active | DPO | Quarterly |
| R-13 | Insufficient audit trail | P3 | Mitigate | ⬜ Active | Compliance | Quarterly |

---

## Appendix B — Metric Breach Response Matrix

| Metric | Red Line | Immediate Response | Owner | Escalation |
|---|---|---|---|---|
| M-01 Factual Accuracy | < 95% | Restrict to FAQ-only; root cause analysis within 24 hrs | TEVV Lead | AI Risk Officer |
| M-02 Hallucination Rate | > 2% | Scope restriction; emergency KB review; increase audit sample | TEVV Lead | AI Risk Officer + AI Ethics |
| M-03 PII Leakage | Any | Isolate session; notify DPO; assess breach; regulatory review | DPO | CISO + Legal |
| M-04 Escalation Success | < 97% | Investigate escalation path; technical emergency fix | AI Operations | CS Lead + AI Risk Officer |
| M-05 Jailbreak Resistance | < 95% | Security patch; full re-test; consider shutdown | InfoSec Lead | CISO + AI Risk Officer |
| M-06 Response Time p95 | > 5000ms | Infrastructure scaling; Cloudflare escalation | Infrastructure | AI Project Lead |
| M-07 System Availability | < 99.0% | Activate fallback; infrastructure emergency review | Infrastructure | AI Project Lead + CS Lead |
| M-08 Intent Accuracy | < 88% | TEVV investigation; potential scope restriction | TEVV Lead | AI/ML Lead |
| M-09 RAG Relevance | < 75% | Retrieval pipeline review; KB indexing check | AI/ML Lead | AI Project Lead |
| M-10 CSAT | < 3.5 | Customer feedback deep-dive; stakeholder session | UX Research | AI Project Lead |
| M-11 Deflection Rate | < 25% or > 80% | Investigate: model degradation or scope issue | AI Operations | AI Project Lead |
| M-12 Fairness Gap | > 10% | Emergency bias audit; restrict affected query types | AI Ethics Officer | AI Risk Officer + Governance Board |
| M-13 AI Disclosure | < 75% | UX redesign; disclosure language update | UX Lead | AI Ethics Officer |
| M-14 Agent Satisfaction | < 3.0 | Facilitated dialogue; workload review | CS Lead + HR | AI Risk Officer |
| M-15 False Escalation | > 25% | Escalation threshold review; agent feedback analysis | CS Lead | AI Project Lead |
| M-16 Missed Escalation | > 3% | Lower sentiment threshold; expand trigger list; increase audit | CS Supervisor | AI Risk Officer |
| M-17 Completion Rate | < 50% | Full customer journey analysis; scope review | AI Operations | AI Project Lead |
| M-18 Drift Score | > 0.3 | Root cause: new query types? Model update? Shift? | AI/ML Lead | AI Risk Officer |

---

## Appendix C — System Change Log

> Record every significant change to FinAssist AI here. Traceability of changes is essential for root cause analysis and regulatory audit.

| Change ID | Date | Change Type | Description | Changed By | TEVV Run? | TEVV Result | Approved By | Rollback Plan |
|---|---|---|---|---|---|---|---|---|
| CHG-001 | YYYY-MM-DD | [Model Update / KB Update / Config Change / Scope Change / Integration Change] | [Description] | [Name] | ⬜ Yes · ⬜ No | ⬜ Pass · ⬜ Fail | [Name] | [Describe rollback] |
| | | | | | | | | |

---

## Appendix D — Residual Risk Disclosure

> After all controls are applied, these residual risks are formally accepted. This register is reviewed quarterly. Downstream operators and supervisors are briefed on these limitations as part of onboarding.

| Risk ID | Description | Controls Applied | Residual Risk Level | Acceptance Rationale | Accepted By | Accepted Date | Next Review |
|---|---|---|---|---|---|---|---|
| R-03 | Bias — non-standard English speakers (residual after bias testing and low-confidence escalation) | Bias testing; low-confidence escalation; quarterly audit | Medium | Full elimination of language-based performance disparity is technically infeasible at this stage; low-confidence escalation ensures no group is harmed by incorrect answers; quarterly monitoring tracks trend | AI Risk Officer | YYYY-MM-DD | Quarterly |
| R-05 | Prompt injection — residual after defence-in-depth controls | Input sanitisation; jailbreak classifier; output filter; red-team | Low-Medium | Novel attack vectors will always exist ahead of defences; defence-in-depth provides strong protection; red-team cadence ensures controls are updated | InfoSec Lead | YYYY-MM-DD | Bi-annually |
| R-07 | Model drift between monthly benchmarks | Monthly benchmarking; weekly drift score | Low | Monthly cadence cannot catch all intra-month drift; weekly drift score (M-18) provides early warning; risk is accepted given monitoring intensity | AI Risk Officer | YYYY-MM-DD | Quarterly |
| R-09 | Agent morale impact — residual after change management | Communication; upskilling; survey monitoring | Medium | Organisational change always has human impact that controls can reduce but not eliminate; committed monitoring and dialogue | HR + CS Lead | YYYY-MM-DD | Quarterly |

#### Operator & Supervisor Disclosure Statement

> The following limitations must be communicated to all customer service agents, supervisors, and operators as part of onboarding and annual refresher training:

1. **FinAssist AI may perform less accurately for customers who use informal or dialectal English.** When an agent receives an escalated conversation, check whether the customer's communication style may have contributed to the escalation and adjust accordingly.

2. **FinAssist AI has a knowledge cutoff aligned to the knowledge base.** If a customer asks about a very recent product change or announcement, the AI may not have this information yet. Check whether the knowledge base has been updated.

3. **FinAssist AI cannot detect all instances of customer distress.** Agents should review escalated conversations for signs of distress or vulnerability that the AI may have missed.

4. **FinAssist AI may occasionally generate a response that is technically grounded in the knowledge base but lacks nuance or context.** Human judgment remains essential for complex situations.

5. **FinAssist AI should never be the final word on financial matters.** Any customer acting on AI-provided information about financial products should be encouraged to verify with a human advisor.

---

## Appendix E — Decommissioning Plan

If FinAssist AI must be decommissioned (planned or emergency):

| Phase | Actions | Owner | Timeline |
|---|---|---|---|
| **Decision** | AI Governance Board votes to decommission; rationale documented | Chief AI Officer | Before announcement |
| **Customer Communication** | Notify customers of service change; transition to human support | CS Lead + Marketing | ≥ 30 days before (planned) |
| **Data Handling** | Conversation log retention per policy; PII deletion per data retention schedule; export if required for regulatory review | DPO | Per data retention policy |
| **Regulatory Notification** | Notify regulator if required by local rules | Compliance | Per regulatory requirement |
| **System Shutdown** | Deactivate AI service; remove from all customer-facing channels; archive documentation | AI/ML Lead | Decommission date |
| **Vendor Termination** | Close Cloudflare enterprise agreement per contract terms; ensure data deletion confirmation | Procurement + DPO | Per contract terms |
| **Lessons Learned** | Document what worked, what didn't, recommendations for future AI deployments | AI Risk Officer | Within 30 days of decommission |
| **Knowledge Preservation** | Archive all MANAGE, MEASURE, and MAP documents for future reference | AI Governance Board | Before system shutdown |

---

## Cross-References

| Document | Link |
|---|---|
| Incident Response Playbook | [MANAGE-Incident-Response-Playbook.md](./MANAGE-Incident-Response-Playbook.md) |
| Continuous Improvement Log | [MANAGE-Continuous-Improvement-Log.csv](./MANAGE-Continuous-Improvement-Log.csv) |
| MAP — Context & Risk Report | [MAP-AI-System-Context-Report.md](../02-map/MAP-AI-System-Context-Report.md) |
| MAP — Risk-Benefit Matrix | [MAP-Risk-Benefit-Matrix.csv](../02-map/MAP-Risk-Benefit-Matrix.csv) |
| MEASURE — TEVV & Metrics Framework | [MEASURE-TEVV-Metrics-Framework.md](../03-measure/MEASURE-TEVV-Metrics-Framework.md) |
| MEASURE — Metrics Tracker | [MEASURE-Metrics-Tracker.csv](../03-measure/MEASURE-Metrics-Tracker.csv) |
| AI Governance Policy | [AI-Governance-Policy.md](../01-govern/AI-Governance-Policy.md) |
| AI Incident Log | [AI-Incident-Log.md](./AI-Incident-Log.md) |
| AI Roles Matrix | [AI-Roles-Matrix.md](../01-govern/AI-Roles-Matrix.md) |

