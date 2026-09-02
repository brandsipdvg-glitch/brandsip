#!/usr/bin/env python3
"""Generate premium BRANDSIP bottle/mockup SVGs (placeholder assets).
User replaces these with actual sample bottle photos and logo later.
"""
import os

OUT = os.path.join(os.path.dirname(__file__), '..', 'assets', 'images')
os.makedirs(OUT, exist_ok=True)

CAP = '#06385f'
BLUE = '#0a4d82'
MID = '#0f5ea8'
ACCENT = '#6ec2f1'
WHITE = '#ffffff'
SOFT = '#bcd9f0'

HEAD = ('<?xml version="1.0" encoding="UTF-8"?>\n'
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 720" '
        'width="400" height="720" role="img">'
        '<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1">'
        '<stop offset="0" stop-color="#ddeefb"/><stop offset="1" stop-color="#ffffff"/>'
        '</linearGradient></defs><rect width="400" height="720" fill="url(#sk)"/>')

FOOT = '</svg>'

def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def drop(cx, cy, r):
    return (f'<path d="M{cx} {cy-r} c {r*0.9} {r*0.7} {r} {r*1.1} {r} {r*1.5} '
            f'a {r} {r} 0 0 1 -{r*2} 0 c 0 -{r*0.4} {r*0.1} -{r*0.8} {r} -{r*1.5} z" fill="#1484d4"/>')

def round_inner(brand, brand2, sub, size_disp, size_sub, y_label=285):
    brand, brand2, sub, size_disp, size_sub = map(esc, (brand, brand2, sub, str(size_disp), size_sub))
    return f'''<rect x="168" y="86" width="64" height="34" rx="8" fill="{CAP}"/>
<rect x="114" y="180" width="10" height="70" fill="none" stroke="#9cc8ec" stroke-width="3"/>
<path d="M114 250 h10 v-70 a12 12 0 0 1 12-12 h132 a12 12 0 0 1 12 12 v70 h10 c18 0 30 22 30 52 v330 c0 40 -22 66 -60 66 h-100 c-38 0 -60 -26 -60 -66 v-330 c0 -30 12 -52 30 -52z" fill="url(#sk)"/>
<rect x="124" y="{y_label}" width="156" height="310" rx="14" fill="{BLUE}"/>
<rect x="124" y="{y_label}" width="156" height="70" rx="14" fill="{CAP}"/>
<circle cx="202" cy="{y_label+34}" r="20" fill="{WHITE}" opacity="0.9"/>
{drop(202, y_label+34, 18)}
<text x="202" y="{y_label+112}" font-family="Georgia,serif" font-weight="bold" font-size="22" fill="{WHITE}" text-anchor="middle">{brand}</text>
<text x="202" y="{y_label+136}" font-family="Georgia,serif" font-weight="bold" font-size="22" fill="{ACCENT}" text-anchor="middle">{brand2}</text>
<text x="202" y="{y_label+166}" font-family="Arial,sans-serif" font-size="13" fill="{SOFT}" text-anchor="middle" letter-spacing="3">{sub}</text>
<line x1="150" y1="{y_label+186}" x2="254" y2="{y_label+186}" stroke="#2f72ad" stroke-width="1"/>
<text x="202" y="{y_label+216}" font-family="Arial,sans-serif" font-size="13" fill="{WHITE}" text-anchor="middle">PACKAGED DRINKING WATER</text>
<text x="202" y="{y_label+278}" font-family="Arial,sans-serif" font-size="62" font-weight="bold" fill="{WHITE}" text-anchor="middle">{size_disp}</text>
<text x="202" y="{y_label+308}" font-family="Arial,sans-serif" font-size="16" fill="{SOFT}" text-anchor="middle" letter-spacing="2">{size_sub}</text>
<line x1="150" y1="{y_label+330}" x2="254" y2="{y_label+330}" stroke="#2f72ad" stroke-width="1"/>
<text x="202" y="{y_label+364}" font-family="Arial,sans-serif" font-size="11" fill="{WHITE}" text-anchor="middle">MAKE EVERY SIP A BRAND EXPERIENCE</text>'''

