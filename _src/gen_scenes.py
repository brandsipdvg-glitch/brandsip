#!/usr/bin/env python3
"""Generate premium scene/in-context SVGs: bottles in real-world environments."""
import os

OUT = os.path.join(os.path.dirname(__file__), '..', 'assets', 'images')
os.makedirs(OUT, exist_ok=True)

def scene(name, caption, bg_top, bg_bot, accent, table='#e8eef4', bottle_svg=None, bottle_scale=0.8, bottle_x=120, bottle_y=210):
    # bottle is drawn programmatically (simplified realistic bottle) within scene
    pass

def draw_bottle_group(g, x=0, y=0, s=1, cap='#0a2f4d', label='#0d3f66'):
    return f'''<g transform="translate({x},{y}) scale({s})">
  <!-- shadow -->
  <ellipse cx="96" cy="640" rx="95" ry="20" fill="#0a2f4d" opacity="0.18"/>
  <!-- glass -->
  <path d="M46 250 c0 -52 18 -90 50 -90 c32 0 50 38 50 90 l0 330 c0 38 -20 64 -50 64 c-30 0 -50 -26 -50 -64 z" fill="#d9edfb"/>
  <path d="M46 250 c0 -52 18 -90 50 -90 c32 0 50 38 50 90 l0 16 c0 -50 -20 -88 -50 -88 c-30 0 -50 38 -50 88 z" fill="#ffffff" opacity="0.5"/>
  <path d="M56 262 c0 -42 12 -72 44 -80 c-30 8 -40 38 -40 80 l0 280 c0 22 6 36 20 46 c-18 -8 -24 -26 -24 -46 z" fill="#ffffff" opacity="0.42"/>
  <!-- water -->
  <path d="M50 500 l92 0 l0 130 c0 36 -18 58 -46 58 c-28 0 -46 -22 -46 -58 z" fill="#a9dffb" opacity="0.85"/>
  <ellipse cx="96" cy="498" rx="46" ry="6" fill="#ffffff" opacity="0.7"/>
  <!-- cap -->
  <rect x="72" y="158" width="48" height="34" rx="6" fill="#071f35"/>
  <rect x="72" y="182" width="48" height="10" rx="4" fill="#1f6fa8"/>
  <rect x="72" y="158" width="12" height="34" rx="6" fill="#ffffff" opacity="0.25"/>
  <!-- label -->
  <rect x="50" y="250" width="92" height="230" rx="9" fill="{label}"/>
  <rect x="50" y="250" width="92" height="40" rx="9" fill="#071f35"/>
  <circle cx="96" cy="272" r="11" fill="#ffffff" opacity="0.92"/>
  <path d="M96 262 c8 6 10 11 10 14 a10 10 0 0 1 -20 0 c0 -3 2 -8 10 -14 z" fill="#1f8fd0"/>
  <rect x="50" y="250" width="13" height="230" rx="9" fill="#ffffff" opacity="0.09"/>
  <line x1="60" y1="292" x2="132" y2="292" stroke="#1f6fa8" stroke-width="1"/>
  <text font-family="Inter,Arial,sans-serif" font-weight="800" font-size="11" fill="#ffffff" x="96" y="415" text-anchor="middle">MAKE EVERY</text>
  <text font-family="Inter,Arial,sans-serif" font-weight="800" font-size="11" fill="#ffffff" x="96" y="430" text-anchor="middle">SIP A BRAND</text>
  <text font-family="Inter,Arial,sans-serif" font-weight="800" font-size="11" fill="#7cc4f5" x="96" y="446" text-anchor="middle">EXPERIENCE</text>
</g>'''

# --- Scene: Restaurant table ---
def restaurant_scene():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img" aria-label="BRANDSIP branded bottle on a restaurant table">
<defs>
  <linearGradient id="rsbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef5fb"/><stop offset="1" stop-color="#dbe9f5"/></linearGradient>
  <linearGradient id="rstbl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f7fa"/><stop offset="1" stop-color="#dfe8f0"/></linearGradient>
  <radialGradient id="rswarm" cx="0.5" cy="0.3" r="0.8"><stop offset="0" stop-color="#8ec8ee" stop-opacity="0.25"/><stop offset="1" stop-color="#8ec8ee" stop-opacity="0"/></radialGradient>
