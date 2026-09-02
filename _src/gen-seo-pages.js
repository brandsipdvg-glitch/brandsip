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

  const cityLinks = (exclude) => cities.filter(x => x.slug !== exclude).slice(0, 6)
    .map(x => `<a href="/custom-water-bottles-${x.slug}">${x.name}</a>`).join(' · ');

  const body = `
  ${breadcrumb('Cities', '')}
  ${pageHero(h1, `<strong>Customised water bottles in ${c.name}</strong> — ${c.intro} Choose your <a href="/bottle-sizes">bottle size &amp; shape</a>, share your branding, and BRANDSIP supplies quality packaged drinking water with your logo across ${c.name} and across Karnataka.`)}
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

  <div class="section">
    <div class="container">
      <div class="section-head center reveal">
        <span class="eyebrow">Available in ${c.name}</span>
        <h2>Customised Bottle Sizes &amp; Options Delivered to ${c.name}</h2>
        <p>Choose from a range of sizes and label styles, customized with your branding.</p>
      </div>
      <div class="grid grid-4">
        <div class="price-card reveal"><span class="price-size">250 ML</span><div class="price-tag">Compact</div><ul class="price-meta"><li><span class="check">✓</span> Single serve</li><li><span class="check">✓</span> Sampling &amp; takeaways</li></ul><a class="btn btn-outline btn-block" href="/250ml-branded-water-bottles">View Details</a></div>
        <div class="price-card reveal"><span class="price-size">500 ML</span><div class="price-tag">Popular</div><ul class="price-meta"><li><span class="check">✓</span> Square or round</li><li><span class="check">✓</span> Restaurants &amp; events</li></ul><a class="btn btn-outline btn-block" href="/500ml-branded-water-bottles">View Details</a></div>
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
              <a class="btn btn-outline" href="/pricing">See Pricing</a>
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
  return wrap(body, title, desc, '/assets/images/gallery-restaurant.svg', extraHead);
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
   INDUSTRY PAGES
   ===================================================================== */
function industryPage(ind) {
  const rel = `/water-bottles-for-${ind.slug}`;
  const canonicalUrl = `${BASE}${rel}`;
  const title = `${ind.title} | BRANDSIP`;
  const desc = `${ind.title}. BRANDSIP supplies custom branded packaged drinking water for ${ind.slug.replace(/-/g, ' ')} — premium labels, flexible sizes and reliable delivery across Karnataka. Get a quote at ${PHONE_DISPLAY}.`;
  const h1 = ind.h1;

  const body = `
  ${breadcrumb('Industries', '/industries')}
  ${pageHero(h1, ind.intro + ' BRANDSIP combines responsible water treatment with premium custom labelling, delivered across Karnataka.')}

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
              <a class="btn btn-primary" href="/contact">Get a Quote</a>
              <a class="btn btn-outline" href="/custom-bottles">Custom Bottles</a>
            </div>
          </div>
        </div>
        <img class="reveal" src="/assets/images/gallery-hotel.svg" alt="${h1}" style="border-radius:var(--radius);box-shadow:var(--shadow-md);width:100%;">
      </div>
    </div>
  </div>

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
        <a class="btn btn-primary btn-lg" href="/contact">Get a Quote</a>
        <a class="btn btn-outline btn-lg" style="margin-left:10px;" href="/how-it-works">See How It Works</a>
      </div>
    </div>
  </div>

  <div class="section section-alt">
    <div class="container">
      ${faqBlocks(ind.faqs)}
      <div class="reveal" style="margin-top:40px;text-align:center;">
        <p style="color:var(--muted);">Explore related <a href="/industries">industries</a> or <a href="/bottle-sizes">bottle options</a>.</p>
        <a class="btn btn-primary btn-lg" style="margin-top:12px;" href="/contact">Request a Quote</a>
      </div>
    </div>
  </div>

  ${ctaBand(`Branded Water for ${ind.slug.replace(/-/g, ' ')}`, `Put your name and logo on quality packaged drinking water. Flexible sizes, negotiable MOQs and reliable delivery across Karnataka from BRANDSIP.`)}
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
${faqSchema(ind.faqs)}
`;
  return wrap(body, title, desc, '/assets/images/gallery-hotel.svg', extraHead);
}

/* =====================================================================
   PRODUCT PAGES
   ===================================================================== */
function productPage(p) {
  const rel = `/${p.slug}-branded-water-bottles`;
  const canonicalUrl = `${BASE}${rel}`;
  const title = `${p.title} | BRANDSIP`;
  const desc = `${p.title}. ${p.region} branded water bottles with custom labelling by BRANDSIP. Specs, MOQ, use cases and delivery across Karnataka. Get a quote at ${PHONE_DISPLAY}.`;
  const h1 = p.h1;

  const specsRows = p.specs.map(s => `<tr><td><strong>${s.k}</strong></td><td>${s.v}</td></tr>`).join('\n            ');

  const body = `
  ${breadcrumb('Bottle Options', '/bottle-sizes')}
  ${pageHero(h1, p.intro)}

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
          <div class="section-head">
            <span class="eyebrow">Ordering</span>
            <h2 style="font-size:1.9rem;">MOQ &amp; Ordering</h2>
            <p>${p.moq}</p>
          </div>
          <div class="card reveal"><div class="card-body">
            <h3>How to Order</h3>
            <p>Share your branding, confirm quantity and label, and we produce and deliver your branded bottles. Contact <a href="/contact">BRANDSIP</a> for a current quote.</p>
            <p style="margin-top:10px;">Call <a href="tel:+918073137080">${PHONE_DISPLAY}</a> or WhatsApp <a href="#" data-wa onclick="return false;">${PHONE_DISPLAY}</a>.</p>
          </div></div>
        </div>
      </div>
    </div>
  </div>

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
        <p style="color:var(--muted);">Compare all sizes on our <a href="/bottle-sizes">bottle options page</a> or see <a href="/pricing">pricing</a>.</p>
        <a class="btn btn-primary btn-lg" style="margin-top:12px;" href="/contact">Request a Quote</a>
      </div>
    </div>
  </div>

  ${ctaBand(`Order ${p.title}`, `Get the ${p.sizeLabel} branded water bottle for your business, event or hospitality. Flexible MOQs and reliable delivery across Karnataka.`)}
