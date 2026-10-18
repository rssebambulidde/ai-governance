# 📘 NIST AI RMF Playbook — Complete Study Notes
### Source: [AI-RMF-Playbook.pdf](./AI-RMF-Playbook.pdf) | 147 pages

---

> [!IMPORTANT]
> **What is the Playbook?**
> The Playbook provides **suggested actions** for achieving the outcomes in the AI RMF Core. It is:
> - **NOT a checklist** — you don't follow it in its entirety
> - **Voluntary** — borrow as many or as few suggestions as apply to your context
> - **Organized by subcategory** — each of the 72 subcategories has: About · Suggested Actions · Transparency & Documentation · References

---

## Document Structure

| Element | Details |
|---|---|
| **Pages** | 147 |
| **Sections** | 4 (GOVERN, MANAGE, MAP, MEASURE) |
| **Subcategories covered** | 72 total |
| **Per subcategory** | About · Suggested Actions · Transparency & Documentation · AI Transparency Resources · References |

---

## GOVERN — Policies, Culture & Accountability

> *"Policies, processes, procedures and practices across the organization related to the mapping, measuring and managing of AI risks are in place, transparent, and implemented effectively."*

### GOVERN 1.1 — Legal & Regulatory Requirements
**About:** AI systems face nondiscrimination, data privacy, and disclosure legal requirements. Bias-testing processes (e.g., disparate impact) are not uniformly applied legally. The "digital divide" and disability access may create additional legal exposure.

**Key Actions:**
- Maintain awareness of applicable legal/regulatory requirements per industry/sector
- Align risk management with applicable legal standards
- Train staff on legal considerations affecting AI design, development, and deployment

---

### GOVERN 1.2 — Integrating Trustworthy AI into Policies
**About:** Policies, processes, and procedures are the backbone of accountability. Without them, risk management becomes subjective and inconsistent.

**Key Actions:**
- Define key AI terms and scope of purposes
- Connect AI governance to existing enterprise governance and data governance
- Detail standards for: data quality, model training, testing/validation, monitoring, incident response, and change management
- Establish whistleblower policies
- Verify alignment with legal standards and industry best practices

---

### GOVERN 1.3 — Risk Management Based on Risk Tolerance
**About:** Resources are finite. Typical approach: **Risk ≈ Impact × Likelihood**, placed on a scale (e.g., RAG: Red-Amber-Green).

**Key Actions:**
- Define mechanisms for measuring potential impacts at key lifecycle stages
- Define assessment scales (qualitative or econometric)
- Assign AI systems to uniform risk scales across the portfolio
- Acknowledge that risk tolerance changes over the lifecycle

---

### GOVERN 1.4 — Transparent Risk Management Process
**About:** Standardized documentation enhances communication, accountability, replicability, and robustness.

**Key Actions:**
- Document: AI actor contacts, business justification, scope, risks, assumptions, training data, algorithms, test results, deployment plans
- Standardize documentation across the organization
- Create a model documentation inventory
- Establish policies for public disclosure of risk materials (impact assessments, audits, validation results)

---

### GOVERN 1.5 — Ongoing Monitoring & Review
**About:** AI systems are dynamic and can behave unexpectedly post-deployment. Continuous monitoring + incident response plans reduce additive impact during incidents.

**Key Actions:**
- Allocate resources for assessing impacts on individuals, communities, and society
- Establish policies for monitoring bias, security, performance throughout lifecycle
- Define incident response plans (or confirm existing ones cover AI)
- Create mechanisms for impacted communities to provide feedback and seek recourse
- Establish opt-out mechanisms

---

### GOVERN 1.6 — AI System Inventory
**About:** An organized database of AI system artifacts enabling holistic visibility and incident response support.

**Key Actions:**
- Define creation and maintenance policies for the inventory
- Designate a responsible individual/team
- Decide which systems to inventory (preference: all; minimum: high-risk)
- Define attributes to record: documentation, source code links, incident plans, data dictionaries, AI actor contacts

---

### GOVERN 1.7 — Decommissioning AI Systems
**About:** Irregular or indiscriminate termination increases organizational risk (legal, regulatory, forensic).

