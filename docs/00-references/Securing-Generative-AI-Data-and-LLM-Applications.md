# Securing Generative AI: Data, Attacks, and Controls

### A practical security guide for data ingestion, LLM applications, and runtime defenses

> **Reviewed: 25 October 2026.** This guide summarizes security practices for generative AI applications, with FinAssist as a running example. It is educational guidance, not a certification or substitute for a system-specific threat model. The OWASP GenAI LLM Top 10 2026 is used below; rankings and guidance may change in later editions.

## 1. Security starts with the whole system

An LLM application is more than a model. It includes user interfaces, identity and access management, prompts, data sources, retrieval and vector stores, orchestration code, tools, logs, vendors, and the people who act on outputs. An attacker may target any of these components or exploit the way information flows between them.

For security design, assume model output can be wrong or manipulated. The application must enforce identity, permissions, data boundaries, and allowed actions in ordinary trusted software. Do not rely on a system prompt or a refusal message as an access-control boundary.

**Example:** FinAssist can retrieve approved support guidance and provide self-service instructions. It should not receive broad banking permissions simply because a customer asks it to do something. The repository's system context defines core banking access as read-only and excludes transaction execution.

## 2. Control data inputs and outputs

Treat every path into and out of the model as a security boundary. Inputs include user text, uploaded files, retrieved passages, tool responses, conversation history, and stored memory. Outputs include visible answers, structured data, tool arguments, logs, summaries, and content passed to another system.

### Input controls

- Authenticate users and services; validate session, request size, file type, encoding, and expected fields before processing.
- Minimize input data. Remove or tokenize sensitive identifiers when the task does not need them.
- Label each source by owner, provenance, sensitivity, and trust level. Treat public or user-supplied content as untrusted even when it is retrieved from an internal system.
- Scan and safely parse files and multimodal content; defend against malformed files, hidden instructions, and content that changes meaning when extracted by OCR or transcription.
- Apply abuse controls such as quotas, throttling, bot detection, and request timeouts at the application boundary.
- Keep instructions and data conceptually distinct in orchestration, but assume the model can still be influenced by untrusted content in its context.

### Output controls

- Treat generated text and structured output as untrusted input to the next component.
- Validate output against a strict schema in trusted code. Check both structure and whether values are allowed for the requested operation.
- Encode output for its destination and sanitize rendered HTML, Markdown, URLs, SQL, shell commands, and other executable or active formats.
- Apply policy checks for sensitive information, disallowed advice, unsupported claims, and content outside the use case before display or downstream use.
- Require human confirmation for sensitive, irreversible, financial, or externally visible actions; show the reviewer the exact action and arguments to be executed.
- Log security-relevant events with appropriate redaction, access limits, and retention controls. Never log secrets or unrestricted sensitive prompts by default.

For FinAssist, the response layer should not be able to turn a generated answer into a transaction. It can present reviewed guidance and route a customer to an approved service flow or human agent.

## 3. Safe data ingestion and entitlement enforcement

Data ingestion covers collection, upload, import, transformation, indexing, retrieval, and retention. A safe pipeline establishes that data is authorized for the intended purpose before it becomes available to the model.

### A practical ingestion workflow

1. **Verify source and purpose.** Confirm the source owner, permitted purpose, license or contractual basis, sensitivity, and whether the source may be used for retrieval, training, evaluation, or logging. These are separate uses and should be approved separately.
2. **Authenticate and authorize the ingestion job.** Use a workload identity with only the permissions required for that source and task. Keep credentials in a secrets manager; do not place them in prompts, datasets, or logs.
3. **Validate and scan.** Check file type and size, parse safely, scan for malware, detect secrets and sensitive data, and reject unexpected formats or content. Record provenance and integrity metadata.
4. **Minimize and prepare.** Remove unnecessary fields, redact or tokenize identifiers where appropriate, normalize content, and attach stable source, owner, sensitivity, and access labels.
5. **Enforce entitlements before indexing and retrieval.** Preserve document-level or record-level permissions. At query time, authorize the current user and apply the access filter in the retrieval service or a trusted policy layer before passages are sent to the model.
6. **Protect the index and lifecycle.** Restrict writes, separate environments and tenants, encrypt data, monitor changes, and provide deletion or re-indexing processes when access is revoked, data expires, or a source is corrected.
7. **Test the boundaries.** Verify allowed and denied access for users, groups, tenants, revoked identities, and indirect retrieval paths. Check that unauthorized content cannot leak through answers, citations, summaries, logs, caches, or agent memory.

