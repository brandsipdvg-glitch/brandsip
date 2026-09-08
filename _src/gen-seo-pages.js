#!/usr/bin/env node
/* BRANDSIP SEO page generator.
   Reads structured data from _src/seo/*.js and generates complete page files
   into _src/pages/ using the same template conventions as the main build
   (META front-matter + PAGE_HEAD + shared components).
   Run via: node _src/gen-seo-pages.js   (before node _src/build.js)
*/
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_src');
const SEODIR = path.join(SRC, 'seo');
const PAGES = path.join(SRC, 'pages');

const PHONE = '+918073137080';
const PHONE_DISPLAY = '8073137080';
const EMAIL = 'brandsipdvg@gmail.com';
const BASE = 'https://brandsip.online';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function jsonSafe(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function wrap(body, title, desc, og, extraHead) {
  return `<!-- META -->
* title: ${title}
* desc: ${desc}
* og: ${og}
<!-- /META -->

<!-- PAGE_HEAD -->
${extraHead}
<!-- /PAGE_HEAD -->

{{HEADER}}

<main id="main">
${body}
</main>

{{FOOTER}}
{{WHATSAPP}}
{{MOBILE_CTA}}
`;
}

function breadcrumb(last, url) {
  return `<nav class="breadcrumb container" aria-label="Breadcrumb">
    <ol>
      <li><a href="/">Home</a></li>
      ${url ? `<li><a href="${url}">${last}</a></li>` : `<li>${last}</li>`}
    </ol>
  </nav>`;
}

function pageHero(h1, lede) {
  return `<section class="page-hero">
    <div class="container">
      <h1>${h1}</h1>
      <p class="lede">${lede}</p>
    </div>
  </section>`;
}

function ctaBand(h2, p, wa = true, tel = true) {
  let actions = `<a class="btn btn-white" href="/contact">Get a Quote</a>`;
  if (wa) actions += ` <a class="btn btn-outline" style="background:#fff;border-color:#fff;color:var(--blue-800);" href="#" data-wa onclick="return false;">WhatsApp Us</a>`;
  if (tel) actions += ` <a class="btn btn-outline" style="background:#fff;border-color:#fff;color:var(--blue-800);" href="tel:+918073137080">Call ${PHONE_DISPLAY}</a>`;
  return `<section class="cta-band">
    <div class="container">
      <h2>${h2}</h2>
      <p>${p}</p>
      <div class="band-actions">${actions}</div>
    </div>
  </section>`;
}

function faqBlocks(faqs) {
  if (!faqs || !faqs.length) return '';
  const acc = faqs.map((f) => `<div class="accordion"><button class="accordion-header" aria-expanded="false">${esc(f.q)}<span class="accordion-icon">+</span></button><div class="accordion-panel"><p>${esc(f.a)}</p></div></div>`).join('\n        ');
  return `<div class="section-head reveal">
      <span class="eyebrow">FAQs</span>
      <h2>Frequently Asked Questions</h2>
      <p>Common questions answered so you can plan your branded water order with confidence.</p>
    </div>
    <div style="max-width:860px;margin:0 auto;">${acc}</div>`;
}

function faqSchema(faqs) {
  if (!faqs || !faqs.length) return '';
  const items = faqs.map((f) => `{ "@type": "Question", "name": ${JSON.stringify(f.q)}, "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(jsonSafe(f.a))} } }`).join(',\n      ');
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    ${items}
  ]
}
</script>`;
}

/* =====================================================================
   CITY PAGES
   ===================================================================== */
function cityPage(c, i, total) {
  const slugPath = `/custom-water-bottles-${c.slug}`;
  const isHome = c.slug === 'davangere';
  const localTag = isHome ? 'Local Delivery from Davangere' : 'Karnataka-wide Delivery';
  const title = `Customised Water Bottles in ${c.name} | Custom Branded & Private Label Bottles | BRANDSIP`;
  const desc = isHome
    ? `Customised water bottles in ${c.name}. BRANDSIP is based in ${c.name}, Karnataka — supply custom branded & private label bottled water to restaurants, hotels, offices, weddings & events with the fastest local delivery at ${PHONE_DISPLAY}.`
    : `Customised water bottles in ${c.name} (${c.region}) by BRANDSIP. Custom branded & private label bottled water for restaurants, hotels, corporate events & weddings, with reliable delivery across Karnataka at ${PHONE_DISPLAY}.`;
  const h1 = `Customised Water Bottles in ${c.name}`;

  const rel = `/custom-water-bottles-${c.slug}`;
  const canonicalUrl = `${BASE}${rel}`;

  const cityLinks = (exclude) => {
    const list = cities.filter(x => x.slug !== exclude).slice(0, 6);
    let links = list.map(x => `<a href="/custom-water-bottles-${x.slug}">${x.name}</a>`).join(' · ');
    return links + ` · <a href="/customized-water-bottles-davangere">Customized Davangere</a>`;
  };

  const body = `
  ${breadcrumb('Cities', '')}
  ${pageHero(h1, `<strong>Customised water bottles in ${c.name}</strong> — ${c.intro} Choose your <a href="/bottle-sizes">bottle size &amp; shape</a>, share your branding, and BRANDSIP supplies quality packaged drinking water with your logo across ${c.name} and across Karnataka.`)}
  ${c.areas ? `<div class="section section-soft" style="padding:30px 0 0;">
    <div class="container">
      <div class="geo-answer reveal" style="background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:24px 28px;">
        <p style="font-size:1.05rem;line-height:1.7;color:var(--ink);"><strong>Fast answer:</strong> If you need customised water bottles in ${c.name}${c.areas[0] ? ` (serving ${c.areas.join(', ')})` : ''} — branded bottles with your logo, private label water or QR code labels — BRANDSIP supplies FSSAI-compliant packaged drinking water with custom branding, flexible MOQs and reliable delivery${c.name === 'Davangere' ? ' from our Davangere base, the fastest turnaround in the district' : ' from Davangere'}. ${c.geoFact || ''} Call <a href="tel:+918073137080">${PHONE_DISPLAY}</a> or WhatsApp for a quote.</p>
      </div>
    </div>
  </div>` : ''}
  <div style="padding:64px 0 0;">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Local Service</span>
        <h2>Customised &amp; Branded Water Bottles in ${c.name}</h2>
        <p>BRANDSIP serves ${c.name} and ${c.region} with custom branded packaged drinking water. Whether you run a restaurant, hotel, office or are planning an event, we help you put your brand on every bottle — reliably and on time.</p>
      </div>
      <div class="grid grid-2">
        <div class="card reveal"><div class="card-body">
          <h3>Why ${c.name} Businesses Choose Branded Water</h3>
          <p>A customised water bottle with your own label keeps your restaurant, hotel, company or event name in front of every customer and guest. In ${c.name}, presentation differentiates you — a branded bottle adds a premium, considered touch that generic water cannot match.</p>
          <p style="margin-top:10px;">Local highlights we serve in ${c.name}:</p>
          <ul class="price-meta" style="margin-top:8px;">
            ${c.localHighlights.map(x => `<li><span class="check">✓</span> ${x}</li>`).join('\n            ')}
          </ul>
        </div></div>
        <div class="card reveal"><div class="card-body">
          <h3>How Customised Bottles Are Used in ${c.name}</h3>
          <p>Custom branded water works across many settings in ${c.name}:</p>
          <ul class="price-meta" style="margin-top:8px;">
            ${c.useCases.map(x => `<li><span class="check">✓</span> ${x}</li>`).join('\n            ')}
          </ul>
          <p style="margin-top:12px;"><a href="/custom-bottles">Explore custom branded water bottles</a> or see our <a href="/bottle-sizes">bottle options</a>.</p>
        </div></div>
      </div>
    </div>
  </div>

  <div class="section section-navy" aria-label="QR code water bottles in ${c.name}">
    <div class="container">
      <div class="grid grid-2" style="align-items:center;">
        <div class="reveal">
          <span class="eyebrow" style="color:var(--blue-300);">QR Marketing</span>
          <h2 style="color:#fff;">QR Code Water Bottles in ${c.name}</h2>
          <p style="color:rgba(255,255,255,0.85);">Brandsip is the customised water bottle company that turns every bottle into a marketing asset. Print a scannable QR code on the label that opens your <strong>Google Reviews</strong>, <strong>Instagram</strong>, <strong>WhatsApp</strong>, <strong>menu</strong>, <strong>website</strong> or a <strong>feedback form</strong> — so every guest in ${c.name} who picks up your bottle connects with your brand in one scan.</p>
          <p style="color:rgba(255,255,255,0.85);margin-top:14px;">For restaurants, hotels, cafes, resorts, weddings and corporate events in ${c.name}, a QR-enabled bottle is the simplest ongoing marketing channel you can own.</p>
          <div style="margin-top:24px;">
            <a class="btn btn-white" href="/qr-code-water-bottles">Explore QR Water Bottles</a>
            <a class="btn btn-ghost-light" style="margin-left:8px;" href="/contact">Get a Quote</a>
          </div>
        </div>
        <div class="reveal">
          <div style="background:#fff;border-radius:var(--radius-lg);padding:30px;box-shadow:var(--shadow-lg);max-width:440px;margin:0 auto;">
            <h3 style="margin-bottom:14px;">What the QR Code on Your Bottle Can Open</h3>
            <div class="grid grid-2" style="gap:12px;">
              <div style="background:var(--blue-50);border-radius:var(--radius-sm);padding:12px;">✓ Google Reviews</div>
              <div style="background:var(--blue-50);border-radius:var(--radius-sm);padding:12px;">✓ Instagram</div>
              <div style="background:var(--blue-50);border-radius:var(--radius-sm);padding:12px;">✓ WhatsApp</div>
              <div style="background:var(--blue-50);border-radius:var(--radius-sm);padding:12px;">✓ Website &amp; Menu</div>
            </div>
            <p style="margin-top:16px;color:var(--muted);font-size:.92rem;">QR labels are printed at production — no stickers, no peeling.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <div class="section-head center reveal">
        <span class="eyebrow">Available in ${c.name}</span>
        <h2>Customised Bottle Sizes &amp; Options Delivered to ${c.name}</h2>
        <p>Choose from a range of sizes and label styles, customized with your branding.</p>
      </div>
      <div class="grid grid-4">
        <div class="price-card reveal"><span class="price-size">250 ML</span><div class="price-tag">Compact</div><ul class="price-meta"><li><span class="check">✓</span> Single serve</li><li><span class="check">✓</span> Sampling &amp; takeaways</li></ul><a class="btn btn-outline btn-block" href="/250ml-custom-water-bottles">View Details</a></div>
        <div class="price-card reveal"><span class="price-size">500 ML</span><div class="price-tag">Popular</div><ul class="price-meta"><li><span class="check">✓</span> Square or round</li><li><span class="check">✓</span> Restaurants &amp; events</li></ul><a class="btn btn-outline btn-block" href="/500ml-custom-water-bottles">View Details</a></div>
        <div class="price-card reveal"><span class="price-size">750 ML</span><div class="price-tag">Mid</div><ul class="price-meta"><li><span class="check">✓</span> Meetings</li><li><span class="check">✓</span> Hospitality</li></ul><a class="btn btn-outline btn-block" href="/750ml-branded-water-bottles">View Details</a></div>
        <div class="price-card reveal"><span class="price-size">1 Litre</span><div class="price-tag">Large</div><ul class="price-meta"><li><span class="check">✓</span> Round, full-cover</li><li><span class="check">✓</span> Premium</li></ul><a class="btn btn-outline btn-block" href="/1l-branded-water-bottles">View Details</a></div>
      </div>
    </div>
  </div>

  <div class="section section-alt">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Delivery &amp; Trust</span>
        <h2>Customised Water Bottle Delivery in ${c.name} &amp; Across Karnataka</h2>
        <p>Based in <strong>Davangere, Karnataka</strong>, BRANDSIP delivers custom branded water bottles to ${c.name} and cities across Karnataka. We prioritize reliable scheduling, so your branded bottles arrive ready for your restaurant, hotel, event or business.</p>
        <p style="margin-top:12px;">Also serving: ${cityLinks(c.slug)}</p>
      </div>
      <div class="grid grid-3">
        <div class="feature-card reveal"><span class="feature-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span><h3>Karnataka-wide Delivery</h3><p>We deliver branded bottles to ${c.name} and across Karnataka.</p></div>
        <div class="feature-card reveal"><span class="feature-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span><h3>Custom Branding</h3><p>Your logo, name and design on every label.</p></div>
        <div class="feature-card reveal"><span class="feature-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span><h3>Quality Treatment</h3><p>Filtered, UV treated and ozonised before packaging.</p></div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <div class="grid grid-2" style="align-items:center;">
        <div class="reveal">
          <div class="section-head">
            <span class="eyebrow">Local + Karnataka</span>
            <h2 style="font-size:1.9rem;">Customised Water Bottles in ${c.name}, Managed from Karnataka</h2>
            <p>From our Davangere base in Karnataka, BRANDSIP manages manufacturing, custom labelling and delivery for clients across ${c.region}. We combine close local attention with statewide reach — so ${c.name} businesses get dependable delivery wherever they serve in Karnataka.</p>
            <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:24px;">
              <a class="btn btn-primary" href="/contact">Get a Quote</a>
            </div>
          </div>
        </div>
        <div class="reveal" style="background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:30px;">
          <h3 style="margin-bottom:16px;">Booking a Delivery to ${c.name}</h3>
          <ol style="padding-left:20px;display:grid;gap:12px;">
            <li>Share your bottle size, quantity and branding</li>
            <li>Confirm your ${c.name} delivery location and timeline</li>
            <li>We produce and deliver your branded bottles</li>
          </ol>
          <p style="margin-top:18px;color:var(--muted);">Call <a href="tel:+918073137080">${PHONE_DISPLAY}</a> or WhatsApp <a href="#" data-wa onclick="return false;">${PHONE_DISPLAY}</a> to order branded water in ${c.name}.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="section section-alt">
    <div class="container">
      ${faqBlocks(c.faqs || cityFaqs())}
      <div class="reveal" style="margin-top:40px;text-align:center;">
        <a class="btn btn-primary btn-lg" href="/contact">Request a Quote for ${c.name}</a>
      </div>
    </div>
  </div>

  ${ctaBand(`Get Customised Water Bottles in ${c.name}`, `Order customised branded bottled water for your ${c.name} restaurant, hotel, office, wedding or event. Flexible sizes, negotiable MOQs and reliable delivery across Karnataka.`)}