**Key Actions:**
- Address: user/community concerns, business continuity, system dependencies, regulatory requirements, forensic considerations, migration plans
- Define storage duration and location for decommissioned systems
- Preserve ancillary data (predictions, explanations, credentials)

---

### GOVERN 2.1 — Roles, Responsibilities & Communication
**About:** Risk-aware culture starts with defined responsibilities. Separating development from testing prevents groupthink and sunk-cost fallacy.

**Key Roles to Define:** Boards, Senior Management, AI Audit, Product/Project Management, AI Design/Development, Human-AI Interaction, Testing & Evaluation, Procurement, Impact Assessment, Oversight

**Key Actions:**
- Promote regular communication among AI actors
- Separate development from testing functions for independent course-correction
- Prevent conflicts of interest; counteract confirmation bias and market incentives

---

### GOVERN 2.2 — AI Risk Management Training
**Key Actions:**
- Train all personnel on: laws/regulations, bias/fairness, security, privacy, incident response, ethical AI practices
- Include AI ethics and risk management in ongoing education programs

---

### GOVERN 2.3 — Executive Accountability
**About:** Executive leadership must take final responsibility for AI risk decisions. Without executive buy-in and cultural change, the framework cannot work.

---

### GOVERN 3.1 — DEIA in AI Risk Management
**About:** Diverse teams surface assumptions homogeneous teams miss. They identify risks to underrepresented communities.

**Key Actions:**
- Ensure AI risk decisions involve diverse, interdisciplinary teams
- Include women, minorities, people with disabilities, and domain experts

---

### GOVERN 3.2 — Human-AI Configurations
**About:** Distinguish between AI system overseers and those interacting with AI outputs.

**Key Actions:**
- Define and differentiate human roles when using, interacting with, or monitoring AI
- Establish proficiency standards and training protocols for oversight roles

---

### GOVERN 4.1 — Critical Thinking & Safety-First Culture
**About:** Key mechanisms: "Three lines of defense," "effective challenge" culture, and **red-teaming** (adversarial testing by independent external experts).

**Key Actions:**
- Require inclusion of legal/compliance/risk from the outset of design
- Promote red-teaming and model audits
- Establish whistleblower protections
- Integrate harm-prevention mindset throughout the AI lifecycle

---

### GOVERN 4.2 — Impact Assessments
**About:** Impact assessments drive responsible development and assist go/no-go decisions. Apply iteratively.

**Key Actions:**
- Include perspectives from operators, users, marginalized communities, disabled persons, and those without internet access
- Align with regulatory requirements; use to inform broader risk evaluations

---

### GOVERN 4.3 — Testing, Incident Identification & Information Sharing
**About:** Issues like concept drift, bias, and underspecification are hard to identify with standard testing. Share incidents with the **AI Incident Database**, **AIAAIC**, or **MITRE CVE list**.

**Key Actions:**
- Establish consistent testing policies and procedures
- Establish policies for incident reporting, documentation, and public disclosure

---

### GOVERN 5.1 — External Stakeholder Feedback
**About:** Participatory engagement must include historically excluded populations, disabled persons, and those without internet access. Avoid **"participation washing."**

**Key Actions:**
- Establish mechanisms for: recourse for faulty outputs, bug bounties, human-centered design, UI/UX research, participatory engagement
- Consider publishing or adopting AI principles

---

### GOVERN 5.2 — Incorporating Feedback into System Design
**Key Actions:**
- Explicitly acknowledge AI systems carry inherent costs and risks
- Establish policies for approval/conditional approval/disapproval of AI deployment
- Enable early decommissioning of systems exceeding manageable risk levels

---

### GOVERN 6.1 — Third-Party Risk Policies
**About:** Apply the same governance to third-party resources (data, open-source software, commercial models, hardware) as internal resources.

**Key Actions:**
- Require: transparency into third-party functions, thorough testing, clear usage instructions
- Address supply chain risks including legal, ethical, and procurement issues

---

### GOVERN 6.2 — Third-Party Contingency Processes
**Key Actions:**
- Establish policies for third-party system failure redundancy
- Verify incident response plans explicitly address third-party AI systems

