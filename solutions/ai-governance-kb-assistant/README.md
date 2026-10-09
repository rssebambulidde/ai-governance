# AI Governance Knowledge Base and Assistant

A SamaBrains solution: a **curated knowledge base** of practice pages, blog posts, and public AI governance, security, and responsible-AI frameworks, plus an **assistant** that answers from that corpus with **named references**.

Built **at and for SamaBrains** so staff and customers get instant access to governance information instead of hunting PDFs, posts, and service pages by hand.

Live: [https://samabrains.com/ask/](https://samabrains.com/ask/)

## Problem

AI governance information at SamaBrains did not live in one place. Practice pages, blog posts, and public frameworks (NIST AI RMF, Uganda’s Data Protection and Privacy Act, and other references the practice actually uses) sat in different tools and formats. Staff preparing a review, a training, or a client reply had to search by hand. Customers asking what SamaBrains does, or what a named framework requires, could not get an instant, cited answer from the same corpus.

The result was delay and weak attribution: people either spent time hunting, or they received an answer with no fileable reference. A general chatbot would make that worse — fluent text with no bound to SamaBrains’ knowledge or to the frameworks the practice is willing to stand behind.

SamaBrains needed an **AI governance assistant** over a **curated knowledge base**: staff and customers get instant access to governance information and **named references**, with a clear limit that this is not legal advice.

## Innovation

One assistant over one knowledge base, used in two ways:

- **Knowledge base** — the practice site, the blog, and uploaded public frameworks the practice works with. Not an open web scrape.
- **Assistant** — Ask on the site, search (Ctrl/Cmd+K), and blog search. Answers are meant to come with a source you can open.

Staff and customers query the **same** corpus, so a reference a customer follows is the same class of source a reviewer would use internally.

## Who it is for

| Audience | Need | Where they use it |
| --- | --- | --- |
| **SamaBrains staff** | Instant lookup while preparing a review, training, or client reply | Site search / Ctrl+K (Cmd+K), [blog search](https://blog.samabrains.com/search) |
| **Customers and visitors** | What the practice does, and what named public frameworks say, with links they can follow | [Ask](https://samabrains.com/ask/) |

## What you can do

- Ask a question in natural language and get an answer grounded in the corpus.
- Search and see hits with titles and URLs or document names.
- Follow a **reference** (practice page, post, or framework item) instead of trusting uncited prose.

## Try it

1. [Ask SamaBrains](https://samabrains.com/ask/)
2. On [samabrains.com](https://samabrains.com/), press Ctrl+K or Cmd+K
3. [Blog search](https://blog.samabrains.com/search)

Try: `Uganda data protection`, `NIST AI RMF`, `AI governance review`.

You should see an answer or a hit plus a **named source**, not a generic chatbot with no trail.

## How it is grounded

- [Architecture](docs/architecture.md) — staff and customers → Ask/search → one API → three indexes
- [Knowledge base](docs/knowledge-base.md) — what is in the corpus, and what is not
- [Controls](docs/controls.md) — scope, citations, access, refusals

## What it will not do

- Give **legal advice**. Use counsel and official texts for compliance decisions.
- Search the open web or crawl regulator sites (nist.gov, EUR-Lex, and similar).
- Invent a source. If the corpus does not cover the question, the honest outcome is a miss or a bounded “we don’t hold that here.”

## Skills this demonstrates

- Designing an in-house assistant for **two audiences** (practice staff and customers)
- Turning a scattered corpus into **instant, attributable** governance and security reference
- Bounding what the assistant may say (scope, citations, not legal advice)
- Shipping it as a **live SamaBrains capability**, not a slide deck