`;

  const extraHead = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Customised Water Bottles in ${c.name}",
  "serviceType": "Custom branded and private label packaged drinking water bottles",
  "provider": { "@type": "Organization", "name": "BRANDSIP", "telephone": "${PHONE}", "email": "${EMAIL}", "address": { "@type": "PostalAddress", "addressLocality": "Davangere", "addressRegion": "Karnataka", "addressCountry": "IN" } },
  "areaServed": { "@type": "City", "name": "${c.name}", "containedInPlace": { "@type": "State", "name": "${c.region}" } },
  "url": "${canonicalUrl}",
  "description": "${jsonSafe(desc)}"
}
</script>
${faqSchema(c.faqs || cityFaqs())}
`;
  return wrap(body, title, desc, '/assets/gallery/brandsip1.jpg', extraHead);
}

const cities = require(path.join(SEODIR, 'cities.js'));
function cityFaqs() {
  return [
    { q: 'Can you deliver branded water bottles to my city?', a: 'Yes. BRANDSIP delivers branded water bottles across Karnataka from our Davangere base, serving all major towns and cities in the state.' },
    { q: 'What is the minimum order quantity?', a: 'MOQs vary by bottle size and are negotiable based on your requirement. Contact BRANDSIP for a current quote.' },
    { q: 'How do I order branded water bottles?', a: 'Choose your bottle size, share your branding, confirm your requirements, and we produce and deliver your branded bottles. Contact us to get started.' },
    { q: 'What bottle sizes are available?', a: 'BRANDSIP offers 250ml, 500ml, 750ml and 1 litre bottles in square and round formats with single-side or full-cover labels.' }
  ];
}

