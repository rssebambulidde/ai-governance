# 👥 AI Roles & Responsibilities Matrix
**Framework:** NIST AI RMF 1.0 — GOVERN Function (2.1, 2.2, 2.3, 3.2)  
**Version:** 1.0 | **Status:** Draft | **Date:** 2024  
**Owner:** Chief AI Officer / AI Governance Committee

---

> [!NOTE]
> This matrix defines who is responsible for each AI governance and lifecycle activity. It should be read alongside the **AI Governance Policy** and **AI System Inventory**.
> 
> **Key:** R = Responsible | A = Accountable | C = Consulted | I = Informed

---

## 🗂️ Section 1 — Role Descriptions

### 1.1 Governance & Leadership Roles

| Role | Description | Reports To |
|---|---|---|
| **AI Governance Committee** | Cross-functional senior body that sets AI policy, reviews risk posture, approves high-risk deployments, and receives escalations | Board of Directors |
| **Chief AI Officer (CAIO)** | Organization-wide accountability for AI strategy, governance, and risk management | CEO |
| **AI Risk Officer** | Identifies, assesses, tracks, and reports AI risks across the organization's AI portfolio | CAIO |
| **AI Ethics Officer** | Oversees fairness, transparency, societal impact, and stakeholder engagement for AI systems | CAIO |
| **Legal & Compliance Officer** | Ensures AI systems meet legal, regulatory, and contractual obligations | General Counsel |
| **Data Protection Officer (DPO)** | Oversees data privacy, data governance, and regulatory data compliance for AI | Legal / CAIO |

---

### 1.2 Project-Level Roles

| Role | Description | Reports To |
|---|---|---|
| **AI Project Lead** | Day-to-day accountability for a specific AI project; coordinates team, timeline, and documentation | CAIO / Dept. Head |
| **AI/ML Engineer** | Designs, builds, and maintains AI models and systems | AI Project Lead |
| **Data Engineer / Scientist** | Manages data pipelines, quality, labeling, and dataset governance | AI Project Lead |
| **Human-AI Interaction (HAII) Specialist** | Designs and evaluates human-AI interfaces; defines oversight configurations | AI Project Lead |
| **TEVV Team Lead** | Leads independent Testing, Evaluation, Validation & Verification activities | AI Risk Officer |
| **TEVV Analyst** | Conducts testing, bias audits, adversarial testing, and performance validation | TEVV Team Lead |

---

### 1.3 Operational Roles

| Role | Description | Reports To |
|---|---|---|
| **AI System Operator** | Runs, monitors, and maintains a deployed AI system in day-to-day operations | Operations Manager |
| **AI Inventory Manager** | Maintains the organization's AI System Inventory; ensures it is current and accurate | AI Risk Officer |
| **Incident Response Lead** | Coordinates response to AI incidents, near-misses, and security events | AI Risk Officer |
| **Communications Lead** | Manages internal and external communications about AI activities and incidents | CAIO / Comms Dept. |

---

### 1.4 External / Advisory Roles

| Role | Description |
|---|---|
| **External Auditor** | Independent third-party that validates AI governance and TEVV effectiveness (3rd Line of Defense) |
| **Community / Stakeholder Representative** | Representative of affected external communities consulted during impact assessments |
| **Domain Expert** | Subject matter expert (e.g., healthcare, law, finance) engaged for context-specific AI risk assessment |
| **Red Team** | Independent adversarial testing team; must be separate from the AI development team |

---

## 📊 Section 2 — RACI Matrix by Activity

### 2.1 Governance & Policy Activities *(GOVERN 1.x, 2.x)*

| Activity | AI Gov. Committee | CAIO | AI Risk Officer | AI Ethics Officer | Legal & Compliance | DPO |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Approve AI Governance Policy | **A** | R | C | C | C | C |
| Set organizational risk tolerances | **A** | R | C | C | C | I |
| Approve high-risk AI deployments | **A** | R | C | C | C | I |
| Maintain AI documentation standards | I | A | R | C | C | I |
| Oversee AI System Inventory | I | A | R | I | I | I |
| Report AI risk posture to Board | I | **R/A** | C | I | I | I |
| Conduct annual policy review | **A** | R | C | C | C | C |
| Establish decommissioning policies | I | A | R | C | C | I |

