# 🗺️ AI System Context & Risk Identification Report
**Framework:** NIST AI RMF 1.0 — MAP Function (MAP 1.1 – MAP 5.2)  
**Version:** 1.0 | **Status:** Pre-Deployment Assessment  
**Date:** 2024  
**Prepared By:** AI Project Lead · AI Risk Officer · AI Ethics Officer  
**AI System:** Customer Support AI Chatbot ("FinAssist AI")  
**AI System ID:** AI-001  
**Organization Sector:** Financial Services  
**AI Technology:** Cloudflare AI (Workers AI)  
**Lifecycle Stage:** Planning / Pre-Development

---

> [!IMPORTANT]
> This report fulfills the **MAP function** of the NIST AI RMF. It establishes the context for the AI system, identifies risks and benefits, maps stakeholder impacts, and informs the MEASURE and MANAGE functions that follow. This report must be completed **before development begins** and updated at each lifecycle gate.

---

## 📋 Table of Contents

1. [MAP 1 — Context Is Established and Understood](#map-1--context-is-established-and-understood)
2. [MAP 2 — AI System Categorization](#map-2--ai-system-categorization)
3. [MAP 3 — Benefits and Risks Mapping](#map-3--benefits-and-risks-mapping)
4. [MAP 4 — Third-Party Risk Mapping](#map-4--third-party-risk-mapping)
5. [MAP 5 — Impact Characterization](#map-5--impact-characterization)
6. [Appendix A — Stakeholder Register](#appendix-a--stakeholder-register)
7. [Appendix B — Risk Register](#appendix-b--risk-register)
8. [Appendix C — Data Flow Diagram](#appendix-c--data-flow-diagram)
9. [Appendix D — Regulatory Mapping](#appendix-d--regulatory-mapping)
10. [Appendix E — Sign-Off Sheet](#appendix-e--sign-off-sheet)

---

## MAP 1 — Context Is Established and Understood

### MAP 1.1 — Intended Purpose & Context of Use

#### 1.1.1 System Description

| Field | Details |
|---|---|
| **System Name** | FinAssist AI |
| **System ID** | AI-001 (per [AI_System_Inventory.csv](./AI_System_Inventory.csv)) |
| **System Type** | Conversational AI Chatbot — Customer Support |
| **AI Task(s)** | Natural Language Understanding (NLU), Intent Classification, Response Generation, Knowledge Retrieval, Escalation Routing |
| **Underlying Technology** | Cloudflare Workers AI (inference at the edge) with Cloudflare AI Search for retrieval-augmented generation (RAG) |
| **Deployment Target** | Customer-facing web portal & mobile banking app |
| **Intended Users** | Retail banking customers (individual account holders) |
| **Intended Operators** | Customer Service Department — Tier 1 agents and supervisors |
| **Lifecycle Stage** | Planning / Pre-Development |

#### 1.1.2 Concept of Operations (CONOPS)

**What the system will do:**
FinAssist AI is a conversational AI assistant embedded in the bank's customer-facing digital channels (web portal and mobile app). It will:

1. **Greet and triage** — Understand customer intent from natural language input
2. **Answer FAQs** — Respond to common questions (account balances, branch hours, product information, fee structures) using a curated knowledge base
3. **Guide self-service** — Walk customers through processes (password resets, card freezes, statement downloads, dispute initiation)
4. **Escalate complex cases** — Route to a live human agent when the query exceeds the chatbot's scope, involves complaints, or triggers a sensitive-topic flag
5. **Collect pre-escalation context** — Summarize the conversation for the human agent to reduce customer repetition

**What the system will NOT do:**
- Execute financial transactions (transfers, payments, trades)
- Make lending, credit, or insurance underwriting decisions
- Access or display full account numbers or sensitive PII in conversation
- Override human agent decisions
- Operate without a human escalation path

#### 1.1.3 Deployment Context

| Dimension | Description |
|---|---|
| **Operational Environment** | Digital channels — Web (desktop/mobile browser) and native mobile app |
| **Operational Geography** | [Specify: e.g., Uganda, East Africa, multi-country] |
| **Regulatory Environment** | Central Bank regulations, Data Protection Act, Consumer Protection guidelines, AML/KYC requirements |
| **Operating Hours** | 24/7 (AI provides first response; human escalation available during business hours only) |
| **Scale of Deployment** | Phase 1: ~50,000 monthly active digital banking users; Phase 2: ~200,000+ |
| **Languages Supported** | English (Phase 1); [Local languages TBD for Phase 2] |
| **Integration Points** | Core banking system (read-only), CRM, ticketing system, knowledge base CMS |

#### 1.1.4 Expected vs. Off-Label Uses

| Use Type | Description | Risk Level |
|---|---|---|
| ✅ **Intended** | Answering FAQs about products, fees, branch info | Low |
| ✅ **Intended** | Guiding self-service (card freeze, password reset) | Medium |
| ✅ **Intended** | Routing to human agents for complex queries | Low |
| ⚠️ **Foreseeable Misuse** | Customer attempts to get financial advice ("Should I invest in X?") | High |
| ⚠️ **Foreseeable Misuse** | Customer shares sensitive documents (ID scans, account statements) in chat | High |
| ⚠️ **Foreseeable Misuse** | Social engineering — adversary impersonates customer to extract information | Critical |
| 🚫 **Unacceptable** | Making credit decisions or financial recommendations | Critical |
| 🚫 **Unacceptable** | Processing transactions without human confirmation | Critical |

---

### MAP 1.2 — Diverse & Interdisciplinary Team

The context-mapping team must include diverse perspectives to avoid blind spots. For a financial services chatbot handling customer interactions, the following disciplines are required:

| Role | Contribution to Context Mapping | Included? |
|---|---|---|
| **AI/ML Engineer** | Technical feasibility, model selection, performance bounds | ⬜ |
| **Customer Service Lead** | Understands real customer queries, pain points, escalation needs | ⬜ |
| **Compliance / Legal** | Regulatory requirements, data protection, consumer protection | ⬜ |
| **Information Security** | Threat modeling, data handling, adversarial risks | ⬜ |
| **UX Researcher** | Customer expectations, accessibility, digital literacy | ⬜ |
| **Risk Management** | Enterprise risk alignment, operational risk | ⬜ |
| **External: Customer Advocate / Accessibility Expert** | Vulnerable customer needs, disability access | ⬜ |
| **External: Regulatory Advisor** | Central Bank expectations for AI in financial services | ⬜ |
| **Data Privacy Officer (DPO)** | Data minimization, consent, retention, cross-border transfer | ⬜ |
| **Frontline Agent Representative** | Operational impact on human agents | ⬜ |

> [!WARNING]
> If any of the above roles cannot be filled, document the gap and the compensating measures taken. Per MAP 1.2, absence of diverse perspectives is itself a risk factor.

---

### MAP 1.3 — Organizational Mission & AI Goals Alignment

#### Mission Alignment Assessment

| Question | Response |
|---|---|
| What is the organization's stated mission? | [Insert mission statement] |
| How does FinAssist AI support this mission? | Improves customer access to information 24/7, reduces wait times, and enables human agents to focus on complex high-value interactions |
| Are there any misalignments between AI goals and organizational values? | ⬜ Yes (describe below) · ⬜ No |
| Could the chatbot create latent incentives that harm customers? | Potential: cost reduction incentive could lead to under-investment in human escalation capacity |
| Does the system align with stated diversity, equity & inclusion goals? | Must verify: language accessibility, disability access, bias in intent classification |

#### Societal Values Assessment

| Societal Value | Potential Conflict | Mitigation |
|---|---|---|
| **Financial Inclusion** | Chatbot may disadvantage customers with low digital literacy or limited English | Offer clear escalation to human agent; simple language mode; future local language support |
| **Consumer Protection** | AI could provide incorrect product information leading to financial harm | RAG from curated, compliance-reviewed knowledge base only; no generative financial advice |
| **Privacy** | Customer conversations may contain PII; data stored on edge infrastructure | Data minimization; no PII retention beyond session; Cloudflare data residency controls |
| **Equity** | Model may perform worse for non-standard English, dialects, or minority language speakers | Bias testing across demographic proxies; performance monitoring by user segment |

---

### MAP 1.4 — Business Value & Context of Use

#### Business Value Justification

| Value Dimension | Expected Benefit | Measurement Method |
|---|---|---|
| **Customer Experience** | 24/7 instant first response; reduced wait times from avg. [X] min to <30 sec | CSAT score, Average Wait Time, First Contact Resolution |
| **Operational Efficiency** | Deflect 40–60% of Tier 1 queries from human agents | Deflection Rate, Cost per Contact |
| **Agent Productivity** | Human agents handle higher-complexity cases with pre-collected context | Average Handle Time for escalated calls |
| **Scalability** | Handle demand spikes (e.g., month-end, product launches) without proportional staffing | Peak Throughput, Queue Overflow Rate |
| **Data Insights** | Aggregate anonymized query data to identify product/service pain points | Topic Trend Analysis reports |

#### Non-AI Alternative Comparison

| Solution | Pros | Cons | Decision |
|---|---|---|---|
| **Expand human agent team** | High empathy, handles nuance | Expensive, doesn't scale for 24/7, slow hiring | Benchmark |
| **Static FAQ / IVR menu** | Low risk, low cost | Poor CX, high abandonment, no context | Inadequate |
| **Rule-based chatbot (no AI)** | Predictable, auditable | Rigid, poor NLU, high maintenance, frustrating UX | Considered |
| **AI chatbot (FinAssist AI)** | Natural language, 24/7, scalable, improves over time | AI risks (hallucination, bias, security), regulatory scrutiny | **Selected — with guardrails** |

> [!NOTE]
> The AI solution is selected because non-AI alternatives fail to meet the dual requirement of **24/7 availability** and **natural language understanding**. However, deployment is conditional on the guardrails defined in this MAP report and subsequent MEASURE/MANAGE controls.

---

### MAP 1.5 — Risk Tolerances

#### Risk Tolerance Framework

| Risk Category | Maximum Tolerable Risk Level | Escalation Trigger | Response |
|---|---|---|---|
| **Customer Financial Harm** | Zero tolerance | Any instance of incorrect financial advice or unauthorized transaction | Immediate shutdown of affected capability; incident report |
| **Data Breach / PII Exposure** | Zero tolerance | Any unauthorized data access or leakage | System isolation; regulatory notification within 72 hours |
| **Bias / Discrimination** | Low | Statistically significant performance disparity across demographic groups | Model retraining or decommission |
| **Hallucination / Incorrect Info** | Low | Error rate exceeds 2% on factual queries (measured via TEVV) | Restrict to FAQ-only mode; expand human escalation |
| **Customer Frustration / CX Harm** | Medium | CSAT drops below [threshold] or complaint rate exceeds [threshold] | Expand human escalation paths; reduce chatbot scope |
| **Regulatory Non-Compliance** | Zero tolerance | Any flagged violation by compliance or regulator | Immediate remediation; potential system suspension |
| **Adversarial Attack / Social Engineering** | Low | Any successful manipulation of the system | Security review; patch; potential suspension |

#### Go / No-Go Decision Criteria

> [!IMPORTANT]
> The Go/No-Go decision for FinAssist AI deployment is **independent of financial interest**. It is made by the AI Governance Board based on evidence from this MAP report, the MEASURE assessment, and the Impact Assessment.

| Criterion | Threshold for "Go" | Measured By |
|---|---|---|
| Impact Assessment completed | ✅ Must be complete and signed | [AI_Impact_Assessment_Template.md](./AI_Impact_Assessment_Template.md) |
| TEVV completed | ✅ All test suites passed | TEVV Team Lead |
| Bias testing | ✅ No statistically significant disparities | AI Ethics Officer |
| Regulatory review | ✅ Compliance sign-off obtained | Compliance / Legal |
| Human escalation path verified | ✅ Tested end-to-end | Customer Service Lead |
| Security penetration test | ✅ No critical/high vulnerabilities | InfoSec Team |
| Data privacy impact assessment | ✅ Complete and approved by DPO | Data Privacy Officer |

---

### MAP 1.6 — System Requirements with Socio-Technical Implications

#### Functional Requirements

| Req ID | Requirement | Trustworthiness Implication |
|---|---|---|
| FR-01 | System shall understand customer intent from natural language input | **Validity & Reliability** — Must perform across dialects, typos, colloquialisms |
| FR-02 | System shall respond using only approved knowledge base content | **Safety** — Prevents hallucination and unauthorized financial advice |
| FR-03 | System shall escalate to human agent when confidence is below threshold | **Accountability** — Human-in-the-loop for uncertain cases |
| FR-04 | System shall not display full account numbers, PINs, or passwords | **Privacy & Security** — Data minimization by design |
| FR-05 | System shall provide escalation option at any point in conversation | **Fairness** — Customers are never trapped in an AI-only loop |
| FR-06 | System shall log all conversations for audit trail (anonymized after 90 days) | **Transparency & Accountability** — Regulatory audit support |
| FR-07 | System shall display clear disclosure that customer is interacting with AI | **Transparency** — NIST AI RMF Trustworthy AI principle |
| FR-08 | System shall support accessibility standards (WCAG 2.1 AA minimum) | **Fairness** — Disability access |

#### Non-Functional Requirements

| Req ID | Requirement | Trustworthiness Implication |
|---|---|---|
| NFR-01 | Response latency < 3 seconds (p95) | **Reliability** — User experience |
| NFR-02 | System availability ≥ 99.5% | **Reliability** — Customer trust |
| NFR-03 | System shall gracefully degrade (offer human transfer) if AI service is unavailable | **Safety & Resilience** — Fallback design |
| NFR-04 | All data processed within approved geographic jurisdictions | **Privacy** — Cloudflare data residency configuration |
| NFR-05 | Conversation data encrypted in transit (TLS 1.3) and at rest (AES-256) | **Security** |

---

## MAP 2 — AI System Categorization

### MAP 2.1 — Define the AI Task

| Attribute | Details |
|---|---|
| **Primary AI Task** | Conversational Question-Answering with Retrieval-Augmented Generation (RAG) |
| **Learning Type** | Pre-trained large language model (LLM) — inference only; no on-device training |
| **Sub-Tasks** | Intent Classification → Knowledge Retrieval (Cloudflare AI Search / Vectorize) → Response Generation → Confidence Scoring → Escalation Decision |
| **Input Data** | Customer text input (natural language), session context, customer segment (non-PII) |
| **Output Data** | Generated text response, suggested actions, escalation flag, confidence score |
| **Training Data** | Pre-trained by model provider (Cloudflare Workers AI model catalog); fine-tuning on bank FAQ corpus (if applicable) |
| **Inference Environment** | Cloudflare Workers AI — edge inference (globally distributed) |

#### AI Task Taxonomy

```
Customer Message (Text Input)
    │
    ├── Intent Classification
    │       → FAQ query / Self-service request / Complaint / Sensitive topic / Out-of-scope
    │
    ├── Knowledge Retrieval (RAG)
    │       → Cloudflare AI Search queries curated knowledge base
    │       → Returns top-k relevant documents/passages
    │
    ├── Response Generation
    │       → LLM generates response grounded in retrieved documents
    │       → Guardrails applied (no financial advice, no PII, no hallucination)
    │
    ├── Confidence Scoring
    │       → Model outputs confidence level for generated response
    │
    └── Escalation Decision
            → IF confidence < threshold OR sensitive topic OR customer requests → ESCALATE to human
            → ELSE → Deliver response to customer
```

---

### MAP 2.2 — Knowledge Limits & Human Oversight

#### Known Limitations

| Limitation | Description | Impact | Mitigation |
|---|---|---|---|
| **Language Coverage** | Phase 1 supports English only; non-English speakers underserved | Fairness / Inclusion | Explicit human escalation for non-English queries; Phase 2 multilingual |
| **Contextual Understanding** | LLMs may misunderstand sarcasm, idioms, emotional distress | Safety / CX | Sentiment detection → auto-escalate negative sentiment |
| **Hallucination** | LLM may generate plausible but incorrect information | Safety / Trust | RAG-only architecture; block open-ended generation; factual verification layer |
| **Adversarial Robustness** | Prompt injection attacks could manipulate responses | Security | Input sanitization; jailbreak detection; output filtering |
| **Temporal Knowledge** | Pre-trained model has a knowledge cutoff; may not know recent product changes | Validity | RAG from live knowledge base; no reliance on parametric knowledge for facts |
| **Multi-Turn Coherence** | Long conversations may lose context or become incoherent | Reliability | Session context window management; proactive escalation after N turns |

#### Human-AI Configuration

| Interaction Mode | Description | Applied To |
|---|---|---|
| **AI-Initiated, Human-Supervised** | AI handles initial triage and FAQ responses; human supervisor monitors flagged conversations | Standard operation |
| **Human-in-the-Loop (Mandatory)** | AI recommends action; human must confirm before execution | Card freezes, dispute initiation, account changes |
| **Human-on-the-Loop** | AI operates autonomously within defined scope; human reviews exceptions | FAQ responses with high confidence scores |
| **Mandatory Escalation** | AI must transfer to human; may not attempt to resolve | Complaints, financial advice requests, vulnerability indicators, legal threats |

#### Dependencies

| Dependency | Type | Risk if Unavailable |
|---|---|---|
| Cloudflare Workers AI | Third-party inference API | No AI capability — fallback to direct human routing |
| Cloudflare AI Search / Vectorize | Third-party retrieval service | Degraded accuracy — fallback to keyword search or human routing |
| Knowledge Base CMS | Internal content source | Stale or missing answers — increased escalation rate |
| Core Banking System (API) | Internal data source (read-only) | Cannot retrieve customer context — generic responses only |
| CRM / Ticketing System | Internal integration | Escalation context not passed to human agent |

---

### MAP 2.3 — Scientific Integrity & TEVV Planning

#### TEVV Protocol Overview

| TEVV Activity | Description | When | Who |
|---|---|---|---|
| **Unit Testing** | Test individual components: intent classifier, retrieval pipeline, response generator | Development | AI/ML Engineering |
| **Integration Testing** | End-to-end conversation flow testing across all pathways | Pre-deployment | QA + TEVV Team |
| **Bias & Fairness Testing** | Evaluate performance across demographic proxies (language patterns, question complexity) | Pre-deployment + Quarterly | AI Ethics Officer + TEVV |
| **Adversarial Testing (Red Team)** | Attempt prompt injection, social engineering, jailbreaks | Pre-deployment + Bi-annually | InfoSec + External Red Team |
| **Accuracy Benchmarking** | Measure factual accuracy of responses against ground-truth FAQ corpus | Pre-deployment + Monthly | TEVV Team |
| **User Acceptance Testing** | Real customers test in controlled pilot with feedback collection | Pre-deployment (Pilot) | UX Research + Customer Service |
| **Stress Testing** | Performance under peak load conditions | Pre-deployment | Infrastructure + QA |
| **Post-Deployment Monitoring** | Continuous tracking of accuracy, escalation rate, CSAT, drift | Ongoing | AI Operations |

#### Key Assumptions to Document & Validate

| Assumption | Validation Method |
|---|---|
| Customers will primarily ask FAQ-type questions | Analyze historical customer service query logs |
| English language coverage is sufficient for Phase 1 | Review customer demographics and language preferences |
| Cloudflare AI Search will return relevant documents for banking queries | Benchmark retrieval quality (precision@k, recall@k) on test query set |
| Customers will accept interacting with an AI chatbot | User research; A/B test with opt-in pilot |
| The knowledge base is comprehensive and accurate | Compliance review of all knowledge base content |
| Edge inference latency will meet <3s requirement globally | Performance testing across target geographies |

---

## MAP 3 — Benefits and Risks Mapping

### MAP 3.1 — Potential Benefits

#### Benefits by Stakeholder

| Stakeholder | Benefit | Evidence / Measurement |
|---|---|---|
| **Customers** | 24/7 instant support; reduced wait times; self-service convenience | CSAT, Average Response Time, Self-Service Completion Rate |
| **Customer Service Agents** | Focus on complex/high-value cases; pre-collected context reduces repetition | Agent Satisfaction Survey, Average Handle Time (escalated cases) |
| **Organization** | Cost reduction (40–60% Tier 1 deflection); scalability; data-driven insights | Cost per Contact, Deflection Rate, Query Topic Analytics |
| **Regulators** | Improved customer access to information; audit trail of interactions | Compliance audit reports |
| **Society** | Financial inclusion — 24/7 access to banking information regardless of location | Digital banking penetration metrics |

#### Performance vs. Human Baseline

| Metric | Human Agent Baseline | FinAssist AI Target | Notes |
|---|---|---|---|
| **First Response Time** | 3–8 minutes (queue dependent) | < 5 seconds | Significant improvement |
| **24/7 Availability** | No (business hours only) | Yes | Key differentiator |
| **FAQ Accuracy** | ~95% (agent-dependent) | ≥ 97% (RAG from verified KB) | AI may exceed human for fact retrieval |
| **Empathy / Emotional Support** | High | Low | Human agents remain superior; escalation path critical |
| **Complex Problem Resolution** | High | Not applicable (escalation) | AI does not attempt complex resolution |
| **Cost per Interaction** | $[X] | $[Y] (estimated 70–80% lower) | Primary business case driver |

---

### MAP 3.2 — Potential Costs & Harms

#### Harm Analysis: Who, What, When, How

| Harm Dimension | Analysis |
|---|---|
| **Who could be harmed?** | Customers (especially vulnerable: elderly, low literacy, non-English speakers, distressed); Customer service agents (job displacement fears); Organization (reputational, regulatory, financial) |
| **What could be harmed?** | Customer finances (incorrect info), privacy (data exposure), trust (poor CX), human dignity (dehumanized service), employee morale, organizational reputation |
| **When could harm arise?** | During conversation (real-time errors); after conversation (data breach, regulatory audit); over time (model drift, changing regulations); post-decommission (retained data) |
| **How could harm arise?** | Hallucination, bias, privacy breach, adversarial attack, system outage, over-reliance on AI, failure to escalate, customer manipulation |

#### Detailed Risk-Harm Mapping

| # | Risk | Harm Type | Affected Stakeholder | Likelihood | Impact | Risk Level | MAP Subcategory |
|---|---|---|---|---|---|---|---|
| R-01 | Hallucinated financial information | Financial harm to customer | Customer | Medium | Critical | **Critical** | MAP 3.2 |
| R-02 | Failure to escalate distressed customer | Emotional / psychological harm | Customer | Medium | High | **High** | MAP 3.5 |
| R-03 | Bias against non-standard English speakers | Discrimination / exclusion | Customer (minority groups) | Medium | High | **High** | MAP 3.2 |
| R-04 | PII exposure in conversation logs | Privacy violation | Customer | Low | Critical | **High** | MAP 3.2 |
| R-05 | Prompt injection attack | Security breach; misinformation | Customer, Organization | Medium | High | **High** | MAP 4.1 |
| R-06 | Over-reliance on AI (reduced human capacity) | Degraded service quality | Customer, Organization | Medium | Medium | **Medium** | MAP 3.5 |
| R-07 | Model drift / degraded performance over time | Gradual quality decline | Customer | Medium | Medium | **Medium** | MAP 2.3 |
| R-08 | Customer confusion about AI vs. human | Trust erosion | Customer | Low | Medium | **Medium** | MAP 1.1 |
| R-09 | Agent job displacement / morale impact | Employee well-being | Customer Service Staff | Medium | Medium | **Medium** | MAP 1.3 |
| R-10 | Regulatory non-compliance (consumer protection) | Legal / financial penalty | Organization | Low | Critical | **High** | MAP 4.1 |
| R-11 | System outage with no fallback | Service disruption | Customer | Low | High | **Medium** | MAP 2.2 |
| R-12 | Cross-border data transfer violations | Regulatory penalty; privacy harm | Customer, Organization | Low | High | **Medium** | MAP 4.1 |

> [!CAUTION]
> **Critical risks (R-01, R-04, R-10)** require zero-tolerance controls. If these risks cannot be mitigated to acceptable levels during development, the Go/No-Go decision must be **No-Go**.

---

### MAP 3.3 — Application Scope Specification

#### Scope Boundaries

| Dimension | In Scope ✅ | Out of Scope 🚫 |
|---|---|---|
| **Query Types** | FAQs, product info, self-service guidance, escalation routing | Financial advice, investment recommendations, credit decisions |
| **Channels** | Web portal, mobile app | Phone (IVR), email, social media, in-branch |
| **Customer Segments** | Retail banking (individual accounts) | Corporate banking, wealth management, institutional |
| **Languages** | English (Phase 1) | All other languages (Phase 1) |
| **Data Access** | Read-only: customer segment, product holdings (non-PII) | Write access to any system; full account details; transaction execution |
| **Actions** | Provide information, guide processes, initiate escalation | Execute transactions, modify account settings, approve applications |

#### Scope Narrowing Rationale (per MAP 3.3)

> Narrow scopes enable better risk management. A general-purpose financial AI assistant with open-ended capabilities would be exponentially harder to govern. By limiting FinAssist AI to **information retrieval and guided self-service**, we:
> - Eliminate transaction risk entirely
> - Constrain hallucination impact to informational (not financial action) harm
> - Make TEVV feasible with a bounded test corpus
> - Reduce regulatory exposure

---

### MAP 3.4 — Operator Proficiency Requirements

#### Operator Training & Certification

| Operator Role | Required Training | Certification | Frequency |
|---|---|---|---|
| **Customer Service Agent (Tier 1)** | Understanding AI capabilities/limitations; when and how escalation works; how to review AI conversation history | Completion certificate | Before go-live + Annual refresher |
| **Customer Service Supervisor** | All Tier 1 training + conversation monitoring dashboard; performance metrics interpretation; incident escalation procedures | Completion certificate | Before go-live + Annual refresher |
| **AI Operations (Technical)** | Model monitoring; performance dashboards; knowledge base updates; system configuration | Technical certification | Before go-live + Quarterly |
| **Compliance Officer** | AI system overview; regulatory requirements; audit log review procedures | Completion certificate | Before go-live + Annual refresher |

#### Warning Labels & Disclosures

| Label | Display Location | Text |
|---|---|---|
| **AI Disclosure** | Start of every conversation | "You're chatting with FinAssist AI, our AI assistant. I can help with common questions and guide you through services. For complex matters, I'll connect you with a team member." |
| **Limitation Warning** | When confidence is below threshold | "I'm not confident I have the right answer for this. Let me connect you with a specialist who can help." |
| **No Financial Advice** | When financial advice is detected | "I'm not able to provide financial advice. For personalized guidance, please speak with one of our advisors. Shall I connect you?" |
| **Data Handling Notice** | Accessible via info icon | "This conversation may be recorded for quality and training purposes. We do not store personal information beyond this session. [Privacy Policy link]" |

---

### MAP 3.5 — Human Oversight Processes

#### Oversight Architecture

| Oversight Layer | Description | Trigger |
|---|---|---|
| **Layer 1: Automated Guardrails** | Input/output filters block prohibited content, PII, financial advice | Every interaction (real-time) |
| **Layer 2: Confidence-Based Escalation** | Low-confidence responses automatically routed to human agent | Confidence score < [threshold] |
| **Layer 3: Topic-Based Escalation** | Sensitive topics (complaints, distress, legal, fraud) auto-escalate | Intent classification → sensitive category |
| **Layer 4: Supervisor Monitoring** | Real-time dashboard showing flagged conversations; random sampling | Continuous during business hours |
| **Layer 5: Periodic Audit** | Compliance team reviews sample of conversations for accuracy and appropriateness | Weekly (Phase 1); Monthly (steady state) |
| **Layer 6: Customer Override** | Customer can request human agent at any point in conversation | User clicks "Talk to a person" button |

#### Pre-Deployment Oversight Validation

| Test | Description | Pass Criteria |
|---|---|---|
| Escalation End-to-End | Simulate all escalation triggers and verify human agent receives full context | 100% of escalation paths function correctly |
| Guardrail Bypass Testing | Red team attempts to bypass content filters and guardrails | Zero successful bypasses of critical guardrails |
| Customer Override Test | Verify "Talk to a person" is always accessible and functional | Available at every conversation state |
| Supervisor Dashboard Test | Verify real-time monitoring displays flagged conversations correctly | All flagged conversations appear within 30 seconds |

---

## MAP 4 — Third-Party Risk Mapping

### MAP 4.1 — Third-Party AI & Legal Risks

#### Third-Party Component Inventory

| # | Component | Provider | Type | License / Terms | Risk Level |
|---|---|---|---|---|---|
| TP-01 | **Workers AI (LLM Inference)** | Cloudflare | Inference API (edge) | Cloudflare Enterprise Terms of Service | High |
| TP-02 | **AI Search / Vectorize** | Cloudflare | Retrieval / Vector DB | Cloudflare Enterprise Terms of Service | High |
| TP-03 | **Underlying LLM Model** | [Model provider via Cloudflare catalog] | Pre-trained model | Model license (e.g., Meta Llama Community License / Mistral License) | High |
| TP-04 | **Content Delivery / Edge Network** | Cloudflare | Infrastructure | Cloudflare Enterprise Terms of Service | Medium |

#### Third-Party Risk Assessment

| Risk Area | Assessment | Status |
|---|---|---|
| **Data Residency** | Where does Cloudflare process/store data? Are data residency controls available? | ⬜ Verified · ⬜ Pending |
| **Data Usage by Provider** | Does Cloudflare use customer conversation data for model training? | ⬜ Verified (confirm TOS clause) · ⬜ Pending |
| **Model Provenance** | What model is used? What training data was used? Any known biases? | ⬜ Verified · ⬜ Pending |
| **SLA / Uptime** | What uptime guarantees does Cloudflare provide for Workers AI? | ⬜ Verified · ⬜ Pending |
| **Security Certifications** | Does Cloudflare hold SOC 2 Type II, ISO 27001, PCI DSS? | ⬜ Verified · ⬜ Pending |
| **Incident Notification** | Does Cloudflare notify of model changes, security incidents, or service disruptions? | ⬜ Verified · ⬜ Pending |
| **Audit Rights** | Does the contract permit audit or review of AI processing? | ⬜ Verified · ⬜ Pending |
| **Exit Strategy** | Can the bank migrate to an alternative provider if Cloudflare AI is discontinued or unacceptable? | ⬜ Verified · ⬜ Pending |

> [!WARNING]
> **Financial services regulators increasingly require** that banks maintain control over AI models used in customer interactions. Verify that Cloudflare's terms allow the level of transparency and auditability required by your regulator. If model updates occur without notice, this is a risk indicator (per MAP 4.2).

---

### MAP 4.2 — Internal Risk Controls for Third-Party Components

#### Controls Matrix

| Control | Description | Owner | Status |
|---|---|---|---|
| **Vendor Due Diligence** | Complete vendor risk assessment per procurement policy | Procurement + Risk | ⬜ |
| **Contract Review** | Legal review of Cloudflare Enterprise terms; negotiate AI-specific clauses | Legal | ⬜ |
| **Data Processing Agreement (DPA)** | Ensure DPA covers AI processing, data residency, subprocessors | DPO + Legal | ⬜ |
| **Model Documentation Request** | Request model cards / documentation from Cloudflare for models used | AI Project Lead | ⬜ |
| **Performance Benchmarking** | Independent benchmark of Cloudflare AI model on banking-specific test set | TEVV Team | ⬜ |
| **Fallback Architecture** | Design system to function (degraded) without Cloudflare AI | AI/ML Engineering | ⬜ |
| **Change Notification** | Establish process for Cloudflare to notify of model updates / deprecations | AI Operations | ⬜ |
| **Regular Re-Assessment** | Schedule quarterly review of third-party AI risks | AI Risk Officer | ⬜ |

---

## MAP 5 — Impact Characterization

### MAP 5.1 — Likelihood & Magnitude of Impacts

#### Impact Assessment Scale

| Level | Likelihood | Magnitude | Description |
|---|---|---|---|
| **1 — Negligible** | < 1% probability | Minimal / no harm | No measurable impact on stakeholders |
| **2 — Low** | 1–10% probability | Minor inconvenience | Temporary frustration; no financial or rights impact |
| **3 — Medium** | 10–30% probability | Moderate harm | Measurable financial loss, service degradation, or trust erosion |
| **4 — High** | 30–60% probability | Significant harm | Material financial loss, regulatory action, or rights infringement |
| **5 — Critical** | > 60% probability | Severe / irreversible harm | Systemic failure, major regulatory penalty, loss of license, harm to life/safety |

#### Impact Matrix (Likelihood × Magnitude)

|  | **Negligible** | **Low** | **Medium** | **High** | **Critical** |
|---|---|---|---|---|---|
| **Rare** | ✅ Accept | ✅ Accept | ⚠️ Monitor | 🔶 Mitigate | 🔴 Avoid/Transfer |
| **Unlikely** | ✅ Accept | ⚠️ Monitor | ⚠️ Monitor | 🔶 Mitigate | 🔴 Avoid/Transfer |
| **Possible** | ⚠️ Monitor | ⚠️ Monitor | 🔶 Mitigate | 🔶 Mitigate | 🔴 Avoid/Transfer |
| **Likely** | ⚠️ Monitor | 🔶 Mitigate | 🔶 Mitigate | 🔴 Avoid/Transfer | 🔴 No-Go |
| **Almost Certain** | ⚠️ Monitor | 🔶 Mitigate | 🔴 Avoid/Transfer | 🔴 No-Go | 🔴 No-Go |

#### Applied Risk Ratings (from Risk Register)

| Risk ID | Risk | Likelihood | Magnitude | Rating | Response |
|---|---|---|---|---|---|
| R-01 | Hallucinated financial info | Possible | Critical | 🔴 **Avoid** | RAG-only architecture; block generative answers without retrieval grounding |
| R-02 | Failure to escalate distressed customer | Possible | High | 🔶 **Mitigate** | Sentiment detection; auto-escalation; multiple escalation triggers |
| R-03 | Bias against non-standard English | Possible | High | 🔶 **Mitigate** | Bias testing; performance monitoring by segment; low-confidence escalation |
| R-04 | PII exposure | Unlikely | Critical | 🔶 **Mitigate** | Data minimization; PII filtering; encryption; access controls |
| R-05 | Prompt injection | Possible | High | 🔶 **Mitigate** | Input sanitization; output filtering; red-teaming |
| R-10 | Regulatory non-compliance | Unlikely | Critical | 🔶 **Mitigate** | Pre-deployment compliance review; ongoing monitoring |

---

### MAP 5.2 — Ongoing Stakeholder Engagement

#### Stakeholder Engagement Plan

| Stakeholder Group | Engagement Method | Frequency | Purpose | Owner |
|---|---|---|---|---|
| **Customers** | In-chat feedback (thumbs up/down + optional comment) | Every interaction | Real-time quality signal | AI Operations |
| **Customers** | Post-interaction survey (random sample) | Monthly | CSAT and trust measurement | UX Research |
| **Customers (Pilot Group)** | Focus groups / interviews | Pre-deployment + Quarterly (Year 1) | Qualitative feedback on experience | UX Research |
| **Customer Service Agents** | Feedback portal + monthly check-in | Monthly | Operational impact; escalation quality | Customer Service Lead |
| **Compliance / Legal** | Quarterly governance review | Quarterly | Regulatory alignment; audit findings | Compliance Officer |
| **Regulator** | Proactive briefing on AI deployment; respond to inquiries | As required | Regulatory transparency | Compliance + Legal |
| **Consumer Advocacy Groups** | Annual stakeholder engagement | Annually | External perspective on fairness and inclusion | AI Ethics Officer |
| **AI Ethics Officer** | Bias audit review | Quarterly | Fairness monitoring | AI Ethics Officer |

#### Feedback Integration Process

```
Stakeholder Feedback
    │
    ├── Quantitative (surveys, ratings, metrics)
    │       → Dashboard → Monthly Performance Report → AI Governance Board
    │
    ├── Qualitative (interviews, focus groups, agent feedback)
    │       → Thematic Analysis → Quarterly Review → Action Items
    │
    └── Incident Reports (complaints, errors, near-misses)
            → Incident Log (AI_Incident_Log.md) → Root Cause Analysis → Remediation
```

---

## Appendix A — Stakeholder Register

| # | Stakeholder | Category | Interest Level | Influence Level | Key Concerns | Engagement Strategy |
|---|---|---|---|---|---|---|
| S-01 | Retail Banking Customers | **Affected Party** | High | Medium | Accuracy, privacy, ability to reach human, trust | In-chat feedback; surveys; focus groups |
| S-02 | Vulnerable Customers (elderly, low literacy, disabled) | **Affected Party** | High | Low | Accessibility, comprehension, not being trapped | Accessibility testing; escalation priority; UX research |
| S-03 | Customer Service Agents (Tier 1) | **Operator** | High | Medium | Job security, workload change, AI quality | Training; feedback portal; change management |
| S-04 | Customer Service Supervisors | **Operator** | High | High | Team management, quality monitoring, performance | Dashboard access; training; weekly reviews |
| S-05 | AI/ML Engineering Team | **Developer** | Medium | High | Technical feasibility, model quality, scalability | Sprint reviews; architecture decisions |
| S-06 | Compliance / Legal Department | **Internal Oversight** | High | High | Regulatory compliance, audit trail, consumer protection | Quarterly review; pre-deployment sign-off |
| S-07 | Data Privacy Officer | **Internal Oversight** | High | High | Data minimization, consent, cross-border transfer | DPIA; ongoing monitoring |
| S-08 | Information Security Team | **Internal Oversight** | High | High | Adversarial risks, data breaches, infrastructure security | Pen testing; red-teaming; security reviews |
| S-09 | Executive Leadership / Board | **Accountable** | Medium | High | ROI, reputation risk, strategic alignment | Board reporting; governance board |
| S-10 | Central Bank / Financial Regulator | **External Oversight** | High | High | Consumer protection, systemic risk, AI governance | Proactive briefings; compliance reporting |
| S-11 | Consumer Advocacy Groups | **External** | Medium | Medium | Fairness, transparency, recourse | Annual engagement; public reporting |

---

## Appendix B — Risk Register

> This register consolidates all risks identified in this MAP report. Each risk links to the [AI_Incident_Log.md](./AI_Incident_Log.md) for tracking if materialized.

| Risk ID | Category | Description | Likelihood | Impact | Rating | Owner | Control | Status |
|---|---|---|---|---|---|---|---|---|
| R-01 | Safety | Hallucinated financial information | Possible | Critical | 🔴 Critical | AI/ML Lead | RAG-only; no open-ended generation | Open |
| R-02 | Safety | Failure to escalate distressed customer | Possible | High | 🔶 High | AI/ML Lead | Sentiment detection; topic-based escalation | Open |
| R-03 | Fairness | Bias against non-standard English speakers | Possible | High | 🔶 High | AI Ethics Officer | Bias testing; multilingual roadmap | Open |
| R-04 | Privacy | PII exposure in conversation logs | Unlikely | Critical | 🔶 High | DPO | PII filtering; data minimization; encryption | Open |
| R-05 | Security | Prompt injection / jailbreak attack | Possible | High | 🔶 High | InfoSec Lead | Input sanitization; output filtering; red-teaming | Open |
| R-06 | Operational | Over-reliance on AI (reduced human capacity) | Possible | Medium | ⚠️ Medium | CS Lead | Maintain minimum human staffing levels | Open |
| R-07 | Reliability | Model drift / degraded performance | Possible | Medium | ⚠️ Medium | AI Operations | Monthly accuracy benchmarking; drift monitoring | Open |
| R-08 | Transparency | Customer confusion (AI vs. human) | Unlikely | Medium | ⚠️ Medium | UX Lead | Clear AI disclosure at conversation start | Open |
| R-09 | Organizational | Agent job displacement / morale impact | Possible | Medium | ⚠️ Medium | HR + CS Lead | Upskilling program; role evolution plan | Open |
| R-10 | Compliance | Regulatory non-compliance | Unlikely | Critical | 🔶 High | Compliance | Pre-deployment compliance review; monitoring | Open |
| R-11 | Resilience | System outage with no fallback | Unlikely | High | ⚠️ Medium | Infrastructure | Graceful degradation; human routing fallback | Open |
| R-12 | Privacy | Cross-border data transfer violation | Unlikely | High | ⚠️ Medium | DPO | Cloudflare data residency controls; DPA review | Open |
| R-13 | Accountability | Insufficient audit trail | Unlikely | High | ⚠️ Medium | Compliance | Comprehensive conversation logging; 90-day anonymized retention | Open |

---

## Appendix C — Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FinAssist AI — Data Flow                            │
└─────────────────────────────────────────────────────────────────────────────┘

  ┌──────────┐    HTTPS/TLS 1.3     ┌─────────────────────┐
  │ Customer │ ──────────────────►  │  Web Portal /       │
  │ (Browser │ ◄──────────────────  │  Mobile App         │
  │  / App)  │    AI Response       │  (Frontend)         │
  └──────────┘                      └────────┬────────────┘
                                             │
                                    API Call │ (WebSocket / REST)
                                             │
                                    ┌────────▼────────────┐
                                    │  Backend API        │
                                    │  (Session Mgmt,     │
                                    │   Auth, Logging)     │
                                    └────────┬────────────┘
                                             │
                          ┌──────────────────┼──────────────────┐
                          │                  │                  │
                 ┌────────▼──────┐  ┌───────▼───────┐ ┌───────▼───────┐
                 │ Cloudflare    │  │ Cloudflare    │ │ Core Banking  │
                 │ Workers AI    │  │ AI Search /   │ │ System (API)  │
                 │ (LLM Inference│  │ Vectorize     │ │ [Read-Only]   │
                 │  at Edge)     │  │ (RAG Retrieval│ │               │
                 └───────────────┘  │  from KB)     │ └───────────────┘
                                    └───────────────┘
                                             │
                                    ┌────────▼────────────┐
                                    │ Knowledge Base      │
                                    │ (CMS — Compliance-  │
                                    │  Reviewed Content)   │
                                    └─────────────────────┘

  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
  │ Conversation Log │     │ CRM / Ticketing  │     │ Monitoring       │
  │ (Encrypted,      │     │ System           │     │ Dashboard        │
  │  90-day PII      │     │ (Escalation      │     │ (Supervisor      │
  │  retention)      │     │  Context)        │     │  Real-Time View) │
  └──────────────────┘     └──────────────────┘     └──────────────────┘
```

**Data Classification:**

| Data Element | Classification | Handling Rule |
|---|---|---|
| Customer text input | Confidential | Encrypted in transit + at rest; no PII retention beyond session |
| AI-generated response | Internal | Logged for audit; anonymized after 90 days |
| Session metadata | Internal | Retained for analytics (anonymized) |
| Customer segment (non-PII) | Internal | Used for context; not linked to individual identity |
| Conversation logs | Confidential | Encrypted; access-controlled; 90-day PII retention limit |
| Knowledge base content | Internal | Compliance-reviewed before publication |

---

## Appendix D — Regulatory Mapping

| Regulation / Standard | Relevance to FinAssist AI | Status |
|---|---|---|
| **Data Protection Act** (or equivalent) | Processing of personal data in conversations; data subject rights; cross-border transfer | ⬜ Reviewed |
| **Central Bank Consumer Protection Guidelines** | Transparency in AI-assisted customer interactions; right to human service | ⬜ Reviewed |
| **AML/KYC Regulations** | Chatbot must not be used to circumvent identity verification processes | ⬜ Reviewed |
| **Financial Consumer Protection** | Accuracy of product/service information; no misleading statements | ⬜ Reviewed |
| **Outsourcing / Third-Party Risk Guidelines** | Cloudflare as critical third-party service provider; cloud outsourcing requirements | ⬜ Reviewed |
| **Accessibility Regulations** | WCAG 2.1 AA compliance for digital channels | ⬜ Reviewed |
| **NIST AI RMF 1.0** | Voluntary framework; this document implements MAP function | ✅ Implemented |
| **ISO/IEC 42001 (AI Management System)** | Emerging standard for AI governance; alignment desirable | ⬜ Planned |

---

## Appendix E — Sign-Off Sheet

| Role | Name | Signature | Date | Comments |
|---|---|---|---|---|
| **AI Project Lead** | | | | |
| **AI Risk Officer** | | | | |
| **AI Ethics Officer** | | | | |
| **Compliance / Legal** | | | | |
| **Data Privacy Officer** | | | | |
| **Information Security** | | | | |
| **Customer Service Lead** | | | | |
| **Chief AI Officer** (Final Approver) | | | | |

---

## 📎 Cross-References

| Document | Link |
|---|---|
| AI Governance Policy | [AI_Governance_Policy.md](./AI_Governance_Policy.md) |
| AI System Inventory | [AI_System_Inventory.csv](./AI_System_Inventory.csv) |
| AI Roles Matrix | [AI_Roles_Matrix.md](./AI_Roles_Matrix.md) |
| AI Impact Assessment Template | [AI_Impact_Assessment_Template.md](./AI_Impact_Assessment_Template.md) |
| AI Incident Log | [AI_Incident_Log.md](./AI_Incident_Log.md) |
| NIST AI RMF Playbook Study Notes | [NIST_AI_RMF_Playbook_Study_Notes.md](./NIST_AI_RMF_Playbook_Study_Notes.md) |

---

> **Next Step:** Complete the **MEASURE** function — define metrics, testing protocols, and evaluation criteria for FinAssist AI. Say `START MEASURE` when ready.