/* =====================================================================
   LANDING PAGES (dedicated high-value SEO pages + lead forms)
   ===================================================================== */
function leadForm(cta) {
  return `<section class="section" id="quote">
    <div class="container">
      <div class="quote-wrap reveal" style="max-width:760px;margin:0 auto;">
        <div class="quote-wrap-body">
          <h2 style="font-size:1.5rem;margin-bottom:8px;">${cta}</h2>
          <p style="color:var(--muted);margin-bottom:26px;">Fill in the form and BRANDSIP will get back to you about your branded water requirement. Prefer WhatsApp? <a href="#" data-wa onclick="return false;">Message us</a> directly.</p>
          <form class="quote-form" action="#" method="post" id="lead-form">
            <div class="form-grid">
              <div class="form-group">
                <label for="lf-name">Name <span class="req">*</span></label>
                <input class="form-control" type="text" id="lf-name" name="name" required autocomplete="name" placeholder="Your full name">
              </div>
              <div class="form-group">
                <label for="lf-business">Business Name</label>
                <input class="form-control" type="text" id="lf-business" name="business" autocomplete="organization" placeholder="Business, restaurant or hotel name">
              </div>
              <div class="form-group">
                <label for="lf-phone">Phone / WhatsApp <span class="req">*</span></label>
                <input class="form-control" type="tel" id="lf-phone" name="phone" required autocomplete="tel" placeholder="Your contact number">
              </div>
              <div class="form-group">
                <label for="lf-city">City</label>
                <input class="form-control" type="text" id="lf-city" name="city" autocomplete="address-level2" placeholder="Your city in Karnataka">
              </div>
              <div class="form-group" style="grid-column:1/-1;">
                <label for="lf-quantity">Quantity Required</label>
                <input class="form-control" type="text" id="lf-quantity" name="quantity" placeholder="e.g. 500 bottles">
              </div>
            </div>
            <button class="btn btn-primary btn-lg btn-block" type="submit">Request My Quote</button>
            <p class="form-note" style="margin-top:12px;text-align:center;">By submitting, you agree to be contacted by BRANDSIP regarding your enquiry.</p>
            <div class="form-success" role="status">Thank you! Your request has been received. BRANDSIP will get back to you shortly. For a faster response, WhatsApp us at 8073137080.</div>
          </form>
        </div>
      </div>
    </div>
  </section>`;
}

function topCta() {
  return `<div style="padding:26px 0 0;" class="container">
    <div class="reveal" style="background:linear-gradient(135deg,var(--blue-700),var(--blue-800));border-radius:var(--radius);padding:26px;color:#fff;text-align:center;">
      <p style="font-size:1.15rem;font-weight:700;margin-bottom:6px;">Ready to see your brand on a bottle?</p>
      <p style="color:rgba(255,255,255,.85);margin-bottom:16px;">Request a free branding mockup of your custom water bottle.</p>
      <a class="btn btn-white" href="#quote">Get a Free Branding Mockup</a>
    </div>
  </div>`;
}

function landingGallery(items) {
  if (!items || !items.length) return '';
  const figures = items.map((g) => `<figure class="gallery-item reveal">
      <img src="${g.src}" data-full="${g.src}" alt="${g.alt}" data-caption="${g.cap}">
      <figcaption>${g.cap}</figcaption>
    </figure>`).join('\n        ');
  return `<div class="section section-alt">
    <div class="container">
      <div class="section-head center reveal">
        <span class="eyebrow">Real Samples</span>
        <h2>Branded Bottle Samples</h2>
        <p>Hotels, restaurants, events, weddings and corporate bottles — so you can imagine your own brand on the bottle.</p>
      </div>
      <div class="gallery-masonry" style="grid-template-columns:repeat(4,1fr);">
        ${figures}
      </div>
      <p class="reveal" style="margin-top:26px;text-align:center;color:var(--muted);">Want to see your own logo on a bottle? <a href="#quote">Request a free branding mockup</a> or browse our <a href="/gallery">full gallery</a>.</p>
    </div>
  </div>`;
}

function deliveryBlock(cities) {
  const list = cities.map((c) => `<span class="check">✓</span> ${c}`).join('</li><li>');
  return `<div class="card reveal" style="border-color:var(--blue-200);">
    <div class="card-body">
      <h3 style="margin-bottom:8px;">Delivery Across Karnataka</h3>
      <p style="color:var(--muted);">We supply custom branded water bottles to hotels and businesses across Karnataka from our Davangere facility.</p>
      <ul class="price-meta" style="margin-top:12px;grid-template-columns:repeat(2,1fr);"><li>${list}</li></ul>
    </div>
  </div>`;
}

function internalLinksBlock(links) {
  if (!links || !links.length) return '';
  const items = links.map((l) => `<li><a href="${l.href}">${l.label}</a> — ${l.text}</li>`).join('\n        ');
  return `<div class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Explore More</span>
        <h2>Related Custom Water Bottle Pages</h2>
      </div>
      <ul class="price-meta" style="margin-top:16px;margin-bottom:8px;">
        ${items}
      </ul>
    </div>
  </div>`;
}

