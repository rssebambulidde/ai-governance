# 🚨 AI Incident Log
**Framework:** NIST AI RMF 1.0 — GOVERN 4.3 · MANAGE 4.3  
**Version:** 1.0 | **Status:** Active | **Date Started:** 2024  
**Owner:** AI Risk Officer  
**Location:** `docs/04_manage/AI_Incident_Log.md`

---

> [!IMPORTANT]
> This log must be updated within the timeframes specified in the AI Governance Policy:
> - 🔴 **Critical** → Within 2 hours
> - 🟠 **High** → Within 24 hours
> - 🟡 **Medium** → Within 5 business days
> - 🟢 **Low** → Monthly summary

---

## 📋 Incident Log Index

| Incident ID | Date | AI System | Severity | Status | Summary |
|---|---|---|---|---|---|
| INC-001 | YYYY-MM-DD | [System Name] | 🔴 Critical | ✅ Resolved / 🔄 Open / ⚠️ Under Review | [One-line summary] |
| INC-002 | | | | | |
| INC-003 | | | | | |

---

## 📝 Incident Report Template

> *Copy this block for each new incident. Replace the ID (INC-XXX) sequentially.*

---

### INC-001 — [Short Incident Title]

#### 1. Incident Identification

| Field | Details |
|---|---|
| **Incident ID** | INC-001 |
| **Date & Time Detected** | YYYY-MM-DD HH:MM (UTC+X) |
| **Date & Time Reported** | YYYY-MM-DD HH:MM |
| **Reported By** | [Name, Role] |
| **AI System Affected** | [System Name — matches AI_System_Inventory.csv ID] |
| **System Risk Level** | 🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low |
| **Incident Severity** | 🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low |
| **Incident Type** | ⬜ Performance Failure · ⬜ Bias/Fairness · ⬜ Security/Adversarial · ⬜ Privacy Breach · ⬜ Unexpected Behavior · ⬜ Near-Miss · ⬜ User Complaint · ⬜ Other |

---

#### 2. Incident Description

**What happened?**
> [Describe the incident in plain language. Include what the AI system did or failed to do.]

**How was it detected?**
> ⬜ Automated monitoring alert  
> ⬜ Operator observation  
> ⬜ User/stakeholder complaint  
> ⬜ External report / media  
> ⬜ Red-team / audit  
> ⬜ Other: ___________

**AI system output(s) involved:**
> [Describe the specific outputs, predictions, decisions, or behaviors that triggered or constitute the incident.]

**Number of affected users / records:**
> [Estimate or exact count if known]

**Affected populations / groups:**
> [Describe any demographic groups, communities, or individuals disproportionately affected]

---

#### 3. Immediate Impact Assessment

| Impact Dimension | Affected? | Description |
|---|---|---|
| **Physical Safety** | Yes / No | |
| **Psychological Harm** | Yes / No | |
| **Financial Loss** | Yes / No | |
| **Privacy Violation** | Yes / No | |
| **Discrimination / Bias** | Yes / No | |
| **Reputational Damage** | Yes / No | |
| **Regulatory / Legal Exposure** | Yes / No | |
| **Operational Disruption** | Yes / No | |

**Overall Impact Severity Justification:**
> [Explain the severity rating assigned above]

---

#### 4. Escalation & Notification

| Action | Person Notified | Date & Time | Method |
|---|---|---|---|
| AI Risk Officer notified | [Name] | YYYY-MM-DD HH:MM | Email / Call / Slack |
| CAIO notified | [Name] | YYYY-MM-DD HH:MM | |
| CEO notified (Critical only) | [Name] | YYYY-MM-DD HH:MM | |
| Board notified (Critical only) | [Name] | YYYY-MM-DD HH:MM | |
| Legal & Compliance notified | [Name] | YYYY-MM-DD HH:MM | |
| Affected users notified | Bulk notification | YYYY-MM-DD | |
| Regulator notified (if required) | [Body name] | YYYY-MM-DD | |

**Was the AI system suspended during investigation?**
> ⬜ Yes — Date suspended: ___________  
> ⬜ No — Justification: ___________  
> ⬜ Partially restricted — Details: ___________

---

#### 5. Root Cause Analysis

**Investigation Lead:** [Name, Role]  
**Investigation Period:** YYYY-MM-DD to YYYY-MM-DD

