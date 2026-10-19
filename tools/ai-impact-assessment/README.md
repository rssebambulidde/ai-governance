# NIST AI RMF Governance Hub

> **Interactive, audit-ready AI Governance web application suite.**  
> Dedicated exclusively to operationalizing the **NIST AI Risk Management Framework 1.0 (NIST AI RMF — GOVERN · MAP · MEASURE · MANAGE)**.  
> **Live Web Application:** [https://ai-impact-assessment-20y.pages.dev](https://ai-impact-assessment-20y.pages.dev)

---

## Capabilities

### 1. AI System Inventory & Registry (GOVERN 1.6)
* **Executive Registry Grid:** Real-time searchable and filterable registry tracking model classes, task types, risk tiers, third-party foundation models, data classifications, and lifecycle states.
* **Governance KPI Cards:** Live metrics for total registered systems, critical/high-risk count, production deployments, and assurance audit health.
* **Add & Edit System Modal:** Full attribute modal tracking key AI actors, review dates, and links to documentation context reports and incident logs.
* **Two-Way CSV Synchronization:** Direct export and import compatible with repository standard [`docs/01-govern/AI-System-Inventory.csv`](../../docs/01-govern/AI-System-Inventory.csv).
* **One-Click AIIA Launch:** Instantly transition any system into the Impact Assessment Studio with pre-bound metadata.
* **Executive Registry PDF:** Pure white A4 printable registry report for board review and audit submissions.

### 2. AI Roles & Responsibilities Matrix (GOVERN 2.1 · GOVERN 2.2 · GOVERN 2.3 · GOVERN 3.2)
* **Interactive RACI Lifecycle Matrix:** 28 governance activities across 6 phases (Governance & Policy, Project Lifecycle, Deployment & Monitoring, Incident Response, Decommissioning, Third-Party AI) mapped against enterprise roles with instant tier-filtering and text search.
* **Role Catalog & Veto Authority Directory:** 18 defined enterprise roles across 4 tiers (Governance & Leadership, Project-Level, Operational, External/Advisory) documenting reporting lines, primary responsibilities, and hard veto authorities.
* **Human-AI Oversight Register (GOVERN 3.2):** Explicit human-in-the-loop (HITL), human-on-the-loop (HOTL), and human-in-command (HIC) operational boundaries tied to AI inventory systems (`AI-001` through `AI-006`).
* **Workforce Competency Tracker (GOVERN 2.2):** Role-based training records, mandatory certification tracking, and compliance audit readiness.
* **Executive Role & RACI PDF Exporter:** Dedicated light-theme, pure white PDF engine with formal executive signatures and CSV export.

### 3. AI Impact Assessment Studio (GOVERN 4.2 · MAP 3.1 · MANAGE 1.1)
* **10-Part Assessment Wizard:** Guides users through all sections of the NIST AI RMF Impact Assessment lifecycle.
* **Interactive Risk Calculator:** Real-time Likelihood (1–5) × Impact (1–5) calculation with dynamic risk badges (Low, Medium, High, Critical) and risk scorecard heat counter.
* **Preset Switcher:** Instant *"Load FinAssist AI Example"* for demonstration and benchmarking, or *"New Blank"* for net-new assessments.
* **Auto-Save:** Real-time persistence using browser `localStorage`.
* **Multi-Format Export Engine:**
  * **Executive PDF:** Clean corporate white-paper print/PDF exporter (`@media print` styling with formal signature blocks).
  * **Markdown Report:** One-click download of audit-ready `.md` matching repository standards.
  * **JSON State:** Full state export and import for collaborative drafting.

---

## Deployment to Cloudflare Pages

This application is built with vanilla HTML5, CSS3, and modern JavaScript—requiring zero external runtime or build steps. It is 100% turnkey for Cloudflare Pages.

### Method A: Git Integration (Recommended)

1. Log into your **[Cloudflare Dashboard](https://dash.cloudflare.com/)** and navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Select your repository: `rssebambulidde/ai-governance`.
3. Configure the deployment settings:
   * **Project name:** `ai-impact-assessment` (or your preferred name)
   * **Production branch:** `main`
   * **Framework preset:** `None`
   * **Build command:** *(leave empty)*
   * **Build output directory:** `tools/ai-impact-assessment`
4. Click **Save and Deploy**. Cloudflare will deploy the site and assign a live URL (e.g. `https://ai-impact-assessment.pages.dev`).

### Method B: Direct Upload via Wrangler CLI

If you have Wrangler authenticated on your machine:

```powershell
npx wrangler pages deploy tools/ai-impact-assessment --project-name=ai-impact-assessment
```

---

## Local Development & Testing

Simply open `tools/ai-impact-assessment/index.html` in any modern web browser, or run a local static server:

```powershell
# Using Python
python -m http.server 8080 --directory tools/ai-impact-assessment

# Or using npx serve
npx serve tools/ai-impact-assessment
```

Visit `http://localhost:8080` in your browser.