function landingPage(lp) {
  const rel = `/${lp.slug}`;
  const canonicalUrl = `${BASE}${rel}`;
  const title = lp.metaTitle;
  const desc = lp.metaDesc;
  const h1 = lp.h1;

  const body = `
  ${breadcrumb('Branded Water Bottles', '/custom-bottles')}
  ${pageHero(h1, lp.lede)}
  ${topCta()}

  <div class="section">
    <div class="container">
      <div class="grid grid-2" style="align-items:center;">
        <div class="reveal">
          <div class="section-head">
            <span class="eyebrow">${lp.eyebrow}</span>
            <h2 style="font-size:1.9rem;">${lp.intro.heading}</h2>
            <p>${lp.intro.body}</p>
            <ul class="price-meta" style="margin-top:16px;">
              ${lp.benefits.map(x => `<li><span class="check">✓</span> ${x}</li>`).join('\n              ')}
            </ul>
            <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:26px;">
              <a class="btn btn-primary" href="#quote">Request Pricing</a>
              <a class="btn btn-outline" href="#" data-wa onclick="return false;">Get a Quote on WhatsApp</a>
            </div>
          </div>
        </div>
        <div class="reveal">
          ${deliveryBlock(lp.delivery)}
        </div>
      </div>
    </div>
  </div>

  <div class="section section-alt">
    <div class="container">
      <div class="section-head center reveal">
        <span class="eyebrow">Bottle Options</span>
        <h2>Available Sizes &amp; Formats</h2>
        <p>Choose the bottle that fits your business, event or occasion.</p>
      </div>
      <div class="grid grid-4">
        ${lp.products.map(p => `<div class="price-card reveal"><span class="price-size">${p.label}</span><a class="btn btn-outline btn-block" style="margin-top:8px;" href="${p.href}">View Details</a></div>`).join('\n        ')}
      </div>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">How It's Used</span>
        <h2>Ways to Use Custom Branded Water</h2>
      </div>
      <div class="grid grid-2">
        ${lp.useCases.map(x => `<div class="card reveal"><div class="card-body"><p>${x} — with a clean, premium label carrying your brand.</p></div></div>`).join('\n        ')}
      </div>
    </div>
  </div>

  ${landingGallery(lp.gallery)}

  <div class="section section-alt">
    <div class="container">
      ${faqBlocks(lp.faqs)}
      <div class="reveal" style="margin-top:40px;text-align:center;">
        <a class="btn btn-wa btn-lg" href="#" data-wa onclick="return false;">Get a Quote on WhatsApp</a>
      </div>
    </div>
  </div>

  ${lp.cityLinks ? `<div class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Cities We Serve</span>
        <h2>Custom Water Bottles Across Karnataka</h2>
      </div>
      <p class="reveal" style="color:var(--muted);">${lp.cityLinks.map(x => `<a href="${x.href}">${x.label}</a>`).join(' · ')}</p>
    </div>
  </div>` : ''}

  ${internalLinksBlock(lp.internalLinks)}

  ${leadForm('Request Pricing')}
`;

  const serviceCtx = lp.slug === 'custom-water-bottles-karnataka'
    ? '"areaServed": { "@type": "State", "name": "Karnataka" },'
    : '"areaServed": [ { "@type": "State", "name": "Karnataka" }, { "@type": "City", "name": "' + lp.delivery[0] + '" } ],';

  const extraHead = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "${h1}",
  "serviceType": "Custom branded packaged drinking water bottles",
  "provider": { "@id": "${BASE}/#organization" },
  ${serviceCtx}
  "url": "${canonicalUrl}",
  "description": "${jsonSafe(desc)}"
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "${h1}",
  "description": "${jsonSafe(desc)}",
  "brand": { "@type": "Brand", "name": "BRANDSIP" },
  "offers": { "@type": "AggregateOffer", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": "${canonicalUrl}" },
  "image": "${BASE}/assets/gallery/brandsip1.jpg"
}
</script>
${faqSchema(lp.faqs)}
`;
  return wrap(body, title, desc, '/assets/gallery/brandsip1.jpg', extraHead);
}

/* =====================================================================
   INDUSTRY PAGES
   ===================================================================== */
function industryPage(ind) {
  const page = ind.page || `water-bottles-for-${ind.slug}`;
  const rel = `/${page}`;
  const canonicalUrl = `${BASE}${rel}`;
  const title = ind.metaTitle || `${ind.title} | BRANDSIP`;
  const desc = ind.metaDesc || `${ind.title}. BRANDSIP supplies custom branded packaged drinking water for ${ind.slug.replace(/-/g, ' ')} — premium labels, flexible sizes and reliable delivery across Karnataka. Get a quote at ${PHONE_DISPLAY}.`;
  const h1 = ind.h1;

  const body = `
  ${breadcrumb('Industries', '/industries')}
  ${pageHero(h1, ind.intro + ' BRANDSIP combines responsible water treatment with premium custom labelling, delivered across Karnataka.')}
  ${ind.landing ? topCta() : ''}

  <div class="section">
    <div class="container">
      <div class="grid grid-2" style="align-items:center;">
        <div class="reveal">
          <div class="section-head">
            <span class="eyebrow">${ind.eyebrow}</span>
            <h2 style="font-size:1.9rem;">Benefits of Branded Water</h2>
            <p>Here is how custom branded bottles create value for ${ind.slug.replace(/-/g, ' ')}:</p>
            <ul class="price-meta" style="margin-top:16px;">
              ${ind.benefits.map(x => `<li><span class="check">✓</span> ${x}</li>`).join('\n              ')}
            </ul>
            <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:26px;">
              <a class="btn btn-primary" href="${ind.landing ? '#quote' : '/contact'}">${ind.landing ? 'Request Pricing' : 'Get a Quote'}</a>
              <a class="btn btn-outline" href="${ind.landing ? '#quote' : '/custom-bottles'}">${ind.landing ? 'Get a Free Branding Mockup' : 'Custom Bottles'}</a>
            </div>
          </div>
        </div>
        <div class="reveal">
          ${ind.landing ? deliveryBlock(ind.delivery) : `<img src="/assets/gallery/brandsip1.jpg" alt="${h1}" style="border-radius:var(--radius);box-shadow:var(--shadow-md);width:100%;">`}
        </div>
      </div>
    </div>
  </div>

  ${ind.landing ? landingGallery(ind.slug === 'restaurants' ? [
    { src: '/assets/gallery/brandsip1.jpg', alt: 'Restaurant branded water bottle sample', cap: 'Restaurant bottle' },
    { src: '/assets/gallery/brandsip3.jpg', alt: '300ml square branded bottle', cap: '300ml Square' },
    { src: '/assets/gallery/brandsip7.jpg', alt: '500ml round branded bottle', cap: '500ml Round' },
    { src: '/assets/gallery/brandsip2-poster.jpg', alt: 'Wedding branded bottle', cap: 'Wedding' }
  ] : [
    { src: '/assets/gallery/brandsip1.jpg', alt: 'Hotel branded water bottle sample', cap: 'Hotel bottle' },
    { src: '/assets/gallery/brandsip3.jpg', alt: '500ml round branded bottle', cap: '500ml Round' },
    { src: '/assets/gallery/brandsip7.jpg', alt: '1 litre round branded bottle', cap: '1 Litre Round' },
    { src: '/assets/gallery/brandsip4-poster.jpg', alt: 'Corporate branded bottle', cap: 'Corporate' }
  ]) : ''}

  <div class="section section-alt">
    <div class="container">
      <div class="section-head center reveal">
        <span class="eyebrow">Examples</span>
        <h2>How ${ind.slug.replace(/-/g, ' ')} Use Branded Bottles</h2>
        <p>Practical ways ${ind.slug.replace(/-/g, ' ')} across Karnataka use custom branded water to build their brand and experience.</p>
      </div>
      <div class="grid grid-2">
        ${ind.examples.map(x => `<div class="card reveal"><div class="card-body"><h3>${x}</h3><p>${x} — with a clean, premium label that puts your ${ind.eyebrow.toLowerCase()} branding in front of every guest and attendee.</p></div></div>`).join('\n        ')}
      </div>
    </div>
  </div>

  ${ind.qr ? `<div class="section section-navy" aria-label="QR code water bottles for ${ind.slug.replace(/-/g, ' ')}">
    <div class="container">
      <div class="grid grid-2" style="align-items:center;">
        <div class="reveal">
          <span class="eyebrow" style="color:var(--blue-300);">QR Marketing</span>
          <h2 style="color:#fff;">QR Code Water Bottles for ${ind.slug.replace(/-/g, ' ')}</h2>
          <p style="color:rgba(255,255,255,0.9);">${ind.qr}</p>
          <div style="margin-top:26px;">
            <a class="btn btn-white" href="/qr-code-water-bottles">Explore QR Water Bottles</a>
            <a class="btn btn-ghost-light" style="margin-left:8px;" href="${ind.landing ? '#quote' : '/contact'}">Get a Quote</a>
          </div>
        </div>
        <div class="reveal">
          <div class="card" style="border:none;">
            <div class="card-body">
              <h3 style="margin-bottom:14px;">One Scan Opens a World of Actions</h3>
              <div class="grid grid-2" style="gap:12px;">
                <div style="background:var(--blue-50);border-radius:var(--radius-sm);padding:12px;">✓ Google Reviews</div>
                <div style="background:var(--blue-50);border-radius:var(--radius-sm);padding:12px;">✓ Instagram</div>
                <div style="background:var(--blue-50);border-radius:var(--radius-sm);padding:12px;">✓ WhatsApp</div>
                <div style="background:var(--blue-50);border-radius:var(--radius-sm);padding:12px;">✓ Menus &amp; Websites</div>
                <div style="background:var(--blue-50);border-radius:var(--radius-sm);padding:12px;">✓ Feedback Forms</div>
                <div style="background:var(--blue-50);border-radius:var(--radius-sm);padding:12px;">✓ Promotions</div>
              </div>
              <p style="margin-top:18px;color:var(--muted);font-size:.92rem;">QR labels are printed at production — no stickers, no peeling, no extra staff work.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>` : ''}

  <div class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Getting Started</span>
        <h2>How to Order with BRANDSIP</h2>
        <p>A simple process to get your branded bottles ready for ${ind.slug.replace(/-/g, ' ')}:</p>
      </div>
      <div class="steps">
        <div class="step-line" aria-hidden="true"></div>
        <div class="steps-grid">
          <div class="step reveal"><span class="step-num">01</span><h3>Choose Your Bottle</h3><p>Pick from 250ml to 1 litre, square or round.</p></div>
          <div class="step reveal"><span class="step-num">02</span><h3>Share Your Branding</h3><p>Send your logo, name or design.</p></div>
          <div class="step reveal"><span class="step-num">03</span><h3>Confirm Requirements</h3><p>Confirm quantity, label and details.</p></div>
          <div class="step reveal"><span class="step-num">04</span><h3>Delivered to You</h3><p>Receive branded bottles across Karnataka.</p></div>
        </div>
      </div>
      <div class="reveal" style="margin-top:36px;text-align:center;">
        <a class="btn btn-primary btn-lg" href="${ind.landing ? '#quote' : '/contact'}">${ind.landing ? 'Request Pricing' : 'Get a Quote'}</a>
        <a class="btn btn-outline btn-lg" style="margin-left:10px;" href="${ind.landing ? '/how-it-works' : '/how-it-works'}">See How It Works</a>
      </div>
    </div>
  </div>

  <div class="section section-alt">
    <div class="container">
      ${faqBlocks(ind.qrFaq ? [...(ind.faqs || []), ind.qrFaq] : ind.faqs)}
      <div class="reveal" style="margin-top:40px;text-align:center;">
        <p style="color:var(--muted);">Explore related <a href="/industries">industries</a> or <a href="/bottle-sizes">bottle options</a>.</p>
        <a class="btn btn-primary btn-lg" style="margin-top:12px;" href="${ind.landing ? '#quote' : '/contact'}">${ind.landing ? 'Request Pricing' : 'Request a Quote'}</a>
      </div>
    </div>
  </div>

  ${ind.landing ? internalLinksBlock(ind.slug === 'restaurants' ? [
    { href: '/custom-water-bottles-for-hotels', label: 'Custom Water Bottles for Hotels', text: 'Branded bottles for in-room, banquet and restaurant use.' },
    { href: '/250ml-custom-water-bottles', label: '250ml Custom Water Bottles', text: 'Compact single-serve bottles for takeaways and sampling.' },
    { href: '/500ml-custom-water-bottles', label: '500ml Custom Water Bottles', text: 'The popular single-serve for restaurant tables.' },
    { href: '/custom-water-bottles-karnataka', label: 'Custom Water Bottles Karnataka', text: 'Delivery across the state.' }
  ] : [
    { href: '/custom-water-bottles-for-restaurants', label: 'Custom Water Bottles for Restaurants', text: 'Branded table water for restaurants and cafés.' },
    { href: '/500ml-custom-water-bottles', label: '500ml Custom Water Bottles', text: 'The popular 500ml single-serve for rooms and service.' },
    { href: '/private-label-water-bottles', label: 'Private Label Water Bottles', text: 'Put your brand on every bottle.' },
    { href: '/custom-water-bottles-karnataka', label: 'Custom Water Bottles Karnataka', text: 'Delivery to hotels across the state.' }
  ]) : ''}

  ${ind.landing ? leadForm('Request Pricing') : ''}

  ${ind.landing ? `<section class="cta-band">
    <div class="container">
      <h2>Get a Quote on WhatsApp</h2>
      <p>Stuck on a detail or ready to order? Talk directly with BRANDSIP about ${ind.slug.replace(/-/g, ' ')} branded water — flexible sizes, negotiable MOQs and delivery across Karnataka.</p>
      <div class="band-actions">
        <a class="btn btn-white" href="#" data-wa onclick="return false;">Get a Quote on WhatsApp</a>
        <a class="btn btn-outline" style="background:#fff;border-color:#fff;color:var(--blue-800);" href="#quote">Request Pricing</a>
        <a class="btn btn-outline" style="background:#fff;border-color:#fff;color:var(--blue-800);" href="tel:+918073137080">Call ${PHONE_DISPLAY}</a>
      </div>
    </div>
  </section>` : ctaBand(`Branded Water for ${ind.slug.replace(/-/g, ' ')}`, `Put your name and logo on quality packaged drinking water. Flexible sizes, negotiable MOQs and reliable delivery across Karnataka from BRANDSIP.`)}
`;

  const extraHead = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "${h1}",
  "serviceType": "Custom branded packaged drinking water bottles for ${ind.slug.replace(/-/g, ' ')}",
  "provider": { "@type": "Organization", "name": "BRANDSIP", "telephone": "${PHONE}", "email": "${EMAIL}", "address": { "@type": "PostalAddress", "addressLocality": "Davangere", "addressRegion": "Karnataka", "addressCountry": "IN" } },
  "areaServed": { "@type": "State", "name": "Karnataka" },
  "url": "${canonicalUrl}"
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "${h1}",
  "description": "${jsonSafe(desc)}",
  "brand": { "@type": "Brand", "name": "BRANDSIP" },
  "offers": { "@type": "AggregateOffer", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": "${canonicalUrl}" },
  "image": "${BASE}/assets/gallery/brandsip1.jpg"
}
</script>
${faqSchema(ind.qrFaq ? [...(ind.faqs || []), ind.qrFaq] : ind.faqs)}
`;
  return wrap(body, title, desc, '/assets/gallery/brandsip1.jpg', extraHead);
}

