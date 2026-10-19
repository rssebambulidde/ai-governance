# AI Impact Assessment Studio

> **Interactive, audit-ready AI Impact Assessment (AIIA) web application.**  
> Built for **[SamaBrains](https://samabrains.com/)** and aligned with **NIST AI RMF 1.0 (GOVERN 4.2 · MAP 3.1/5.1 · MANAGE 1.1)** and **ISO/IEC 42001**.  
> **Live Web Application:** [https://ai-impact-assessment-20y.pages.dev](https://ai-impact-assessment-20y.pages.dev)

---

## Capabilities

* **10-Part Assessment Wizard:** Guides users through all sections of the NIST AI RMF Impact Assessment lifecycle.
* **Interactive Risk Calculator:** Real-time Likelihood (1–5) × Impact (1–5) calculation with dynamic risk badges (Low, Medium, High, Critical) and risk scorecard heat counter.
* **Preset Switcher:** Instant *"Load FinAssist AI Example"* for demonstration and benchmarking, or *"New Blank"* for net-new assessments.
* **Auto-Save:** Real-time persistence using browser `localStorage`.
* **Export Engine:**
  * **Executive PDF:** Formatted for print/PDF export (`@media print` styling with corporate cover headers, page-break controls, and formal signature blocks).
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
