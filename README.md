# 🛡️ SamaBrains AI Governance & Risk Solutions

[![Framework: NIST AI RMF 1.0](https://img.shields.io/badge/Framework-NIST%20AI%20RMF%201.0-blue?style=for-the-badge)](https://www.nist.gov/itl/ai-risk-management-framework)
[![Compliance: ISO/IEC 42001 Ready](https://img.shields.io/badge/Compliance-ISO%2FIEC%2042001-green?style=for-the-badge)](https://www.iso.org/standard/81230.html)
[![Domain: Enterprise AI Governance & TEVV](https://img.shields.io/badge/Domain-Enterprise%20AI%20%26%20TEVV-orange?style=for-the-badge)]()
[![Practice: SamaBrains](https://img.shields.io/badge/Practice-SamaBrains-purple?style=for-the-badge)](https://samabrains.com/)

> **Audit-ready AI governance frameworks, quantitative TEVV evaluations, and grounded assistants over bounded corpora.**  
> Built at and for **[SamaBrains](https://samabrains.com/)**, an independent AI governance, security, and responsible-AI practice led by **Robert Ssebambulidde**.

---

## 🌟 Featured Portfolio Projects

```mermaid
flowchart TD
    SB["SamaBrains AI Governance Practice"] --> P1["1. Enterprise AI Governance Framework\n(NIST AI RMF 1.0 Implementation)"]
    SB --> P2["2. Grounded AI Governance Assistant\n(Bounded Corpus RAG)"]

    P1 --> G["GOVERN\nPolicy & RACI"]
    P1 --> M1["MAP\nContext & Risk Profiling"]
    P1 --> M2["MEASURE\nTEVV & 20 Metrics"]
    P1 --> M3["MANAGE\nPlaybooks & Feedback"]
```

---

### 🏛️ Project 1: Enterprise AI Governance Framework & TEVV (FinAssist AI)
> **Full Operational Case Study:** [`docs/README.md`](docs/README.md)  
> **Domain:** Financial Services / Tier-1 Enterprise Generative AI Assistant  
> **Standards:** NIST AI 100-1 (NIST AI RMF 1.0), ISO/IEC 42001, EU AI Act

Most enterprise AI ethics efforts stall at abstract statements. This project is a **production-grade, audit-ready operational governance framework** developed for a high-risk commercial banking assistant (**FinAssist AI**), spanning all four NIST AI RMF core functions:

```
docs/
├── 🏛️ GOVERN
│   ├── AI_Governance_Policy.md             <- Enterprise policy & oversight gates
│   ├── AI_Roles_Matrix.md                  <- 3-tier RACI matrix & veto authority
│   ├── AI_System_Inventory.csv             <- Model catalog & risk tier classification
│   └── AI_Impact_Assessment_Template.md    <- Pre-deployment rights & harm assessment
├── 🗺️ MAP
│   ├── MAP_AI_System_Context_Report.md     <- Technical boundaries & 13 risk profiles (R-01..R-13)
│   ├── MAP_Stakeholder_Analysis.md         <- Impacted populations & whistleblower channels
│   └── MAP_Risk_Benefit_Matrix.csv         <- Quantitative risk vs. utility scoring
├── 📏 MEASURE
│   ├── MEASURE_TEVV_Metrics_Framework.md   <- Independent testing & validation protocols
│   ├── MEASURE_Bias_Testing_Methodology.md <- Statistical demographic parity & disparate impact testing
│   └── MEASURE_Metrics_Tracker.csv         <- 20 operational metrics with breach thresholds
└── 🛡️ MANAGE
    ├── MANAGE_Risk_Response_Plan.md        <- Mitigation actions across all 13 MANAGE subcategories
    ├── MANAGE_Incident_Response_Playbook.md<- SEV-1 to SEV-4 classification & 15-min containment SLAs
    ├── MANAGE_Continuous_Improvement_Log.csv<- Post-incident & feedback closed-loop tracking
    └── AI_Incident_Log.md                  <- Standardized incident reporting register
```

👉 **[Explore the full FinAssist AI Governance Framework →](docs/README.md)**

---

### 💬 Project 2: Grounded AI Governance Knowledge Base & Assistant
> **Case Study Write-up:** [`solutions/ai-governance-kb-assistant/`](solutions/ai-governance-kb-assistant/)  
> **Live Demo:** [Ask SamaBrains](https://samabrains.com/ask/)

A grounded retrieval-augmented AI assistant designed to deliver **instant, cited answers** over a strictly bounded corpus of official AI governance laws and standards (NIST AI RMF, Uganda Data Protection and Privacy Act, ISO/IEC 42001) rather than an ungrounded general-purpose chatbot.

* **Key Capabilities:**
  * Strict grounding with named document and URL citations.
  * Dual-door architecture serving staff internal lookups (Ctrl+K) and public client inquiries (`/ask/`).
  * Continuous indexing of emerging regulatory texts and practice guidance.

👉 **[Read the Knowledge Base Case Study →](solutions/ai-governance-kb-assistant/)**

---

## 📊 Summary of Core Governance Deliverables

| Pillar | Key Artifacts | What It Delivers |
|---|---|---|
| **GOVERN** | [Policy](docs/AI_Governance_Policy.md) · [Roles Matrix](docs/AI_Roles_Matrix.md) · [System Inventory](docs/AI_System_Inventory.csv) | Board-level accountability, clear RACI definitions, independent veto powers, and complete model registration. |
| **MAP** | [Context Report](docs/MAP_AI_System_Context_Report.md) · [Stakeholder Analysis](docs/MAP_Stakeholder_Analysis.md) · [Risk-Benefit Matrix](docs/MAP_Risk_Benefit_Matrix.csv) | Comprehensive categorization of the AI system, 13 profiled risks (R-01 to R-13), and disproportionate impact analysis on vulnerable groups. |
| **MEASURE** | [TEVV Framework](docs/MEASURE_TEVV_Metrics_Framework.md) · [Bias Testing](docs/MEASURE_Bias_Testing_Methodology.md) · [Metrics Tracker](docs/MEASURE_Metrics_Tracker.csv) | Independent TEVV testing regimen tracking 20 quantitative metrics (hallucination rate, prompt injection bypass, latency, demographic parity). |
| **MANAGE** | [Risk Response Plan](docs/MANAGE_Risk_Response_Plan.md) · [Incident Playbook](docs/MANAGE_Incident_Response_Playbook.md) · [CI Log](docs/MANAGE_Continuous_Improvement_Log.csv) | Automated circuit breakers, SEV-1 to SEV-4 incident escalation, emergency kill-switches, and continuous retraining feedback loops. |

---

## 🛠️ Operationalization & AI GRC Integration

This repository's deliverables are structured for straightforward integration into modern AI GRC and observability platforms:

* **[VerifyWise.ai](https://verifywise.ai/):** Open-source AI GRC platform native to NIST AI RMF. Deliverables map directly into VerifyWise's Model Inventory, Risk Register, and Incident Logging modules.
* **Credo AI / Holistic AI / Vanta AI:** Controls, roles, and impact assessments can be ingested as compliance evidence items for ISO/IEC 42001 certification audits.
* **LLM Observability (Langfuse / Phoenix / Arize):** Production telemetry streams real-time data into the 20 metrics defined in [`MEASURE_Metrics_Tracker.csv`](docs/MEASURE_Metrics_Tracker.csv).

---

## 📖 Foundational Reference Guides

Included in this repository are comprehensive reference and study materials:

* [NIST AI RMF Learning Guide](docs/NIST_AI_RMF_Learning_Guide.md) — 40+ page breakdown of the NIST AI 100-1 framework.
* [NIST AI RMF Playbook Study Notes](docs/NIST_AI_RMF_Playbook_Study_Notes.md) — Line-by-line notes on all 72 NIST subcategories.
* [AI Risk Taxonomy Guide](docs/ai-risk-guide.md) — Categorized directory of AI harms, failure modes, and threat vectors.

---

## ⚖️ Legal Disclaimer

*The contents of this repository are provided for educational, governance architecture, and compliance demonstration purposes. They do not constitute formal legal counsel. For regulatory filings, engage certified legal counsel and accredited conformity assessment bodies.*

---

## 👤 Author & Practice

**Robert Ssebambulidde**  
Founder & Practice Lead, **[SamaBrains](https://samabrains.com/)**  
*AI Governance · AI Security · Responsible AI*  
- **Website:** [samabrains.com](https://samabrains.com/)  
- **Assistant:** [samabrains.com/ask/](https://samabrains.com/ask/)  
- **GitHub:** [@rssebambulidde](https://github.com/rssebambulidde)