---

### 2.2 AI Project Lifecycle Activities *(MAP + MEASURE + MANAGE)*

| Activity | AI Project Lead | ML Engineer | Data Engineer | HAII Specialist | TEVV Team | AI Risk Officer | AI Ethics Officer | Legal |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Define AI system purpose & scope | **A** | R | C | C | I | C | C | C |
| Conduct context mapping (MAP 1.1) | **A** | R | C | R | I | C | C | I |
| Identify stakeholder groups | A | I | I | R | I | C | R | I |
| Elicit system requirements (MAP 1.6) | **A** | R | C | R | I | C | C | C |
| Define AI task type (MAP 2.1) | **A** | R | I | I | I | I | I | I |
| Collect and prepare training data | A | C | **R** | I | I | C | C | C |
| Develop/train AI model | A | **R** | C | I | I | I | I | I |
| Design human-AI configuration | A | C | I | **R** | I | C | C | I |
| Conduct TEVV (independent) | I | I | I | I | **R/A** | C | C | I |
| Conduct bias & fairness audit | I | C | C | I | **R** | A | C | I |
| Conduct security assessment | I | C | I | I | **R** | A | I | I |
| Complete AI Impact Assessment | A | C | C | C | C | C | **R** | C |
| Make Go/No-Go deployment decision | I | I | I | I | C | R | C | C |
| Sign off on deployment | **A(Exec)** | I | I | I | I | R | C | C |

---

### 2.3 Deployment & Monitoring Activities *(MANAGE 4.x)*

| Activity | AI System Operator | AI Project Lead | TEVV Team | AI Risk Officer | AI Inventory Manager | Incident Response Lead |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Execute post-deployment monitoring plan | **R** | A | I | C | I | I |
| Monitor performance metrics daily | **R** | I | I | C | I | I |
| Detect and flag performance anomalies | **R** | C | I | A | I | I |
| Manage user feedback channel | **R** | A | I | C | I | I |
| Conduct red-teaming post-deployment | I | I | **R** | A | I | I |
| Update AI System Inventory record | I | C | I | I | **R/A** | I |
| Conduct quarterly performance review | C | R | C | **A** | I | I |
| Trigger emergency review (if needed) | R | C | C | **A** | I | I |

---

### 2.4 Incident Response Activities *(GOVERN 4.3, MANAGE 4.3)*

| Activity | Incident Response Lead | AI Risk Officer | CAIO | Legal | Communications Lead | AI Gov. Committee | Operations |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Detect and log AI incident | C | C | I | I | I | I | **R** |
| Classify incident severity | C | **R** | I | C | I | I | C |
| Escalate critical incidents | R | **A** | R | C | I | I | I |
| Conduct root cause analysis | **R** | A | I | C | I | I | C |
| Implement immediate mitigation | **R** | A | I | I | I | I | R |
| Notify affected users/stakeholders | C | C | A | C | **R** | I | I |
| Report to regulators (if required) | I | C | A | **R** | C | I | I |
| Document incident in incident log | **R** | A | I | I | I | I | I |
| Share with AI Incident Database | C | **R** | A | C | I | I | I |
| Post-incident policy review | C | R | A | C | I | **C** | I |

---

### 2.5 Decommissioning Activities *(GOVERN 1.7, MANAGE 2.4)*