---

## MANAGE — Prioritize, Respond & Improve

> *"AI risks based on assessments and other analytical output from the Map and Measure functions are prioritized, responded to, and managed."*

### MANAGE 1.1 — Go/No-Go Decision
**About:** AI may not be the right solution. Formally weigh negative risks against benefits.

**Key Actions:**
- Consider trustworthiness characteristics when evaluating AI risks and benefits
- Utilize TEVV outputs from MAP and MEASURE
- Regularly track and document performance relative to trustworthiness tradeoffs

---

### MANAGE 1.2 — Prioritize Risks
**Key Actions:**
- Assign risk management resources relative to risk tolerance (higher risk = more resources)
- Document risk tolerance determination practices and resource decisions
- Regularly re-calibrate risk tolerances based on monitoring data

---

### MANAGE 1.3 — Develop Response Plans

**The 4 Risk Response Options:**

| Option | What It Means |
|---|---|
| **Mitigate** | Reduce likelihood or impact of the risk |
| **Transfer** | Share risk via insurance or contracts |
| **Avoid** | Don't deploy, or redesign to eliminate the risk |
| **Accept** | Consciously accept with documented reasoning |

**Key Actions:**
- Prioritize: physical safety, legal liabilities, regulatory compliance, societal impacts
- Store risk management documentation in a secure, accessible repository

---

### MANAGE 1.4 — Document Residual Risks
**Key Actions:**
- Document residual risks (accepted/transferred/minimally mitigated) in risk response plans
- Establish procedures for disclosing residual risks to downstream AI actors
- Inform downstream actors of safe operation requirements and system limitations

---

### MANAGE 2.1 — Consider Non-AI Alternatives
**Key Actions:**
- Establish risk controls including: data/privacy controls, ML security countermeasures, business rules limiting AI outputs, human-AI teaming configurations, standardized documentation
- Establish mechanisms for end-user and affected group feedback

---

### MANAGE 2.2 — Sustain AI System Value
- Apply mechanisms to sustain value over time
- Integrate trustworthiness characteristics into risk controls

---

### MANAGE 2.3 — Respond to Unknown Risks
**Key Actions:**
- Maintain protocols for continual monitoring
- Monitor for drift, decontextualization, and behavioral factors
- Decommission systems exceeding risk tolerances

---

### MANAGE 2.4 — Override/Shut Down AI
**Triggers for bypass/deactivation:**
- System reaches end of lifetime
- Detected risks exceed tolerance thresholds
- Mitigation is beyond organizational capacity
- Regulatory/legal requirements cannot be met
- Imminent risk detected during monitoring

**Key Actions:**
- Regularly review bypass/deactivation procedures
- Identify incident thresholds for activation of bypass/deactivation responses
- Preserve materials for forensic, regulatory, and legal review
- Conduct root cause analysis after bypass/deactivation events

---

### MANAGE 3.1 — Monitor Third-Party AI Systems
**Key Actions:**
- Apply organizational risk tolerance to all third-party AI systems
- Establish TEVV processes for third-party systems
- Establish processes for third parties to report vulnerabilities or biases
- Decommission third-party systems exceeding risk tolerances

---

### MANAGE 3.2 — Monitor Pre-Trained Models
**About:** Transfer learning can introduce unexpected negative impacts and hinder root cause analysis.

**Key Actions:**
- Identify pre-trained models in AI system inventory for risk tracking
- Independently and continuously monitor performance and trustworthiness
- Decommission models exceeding risk tolerances

---

### MANAGE 4.1 — Post-Deployment Monitoring
**Key Actions:**
- Perform post-deployment TEVV: validity, reliability, bias, fairness, privacy, security
- Establish red-teaming exercises at prescribed cadence
- Share information about errors, near-misses, and attack patterns with incident databases

---

### MANAGE 4.2 — Continuous Improvement
**Key Actions:**
- Integrate trustworthiness characteristics into continual improvement protocols
- Align proposed improvements with regulatory frameworks and contextual values
- Maintain traceability and transparency for developers, end users, and auditors

---