### Entitlements mean permissions are checked for the actual user

An entitlement is an authorization to access a particular resource or perform an action. For retrieval-augmented generation (RAG), the system should carry the authenticated user's identity or a trusted delegated context into retrieval. The retrieval layer or an authorization service must filter results using that user's current permissions. Filtering only after retrieval can still expose restricted text to the model, logs, traces, or caches.

Apply least privilege at every layer:

- **User identity:** authenticate the person and resolve current roles, groups, tenant, and resource permissions.
- **Service identity:** scope the retriever, model gateway, indexer, and tools independently; do not use a shared administrator credential.
- **Document permissions:** store access metadata with each chunk and keep it synchronized with the source system.
- **Action permissions:** authorize every tool call and operation in application code at execution time, including the specific target and arguments.
- **Failure behavior:** fail closed when identity, policy, permission metadata, or authorization services are unavailable. Do not silently fall back to an unfiltered index.
- **Cache behavior:** include identity and permission context in cache keys, or avoid caching sensitive retrieved content across users.

Do not ask the LLM to decide whether a user is allowed to see a document. The LLM may help interpret a request, but a trusted authorization component must make and enforce the access decision.

## 4. Common attacks against generative AI systems

Attacks can target data, models, application code, infrastructure, people, and supply chains. Common patterns include:

| Attack | What happens | Example impact |
|---|---|---|
| Direct prompt injection or jailbreak | A user crafts input to steer the model around intended constraints. | The model gives prohibited guidance or attempts an unauthorized action. |
| Indirect prompt injection | Malicious instructions are embedded in a document, web page, email, retrieved passage, image, or tool response. | A RAG answer is manipulated or an agent is induced to expose data. |
| Data or model poisoning | An attacker corrupts training, fine-tuning, feedback, memory, or a retrieval corpus. | The system learns or retrieves attacker-chosen behavior or content. |
| Sensitive information disclosure | The response, retrieval context, memory, or logs reveal information to an unauthorized party. | Private customer content or business data leaks. |
| Excessive agency and tool abuse | The application grants broad tools or permissions and accepts model-directed actions without sufficient checks. | A compromised assistant accesses or changes systems beyond the user’s rights. |
| Supply-chain compromise | A model, package, plugin, connector, dataset, or hosted service is malicious, vulnerable, or changed unexpectedly. | Attacker-controlled behavior enters through a dependency or provider. |
| Resource exhaustion | Repeated or crafted requests consume tokens, compute, storage, or paid API capacity. | Service disruption, degraded availability, or unexpected cost. |
| Output exploitation | Downstream code trusts generated text as HTML, SQL, code, a URL, or a command. | Cross-site scripting, injection, code execution, or unsafe actions. |
| Model extraction or inference | Queries are used to infer sensitive training data, model behavior, or protected attributes. | Privacy loss or intellectual property exposure. |
| Denial of service and conventional compromise | Attackers target APIs, identity, dependencies, containers, networks, or operations. | The AI service or connected systems become unavailable or compromised. |

Prompt injection deserves special treatment: it can arrive indirectly through content the user did not author or see. OWASP notes that current LLMs do not provide a reliable architectural separation between instructions and data. No single prompt filter can guarantee prevention; design controls to limit the consequences if the model is manipulated.

## 5. OWASP GenAI LLM Top 10 (2026)

The current OWASP GenAI Security Project LLM Top 10 is the **2026 edition**. It describes risks in applications built around LLMs. The names below follow the published list; the control notes are concise implementation guidance, not full OWASP definitions.

