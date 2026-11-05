# SamaBrains AI Governance Suite

[![NIST AI RMF 1.0](https://img.shields.io/badge/Framework-NIST%20AI%20RMF%201.0-blue)](https://www.nist.gov/itl/ai-risk-management-framework)
[![Cloudflare Pages](https://img.shields.io/badge/Hosted%20on-Cloudflare%20Pages-F38020?logo=cloudflare)](https://govern.samabrains.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

An AI governance workspace and supporting reference materials from [SamaBrains](https://samabrains.com/). The project brings together a working AI System Inventory, practical governance documentation, and educational guides.

**Open the production hub:** [govern.samabrains.com](https://govern.samabrains.com)

## What is available

### AI System Inventory

The hub currently provides the AI System Inventory. The other governance modules shown in the interface are marked **Coming soon**.

The inventory helps an organization maintain a shared record of AI systems, including their purpose, department, accountable owners, AI tasks, lifecycle, risk context, data, third parties, assessment status, and review dates. Teams can:

- Create a company workspace after signing in through Cloudflare Access.
- Invite colleagues as editors or viewers and manage workspace access.
- Search and filter records, including by lifecycle, risk, review date, and missing details.
- Import a CSV through a validation and preview step, or export the selected workspace's records.

Inventory completeness and review reminders support follow-up; they are **not** automated risk decisions, legal advice, or compliance determinations. Using the hub does not, by itself, establish compliance with NIST AI RMF or any law.

### Governance documents

The repository includes working materials organized around the NIST AI RMF functions:

| Area | Examples |
|---|---|
| **GOVERN** | [AI Governance Policy](docs/01-govern/AI-Governance-Policy.md), [Roles Matrix](docs/01-govern/AI-Roles-Matrix.md), [Inventory template](docs/01-govern/AI-System-Inventory.csv), and [Impact Assessment Template](docs/01-govern/AI-Impact-Assessment-Template.md) |
| **MAP** | [System Context Report](docs/02-map/MAP-AI-System-Context-Report.md), [Stakeholder Analysis](docs/02-map/MAP-Stakeholder-Analysis.md), and [Risk-Benefit Matrix](docs/02-map/MAP-Risk-Benefit-Matrix.csv) |
| **MEASURE** | [TEVV Metrics Framework](docs/03-measure/MEASURE-TEVV-Metrics-Framework.md), [Bias Testing Methodology](docs/03-measure/MEASURE-Bias-Testing-Methodology.md), and [Metrics Tracker](docs/03-measure/MEASURE-Metrics-Tracker.csv) |
| **MANAGE** | [Risk Response Plan](docs/04-manage/MANAGE-Risk-Response-Plan.md), [Incident Response Playbook](docs/04-manage/MANAGE-Incident-Response-Playbook.md), and [Incident Log](docs/04-manage/AI-Incident-Log.md) |

These are adaptable examples and templates, not evidence that an organization has implemented the framework or satisfied a regulatory requirement. The FinAssist materials are a case study, not a claim about a deployed banking system.

### Guides and references

- [Understanding Data and AI](docs/00-references/Understanding-Data-and-AI.md)
- [AI Governance Program and Management](docs/00-references/AI-Governance-Program-and-Management-Guide.md)
- [AI Regulatory Compliance: A Practical Guide](docs/00-references/AI-Regulatory-Compliance-Practical-Guide.md)
- [EU AI Act: A Plain-Language Guide](docs/00-references/EU-AI-Act-Simplified-Guide.md)
- [Securing Generative AI: Data, Attacks, and Controls](docs/00-references/Securing-Generative-AI-Data-and-LLM-Applications.md)
- [NIST AI RMF Learning Guide](docs/00-references/NIST-AI-RMF-Learning-Guide.md) and [Playbook Study Notes](docs/00-references/NIST-AI-RMF-Playbook-Study-Notes.md)

Guides are for general education and should not be treated as legal advice. Check the linked primary sources and consult qualified professionals for decisions about a specific system or jurisdiction.

## How the hub works

The application is hosted on Cloudflare Pages. Pages Functions validate Cloudflare Access assertions, and the API checks organization membership before returning workspace data. Inventory records and memberships are stored in Cloudflare D1 and scoped to the selected company workspace.

Workspace owners and admins can invite colleagues as editors or viewers. Invitation links are single-use, expire after seven days, and must be accepted by the invited email address. The app does not send invitation emails automatically; workspace owners share the generated link.

Production is served at [govern.samabrains.com](https://govern.samabrains.com). Preview and production use separate D1 databases. The preview hostname is intentionally not listed here.

## Run locally

Requirements: Node.js and npm. From the repository root:

```powershell
npm install
npm run serve
```

Then open `http://localhost:8080`. This static preview is for the interface only; it does not provide the authenticated workspace API.

To run the Pages Functions locally:

```powershell
npx wrangler pages dev tools/ai-impact-assessment
```

The API requires valid Cloudflare Access assertions and configured D1 bindings. Local development does not bypass authentication.

## Deploy and database setup

The Cloudflare Pages configuration is in [`wrangler.toml`](wrangler.toml). Before deploying, configure a Cloudflare Access application and policy for the target hostname. The project uses these environment values:

- `ACCESS_TEAM_DOMAIN`: Cloudflare Access team issuer.
- `ACCESS_AUD`: the target Access application's audience tag.

The request middleware fails closed when Access is missing or cannot be verified. Configure and verify Access before exposing the application.

Deploy to the configured branch environments with:

```powershell
npm run deploy:preview
npm run deploy:production
```

The D1 migrations are environment-specific and must be applied only when needed. Back up the target database first, apply the initial schema before the workspace migration, and do not rerun an already-applied migration:

```powershell
# Initial inventory schema, only for a database that has not been initialized
npm run db:migrate:preview
npm run db:migrate:production

# Workspace and membership support, once per environment
npm run db:migrate:workspaces:preview
npm run db:migrate:workspaces:production

# Organization-scoped module storage, once per environment
npm run db:migrate:modules:preview
npm run db:migrate:modules:production
```

Confirm the target environment and database backup before running any migration command.

## Project layout

```text
docs/
  00-references/       Guides and reference material
  01-govern/           Governance policy, ownership, and inventory
  02-map/              Context, stakeholders, and harms
  03-measure/          Testing, fairness, and metrics
  04-manage/           Risks, incidents, and improvement
functions/             Access-protected Pages Functions and API routes
migrations/            D1 schema migrations
tools/
  ai-impact-assessment/
                       AI Governance Suite frontend
wrangler.toml           Cloudflare Pages and D1 configuration
```

## Related resources

- [SamaBrains](https://samabrains.com/)
- [SamaBrains AI governance assistant](https://samabrains.com/ask/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [Project license](LICENSE)

## Contact

For project and practice inquiries, visit [SamaBrains](https://samabrains.com/) or connect on [LinkedIn](https://www.linkedin.com/in/robert-ssebambulidde/).