### MANAGE 4.3 — Incident Communication & Tracking
**Key Actions:**
- Share information about errors/incidents/negative impacts with all relevant stakeholders
- Maintain a database of: reported errors, near-misses, incidents, impact assessments, responses
- Maintain version history and system change logs for continuous improvement

---

## MAP — Context & Risk Identification

> *"Context is established and understood."*

### MAP 1.1 — Document Intended Purpose & Context
**About:** Highly accurate systems can cause harm. Expect AI to be reused, repurposed, and misused regardless of intent. Context mapping is the first step.

**Context Mapping Elements:**
- Intended purpose and impact, concept of operations
- Intended and actual deployment settings
- End user and operator expectations
- Potential negative impacts on individuals, groups, communities, organizations, society
- Unanticipated, downstream, or unknown contextual factors
- Post-decommissioning impacts

**Key Actions:**
- Examine trustworthiness and consider non-AI solutions
- Define expected/acceptable context of use (social norms, impacted populations, operational environment)
- Identify human-AI interaction roles: does AI support or replace human decision-making?

---

### MAP 1.2 — Diverse & Interdisciplinary Team
- Ensure context-establishing team is interdisciplinary and demographically diverse
- Include community groups and external parties in defining acceptable deployment bounds

---

### MAP 1.3 — Organizational Mission & AI Goals
**Key Actions:**
- Review system purpose from a socio-technical and societal values perspective
- Identify misalignment between societal values and organizational ethics
- Flag latent incentives that may contribute to negative impacts

---

### MAP 1.4 — Business Value & Context of Use
- Document business value or context of use
- Reconcile system purpose with organizational values, mission, and AI principles

---

### MAP 1.5 — Risk Tolerances
**About:** Go/no-go decisions must be independent from stakeholders' financial interests. If mapping risk is prohibitively difficult, "no-go" may be necessary.