**Root Cause Category:**
> ⬜ Data quality / representativeness issue  
> ⬜ Model bias or underspecification  
> ⬜ Concept drift / distribution shift  
> ⬜ Adversarial attack / security breach  
> ⬜ Inadequate TEVV / testing gap  
> ⬜ Human-AI configuration failure  
> ⬜ Third-party component failure  
> ⬜ Scope / context-of-use violation ("off-label" use)  
> ⬜ Documentation / governance gap  
> ⬜ Unknown / under investigation  
> ⬜ Other: ___________

**Detailed Root Cause Description:**
> [Describe the technical and/or socio-technical root cause in detail.]

**Contributing Factors:**
> [List any secondary factors that contributed to the incident.]

**Was this a previously identified risk?**
> ⬜ Yes — Referenced in Risk Assessment: [document link]  
> ⬜ No — This was an unanticipated risk  
> ⬜ Partially — [Explain]

---

#### 6. Response & Mitigation Actions

| Action | Owner | Target Date | Completion Date | Status |
|---|---|---|---|---|
| [e.g. Suspend AI system output] | [Name] | YYYY-MM-DD | YYYY-MM-DD | ✅ Done / 🔄 In Progress / ⏳ Planned |
| [e.g. Retrain model on corrected data] | [Name] | | | |
| [e.g. Update monitoring thresholds] | [Name] | | | |
| [e.g. Notify affected users] | [Name] | | | |
| [e.g. Patch third-party component] | [Name] | | | |
| [e.g. Conduct bias audit] | [Name] | | | |

**Was the risk response type:**
> ⬜ Mitigate (reduce likelihood or impact)  
> ⬜ Transfer (insurance / contract)  
> ⬜ Avoid (remove system from use)  
> ⬜ Accept (with documented justification)

---

#### 7. System Redeployment Decision

| Field | Details |
|---|---|
| **System Redeployed?** | ⬜ Yes / ⬜ No / ⬜ Partially / ⬜ Decommissioned |
| **Redeployment Date** | YYYY-MM-DD |
| **Approving Authority** | [Name, Role] |
| **Conditions for Redeployment** | [Describe any constraints or changes required before redeployment] |
| **Updated Risk Level Post-Incident** | 🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low |

---

#### 8. Lessons Learned & Policy Updates

**Lessons Learned:**
> [What did this incident reveal about gaps in governance, TEVV, monitoring, or design?]

**Policy / Process Changes Triggered:**
| Change | Document Updated | Owner | Date |
|---|---|---|---|
| [e.g. Update TEVV protocol for X] | [AI_Governance_Policy.md] | [Name] | YYYY-MM-DD |
| | | | |

**Shared Externally?**
> ⬜ Shared with AI Incident Database (AIID): [Date]  
> ⬜ Shared with AIAAIC Repository: [Date]  
> ⬜ Shared with sector regulator: [Date]  
> ⬜ Not shared — Justification: ___________

---

#### 9. Incident Closure

| Field | Details |
|---|---|
| **Closure Date** | YYYY-MM-DD |
| **Closed By** | [Name, Role] |
| **Final Status** | ✅ Resolved / ⚠️ Accepted with residual risk / ❌ System decommissioned |
| **Final Incident Report Approved By** | [Name, Role] — [Date] |

---

---

## 📊 Monthly Near-Miss & Low Severity Summary

> *Low-severity incidents and near-misses are summarized monthly rather than reported individually.*

### [Month YYYY] Summary

| # | Date | AI System | Issue Description | Action Taken | Reported By |
|---|---|---|---|---|---|
| 1 | YYYY-MM-DD | [System] | [Brief description] | [Action] | [Name] |
| 2 | | | | | |

**Monthly Summary Approved By:** [AI Risk Officer Name] — [Date]

---

## 📈 Incident Trend Tracker

> *Updated quarterly by the AI Risk Officer*

| Quarter | Total Incidents | 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low | Near-Misses | Avg. Resolution Time |
|---|---|---|---|---|---|---|---|
| Q1 YYYY | | | | | | | |
| Q2 YYYY | | | | | | | |
| Q3 YYYY | | | | | | | |
| Q4 YYYY | | | | | | | |

---

## 📎 Related Documents

| Document | Location |
|---|---|
| AI Governance Policy | `docs/AI_Governance_Policy.md` |
| AI System Inventory | `docs/AI_System_Inventory.csv` |
| AI Roles & Responsibilities Matrix | `docs/AI_Roles_Matrix.md` |
| AI Impact Assessment Template | `docs/AI_Impact_Assessment_Template.md` |

---

*Based on NIST AI RMF 1.0 — GOVERN 4.3, MANAGE 4.1, MANAGE 4.3 | NIST AI RMF Playbook*