</defs>
<rect width="640" height="480" fill="url(#rsbg)"/>
<rect width="640" height="480" fill="url(#rswarm)"/>
<!-- soft window light -->
<path d="M80 0 L240 0 L140 480 L0 480 Z" fill="#ffffff" opacity="0.18"/>
<!-- tabletop -->
<path d="M0 360 L640 360 L620 480 L20 480 Z" fill="url(#rstbl)"/>
<rect x="0" y="356" width="640" height="6" fill="#ffffff" opacity="0.6"/>
<!-- placemat -->
<rect x="180" y="300" width="280" height="150" rx="10" fill="#ffffff" opacity="0.7"/>
<rect x="200" y="318" width="240" height="114" rx="8" fill="none" stroke="#bcd6ec" stroke-width="1.5" stroke-dasharray="6 5"/>
<!-- glass / water -->
<path d="M420 260 l0 90 a12 12 0 0 0 12 12 l34 0 a12 12 0 0 0 12 -12 l0 -90 z" fill="#d9ecfa" opacity="0.8"/>
<path d="M422 262 c18 30 30 60 30 86 c0 -30 -10 -58 -22 -84 c-2 0 -5 14 -8 -2 z" fill="#ffffff" opacity="0.5"/>
<!-- napkin -->
<path d="M150 310 l40 0 c6 -16 18 -28 34 -30 c-4 4 6 16 6 30 l40 0 l0 40 l-120 0 z" fill="#ffffff" opacity="0.9"/>
<!-- fork & knife -->
<path d="M150 350 l0 -24 M148 350 l4 0 M150 340 l0 -10 c6 -6 8 -12 8 -18 M150 322 c-4 -4 -6 -10 -6 -16" stroke="#8fb8d9" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M500 350 l0 -30 M500 350 l0 -8" stroke="#8fb8d9" stroke-width="3" stroke-linecap="round" fill="none"/>

{draw_bottle_group('ra', x=300, y=120, s=0.95)}

<!-- warm plate -->
<ellipse cx="220" cy="420" rx="60" ry="22" fill="#ffffff" opacity="0.85"/>
</svg>
'''
# --- Scene: Hotel room ---
def hotel_scene():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img" aria-label="BRANDSIP branded bottle in a hotel room">
<defs>
  <linearGradient id="htbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2f7fc"/><stop offset="1" stop-color="#d8e6f2"/></linearGradient>
  <radialGradient id="htwarm" cx="0.6" cy="0.3" r="0.9"><stop offset="0" stop-color="#7dbce6" stop-opacity="0.22"/><stop offset="1" stop-color="#7dbce6" stop-opacity="0"/></radialGradient>
</defs>
<rect width="640" height="480" fill="url(#htbg)"/>
<rect width="640" height="480" fill="url(#htwarm)"/>
<!-- window -->
<rect x="40" y="40" width="200" height="240" rx="6" fill="#cfe6f6"/>
<rect x="48" y="48" width="184" height="224" rx="4" fill="#e6f4fd"/>
<rect x="130" y="48" width="2" height="224" fill="#bfd8ea"/>
<rect x="48" y="146" width="184" height="2" fill="#bfd8ea"/>
<path d="M60 60 l60 60 M200 60 l-60 60 M60 250 l60 -60 M200 250 l-60 -60" stroke="#ffffff" stroke-width="3" opacity="0.6"/>
<!-- bed headboard -->
<rect x="260" y="220" width="360" height="130" rx="12" fill="#e9f1f8"/>
<rect x="260" y="300" width="360" height="50" rx="12" fill="#d6e6f2"/>
<!-- bedside table -->
<rect x="200" y="320" width="160" height="130" rx="8" fill="#eef4f9"/>
<rect x="200" y="320" width="160" height="10" rx="4" fill="#ffffff" opacity="0.6"/>
{draw_bottle_group('hw', x=238, y=180, s=0.72, label='#0d3f66')}
<!-- lamp -->
<path d="M356 270 c-2 -14 2 -22 6 -26 M358 330 l0 -60" stroke="#a9c3d9" stroke-width="4" stroke-linecap="round" fill="none"/>
<path d="M338 268 a20 20 0 0 1 40 0 l-6 -6 a14 14 0 0 0 -28 0 z" fill="#9ecdef" opacity="0.9"/>
</svg>
'''
# --- Scene: Wedding ---
def wedding_scene():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img" aria-label="BRANDSIP branded bottles at a wedding table">
<defs>
  <linearGradient id="wdbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5f7fd"/><stop offset="1" stop-color="#e3e9f6"/></linearGradient>
  <radialGradient id="wdwarm" cx="0.5" cy="0.2" r="0.9"><stop offset="0" stop-color="#a9c7ef" stop-opacity="0.25"/><stop offset="1" stop-color="#a9c7ef" stop-opacity="0"/></radialGradient>