**Key Actions:**
- Establish risk tolerance levels and allocate oversight resources accordingly
- Identify maximum allowable risk tolerance (above which: don't deploy or decommission)
- Document tradeoffs across trustworthiness characteristics
- Review "off-label" uses and document decisions

---

### MAP 1.6 — System Requirements with Socio-Technical Implications
**About:** Without requirements elicitation, teams rely on implicit biases (confirmation bias, groupthink) and overlook societal impacts.

**Key Actions:**
- Proactively incorporate trustworthy characteristics into system requirements
- Follow responsible design techniques: PRDs, user stories, UI/UX research, ethnography
- Conduct user research to understand impacted individuals and communities

---

### MAP 2.1 — Define the AI Task
- Define and document learning task(s), assumptions, and limitations
- Be specific: classifier, recommender, generator?

---

### MAP 2.2 — Document Knowledge Limits & Human Oversight
**About:** Early decisions shape later behavior. Downstream decisions can be influenced by end-user over-trust or under-trust.

**Key Actions:**
- Document settings and conditions outside the system's intended use
- Plan and test human-AI configurations under near-real-world conditions
- Document dependencies on upstream data and other AI systems
- Document connections to external networks, financial markets, and critical infrastructure

---

### MAP 2.3 — Scientific Integrity & TEVV Planning
**About:** Traditional testing is designed for static systems — AI requires socio-technical testing. Dataset reuse can create disconnects from social contexts and time periods.

**Key Actions:**
- Develop TEVV protocols for models, systems, subcomponents, and operations
- Document assumptions used in data selection, curation, preparation, and analysis
- Identify causal discovery methods to infer causal relationships in constructs being modeled
- Establish processes to check for emergent properties (unexpected capabilities)
- Work with domain experts to understand and manage systemic/computational/human-cognitive bias

---

### MAP 3.1 — Document Potential Benefits
- Use participatory approaches and engage end users
- Consider performance relative to human baseline metrics

---

### MAP 3.2 — Document Potential Costs
**4 Questions to Examine:**
- Who could be harmed? | What could be harmed? | When could harm arise? | How could harm arise?

**Key Actions:**
- Perform context analysis for potential negative impacts from missing trustworthiness characteristics
- Regularly evaluate failure costs to inform go/no-go decisions

---

### MAP 3.3 — Specify Application Scope
**About:** Narrow scopes enable better risk management. Large language models with open-ended public interaction = hard to manage. Task-specific chatbot = easier to manage.

- Consider narrowing deployment contexts
- Document scope: what the system is and is not designed to do

---

### MAP 3.4 — Operator Proficiency Requirements
- Define operator proficiency requirements and certifications
- Define suggested warning labels for the system
- Inform downstream AI actors of safe operation requirements

---

### MAP 3.5 — Human Oversight Processes
**About:** In high-stakes/high-risk systems, evaluate oversight effectiveness BEFORE deployment.

**Key Actions:**
- Identify and document features requiring human oversight
- Develop training materials about system performance, limitations, and warning labels
- Evaluate oversight practices for validity and reliability
- Verify model documents contain interpretable descriptions for oversight personnel

---

### MAP 4.1 — Map Third-Party AI & Legal Risks
**About:** Pre-trained models raise concerns about privacy, bias, unanticipated effects, reproducibility, and scientific validity.

**Key Actions:**
- Review audit reports, terms of service, and contracts from third parties
- Review software release schedules for irregularities
- Inventory all third-party material: hardware, open-source software, foundation models, proprietary data

---

### MAP 4.2 — Internal Risk Controls for Components
- Track third parties preventing risk-mapping as indicators of increased risk
- Supply model documentation templates and software safelists
- Apply traditional technology risk controls (procurement, security, data privacy) to acquired third-party tech

---

### MAP 5.1 — Likelihood & Magnitude of Impacts
- Establish assessment scales (RAG, or simulations/econometrics)
- Apply TEVV regularly at key lifecycle stages
- Establish red-teaming processes to identify and connect limitations to lifecycle stages

---

### MAP 5.2 — Ongoing Stakeholder Engagement
**About:** AI systems are socio-technical and can have impacts far beyond their stated purpose. Stakeholders should be engaged continuously post-deployment.

**Key Actions:**
- Establish stakeholder engagement at earliest stages of formulation
- Employ value sensitive design (VSD) to identify misalignments between organizational and societal values
- Identify an independent team to assess system benefits and impacts
- Develop TEVV procedures incorporating socio-technical elements

---

## MEASURE — Quantify & Evaluate Risks

> *"Appropriate methods and metrics are identified and applied."*

### MEASURE 1.1 — Select Methods & Metrics
**About:** What should be measured depends on the purpose, audience, and needs of evaluations. The AI landscape is evolving, so metrics must evolve too.

**Key Actions:**
- Establish approaches for detecting, tracking, and measuring known risks and incidents
- Define acceptable performance limits and course-correction suggestions
- Identify transparency and accountability metrics
- Document metric selection criteria including considered but unused metrics
- Document risks that cannot be measured and justify why

---

### MEASURE 1.2 — Assess Metric Appropriateness Regularly
**About:** Different AI tasks need different evaluation techniques. Data drift and model drift require re-assessment.

**Key Actions:**
- Assess external validity of all measurements
- Develop new metrics when existing ones are insufficient
- Collect software quality metrics: bug occurrence rates, severity, time to response/repair

---

### MEASURE 1.3 — Independent Assessors
**About:** Current AI systems are brittle. Local evaluations alone are insufficient. Independent assessors provide a fuller picture.

**Key Actions:**
- Utilize separate testing teams established in GOVERN 2.1 and 4.1
- Plan and evaluate AI system prototypes with end-user populations early and continuously
- Assess independence and stature of TEVV actors

---

### MEASURE 2.1 — Document TEVV Details
- Leverage existing best practices (Model Cards, Datasheets for Datasets)
- Document all measurement approaches, test sets, metrics, processes, and materials

---

### MEASURE 2.2 — Human Subjects Evaluations
**About:** Evaluations using human subjects must follow legal protections (e.g., IRB requirements). Non-representative data leads to inaccurate assessments.

**Key Actions:**
- Follow informed consent and compensation requirements
- Utilize disaggregated evaluation methods (by race, age, gender, ethnicity, ability, region)
- Evaluate data representativeness via: failure modes, bias testing, chaos engineering, stakeholder feedback

---

### MEASURE 2.3–2.13 — Evaluate Each Trustworthiness Characteristic

| Subcategory | Focus |
|---|---|
| **2.3** | Performance/assurance under realistic deployment conditions |
| **2.4** | Continuous production monitoring |
| **2.5** | Generalizability limits and reliability |
| **2.6** | Safety risks; fail-safe capability |
| **2.7** | Security and resilience |
| **2.8** | Transparency and accountability |
| **2.9** | Model explanations and interpretability validation |
| **2.10** | Privacy risks |
| **2.11** | Fairness and bias |
| **2.12** | Environmental impact of training and management |
| **2.13** | Effectiveness of TEVV processes (meta-measurement) |

---

### MEASURE 3.1 — Track Existing & Emergent Risks
- Regularly identify and track existing, unanticipated, and emergent risks
- Create feedback channels for end users and impacted communities

---

### MEASURE 3.2 — Address Hard-to-Measure Risks
- Use alternative tracking approaches for risks that cannot be directly measured
- Document and justify which risks are not measured

---

### MEASURE 3.3 — Feedback Channels for Users
- Create accessible feedback mechanisms for end users and impacted communities
- Incorporate feedback into risk tracking and improvement cycles

---

### MEASURE 4.1 — Connect Measurement to Deployment Context
- Consult domain experts when connecting measurements to deployment context
- Evaluate real-world applicability of all measurements

---

### MEASURE 4.2 — Validate with External Actors
- Validate measurement results with external AI actors
- Track and document performance changes over time

---

### MEASURE 4.3 — Identify Measurable Improvements
- Use field data and community input to identify improvements or declines
- Incorporate quantitative, qualitative, and mixed methods in impact assessment

---

## Key Software Tools Referenced

| Category | Tools |
|---|---|
| **Explainable Models** | PiML, Interpret, Iml |
| **Performance Assessment** | Drifter, Manifold, SALib, What-If Tool, MLextend |
| **Bias Testing & Mitigation** | AI Fairness 360 (Python & R) |
| **ML Security** | Adversarial-robustness-toolbox, Robustness, tensorflow/privacy, NIST De-identification Tools |
| **MLOps/Deployment** | DVC, Gigantum, MLflow, MLMD, ModelDB |

---

## Key Frameworks Referenced

| Framework | Purpose |
|---|---|
| **NIST Cybersecurity Framework** | Security guidance for AI |
| **NIST Privacy Framework** | Privacy guidance for AI |
| **NIST SP 1270** | Identifying & Managing Bias in AI |
| **GAO-21-519SP** | AI Accountability Framework for Federal Agencies |
| **IEEE 1012** | System/Software/Hardware Verification & Validation |
| **ISO 9241-210** | Human-centered design for interactive systems |
| **ISO 31000** | Risk management principles |
| **SR 11-7 (Federal Reserve)** | Model Risk Management guidance |

---

## Quick Recall Summary

```
PLAYBOOK = HOW to implement each AI RMF subcategory

For each of the 72 subcategories:
  ABOUT       → Why it matters (context, risks)
  ACTIONS     → What to do (suggested steps)
  DOCUMENT    → What to write down (transparency prompts)
  RESOURCES   → AI Transparency Resources
  REFERENCES  → Academic papers, standards, tools

4 FUNCTIONS:
  GOVERN  (19 subcategories) → Culture, policies, accountability
  MANAGE  (13 subcategories) → Prioritize, respond, recover
  MAP     (18 subcategories) → Context, identification, framing
  MEASURE (22 subcategories) → Quantify, evaluate, track

KEY PRINCIPLES THROUGHOUT:
  ✓ Risk ≈ Impact × Likelihood
  ✓ Voluntary — borrow what fits your context
  ✓ Not a checklist — iterative, continuous process
  ✓ Socio-technical — technical AND human/societal factors
  ✓ Go/no-go decisions at key lifecycle stages
  ✓ Independent assessment > self-assessment
  ✓ Decommission if risks exceed tolerance
```

---
*Study notes compiled from complete reading of AI-RMF-Playbook.pdf (147 pages, NIST, 2024)*