| ID | Risk | Practical focus |
|---|---|---|
| LLM01:2026 | Prompt Injection | Treat direct and indirect content as untrusted; restrict privileges and validate all downstream actions. |
| LLM02:2026 | Sensitive Information Disclosure | Minimize sensitive context, enforce authorization before retrieval, and inspect outputs and logs. |
| LLM03:2026 | Excessive Agency | Limit tools, permissions, autonomy, and action scope; re-authorize each call and require approval where needed. |
| LLM04:2026 | Supply Chain | Inventory and verify models, datasets, plugins, packages, connectors, and providers; pin and monitor dependencies. |
| LLM05:2026 | Data and Model Poisoning | Control who can change training, feedback, memory, and RAG sources; track provenance and test for tampering. |
| LLM06:2026 | Unbounded Consumption | Set per-user and per-tenant quotas, token and time limits, concurrency bounds, and cost/abuse alerts. |
| LLM07:2026 | Misinformation | Ground answers in trusted sources, communicate uncertainty, evaluate factual behavior, and provide a human route. |
| LLM08:2026 | Hidden Context Exposure | Keep internal prompts, credentials, private context, and other hidden data out of user-visible and untrusted channels. |
| LLM09:2026 | Vector and Embedding Weaknesses | Secure index contents and metadata, isolate tenants, enforce permissions during retrieval, and test poisoning or leakage. |
| LLM10:2026 | Improper Output Handling | Validate, encode, sanitize, and constrain model outputs before rendering or passing them to another system. |

The Top 10 is a threat-awareness aid, not a compliance checklist or substitute for application threat modeling. For autonomous or tool-using agents, pair it with OWASP's [Top 10 for Agentic Applications](https://genai.owasp.org/initiatives/agentic-security/).

## 6. NIST Trustworthy and Responsible AI: adversarial ML perspective

NIST's **Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations** (NIST AI 100-2) organizes attacks by AI system type, lifecycle stage, attacker goal and capability, and attacker knowledge. For generative AI, it discusses four broad classes:

- **Evasion:** manipulate inputs at use time so the system behaves incorrectly or avoids intended detection.
- **Poisoning:** manipulate data or model development so the system behaves maliciously or unreliably later.
- **Privacy attacks:** infer or extract sensitive information about data, users, or the model.
- **Misuse attacks:** use a generative system to produce harmful outputs or support harmful activity.

NIST's **AI RMF Generative AI Profile** (NIST AI 600-1) applies the AI RMF's Govern, Map, Measure, and Manage functions to generative AI. In practice, teams should:

- **Govern:** assign security ownership, define acceptable use and risk tolerances, and oversee providers and dependencies.
- **Map:** describe the use case, data flows, exposed interfaces, users, affected parties, threat actors, and possible harms.
- **Measure:** test security and privacy claims with representative and adaptive attack testing; measure false positives, false negatives, and residual risk.
- **Manage:** prioritize mitigations, maintain incident and fallback procedures, monitor changes, and update controls as evidence changes.

Trustworthy AI security is a lifecycle concern. Traditional cybersecurity controls remain necessary, and AI-specific attacks add risks around training and retrieval data, model behavior, generated content, and the way people or software rely on outputs.

## 7. Technical measures: layered defenses

Use multiple independent controls so a single model failure does not become a data breach or unauthorized action.

### Identity, data, and infrastructure

- Use strong authentication, short-lived credentials, workload identity, secrets management, and role or attribute-based authorization.
- Isolate tenants, environments, and sensitive workloads; encrypt data in transit and at rest; manage keys separately.
- Apply conventional secure development: dependency scanning, code review, patching, hardened runtimes, network segmentation, and tested backups.
- Control data lineage and changes for training corpora, retrieval indexes, prompt templates, evaluation sets, and memory stores.
- Restrict egress and destination allowlists for model services and tools; prevent arbitrary external requests where the use case does not require them.

### Model and application boundary

- Place a controlled application gateway between clients and model providers; authenticate requests, apply quotas, and avoid exposing provider credentials to clients.
- Keep system prompts and policy configuration server-side. Treat prompt secrecy as defense-in-depth only, not as an authorization control.
- Use retrieval from approved sources, preserve provenance, apply entitlements before context construction, and cap the amount of retrieved data.
- Keep model access read-only where possible. Put privileged operations behind narrow, deterministic application functions with explicit argument validation and per-action authorization.
- Use structured outputs where appropriate and validate them in deterministic code. Do not execute generated code or commands directly.
- Apply content and privacy checks to inputs and outputs, with safe fallbacks such as refusal, clarification, or human escalation.

