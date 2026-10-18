# 👥 Stakeholder Analysis & Engagement Plan
**Framework:** NIST AI RMF 1.0 — MAP 1.2 · MAP 5.2 · GOVERN 5.1 · GOVERN 5.2  
**Version:** 1.0 | **Status:** Active  
**Date:** 2024  
**AI System:** FinAssist AI (Customer Support Chatbot) — AI-001  
**Owner:** AI Ethics Officer  
**Location:** `docs/MAP_Stakeholder_Analysis.md`

---

> [!IMPORTANT]
> Stakeholder identification and engagement is not a one-time activity. Per NIST AI RMF MAP 5.2, stakeholders must be engaged **continuously throughout the AI lifecycle** — from pre-development through deployment, monitoring, and decommissioning.

---

## 📋 Table of Contents

1. [Stakeholder Identification](#1-stakeholder-identification)
2. [Stakeholder Power-Interest Grid](#2-stakeholder-power-interest-grid)
3. [Detailed Stakeholder Profiles](#3-detailed-stakeholder-profiles)
4. [Engagement Plan](#4-engagement-plan)
5. [Feedback Mechanisms](#5-feedback-mechanisms)
6. [Vulnerable & Underserved Groups](#6-vulnerable--underserved-groups)
7. [Engagement Log](#7-engagement-log)

---

## 1. Stakeholder Identification

### 1.1 Stakeholder Categories

| Category | Definition | Stakeholders |
|---|---|---|
| **Directly Affected** | Individuals whose outcomes are influenced by the AI system | Retail banking customers, vulnerable customers, non-English-speaking customers |
| **Operators** | People who interact with or manage the AI system during operations | Customer service agents (Tier 1), customer service supervisors, AI operations team |
| **Developers** | People who design, build, and maintain the AI system | AI/ML engineers, data engineers, UX designers, QA/TEVV team |
| **Decision Makers** | People with authority over the AI system's lifecycle | Chief AI Officer, AI Governance Board, business unit heads |
| **Internal Oversight** | Functions responsible for compliance, risk, and ethics | Compliance/Legal, Data Privacy Officer, Information Security, AI Ethics Officer, AI Risk Officer |
| **External Oversight** | External bodies with regulatory or supervisory authority | Central Bank/Financial Regulator, Data Protection Authority |
| **External Parties** | Organizations or groups with indirect interest | Consumer advocacy groups, industry peers, academic researchers, media |
| **Third-Party Providers** | Vendors whose products/services are embedded in the AI system | Cloudflare (Workers AI, AI Search), model providers |

---

### 1.2 Stakeholder Register

| ID | Stakeholder | Category | Contact / Owner | Priority |
|---|---|---|---|---|
| S-01 | Retail Banking Customers | Directly Affected | Customer Service Lead | 🔴 Critical |
| S-02 | Vulnerable Customers (elderly, disabled, low literacy) | Directly Affected | AI Ethics Officer | 🔴 Critical |
| S-03 | Non-English-Speaking Customers | Directly Affected | AI Ethics Officer | 🔶 High |
| S-04 | Customer Service Agents (Tier 1) | Operator | Customer Service Lead | 🔶 High |
| S-05 | Customer Service Supervisors | Operator | Customer Service Lead | 🔶 High |
| S-06 | AI Operations Team | Operator | AI Project Lead | 🟡 Medium |
| S-07 | AI/ML Engineering Team | Developer | AI Project Lead | 🟡 Medium |
| S-08 | UX / Product Design Team | Developer | Product Manager | 🟡 Medium |
| S-09 | TEVV Team | Developer | TEVV Team Lead | 🟡 Medium |
| S-10 | Chief AI Officer / AI Governance Board | Decision Maker | Chief AI Officer | 🔴 Critical |
| S-11 | Business Unit Head (Retail Banking) | Decision Maker | Business Unit Head | 🔶 High |
| S-12 | Compliance / Legal Department | Internal Oversight | Head of Compliance | 🔴 Critical |
| S-13 | Data Privacy Officer (DPO) | Internal Oversight | DPO | 🔴 Critical |
| S-14 | Information Security Team | Internal Oversight | CISO | 🔶 High |
| S-15 | AI Risk Officer | Internal Oversight | AI Risk Officer | 🔴 Critical |
| S-16 | AI Ethics Officer | Internal Oversight | AI Ethics Officer | 🔴 Critical |
| S-17 | Central Bank / Financial Regulator | External Oversight | Compliance / Legal | 🔴 Critical |
| S-18 | Data Protection Authority | External Oversight | DPO | 🔶 High |
| S-19 | Consumer Advocacy Groups | External Party | AI Ethics Officer | 🟡 Medium |
| S-20 | Cloudflare (AI Provider) | Third-Party Provider | AI Project Lead / Procurement | 🔶 High |

---

## 2. Stakeholder Power-Interest Grid

```
                        HIGH INTEREST
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
         │   KEEP SATISFIED │  MANAGE CLOSELY  │
         │                  │                  │
         │  S-11 (BU Head)  │ S-01 (Customers) │
         │  S-14 (InfoSec)  │ S-02 (Vulnerable)│
         │  S-18 (DPA)      │ S-10 (CAO/Board) │
         │  S-20 (Cloudflare│ S-12 (Compliance)│
   HIGH  │                  │ S-13 (DPO)       │
  POWER  │                  │ S-15 (Risk Offcr)│
         │                  │ S-16 (Ethics)    │
         │                  │ S-17 (Regulator) │
         ├──────────────────┼──────────────────┤
         │                  │                  │
         │     MONITOR      │  KEEP INFORMED   │
         │                  │                  │
         │  S-19 (Advocacy) │ S-03 (Non-Eng.)  │
         │                  │ S-04 (Agents)    │
   LOW   │                  │ S-05 (Supervisors│
  POWER  │                  │ S-06 (AI Ops)    │
         │                  │ S-07 (ML Eng.)   │
         │                  │ S-08 (UX/Product)│
         │                  │ S-09 (TEVV)      │
         │                  │                  │
         └──────────────────┴──────────────────┘
                        LOW INTEREST
```

---

## 3. Detailed Stakeholder Profiles

### S-01: Retail Banking Customers

| Attribute | Details |
|---|---|
| **Who** | Individual account holders using digital banking channels |
| **Estimated Population** | Phase 1: ~50,000 monthly active users; Phase 2: ~200,000+ |
| **Key Concerns** | Accuracy of information; ability to reach a human; privacy of conversations; not being misled; accessibility |
| **Impact if Unaddressed** | Customer churn, complaints, reputational damage, regulatory action |
| **Engagement Methods** | In-chat feedback, post-interaction surveys, pilot focus groups |
| **Success Criteria** | CSAT ≥ [target]; complaint rate ≤ [threshold]; NPS improvement |

### S-02: Vulnerable Customers

| Attribute | Details |
|---|---|
| **Who** | Elderly customers, customers with disabilities (visual, cognitive, motor), low-literacy customers, financially distressed customers |
| **Key Concerns** | Comprehension of AI responses; accessibility of interface; not being trapped in an AI loop; sensitivity to distress signals |
| **Unique Risks** | Higher susceptibility to confusion, frustration, or financial harm from incorrect information; may not understand they're interacting with AI |
| **Engagement Methods** | Targeted accessibility testing (WCAG); user research with representative participants; partnerships with disability organizations |
| **Required Controls** | Always-visible "Talk to a person" button; simplified language mode; auto-escalation for distress indicators; screen reader compatibility |

### S-04: Customer Service Agents (Tier 1)

| Attribute | Details |
|---|---|
| **Who** | Frontline agents currently handling customer queries via chat, phone, and email |
| **Estimated Population** | [XX] agents |
| **Key Concerns** | Job security; workload changes; quality of AI-generated context during escalation; additional training requirements; being held accountable for AI errors |
| **Impact if Unaddressed** | Low morale, resistance to adoption, high turnover, poor escalation handling |
| **Engagement Methods** | Training workshops; feedback portal; monthly check-ins; inclusion in pilot testing |
| **Change Management** | Reframe role as "AI-augmented specialist" handling complex cases; upskilling opportunities; transparent communication about no layoffs in Phase 1 |

### S-17: Central Bank / Financial Regulator

| Attribute | Details |
|---|---|
| **Who** | Prudential and conduct regulator for financial institutions |
| **Key Concerns** | Consumer protection; systemic risk; outsourcing and third-party risk; data governance; model governance; fair treatment of customers |
| **Engagement Methods** | Proactive briefing on AI deployment plans; regulatory sandboxing (if available); compliance reporting; responsiveness to inquiries |
| **Required Actions** | Verify if AI chatbot deployment requires regulatory notification or approval; understand regulatory expectations for AI in customer-facing financial services |

### S-20: Cloudflare (Third-Party AI Provider)

| Attribute | Details |
|---|---|
| **Who** | Technology vendor providing Workers AI (LLM inference) and AI Search (RAG retrieval) |
| **Key Concerns** | Service reliability; contractual compliance; data handling practices; model transparency |
| **Engagement Methods** | Enterprise account relationship; contract review; SLA monitoring; change notification process |
| **Required Actions** | Vendor risk assessment; DPA execution; model documentation request; audit rights verification |

---

## 4. Engagement Plan

### 4.1 Engagement by Lifecycle Phase

| Phase | Stakeholders to Engage | Activities |
|---|---|---|
| **Planning / Pre-Development** (Current) | S-01, S-02, S-04, S-05, S-10, S-11, S-12, S-13, S-15, S-16, S-17, S-20 | Context mapping workshops; regulatory consultation; customer research; vendor due diligence; agent impact assessment |
| **Development / Testing** | S-04, S-05, S-07, S-08, S-09, S-12, S-14 | User acceptance testing; bias testing; security testing; agent training; compliance review |
| **Pilot Deployment** | S-01, S-02, S-03, S-04, S-05, S-10, S-12 | Controlled pilot with real customers; feedback collection; performance monitoring; Go/No-Go review |
| **Full Deployment** | All | Go-live communications; monitoring dashboards; stakeholder feedback channels active |
| **Post-Deployment Monitoring** | S-01, S-02, S-04, S-05, S-06, S-10, S-12, S-15, S-16, S-17 | Continuous monitoring; quarterly reviews; annual stakeholder engagement; regulatory reporting |
| **Decommissioning** (if required) | S-01, S-04, S-10, S-12, S-13, S-17 | Customer communication; data retention/deletion; regulatory notification; lessons learned |

### 4.2 Engagement Calendar

| Activity | Frequency | Owner | Stakeholders |
|---|---|---|---|
| AI Governance Board Review | Quarterly | Chief AI Officer | S-10, S-12, S-13, S-15, S-16 |
| Customer Feedback Analysis | Monthly | AI Operations | S-01, S-02, S-03 |
| Agent Feedback Session | Monthly | Customer Service Lead | S-04, S-05 |
| Compliance Review | Quarterly | Compliance Officer | S-12, S-17 |
| Bias & Fairness Audit | Quarterly | AI Ethics Officer | S-02, S-03, S-16 |
| Third-Party Vendor Review | Quarterly | AI Project Lead + Procurement | S-20 |
| Stakeholder Engagement Report | Annually | AI Ethics Officer | All |
| Regulatory Briefing | As required / Annually | Compliance + Legal | S-17, S-18 |
| Consumer Advocacy Dialogue | Annually | AI Ethics Officer | S-19 |

---

## 5. Feedback Mechanisms

### 5.1 Customer Feedback Channels

| Channel | Description | Data Collected | Integration |
|---|---|---|---|
| **In-Chat Thumbs Up/Down** | Every AI response includes a feedback button | Binary satisfaction + optional text | Real-time dashboard; monthly trend analysis |
| **Post-Interaction Survey** | Random 10% sample receives short survey after conversation | CSAT (1–5), "Was your issue resolved?", open text | Monthly CSAT report |
| **"Talk to a Person" Analytics** | Track when and why customers request human escalation | Escalation trigger, conversation point, topic | Weekly escalation analysis |
| **Formal Complaint Channel** | Existing bank complaints process with AI-specific categorization | Complaint category, severity, resolution | [AI_Incident_Log.md](./AI_Incident_Log.md) |
| **Customer Focus Groups** | Quarterly sessions with diverse customer group | Qualitative insights, usability observations | Quarterly review report |

### 5.2 Internal Feedback Channels

| Channel | Audience | Description | Integration |
|---|---|---|---|
| **Agent Feedback Portal** | CS Agents + Supervisors | Report AI errors, poor escalation context, or customer complaints | Incident Log + Monthly review |
| **AI Operations Dashboard** | AI Ops + Supervisors | Real-time metrics: accuracy, escalation rate, response time, errors | Automated alerts at threshold breaches |
| **Governance Board Report** | Board + Oversight | Quarterly consolidated report: metrics, incidents, feedback themes, risk status | Quarterly governance review |
| **Anonymous Whistleblower** | All staff | Report concerns about AI system safety, ethics, or compliance without attribution | Per [AI_Governance_Policy.md](./AI_Governance_Policy.md) Section 1.2 |

### 5.3 Feedback-to-Action Workflow

```
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   COLLECT         │    │   ANALYZE         │    │   ACT             │
│                   │    │                   │    │                   │
│ • In-chat rating  │───►│ • Trend analysis  │───►│ • Model update    │
│ • Survey          │    │ • Root cause      │    │ • KB correction   │
│ • Agent feedback  │    │ • Bias detection   │    │ • Scope change    │
│ • Complaints      │    │ • Sentiment shift  │    │ • Training update │
│ • Focus groups    │    │ • Theme clustering │    │ • Incident report │
└──────────────────┘    └──────────────────┘    └──────────────────┘
         │                       │                       │
         └───────────────────────┴───────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   REPORT & CLOSE LOOP   │
                    │                         │
                    │ • Dashboard update       │
                    │ • Governance board report│
                    │ • Stakeholder comms      │
                    │ • Policy/procedure update│
                    └─────────────────────────┘
```

---

## 6. Vulnerable & Underserved Groups

> [!CAUTION]
> Per NIST AI RMF, **special attention must be paid to populations that are disproportionately affected** by AI systems. In financial services, this is especially critical because AI errors can cause direct financial harm to the most at-risk customers.

### 6.1 Identified Vulnerable Groups

| Group | Why Vulnerable | Specific Risks from FinAssist AI | Required Safeguards |
|---|---|---|---|
| **Elderly Customers** | Lower digital literacy; may not understand AI disclosure; may trust AI responses uncritically | Over-trust in incorrect information; difficulty navigating chat interface; inability to identify AI errors | Simplified language mode; large text options; prominent escalation button; age-appropriate UX testing |
| **Customers with Disabilities** | Visual, cognitive, or motor impairments may impede interaction | Screen reader incompatibility; inability to use feedback buttons; cognitive overload from complex responses | WCAG 2.1 AA compliance; screen reader testing; keyboard navigation; cognitive accessibility review |
| **Low-Literacy Customers** | May not understand written responses or AI disclosures | Misunderstanding of product information; inability to recognize incorrect responses | Plain language standards (Grade 6 reading level); future: voice/audio channel |
| **Non-English-Speaking Customers** | Phase 1 is English-only | Complete exclusion from AI service; forced to wait for human agent (if available) | Immediate language detection → human routing; Phase 2 multilingual support; translated escalation prompt |
| **Financially Distressed Customers** | Emotional vulnerability; time-sensitive needs | Chatbot may not recognize distress; delayed escalation; impersonal response to sensitive situation | Distress keyword detection; sentiment analysis; priority escalation; empathetic language templates |
| **First-Time Digital Banking Users** | Unfamiliar with chat interfaces and AI interactions | Confusion about how to use chatbot; inability to distinguish AI from human; navigation difficulties | Onboarding tutorial; interactive guide; clear AI disclosure; persistent help option |

### 6.2 Inclusive Design Principles

1. **No one is trapped** — Every customer must have access to a human agent at every point in the interaction
2. **Disclosure is clear** — The AI disclosure must be understandable by a person with Grade 6 reading level
3. **Errors don't cause harm** — For vulnerable groups, incorrect information can have disproportionate impact; additional guardrails apply
4. **Accessibility is not optional** — WCAG compliance is a launch requirement, not a post-launch enhancement
5. **Feedback is accessible** — Feedback mechanisms must work for all users, including those using assistive technologies

---

## 7. Engagement Log

> Track all stakeholder engagement activities here. This log supports evidence for NIST AI RMF MAP 5.2 compliance.

| Date | Stakeholder(s) | Activity | Key Findings / Outcomes | Action Items | Owner |
|---|---|---|---|---|---|
| YYYY-MM-DD | [Stakeholder ID(s)] | [e.g., Workshop, Interview, Survey, Review] | [Key takeaways] | [Follow-up actions] | [Name] |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

---

## 📎 Cross-References

| Document | Link |
|---|---|
| MAP — AI System Context & Risk Report | [MAP_AI_System_Context_Report.md](./MAP_AI_System_Context_Report.md) |
| AI Governance Policy | [AI_Governance_Policy.md](./AI_Governance_Policy.md) |
| AI Impact Assessment Template | [AI_Impact_Assessment_Template.md](./AI_Impact_Assessment_Template.md) |
| AI Incident Log | [AI_Incident_Log.md](./AI_Incident_Log.md) |
| AI Roles Matrix | [AI_Roles_Matrix.md](./AI_Roles_Matrix.md) |
| AI System Inventory | [AI_System_Inventory.csv](./AI_System_Inventory.csv) |