/* =====================================================================
   PRODUCT PAGES
   ===================================================================== */
function productPage(p) {
  const page = p.page || `${p.slug}-branded-water-bottles`;
  const rel = `/${page}`;
  const canonicalUrl = `${BASE}${rel}`;
  const title = p.metaTitle || `${p.title} | BRANDSIP`;
  const desc = p.metaDesc || `${p.title}. ${p.region} branded water bottles with custom labelling by BRANDSIP. Specs, MOQ, use cases and delivery across Karnataka. Get a quote at ${PHONE_DISPLAY}.`;
  const h1 = p.h1;

  const specsRows = p.specs.map(s => `<tr><td><strong>${s.k}</strong></td><td>${s.v}</td></tr>`).join('\n            ');

  const imageChoices = {
    '250ml': '/assets/gallery/brandsip1.jpg',
    '500ml': '/assets/gallery/brandsip3.jpg',
    '750ml': '/assets/gallery/brandsip7.jpg',
    '1l': '/assets/gallery/brandsip1.jpg'
  };

  const productGalleries = {
    '250ml': [
      { src: '/assets/gallery/brandsip1.jpg', alt: '250ml custom branded water bottle', cap: '250ml Square' },
      { src: '/assets/gallery/brandsip3.jpg', alt: 'Event branded 250ml bottle', cap: 'Event bottle' },
      { src: '/assets/gallery/brandsip7.jpg', alt: 'Restaurant branded bottle', cap: 'Restaurant bottle' },
      { src: '/assets/gallery/brandsip2-poster.jpg', alt: 'Business branded bottle', cap: 'Business bottle' }
    ],
    '500ml': [
      { src: '/assets/gallery/brandsip3.jpg', alt: '500ml custom branded water bottle', cap: '500ml Round' },
      { src: '/assets/gallery/brandsip4-poster.jpg', alt: 'Hotel branded 500ml bottle', cap: 'Hotel bottle' },
      { src: '/assets/gallery/brandsip1.jpg', alt: 'Corporate branded 500ml bottle', cap: 'Corporate bottle' },
      { src: '/assets/gallery/brandsip7.jpg', alt: 'Restaurant branded 500ml bottle', cap: 'Restaurant bottle' }
    ],
    '750ml': [
      { src: '/assets/gallery/brandsip7.jpg', alt: '750ml custom branded water bottle', cap: '750ml Round' },
      { src: '/assets/gallery/brandsip1.jpg', alt: 'Corporate branded 750ml bottle', cap: 'Corporate bottle' },
      { src: '/assets/gallery/brandsip3.jpg', alt: 'Hotel branded 750ml bottle', cap: 'Hotel bottle' },
      { src: '/assets/gallery/brandsip6-poster.jpg', alt: 'Wedding branded 750ml bottle', cap: 'Wedding bottle' }
    ],
    '1l': [
      { src: '/assets/gallery/brandsip1.jpg', alt: '1 litre custom branded water bottle', cap: '1 Litre Round' },
      { src: '/assets/gallery/brandsip4-poster.jpg', alt: 'Hotel branded 1L bottle', cap: 'Hotel bottle' },
      { src: '/assets/gallery/brandsip3.jpg', alt: 'Business branded 1L bottle', cap: 'Business bottle' },
      { src: '/assets/gallery/brandsip7.jpg', alt: 'Corporate branded 1L bottle', cap: 'Corporate bottle' }
    ]
  };
  const galleryItems = p.gallery || productGalleries[p.slug] || productGalleries['500ml'];

  const productSections = `
  ${topCta()}

  <div class="section">
    <div class="container">
      <div class="grid grid-2" style="align-items:start;">
        <div class="reveal">
          <div class="section-head">
            <span class="eyebrow">${p.region}</span>
            <h2 style="font-size:1.9rem;">${p.sizeLabel} Specifications</h2>
            <p>Key specifications for the ${p.sizeLabel} branded water bottle:</p>
          </div>
          <div class="card reveal"><div class="card-body" style="overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;font-size:0.95rem;">
              <tbody>
                ${specsRows}
              </tbody>
            </table>
          </div></div>
        </div>
        <div class="reveal">
          ${deliveryBlock(p.delivery || ['Bengaluru', 'Mysuru', 'Hubballi', 'Davangere', 'Mangaluru', 'Belagavi'])}
          <div style="margin-top:20px;display:flex;gap:14px;flex-wrap:wrap;">
            <a class="btn btn-primary" href="#quote">Request Pricing</a>
            <a class="btn btn-outline" href="#" data-wa onclick="return false;">Get a Quote on WhatsApp</a>
          </div>
        </div>
      </div>
      <div class="section-head reveal" style="margin-top:56px;">
        <span class="eyebrow">Ordering</span>
        <h2 style="font-size:1.5rem;">MOQ &amp; Ordering</h2>
        <p>${p.moq}</p>
      </div>
      <div class="card reveal"><div class="card-body">
        <h3>How to Order</h3>
        <p>Share your branding, confirm quantity and label, and we produce and deliver your branded bottles. Contact <a href="/contact">BRANDSIP</a> for a current quote.</p>
        <p style="margin-top:10px;">Call <a href="tel:+918073137080">${PHONE_DISPLAY}</a> or WhatsApp <a href="#" data-wa onclick="return false;">${PHONE_DISPLAY}</a>.</p>
      </div></div>
    </div>
  </div>`;

  const body = `
  ${breadcrumb('Bottle Options', '/bottle-sizes')}
  ${pageHero(h1, p.intro)}
  ${productSections}

  <div class="section section-alt">
    <div class="container">
      <div class="section-head center reveal">
        <span class="eyebrow">Use Cases</span>
        <h2>What the ${p.sizeLabel} Bottle Is Best For</h2>
        <p>Popular applications for the ${p.sizeLabel} branded water bottle.</p>
      </div>
      <div class="grid grid-2">
        ${p.useCases.map(x => `<div class="card reveal"><div class="card-body"><h3>${x}</h3><p>${x} with a custom label that carries your brand, logo and design — delivered across Karnataka by BRANDSIP.</p></div></div>`).join('\n        ')}
      </div>
    </div>
  </div>

  <div class="section">
    <div class="container">
      ${faqBlocks(p.faqs)}
      <div class="reveal" style="margin-top:40px;text-align:center;">
        <p style="color:var(--muted);">Compare all sizes on our <a href="/bottle-sizes">bottle options page</a>, explore <a href="/private-label-water-bottles">private label water bottles</a> or <a href="/contact">request a quote</a>.</p>
        <a class="btn btn-primary btn-lg" style="margin-top:12px;" href="/contact">Request a Quote</a>
      </div>
    </div>
  </div>

  ${landingGallery(galleryItems)}

  ${internalLinksBlock(p.slug === '250ml' ? [
    { href: '/500ml-custom-water-bottles', label: '500ml Custom Water Bottles', text: 'The popular standard single-serve for tables and events.' },
    { href: '/custom-water-bottles-for-restaurants', label: 'Custom Water Bottles for Restaurants', text: 'Branded bottles for restaurant takeaways and sampling.' },
    { href: '/private-label-water-bottles', label: 'Private Label Water Bottles', text: 'Bottle water under your own brand.' },
    { href: '/custom-water-bottles-karnataka', label: 'Custom Water Bottles Karnataka', text: 'Delivery across the state.' }
  ] : [
    { href: '/250ml-custom-water-bottles', label: '250ml Custom Water Bottles', text: 'Compact single-serve bottles for sampling and takeaways.' },
    { href: '/custom-water-bottles-for-hotels', label: 'Custom Water Bottles for Hotels', text: 'In-room, banquet and restaurant bottles for hotels.' },
    { href: '/custom-water-bottles-for-restaurants', label: 'Custom Water Bottles for Restaurants', text: 'Branded table water for restaurants and cafés.' },
    { href: '/custom-water-bottles-karnataka', label: 'Custom Water Bottles Karnataka', text: 'Delivery across the state.' }
  ])}

  ${leadForm('Request Pricing')}

  <section class="cta-band">
    <div class="container">
      <h2>Get a Quote on WhatsApp</h2>
      <p>Order ${p.title} for your business, event or hospitality. Flexible sizes, negotiable MOQs and reliable delivery across Karnataka.</p>
      <div class="band-actions">
        <a class="btn btn-white" href="#" data-wa onclick="return false;">Get a Quote on WhatsApp</a>
        <a class="btn btn-outline" style="background:#fff;border-color:#fff;color:var(--blue-800);" href="#quote">Request Pricing</a>
        <a class="btn btn-outline" style="background:#fff;border-color:#fff;color:var(--blue-800);" href="tel:+918073137080">Call ${PHONE_DISPLAY}</a>
      </div>
    </div>
  </section>
`;

  const extraHead = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "${p.title}",
  "description": "${p.intro}",
  "brand": { "@type": "Brand", "name": "BRANDSIP" },
  "offers": { "@type": "AggregateOffer", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": "${canonicalUrl}" },
  "image": "${BASE}${imageChoices[p.slug]}"
}
</script>
${faqSchema(p.faqs)}
`;
  return wrap(body, title, desc, imageChoices[p.slug], extraHead);
}

/* =====================================================================
   BLOG PAGES
   ===================================================================== */
function blogPage(b, idx) {
  const rel = `/blog/${b.slug}`;
  const canonicalUrl = `${BASE}${rel}`;
  const title = `${b.title} | BRANDSIP Blog`;
  const desc = (b.intro.length > 155 ? b.intro.slice(0, 152) + '...' : b.intro);
  const h1 = b.title;

  const body = `
  ${breadcrumb('Blog', '/resources')}
  <article>
    ${pageHero(h1, b.intro)}

    <div class="section">
      <div class="container">
        <div class="reveal" style="max-width:760px;margin:0 auto;">
          <span class="eyebrow">${b.category}</span>
          <p class="form-note" style="margin:14px 0 26px;">Read time: ~${Math.max(5, Math.round(b.sections.length * 1.3))} minutes · BRANDSIP Guide</p>
          ${b.sections.map((s, i) => `<h2 style="font-size:1.5rem;margin:34px 0 12px;">${i + 1}. ${s.h}</h2><p style="color:var(--muted);line-height:1.7;">${s.body}</p>`).join('\n          ')}
          <h2 style="font-size:1.5rem;margin:38px 0 12px;">Get Started with BRANDSIP</h2>
          <p style="color:var(--muted);">Ready to put your name and logo on quality packaged drinking water? Choose from a range of <a href="/bottle-sizes">bottle sizes and shapes</a>, share your branding, and let BRANDSIP handle production. <a href="/contact">Request a quote</a> or call <a href="tel:+918073137080">${PHONE_DISPLAY}</a>.</p>
          <div style="margin-top:26px;display:flex;gap:12px;flex-wrap:wrap;">
            <a class="btn btn-primary" href="/contact">Get a Quote</a>
            <a class="btn btn-outline" href="/custom-bottles">Custom Bottles</a>
            <a class="btn btn-outline" href="/faq">FAQ</a>
          </div>
        </div>
      </div>
    </div>

    <div class="section section-alt">
      <div class="container">
        ${faqBlocks(b.faqs)}
        <div class="reveal" style="margin-top:40px;text-align:center;">
          <p style="color:var(--muted);">Explore more BRANDSIP <a href="/resources">guides</a>, <a href="/industries">industries</a> and <a href="/bottle-sizes">bottle options</a>.</p>
        </div>
      </div>
    </div>
  </article>

  ${ctaBand('Make Every Sip a Brand Experience', 'Branded water for restaurants, hotels, businesses, events and weddings — with reliable delivery across Karnataka from BRANDSIP.')}
`;

  const extraHead = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": ${JSON.stringify(b.title)},
  "description": ${JSON.stringify(desc)},
  "author": { "@type": "Organization", "name": "BRANDSIP" },
  "publisher": { "@type": "Organization", "name": "BRANDSIP" },
  "mainEntityOfPage": "${canonicalUrl}",
  "url": "${canonicalUrl}"
}
</script>
${faqSchema(b.faqs)}
`;
  return wrap(body, title, desc, '/assets/gallery/brandsip1.jpg', extraHead);
}

