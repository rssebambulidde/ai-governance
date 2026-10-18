# 🧠 NIST AI Risk Management Framework (AI RMF 1.0)
### Your Complete Learning Guide — Simplified & Comprehensive

> **Source Document:** NIST AI 100-1 | Published: January 2023 | 48 Pages → Distilled here for easy learning
> 
> **What is this?** A U.S. government framework to help organizations responsibly design, build, deploy, and use AI systems by systematically identifying and managing their risks.

---

## 📋 Table of Contents

| Section | Topic |
|---|---|
| [🌐 Big Picture](#-big-picture-what-is-the-ai-rmf) | What it is, why it exists, key definitions |
| [⚠️ Part 1A — Framing Risk](#%EF%B8%8F-part-1a-framing-risk) | What AI risk means + the 4 challenges |
| [👥 Part 1B — Audience & AI Actors](#-part-1b-audience--ai-actors) | Who should use this framework |
| [✅ Part 1C — Trustworthy AI (7 Characteristics)](#-part-1c-trustworthy-ai--the-7-characteristics) | The core qualities of safe, ethical AI |
| [⚙️ Part 2 — The Core: GOVERN, MAP, MEASURE, MANAGE](#%EF%B8%8F-part-2--the-ai-rmf-core-the-4-functions) | The actionable framework functions |
| [🗺️ AI RMF Profiles](#%EF%B8%8F-ai-rmf-profiles) | Customizing the framework for your context |
| [📊 Appendix Highlights](#-appendix-highlights) | AI actors, AI vs. traditional software risks, Human-AI interaction |
| [🎓 Quick-Study Cheatsheet](#-quick-study-cheatsheet) | Single-page recall reference |
| [🔑 Key Vocabulary Glossary](#-key-vocabulary-glossary) | Definitions of all important terms |

---

## 🌐 Big Picture: What is the AI RMF?

### The Problem It Solves

AI is powerful — but different from traditional software. It can:
- Be trained on data that **changes over time** unexpectedly
- Produce **hard-to-predict failures** in real-world settings
- Amplify **societal biases** at massive scale
- Have **complex interactions** between technical design and human behavior

Existing software risk frameworks (cybersecurity, privacy) don't fully address these AI-specific challenges. The AI RMF fills that gap.

### The Goal

> "Offer a resource to organizations designing, developing, deploying, or using AI systems to help manage the many risks of AI and promote trustworthy and responsible development and use."

### Key Characteristics of the Framework

| Feature | What It Means |
|---|---|
| **Voluntary** | No one is forced to use it — it's guidance, not law |
| **Non-prescriptive** | Tells you *what outcomes* to achieve, not *exactly how* to do it |
| **Flexible** | Works for any sector, any size organization |
| **Living Document** | Will be updated as AI evolves (next formal review: by 2028) |
| **Use-case agnostic** | Applies across all industries and AI applications |
| **Rights-preserving** | Designed to protect civil liberties and human rights |

### What an "AI System" Means in This Framework

> An **AI system** is *"an engineered or machine-based system that can, for a given set of objectives, generate outputs such as predictions, recommendations, or decisions influencing real or virtual environments"* — operating with varying levels of autonomy.

### The Two-Part Structure at a Glance

```
NIST AI RMF 1.0
│
├── PART 1: Foundational Information
│   ├── 1. Framing Risk (what is risk + 4 key challenges)
│   ├── 2. Audience (who uses this + AI actor roles)
│   └── 3. AI Trustworthiness (7 characteristics of good AI)
│
└── PART 2: Core & Profiles
    ├── The Core (4 Functions: GOVERN → MAP → MEASURE → MANAGE)
    └── Profiles (customized implementations for specific contexts)
```

---

## ⚠️ Part 1A: Framing Risk

### What Is "Risk" in AI?

**Risk = Probability of an event × Magnitude of its consequences**

Risk can be:
- **Positive** (opportunities) or **Negative** (threats/harms)
- **Short-term** or **Long-term**
- **High probability** or **Low probability**
- **Systemic** (widespread) or **Localized** (narrow)
- **High-impact** or **Low-impact**

**Who can be harmed?**
Individuals → Groups → Communities → Organizations → Society → Environment → Planet

> [!IMPORTANT]
> Risk management doesn't aim to *eliminate* all risk (impossible and counterproductive) — it aims to **minimize negative impacts** and **maximize positive impacts**.

---

### The 4 Key Challenges in AI Risk Management

#### Challenge 1: 🔬 Risk Measurement
Measuring AI risks is hard because:

| Problem | Explanation |
|---|---|
| **Third-party data/systems** | You use external data/models whose risk metrics may not align with yours |
| **Emergent risks** | New risks appear over time that weren't foreseeable at design time |
| **No consensus metrics** | There's no universal standard for measuring AI risk or trustworthiness |
| **Context dependency** | Lab measurements ≠ real-world performance |
| **Opacity / "Black boxes"** | If you can't explain the model, you can't measure its risk well |
| **Human baseline problem** | Hard to compare AI decisions to human decisions fairly |

#### Challenge 2: ⚖️ Risk Tolerance
- **Risk tolerance** = How much risk an org is *willing to accept* to achieve its goals
- It is **NOT prescribed** by the framework — you define your own
- Tolerance is influenced by: laws/regulations, industry norms, organizational values
- It **changes over time** as AI evolves
- Where risk tolerances are unresolved, the framework may not yet be fully applicable

> [!TIP]
> **Practical Guidance:** If your sector has existing risk guidelines, follow those. If not, *define reasonable tolerance yourself*, then use this framework to document and manage risks within that tolerance.

#### Challenge 3: 🎯 Risk Prioritization
Not all risks are equal. Here's the prioritization logic:

```
⬆ HIGHEST PRIORITY (most urgent)
│  → Risks causing imminent, severe, or catastrophic harm
│  → AI systems interacting directly with humans
│  → Systems trained on sensitive/personal data
│  → Systems with direct or indirect human impact
│
⬇ LOWER PRIORITY (but still monitor)
│  → AI systems interacting only with other machines
│  → Systems trained on non-sensitive, environmental data
│  → Lower-risk, specific-context applications
```

> [!WARNING]
> If an AI system presents **unacceptable risk** (severe harm imminent, catastrophic risk), **stop development or deployment** until risks are sufficiently managed.

**Residual Risk** = Risk remaining *after* risk treatment. Must be documented and disclosed to end users.

#### Challenge 4: 🏢 Organizational Integration
- AI risks should NOT be managed in isolation — integrate with **enterprise risk management**
- Treat AI risks alongside cybersecurity and privacy risks for better outcomes
- **Senior leadership** must own AI risk decisions — culture change often required
- Small/medium organizations face different challenges than large ones

---

## 👥 Part 1B: Audience & AI Actors

### Who Should Use This Framework?

Anyone involved in the **AI lifecycle**: designers, developers, deployers, evaluators, users, and even society.

### The AI Lifecycle Dimensions (OECD Model, adapted by NIST)

```
┌─────────────────────────────────────────┐
│           PEOPLE & PLANET               │  ← Center: human rights, societal well-being
│                                         │
│  ┌─────────────────────────────────┐    │
│  │      Application Context        │    │  ← Where/how the AI is used
│  │  ┌───────────────────────────┐  │    │
│  │  │     Data & Input          │  │    │  ← Training data, inputs
│  │  │  ┌─────────────────────┐  │  │    │
│  │  │  │    AI Model         │  │  │    │  ← Algorithms, model training
│  │  │  │  ┌───────────────┐  │  │  │    │
│  │  │  │  │ Task & Output │  │  │  │    │  ← Outputs, decisions, predictions
│  │  │  │  └───────────────┘  │  │  │    │
│  │  │  └─────────────────────┘  │  │    │
│  │  └───────────────────────────┘  │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### AI Actors and Their Roles

| AI Actor | What They Do |
|---|---|
| **AI Designers** | Plan, design, collect/clean data; set objectives & requirements |
| **AI Developers** | Build models; train, calibrate, select algorithms |
| **AI Deployers** | Launch systems; check compatibility, regulatory compliance, user experience |
| **Operators/Monitors** | Run the system day-to-day; track performance and outputs |
| **TEVV Specialists** | Test, Evaluate, Verify, and Validate systems throughout lifecycle |
| **Human Factors Experts** | UX/UI, user research, human-centered design |
| **Domain Experts** | Provide industry-specific knowledge to guide design and interpret outputs |
| **Impact Assessors** | Assess accountability, bias, safety, liability, and legal exposure |
| **Procurement Officers** | Acquire AI from third parties; evaluate vendor risk |
| **Governance/Oversight** | Senior leadership, Board-level accountability for AI risks |
| **Third-party Entities** | External vendors of models, data, or AI services |
| **End Users** | Those who actually use the AI system |
| **Affected Communities** | People impacted by AI decisions (may never interact with the AI directly) |
| **General Public** | Ultimately experiences AI's benefits and harms |

> [!NOTE]
> **TEVV (Test, Evaluation, Verification, Validation)** runs *throughout the entire lifecycle* — not just at the end. It's a continuous process of checking that the AI does what it should, safely and ethically.

---

## ✅ Part 1C: Trustworthy AI — The 7 Characteristics

This is one of the most important sections. These 7 characteristics define what "good AI" looks like. Think of them as **qualities every AI system should strive for**, though tradeoffs between them are inevitable.

> **The Architecture of Trustworthiness:**
> - **Valid & Reliable** is the *foundation* (necessary for everything else)
> - **Accountable & Transparent** is *cross-cutting* (applies to all other characteristics)
> - The other 5 are distinct but interdependent

---

### 1️⃣ Valid and Reliable

| Concept | Plain-English Meaning |
|---|---|
| **Validity** | The system does what it was *intended* to do, confirmed by objective evidence |
| **Reliability** | The system *keeps* doing it correctly over time and across conditions |
| **Accuracy** | Results are close to truth (consider false positive/negative rates) |
| **Robustness/Generalizability** | System works well even in unexpected or edge-case situations |

**Think of it this way:** A valid, reliable AI is like a weighing scale that gives the correct weight today, tomorrow, for heavy objects, light objects, in heat, and in cold.

> [!IMPORTANT]
> Accuracy must always be measured with realistic test sets that represent *actual deployment conditions*, not just the training environment.

---

### 2️⃣ Safe

AI systems should not endanger human life, health, property, or the environment.

**How to promote safety:**
- ✅ Responsible design and development practices from day one
- ✅ Clear documentation of risks for deployers
- ✅ Rigorous simulation and in-domain testing before launch
- ✅ Real-time monitoring during operation
- ✅ Ability to **shut down or override** systems that deviate from intended behavior
- ✅ Take cues from established safety frameworks in transportation, healthcare, etc.

> "Safety risks that pose a potential risk of serious injury or death call for the most urgent prioritization."

---

### 3️⃣ Secure and Resilient

| Concept | Meaning |
|---|---|
| **Security** | Prevents unauthorized access; maintains confidentiality, integrity, availability |
| **Resilience** | Recovers from unexpected adverse events; degrades *safely and gracefully* |

**Key security threats for AI:**
- **Adversarial examples** — inputs designed to fool the AI
- **Data poisoning** — contaminating training data
- **Model extraction** — stealing the model or its training data via the API

> [!TIP]
> Reference the **NIST Cybersecurity Framework** and **NIST Risk Management Framework** for detailed security guidance that applies here.

**Security ⊃ Resilience**: Security includes resilience + prevention + protection + response + recovery.

---

### 4️⃣ Accountable and Transparent

These two are inseparable:
- **Transparency** = Information about the AI system and its outputs is *accessible* to those interacting with or affected by it
- **Accountability** = Someone can be held responsible for AI outcomes (requires transparency first)

**What should be transparent?**
- Design decisions and assumptions
- Training data choices
- Model structure and behavior
- Intended use cases
- Who made deployment decisions and when
- How the system notifies users of errors or adverse outcomes

> [!NOTE]
> A transparent system is **not automatically** an accurate, fair, private, or secure system — but it's very hard to verify *any* of those characteristics in an opaque system.

---

### 5️⃣ Explainable and Interpretable

| Concept | Meaning |
|---|---|
| **Explainability** | You can describe *why* the AI produced a particular output (post-hoc) |
| **Interpretability** | You can understand *how* the AI makes decisions (in-model) |

These matter because:
- They enable trust and meaningful human oversight
- They help identify and fix biases
- They are required for legal/regulatory compliance in many domains (e.g., credit decisions)
- They allow affected parties to contest or appeal AI decisions

**The tension:** More accurate models (like deep neural networks) are often less interpretable. This is a real tradeoff to manage.

---

### 6️⃣ Privacy-Enhanced

Privacy refers to norms and practices that safeguard human autonomy, identity, and dignity — including:
- Freedom from intrusion
- Limiting observation
- Individual consent and control over their data

**Privacy risks in AI:**
- AI can infer private information from non-private data
- Aggregating data can re-identify "anonymized" individuals
- Privacy-enhancing techniques (PETs) may reduce accuracy

**Tools:** Data minimization, de-identification, aggregation, differential privacy, federated learning

> [!WARNING]
> Privacy tradeoffs with accuracy are real. Under data-sparse conditions, privacy-enhancing techniques can reduce accuracy — which can in turn affect fairness decisions.

---

### 7️⃣ Fair — with Harmful Bias Managed

Fairness in AI means addressing **equality and equity** by managing harmful bias and discrimination.

**The 3 Types of AI Bias (NIST's categorization):**

| Bias Type | Description | Example |
|---|---|---|
| **Systemic** | Embedded in data, organizational norms, and broader societal structures | Historical hiring data reflecting past gender discrimination |
| **Computational/Statistical** | Systematic errors from non-representative samples or algorithmic processes | Training only on one demographic group |
| **Human-Cognitive** | How humans perceive, interpret, or use AI outputs to make decisions | Automation bias — over-trusting AI recommendations |

> [!IMPORTANT]
> **Managing bias ≠ achieving fairness.** A system with statistically balanced predictions across demographic groups may still be inaccessible to people with disabilities, or may exacerbate existing systemic disparities.

**Key insight:** Bias is not always harmful, and is often unintentional. But AI *amplifies* bias at massive speed and scale, making proactive management essential.

---

### The Tradeoffs Map

```
TRUSTWORTHINESS CHARACTERISTICS — KNOWN TENSIONS

Interpretability  ←→  Accuracy
Privacy           ←→  Transparency
Privacy           ←→  Accuracy (especially with sparse data)
Fairness          ←→  Accuracy (group vs. individual fairness)
Security          ←→  Transparency (revealing model info = security risk)
```

> **Rule of thumb:** A comprehensive risk management approach *balances* these tradeoffs in context. There is no universal "right answer" — it depends on values, use case, and affected stakeholders.

---

## ⚙️ Part 2 — The AI RMF Core: The 4 Functions

This is the operational heart of the framework. Think of it as a **continuous management cycle**, not a one-time checklist.

```
                    ┌─────────────────────────────────────┐
                    │                                     │
                    │          ╔═══════════╗              │
                    │          ║  GOVERN   ║              │
                    │          ║ (Culture) ║              │
                    │          ╚═════╤═════╝              │
                    │                │ cross-cuts all     │
          ┌─────────┴────┐     ┌─────┴──────┐     ┌──────┴──────┐
          │     MAP      │────►│  MEASURE   │────►│   MANAGE    │
          │  (Context)   │     │ (Evaluate) │     │  (Act/Fix)  │
          └─────────┬────┘     └────────────┘     └─────────────┘
                    │                                     ▲
                    └─────────────────────────────────────┘
                              (iterative feedback loop)
```

### How the Functions Relate

1. **GOVERN** sets the culture, policies, and accountability structures — it *permeates everything*
2. **MAP** identifies and contextualizes risks — the starting point for a specific AI system
3. **MEASURE** quantifies and evaluates those risks with metrics and testing
4. **MANAGE** takes action on measured risks — responding, prioritizing, and improving

> [!NOTE]
> Start with GOVERN (always), then typically MAP → MEASURE → MANAGE. But the process is **iterative** — revisit and cross-reference between functions as needed.

---

## 🏛️ Function 1: GOVERN

**Purpose:** Build and sustain an organizational culture that takes AI risk seriously.

GOVERN is the **only function that applies at all times** — it's not tied to a specific AI system. It sets up the systems, structures, teams, and norms that make risk management possible.

### The 6 GOVERN Categories (with Subcategories)

#### GOVERN 1 — Policies & Processes in Place

| Subcategory | What It Means |
|---|---|
| **GOVERN 1.1** | Understand and document all legal/regulatory requirements affecting your AI |
| **GOVERN 1.2** | Integrate all 7 trustworthiness characteristics into org policies |
| **GOVERN 1.3** | Define what level of risk management is needed based on your risk tolerance |
| **GOVERN 1.4** | Make risk management transparent through documented policies |
| **GOVERN 1.5** | Plan for ongoing monitoring and define who is responsible for periodic reviews |
| **GOVERN 1.6** | Maintain an inventory of all AI systems, resourced by risk priority |
| **GOVERN 1.7** | Have a safe decommissioning process for retiring AI systems |

#### GOVERN 2 — Accountability Structures

| Subcategory | What It Means |
|---|---|
| **GOVERN 2.1** | Document roles, responsibilities, and communication lines for AI risk management |
| **GOVERN 2.2** | Provide AI risk management training to all relevant personnel and partners |
| **GOVERN 2.3** | Executive leadership takes **final responsibility** for AI risk decisions |

> [!IMPORTANT]
> AI risk management doesn't work without **executive buy-in and cultural change**. The framework must be championed from the top.

#### GOVERN 3 — Diversity, Equity, Inclusion & Accessibility (DEIA)

| Subcategory | What It Means |
|---|---|
| **GOVERN 3.1** | AI risk decisions involve diverse teams (demographics, disciplines, experiences) |
| **GOVERN 3.2** | Define human-AI configurations and oversight roles clearly |

**Why diversity matters for AI risk:** Diverse teams surface assumptions that homogeneous teams miss. They identify risks to communities that may not be represented by the team building the AI.

#### GOVERN 4 — Risk-Aware Culture

| Subcategory | What It Means |
|---|---|
| **GOVERN 4.1** | Foster a "safety-first, critical thinking" mindset in all AI work |
| **GOVERN 4.2** | Document and communicate risks and potential impacts of AI projects |
| **GOVERN 4.3** | Enable testing, incident identification, and information sharing |

#### GOVERN 5 — Stakeholder Engagement

| Subcategory | What It Means |
|---|---|
| **GOVERN 5.1** | Collect and integrate feedback from *external* stakeholders about AI impacts |
| **GOVERN 5.2** | Create mechanisms to incorporate adjudicated external feedback into AI design |

#### GOVERN 6 — Third-Party and Supply Chain Risk

| Subcategory | What It Means |
|---|---|
| **GOVERN 6.1** | Address risks from third-party data, software, IP violations |
| **GOVERN 6.2** | Have contingency plans for failures in high-risk third-party AI systems |

---

## 🗺️ Function 2: MAP

**Purpose:** Understand the *context* of your AI system to identify and frame its risks.

MAP is the **starting point for any specific AI system** — it builds the contextual knowledge that MEASURE and MANAGE will act on. Without MAP, risk management is blind.

> "Without contextual knowledge and awareness of risks within the identified contexts, risk management is difficult to perform."

### The 5 MAP Categories

#### MAP 1 — Establish Context

| Subcategory | What It Means |
|---|---|
| **MAP 1.1** | Document intended uses, laws/norms, deployment settings, users, and potential impacts |
| **MAP 1.2** | Ensure the team establishing context is interdisciplinary and demographically diverse |
| **MAP 1.3** | Understand and document the organization's mission and AI goals |
| **MAP 1.4** | Clearly define the business value or purpose of this AI system |
| **MAP 1.5** | Document organizational risk tolerances |
| **MAP 1.6** | Elicit system requirements from AI actors with socio-technical implications in mind |

#### MAP 2 — Categorize the AI System

| Subcategory | What It Means |
|---|---|
| **MAP 2.1** | Define the specific tasks the AI performs (classifier? recommender? generative?) |
| **MAP 2.2** | Document the system's knowledge limits and how human oversight will work |
| **MAP 2.3** | Identify scientific integrity and TEVV requirements (data quality, construct validation) |

#### MAP 3 — Assess Benefits and Costs

| Subcategory | What It Means |
|---|---|
| **MAP 3.1** | Document potential benefits of the AI system |
| **MAP 3.2** | Document potential costs (monetary and non-monetary) of AI errors |
| **MAP 3.3** | Define the targeted application scope |
| **MAP 3.4** | Define operator proficiency requirements and relevant certifications |
| **MAP 3.5** | Define and document human oversight processes |

#### MAP 4 — Risk Mapping Across Components

| Subcategory | What It Means |
|---|---|
| **MAP 4.1** | Map AI and legal risks across all components, including third-party software/data |
| **MAP 4.2** | Identify and document internal risk controls for all AI system components |

#### MAP 5 — Characterize Societal Impacts

| Subcategory | What It Means |
|---|---|
| **MAP 5.1** | Document likelihood and magnitude of each identified impact (beneficial and harmful) |
| **MAP 5.2** | Establish practices for ongoing stakeholder engagement and feedback integration |

**After completing MAP:** You have a **go/no-go decision point** — should this AI system be built or deployed, given what you now know?

---

## 📏 Function 3: MEASURE

**Purpose:** Quantify and evaluate the risks identified in MAP using rigorous testing and metrics.

MEASURE turns the contextual understanding from MAP into **objective, repeatable assessments** of risk and trustworthiness.

> "AI systems should be tested before their deployment and regularly while in operation."

### The 4 MEASURE Categories

#### MEASURE 1 — Select Appropriate Methods & Metrics

| Subcategory | What It Means |
|---|---|
| **MEASURE 1.1** | Select metrics for risks from MAP, starting with the highest-risk items; document what *cannot* be measured |
| **MEASURE 1.2** | Regularly review whether metrics are still appropriate and whether controls are working |
| **MEASURE 1.3** | Involve internal experts NOT on the front-line team, and independent external assessors |

#### MEASURE 2 — Evaluate Trustworthy Characteristics

This is where each of the 7 trustworthiness characteristics gets formally measured:

| Subcategory | What Gets Measured |
|---|---|
| **MEASURE 2.1** | Document test sets, metrics, and tools used in TEVV |
| **MEASURE 2.2** | Human-subject evaluations meet ethics requirements and are representative |
| **MEASURE 2.3** | Performance/assurance criteria measured under realistic deployment conditions |
| **MEASURE 2.4** | Monitor system behavior continuously once in production |
| **MEASURE 2.5** | Validate and document generalizability limits (reliability) |
| **MEASURE 2.6** | Evaluate **safety** risks; confirm system can "fail safely" |
| **MEASURE 2.7** | Evaluate **security and resilience** |
| **MEASURE 2.8** | Examine **transparency and accountability** risks |
| **MEASURE 2.9** | Document model explanations and validate interpretations (**explainability**) |
| **MEASURE 2.10** | Examine **privacy** risks |
| **MEASURE 2.11** | Evaluate **fairness and bias** |
| **MEASURE 2.12** | Assess **environmental impact** of model training and management |
| **MEASURE 2.13** | Evaluate effectiveness of your own TEVV processes (meta-measurement) |

#### MEASURE 3 — Track Risks Over Time

| Subcategory | What It Means |
|---|---|
| **MEASURE 3.1** | Regularly identify and track existing, unanticipated, and emergent risks |
| **MEASURE 3.2** | Address hard-to-measure risks with alternative tracking approaches |
| **MEASURE 3.3** | Create feedback channels for end users and impacted communities to report problems |

#### MEASURE 4 — Assess Measurement Efficacy

| Subcategory | What It Means |
|---|---|
| **MEASURE 4.1** | Connect measurement approaches to deployment context; consult domain experts |
| **MEASURE 4.2** | Validate measurement results with external AI actors to confirm consistent performance |
| **MEASURE 4.3** | Identify measurable improvements or declines using field data and community input |

---

## 🛠️ Function 4: MANAGE

**Purpose:** Act on what MAP and MEASURE revealed — prioritize, respond, recover, and improve.

MANAGE is where risk management becomes **operational**. It involves allocating resources, creating response plans, and continuously improving.

### The 4 MANAGE Categories

#### MANAGE 1 — Prioritize and Respond to Risks

| Subcategory | What It Means |
|---|---|
| **MANAGE 1.1** | Determine whether the AI system achieves its goals — **go/no-go decision** |
| **MANAGE 1.2** | Prioritize documented risks by impact, likelihood, and available resources |
| **MANAGE 1.3** | Develop response plans for high-priority risks using one or more of four options below |
| **MANAGE 1.4** | Document all residual (unmitigated) risks for disclosure to downstream users |

**The 4 Risk Response Options:**

| Option | What It Means |
|---|---|
| **Mitigate** | Reduce the likelihood or impact of the risk |
| **Transfer** | Share the risk (e.g., insurance, contracts with third parties) |
| **Avoid** | Don't deploy the system, or change the design to eliminate the risk |
| **Accept** | Consciously accept the risk (document the decision and reasoning) |

#### MANAGE 2 — Maximize Benefits, Minimize Harms

| Subcategory | What It Means |
|---|---|
| **MANAGE 2.1** | Consider non-AI alternatives that might reduce risk with less complexity |
| **MANAGE 2.2** | Apply mechanisms to sustain the value of deployed AI systems over time |
| **MANAGE 2.3** | Have procedures to respond to *previously unknown* risks when they emerge |
| **MANAGE 2.4** | Have the ability and responsibility to **shut down or override** AI that performs inconsistently |

#### MANAGE 3 — Third-Party Risk Management

| Subcategory | What It Means |
|---|---|
| **MANAGE 3.1** | Regularly monitor risks from third-party AI resources; apply and document controls |
| **MANAGE 3.2** | Include pre-trained models in regular monitoring and maintenance |

#### MANAGE 4 — Document, Communicate, Improve

| Subcategory | What It Means |
|---|---|
| **MANAGE 4.1** | Implement post-deployment monitoring plans including incident response and change management |
| **MANAGE 4.2** | Integrate measurable improvements into AI updates; regularly engage stakeholders |
| **MANAGE 4.3** | Communicate incidents and errors to all relevant AI actors including affected communities |

---

## 🗺️ AI RMF Profiles

**What is a Profile?** A customized implementation of the AI RMF functions/categories for a *specific* use case, sector, or organization.

### Types of Profiles

| Profile Type | Description | Example |
|---|---|---|
| **Use-case Profile** | Tailored to a specific application | AI Hiring Profile, Fair Housing AI Profile |
| **Current Profile** | Describes *how AI risk is currently being managed* | "Here's what we're doing today" |
| **Target Profile** | Describes the *desired future state* of AI risk management | "Here's where we want to be" |
| **Cross-sectoral Profile** | Covers risks of models used across multiple sectors | Large Language Model governance profile |

### How to Use Profiles

```
Step 1: Create a CURRENT PROFILE
         ↓ (describes where you are today)
Step 2: Define a TARGET PROFILE
         ↓ (describes where you want to be)
Step 3: GAP ANALYSIS
         ↓ (compare Current to Target)
Step 4: ACTION PLAN
         ↓ (prioritize and close gaps)
Step 5: IMPLEMENT → MONITOR → UPDATE profiles
```

> **The framework provides no mandatory profile templates** — you have flexibility to design your own.

---

## 📊 Appendix Highlights

### Appendix B: How AI Risks Differ from Traditional Software

Key ways AI is *uniquely risky* compared to regular software:

| Unique AI Risk | Why It's Different |
|---|---|
| **Data dependency** | Traditional software has fixed code; AI behavior depends on potentially changing data |
| **Training data problems** | Ground truth may not exist; data may not reflect real-world deployment context |
| **Model drift** | AI performance can degrade as data or context changes over time |
| **Emergent behaviors** | Large models can exhibit unpredictable behaviors not present during training |
| **Opacity** | Black-box models are harder to test and verify than rule-based code |
| **Privacy through aggregation** | AI can re-identify individuals from seemingly anonymous data at scale |
| **Attack surface** | AI-specific attacks: data poisoning, adversarial examples, model extraction, membership inference |
| **Bias amplification** | AI executes biased decisions at massive scale and speed |
| **Environmental cost** | Training large AI models requires enormous computational resources |
| **Generative AI risks** | Existing frameworks don't yet adequately address generative AI risks |
| **Transfer learning risks** | Pre-trained models fine-tuned for new domains bring unexpected risks |

### Appendix C: Human-AI Interaction

4 key insights about humans and AI working together:

1. **Define human roles clearly** — Configurations range from *fully autonomous AI* to *fully manual human*, with many hybrid points. Each needs explicit role definitions.

2. **Cognitive biases transfer to AI** — AI actors bring their own biases into design and development. AI opacity *worsens* this by hiding biases.

3. **Human-AI results vary by context** — In some perceptual tasks, human-AI teams make *worse* decisions than either alone. In others, they outperform both.

4. **AI output presentation matters** — Different humans interpret the same AI output differently based on individual traits, preferences, and expertise.

**The GOVERN and MAP functions address this** by requiring explicit definition of human oversight roles and diverse, multidisciplinary team involvement.

### Appendix D: The 10 Guiding Attributes of the AI RMF

The design principles NIST used to build this framework:

1. Risk-based, resource-efficient, pro-innovation, and **voluntary**
2. Consensus-driven, openly developed, regularly updated
3. Uses **plain language** accessible to non-technical executives *and* practitioners
4. Provides **common language** — taxonomy, terminology, definitions for AI risk
5. **Easy to use** and fits with other risk management approaches
6. **Universally applicable** across sectors and technology domains
7. **Outcome-focused**, not prescriptive — describes *what*, not *exactly how*
8. Leverages existing standards while identifying gaps
9. **Law- and regulation-agnostic** (works under any legal regime)
10. A **living document** — regularly updated as AI evolves

---

## 🎓 Quick-Study Cheatsheet

### The Complete Framework on One Page

```
NIST AI RMF 1.0 — AT A GLANCE

WHAT: Voluntary framework to manage AI risks & build trustworthy AI
WHO:  All AI actors — designers, developers, deployers, users, society
WHY:  AI is uniquely risky; existing frameworks don't fully address it

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 1: FOUNDATIONS

  Risk = Probability × Magnitude of harm
  4 Challenges: Measurement | Tolerance | Prioritization | Integration

  7 Trustworthiness Characteristics:
  ① Valid & Reliable    ② Safe              ③ Secure & Resilient
  ④ Accountable &       ⑤ Explainable &     ⑥ Privacy-Enhanced
    Transparent           Interpretable
  ⑦ Fair (Bias Managed)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 2: THE CORE

  ┌──────────────────────────────────────────────────────┐
  │  GOVERN (always active — cross-cuts everything)      │
  │  → Culture, policies, accountability, training       │
  │  → 6 categories: Policy | Accountability | DEIA |   │
  │    Culture | Stakeholders | Third-party              │
  ├──────────────┬───────────────┬────────────────────── │
  │    MAP       │   MEASURE     │      MANAGE           │
  │  (Context)   │  (Evaluate)   │    (Act/Fix)          │
  │              │               │                       │
  │  5 categories│  4 categories │   4 categories        │
  │  Context     │  Methods      │   Prioritize          │
  │  Categorize  │  Evaluate 7   │   Benefits/Harms      │
  │  Costs/Ben.  │  characteristics│  3rd-party          │
  │  Component   │  Track over   │   Document &          │
  │  Societal    │  time         │   Communicate         │
  │  impacts     │  Assess TEVV  │                       │
  └──────────────┴───────────────┴────────────────────── ┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  PROFILES: Customize the framework for your context
  Current Profile → Target Profile → Gap Analysis → Action Plan
```

### The 4 Risk Response Strategies (MANAGE)
| | **High Probability** | **Low Probability** |
|---|---|---|
| **High Impact** | 🔴 AVOID or MITIGATE aggressively | 🟡 MITIGATE or TRANSFER |
| **Low Impact** | 🟡 MITIGATE or ACCEPT with controls | 🟢 ACCEPT (document it) |

---

## 🔑 Key Vocabulary Glossary

| Term | Definition |
|---|---|
| **AI System** | Machine-based system that generates predictions, recommendations, or decisions with varying autonomy |
| **AI Actor** | Any person or org that plays an active role in the AI system lifecycle |
| **AI RMF** | AI Risk Management Framework — this document |
| **Risk** | Composite measure of an event's probability and its consequences |
| **Risk Tolerance** | An organization's readiness to bear risk to achieve its objectives |
| **Residual Risk** | Risk remaining after risk treatment has been applied |
| **TEVV** | Test, Evaluation, Verification, and Validation — ongoing quality assurance processes |
| **Trustworthiness** | The degree to which an AI system exhibits the 7 characteristics (valid, safe, secure, etc.) |
| **Validity** | Confirmation that a system meets requirements for its intended use |
| **Reliability** | Ability of a system to perform consistently over time under expected conditions |
| **Accuracy** | Closeness of results to true values |
| **Robustness** | Ability to maintain performance across varied circumstances including unexpected ones |
| **Resilience** | Ability to recover and maintain function after adverse events |
| **Explainability** | Ability to describe why an AI produced an output |
| **Interpretability** | Ability to understand how an AI makes decisions (in-model) |
| **Systemic Bias** | Bias embedded in data, organizational processes, or broader societal structures |
| **Computational/Statistical Bias** | Bias from non-representative samples or flawed algorithmic processes |
| **Human-Cognitive Bias** | How individuals perceive and use AI information in decision-making |
| **AI RMF Profile** | A customized implementation of the framework for a specific context |
| **Current Profile** | Description of *current* AI risk management state |
| **Target Profile** | Description of *desired* AI risk management state |
| **GOVERN** | Framework function: build risk management culture and structures |
| **MAP** | Framework function: establish context and identify risks for a specific AI system |
| **MEASURE** | Framework function: quantify and evaluate identified risks |
| **MANAGE** | Framework function: act on evaluated risks through response and improvement |
| **Data Poisoning** | Malicious manipulation of training data to alter AI behavior |
| **Adversarial Examples** | Inputs designed to cause AI to make incorrect outputs |
| **Model Extraction** | Stealing an AI model by querying its API |
| **Membership Inference** | Determining whether a specific data record was in a model's training set |
| **Transfer Learning** | Using a model trained on one task/domain as a starting point for another |
| **PETs** | Privacy-Enhancing Technologies — tools like differential privacy, federated learning |
| **Model Drift** | Degradation in AI model performance over time as data or context changes |
| **Socio-technical** | Systems that are influenced by both technical design AND societal/human factors |
| **DEIA** | Diversity, Equity, Inclusion, and Accessibility |

---

## 📚 Further Learning Resources

| Resource | Where to Find It |
|---|---|
| **NIST AI RMF Playbook** | https://www.nist.gov/itl/ai-risk-management-framework |
| **NIST AI RMF Website** | https://www.nist.gov/artificial-intelligence |
| **NIST Cybersecurity Framework** | Companion for security considerations |
| **NIST Privacy Framework** | Companion for privacy considerations |
| **NIST SP 1270** | Towards a Standard for Identifying and Managing Bias in AI |
| **OECD AI Principles** | Foundation for AI actor definitions in this framework |
| **ISO/IEC 22989:2022** | AI concepts and terminology |
| **ISO 31000:2018** | Risk management principles (foundational) |

---

*This guide was created from a complete reading of NIST AI 100-1 (48 pages, January 2023). All content is a simplified interpretation for learning purposes. Always refer to the original document for official, authoritative guidance.*

*Original document: [NIST.AI.100-1.pdf](./NIST.AI.100-1.pdf)*