### Testing and operations

- Threat-model direct and indirect injection, unauthorized retrieval, cross-tenant leakage, data poisoning, unsafe output rendering, tool misuse, denial of service, and vendor failure.
- Red-team the complete application, not just the base model, using realistic documents, multiple languages and modalities, adaptive attacks, and tool chains where applicable.
- Monitor for abnormal access, retrieval patterns, refusal changes, data leakage, quota spikes, tool invocation, and provider/model changes.
- Keep a tested kill switch, service fallback, incident playbook, and procedure to revoke credentials, quarantine data, and rebuild a contaminated index.
- Re-test after model, prompt, tool, retrieval, data, or policy changes and after relevant incidents.

## 8. LLM firewall: useful layer, not a security boundary

An **LLM firewall** (also called an AI gateway or LLM security gateway) is a control point that inspects and governs traffic between an application and one or more model services. Depending on implementation, it may provide:

- centralized authentication, provider routing, model allowlists, and API key protection;
- request and response logging with redaction and retention controls;
- token, rate, and cost limits;
- detection or screening for known prompt-injection patterns, sensitive data, malware, or policy violations;
- output checks, schema enforcement, and safe refusal or escalation routing; and
- visibility into model, user, tenant, and tool activity.

An LLM firewall can improve consistency and observability, but it cannot reliably understand every semantic attack or guarantee that a model will follow instructions. It may miss indirect, encoded, multilingual, multimodal, or novel attacks and may incorrectly block legitimate content. It also cannot grant or revoke the caller's real permissions unless it is connected to an authoritative identity and policy system.

Use the firewall alongside application-side entitlement checks, least-privilege tool design, secure retrieval, output validation, network and infrastructure controls, monitoring, and red-team testing. Keep high-impact decisions and authorization enforcement in trusted application code.

### FinAssist control example

For a card-support question, a defensible flow is:

1. Authenticate the customer and collect only the context required for support.
2. Retrieve only compliance-reviewed guidance the customer or service is entitled to access; apply access filtering before retrieved text enters the model context.
3. Send the request through a gateway that enforces provider allowlists, quotas, and logging rules.
4. Generate an informational response without transaction tools or write access to banking systems.
5. Validate and scan the response before display; route complaints, sensitive topics, uncertainty, or requests outside scope to a human agent.
6. Record security events with minimized, access-controlled data, and monitor for leakage, injection, retrieval abuse, and unusual volume.

## 9. Security review checklist

- [ ] Is every input source identified, labeled, and treated according to its trust level?
- [ ] Are purpose and entitlements checked before data is indexed, retrieved, or sent to a model?
- [ ] Can any user retrieve another user's or tenant's content through RAG, cache, log, memory, or summary?
- [ ] Are model outputs validated and safely handled before rendering, storage, or downstream action?
- [ ] Are tool permissions narrow, and is each operation re-authorized outside the model?
- [ ] Are limits in place for file size, context, tokens, rate, concurrency, and cost?
- [ ] Are providers, models, data sources, packages, and connectors inventoried and monitored?
- [ ] Has the full application been tested against direct and indirect attacks, leakage, poisoning, and abuse?
- [ ] Can the service fail safely, route to a human, and be disabled quickly during an incident?
- [ ] Are monitoring, incident response, retention, and re-testing responsibilities assigned?

## Related project references

- [FinAssist AI System Context Report](../02-map/MAP-AI-System-Context-Report.md)
- [TEVV Metrics Framework](../03-measure/MEASURE-TEVV-Metrics-Framework.md)
- [Bias Testing Methodology and security test suites](../03-measure/MEASURE-Bias-Testing-Methodology.md)
- [Incident Response Playbook](../04-manage/MANAGE-Incident-Response-Playbook.md)
- [NIST AI RMF Generative AI Profile (NIST AI 600-1)](https://doi.org/10.6028/NIST.AI.600-1)
- [NIST Adversarial Machine Learning taxonomy (NIST AI 100-2)](https://doi.org/10.6028/NIST.AI.100-2e2023)
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/)
- [OWASP GenAI Security Project](https://genai.owasp.org/)