/* =====================================================================
   FAQ PAGE (50+ entries, schema + visible in sync)
   ===================================================================== */
function faqPage(faqs) {
  const cats = {};
  faqs.forEach((f) => { (cats[f.cat] = cats[f.cat] || []).push(f); });

  const title = 'FAQ | Custom Branded Water Bottles | BRANDSIP';
  const desc = `Frequently asked questions about custom branded water bottles from BRANDSIP: MOQ, delivery, customization, artwork, printing, labels, packaging, water quality and logistics. Call ${PHONE_DISPLAY}.`;
  const og = '/assets/images/logo.png';

  const catsHtml = Object.keys(cats).map((cat) => {
    const items = cats[cat].map((f) => `<div class="accordion"><button class="accordion-header" aria-expanded="false">${esc(f.q)}<span class="accordion-icon">+</span></button><div class="accordion-panel"><p>${esc(f.a)}</p></div></div>`).join('\n        ');
    return `<h2 style="font-size:1.35rem;margin:34px 0 14px;">${esc(cat)}</h2>\n        ${items}`;
  }).join('\n        ');

  const schemaItems = faqs.map((f) => `{ "@type": "Question", "name": ${JSON.stringify(jsonSafe(f.q))}, "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(jsonSafe(f.a))} } }`).join(',\n    ');

  const body = `
  ${breadcrumb('FAQ', '')}
  ${pageHero('Frequently Asked Questions About Custom Branded Water Bottles', `Answers to the most common questions about ${esc('BRANDSIP')} customized water bottles — MOQ, delivery, customization, artwork, printing, labels, packaging, water quality and logistics. ${esc('Need')} something not covered here? ${esc('<a href="/contact">Contact BRANDSIP</a> for current availability and requirements.')}`)}

  <div class="section">
    <div class="container">
      <div style="max-width:860px;margin:0 auto;">
        ${catsHtml}
      </div>

      <div class="reveal" style="margin-top:40px;text-align:center;">
        <p style="color:var(--muted);">Still have questions? Explore <a href="/bottle-sizes">bottle options</a>, or <a href="/contact">request a quote</a>.</p>
        <a class="btn btn-primary btn-lg" style="margin-top:12px;" href="/contact">Ask BRANDSIP a Question</a>
      </div>
    </div>
  </div>

  ${ctaBand('Get Your Custom Branded Water Bottles', 'Choose your bottle, share your branding and let BRANDSIP handle production and delivery across Karnataka. Flexible sizes, negotiable MOQs.')}
`;

  const extraHead = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    ${schemaItems}
  ]
}
</script>
`;
  return wrap(body, title, desc, og, extraHead);
}

/* =====================================================================
   RESOURCES / BLOG INDEX PAGE (lists every article for crawlability)
   ===================================================================== */
function resourcesPage(blog) {
  const title = 'Resources & Blog | Branded Water Bottles | BRANDSIP';
  const desc = 'Guides and articles on custom branded water bottles for restaurants, hotels, corporate events, weddings and more. Tips on labels, sizes, MOQ and delivery from BRANDSIP.';
  const og = '/assets/images/logo.png';

  const cards = blog.map((b) => `<article class="card reveal"><div class="card-body">
        <span class="eyebrow">${esc(b.category)}</span>
        <h3><a href="/blog/${b.slug}">${esc(b.title)}</a></h3>
        <p>${esc(b.intro.length > 132 ? b.intro.slice(0, 129) + '...' : b.intro)}</p>
      </div></article>`).join('\n        ');

  const body = `
  ${breadcrumb('Resources & Blog', '')}
  ${pageHero('Resources & Blog on Branded Water Bottles', "Practical guides on custom branded water bottles, private label water, label design, sizes, MOQ and delivery — written for restaurants, hotels, businesses, events and weddings.")}

  <div class="section">
    <div class="container">
      <div class="section-head center reveal">
        <span class="eyebrow">Latest Articles</span>
        <h2>BRANDSIP Blog</h2>
        <p>Browse our latest guides to put your brand on every sip.</p>
      </div>
      <div class="grid grid-3">
        ${cards}
      </div>

      <div class="reveal" style="margin-top:36px; background:var(--surface); border:1px solid var(--line); border-radius:var(--radius); padding:28px; text-align:center;">
        <p><strong>More BRANDSIP resources:</strong> <a href="/custom-bottles">Custom Bottles</a> · <a href="/bottle-sizes">Bottle Options</a> · <a href="/gallery">Gallery</a> · <a href="/faq">FAQ</a> · <a href="/industries">Industries</a></p>
        <p style="margin-top:12px;color:var(--muted);">Looking for city guidance? See <a href="/custom-water-bottles-bangalore">custom water bottles in Bangalore</a>, <a href="/custom-water-bottles-davangere">Davangere</a> or <a href="/custom-water-bottles-mysore">Mysore</a>.</p>
      </div>
    </div>
  </div>

  ${ctaBand('Get Started with Branded Water', 'Choose a bottle size, add your branding and let BRANDSIP prepare your customized bottled water.')}
