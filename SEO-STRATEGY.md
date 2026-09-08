# BRANDSIP SEO Strategy

**Domain:** https://brandsip.online
**Business:** Customised, branded, private label & QR-code custom packaged drinking water
**Base:** Davangere, Karnataka, India (FSSAI-compliant; price range ₹7–₹18)
**Contact:** +918073137080 / 8073137080 · brandsipdvg@gmail.com · WhatsApp +918073137080
**Last updated:** September 2026

---

## 1. Primary & Secondary Keywords

### Primary (rank targets)
| Keyword | Intent | Target Page |
|---|---|---|
| customised water bottles | Commercial | `/custom-bottles` |
| custom water bottles near me / in <city> | Local | `/custom-water-bottles-<city>` |
| custom water bottles for hotels | Commercial | `/custom-water-bottles-for-hotels` |
| branded water bottles for restaurants | Commercial | `/custom-water-bottles-for-restaurants` |
| custom water bottles for weddings | Commercial | `/water-bottles-for-weddings` |
| private label water bottles | Commercial | `/private-label-water-bottles` |
| qr code water bottles | Commercial–Informational | `/qr-code-water-bottles` |
| custom water bottles for events | Commercial | `/water-bottles-for-events` |
| water bottle printing / custom water bottle labels | Informational–Commercial | `/blog/custom-label-printing-guide` |

### Secondary
- customised water bottle price / cost per bottle (→ `/blog/customised-water-bottle-price-india`)
- 250ml / 500ml / 750ml / 1L bottled water (→ product pages `/250ml-custom-water-bottles`, etc.)
- custom water bottle supplier in Karnataka (→ `/custom-water-bottles-karnataka`)
- water bottles for resorts, cafes, hospitals, corporate events, exhibitions, colleges, schools, real-estate (→ industry pages)
- custom water bottles in each of the 18 cities (→ city pages)

### Long-tail / question keywords (drive FAQ + GEO targets)
- "how do qr code water bottles work"
- "custom water bottle minimum order quantity"
- "customized water bottle price in India"
- "branded water bottle for cafe"
- "event water bottles Karnataka"
- "how to choose a custom water bottle supplier"

---

## 2. Content Clusters ("Topic Hubs")

| Hub (Money Page) | Supporting Cluster |
|---|---|
| **Custom Bottles** (`/custom-bottles`) | how-it-works, bottle-sizes, custom-label-printing-guide, designing-a-water-bottle-label, how-to-order-custom-water-bottles, how-much-do-custom-water-bottles-cost |
| **QR Code Bottles** (`/qr-code-water-bottles`) | how-qr-code-water-bottles-work, why-businesses-use-customized-water-bottles, branded-water-for-b2b-orders, how-branded-water-improves-customer-experience |
| **Hotels** (`/custom-water-bottles-for-hotels`) | branded-water-for-hotels-buyers-guide, private-label-water-bottles-for-hotels, branded-water-for-hotel-restaurants, how-hotels-use-branded-water-bottles, custom-water-bottles-for-hotels-complete-guide |
| **Restaurants** (`/custom-water-bottles-for-restaurants`) | why-branded-water-matters-for-restaurants, branded-water-for-restaurant-chains, restaurant-branding-with-custom-water-bottles, restaurant-branding-through-packaging, how-much-do-custom-water-bottles-cost-for-restaurants |
| **Resorts** (`/water-bottles-for-resorts`) | custom-water-bottles-for-resorts (blog), hospitality-marketing-strategies, premium-bottled-water-branding |
| **Cafes** (`/water-bottles-for-cafes`) | branded-water-bottles-for-cafes (blog) |
| **Events** (`/water-bottles-for-events`) | event-water-bottles-karnataka, branded-water-for-events-vs-weddings, corporate-event-branding-ideas, event-marketing-ideas-in-karnataka, branded-water-for-exhibitions, branded-water-for-product-launches |
| **Weddings** (`/water-bottles-for-weddings`) | best-customized-water-bottles-for-weddings-in-davangere, personalized-water-bottles-for-weddings |
| **Karnataka** (`/custom-water-bottles-karnataka`) | all 18 city pages + private-label-drinking-water-karnataka |
| **Private Label** (`/private-label-water-bottles`) | benefits-of-private-label-water-bottles, private-label-water-bottles-for-hotels, private-label-drinking-water-karnataka |

