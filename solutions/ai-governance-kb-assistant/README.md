# AI Governance Knowledge Base and Assistant

Staff and customers at SamaBrains get **instant, cited answers** from the SamaBrains website, the blog, and a **frequently updated** store of official AI governance publications—not an unbounded chatbot.

**Live demo:** [https://samabrains.com/ask/](https://samabrains.com/ask/)

## Role / snapshot

Designed and shipped a grounded AI governance assistant for SamaBrains: staff and customers get instant, cited answers from the SamaBrains website, blog, and a frequently updated store of official AI governance publications—not an unbounded chatbot.

Use that paragraph on a CV, LinkedIn Featured, or a pitch deck. The rest of this page is evidence.

## Problem

AI governance information at SamaBrains did not live in one place. Website pages, blog posts, and public frameworks (for example NIST AI RMF or Uganda’s Data Protection and Privacy Act) sat in different tools and formats. Staff preparing a review, a training, or a client reply had to search by hand. Customers asking what SamaBrains does, or what a named framework requires, could not get an instant, cited answer from the same corpus.

The result was delay and weak attribution: people either spent time hunting, or they received an answer with no fileable reference. A general chatbot would make that worse—fluent text with no bound to SamaBrains’ knowledge or to the publications the practice is willing to stand behind.

SamaBrains needed an **AI governance assistant** over a **curated knowledge base**: instant access to information and **named references**, with a clear limit that this is not legal advice.

## Solution

One knowledge base, one assistant, two doors.

| | |
| --- | --- |
| **Knowledge base** | SamaBrains website, blog, and a living store of official, reputable AI governance publications. Not an open web scrape. |
| **Assistant** | Ask, site search (Ctrl/Cmd+K), and blog search. Answers are meant to come with a source you can open. |

Staff and customers query the **same** corpus, so a reference a customer follows is the same class of source a reviewer would use internally.

### Who it is for

| Audience | Need | Where they use it |
| --- | --- | --- |
| **SamaBrains staff** | Instant lookup while preparing a review, training, or client reply | Site search / Ctrl+K (Cmd+K), [blog search](https://blog.samabrains.com/search) |
| **Customers and visitors** | What the practice does, and what named public frameworks say, with links they can follow | [Ask](https://samabrains.com/ask/) |

### What you can do

- Ask in natural language and get an answer grounded in the corpus.
- Search and see hits with titles and URLs or document names.
- Follow a **reference** instead of trusting uncited prose.

### Try it

1. [Ask SamaBrains](https://samabrains.com/ask/)
2. On [samabrains.com](https://samabrains.com/), press Ctrl+K or Cmd+K
3. [Blog search](https://blog.samabrains.com/search)

Example queries: `Uganda data protection`, `NIST AI RMF`, `AI governance review`. You should see an answer or a hit plus a **named source**.

## Architecture

Staff and customers use different doors. They hit the same API and the same knowledge base.

```text
SamaBrains staff ──► Ctrl/Cmd+K and search ──┐
                                             ├──► chat.samabrains.com ──► knowledge base
Customers / visitors ──► /ask/  ─────────────┘              │
                                                            ▼
                              samabrains-site     (crawl samabrains.com)
                              samabrains-blog     (crawl blog.samabrains.com)
                              samabrains-gov-kb   (uploaded publications, refreshed often)
```

### Surfaces

| Surface | Audience | URL |
| --- | --- | --- |
| Ask (chat page) | Customers and visitors; staff who want a conversation | [samabrains.com/ask/](https://samabrains.com/ask/) |
| Site search / Ctrl+K | Staff and anyone on the SamaBrains website | [samabrains.com](https://samabrains.com/) |
| Blog search | Staff and readers on the blog | [blog.samabrains.com/search](https://blog.samabrains.com/search) |

Nav search and the chat bubble use the same API as Ask.

### Indexes

| Index | How it is filled | What it holds |
| --- | --- | --- |
| `samabrains-site` | Crawl | SamaBrains website: services, about, legal, Ask, and related pages |
| `samabrains-blog` | Crawl | Posts, categories, and tags on the SamaBrains blog |
| `samabrains-gov-kb` | Uploaded items, **updated frequently** | Official and reputable AI governance publications, so retrieval stays current rather than a stale snapshot |

### Why one API

`https://chat.samabrains.com/` is the public endpoint for search and chat. One API means one set of references and one set of scope rules (query rewrite, not legal advice). A customer on Ask and a staff member using Ctrl+K are not looking at two different “truths.”

The product is the SamaBrains knowledge base and assistant. Retrieval is implemented on Cloudflare AI Search.

## Knowledge base

The corpus is **curated**: what SamaBrains is willing to retrieve from—not “everything on the internet about AI governance.” This page does **not** reproduce publication text. Use official sources for legal or regulatory work.

### SamaBrains website (crawled)

Index: `samabrains-site` · [samabrains.com](https://samabrains.com/)

Public pages: home, about and services, Ask, contact, legal, and other published routes. Retrieval titles come from page metadata (`og:title` / `meta name="title"`).

### Blog (crawled)

Index: `samabrains-blog` · [blog.samabrains.com](https://blog.samabrains.com/)

Published posts and taxonomy pages. Staff and customers reach writing the practice has already stood behind.

### Governance publications (uploaded, living)

Index: `samabrains-gov-kb`

SamaBrains **indexes and refreshes** this store with **up-to-date** material from **official and reputable** AI governance publications—standards bodies, regulators, and recognised guidance the practice will stand behind. Items are **curated uploads**, not a live scrape of publisher websites. Frequency of refresh is part of the control: staff and customers should retrieve current guidance, not last year’s PDF left in a folder.

Display titles come from item metadata (or a readable fallback from the item key) so a hit is never the literal word `undefined`.

### What is not in the corpus

- Live crawls of nist.gov, EUR-Lex, or other regulator/publisher sites
- Paid standards the practice is not licensed to hold or redistribute
- Client files, review workpapers, or other confidential engagement material
- Secrets, credentials, or internal account configuration

If a publication is not in this store and not on the public site or blog, the assistant should not pretend to hold it.

## Controls

The assistant is useful only if people can trust **scope** and **references**.

### Scope and query rewrite

Chat is steered toward **AI governance, security, and responsible AI**, plus what the practice publishes. Query rewrite keeps a casual question inside the SamaBrains corpus. Every public surface states: **this is not legal advice.**

### Citations and title integrity

A hit without a usable title is a failed control. Crawled pages need `og:title` or `meta name="title"`. Uploads need metadata or a humanised key. The live UI falls back to a readable name so staff and customers never see `undefined` as a source.

### Access boundary

Ask and search are **public** so customers share the same instant path as staff on the site. The corpus contains **no secrets**. The API hostname is `chat.samabrains.com`, used by the site and the blog.

Confidential engagement files are **out of the corpus**, not hidden behind the same chat.

### Refusals

SamaBrains did **not** crawl regulator sites as a substitute for a copy it chose to index; did **not** upload unlicensed paid standards; did **not** rely on unreadable scans when a controllable text copy was required; and does **not** present the assistant as a lawyer, a regulator, or the official gazette.

If the knowledge base does not contain the answer, the correct behaviour is to miss or to say the practice does not hold that reference—not to invent one.

## What it will not do

- Give **legal advice**. Use counsel and official texts for compliance decisions.
- Search the open web.
- Invent a source.

## For other organisations

The same pattern can be stood up for another client. Swap the **corpus** and the **audiences**; keep the **controls**.

| SamaBrains | Another organisation |
| --- | --- |
| SamaBrains website + blog + approved publications | Their policies, internal standards, product docs, or approved publications |
| Staff + customers on a public Ask page | Their staff and customers—or **staff-only** if the corpus is internal |
| Not legal advice; cited answers | Their equivalent non-advice / in-scope rules |
| Living, curated uploads | Their refresh cadence for official sources |

**What this is not:** an open-web oracle, or a substitute for counsel. The offer is a **bounded, attributable assistant** over knowledge the organisation is willing to stand behind.

## Skills this demonstrates

- Designing an in-house assistant for **two audiences** (staff and customers)
- Corpus stewardship: a **living** store of official publications, not a one-off dump
- Grounded retrieval in production (search + chat, one API, named sources)
- Bounding what the assistant may say (scope, citations, not legal advice)
- Shipping a **live** capability that can be demoed, not a slide deck
- Packaging the pattern so it can be **pitched and rebuilt** for another client’s knowledge