`;

  const extraHead = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "BRANDSIP Resources & Blog",
  "url": "https://brandsip.online/resources",
  "description": "Practical guides and articles on customized and branded water bottles."
}
</script>
`;
  return wrap(body, title, desc, og, extraHead);
}

/* =====================================================================
   RUN
   ===================================================================== */
const blog = require(path.join(SEODIR, 'blog.js'));
const industries = require(path.join(SEODIR, 'industries.js'));
const products = require(path.join(SEODIR, 'products.js'));
const faqs = require(path.join(SEODIR, 'faqs.js'));

function main() {
  if (!fs.existsSync(PAGES)) fs.mkdirSync(PAGES, { recursive: true });

  // City pages
  cities.forEach((c, i) => {
    fs.writeFileSync(path.join(PAGES, `custom-water-bottles-${c.slug}.html`), cityPage(c, i, cities.length));
    console.log('Generated city page:', c.slug);
  });

  // Industry pages
  industries.forEach((ind) => {
    fs.writeFileSync(path.join(PAGES, `${ind.page || `water-bottles-for-${ind.slug}`}.html`), industryPage(ind));
    console.log('Generated industry page:', ind.slug);
  });

  // Product pages
  products.forEach((p) => {
    fs.writeFileSync(path.join(PAGES, `${p.page || `${p.slug}-branded-water-bottles`}.html`), productPage(p));
    console.log('Generated product page:', p.slug);
  });

  // Dedicated landing pages (private label, karnataka, etc.)
  const landingPages = require(path.join(SEODIR, 'landing-pages.js'));
  landingPages.forEach((lp) => {
    fs.writeFileSync(path.join(PAGES, `${lp.slug}.html`), landingPage(lp));
    console.log('Generated landing page:', lp.slug);
  });

  // Blog pages (subfolder)
  const blogDir = path.join(PAGES, 'blog');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
  blog.forEach((b, idx) => {
    fs.writeFileSync(path.join(blogDir, `${b.slug}.html`), blogPage(b, idx));
    console.log('Generated blog page:', b.slug);
  });

  // FAQ page (50+ entries, single source of truth)
  fs.writeFileSync(path.join(PAGES, 'faq.html'), faqPage(faqs));
  console.log('Generated FAQ page:', faqs.length, 'entries');

  // Resources / blog index (lists every article)
  fs.writeFileSync(path.join(PAGES, 'resources.html'), resourcesPage(blog));
  console.log('Generated resources page:', blog.length, 'articles');

  console.log('All SEO pages generated.');
}

main();
