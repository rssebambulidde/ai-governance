# EU AI Act: A Plain-Language Guide

### An end-to-end guide for AI governance, product, and compliance practitioners

> **Legal status checked: 24 October 2026.** This guide explains Regulation (EU) 2024/1689 as originally published and highlights changes made by Regulation (EU) 2026/1744 (the AI Omnibus), which entered into force on 27 July 2026. The binding legal texts are the Official Journal publications, not this summary.
>
> **Purpose:** Make the structure and practical meaning of the Act easier to understand. This is educational material, not legal advice, a conformity assessment, or a guarantee of compliance. Verify current law, official guidance, national rules, and the facts of each system.

## Contents

1. [The Act in one minute](#1-the-act-in-one-minute)
2. [What the Act covers](#2-what-the-act-covers)
3. [Main actors and vocabulary](#3-main-actors-and-vocabulary)
4. [Risk-based structure](#4-risk-based-structure)
5. [Prohibited practices](#5-prohibited-practices)
6. [High-risk AI systems](#6-high-risk-ai-systems)
7. [General-purpose AI models](#7-general-purpose-ai-models)
8. [Transparency duties](#8-transparency-duties)
9. [Governance, oversight, and enforcement](#9-governance-oversight-and-enforcement)
10. [Dates and transition periods](#10-dates-and-transition-periods)
11. [Practical compliance walkthrough](#11-practical-compliance-walkthrough)
12. [FinAssist banking example](#12-finassist-banking-example)
13. [Relationship to NIST AI RMF](#13-relationship-to-nist-ai-rmf)
14. [Common misunderstandings](#14-common-misunderstandings)
15. [Glossary](#15-glossary)
16. [Primary sources](#16-primary-sources)

## 1. The Act in one minute

The EU AI Act is a regulation setting harmonised rules for AI systems and, for some obligations, general-purpose AI (GPAI) models. It aims to support trustworthy AI while protecting health, safety, fundamental rights, and other public interests. It classifies uses by risk and assigns duties according to an organization's role.

For a system, ask:

1. Is it within the Act's scope?
2. What is our role: provider, deployer, importer, distributor, or another role?
3. Is the use prohibited, high-risk, subject to transparency duties, or does it involve a GPAI model?
4. Which requirements apply to each role, and from what date?
5. What evidence shows the requirements are met, and how will changes and incidents be handled?

Most duties attach to a specific system, model, intended purpose, and actor. One organization can have different roles across its products and supply chain.

## 2. What the Act covers

### Scope and reach

The Act covers specified actors and activities connected to AI systems and GPAI models placed on the EU market, put into service, or used in the Union. Some duties can reach providers or deployers outside the EU, including where an AI system's output is used in the Union. Article 2 contains the detailed territorial rules and exceptions.

The Act does not replace other law. Data protection, consumer, employment, product-safety, equality, copyright, financial-services, and sector-specific rules can apply at the same time.

### Context matters

Classification is not determined only by the model technology. Consider the intended purpose, who uses the system, who is affected, what decisions it influences, autonomy, and consequences of error. A GPAI model may be used in many downstream systems, and each downstream system may have separate obligations.

### How the Regulation is organized

| Part | What it covers |
|---|---|
| Chapters I–II | Scope, definitions, AI literacy, and prohibited practices |
| Chapter III and Annexes I–VIII | High-risk classification, requirements, roles, conformity, documentation |
| Chapter IV | Transparency duties for specified systems and generated/manipulated content |
| Chapter V and Annexes XI–XIII | GPAI model duties and systemic-risk requirements |
| Chapters VI–IX | Sandboxes, testing, governance, EU database, monitoring, market surveillance |
| Chapters X–XIII | Codes of conduct, confidentiality, penalties, delegated acts, review, application dates |

Annexes are important: they list product-safety legislation and high-risk use areas, and specify documentation and conformity details.

## 3. Main actors and vocabulary

### AI system and GPAI model

Article 3(1) defines an AI system. In everyday terms, it is a machine-based system that operates with some autonomy, can show adaptiveness, and infers from inputs how to generate outputs such as predictions, content, recommendations, or decisions that may influence physical or virtual environments.

A general-purpose AI model is a model with significant generality that can competently perform a wide range of distinct tasks and be integrated into many downstream systems. GPAI is a model-level concept. A GPAI model is not automatically a high-risk AI system; assess the downstream system's intended purpose separately.

### Roles

| Role | Plain-language meaning |
|---|---|
| Provider | Develops an AI system or GPAI model, or has it developed, and makes it available under its name or trademark; carries many design, documentation, quality, and monitoring duties. |
| Deployer | Uses an AI system under its authority in a professional context; has duties such as following instructions, assigning oversight, monitoring, and informing affected people in specified cases. |
| Importer | Places on the EU market a system bearing the name or trademark of a provider established outside the EU. |
| Distributor | Makes a system available in the supply chain without being the provider or importer. |
| Product manufacturer | Places a system on the market or puts it into service with a product under its own name; may become the provider for relevant purposes. |
| Authorised representative | EU-established representative appointed in writing by a provider outside the EU for specified tasks. |

Roles can change. Substantially modifying a high-risk system, changing its intended purpose, or placing it on the market under one's own name can create provider responsibilities (Article 25 and related provisions).

**Intended purpose** is the use for which the provider designed the system, including the context and conditions described in instructions, promotional materials, and technical documentation. A **substantial modification** can affect provider status or trigger a new conformity assessment; apply the legal criteria to the specific change.

## 4. Risk-based structure

| Category | Basic meaning | Typical treatment |
|---|---|---|
| Prohibited practices | Specified practices judged unacceptable | Do not place on the market, put into service, or use, subject to the exact wording and exceptions. |
| High-risk systems | Systems listed in product-safety contexts or specified use areas | Detailed provider and deployer duties, including risk management, documentation, oversight, monitoring, and conformity assessment. |
| Transparency-covered systems | Specified interactions and generated/manipulated content | Inform people or mark outputs in defined circumstances. |
| Other systems | Systems outside the above categories | Fewer AI Act duties in general, but other laws still apply; voluntary codes may matter. |

GPAI model-provider obligations run in parallel. A model can be covered by Chapter V while a system built on it is separately covered by Chapters III or IV.

“Minimal risk” is a convenient shorthand, not a general certification class in the Act. Not being prohibited or high-risk does not mean no law applies.

## 5. Prohibited practices

Article 5 prohibits specified practices. The exact elements and exceptions matter. In summary, the prohibitions include:

- Certain subliminal, manipulative, or deceptive techniques that materially distort behavior and cause or are reasonably likely to cause significant harm.
- Exploiting vulnerabilities linked to age, disability, or a specific social or economic situation to distort behavior and cause significant harm.
- Social scoring by public authorities or on their behalf where it leads to specified unjustified or disproportionate detrimental treatment.
- Individual criminal-risk assessments based solely on profiling or personality traits, subject to the article's wording and exceptions.
- Creating or expanding facial-recognition databases through untargeted scraping of facial images from the internet or CCTV.
- Inferring emotions in workplaces or education, except for specified medical or safety reasons.
- Certain biometric categorisation that infers sensitive characteristics.
- Real-time remote biometric identification in publicly accessible spaces for law enforcement, except under narrow conditions, safeguards, and authorisation procedures.
- Following the 2026 AI Omnibus amendment, AI systems intended to generate or manipulate pornographic or explicitly sexual image, audio, or video content depicting an identifiable person without consent, or child sexual abuse material, subject to the amended text's scope.

There are detailed qualifications. Some law-enforcement biometric uses, for example, are subject to strict necessity, purpose, time/place/person limits, authorisation, and reporting rules. Never infer legality merely because an exception exists; verify every condition and other applicable law.

**Practical step:** Screen against Article 5 before assigning a general risk score. A prohibited use is not made acceptable by adding controls or scoring its likelihood as low.

## 6. High-risk AI systems

### Classification

Article 6 establishes two main routes:

1. **Product-safety route:** The system is a safety component of a product, or is itself a product, covered by legislation in Annex I, and that product requires third-party conformity assessment.
2. **Listed-use route:** The system is intended for an Annex III use area, including specified biometric uses, critical infrastructure, education, employment, essential services, law enforcement, migration/asylum/border management, or administration of justice and democratic processes.

Annex III contains specific use cases. Article 6(3) provides a narrow route for certain Annex III systems that do not pose significant risk of harm and do not materially influence decision outcomes, subject to conditions and documentation. It cannot be used for the specified profiling of natural persons. Providers relying on it must meet Article 6(4)'s requirements, including registration where required.

Classification depends on legal criteria and intended use, not a vendor's label or an organization's internal risk tier. Keep a written rationale covering relevant Annex entries and why they apply or do not apply.

### Provider requirements

For high-risk systems, Chapter III generally requires lifecycle controls including:

- A documented, iterative risk-management system (Article 9).
- Appropriate data and data-governance practices (Article 10).
- Technical documentation and record-keeping/logging capabilities (Articles 11–12 and Annex IV).
- Information and instructions for deployers (Article 13).
- Human oversight that enables people to understand, monitor, and intervene appropriately (Article 14).
- Appropriate accuracy, robustness, and cybersecurity (Article 15).
- Quality management, corrective action, registration, conformity assessment, and applicable declarations/marking (Articles 16–22 and 43–49).
- Post-market monitoring and serious-incident reporting (Articles 72–73).

Specific duties differ by system route, product legislation, conformity path, and actor. Annexes give documentation and assessment detail.

### Deployer requirements

Deployers of high-risk systems generally must:

- Follow provider instructions and assign oversight to people with suitable competence, training, authority, and support (Article 26).
- Monitor operation, retain logs under their control where required, and report risks or serious incidents through applicable channels.
- Ensure input data is relevant and sufficiently representative where the deployer controls it.
- Inform workers and representatives before workplace use where required.
- Give specified notices to affected people in certain contexts.
- Determine whether an Article 27 fundamental-rights impact assessment is required before first use.

Article 27 applies to specified deployers and systems, including certain public bodies, public-service providers, and deployers of listed systems assessing individuals' creditworthiness or risk/price for life and health insurance. The assessment examines the process, duration/frequency, affected groups, risks of harm, oversight, and complaint/redress arrangements. It is distinct from a generic AI impact assessment or a GDPR data-protection impact assessment; more than one assessment may be necessary.

### Conformity and lifecycle

Before a high-risk system is placed on the market or put into service, complete the applicable conformity-assessment procedure. Depending on the route, this can involve internal control or a notified body. Providers maintain the required technical file, declaration, quality processes, and post-market monitoring. Significant changes may trigger reassessment.

Compliance continues after launch: monitor risks, investigate incidents, make corrections, communicate with authorities and supply-chain partners where required, and retain evidence.

## 7. General-purpose AI models

### Model-level obligations

Chapter V (Articles 51–56) imposes duties on GPAI model providers. Broadly, providers prepare and maintain technical documentation, provide specified information to downstream system providers, maintain a policy to comply with EU copyright law, and publish a sufficiently detailed summary of training content, subject to the text's conditions and exceptions.

The Act recognizes specified open-source conditions and other distinctions. “Open weights” alone should not be assumed to remove every obligation. Check the exact Chapter V criteria and carve-outs.

### Models with systemic risk

A GPAI model can be classified as presenting systemic risk under Article 51, including through that article's criteria and thresholds and designation procedures. Providers of such models face additional duties under Article 55, including model evaluation and adversarial testing, systemic-risk assessment and mitigation, serious-incident tracking/reporting, and cybersecurity.

The Commission can update thresholds and guidance. Do not rely on a static parameter-count threshold without checking current measures.

Model-provider compliance does not automatically make downstream uses compliant. A downstream provider must assess its own system, purpose, and any high-risk or transparency obligations.

## 8. Transparency duties

Article 50 sets duties for specified interactions and systems. Depending on the case, these include:

- Telling people they are interacting with AI, unless this is obvious in context.
- Marking certain AI-generated outputs in a machine-readable and detectable way, subject to the provision and technical feasibility.
- Disclosing deepfake image, audio, or video content, with specified exceptions for law enforcement and certain artistic, creative, satirical, fictional, or analogous works subject to appropriate disclosure.
- Informing people when specified emotion-recognition or biometric-categorisation systems are used.

The 2026 amendment adds or modifies transparency-related requirements, including for certain AI-generated or manipulated sexual content. Consult consolidated Article 50 and amended Article 5 rather than relying on an earlier summary.

Article 50 transparency is distinct from high-risk provider information duties under Article 13, data-protection notices, and consumer disclosures. Multiple duties can apply to one product.

## 9. Governance, oversight, and enforcement

### Supervision

The Act establishes EU-level and national enforcement. The European AI Office has responsibilities especially for GPAI obligations and certain cross-cutting matters. Member States designate national competent and market-surveillance authorities for many system duties. The European Artificial Intelligence Board supports coordination. Check the specific provision to identify the responsible authority; this structure does not replace data-protection or sector regulators.

### Monitoring and incidents

The Act provides processes for market surveillance, serious-incident reporting, corrective action, and—in specified cases—complaints and explanations. Establish procedures for incident triage, evidence preservation, user communications, corrective actions, and regulator notification within applicable deadlines.

### Penalties

Article 99 provides administrative-fine ceilings that vary by violation: up to €35 million or 7% of worldwide annual turnover for the most serious category, whichever is higher; up to €15 million or 3% for specified other violations, whichever is higher; and up to €7.5 million or 1% for supplying incorrect, incomplete, or misleading information, whichever is higher. For SMEs and start-ups the applicable maximum is the lower of the amount or percentage. The AI Omnibus made related proportionality/simplification changes for small and mid-cap companies; check amended Article 99 for exact treatment.

These are ceilings, not automatic fines. The infringement, actor, jurisdiction, proportionality, procedural safeguards, and national enforcement rules matter. Other laws can impose separate consequences, including market restrictions, withdrawal, or recall.

### Standards and codes

Harmonised European standards, common specifications, Commission guidelines, and codes of practice can support implementation and may create a presumption of conformity where the Act provides. Their status changes. They do not override the Regulation or automatically prove full compliance.

## 10. Dates and transition periods

This table reflects the position on **24 October 2026**, following Regulation (EU) 2026/1744. Transitional and actor-specific rules may affect a particular system.

| Date | Milestone |
|---|---|
| 1 August 2024 | Regulation (EU) 2024/1689 entered into force. |
| 2 February 2025 | Article 5 prohibitions and Article 4 AI literacy provision began to apply under the original timetable; Article 4 was later amended by the Omnibus. |
| 2 August 2025 | GPAI model obligations and governance provisions began to apply under the staged timetable, subject to transitions. |
| 27 July 2026 | Regulation (EU) 2026/1744 (AI Omnibus) entered into force and amended the Act. |
| 2 August 2026 | General application date, subject to specific exceptions and transition rules. |
| 2 December 2027 | Amended deadline for high-risk obligations under Article 6(2) and Annex III. |
| 2 August 2028 | Amended deadline for high-risk obligations under Article 6(1) and relevant Annex I product legislation. |

Some rules differ for systems or GPAI models already on the market before specified dates. A later deadline for one obligation does not suspend other provisions already in force. Consult the consolidated text and Commission timeline for the precise case.

## 11. Practical compliance walkthrough

This is an organizational aid, not a statutory checklist or guarantee.

1. **Inventory:** Record system/model, version, provider, intended purpose, markets, context, affected groups, data, integrations, human decision points, and suppliers. Identify legal entities and roles.
2. **Scope and law:** Check Article 2, territorial reach, exclusions, and other applicable laws, including GDPR, consumer, employment, product, equality, copyright, financial, and national rules.
3. **Prohibition screen:** Test actual and foreseeable uses against Article 5, including features, incentives, data sources, and deployment context. Escalate possible prohibitions for legal review.
4. **High-risk classification:** Check both Article 6 routes and relevant Annex I and III entries. Document exceptions and reassess if purpose or context changes.
5. **Role mapping:** Map each actor to duties, effective dates, owners, evidence, dependencies, and communications.
6. **Controls and evidence:** Plan risk management, data governance, logs, documentation, oversight, accuracy/robustness/cybersecurity, quality management, conformity, registration, GPAI duties, transparency, and monitoring as applicable.
7. **People and redress:** Assess whether Article 27 FRIA, GDPR DPIA, or another assessment is required. Define human review, complaints, correction, appeal, and incident handling.
8. **Approval and monitoring:** Make release approval depend on applicable conformity and evidence. Monitor actual use, incidents, complaints, changes, drift, and updates to law or standards.
9. **Change and incident management:** Review model updates, retraining, integrations, new groups/geographies, and purpose changes for classification or conformity impact. Maintain regulator and affected-person notification paths.

## 12. FinAssist banking example

The repository's FinAssist AI is a proposed customer-facing generative AI assistant for banking FAQs and support triage. This example identifies questions; it does **not** determine legal classification.

| Question | Example analysis |
|---|---|
| What does it do? | Separate general FAQ responses from personalized financial recommendations, creditworthiness assessment, fraud detection, or decisions affecting access to services. Each function may classify differently. |
| Who provides/deploys it? | Identify bank, model provider, cloud/inference provider, integrator, and white-label supplier. Determine if the bank is only a deployer or also a provider due to development, substantial modification, or marketing under its name. |
| Is it prohibited? | Review planned features against Article 5. A customer-support chatbot is not automatically prohibited; biometric or manipulative features could change the analysis. |
| Is it high-risk? | A banking FAQ assistant is not high-risk solely because a bank uses it. If it assesses natural persons' creditworthiness or establishes their credit score, the Annex III category may apply, subject to the exact text. Assess fraud and customer-support functions separately. |
| Is an FRIA needed? | If the bank deploys a high-risk system in an included category such as covered creditworthiness assessment, check whether Article 27 requires an assessment before first use. |
| What transparency applies? | Determine whether customers must be told they interact with AI, whether content must be marked, and whether sector or consumer rules add disclosures. Make human escalation clear. |
| What controls are sensible? | Keep the system within approved informational use; block unauthorized account actions; ground answers in bank-approved sources; test factuality, prompt injection, privacy leakage, language and accessibility; monitor complaints and failures. These are prudent examples, not a complete list of legal requirements. |
| What evidence is useful? | Keep classification rationale, role map, instructions, assessments, tests, approvals, notices, incident records, metrics, and change history relevant to applicable duties. |

The repository's NIST-aligned risk registers, assessment template, TEVV metrics, and incident playbooks can help organize evidence, but they require supplementation with a provision-by-provision legal assessment.

## 13. Relationship to NIST AI RMF

NIST AI RMF 1.0 is a voluntary framework organized around **GOVERN, MAP, MEASURE, MANAGE**. The EU AI Act is binding legislation with actor-specific duties, prohibitions, conformity routes, authorities, and penalties. They can complement one another but are not interchangeable.

| EU AI Act topic | Helpful NIST connection | Use |
|---|---|---|
| Accountability, roles, policies, literacy | GOVERN | Organize ownership, decision rights, and training evidence. |
| Scope, intended purpose, context, affected people | MAP | Structure system boundaries, context, and stakeholder analysis. |
| Classification, testing, documentation, monitoring | MAP and MEASURE | Link legal classification to evidence, tests, and metrics. |
| Human oversight, incidents, corrective action | GOVERN and MANAGE | Connect oversight, response, and continuous improvement. |
| Provider/deployer duties, conformity, registration, fines | No one-to-one equivalent | Track directly against Act articles, annexes, and authority guidance. |

This crosswalk is a navigation aid only. Completing NIST activities or satisfying a NIST profile does **not** establish conformity with the AI Act. Record and verify the legal source for each obligation independently.

## 14. Common misunderstandings

- **“The Act regulates only high-risk AI.”** Prohibitions, transparency, GPAI, governance, and enforcement provisions also matter.
- **“Every AI tool in a regulated sector is high-risk.”** Apply Article 6 and the exact Annex descriptions to intended purpose and context.
- **“A GPAI model and an AI system are the same.”** Chapter V concerns model providers; downstream systems have separate classifications and duties.
- **“The vendor owns all compliance.”** Duties follow each actor's legal role and conduct.
- **“A risk assessment makes a prohibited use acceptable.”** Controls do not override Article 5.
- **“The original 2024 PDF has current deadlines.”** It records the original publication. Use consolidated EUR-Lex text for amendments.
- **“Later high-risk deadlines mean we can ignore the Act until then.”** Other provisions already apply, and readiness can take time.
- **“NIST alignment equals EU compliance.”** NIST helps organize risk work but does not replace legal analysis or conformity assessment.

## 15. Glossary

| Term | Plain-language meaning |
|---|---|
| AI Act | Regulation (EU) 2024/1689, as amended. |
| AI system | A machine-based system meeting the Article 3(1) definition, considered in intended use and context. |
| GPAI model | A general-purpose AI model capable of a wide range of tasks and integration into downstream systems. |
| High-risk system | A system classified under Article 6 and the relevant annexes. |
| Provider / deployer | Actors making a system/model available under their name / using it under their authority professionally. |
| Conformity assessment | Required process for demonstrating applicable requirements before market placement or use. |
| Post-market monitoring | Ongoing review of performance and risk after market placement or use. |
| FRIA | Fundamental-rights impact assessment required for specified deployers and uses under Article 27. |
| Harmonised standard | A European standard whose application can provide a presumption of conformity for covered requirements where the Act says so. |
| AI Office | European Commission office with AI Act responsibilities, including GPAI oversight and enforcement functions. |

## 16. Primary sources

### Legal texts

- [Original Official Journal PDF: Regulation (EU) 2024/1689](EU-AI-Act-Regulation-2024-1689-Official-Journal.pdf) — the 2024 publication, retained as the historical source text.
- [EUR-Lex consolidated text, current version](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng) — consolidated through 27 July 2026. EUR-Lex explains consolidated texts are documentation tools; authentic acts are those published in the Official Journal.
- [Regulation (EU) 2026/1744, Digital Omnibus on AI](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng) — amending act.
- [Original Official Journal HTML text](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng).

### European Commission guidance

- [AI Act policy and implementation timeline](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
- [Navigating the AI Act: questions and answers](https://digital-strategy.ec.europa.eu/en/faqs/navigating-ai-act)
- [AI Act enforcement framework](https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act)
- [AI literacy questions and answers](https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers)

### Related project references

- [NIST AI RMF 1.0 learning guide](NIST-AI-RMF-Learning-Guide.md)
- [NIST AI RMF Playbook study notes](NIST-AI-RMF-Playbook-Study-Notes.md)
- [AI risk guide](ai-risk-guide.md)
- [Project governance policy](../01-govern/AI-Governance-Policy.md)
- [FinAssist AI context report](../02-map/MAP-AI-System-Context-Report.md)

---

*Document version: 1.0 | Prepared 24 October 2026 | Educational summary of Regulation (EU) 2024/1689 as amended through Regulation (EU) 2026/1744.*
