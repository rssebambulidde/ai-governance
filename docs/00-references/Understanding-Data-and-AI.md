# Understanding Data and AI

### A beginner's guide to data, AI, and the processes that connect them

> **Purpose:** Explain how data and AI work together, what data + AI mapping means, and how to trace an AI system through a real process. The FinAssist example is based on the repository's proposed customer support chatbot. It is an educational example, not a description of a deployed production service.

## 1. The relationship between data and AI

Data is recorded information: words, numbers, images, events, measurements, or records. AI is a set of computer methods that use information to perform tasks such as recognizing patterns, classifying requests, finding relevant material, or generating a response.

AI does not operate in isolation. People choose a task, provide or make available data, select and configure the AI, and decide what happens with its output. The AI's result then becomes part of a larger process. That result may guide a person, trigger another system step, or become information used for later analysis.

For example, a customer types, “How do I freeze my card?” FinAssist receives the text, identifies the likely intent, retrieves relevant guidance from a reviewed knowledge base, and drafts an answer. The customer or a human support agent then acts on that answer. The AI provides information; the bank's process determines what actions are allowed and when a person must help.

### A simple way to picture it

**People and process + data + AI system → output → human or system action → outcome**

The quality and safety of the outcome depend on all of these parts. A capable AI can still produce a poor result if its information is inaccurate, its task is unclear, or the surrounding process has no suitable review or escalation step.

## 2. What is data + AI mapping?

**Data + AI mapping** is the practice of tracing how data, people, systems, and decisions connect in an AI use case. It makes visible what information enters the system, what the AI does with it, where its output goes, and who is accountable for the next step.

Mapping helps a team answer practical questions:

- What problem or task is the AI intended to support?
- Which people and business steps are involved before and after the AI step?
- What data does the system receive, retrieve, create, or store?
- Where does the data come from, and who can access it?
- What output does the AI produce, and who sees or acts on it?
- What happens when the information is missing, wrong, sensitive, or outside the AI's scope?

Mapping is not just a diagram of software. It includes the work people do, the rules they follow, and the effects a result may have on customers or staff.

## 3. Unpacking the data and process tied to AI

Start by describing the process in ordinary language, from the user's initial need through to the final outcome. Then mark where AI appears. At each step, record the information used and the responsibility for what happens next.

| Part of the map | What to identify | FinAssist example |
|---|---|---|
| User need | Who needs help, and what are they trying to do? | A retail banking customer needs instructions to freeze a card. |
| Process | What steps happen from request to resolution? | Ask a question, receive guidance, follow self-service steps, or contact an agent. |
| Input data | What information is provided to or accessed by the AI? | Customer's message and relevant conversation context. |
| Reference data | What approved information does the AI use? | Compliance-reviewed product and support content in a knowledge base. |
| AI task | What does the AI do with the information? | Classifies intent, retrieves relevant guidance, and drafts a natural-language answer. |
| Output | What does the AI create or recommend? | An answer, a self-service explanation, or an escalation route and summary. |
| Human role | Who checks, decides, or takes responsibility? | A support agent handles complaints, sensitive cases, or requests outside the chatbot's scope. |
| Outcome and records | What happens next, and what is recorded? | Customer follows the guidance or is transferred to an agent; permitted logs support service and oversight. |

This example is intentionally limited to information retrieval, guided self-service, and escalation. The repository's context report states that FinAssist is not intended to execute financial transactions or make lending, credit, or insurance decisions.

## 4. Trace a process step by step

Use this sequence to build a first map:

1. **Name the goal.** State the service or work problem in one sentence. Avoid starting with “we need AI.”
2. **Write the current process.** List what the user, staff, and existing systems do from beginning to end.
3. **Mark the AI step.** Describe the specific task, such as classifying a request or drafting an answer. Keep the task within a defined scope.
4. **Trace information in.** Record each input and reference source, where it comes from, whether it may contain personal or sensitive information, and who may access it.
5. **Trace information out.** Record the AI's output, who receives it, and whether it is advice, a draft, a recommendation, or an automated action.
6. **Show human decisions.** Identify who reviews the output, handles exceptions, and can override or stop the AI-supported process.
7. **Follow the outcome.** Note what is done, what records are created, and whether the outcome or feedback becomes data used later.
8. **Check failure paths.** Map what happens when data is missing, stale, inaccurate, irrelevant, or when the AI is uncertain or unavailable.

### FinAssist example: card-freeze question

1. The customer asks how to freeze a card in the web portal or mobile app.
2. The system receives the text and relevant session context.
3. FinAssist identifies the request and retrieves the approved card-support instructions.
4. The AI drafts an answer from the retrieved information and presents it to the customer.
5. The customer follows the bank's self-service process. FinAssist does not carry out the financial action itself.
6. If the request involves a complaint, sensitive issue, or falls outside scope, the process routes it to a human agent with conversation context.
7. The support team can use permitted, access-controlled records for service follow-up and monitoring under the applicable retention rules.

## 5. Questions to ask about data

Data mapping is useful only when a team examines the information, not merely draws arrows between systems.

### Quality and suitability

- Is the information accurate, current, and relevant to the task?
- Does the knowledge base have an owner and a review process?
- Does the data reflect the people who will use the service, including different languages and accessibility needs?
- Could gaps or patterns in the data cause some users to receive worse results?

### Access and handling

- Is each data source necessary for this task?
- Does the system need identifiable or sensitive information, or can it work with less?
- Who can access input messages, AI outputs, logs, and escalation records?
- Where is data processed, how is it protected, and how long is it retained?
- Are vendors or connected systems involved in processing or storing it?

### Use and accountability

- Is the data being used for the purpose people expect?
- Could an output expose private information or be mistaken for a verified decision?
- Who checks the output and handles an error or complaint?
- Can the user reach a person when needed?
- How will the team detect and correct problems over time?

## 6. What mapping gives the team

A clear map helps teams decide whether AI fits the task, what controls are needed, and where more information is required. It gives project, data, engineering, operations, privacy, and governance teams a shared view of:

- the intended task and boundaries;
- data sources, movement, access, and retention;
- the people and systems affected by each step;
- human review, escalation, and fallback paths; and
- the outcomes and signals that need monitoring.

The map is a working document. Update it when the process, data sources, AI capabilities, users, or operating environment change.

## Related references

- [FinAssist AI System Context Report](../02-map/MAP-AI-System-Context-Report.md)
- [NIST AI RMF Learning Guide](NIST-AI-RMF-Learning-Guide.md)
- [AI System Inventory](../01-govern/AI-System-Inventory.csv)