| Activity | AI Project Lead | AI Risk Officer | AI Inventory Manager | Data Officer / DPO | Legal | Communications Lead | Operations |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Identify decommissioning trigger | C | **R** | I | I | I | I | C |
| Document decommissioning decision | **A** | R | I | I | C | I | I |
| Notify all affected stakeholders | C | C | I | I | I | **R** | C |
| Assess downstream dependencies | **R** | A | I | C | I | I | C |
| Archive or delete data (per policy) | C | C | I | **R/A** | C | I | R |
| Preserve system for legal review | I | A | I | C | **R** | I | R |
| Update AI System Inventory | C | C | **R/A** | I | I | I | I |
| Conduct post-decommission review | **R** | A | I | I | I | I | I |

---

### 2.6 Third-Party AI Management *(GOVERN 6.1, 6.2)*

| Activity | AI Project Lead | AI Risk Officer | Legal | DPO | TEVV Team | AI Gov. Committee |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Identify third-party AI components | **R** | A | C | I | I | I |
| Conduct third-party due diligence | C | **R** | C | C | C | I |
| Review vendor contracts for AI clauses | C | C | **R** | C | I | I |
| Assess third-party privacy risks | C | C | C | **R** | I | I |
| Apply org risk tolerance to third parties | C | **R** | I | I | I | A |
| Test and validate third-party AI systems | I | C | I | I | **R** | I |
| Maintain contingency plan for third parties | A | **R** | C | I | I | I |
| Annual third-party risk review | A | **R** | C | C | C | I |

---

## 📋 Section 3 — Human-AI Configuration Register

> *For each deployed AI system, document the human oversight configuration here. Reference: GOVERN 3.2*

| AI System ID | System Name | Configuration Level | Human Role in Output | Override Authority | Mandatory Human Review |
|---|---|---|---|---|---|
| AI-001 | [System Name] | ⬜ Full Human Control / ⬜ Human-in-the-Loop / ⬜ Human-on-the-Loop / ⬜ Fully Automated | [e.g. Human reviews all outputs before action] | [Role Name] | [Yes / No — if Yes, describe condition] |
| AI-002 | | | | | |
| AI-003 | | | | | |

**Configuration Level Definitions:**

| Level | Description | Typical Use |
|---|---|---|
| **Full Human Control** | AI provides information only; human makes all decisions | Research / advisory tools |
| **Human-in-the-Loop** | Human must review and approve AI output before any action | High-stakes decisions (HR, credit, medical) |
| **Human-on-the-Loop** | AI acts autonomously; human monitors and can intervene | Operational automation with oversight |
| **Fully Automated** | AI acts without human involvement | Low-risk, well-bounded tasks only |

---

## 📋 Section 4 — Training Completion Tracker

> *Track mandatory AI governance training per role. Reference: GOVERN 2.2*

| Staff Name | Role | AI Basics & Ethics | NIST AI RMF Overview | Bias & Fairness | AI Security & Privacy | Incident Response | Governance Policy | Last Updated |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|---|
| [Name] | [Role] | ⬜ / ✅ [Date] | ⬜ / ✅ [Date] | ⬜ / ✅ [Date] | ⬜ / ✅ [Date] | ⬜ / ✅ [Date] | ⬜ / ✅ [Date] | [Date] |

---

## 📋 Section 5 — Accountability Sign-Off Log

> *Every AI system deployment shall be formally signed off. Reference: GOVERN 2.3*

| AI System ID | System Name | Approving Authority | Role | Decision | Rationale Summary | Date | Signature |
|---|---|---|---|---|---|---|---|
| AI-001 | [System Name] | [Name] | [Role] | ✅ Approved / ❌ Rejected / ⚠️ Conditional | [Brief rationale] | [Date] | |
| AI-002 | | | | | | | |

---

## 📎 Related Documents

| Document | Location |
|---|---|
| AI Governance Policy | `docs/AI_Governance_Policy.md` |
| AI System Inventory | `docs/AI_System_Inventory.csv` |
| NIST AI RMF Playbook Study Notes | `docs/NIST_AI_RMF_Playbook_Study_Notes.md` |

---

*Based on NIST AI RMF 1.0 — GOVERN Subcategories 2.1, 2.2, 2.3, 3.2 | NIST AI RMF Playbook*
