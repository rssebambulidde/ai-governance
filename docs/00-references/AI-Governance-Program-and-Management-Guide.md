# AI Governance Program and Management

### Building an effective program and translating responsible AI into business success

> **Purpose:** Give leaders and practitioners a practical way to establish, operate, and improve an AI governance program. This guide is educational and should be adapted to the organization's size, sector, risk, and applicable laws.

> **Framework note:** NIST AI RMF 1.0 is the currently published framework and NIST indicates it is being updated. Check the [NIST AI RMF Resource Center](https://airc.nist.gov/) for current materials. ISO/IEC 42001:2023 is a published management system standard; confirm the current edition and any certification requirements with ISO and an accredited certification body.

## 1. What is an AI governance program?

An AI governance program is the people, decisions, policies, processes, and evidence an organization uses to direct and oversee AI throughout its lifecycle. It connects business goals with accountability, risk management, legal duties, technical controls, and operational monitoring.

Governance helps an organization decide:

- where AI is appropriate and where it should not be used;
- who can approve, build, buy, deploy, monitor, or retire an AI system;
- what evidence is needed before a system is used and while it operates;
- how people can question decisions or report problems; and
- whether the system continues to produce enough value to justify its risks and costs.

An AI governance program is broader than an ethics statement or a committee. It turns principles into repeatable decisions, assigned work, controls, and records.

### Governance, management, and system-level controls

| Level | Main question | Example |
|---|---|---|
| Governance | Who sets direction, risk tolerance, and accountability? | The board approves policy and delegates oversight to an AI governance committee. |
| Program management | How are requirements and decisions applied across the portfolio? | A program team maintains the inventory, review process, training, reporting, and improvement plan. |
| System controls | What safeguards operate for one specific AI use? | A chatbot retrieves only approved information, provides a human escalation path, and is tested before release. |

These levels should work together. Executive sponsorship without system controls is ineffective; system controls without clear ownership and resources are hard to sustain.

## 2. Building blocks of an AI governance program

The blocks below form a practical starting point. Small organizations may combine roles or use shared services, but each responsibility still needs a named owner.

| Building block | What it establishes | Typical evidence |
|---|---|---|
| Leadership mandate and strategy | The business purpose, boundaries, risk appetite, decision authority, and resources for AI | Approved charter, objectives, risk tolerance, and funding |
| Policy and standards | Expectations for acceptable use, development, procurement, data, transparency, security, oversight, and retirement | AI policy, standards, exception process, and review dates |
| Roles and accountability | Decision rights and responsibilities across business, legal, privacy, security, data, engineering, HR, procurement, and operations | RACI or responsibility matrix, committee terms, named system owners |
| AI inventory and intake | Visibility into systems, vendors, use cases, data, lifecycle state, and affected groups | Central AI inventory, intake form, shadow-AI discovery process |
| Risk and impact assessment | A proportionate view of benefits, harms, legal obligations, affected people, and residual risk | Context report, impact assessments, risk register, mitigations, approvals |
| Lifecycle gates and controls | Required reviews before procurement, development, deployment, material changes, and retirement | Go/no-go criteria, design reviews, release evidence, decommission plan |
| Data and model governance | Approved sources, quality, lineage, permissions, model selection, validation, and supplier controls | Data maps, source approvals, model cards, vendor due diligence, contracts |
| Testing and independent assurance | Evidence that the system meets intended requirements and controls work under realistic conditions | TEVV plans and reports, red-team results, fairness and security tests |
| Human oversight and user recourse | Clear human responsibilities, intervention paths, notices, complaints, and appeals where appropriate | User instructions, escalation rules, override logs, support procedures |
| Operations and incident response | Monitoring, issue ownership, containment, remediation, communications, and safe fallback | Metrics, alerts, incident playbooks, service fallback, post-incident review |
| Training and culture | Staff capability to select, use, supervise, challenge, and report on AI appropriately | Role-based learning, completion records, exercises, communications |
| Measurement and improvement | Whether governance is effective and whether systems still deliver intended outcomes | Program scorecard, audits, corrective actions, periodic reviews |

## 3. Successful implementation of the program

### Start from business outcomes and risk

Begin with the organization's mission, customer or employee needs, and the specific problems AI might help solve. Do not begin by buying a tool and searching for a use. Compare AI with simpler alternatives, state expected benefits, identify who could be affected, and define conditions that would make the use unacceptable.

### Put accountability where decisions are made

Give leadership ownership of policy and risk tolerance. Give business owners responsibility for the purpose and outcomes of each system. Give technical, data, legal, privacy, security, risk, and operational specialists clear review responsibilities. Define who can block or pause a release and how disagreements are resolved.

### Use controls proportionate to risk

Apply a consistent baseline to every AI use, then increase review and evidence where the system can materially affect people's rights, safety, money, opportunities, or access to essential services. Risk classification should affect approval authority, testing depth, monitoring, human oversight, and incident readiness.

### Embed governance in existing workflows

Put AI intake into product planning, procurement, architecture review, data access, security review, release management, and vendor oversight. A control that fits an existing workflow is more likely to be used than a separate approval process that teams discover late.

### Build evidence as work happens

Record purpose, assumptions, decisions, data sources, tests, approvals, limitations, changes, and incidents as part of normal delivery. Avoid a last-minute document exercise that does not reflect how the system was built or used.

### Launch in stages and learn

Pilot with defined users, bounded data, limited permissions, human support, and clear stop conditions. Review real feedback and performance before expanding scope. Treat a material change in model, data, user group, integration, or purpose as a reason to reassess.

### Resource the operating model

Assign budget and staff for testing, privacy and security reviews, monitoring, user support, incident response, provider management, and periodic reassessment. Governance is not complete when the system passes a launch gate; it continues for as long as the system and its outputs matter.

## 4. A practical implementation sequence

### Phase 1: Establish the mandate

- Name an executive sponsor and an accountable program lead.
- Agree on the program's scope, decision rights, risk tolerance, and escalation route.
- Map business units, existing controls, legal obligations, and current AI use, including unapproved or embedded vendor AI.
- Set a small number of measurable program objectives.

### Phase 2: Build the foundation

- Approve an AI policy and acceptable-use rules.
- Create an inventory and simple intake process.
- Assign system owners and multidisciplinary reviewers.
- Establish risk tiers, review triggers, and minimum evidence for each tier.
- Provide role-based training and a path to request help or report concerns.

### Phase 3: Operationalize lifecycle controls

- Add review gates to procurement, design, data access, testing, release, and material change processes.
- Define required impact assessments and control plans for higher-risk uses.
- Set requirements for vendors, model changes, data use, security, records, and exit planning.
- Make operational monitoring, incident response, and human fallback ready before launch.

### Phase 4: Measure and improve

- Review both system outcomes and program performance on a regular schedule.
- Audit a sample of systems and decisions for evidence quality and control effectiveness.
- Track exceptions, overdue actions, incidents, complaints, and remediation.
- Revisit policy, risk tiers, training, and resources as laws, technology, and business uses change.

NIST's AI Risk Management Framework provides one voluntary structure for organizing this work through **GOVERN, MAP, MEASURE, and MANAGE**. Its functions are intended to work across the AI lifecycle; they are not a certification or a checklist that automatically proves compliance. ISO/IEC 42001 is a published AI management system standard that organizations may use to structure an AI management system. Standards and frameworks complement applicable law; they do not replace it.

## 5. Translating AI governance into business success

Good governance enables teams to use AI with clearer limits, better evidence, and faster decisions. It can reduce avoidable rework, expose weak business cases early, improve customer trust, and support reliable scaling. It does not guarantee commercial success or remove all risk.

### Connect each control to an outcome

| Governance practice | Business value | Example measure |
|---|---|---|
| Use-case intake and prioritization | Invest in worthwhile uses and avoid duplicate or low-value tools | Share of portfolio tied to an approved business outcome; avoided spend on stopped concepts |
| Clear ownership and decisions | Reduce delays and unresolved handoffs | Median time from intake to decision; number of unresolved ownership gaps |
| Data and supplier review | Reduce operational surprises and unsuitable vendor dependencies | High-priority supplier reviews completed; data issues found before launch |
| Testing and staged release | Catch defects before they affect many users | Critical findings resolved before release; post-launch defect rate |
| User transparency and recourse | Support confidence and make problems easier to correct | Complaint resolution time; user understanding or satisfaction; escalation completion |
| Ongoing monitoring | Detect drift or harm early and protect service quality | Time to detect and contain incidents; share of systems with current metrics |
| Role-based training | Help staff use and supervise AI appropriately | Training completion and assessment results by role; misuse reports and trend |

Avoid treating a low incident count as proof that the program works: issues may be underreported or undetected. Pair outcome measures with evidence that controls operate, users have recourse, and teams learn from near misses.

### FinAssist example

For the repository's proposed FinAssist customer-support chatbot, business success is not simply “more conversations automated.” A balanced outcome set could include:

- shorter wait times for routine questions;
- accurate answers grounded in reviewed banking content;
- successful human escalation for complaints, sensitive matters, and out-of-scope requests;
- no unauthorized transaction capability or unnecessary access to customer data;
- acceptable service availability and accessibility; and
- customer and agent feedback that indicates the service is understandable and useful.

Each target should have an owner, a measurement method, a review cadence, and a threshold that triggers corrective action. Efficiency measures should be considered alongside quality, fairness, safety, privacy, and customer outcomes.

## 6. How to tell whether the program is working

Review the program at both the organization and system levels. Useful questions include:

- Can the organization identify its AI systems, owners, vendors, and intended purposes?
- Are people following the review process early enough to change a design or stop a weak use case?
- Are risk decisions, exceptions, and approvals documented and traceable?
- Are higher-risk systems receiving deeper review, meaningful human oversight, and independent testing?
- Do monitoring and incident procedures work in practice, including during provider outages?
- Can affected people get understandable information, assistance, and a route to challenge or correct an outcome where appropriate?
- Are controls improving business outcomes without creating disproportionate cost or delay?
- Are lessons from incidents, audits, complaints, and staff feedback changing the program?

Use reviews to improve the system and operating model, not only to produce a compliance score.

## Related project references

- [AI Governance Policy](../01-govern/AI-Governance-Policy.md)
- [AI Roles Matrix](../01-govern/AI-Roles-Matrix.md)
- [AI System Inventory](../01-govern/AI-System-Inventory.csv)
- [AI Impact Assessment Template](../01-govern/AI-Impact-Assessment-Template.md)
- [FinAssist AI System Context Report](../02-map/MAP-AI-System-Context-Report.md)
- [TEVV Metrics Framework](../03-measure/MEASURE-TEVV-Metrics-Framework.md)
- [NIST AI RMF Learning Guide](NIST-AI-RMF-Learning-Guide.md)

## Official framework references

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI RMF Core and functions](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)
- [ISO/IEC 42001:2023 — AI management systems](https://www.iso.org/standard/42001)