**Rule:** Every blog post links up to its hub page; every hub page links to 3–6 supporting posts. Never orphan a page.

---

## 3. Website Structure & URL Architecture

- Flat, keyword-stable URLs: `/custom-water-bottles-<city>`, `/water-bottles-for-<industry>`, `/blog/<slug>`.
- One page per topic — no near-duplicate city/industry pages (prevents cannibalization).
- **Hubballi/Hubli:** canonical = `/custom-water-bottles-hubli` (page is titled "Customised Water Bottles in Hubballi", mentions Hubli); `/custom-water-bottles-hubballi` is a `noindex, follow` meta-refresh redirect. Both spellings resolve to one page.
- Product pages remain anchored to size: `/250ml-custom-water-bottles`, `/500ml-custom-water-bottles`, `/750ml-branded-water-bottles`, `/1l-branded-water-bottles`.
- `robots.txt` + `sitemap.xml` regenerated on every build from `_src/build.js`. Sitemap must list exactly the pages that exist (verified during CI build).

---

## 4. Homepage Content Plan

The homepage (`index.html`) is the internal-link hub. It must:
- Lead with commercial value props: custom logo bottles, private label, and **QR-code marketing bottles** (the differentiator).
- Carry long-form SEO copy targeting "customised water bottles", "branded water bottles", "qr code water bottles".
- Cross-link to money pages: `/qr-code-water-bottles`, `/water-bottles-for-resorts`, `/water-bottles-for-events`, `/custom-water-bottles-for-hotels`, `/custom-water-bottles-for-restaurants`, `/custom-water-bottles-karnataka`, `/bottle-sizes`, `/how-it-works`, `/contact`.
- Keep CTA density high (quote form at `#get-a-quote`).

Status: homepage already rewritten with QR marketing section + long-form content; new links added to header/footer/homepage in this implementation.

---

## 5. GBP (Google Business Profile) Optimization

1. **Category set:** "Bottled water supplier", "Water supplier", "Drinking water supplier".
2. **NAP consistency:** `+91 80731 37080`, `brandsipdvg@gmail.com`, brandsip.online, Davangere, Karnataka — must match site schema exactly.
3. **Service-area business:** set coverage to the 18 target cities (Davangere, Harihar, Shivamogga, Hubballi-Hubli, Chitradurga, Ballari, Ranebennur, Bhadravati, Dharwad, Hosapete, Chikkamagaluru, Haveri, Mysuru, Bengaluru, Mangaluru, Belagavi, Vijayanagara).
4. **Post cadence:** 1–2 posts/week (product photos, festival/event bottles, city offers).
5. **Review velocity:** use QR water bottles at every client delivery to drive Google reviews. Target 5–10 new reviews/month.
6. **Products/services on GBP:** list the four bottle sizes + QR/private-label services.
7. **Q&A:** pre-fill with the top FAQs (MOQ, delivery areas, turnaround).
8. **Local landing pages** (already built) link to the GBP profile (Google Maps URL in `sameAs`).

---

## 6. Local SEO (City Pages and GEO Answer Boxes)

- 18 city pages, each with: `Fast answer:` GEO block (info-panel style, ~1 short paragraph with price, USP, CTA + phone), local service areas, local highlights, use-case examples, QR marketing section, FAQ with FAQPage schema, Service schema, and links to `customized-water-bottles-davangere`.
- Content written for the city genuinely (areas, landmarks, local contexts) to satisfy E-E-A-T and AI-answer extraction.
- City pages cross-link via "Also serving" strips; hub page `/custom-water-bottles-karnataka` links all cities.
- Each city page carries geo-specific copy so answers are extractable for "custom water bottles in X".

