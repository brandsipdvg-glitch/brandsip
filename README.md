# BRANDSIP — brandsip.online

Custom branded packaged drinking water website (static site generated with `node _src/build.js`).

## How to run locally

```bash
node _src/build.js
```

This writes the built HTML pages to the repo root (plus `robots.txt`, `sitemap.xml`, `CNAME`).
Then open `index.html` or serve the folder:

```bash
python3 -m http.server 8000
```

## Site configuration

- **Domain/base URL**: edit `_src/site-config.json` → `"base"`. Used for canonical URLs, sitemap, robots, Open Graph and the GH Pages `CNAME`. Can be overridden at build time with `BRANDSIP_BASE`.
- **Pages**: `_src/pages/*.html` (front-matter `<!-- META -->` block sets title/desc/og image).
- **Shared components**: header, footer, WhatsApp float, mobile CTA in `_src/components/`.
- **Quote form**: on submit it compiles the form data into a pre-filled WhatsApp message sent to 8073137080.
- **Editable placeholders**: `[FOUNDER NAME]`, story/mission/vision, `[BUSINESS CITY]`, etc., are already in pages — replace them with real content.
- **Assets**: logo, bottle images, CSS, JS in `assets/`.

## Deploy to GitHub Pages

1. Create a repo on GitHub (e.g. `brandsip`) and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial BRANDSIP site"
   git branch -M main
   git remote add origin git@github.com:brandsipdvg-glitch/brandsip.git
   git push -u origin main
   ```
2. GitHub Actions already auto-builds and deploys (`BRANDSIP_OUT=_site node _src/build.js`) on every push to `main`.
3. In repo **Settings → Pages**: set **Source → GitHub Actions**. Add your custom domain **brandsip.online**.
4. In your DNS provider for `brandsip.online`, follow GitHub's instructions (A records for GitHub Pages IPs, or a CNAME). GitHub issues the HTTPS certificate automatically.

After deploy, replace placeholder content (logo, bottle photos, founder/city details) in `_src` and push again.