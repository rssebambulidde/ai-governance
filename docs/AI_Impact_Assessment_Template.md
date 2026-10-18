# 📋 AI Impact Assessment Template
**Framework:** NIST AI RMF 1.0 — GOVERN 4.2 · MAP 3.1 · MAP 3.2 · MAP 5.1 · MAP 5.2  
**Version:** 1.0 | **Status:** Template  
**Owner:** AI Ethics Officer  
**Location:** `docs/AI_Impact_Assessment_Template.md`

---

> [!IMPORTANT]
> An AI Impact Assessment (AIIA) is **mandatory** before deploying any new AI system, and upon significant updates to existing systems. It must be completed by the AI Ethics Officer in collaboration with the AI Project Lead, and signed off before the Go/No-Go deployment decision.

> [!TIP]
> Fill out one copy of this template per AI system. Save the completed version as:
> `AI_Impact_Assessment_[SystemName]_v[X]_[Date].md`

---

## 🗂️ Part 0 — Assessment Header

| Field | Details |
|---|---|
| **Assessment ID** | AIIA-[XXX] |
| **AI System Name** | |
| **AI System ID** | [Matches AI_System_Inventory.csv] |
| **Assessment Version** | v1.0 |
| **Assessment Type** | ⬜ New System · ⬜ Major Update · ⬜ Re-Evaluation of Existing System · ⬜ Post-Incident Review |
| **Assessment Lead** | [Name — AI Ethics Officer] |
| **AI Project Lead** | [Name] |
| **Department / Business Unit** | |
| **Assessment Start Date** | YYYY-MM-DD |
| **Assessment Completion Date** | YYYY-MM-DD |
| **Next Scheduled Review** | YYYY-MM-DD |

---

## 🗺️ Part 1 — AI System Overview *(MAP 1.1, MAP 2.1)*

### 1.1 System Purpose & Description

