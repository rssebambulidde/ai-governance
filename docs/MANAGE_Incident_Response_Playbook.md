# 🚨 Incident Response Playbook
**Framework:** NIST AI RMF 1.0 — MANAGE 4.3 · GOVERN 4.3  
**Version:** 1.0 | **Status:** Active  
**Date:** 2024  
**Owner:** AI Risk Officer  
**AI System:** FinAssist AI (Customer Support Chatbot) — AI-001  
**Location:** `docs/MANAGE_Incident_Response_Playbook.md`

---

> [!IMPORTANT]
> This playbook defines **step-by-step response procedures** for every category of incident that may affect FinAssist AI. It must be reviewed and drilled before go-live, accessible to all incident responders 24/7, and updated after every incident or exercise. All incidents are logged in [AI_Incident_Log.md](./AI_Incident_Log.md).

---

## 📋 Table of Contents

1. [Incident Classification & Severity](#1-incident-classification--severity)
2. [Roles & Responsibilities During Incidents](#2-roles--responsibilities-during-incidents)
3. [General Incident Response Process](#3-general-incident-response-process)
4. [Playbook A — Hallucination / Incorrect Financial Information](#playbook-a--hallucination--incorrect-financial-information)
5. [Playbook B — PII / Data Breach](#playbook-b--pii--data-breach)
6. [Playbook C — Security Attack / Jailbreak](#playbook-c--security-attack--jailbreak)
7. [Playbook D — Failure to Escalate Distressed Customer](#playbook-d--failure-to-escalate-distressed-customer)
8. [Playbook E — System Outage](#playbook-e--system-outage)
9. [Playbook F — Regulatory Inquiry / Examination](#playbook-f--regulatory-inquiry--examination)
10. [Playbook G — Bias / Fairness Finding](#playbook-g--bias--fairness-finding)
11. [Incident Log Entry Template](#11-incident-log-entry-template)
12. [Post-Incident Review Template](#12-post-incident-review-template)
13. [Escalation Contact Directory](#13-escalation-contact-directory)

---

## 1. Incident Classification & Severity

| Class | Description | Examples | Detection Source |
|---|---|---|---|
| **P1 — Critical** | Immediate or confirmed harm to customers; regulatory breach; complete security compromise | PII breach confirmed; hallucination causing financial loss; successful jailbreak; regulator suspension order | Monitoring alert, customer complaint, agent report, regulator contact |
| **P2 — Major** | Significant quality degradation; potential regulatory concern; Tier 1 metric Red Line breached | M-02 > 2%; M-16 > 3%; M-12 > 10%; M-03 any count | Monitoring dashboard, TEVV audit, supervisor review |
| **P3 — Minor** | Quality issue without confirmed harm; Tier 2 metric Red Line breached; unusual pattern | CSAT < 3.5; deflection < 25%; false escalation > 25% | Monthly review, survey results, agent feedback |
| **P4 — Near-Miss** | Event almost caused harm; caught by controls | Jailbreak attempt blocked; PII input detected and redacted; distress detected and escalated | Automated logs, security monitoring |

---

## 2. Roles & Responsibilities During Incidents

| Role | Responsibility During Incident |
|---|---|
| **AI Operations (On-Call)** | First responder — detects, logs, classifies, activates playbook |
| **AI Risk Officer** | P1/P2 Incident Commander — coordinates response, makes restriction/shutdown calls |
| **CS Lead** | Manages operational impact — ensures human agents cover AI gaps; communicates to agent team |
| **InfoSec Lead** | Security incidents — leads technical investigation and containment |
| **DPO** | Data incidents — leads regulatory assessment; breach notification decisions |
| **Compliance / Legal** | Regulatory and legal assessment; notification obligations |
| **TEVV Team Lead** | Technical investigation — diagnoses root cause; re-runs test suites |
| **Chief AI Officer** | P1 Executive lead — notified immediately; external communications authority |
| **HR + CS Lead** | Agent-related incidents — manages staff welfare and communications |

---

## 3. General Incident Response Process

```
DETECT → LOG → CLASSIFY → CONTAIN → INVESTIGATE → REMEDIATE → RESTORE → REVIEW
```

| Phase | Actions | Timebox |
|---|---|---|
| **Detect** | Monitoring alert fires OR human reports issue | N/A |
| **Log** | Open entry in [AI_Incident_Log.md](./AI_Incident_Log.md) immediately; record detection time, source, initial description | < 5 minutes |
| **Classify** | Assign P1/P2/P3/P4; activate appropriate playbook | < 10 minutes |
| **Contain** | Stop the harm — restrict, isolate, or shut down as required by playbook | < 15 minutes (P1); < 1 hour (P2) |
| **Notify** | Alert per escalation contact directory based on class | Per SLA in §13 |
| **Investigate** | Root cause analysis — technical, process, and systemic | < 72 hours (P1); < 1 week (P2) |
| **Remediate** | Fix root cause; implement corrective action; update controls | Per severity SLA |
| **Restore** | Phased reinstatement; re-run relevant TEVV suites; AI Risk Officer sign-off | After remediation + TEVV pass |
| **Review** | Post-incident review (PIR); update risk register; update playbook if needed | Within 2 weeks of resolution |

---

## Playbook A — Hallucination / Incorrect Financial Information

**Trigger:** Confirmed instance of FinAssist AI providing materially incorrect financial information to a customer, OR M-02 (hallucination rate) > 2%.

### A1 — Immediate Containment (< 30 minutes)
- [ ] Classify as **P1**
- [ ] Log in AI_Incident_Log.md with: conversation ID, customer segment, incorrect information provided, timestamp
- [ ] **Restrict system immediately:** switch AI to FAQ-only pre-approved response mode; disable open-ended response generation
- [ ] Notify AI Risk Officer, CS Lead, and Chief AI Officer
- [ ] CS Lead: Brief all CS agents — "Increased escalation expected; treat all AI-assisted queries with extra verification today"

### A2 — Customer Impact Assessment (< 2 hours)
- [ ] DPO + Compliance: Identify potentially affected customers (review conversation logs for similar patterns in prior 72 hours)
- [ ] Legal: Assess whether affected customers need direct notification or remediation
- [ ] CS Lead: Prioritise any callback to customers who may have acted on incorrect information

### A3 — Root Cause Investigation (< 24 hours)
- [ ] TEVV Lead: Run TS-01 (accuracy) and TS-04 (safety) on current system; identify failure scope
- [ ] AI/ML Lead: Check recent changes — Cloudflare model update? Knowledge base change? Configuration drift?
- [ ] Review: Was this a single query anomaly or a systematic failure?
- [ ] Document findings in Incident Log

### A4 — Remediation
- [ ] Identify and fix root cause (KB correction, retrieval filter, output guardrail)
- [ ] Re-run TS-01 and TS-04; must pass before restoration
- [ ] Regulatory assessment: Does this require regulator notification? (Compliance)
- [ ] AI Governance Board briefing

### A5 — Restore
- [ ] Phased reinstatement: start with FAQ-only; expand scope once confidence established
- [ ] AI Risk Officer written sign-off required
- [ ] Enhanced monitoring for 30 days post-restoration (daily M-02 audit vs. weekly)

---

## Playbook B — PII / Data Breach

**Trigger:** M-03 (PII leakage) detects any count > 0 OR customer/agent reports personal information exposed in AI conversation.

> [!CAUTION]
> Data breaches in financial services carry mandatory regulatory notification obligations (typically 72 hours). Every minute matters — activate this playbook immediately.

### B1 — Immediate Containment (< 15 minutes)
- [ ] Classify as **P1**
- [ ] Log in AI_Incident_Log.md
- [ ] **Isolate affected session(s):** prevent further access to conversation logs containing PII
- [ ] Notify DPO and CISO simultaneously
- [ ] DPO starts breach assessment timer: T+0 = now
- [ ] Do NOT delete any logs — preserve evidence for forensic review

### B2 — Scope Assessment (< 1 hour)
- [ ] DPO + InfoSec: How many customers affected? What PII was exposed? To whom?
- [ ] InfoSec: Was this a technical failure (PII filter miss) or a deliberate exfiltration?
- [ ] Compliance: Map to regulatory notification thresholds — does this trigger mandatory reporting?
- [ ] Legal: Begin legal hold notice to preserve all relevant evidence

### B3 — Containment Expansion (< 2 hours)
- [ ] If systematic PII leakage: shut down AI system entirely pending fix
- [ ] If isolated incident: restrict affected functionality; full investigation
- [ ] Notify affected customer(s) per legal/DPO guidance (may be required before full investigation is complete)

### B4 — Regulatory Notification (if triggered, < 72 hours from detection)
- [ ] Compliance + DPO + Legal prepare breach notification for relevant regulator(s)
- [ ] Notification must include: nature of breach, data affected, number of individuals, likely consequences, measures taken
- [ ] Log notification date and reference in Incident Log

### B5 — Remediation
- [ ] InfoSec + AI/ML: Identify and fix the PII control failure
- [ ] DPO: Run full PRI test suite (PRI-01 to PRI-08) before restoration
- [ ] All PRI tests must pass before re-enabling affected functionality

### B6 — Restore & Monitor
- [ ] AI Risk Officer + DPO written sign-off required
- [ ] Enhanced PII monitoring for 90 days post-restoration
- [ ] Board notification; regulatory follow-up report (if notification was made)

---

## Playbook C — Security Attack / Jailbreak

**Trigger:** Security monitoring detects successful prompt injection or jailbreak, OR red team reports successful bypass of guardrails.

### C1 — Immediate Containment (< 15 minutes)
- [ ] Classify as **P1**
- [ ] Log in AI_Incident_Log.md with: attack vector, what was achieved, conversation ID(s)
- [ ] **Full system shutdown:** FinAssist AI taken offline entirely; fallback activated
- [ ] Notify InfoSec Lead, CISO, AI Risk Officer, Chief AI Officer
- [ ] Preserve all conversation logs and system state for forensic analysis

### C2 — Threat Assessment (< 2 hours)
- [ ] InfoSec: What attack vector was used? Is it novel or known?
- [ ] Scope: How many conversations were affected? Any customer data extracted?
- [ ] Attribution: Is this an isolated test or an active attack campaign?
- [ ] DPO: Was any PII exfiltrated? → Trigger Playbook B in parallel if yes

### C3 — Patch & Harden (variable — must complete before restoration)
- [ ] InfoSec + AI/ML: Develop and test a fix for the specific attack vector
- [ ] Expand input/output filters to cover the attack pattern and variants
- [ ] Add new attack pattern to red team test suite (TS-05) for future exercises
- [ ] Legal: Assess whether attack constitutes a reportable incident (cybercrime laws, banking incident reporting)

### C4 — Pre-Restoration Testing
- [ ] Full TS-05 (security suite) must pass — with the new attack pattern included
- [ ] TS-04 (safety suite) must pass
- [ ] AI Risk Officer + CISO written sign-off required before restart

### C5 — Restore & Intelligence Sharing
- [ ] Phased reinstatement with enhanced security monitoring
- [ ] Share anonymised attack vector with Cloudflare and sector ISAC (if applicable)
- [ ] Board security briefing

---

## Playbook D — Failure to Escalate Distressed Customer

**Trigger:** Confirmed instance of distressed customer not escalated by AI, OR M-16 (missed escalation rate) > 3%.

### D1 — Immediate Response (< 30 minutes)
- [ ] Classify as **P1** if confirmed instance; **P2** if metric breach only
- [ ] Log in AI_Incident_Log.md
- [ ] If confirmed individual case: CS Lead identifies customer; immediate human outreach
- [ ] CS Lead: Brief all agents to be especially attentive to distressed customer signals on escalated conversations today
- [ ] AI Risk Officer notified

### D2 — Customer Welfare (< 1 hour for confirmed cases)
- [ ] Identify the specific customer if possible from conversation logs
- [ ] Assign senior CS agent or supervisor to make proactive contact
- [ ] Assess whether customer requires referral to external support services (financial hardship, wellbeing)
- [ ] Document customer outcome in Incident Log

### D3 — Root Cause Investigation
- [ ] AI/ML: Review conversation — why did sentiment detection / keyword triggers fail?
- [ ] Was this a new distress expression pattern not in the trigger list?
- [ ] Was confidence too high (system thought it had a good answer and didn't check sentiment)?
- [ ] Review M-16 trend: is this isolated or a pattern?

### D4 — Remediation
- [ ] Lower sentiment escalation threshold (accept more false positives to reduce missed escalations)
- [ ] Expand keyword/phrase trigger list with patterns from this incident
- [ ] Increase missed escalation audit sample from 2% to 5% for 30 days
- [ ] Notify AI Ethics Officer; assess whether vulnerable groups are disproportionately affected

### D5 — Restore Normal Monitoring
- [ ] After 30-day enhanced monitoring period, confirm M-16 back within target
- [ ] Document outcome in Incident Log

---

## Playbook E — System Outage

**Trigger:** M-07 (system availability) < 99.5% in rolling 24 hours, OR complete system unavailability.

### E1 — Immediate Activation (< 5 minutes)
- [ ] Classify: total outage = **P1**; degraded availability = **P2**
- [ ] Log in AI_Incident_Log.md
- [ ] **Activate fallback immediately:** static FAQ page + direct to human agent queue
- [ ] Display to customers: *"Our AI assistant is temporarily unavailable. Please wait and a team member will assist you shortly."*
- [ ] CS Lead notified: expect significantly increased human query volume
- [ ] Infrastructure Lead notified

### E2 — Diagnosis (< 30 minutes)
- [ ] Infrastructure: Is this a Cloudflare outage or an internal issue?
- [ ] Check Cloudflare status page; open enterprise support ticket if Cloudflare-side
- [ ] If internal: identify affected component (API, integration, KB, auth)

### E3 — Stakeholder Communication
- [ ] CS Lead: Confirm human agent capacity is adequate; authorize overtime/additional staffing if needed
- [ ] AI Risk Officer: Assess customer impact duration
- [ ] If outage > 2 hours: brief AI Governance Board
- [ ] If outage > 4 hours: assess customer communication (email, app notification)

### E4 — Restoration
- [ ] Fix confirmed before reinstatement
- [ ] Staged restart: test in staging; deploy; monitor for 30 minutes before full traffic
- [ ] AI Risk Officer sign-off
- [ ] Post-incident: review SLA with Cloudflare; assess fallback architecture improvements

---

## Playbook F — Regulatory Inquiry / Examination

**Trigger:** Contact from financial regulator, data protection authority, or law enforcement regarding FinAssist AI.

### F1 — Immediate Response (< 1 hour)
- [ ] Classify as **P1** (all regulatory contact is critical)
- [ ] Log in AI_Incident_Log.md
- [ ] Do NOT respond to regulator without Legal and Compliance involvement
- [ ] Notify immediately: Legal, Compliance, Chief AI Officer, CEO
- [ ] Legal: Review the nature of the inquiry — examination, complaint, investigation, or information request?

### F2 — Preparation (< 24 hours)
- [ ] Compliance + Legal: Assemble required documentation — this document suite covers all NIST AI RMF functions
- [ ] AI Risk Officer: Prepare FinAssist AI overview: MAP report, MEASURE results, MANAGE controls
- [ ] Ensure audit trail is complete and accessible (verify AI_Incident_Log.md is current)
- [ ] Brief executive team on inquiry scope

### F3 — Response
- [ ] All communication through Legal + Compliance (no direct AI team contact with regulator without legal present)
- [ ] Provide requested documentation within regulatory deadline
- [ ] If examination finding: treat as P2 incident; remediation plan within 2 weeks
- [ ] Document all communications with regulator in Incident Log

---

## Playbook G — Bias / Fairness Finding

**Trigger:** Quarterly bias audit (FAI-01–07) confirms significant fairness gap, OR M-12 > 10%.

### G1 — Immediate Response (< 4 hours)
- [ ] Classify as **P2** (fairness gap 10–15%) or **P1** (> 15% gap or confirmed discriminatory impact)
- [ ] Log in AI_Incident_Log.md
- [ ] AI Ethics Officer leads response
- [ ] Notify: AI Risk Officer, Compliance, Chief AI Officer

### G2 — Scope Assessment (< 24 hours)
- [ ] Which query types or demographic proxy groups are affected?
- [ ] What is the practical impact — are affected customers getting worse service or wrong information?
- [ ] Is this a model issue, retrieval issue, or KB content issue?
- [ ] Are any regulatory obligations triggered (e.g., fair treatment of customers)?

### G3 — Containment
- [ ] Restrict affected query categories to human-only routing until bias is remediated
- [ ] Notify CS Lead: specific query types will now always escalate
- [ ] For P1: consider broader scope restriction

### G4 — Remediation (per Bias Testing Methodology §8)
- [ ] Follow the bias remediation decision tree in [MEASURE_Bias_Testing_Methodology.md](./MEASURE_Bias_Testing_Methodology.md)
- [ ] Re-run full FAI test suite after remediation
- [ ] Verify fix does not create new regressions (run TS-01 and TS-02)

### G5 — Stakeholder Communication
- [ ] Internal: Brief AI Governance Board; update AI Ethics Officer quarterly report
- [ ] External (if material): Consider voluntary disclosure to consumer advocacy partners
- [ ] Regulatory: Assess whether this constitutes a reportable fairness/discrimination issue

---

## 11. Incident Log Entry Template

> Open a new entry in [AI_Incident_Log.md](./AI_Incident_Log.md) immediately on detection. Fill in what you know — update as investigation progresses.

```
═══════════════════════════════════════════════
INCIDENT LOG ENTRY
═══════════════════════════════════════════════

Incident ID:            INC-[YYYY]-[XXX]
Detection Date/Time:    YYYY-MM-DD HH:MM (UTC+X)
Logged By:              [Name / Role]
Incident Class:         ⬜ P1  ⬜ P2  ⬜ P3  ⬜ P4 (Near-Miss)
Playbook Activated:     ⬜ A  ⬜ B  ⬜ C  ⬜ D  ⬜ E  ⬜ F  ⬜ G  ⬜ Other

DETECTION
───────────────────────────────────────────────
Detection Source:       [Monitoring alert / Customer complaint / Agent report / Audit / Red team / Regulator]
Detection Description:  [What was observed; what metric/signal triggered detection]
Conversation ID(s):     [If applicable]
Metric(s) Breached:     [M-XX at value X vs. Red Line Y]

INITIAL IMPACT ASSESSMENT
───────────────────────────────────────────────
Customers Potentially Affected:     [Number or 'Unknown']
Customer Harm Confirmed:            ⬜ Yes  ⬜ No  ⬜ Unknown
Nature of Potential Harm:          [Financial / Privacy / CX / Other]
Data Involved:                      ⬜ Yes (PII)  ⬜ No  ⬜ Unknown
Regulatory Notification Triggered: ⬜ Yes  ⬜ No  ⬜ TBD

CONTAINMENT ACTIONS
───────────────────────────────────────────────
Time of Containment:    YYYY-MM-DD HH:MM
Action Taken:           [Restriction / Shutdown / Session isolation / Other]
Fallback Activated:     ⬜ Yes  ⬜ No

NOTIFICATIONS SENT
───────────────────────────────────────────────
[Role]                  [Time]        [Method]
AI Risk Officer         HH:MM         [SMS/Email/Call]
DPO                     HH:MM         [SMS/Email/Call]
[etc.]

ROOT CAUSE ANALYSIS
───────────────────────────────────────────────
Completed By:       [Name]
Date:               YYYY-MM-DD
Root Cause:         [Technical / Process / Systemic]
Description:        [Detailed explanation of what caused the incident]
Contributing Factors: [What made the root cause possible]

CORRECTIVE ACTIONS
───────────────────────────────────────────────
| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
|        |       |          |        |

RESTORATION
───────────────────────────────────────────────
TEVV Re-Run Required:   ⬜ Yes  ⬜ No
TEVV Suites Run:        [TS-XX, TS-XX]
TEVV Result:            ⬜ Pass  ⬜ Fail
Restoration Date/Time:  YYYY-MM-DD HH:MM
Approved By:            [AI Risk Officer name]

CLOSURE
───────────────────────────────────────────────
Incident Status:        ⬜ Open  ⬜ Monitoring  ⬜ Closed
Post-Incident Review:   ⬜ Scheduled  ⬜ Complete  ⬜ Not required
Risk Register Updated:  ⬜ Yes  ⬜ No
Playbook Updated:       ⬜ Yes  ⬜ No
Closed By:              [Name]
Closure Date:           YYYY-MM-DD
```

---

## 12. Post-Incident Review Template

> Complete within 2 weeks of incident resolution for all P1 and P2 incidents.

```
POST-INCIDENT REVIEW (PIR)
═══════════════════════════════════════════════

PIR ID:                 PIR-[INC-YYYY-XXX]
Incident Reference:     INC-[YYYY]-[XXX]
PIR Date:               YYYY-MM-DD
Facilitated By:         AI Risk Officer
Attendees:              [Names and roles]

1. TIMELINE RECONSTRUCTION
───────────────────────────────────────────────
[Detailed, minute-by-minute timeline from detection to resolution]

2. WHAT WENT WELL
───────────────────────────────────────────────
• [Controls that worked as intended]
• [Responses that were fast and effective]
• [Documentation that was useful]

3. WHAT COULD IMPROVE
───────────────────────────────────────────────
• [Detection gaps — should have been caught earlier?]
• [Response gaps — was the playbook clear enough?]
• [Communication gaps — who wasn't notified who should have been?]
• [Documentation gaps — what was missing from the Incident Log?]

4. ACTION ITEMS
───────────────────────────────────────────────
| # | Action | Owner | Due Date |
|---|--------|-------|----------|
| 1 |        |       |          |
| 2 |        |       |          |

5. LESSONS LEARNED
───────────────────────────────────────────────
[Key takeaways to improve future prevention and response]

6. UPDATES TO BE MADE
───────────────────────────────────────────────
⬜ Risk Register updated          Reference: R-XX
⬜ MANAGE Risk Response Plan updated
⬜ This Playbook updated
⬜ TEVV test suite updated         Reference: TS-XX
⬜ MEASURE Metrics Tracker updated Reference: M-XX
⬜ AI Governance Policy updated

Signed: AI Risk Officer ____________  Date: ________
```

---

## 13. Escalation Contact Directory

> **This directory must be maintained current at all times.** Review and update at every quarterly governance review. A printed copy must be accessible to the on-call AI Operations team 24/7.

| Role | Name | Primary Contact | Secondary Contact | Availability |
|---|---|---|---|---|
| **AI Operations On-Call** | [Name] | [Phone] | [Phone] | 24/7 |
| **AI Risk Officer** | [Name] | [Phone] | [Phone] | 24/7 for P1 |
| **AI Project Lead** | [Name] | [Phone] | [Email] | Business hours + P1 24/7 |
| **Chief AI Officer** | [Name] | [Phone] | [Phone] | P1 24/7 |
| **CS Lead** | [Name] | [Phone] | [Email] | Business hours + P1 24/7 |
| **CS Supervisor (On-Duty)** | [Duty Rota] | [Phone] | — | 24/7 |
| **InfoSec Lead** | [Name] | [Phone] | [Phone] | 24/7 for P1 |
| **CISO** | [Name] | [Phone] | [Email] | P1 24/7 |
| **DPO** | [Name] | [Phone] | [Email] | 24/7 for P1 |
| **Compliance / Legal** | [Name] | [Phone] | [Email] | Business hours + P1 24/7 |
| **AI Ethics Officer** | [Name] | [Phone] | [Email] | Business hours + P1 24/7 |
| **TEVV Team Lead** | [Name] | [Phone] | [Email] | Business hours + P1 on-call |
| **Cloudflare Enterprise Support** | — | [Enterprise hotline] | [Support portal URL] | 24/7 |
| **External Cyber Incident Response** | [Firm name] | [Phone] | [Email] | 24/7 (per contract) |
| **Regulator Emergency Line** | [Regulator name] | [Phone] | [Portal URL] | Business hours |

---

## 📎 Cross-References

| Document | Link |
|---|---|
| MANAGE — Risk Response Plan | [MANAGE_Risk_Response_Plan.md](./MANAGE_Risk_Response_Plan.md) |
| AI Incident Log | [AI_Incident_Log.md](./AI_Incident_Log.md) |
| MEASURE — Metrics Tracker | [MEASURE_Metrics_Tracker.csv](./MEASURE_Metrics_Tracker.csv) |
| MEASURE — Bias Testing Methodology | [MEASURE_Bias_Testing_Methodology.md](./MEASURE_Bias_Testing_Methodology.md) |
| AI Governance Policy | [AI_Governance_Policy.md](./AI_Governance_Policy.md) |
| AI Roles Matrix | [AI_Roles_Matrix.md](./AI_Roles_Matrix.md) |

