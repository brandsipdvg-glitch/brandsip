#!/usr/bin/env node
/* BRANDSIP static site generator.
   Reads _src/pages/*.html (with {{TOKEN}} placeholders + front-matter for metadata),
   injects shared components, and writes clean standalone HTML files to repo root.
   Also generates robots.txt and sitemap.xml.
*/
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_src');
const PAGES = path.join(SRC, 'pages');
const COMP = path.join(SRC, 'components');

const YEAR = new Date().getFullYear();

/* Optional build config: _src/site-config.json -> { "base": "https://your-domain.in" }
   Overridable at runtime with the BRANDSIP_BASE env var. */
const CONFIG = path.join(SRC, 'site-config.json');
const DEFAULT_BASE = 'https://brandsip.example.com';
let base = process.env.BRANDSIP_BASE;
if (!base && fs.existsSync(CONFIG)) {
  try {
    const cfg = JSON.parse(fs.readFileSync(CONFIG, 'utf8'));
    if (cfg.base) base = cfg.base;
  } catch (e) { /* ignore malformed config */ }
}
const BASE = (base || DEFAULT_BASE).replace(/\/+$/, '');

/* Output directory: defaults to the repo root for local preview,
   override with BRANDSIP_OUT for CI deploys (e.g. _site). */
const OUT_DIR = process.env.BRANDSIP_OUT ? path.resolve(process.env.BRANDSIP_OUT) : ROOT;

const EXCLUDE = new Set(['404.html']);

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function comp(name) {
  return fs.readFileSync(path.join(COMP, name + '.html'), 'utf8');
}

function parseFrontMatter(html) {
  const m = html.match(/<!--\s*META\s*-->([\s\S]*?)<!--\s*\/META\s*-->/);
  const meta = { title: '', lastmod: '', desc: '', og: '/assets/images/logo.svg' };
  if (m) {
    const block = m[1];
    const line = (key) => {
      const r = block.match(new RegExp('^\\*\\s+' + key + '\\s*:\\s*(.*)$', 'm'));
      return r ? r[1].trim() : undefined;
    };
    meta.title = line('title') || 'BRANDSIP';
    meta.lastmod = line('lastmod') || new Date().toISOString().split('T')[0];
    meta.desc = line('desc') || '';
    meta.og = line('og') || meta.og;
  }
  return meta;
}

function build() {
  const files = fs.readdirSync(PAGES).filter((f) => f.endsWith('.html'));
  const urls = [];

  for (const f of files) {
    let html = fs.readFileSync(path.join(PAGES, f), 'utf8');
    const meta = parseFrontMatter(html);
    const is404 = EXCLUDE.has(f);
    const slug = f === 'index.html' ? '/' : '/' + f.replace('.html', '');
    const canonical = BASE.replace(/\/$/, '') + slug;

    html = html.replace(/<!--\s*META\s*-->[\s\S]*?<!--\s*\/META\s*-->\n?/, '');

    // normalize any hardcoded placeholder domain to the configured base
    html = html.replace(/https:\/\/brandsip\.example\.com/g, BASE);

    if (!is404) {
      let og = meta.og || '/assets/images/logo.svg';
      if (og && og.startsWith('/')) og = BASE + og;
      const head = comp('head')
        .replace(/{{PAGE_TITLE}}/g, meta.title)
        .replace(/{{META_DESC}}/g, meta.desc || '')
        .replace(/{{CANONICAL}}/g, canonical)
        .replace(/{{OG_IMAGE}}/g, og);

      // inject Breadcrumb JSON-LD based on the visible breadcrumb nav in the body
      const crumbs = [];
      const bm = html.match(/<nav class="breadcrumb[\s\S]*?<ol>\s*([\s\S]*?)\s*<\/ol>\s*<\/nav>/);
      if (bm) {
        const lis = bm[1].matchAll(/<li>([\s\S]*?)<\/li>/g);
        let pos = 1;
        for (const li of lis) {
          const raw = li[1];
          const a = raw.match(/href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
          if (a) {
            crumbs.push({ pos, name: a[2].trim(), url: BASE + a[1] });
          } else {
            crumbs.push({ pos, name: raw.trim(), url: canonical });
          }
          pos++;
        }
      }
      let extraHead = '';
      if (crumbs.length) {
        const items = crumbs.map((c) => `{"@type":"ListItem","position":${c.pos},"name":"${c.name.replace(/&amp;/g, '&')}","item":"${c.url}"}`).join(',');
        extraHead = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [${items}]
}
</script>
`;
      }

      html = html.replace(
        /<!--\s*PAGE_HEAD\s*-->/,
        head + '\n' + extraHead + '\n<!-- page-specific head -->\n'
      );
      html = html.replace(/<!--\s*\/PAGE_HEAD\s*-->\s*\n?/, '');
    }

    html = html
      .replace('{{HEADER}}', comp('header'))
      .replace('{{FOOTER}}', comp('footer'))
      .replace('{{WHATSAPP}}', comp('whatsapp'))
      .replace('{{MOBILE_CTA}}', comp('mobile-cta'))
      .replace(/{{YEAR}}/g, YEAR)
      .replace(/\n{3,}/g, '\n\n')
      .trim() + '\n';

    fs.writeFileSync(path.join(OUT_DIR, f), html);
    console.log('Built', f);
    if (!is404) urls.push({ slug, lastmod: meta.lastmod });
  }

  // copy static assets when building to a separate output dir
  const srcAssets = path.join(ROOT, 'assets');
  const outAssets = path.join(OUT_DIR, 'assets');
  if (OUT_DIR !== ROOT && fs.existsSync(srcAssets)) {
    if (fs.existsSync(outAssets)) fs.rmSync(outAssets, { recursive: true, force: true });
    fs.cpSync(srcAssets, outAssets, { recursive: true });
    console.log('Copied assets');
  }

  // robots.txt
  const robots = `User-agent: *
Allow: /
Disallow: /assets/
Sitemap: ${BASE}/sitemap.xml
`;
  fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), robots);
  console.log('Built robots.txt');

  // sitemap.xml
  const today = new Date().toISOString().split('T')[0];
  const items = urls.map((u) => `  <url><loc>${BASE}${u.slug}</loc><lastmod>${u.lastmod || today}</lastmod><changefreq>monthly</changefreq><priority>${u.slug === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>
`;
  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemap);
  console.log('Built sitemap.xml');

  // CNAME for GitHub Pages custom domain (skipped for placeholder/non-custom hosts)
  const host = BASE.replace(/^https?:\/\//, '');
  if (!host.endsWith('example.com') && !host.endsWith('.github.io')) {
    fs.writeFileSync(path.join(OUT_DIR, 'CNAME'), host + '\n');
    console.log('Built CNAME (' + host + ')');
  }

  return { urls, base: BASE };
}

module.exports = { build, BASE };
if (require.main === module) build();