`;

  const imageChoices = {
    '250ml': '/assets/images/bottle-square-300.svg',
    '500ml': '/assets/images/bottle-round-500.svg',
    '750ml': '/assets/images/bottle-round-corporate.svg',
    '1l': '/assets/images/bottle-round-1l.svg'
  };

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
          <p style="color:var(--muted);">Ready to put your name and logo on quality packaged drinking water? Choose from a range of <a href="/bottle-sizes">bottle sizes and shapes</a>, share your branding, and let BRANDSIP handle production and <a href="/pricing">pricing</a>. <a href="/contact">Request a quote</a> or call <a href="tel:+918073137080">${PHONE_DISPLAY}</a>.</p>
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
  return wrap(body, title, desc, '/assets/images/bottle-round-500.svg', extraHead);
}

/* =====================================================================
   FAQ PAGE (50+ entries, schema + visible in sync)
   ===================================================================== */
function faqPage(faqs) {
  const cats = {};
  faqs.forEach((f) => { (cats[f.cat] = cats[f.cat] || []).push(f); });

  const title = 'FAQ | Custom Branded Water Bottles | BRANDSIP';
  const desc = `Frequently asked questions about custom branded water bottles from BRANDSIP: MOQ, pricing, delivery, customization, artwork, printing, labels, packaging, water quality and logistics. Call ${PHONE_DISPLAY}.`;
  const og = '/assets/images/logo.png';

  const catsHtml = Object.keys(cats).map((cat) => {
    const items = cats[cat].map((f) => `<div class="accordion"><button class="accordion-header" aria-expanded="false">${esc(f.q)}<span class="accordion-icon">+</span></button><div class="accordion-panel"><p>${esc(f.a)}</p></div></div>`).join('\n        ');
    return `<h2 style="font-size:1.35rem;margin:34px 0 14px;">${esc(cat)}</h2>\n        ${items}`;
  }).join('\n        ');

  const schemaItems = faqs.map((f) => `{ "@type": "Question", "name": ${JSON.stringify(jsonSafe(f.q))}, "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(jsonSafe(f.a))} } }`).join(',\n    ');

  const body = `
  ${breadcrumb('FAQ', '')}
  ${pageHero('Frequently Asked Questions About Custom Branded Water Bottles', `Answers to the most common questions about ${esc('BRANDSIP')} customized water bottles — MOQ, pricing, delivery, customization, artwork, printing, labels, packaging, water quality and logistics. ${esc('Need')} something not covered here? ${esc('<a href="/contact">Contact BRANDSIP</a> for current availability and requirements.')}`)}

  <div class="section">
    <div class="container">
      <div style="max-width:860px;margin:0 auto;">
        ${catsHtml}
      </div>

      <div class="reveal" style="margin-top:40px;text-align:center;">
        <p style="color:var(--muted);">Still have questions? See <a href="/pricing">pricing</a>, explore <a href="/bottle-sizes">bottle options</a>, or <a href="/contact">request a quote</a>.</p>
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
  const desc = 'Guides and articles on custom branded water bottles for restaurants, hotels, corporate events, weddings and more. Tips on labels, sizes, MOQ, pricing and delivery from BRANDSIP.';
  const og = '/assets/images/logo.png';

  const cards = blog.map((b) => `<article class="card reveal"><div class="card-body">
        <span class="eyebrow">${esc(b.category)}</span>
        <h3><a href="/blog/${b.slug}">${esc(b.title)}</a></h3>
        <p>${esc(b.intro.length > 132 ? b.intro.slice(0, 129) + '...' : b.intro)}</p>
      </div></article>`).join('\n        ');

  const body = `
  ${breadcrumb('Resources & Blog', '')}
  ${pageHero('Resources & Blog on Branded Water Bottles', "Practical guides on custom branded water bottles, private label water, label design, sizes, MOQ, pricing and delivery — written for restaurants, hotels, businesses, events and weddings.")}

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
        <p><strong>More BRANDSIP resources:</strong> <a href="/custom-bottles">Custom Bottles</a> · <a href="/bottle-sizes">Bottle Options</a> · <a href="/pricing">Pricing</a> · <a href="/gallery">Gallery</a> · <a href="/faq">FAQ</a> · <a href="/industries">Industries</a></p>
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
    fs.writeFileSync(path.join(PAGES, `water-bottles-for-${ind.slug}.html`), industryPage(ind));
    console.log('Generated industry page:', ind.slug);
  });

  // Product pages
  products.forEach((p) => {
    fs.writeFileSync(path.join(PAGES, `${p.slug}-branded-water-bottles.html`), productPage(p));
    console.log('Generated product page:', p.slug);
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
