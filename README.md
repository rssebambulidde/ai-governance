# AI Governance & Safety Engineering Portfolio

[![Framework: NIST AI RMF 1.0](https://img.shields.io/badge/Framework-NIST%20AI%20RMF%201.0-blue?style=for-the-badge)](https://www.nist.gov/itl/ai-risk-management-framework)
[![Live Web Suite: Cloudflare Pages](https://img.shields.io/badge/Live%20Web%20Suite-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare)](https://ai-impact-assessment-20y.pages.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Practice: SamaBrains](https://img.shields.io/badge/Practice-SamaBrains-purple?style=for-the-badge)](https://samabrains.com/)

A working AI governance toolkit: policy release gates, a risk register, bias-testing metrics, and a live impact assessment tool, built by **Robert Ssebambulidde** ([SamaBrains](https://samabrains.com/)) on the **NIST AI Risk Management Framework 1.0 (NIST AI 100-1)**. This portfolio demonstrates how to translate high-level governance principles into production engineering controls, quantitative evaluation metrics, and verifiable deployment safeguards.

> **Key Figures:** 20 production metrics with breach thresholds, 13 profiled risks, 28 RACI activities across 18 roles, and a 15-minute incident containment SLA.

* **Live Web Application:** [ai-impact-assessment-20y.pages.dev](https://ai-impact-assessment-20y.pages.dev) (Inventory · Roles · Policy Gates · Impact Assessment)
* **Live Regulatory Assistant:** [samabrains.com/ask/](https://samabrains.com/ask/) (Bounded retrieval over official governance standards)

---

## Core Competencies & Evidence

| Competency | Practical Capability | Key Evidence |
|---|---|---|
| **Policy & Release Gating** | Enforcing 4 mandatory Go/No-Go release gates before production deployment | [`AI-Governance-Policy.md`](docs/01-govern/AI-Governance-Policy.md) |
| **Accountability & Veto Rights** | Structuring 28 RACI activities and binding veto powers across 18 roles | [`AI-Roles-Matrix.md`](docs/01-govern/AI-Roles-Matrix.md) |
| **Socio-Technical Risk Profiling** | Mapping 13 failure modes, system boundaries, and impacts on vulnerable groups | [`MAP-AI-System-Context-Report.md`](docs/02-map/MAP-AI-System-Context-Report.md) |
| **TEVV & Bias Testing** | Testing demographic parity, counterfactual fairness, and tracking 20 metrics | [`MEASURE-Bias-Testing-Methodology.md`](docs/03-measure/MEASURE-Bias-Testing-Methodology.md) |
| **Incident Response & Containment** | Executing SEV-1 to SEV-4 playbooks with a 15-minute containment SLA | [`MANAGE-Incident-Response-Playbook.md`](docs/04-manage/MANAGE-Incident-Response-Playbook.md) |
| **Interactive Governance Tooling** | Building client-side web tools with real-time risk scoring and PDF export | [`tools/ai-impact-assessment/`](tools/ai-impact-assessment/) |
| **Grounded RAG Architecture** | Delivering cited answers over bounded regulatory corpora without hallucinations | [`solutions/ai-governance-kb-assistant/`](solutions/ai-governance-kb-assistant/) |

---

## Pillar 1: Interactive Web Governance Hub

> **Live Deployment:** [https://ai-impact-assessment-20y.pages.dev](https://ai-impact-assessment-20y.pages.dev)  
> **Source Directory:** [`tools/ai-impact-assessment/`](tools/ai-impact-assessment/)  
> **Architecture:** Pure client-side HTML5/CSS3/JavaScript hosted on Cloudflare Pages (zero backend runtime, local storage persistence, corporate print styling).

The web hub operationalizes governance workflows into four interactive modules:

### Module 1: AI System Inventory
* Central registry tracking model classes, task types, risk tiers, foundation models, data classifications, and lifecycle states.
* Real-time KPI indicators for total registered systems, critical-risk assets, and active production deployments.
* Two-way CSV synchronization with [`docs/01-govern/AI-System-Inventory.csv`](docs/01-govern/AI-System-Inventory.csv).
* One-click transition of any inventory record directly into the Impact Assessment Studio with pre-bound metadata.

### Module 2: Roles and RACI Matrix
* Interactive lifecycle matrix mapping 28 activities across 6 phases against 18 enterprise roles.
* Role catalog documenting reporting lines, responsibilities, and hard veto rights for Ethics, Legal, and Risk officers.
* Human-AI oversight configuration register documenting human-in-the-loop (HITL), human-on-the-loop (HOTL), and human-in-command (HIC) boundaries per system.
* Role-based training records tracking compliance across 6 core AI risk domains.

### Module 3: Policy Gatekeeper
* Automated Go/No-Go validator checking systems against 4 mandatory release gates:
  1. *GATE-01:* Zero unmitigated critical risks
  2. *GATE-02:* Legal and regulatory compliance sign-off
  3. *GATE-03:* Independent TEVV validation dossier
  4. *GATE-04:* Executive governance and veto sign-off
* Real-time clearance status badging (Cleared for Deployment, Conditional Hold, Blocked).
* Verification checklist across all 8 Trustworthy AI principles and tracking for 9 mandatory lifecycle documents.
* Decommissioning triggers, third-party model screening rubric, and policy exceptions register.

### Module 4: Impact Assessment Studio
* 10-part assessment wizard covering business context, trustworthy alignment, legal thresholds, harms, mitigations, and stakeholder consultations.
* Interactive Likelihood (1–5) $\times$ Impact (1–5) calculation with dynamic heat badges and risk scorecards.
* One-click preset to load the FinAssist AI banking case study or start a blank assessment.
* Multi-format export engine: Executive light-theme printable PDF, audit-ready Markdown, and JSON state persistence.

---

## Pillar 2: Enterprise AI Governance Framework (FinAssist AI)

> **Case Study Location:** [`docs/`](docs/)  
> **System Context:** **FinAssist AI (`SYS-FIN-001`)** is a customer-facing generative AI banking assistant used as a concrete test case for every governance control in this repository.  
> **Framework:** NIST AI Risk Management Framework 1.0 (NIST AI 100-1)

### 1. GOVERN Deliverables
* [AI-Governance-Policy.md](docs/01-govern/AI-Governance-Policy.md): Enterprise charter defining governance principles, 4 Go/No-Go release gates, third-party foundation model standards, and review cadences.
* [AI-Roles-Matrix.md](docs/01-govern/AI-Roles-Matrix.md): 4-tier RACI matrix across 18 roles detailing binding veto rights for Ethics, Legal, and Risk officers.
* [AI-System-Inventory.csv](docs/01-govern/AI-System-Inventory.csv): Standardized model inventory tracking 20 attributes per AI asset.
* [AI-Impact-Assessment-Template.md](docs/01-govern/AI-Impact-Assessment-Template.md): 10-section pre-deployment assessment covering civil rights, privacy, failure modes, and human agency.

### 2. MAP Deliverables
* [MAP-AI-System-Context-Report.md](docs/02-map/MAP-AI-System-Context-Report.md): Technical boundaries, non-AI alternatives, and deep-dive risk profiles for **13 distinct harm scenarios (`R-01` to `R-13`)**.
* [MAP-Stakeholder-Analysis.md](docs/02-map/MAP-Stakeholder-Analysis.md): Systematic analysis of vulnerable customer cohorts, frontline operators, and community grievance mechanisms.
* [MAP-Risk-Benefit-Matrix.csv](docs/02-map/MAP-Risk-Benefit-Matrix.csv): Quantitative risk vs. utility scoring balancing speed against potential harms.

### 3. MEASURE Deliverables
* [MEASURE-TEVV-Metrics-Framework.md](docs/03-measure/MEASURE-TEVV-Metrics-Framework.md): Independent TEVV testing protocols covering trustworthiness, robustness, and safety.
* [MEASURE-Bias-Testing-Methodology.md](docs/03-measure/MEASURE-Bias-Testing-Methodology.md): Statistical testing methodologies for disparate impact ratios (target range 0.80 to 1.25) and counterfactual evaluations.
* [MEASURE-Metrics-Tracker.csv](docs/03-measure/MEASURE-Metrics-Tracker.csv): **20 quantitative production metrics (`M-01` to `M-20`)** with hard breach thresholds, evaluation cadences, and assigned owners:
  * *Hallucination Rate (M-01):* Target under 1.0%, breach threshold over 2.0%.
  * *Prompt Injection Bypass Rate (M-02):* Target 0.0%, breach threshold over 1.0%.
  * *Disparate Impact Ratio (M-03):* Target 0.90 to 1.10, breach threshold under 0.80 or over 1.25.
  * *P95 Inference Latency (M-05):* Target under 1,200 ms, breach threshold over 1,800 ms.

### 4. MANAGE Deliverables
* [MANAGE-Risk-Response-Plan.md](docs/04-manage/MANAGE-Risk-Response-Plan.md): Actionable response strategies and residual risk acceptances for all 13 mapped risks.
* [MANAGE-Incident-Response-Playbook.md](docs/04-manage/MANAGE-Incident-Response-Playbook.md): Operational incident handling classifying SEV-1 through SEV-4 events with a mandatory **15-minute containment SLA**.
* [MANAGE-Continuous-Improvement-Log.csv](docs/04-manage/MANAGE-Continuous-Improvement-Log.csv): Closed-loop log linking monitoring alerts and post-mortems to model retraining.
* [AI-Incident-Log.md](docs/04-manage/AI-Incident-Log.md): Standardized incident reporting register with root-cause analysis templates.

---

## Pillar 3: Grounded Regulatory Knowledge Base & Assistant

> **Solution Directory:** [`solutions/ai-governance-kb-assistant/`](solutions/ai-governance-kb-assistant/)  
> **Live Advisory Demo:** [https://samabrains.com/ask/](https://samabrains.com/ask/)

A production RAG solution demonstrating how enterprises deliver **instant, cited answers** over bounded, authoritative AI governance corpora:

* **Bounded Corpus Grounding:** Queries are indexed exclusively against official regulatory publications (NIST AI RMF 1.0, Uganda Data Protection and Privacy Act 2019, SamaBrains advisory playbooks), preventing unbounded hallucinations.
* **Dual-Door Access Architecture:**
  1. *Internal Staff Knowledge Base (`Ctrl+K`):* Rapid regulatory clause lookup during risk assessments.
  2. *Public Advisory Assistant (`/ask/`):* Transparent, source-attributed answers for enterprise clients.
* **Strict Source Attribution:** Every response includes direct document citations and paragraph-level references.

---

## Enterprise AI GRC & Telemetry Integration

This repository's deliverables are structured for direct ingestion into modern enterprise AI GRC and telemetry platforms:

| Platform Category | Target Platforms | Direct Integration Mapping |
|---|---|---|
| **AI GRC Platforms** | [VerifyWise.ai](https://verifywise.ai/) · Credo AI · Holistic AI | Ingests [`AI-System-Inventory.csv`](docs/01-govern/AI-System-Inventory.csv), [`AI-Roles-Matrix.md`](docs/01-govern/AI-Roles-Matrix.md), and [`AI-Governance-Policy.md`](docs/01-govern/AI-Governance-Policy.md) into automated compliance registers. |
| **Enterprise Compliance** | Vanta AI · OneTrust · ServiceNow GRC | Ingests deployment gate records and formal executive attestations as audit evidence. |
| **LLM Observability** | Langfuse · Arize Phoenix · OpenTelemetry | Real-time production telemetry feeds into the 20 line-item metrics in [`MEASURE-Metrics-Tracker.csv`](docs/03-measure/MEASURE-Metrics-Tracker.csv). |

---

## For Developers and Technical Reviewers

### Repository File Structure

```
ai-governance/
├── README.md                                  <- Master Portfolio Overview & Technical Index (Single Source of Truth)
├── docs/                                      <- Operational NIST AI RMF Governance Deliverables
│   ├── 00-references/                         <- Primary Standards, Study Notes & Playbook Spreadsheets
│   │   ├── NIST-AI-RMF-Learning-Guide.md      <- 40+ page breakdown of NIST AI 100-1
│   │   ├── NIST-AI-RMF-Playbook-Study-Notes.md<- Deep dive across all 72 NIST subcategories
│   │   ├── ai-risk-guide.md                   <- AI risk, vulnerability, and mitigation guide
│   │   ├── NIST.AI.100-1.pdf                  <- Official NIST AI RMF publication
│   │   ├── AI-RMF-Playbook.pdf                <- Official NIST AI RMF Playbook publication
│   │   ├── nist-ai-rmf-playbook.csv           <- Playbook action catalog (CSV)
│   │   └── nist-ai-rmf-playbook.xlsx          <- Playbook action catalog (Excel)
│   ├── 01-govern/                             <- Institutional Governance & Accountability
│   │   ├── AI-Governance-Policy.md            <- Enterprise policy charter & oversight gates
│   │   ├── AI-Roles-Matrix.md                 <- 4-tier RACI matrix & binding veto authority
│   │   ├── AI-System-Inventory.csv            <- Central model inventory & risk classification
│   │   └── AI-Impact-Assessment-Template.md   <- Pre-deployment rights & harm assessment template
│   ├── 02-map/                                <- Context Profiling & Harm Categorization
│   │   ├── MAP-AI-System-Context-Report.md    <- Operational envelopes & 13 profiled risks (R-01..R-13)
│   │   ├── MAP-Stakeholder-Analysis.md        <- Impacted populations & grievance channels
│   │   └── MAP-Risk-Benefit-Matrix.csv        <- Risk vs. utility pre/post mitigation scoring
│   ├── 03-measure/                            <- TEVV, Bias Testing & Quantitative Metrics
│   │   ├── MEASURE-TEVV-Metrics-Framework.md  <- Independent testing & validation protocols
│   │   ├── MEASURE-Bias-Testing-Methodology.md<- Demographic parity & disparate impact testing
│   │   └── MEASURE-Metrics-Tracker.csv        <- 20 operational metrics with breach thresholds
│   └── 04-manage/                             <- Risk Mitigation, Incidents & Continuous Improvement
│       ├── MANAGE-Risk-Response-Plan.md       <- Mitigations across all 13 MAP risks
│       ├── MANAGE-Incident-Response-Playbook.md<- SEV-1 to SEV-4 classification & 15-min containment
│       ├── MANAGE-Continuous-Improvement-Log.csv<- Retraining triggers & feedback closed-loop tracking
│       └── AI-Incident-Log.md                 <- Standardized incident reporting register
├── solutions/                                 <- Practical AI Governance Architectures
│   └── ai-governance-kb-assistant/            <- Grounded Regulatory Knowledge Base & Assistant
└── tools/                                     <- Live Production Web Applications
    └── ai-impact-assessment/                  <- SamaBrains NIST AI Governance Hub
        ├── index.html                         <- Main 4-module portal application markup
        ├── styles.css                         <- Glassmorphism theme & light-theme print engine
        ├── app.js                             <- Interactive state engine, gatekeeper & router
        ├── inventory-data.js                  <- Seed dataset for 6 enterprise AI systems
        ├── roles-data.js                      <- 28 RACI activities, 18 roles & training data
        ├── policy-data.js                     <- 4 deployment gates, 8 principles & 9 artifacts
        ├── finassist-data.js                  <- Preloaded FinAssist AI impact assessment dataset
        └── _headers                           <- Cloudflare security & cache-invalidation headers
```

### Cloudflare Pages Deployment

The web suite requires zero external build steps or server runtime:

```powershell
# Method A: Direct upload using Wrangler CLI
$env:CLOUDFLARE_ACCOUNT_ID="$CLOUDFLARE_ACCOUNT_ID"
npx wrangler pages deploy tools/ai-impact-assessment --project-name="ai-impact-assessment" --branch="main"
```

```text
Method B: Cloudflare Git Integration
1. Cloudflare Dashboard -> Workers & Pages -> Create application -> Pages -> Connect to Git
2. Repository: rssebambulidde/ai-governance
3. Build output directory: tools/ai-impact-assessment (build command: empty)
4. Save and Deploy
```

### Running Locally

```powershell
# Using Python built-in static server
python -m http.server 8080 --directory tools/ai-impact-assessment

# Or using npx serve
npx serve tools/ai-impact-assessment
```
Open `http://localhost:8080` in any web browser.

---

## Contact & Inquiries

**Robert Ssebambulidde**  
AI Governance & Safety Practice Lead, [SamaBrains](https://samabrains.com/)  
Specializing in Enterprise AI Governance Architecture, NIST AI RMF Implementation, Algorithmic Auditing (TEVV), and Responsible AI Engineering.

* **Practice Website:** [samabrains.com](https://samabrains.com/)
* **Direct Email:** [rssebambulidde@gmail.com](mailto:rssebambulidde@gmail.com)
* **Repository:** [github.com/rssebambulidde/ai-governance](https://github.com/rssebambulidde/ai-governance)
* **GitHub Profile:** [@rssebambulidde](https://github.com/rssebambulidde)
* **Live Interactive Suite:** [ai-impact-assessment-20y.pages.dev](https://ai-impact-assessment-20y.pages.dev)
* **Live Assistant Demo:** [samabrains.com/ask/](https://samabrains.com/ask/)