def square_inner(brand, brand2, sub, size_disp, y_label=430, h=300):
    brand, brand2, sub, size_disp = map(esc, (brand, brand2, sub, str(size_disp)))
    sw = 76
    x = 200 - sw
    return f'''<rect x="{x}" y="150" width="{sw*2}" height="420" rx="28" fill="url(#sk)"/>
<rect x="{x}" y="150" width="{sw*2}" height="420" rx="28" fill="none" stroke="#9cc8ec" stroke-width="3"/>
<rect x="{200-22}" y="86" width="44" height="40" rx="8" fill="{CAP}"/>
<rect x="{x+6}" y="{y_label}" width="{sw*2-12}" height="{h}" rx="12" fill="{WHITE}"/>
<rect x="{x+6}" y="{y_label}" width="{sw*2-12}" height="52" rx="12" fill="{CAP}"/>
<text x="200" y="{y_label+34}" font-family="Georgia,serif" font-weight="bold" font-size="17" fill="{WHITE}" text-anchor="middle">{brand}</text>
<text x="200" y="{y_label+104}" font-family="Georgia,serif" font-weight="bold" font-size="28" fill="{BLUE}" text-anchor="middle">{brand2}</text>
<text x="200" y="{y_label+140}" font-family="Arial,sans-serif" font-size="15" fill="{MID}" text-anchor="middle">{size_disp}</text>
<text x="200" y="{y_label+172}" font-family="Arial,sans-serif" font-size="12" fill="{MID}" text-anchor="middle">{sub}</text>
<text x="200" y="{y_label+420}" font-family="Arial,sans-serif" font-size="10" letter-spacing="2" fill="{BLUE}" text-anchor="middle">MAKE EVERY SIP A BRAND EXPERIENCE</text>'''

def save(name, inner, label, h=720):
    head = HEAD.replace('height="720"', f'height="{h}"').replace('viewBox="0 0 400 720"', f'viewBox="0 0 400 {h}"')
    svg = head + inner + FOOT
    # ensure aria label present for accessibility
    svg = svg.replace('role="img"', f'role="img" aria-label="{label}"')
    with open(os.path.join(OUT, name + '.svg'), 'w') as f:
        f.write(svg)
    print('wrote', name)

# Bottle size images
save('bottle-round-500', round_inner("HARBOR", "& OAK", "RESTAURANT", "500", "ml"),
     "BRANDSIP customized 500ml round branded bottled water")
save('bottle-round-1l', round_inner("VERDE", "RESORT & SPA", "HOTEL", "1", "LITRE"),
     "Customized 1 litre round branded drinking water bottle")
save('bottle-round-corporate', round_inner("NORTHGATE", "", "CORPORATE", "500", "ml"),
     "BRANDSIP branded corporate water bottle")
save('bottle-square-300', square_inner("THE", "KITCHEN", "SINGLE-SIDE LABEL", "300 ml"),
     "Customized 300ml square branded water bottle")
save('bottle-square-500', square_inner("WEDDING", "DAY", "CUSTOM LABEL", "500 ml"),
     "Customized 500ml square branded water bottle")

# Gallery set (variations)
save('gallery-restaurant', round_inner("HARBOR", "& OAK", "RESTAURANT", "500", "ml"),
     "Customized restaurant water bottle label")
save('gallery-hotel', round_inner("VERDE", "RESORT & SPA", "HOTEL", "500", "ml"),
     "BRANDSIP branded hotel water bottle")
save('gallery-corporate', round_inner("NORTHGATE", "", "CORPORATE", "330", "ml"),
     "Corporate branded water bottle by BRANDSIP")
save('gallery-wedding', round_inner("ADAM", "& EVA", "WEDDING", "300", "ml"),
     "Customized wedding water bottle")
save('gallery-event', round_inner("SUMMIT", "CONFERENCE", "EVENT", "500", "ml"),
     "Event branded water bottle")
save('gallery-business', square_inner("CITY", "BIZHUB", "BUSINESS LABEL", "500 ml", y_label=460, h=260),
     "Customized business water bottle")

print("\nAll bottle assets generated.")