**Cities covered:** Davangere, Harihar, Bhadravati, Shivamogga, Hubballi(Hubli), Chitradurga, Ballari, Ranebennur, Dharwad, Hosapete, Chikkamagaluru, Haveri, Mysuru, Bengaluru, Mangaluru, Belagavi, Vijayanagara + Karnataka state hub.

---

## 7. Schema Markup (JSON-LD Implementation Status)

| Schema | Where | Status |
|---|---|---|
| Organization | Global `head.html` | ✅ live |
| LocalBusiness | Global `head.html` | ✅ live |
| Product (per bottle size) | Global `head.html` via `hasOfferCatalog` + product pages | ✅ live |
| Service | City + industry pages | ✅ live |
| FAQPage | City, industry, landing, FAQ page | ✅ live |
| Review + aggregateRating | Global `head.html` | ✅ live — **replace placeholder 4.9 / 87 with real figures** before production |
| Breadcrumb | `breadcrumb()` helper used on SEO pages | ✅ live |
| WebSite + SearchAction | Global `head.html` | ✅ live |

**Action item:** confirm the real Google review count/rating from the GBP dashboard and update `_src/components/head.html` (`aggregateRating: reviewCount`, `ratingValue`, and sample Reviews). Do not publish placeholder numbers.

---

## 8. GEO / AI-Search Optimization (ChatGPT, Gemini, Perplexity, AI Overviews, Voice)

1. **Extractable answers:** every city and industry page opens with a concise, quotable definition/answer (the "Fast answer" block) that LLMs can cite verbatim. Numbers, prices and facts are stated in plain sentences.
2. **Structured Q&A:** FAQ sections + `FAQPage` JSON-LD on all key pages; 57 FAQs aggregated on `/faq`.
3. **Entity clarity:** consistent NAP, service categories, and `hasOfferCatalog` so AI search engines can assemble the business entity. Brand + service + city appear in first sentences.
4. **Crawlable HTML:** no JS rendering required for content; all copy is server-rendered static HTML.
5. **Authority signals:** blog posts serve long-form proofs, how-to content, and internal links (E-E-A-T reinforcement).
6. **Voice search phrasing:** Q&A copy written with natural language ("How do custom water bottles work?", "What is the minimum order quantity for custom water bottles?").
7. **Local intent variants:** both spellings (Hubballi/Hubli, Bengaluru/Bangalore, Mysuru/Mysore, Mangaluru/Mangalore, Belagavi/Belgaum) are included in copy so any spelling query surfaces the page.

---

## 9. E-E-A-T

- **Experience:** first-hand Davangere production/fulfilment references; "from our Davangere facility"; real photos in `/gallery`.
- **Expertise:** FSSAI compliance noted; label design guidance; quantity estimation guide (`/blog/how-to-estimate-branded-water-quantity`).
- **Authoritativeness:** consistent brand mentions across all pages; internal links; single canonical domain.
- **Trust:** physical address, phone + WhatsApp, email, pricing transparency (₹7–₹18 range), MOQ guidance, `about-us` page, real gallery photos.

---

## 10. Internal Linking

- Header (desktop + mobile): Custom Bottles, QR Code Bottles, Bottle Options, Hotels, Restaurants, Resorts, Private Label, Karnataka, Corporate Events, Weddings, Event Water, Gallery, FAQ (updated).
- Footer: product/industry links + Popular Cities (now includes Harihar, Bhadravati).
- Every city page: links to hub included (Karnataka), "Also serving" strip, QR page, Davangere customized page, bottle sizes, contact.
- Every industry page: QR section → `/qr-code-water-bottles`, linked supporting blog posts, FAQs.
- Blog → hub linkup per cluster map in §2.
- **Golden rule:** each money page ≥ 5 internal inbound links from distinct pages; no orphan pages (verified by link-checker during build — 103 unique internal hrefs, 0 broken page links).

---

## 11. Blog Strategy

