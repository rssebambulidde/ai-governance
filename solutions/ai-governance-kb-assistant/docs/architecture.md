# Architecture

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

## Surfaces

| Surface | Audience | URL |
| --- | --- | --- |
| Ask (chat page) | Customers and visitors; staff who want a conversation | [samabrains.com/ask/](https://samabrains.com/ask/) |
| Site search / Ctrl+K | Staff and anyone on the practice site | [samabrains.com](https://samabrains.com/) |
| Blog search | Staff and readers on the blog | [blog.samabrains.com/search](https://blog.samabrains.com/search) |

Chat bubble and nav search on the site share the same API as Ask.

## Indexes

| Index | How it is filled | What it holds |
| --- | --- | --- |
| `samabrains-site` | Crawl | Practice pages: services, about, legal, Ask, and related site content |
| `samabrains-blog` | Crawl | Posts, categories, and tags on the SamaBrains blog |
| `samabrains-gov-kb` | Uploaded items | Public frameworks the practice works with (see [knowledge-base.md](knowledge-base.md)) |

## Why one API

`https://chat.samabrains.com/` is the public endpoint for search and chat. One API means:

- A customer on Ask and a staff member using Ctrl+K are not looking at two different “truths.”
- Citations resolve to the same site pages, posts, and framework items.
- Scope (query rewrite, not legal advice) is applied in one place.

Implementation sits on Cloudflare AI Search. The product is the SamaBrains knowledge base and assistant, not the vendor console.