</defs>
<rect width="640" height="480" fill="url(#wdbg)"/>
<rect width="640" height="480" fill="url(#wdwarm)"/>
<!-- drape/bunting -->
<path d="M0 20 Q80 60 160 20 Q240 60 320 20 Q400 60 480 20 Q560 60 640 20 L640 0 L0 0 Z" fill="#cfe4f7"/>
<path d="M0 20 Q80 60 160 20 Q240 60 320 20 Q400 60 480 20 Q560 60 640 20" stroke="#7fa8d0" stroke-width="1.5" fill="none"/>
<!-- tablecloth -->
<path d="M0 300 L640 300 L600 480 L40 480 Z" fill="#eef3fa"/>
<path d="M0 296 L640 296 L638 304 L2 304 Z" fill="#ffffff" opacity="0.8"/>
<!-- center flowers -->
<g transform="translate(300,250)">
  <path d="M0 26 c-2 -8 2 -14 4 -16 M-12 24 c0 -8 4 -14 8 -18 M12 24 c0 -8 -4 -14 -8 -18" stroke="#9ec8e8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <circle cx="4" cy="8" r="9" fill="#9ec8e8" opacity="0.7"/>
  <circle cx="-8" cy="6" r="8" fill="#b8d4ec" opacity="0.8"/>
  <circle cx="14" cy="10" r="7" fill="#cfe2f2" opacity="0.85"/>
  <circle cx="4" cy="0" r="6" fill="#7fa8d0"/>
</g>
{draw_bottle_group('wd', x=180, y=170, s=0.7, label='#5a5a8a')}
{draw_bottle_group('wd2', x=340, y=170, s=0.7, label='#5a5a8a')}
</svg>
'''
# --- Scene: Corporate ---
def corporate_scene():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img" aria-label="BRANDSIP branded bottle at a corporate conference">
<defs>
  <linearGradient id="cpbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef4fa"/><stop offset="1" stop-color="#d6e3ef"/></linearGradient>
  <radialGradient id="cpwarm" cx="0.5" cy="0.3" r="0.8"><stop offset="0" stop-color="#5f9ed0" stop-opacity="0.2"/><stop offset="1" stop-color="#5f9ed0" stop-opacity="0"/></radialGradient>
</defs>
<rect width="640" height="480" fill="url(#cpbg)"/>
<rect width="640" height="480" fill="url(#cpwarm)"/>
<!-- stage/screen -->
<rect x="120" y="30" width="400" height="180" rx="8" fill="#0a2f4d"/>
<rect x="136" y="46" width="368" height="148" rx="4" fill="#123e63"/>
<text font-family="Inter,Arial,sans-serif" font-weight="800" font-size="26" fill="#7cc4f5" x="320" y="120" text-anchor="middle" letter-spacing="4">CORPORATE</text>
<text font-family="Inter,Arial,sans-serif" font-weight="600" font-size="14" fill="#b8dcf5" x="320" y="150" text-anchor="middle" letter-spacing="2">SUMMIT 2025</text>
<!-- podium -->
<rect x="300" y="230" width="40" height="70" rx="4" fill="#d4e4f0"/>
<rect x="280" y="260" width="80" height="30" rx="5" fill="#e9f2f9"/>
{draw_bottle_group('cp', x=300, y=190, s=0.7, label='#0d3f66')}
<!-- table surface -->
<path d="M0 360 L640 360 L620 480 L20 480 Z" fill="#e8eef4"/>
<rect x="0" y="356" width="640" height="6" fill="#ffffff" opacity="0.6"/>
<!-- briefcase -->
<rect x="500" y="330" width="90" height="70 " rx="8" fill="#7f9db8"/>
<rect x="520" y="322" width="50" height="12" rx="5" fill="#6e87a0"/>
</svg>
'''
# --- Scene: Event ---
def event_scene():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img" aria-label="BRANDSIP branded bottles at an event reception">
<defs>
  <linearGradient id="evbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2f6fb"/><stop offset="1" stop-color="#dce8f4"/></linearGradient>
  <radialGradient id="evwarm" cx="0.5" cy="0.25" r="0.9"><stop offset="0" stop-color="#9cc3e8" stop-opacity="0.22"/><stop offset="1" stop-color="#9cc3e8" stop-opacity="0"/></radialGradient>