**What is this AI system designed to do?**
> [Describe the system's core purpose and intended function in plain language]

**What specific AI task(s) does it perform?**
> ⬜ Classification · ⬜ Regression/Prediction · ⬜ Recommendation · ⬜ Generation (text/image/audio) · ⬜ Anomaly Detection · ⬜ Natural Language Processing · ⬜ Computer Vision · ⬜ Decision Support · ⬜ Optimization · ⬜ Other: ___________

**What problem does it solve or what benefit does it provide?**
> [Describe the specific organizational or societal problem being addressed]

**What is the minimum acceptable performance for this system to be useful?**
> [Define minimum performance thresholds]

---

### 1.2 Context of Use *(MAP 1.1)*

| Field | Details |
|---|---|
| **Deployment Environment** | [e.g. Internal operations / Customer-facing / Public-facing / Healthcare / Finance / HR] |
| **Operational Geography** | [Countries / regions where the system will operate] |
| **Scale of Deployment** | [e.g. ~500 internal users / ~10,000 customers / national rollout] |
| **Decision Stakes** | ⬜ Low (informational only) · ⬜ Medium (influences decisions) · ⬜ High (determines significant outcomes) · ⬜ Critical (determines rights, health, safety, livelihoods) |
| **Is a non-AI alternative available?** | ⬜ Yes (describe below) · ⬜ No |
| **Non-AI Alternative Description** | [If yes, why is AI preferred over the alternative?] |

---

### 1.3 Intended Users & Operators

| User / Operator Group | Role | Estimated Number | Technical Literacy |
|---|---|---|---|
| [e.g. HR Managers] | Operator — uses AI outputs to inform decisions | [#] | ⬜ High / ⬜ Medium / ⬜ Low |
| [e.g. Job Applicants] | End user — subject to AI-influenced decisions | [#] | ⬜ High / ⬜ Medium / ⬜ Low |
| [e.g. Customer Service Agents] | Operator | [#] | |
| [e.g. General Public] | Indirect — affected by AI outputs | [#] | |

---

### 1.4 Human-AI Configuration

| Field | Details |
|---|---|
| **Oversight Level** | ⬜ Full Human Control · ⬜ Human-in-the-Loop · ⬜ Human-on-the-Loop · ⬜ Fully Automated |
| **Can humans override the AI output?** | ⬜ Yes — always · ⬜ Yes — under specific conditions · ⬜ No |
| **Override Authority** | [Role Name] |
| **Is AI output clearly labeled as AI-generated?** | ⬜ Yes · ⬜ No · ⬜ Partially |
| **Recourse mechanism for affected parties** | [Describe how users/affected parties can contest AI-driven decisions] |

---

## 🏢 Part 2 — Organizational Mission Alignment *(MAP 1.3, MAP 1.4)*

### 2.1 Mission Alignment

**How does this AI system support the organization's mission and strategic goals?**
> [Explain the alignment]

**Does the system's purpose align with the organization's stated AI principles?**
> ⬜ Yes — fully aligned  
> ⬜ Partially — [describe tension or tradeoff]  
> ⬜ No — [document decision rationale]

**Are there any latent incentives that could lead to misuse or negative impacts?**
> [e.g. Performance bonuses tied to AI-driven decisions could incentivize overriding safeguards]

**Societal Values Alignment Check:**

| Value | Aligned? | Notes |
|---|---|---|
| Fairness & non-discrimination | ⬜ Yes / ⬜ No / ⬜ Uncertain | |
| Privacy and data protection | ⬜ Yes / ⬜ No / ⬜ Uncertain | |
| Human dignity and autonomy | ⬜ Yes / ⬜ No / ⬜ Uncertain | |
| Transparency and accountability | ⬜ Yes / ⬜ No / ⬜ Uncertain | |
| Environmental sustainability | ⬜ Yes / ⬜ No / ⬜ Uncertain | |

---

## ⚖️ Part 3 — Risk Tolerance & Legal Review *(MAP 1.5, GOVERN 1.1)*

### 3.1 Legal & Regulatory Review

| Requirement Area | Applicable? | Law / Regulation | Status |
|---|---|---|---|
| Data privacy (e.g. GDPR) | ⬜ Yes / ⬜ No | | ⬜ Compliant / ⬜ Under Review / ⬜ Gap Identified |
| Anti-discrimination law | ⬜ Yes / ⬜ No | | |
| Sector-specific regulation | ⬜ Yes / ⬜ No | | |
| AI-specific regulation | ⬜ Yes / ⬜ No | | |
| Consumer protection law | ⬜ Yes / ⬜ No | | |
| Procurement / public sector rules | ⬜ Yes / ⬜ No | | |

**Legal Review Completed By:** [Name] — [Date]  
**Legal Review Outcome:** ⬜ Cleared · ⬜ Conditional Clearance · ⬜ Further Review Required

---

### 3.2 Risk Tolerance Statement

**What is the maximum acceptable risk level for this system?**
> ⬜ Low (🟢) only — High-stakes / sensitive system  
> ⬜ Medium (🟡) with controls  
> ⬜ High (🟠) — experimental / sandboxed only

**Are there "off-label" uses of this system that must be explicitly prohibited?**
> [List any use cases explicitly outside the system's intended scope]

---

## 🌟 Part 4 — Potential Benefits *(MAP 3.1)*

### 4.1 Intended Benefits

| Benefit | Beneficiary | How Measured | Confidence Level |
|---|---|---|---|
| [e.g. Faster application processing] | [e.g. HR team, applicants] | [e.g. Processing time reduction %] | ⬜ High / ⬜ Medium / ⬜ Low |
| [e.g. Reduced manual errors] | [e.g. Operations team] | [e.g. Error rate vs. baseline] | |
| [e.g. Improved customer experience] | [e.g. Customers] | [e.g. CSAT score] | |

### 4.2 Equity & Access Benefits
**Does this system make services more accessible or equitable for underserved populations?**
> [Describe any equity benefits or inclusivity improvements]

### 4.3 Evidence Base
**What evidence supports the claimed benefits?**
> ⬜ Peer-reviewed research  
> ⬜ Internal pilot study  
> ⬜ Vendor-provided benchmarks  
> ⬜ Comparison to human performance baseline  
> ⬜ Other: ___________

**Limitations of evidence:**
> [Note any gaps, uncertainties, or biases in the evidence base]

---

## ⚠️ Part 5 — Potential Harms & Risks *(MAP 3.2, MAP 5.1)*

### 5.1 Harm Identification

For each potential harm, work through the four questions:

| # | Harm Description | Who could be harmed? | What could be harmed? | When could harm arise? | How could harm arise? |
|---|---|---|---|---|---|
| H-01 | [e.g. Biased hiring recommendations] | Job applicants from minority groups | Livelihood, equal opportunity | At deployment / during use | Biased training data reflecting historical discrimination |
| H-02 | | | | | |
| H-03 | | | | | |
| H-04 | | | | | |
| H-05 | | | | | |

---

### 5.2 Risk Assessment Matrix

For each harm identified above:

| Harm ID | Harm Description | Trustworthiness Dimension | Likelihood (1–5) | Impact (1–5) | Risk Score (L×I) | Risk Level | Existing Controls |
|---|---|---|---|---|---|---|---|
| H-01 | [Biased hiring recommendations] | Fairness & Bias | 3 | 5 | 15 | 🔴 Critical | [e.g. Bias audit planned] |
| H-02 | | Safety | | | | | |
| H-03 | | Privacy | | | | | |
| H-04 | | Security | | | | | |
| H-05 | | Reliability | | | | | |
| H-06 | | Transparency | | | | | |
| H-07 | | Societal | | | | | |

**Likelihood Scale:** 1=Rare · 2=Unlikely · 3=Possible · 4=Likely · 5=Almost Certain  
**Impact Scale:** 1=Negligible · 2=Minor · 3=Moderate · 4=Major · 5=Catastrophic  
**Risk Score:** 1–6=🟢Low · 7–12=🟡Medium · 13–19=🟠High · 20–25=🔴Critical

---

### 5.3 Cumulative & Societal Risks

**Could this system create systemic risks when deployed at scale?**
> [e.g. If widely adopted, could this AI reinforce societal inequalities across a population?]

**Are there risks related to the system's interaction with other AI systems?**
> [Document any dependencies on, or interactions with, other AI systems]

**Are there risks related to post-decommissioning?**
> [e.g. Historical AI outputs continuing to affect individuals after system shutdown]

---

## 🛡️ Part 6 — Risk Mitigation Plan *(MANAGE 1.3)*

For each harm rated 🟡 Medium or above, define a mitigation:

| Harm ID | Risk Level | Response Type | Mitigation Action | Owner | Target Date | Residual Risk After Mitigation |
|---|---|---|---|---|---|---|
| H-01 | 🔴 Critical | Mitigate | Conduct bias audit on training data; re-sample for demographic balance | Data Engineer | YYYY-MM-DD | 🟡 Medium |
| H-02 | 🟠 High | Mitigate | | | | |
| H-03 | 🟡 Medium | Accept | [Document acceptance rationale] | | | 🟡 Medium |

**Response Types:** Mitigate · Transfer (insurance/contract) · Avoid (don't deploy) · Accept (document rationale)

**Accepted Residual Risks:**

| Harm ID | Residual Risk Level | Acceptance Rationale | Accepted By | Date |
|---|---|---|---|---|
| H-03 | 🟡 Medium | [Justify why this level of residual risk is acceptable] | [Name, Role] | YYYY-MM-DD |

---

## 👥 Part 7 — Stakeholder Engagement *(MAP 5.2, GOVERN 5.1)*

### 7.1 Stakeholder Identification

| Stakeholder Group | Type | Engagement Method | Engagement Date | Key Feedback Received |
|---|---|---|---|---|
| [e.g. HR Managers] | Internal operator | Workshop | YYYY-MM-DD | [Summary] |
| [e.g. Job applicant representatives] | External affected community | Focus group | YYYY-MM-DD | |
| [e.g. Disability advocacy group] | External marginalized community | Consultation | YYYY-MM-DD | |
| [e.g. Legal experts] | External domain expert | Interview | YYYY-MM-DD | |
| [e.g. Data scientists (independent)] | External TEVV | Red-team exercise | YYYY-MM-DD | |

### 7.2 Engagement Quality Check

| Criterion | Met? | Notes |
|---|---|---|
| Historically excluded populations included | ⬜ Yes / ⬜ No | |
| Persons with disabilities consulted | ⬜ Yes / ⬜ No | |
| Engagement was meaningful (not "participation washing") | ⬜ Yes / ⬜ No | |
| Feedback was documented and addressed | ⬜ Yes / ⬜ No | |
| Feedback influenced design or risk controls | ⬜ Yes / ⬜ No | |

---

## 📏 Part 8 — TEVV Summary *(MAP 2.3, MEASURE 1.1)*

### 8.1 Testing Overview

| TEVV Activity | Completed? | Date | Conducted By | Key Findings |
|---|---|---|---|---|
| Performance testing (accuracy, precision, recall) | ⬜ Yes / ⬜ No | | | |
| Bias & fairness audit (disaggregated) | ⬜ Yes / ⬜ No | | | |
| Security & adversarial testing | ⬜ Yes / ⬜ No | | | |
| Privacy impact assessment | ⬜ Yes / ⬜ No | | | |
| Explainability / interpretability review | ⬜ Yes / ⬜ No | | | |
| Human-AI configuration testing | ⬜ Yes / ⬜ No | | | |
| Independent external validation | ⬜ Yes / ⬜ No | | | |
| Red-team exercise | ⬜ Yes / ⬜ No | | | |

### 8.2 Key Performance Metrics

| Metric | Threshold | Actual Result | Pass / Fail |
|---|---|---|---|
| [e.g. Overall accuracy] | ≥ 90% | | ⬜ Pass / ⬜ Fail |
| [e.g. False positive rate (Group A)] | ≤ 5% | | |
| [e.g. False positive rate (Group B)] | ≤ 5% | | |
| [e.g. Demographic parity difference] | ≤ 0.05 | | |
| [e.g. Adversarial robustness score] | ≥ 80% | | |

**TEVV Report Reference:** [Link to full TEVV Report]  
**Independent Validator:** [Name / Organization]

---

## ✅ Part 9 — Go/No-Go Recommendation *(MANAGE 1.1)*

### 9.1 Summary of Findings

| Area | Assessment |
|---|---|
| **Legal & Regulatory Compliance** | ✅ Clear / ⚠️ Conditional / ❌ Non-Compliant |
| **Mission & Values Alignment** | ✅ Aligned / ⚠️ Tensions Identified / ❌ Misaligned |
| **Net Benefit vs. Risk** | ✅ Benefits outweigh risks / ⚠️ Marginal / ❌ Risks outweigh benefits |
| **Residual Risk Level** | 🟢 Low / 🟡 Medium / 🟠 High / 🔴 Critical |
| **TEVV Passed** | ✅ Yes / ⚠️ Conditional / ❌ No |
| **Stakeholder Engagement Completed** | ✅ Yes / ⚠️ Partial / ❌ No |

### 9.2 Recommendation

> ⬜ **✅ GO** — Approve deployment with the following conditions:  
> [List any conditions or required mitigations before or after deployment]

> ⬜ **⚠️ CONDITIONAL GO** — Approve deployment only after:  
> [List specific requirements that must be met first]

> ⬜ **❌ NO-GO** — Do not deploy. Reasons:  
> [Explain why deployment is not recommended at this time]

**Recommendation Prepared By:** [AI Ethics Officer Name] — [Date]

---

## ✍️ Part 10 — Sign-Off & Approval

| Role | Name | Decision | Conditions / Notes | Date | Signature |
|---|---|---|---|---|---|
| **AI Ethics Officer** | | ✅ Approved / ❌ Rejected | | | |
| **AI Risk Officer** | | ✅ Approved / ❌ Rejected | | | |
| **AI Project Lead** | | ✅ Acknowledged | | | |
| **Legal & Compliance** | | ✅ Cleared / ⚠️ Conditional | | | |
| **Approving Executive** | | ✅ Approved / ❌ Rejected | | | |

---

## 📎 Related Documents

| Document | Location |
|---|---|
| AI Governance Policy | `docs/AI_Governance_Policy.md` |
| AI System Inventory | `docs/AI_System_Inventory.csv` |
| AI Roles & Responsibilities Matrix | `docs/AI_Roles_Matrix.md` |
| AI Incident Log | `docs/AI_Incident_Log.md` |
| NIST AI RMF Playbook Study Notes | `docs/NIST_AI_RMF_Playbook_Study_Notes.md` |

---

*Based on NIST AI RMF 1.0 — GOVERN 4.2 · MAP 1.1 · MAP 1.3–1.5 · MAP 3.1–3.2 · MAP 5.1–5.2 · MANAGE 1.1–1.3 | NIST AI RMF Playbook*
