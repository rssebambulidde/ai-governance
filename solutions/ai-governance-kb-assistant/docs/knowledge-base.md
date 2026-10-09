# Knowledge base

The corpus is **curated**. It is what SamaBrains is willing to retrieve from — not “everything on the internet about AI governance.”

This file lists **what is indexed**, by source and filename. It does **not** reproduce framework text. Use official publications for legal or regulatory work.

## Practice site (crawled)

Index: `samabrains-site`  
Origin: [https://samabrains.com/](https://samabrains.com/)

Includes the public practice: home, about and services, Ask, contact, legal pages, and other published site routes. Titles for retrieval come from page metadata (`og:title` / `meta name="title"`), not from guessing.

## Blog (crawled)

Index: `samabrains-blog`  
Origin: [https://blog.samabrains.com/](https://blog.samabrains.com/)

Includes published posts and taxonomy pages (for example category and tag archives). This is how staff and customers reach writing the practice has already stood behind.

## Uploaded frameworks (items)

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

## What is not in the corpus

- Live crawls of **nist.gov**, **EUR-Lex**, or other regulator/publisher sites
- **Paid ISO** (or similar) standards the practice does not have a licence to redistribute
- Client files, review workpapers, or other **confidential** engagement material
- Secrets, credentials, or internal Cloudflare/account configuration

If a framework is not in the table and not on the public site or blog, the assistant should not pretend to hold it.