51 published posts; 6 new GEO/AI-targeted posts added in this implementation:
- `how-qr-code-water-bottles-work` (QR Marketing cluster)
- `customised-water-bottle-price-india` (Pricing)
- `branded-water-bottles-for-cafes` (Cafes)
- `custom-water-bottles-for-resorts` (Resorts)
- `event-water-bottles-karnataka` (Events)
- `how-to-choose-custom-water-bottle-supplier-karnataka` (Business/Supplier)

**Cadence going forward:** 2–4 posts/month covering: new industries (gyms, salons, pharmacies), occasion seasons (wedding season Nov–Mar, corporate AGM season, IPL/festival seasons), price/cost guides, behind-the-scenes production, case studies. Every post: 800–1500 words, one clear target keyword, FAQ structured question, internal links to hub + adjacent posts, and a CTA.

---

## 12. Keyword-to-Page Mapping (final sanity map)

| Search phrase | Winning page |
|---|---|
| customised water bottle | `/custom-bottles` + `/customized-water-bottles-davangere` |
| custom water bottles <city> | `/custom-water-bottles-<city>` |
| water bottles for hotels | `/custom-water-bottles-for-hotels` |
| water bottles for restaurants/cafes | `/custom-water-bottles-for-restaurants`, `/water-bottles-for-cafes` |
| water bottles for resorts | `/water-bottles-for-resorts` |
| water bottles for weddings | `/water-bottles-for-weddings` |
| water bottles for events | `/water-bottles-for-events` |
| qr code water bottles | `/qr-code-water-bottles` |
| private label water | `/private-label-water-bottles` |
| custom water bottle price | `/blog/customised-water-bottle-price-india` |
| custom water bottles karnataka | `/custom-water-bottles-karnataka` |
| water bottle supplier | `/blog/how-to-choose-custom-water-bottle-supplier-karnataka` |

---

## 13. Voice Search Optimization

- FAQ copy uses natural question style ("How do I...", "What is the MOQ for...", "Do you deliver to...").
- Answers ≤ 40 words where possible (voice-returnable).
- Phone number and "call <number>" phrasing included in GEO blocks.

---

## 14. Conversion / CTA Pattern on SEO Pages

Every money page follows the same pattern: hero → GEO/FAQ answer → benefits → examples → QR/differentiator section → FAQ (schema) → **quote form / contact CTA** → phone + WhatsApp sticky mobile CTA (`{{WHATSAPP}}`, `{{MOBILE_CTA}}`).

---

## 15. Redirects & Consolidation

- `water-bottles-for-restaurants.html` → `noindex,follow` meta-refresh → `/custom-water-bottles-for-restaurants` (existing pattern).
- `custom-water-bottles-hubballi.html` → `noindex,follow` meta-refresh → `/custom-water-bottles-hubli` (added).
- Future rule: any new spelling variant gets a redirect to the canonical URL, never a new near-duplicate page.

---

## 16. Measurement (KPIs)

1. GSC: impressions/clicks for the primary keyword set + 18 city "near me" terms.
2. AI-search share: manually check ChatGPT/Gemini/Perplexity/AI Overviews replies for "customised water bottles davangere / karnataka / for hotels".
3. GBP: views, searches, actions, review count/about rating, Q&A engagement.
4. Local Rankings: track 18-city pack presence for "custom water bottles/customized mineral water".
5. Traffic: sessions to city + industry + QR pages; conversion to quote-form submissions and WhatsApp/call.

---

## 17. Pre-Production Checklist

- [ ] Replace placeholder `aggregateRating`/`Review` data in `_src/components/head.html` with real GBP numbers.
- [ ] Confirm NAP across site = GBP + schema.
- [ ] Confirm all 18 city pages + new landing pages render (done in this implementation; re-run `node _src/gen-seo-pages.js && node _src/build.js` after any data edit).
- [ ] Re-check sitemap + robots after next content change.
- [ ] Submit new URL set (QR/resorts/events/city pages) in GSC for indexing.