</defs>
<rect width="640" height="480" fill="url(#evbg)"/>
<rect width="640" height="480" fill="url(#evwarm)"/>
<!-- string lights -->
<path d="M0 30 Q60 60 120 30 Q180 60 240 30 Q300 60 360 30 Q420 60 480 30 Q540 60 600 30 L640 26" stroke="#cfe0ef" stroke-width="2" fill="none"/>
<circle cx="120" cy="40" r="5" fill="#ffd780" opacity="0.8"/>
<circle cx="240" cy="40" r="5" fill="#ffd780" opacity="0.8"/>
<circle cx="360" cy="40" r="5" fill="#ffd780" opacity="0.8"/>
<circle cx="480" cy="40" r="5" fill="#ffd780" opacity="0.8"/>
<!-- reception table -->
<path d="M0 330 L640 330 L610 480 L30 480 Z" fill="#eaf1f8"/>
<rect x="0" y="326" width="640" height="6" fill="#ffffff" opacity="0.7"/>
{draw_bottle_group('ev', x=220, y=150, s=0.85, label='#0d3f66')}
{draw_bottle_group('ev2', x=360, y=150, s=0.85, label='#0d3f66')}
<!-- name cards -->
<rect x="160" y="330" width="50" height="22" rx="3" fill="#ffffff" opacity="0.9"/>
<rect x="420" y="330" width="50" height="22" rx="3" fill="#ffffff" opacity="0.9"/>
</svg>
'''
# --- Gallery: closeup label ---
def closeup_scene():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img" aria-label="Closeup of BRANDSIP branded water bottle label">
<defs>
  <linearGradient id="clbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a2f4d"/><stop offset="1" stop-color="#0d3f66"/></linearGradient>
  <linearGradient id="clrade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity="0.10"/><stop offset="0.5" stop-color="#ffffff" stop-opacity="0"/><stop offset="0.6" stop-color="#ffffff" stop-opacity="0.14"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
</defs>
<rect width="640" height="480" fill="url(#clbg)"/>
<!-- big bottle fill -->
<path d="M140 20 L500 20 L500 560 L140 560 Z" fill="url(#clrade)"/>
<path d="M150 -10 c40 90 60 200 60 320 M490 -10 c-40 90 -60 200 -60 320" stroke="#ffffff" stroke-width="2" opacity="0.12" fill="none"/>
<!-- label panel -->
<rect x="200" y="70" width="240" height="340" rx="18" fill="#0d3f66"/>
<rect x="200" y="70" width="240" height="70" rx="18" fill="#071f35"/>
<circle cx="320" cy="105" r="24" fill="#ffffff" opacity="0.95"/>
<path d="M320 82 c20 14 22 24 22 32 a22 22 0 0 1 -44 0 c0 -8 2 -18 22 -32 z" fill="#1f8fd0"/>
<text font-family="Inter,Arial,sans-serif" font-weight="800" font-size="22" fill="#ffffff" x="320" y="190" text-anchor="middle" letter-spacing="2">MAKE EVERY SIP</text>
<text font-family="Inter,Arial,sans-serif" font-weight="800" font-size="22" fill="#7cc4f5" x="320" y="218" text-anchor="middle" letter-spacing="2">A BRAND EXPERIENCE</text>
<line x1="230" y1="236" x2="410" y2="236" stroke="#1f6fa8" stroke-width="1.5"/>
<text font-family="Inter,Arial,sans-serif" font-size="13" fill="#b8dcf5" x="320" y="262" text-anchor="middle" letter-spacing="3">PACKAGED DRINKING WATER</text>
<text font-family="Inter,Arial,sans-serif" font-weight="800" font-size="70" fill="#ffffff" x="320" y="330" text-anchor="middle">500</text>
<text font-family="Inter,Arial,sans-serif" font-size="18" fill="#b8dcf5" x="320" y="356" text-anchor="middle" letter-spacing="3">ml</text>
<line x1="230" y1="374" x2="410" y2="374" stroke="#1f6fa8" stroke-width="1.5"/>
<text font-family="Inter,Arial,sans-serif" font-size="11" fill="#ffffff" x="320" y="398" text-anchor="middle" letter-spacing="2">BRANDSIP · CUSTOM LABEL</text>
<rect x="200" y="70" width="22" height="340" rx="18" fill="#ffffff" opacity="0.08"/>
</svg>
'''

scenes = {
    'gallery-restaurant': restaurant_scene,
    'gallery-hotel': hotel_scene,
    'gallery-wedding': wedding_scene,
    'gallery-corporate': corporate_scene,
    'gallery-event': event_scene,
    'gallery-closeup': closeup_scene,
}
scenes['gallery-business'] = event_scene  # reuse event for business

for name, fn in scenes.items():
    svg = fn()
    with open(os.path.join(OUT, name + '.svg'), 'w') as f:
        f.write(svg)
    print('wrote', name)

print("Done generating scenes.")
