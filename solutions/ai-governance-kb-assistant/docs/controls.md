# Controls

The assistant is useful only if people can trust **scope** and **references**. These are the controls SamaBrains applied.

## Scope and query rewrite

Chat is steered toward **AI governance, security, and responsible AI**, plus what the practice publishes. It is not a general-purpose assistant for arbitrary topics.

Query rewrite exists so a casual question still retrieves from the SamaBrains corpus instead of drifting into unbounded generation.

Every public surface states the limit: **this is not legal advice.**

## Citations and title integrity

A hit without a usable title is a failed control. Retrieval metadata must carry a real title (from `og:title` / `meta name="title"` on crawled pages, or item metadata / a humanised key on uploads).

If a title is missing, the live UI fills a readable fallback from the item key so staff and customers never see the literal word `undefined` as a source name. Index-side titles are the durable fix; the fallback is the display safety net.

## Access boundary

- Ask and search are **public** on purpose: customers need the same instant reference path as staff on the marketing site.
- The corpus itself contains **no secrets** (see [knowledge-base.md](knowledge-base.md)).
- The public API is a single hostname (`chat.samabrains.com`) used by the site and the blog. Cross-origin use is limited to those properties.

This is not an internal-only staff tool behind SSO. Confidential engagement files are **out of the corpus**, not “hidden” behind the same chat.

## Refusals

SamaBrains did **not**:

- Crawl nist.gov, EUR-Lex, or similar as a substitute for holding a copy the practice chose to index
- Upload paid ISO (or similar) standards
- Rely on an empty OCR of the Uganda DPPA scan — Cap. 97 is indexed as markdown the practice controls
- Present the assistant as a lawyer, a regulator, or the official gazette

If the knowledge base does not contain the answer, the correct behaviour is to miss or to say the practice does not hold that reference — not to invent one.
