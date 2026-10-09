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

## Architecture

Staff and customers use different doors. They hit the same API and the same knowledge base, so references stay consistent.

```text
SamaBrains staff ──► Ctrl/Cmd+K and search ──┐
                                             ├──► chat.samabrains.com ──► knowledge base
Customers / visitors ──► /ask/  ─────────────┘              │
                                                            ▼
                              samabrains-site     (crawl samabrains.com)
                              samabrains-blog     (crawl blog.samabrains.com)
                              samabrains-gov-kb   (uploaded framework items)
```

### Surfaces

| Surface | Audience | URL |
| --- | --- | --- |
| Ask (chat page) | Customers and visitors; staff who want a conversation | [samabrains.com/ask/](https://samabrains.com/ask/) |
| Site search / Ctrl+K | Staff and anyone on the practice site | [samabrains.com](https://samabrains.com/) |
| Blog search | Staff and readers on the blog | [blog.samabrains.com/search](https://blog.samabrains.com/search) |

Chat bubble and nav search on the site share the same API as Ask.

### Indexes

| Index | How it is filled | What it holds |
| --- | --- | --- |
| `samabrains-site` | Crawl | Practice pages: services, about, legal, Ask, and related site content |
| `samabrains-blog` | Crawl | Posts, categories, and tags on the SamaBrains blog |
| `samabrains-gov-kb` | Uploaded items | Public frameworks the practice works with (see Knowledge base below) |

### Why one API

`https://chat.samabrains.com/` is the public endpoint for search and chat. One API means:

- A customer on Ask and a staff member using Ctrl+K are not looking at two different “truths.”
- Citations resolve to the same site pages, posts, and framework items.
- Scope (query rewrite, not legal advice) is applied in one place.

Implementation sits on Cloudflare AI Search. The product is the SamaBrains knowledge base and assistant, not the vendor console.

## Knowledge base

The corpus is **curated**. It is what SamaBrains is willing to retrieve from — not “everything on the internet about AI governance.”

This section lists **what is indexed**, by source and filename. It does **not** reproduce framework text. Use official publications for legal or regulatory work.

### Practice site (crawled)

Index: `samabrains-site`  
Origin: [https://samabrains.com/](https://samabrains.com/)

Includes the public practice: home, about and services, Ask, contact, legal pages, and other published site routes. Titles for retrieval come from page metadata (`og:title` / `meta name="title"`), not from guessing.

### Blog (crawled)

Index: `samabrains-blog`  
Origin: [https://blog.samabrains.com/](https://blog.samabrains.com/)

Includes published posts and taxonomy pages (for example category and tag archives). This is how staff and customers reach writing the practice has already stood behind.

### Uploaded frameworks (items)

Index: `samabrains-gov-kb`  
Method: items uploaded by the practice, not a live crawl of publisher websites.

| Item (filename) | Role in the corpus |
| --- | --- |
| `nist-ai-rmf-1.0.pdf` | NIST AI Risk Management Framework 1.0 — practice reference for how organisations manage AI risk |
| `nist-ai-600-1-genai-profile.pdf` | NIST generative AI profile — reference for genAI-specific risk language |
| `uganda-dppa-cap-97.md` | Uganda Data Protection and Privacy Act, Cap. 97 — readable text used after a scan PDF did not OCR |
| `uganda-dppa-cap-97.pdf` | Same Act as PDF (scan quality varies; markdown is the reliable retrieval copy) |
| `uganda-dppa-2019.pdf` | Earlier 2019 DPPA publication kept as a historical reference |

Filenames are keys in storage. Display titles are humanised or set as item metadata so a hit is not an empty or “undefined” heading.

### What is not in the corpus

- Live crawls of **nist.gov**, **EUR-Lex**, or other regulator/publisher sites
- **Paid ISO** (or similar) standards the practice does not have a licence to redistribute
- Client files, review workpapers, or other **confidential** engagement material
- Secrets, credentials, or internal Cloudflare/account configuration

If a framework is not in the table and not on the public site or blog, the assistant should not pretend to hold it.

## Controls

The assistant is useful only if people can trust **scope** and **references**. These are the controls SamaBrains applied.

### Scope and query rewrite

Chat is steered toward **AI governance, security, and responsible AI**, plus what the practice publishes. It is not a general-purpose assistant for arbitrary topics.

Query rewrite exists so a casual question still retrieves from the SamaBrains corpus instead of drifting into unbounded generation.

Every public surface states the limit: **this is not legal advice.**

### Citations and title integrity

A hit without a usable title is a failed control. Retrieval metadata must carry a real title (from `og:title` / `meta name="title"` on crawled pages, or item metadata / a humanised key on uploads).

If a title is missing, the live UI fills a readable fallback from the item key so staff and customers never see the literal word `undefined` as a source name. Index-side titles are the durable fix; the fallback is the display safety net.

### Access boundary

- Ask and search are **public** on purpose: customers need the same instant reference path as staff on the marketing site.
- The corpus itself contains **no secrets** (see Knowledge base above).
- The public API is a single hostname (`chat.samabrains.com`) used by the site and the blog. Cross-origin use is limited to those properties.

This is not an internal-only staff tool behind SSO. Confidential engagement files are **out of the corpus**, not “hidden” behind the same chat.

### Refusals

SamaBrains did **not**:

- Crawl nist.gov, EUR-Lex, or similar as a substitute for holding a copy the practice chose to index
- Upload paid ISO (or similar) standards
- Rely on an empty OCR of the Uganda DPPA scan — Cap. 97 is indexed as markdown the practice controls
- Present the assistant as a lawyer, a regulator, or the official gazette

If the knowledge base does not contain the answer, the correct behaviour is to miss or to say the practice does not hold that reference — not to invent one.

## What it will not do

- Give **legal advice**. Use counsel and official texts for compliance decisions.
- Search the open web or crawl regulator sites (nist.gov, EUR-Lex, and similar).
- Invent a source. If the corpus does not cover the question, the honest outcome is a miss or a bounded “we don’t hold that here.”

## Skills this demonstrates

- Designing an in-house assistant for **two audiences** (practice staff and customers)
- Turning a scattered corpus into **instant, attributable** governance and security reference
- Bounding what the assistant may say (scope, citations, not legal advice)
- Shipping it as a **live SamaBrains capability**, not a slide deck
