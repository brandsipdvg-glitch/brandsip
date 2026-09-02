#!/usr/bin/env python3
"""Generate premium realistic BRANDSIP bottle mockup SVGs.
Realistic PET bottles with lighting, water fill, reflections and shadows.
Run: python3 _src/gen_premium_assets.py
"""
import os

OUT = os.path.join(os.path.dirname(__file__), '..', 'assets', 'images')
os.makedirs(OUT, exist_ok=True)


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def realistic_round_bottle(suffix, brand, brand2, sub, size_disp, size_sub,
                           brand_fs=26, sub_fs=15, brand_y=352, sub_y=382,
                           size_y=484, size_sub_y=510):
    brand, brand2, sub, size_disp, size_sub = map(
        esc, (brand, brand2, sub, str(size_disp), size_sub))
    g = suffix
    return f'''<defs>
  <linearGradient id="g{g}glass" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#dbeefc"/>
    <stop offset="0.25" stop-color="#f4fbff"/>
    <stop offset="0.55" stop-color="#eef8ff"/>
    <stop offset="0.85" stop-color="#cfecfb"/>
    <stop offset="1" stop-color="#b8def6"/>
  </linearGradient>
  <linearGradient id="g{g}water" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#8fd4f8"/>
    <stop offset="0.4" stop-color="#c6ecfc"/>
    <stop offset="0.7" stop-color="#a8dffb"/>
    <stop offset="1" stop-color="#6fc0f0"/>
  </linearGradient>
  <linearGradient id="g{g}capside" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#071f35"/>
    <stop offset="0.5" stop-color="#0a2f4d"/>
    <stop offset="1" stop-color="#08304f"/>
  </linearGradient>
  <linearGradient id="g{g}capring" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#0f4a78"/>
    <stop offset="0.5" stop-color="#1f6fa8"/>
    <stop offset="1" stop-color="#0f4a78"/>
  </linearGradient>
  <linearGradient id="g{g}label" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#0a2f4d"/>
    <stop offset="0.5" stop-color="#0d3f66"/>
    <stop offset="1" stop-color="#0a2f4d"/>
  </linearGradient>
  <linearGradient id="g{g}labeltop" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#071f35"/>
    <stop offset="1" stop-color="#0f4a78"/>
  </linearGradient>
</defs>

<g>
  <ellipse cx="196" cy="688" rx="108" ry="22" fill="#0a2f4d" opacity="0.18"/>
  <ellipse cx="196" cy="686" rx="86" ry="14" fill="#0a2f4d" opacity="0.12"/>

  <path d="M128 250 c0 -58 20 -96 68 -96 c48 0 68 38 68 96 l0 330 c0 42 -22 70 -68 70 c-46 0 -68 -28 -68 -70 z"
        fill="url(#g{g}glass)"/>
  <path d="M128 250 c0 -58 20 -96 68 -96 c48 0 68 38 68 96 l0 14 c0 -54 -22 -92 -68 -92 c-46 0 -68 38 -68 92 z"
        fill="#ffffff" opacity="0.55"/>
  <path d="M140 260 c0 -46 14 -80 56 -88 c-38 10 -50 44 -50 88 l0 300 c0 26 8 42 26 54 c-24 -10 -32 -30 -32 -54 z"
        fill="#ffffff" opacity="0.45"/>
  <path d="M244 262 c4 -40 -8 -66 -40 -84 c36 16 48 42 44 82 c-2 24 0 46 -4 64 c-8 -22 -8 -46 0 -62 z"
        fill="#0a2f4d" opacity="0.12"/>

  <path d="M136 520 l120 0 l0 140 c0 42 -22 70 -60 70 c-38 0 -60 -28 -60 -70 z"
        fill="url(#g{g}water)" opacity="0.85"/>
  <path d="M150 540 l10 0 c-2 40 -8 90 -2 130 c-8 -2 -10 -30 -8 -130 z" fill="#ffffff" opacity="0.5"/>
  <ellipse cx="196" cy="518" rx="60" ry="7" fill="#ffffff" opacity="0.7"/>

  <path d="M146 108 c18 10 28 26 28 44 l-2 0 c0 -16 -10 -30 -24 -40 z" fill="#54a8e0" opacity="0.6"/>
  <rect x="160" y="96" width="72" height="46" rx="9" fill="url(#g{g}capside)"/>
  <rect x="160" y="128" width="72" height="12" rx="5" fill="url(#g{g}capring)"/>
  <rect x="160" y="96" width="20" height="46" rx="9" fill="#ffffff" opacity="0.25"/>
  <rect x="222" y="102" width="6" height="38" rx="3" fill="#0a2f4d" opacity="0.4"/>

  <rect x="126" y="250" width="140" height="300" rx="14" fill="url(#g{g}label)"/>
  <rect x="126" y="250" width="140" height="64" rx="14" fill="url(#g{g}labeltop)"/>
  <rect x="126" y="250" width="20" height="300" rx="14" fill="#ffffff" opacity="0.10"/>

  <circle cx="196" cy="286" r="18" fill="#ffffff" opacity="0.92"/>
  <path d="M196 269 c14 11 16 18 16 24 a16 16 0 0 1 -32 0 c0 -6 2 -13 16 -24 z" fill="#1f8fd0"/>

  <text x="196" y="{brand_y}" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="{brand_fs}" fill="#ffffff" text-anchor="middle" letter-spacing="1">{brand}</text>
  <text x="196" y="{sub_y}" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="{sub_fs}" fill="#7cc4f5" text-anchor="middle" letter-spacing="4">{sub}</text>
  <line x1="146" y1="400" x2="246" y2="400" stroke="#1f6fa8" stroke-width="1"/>
  <text x="196" y="426" font-family="Inter, Arial, sans-serif" font-size="12" fill="#b8dcf5" text-anchor="middle" letter-spacing="2">PACKAGED DRINKING WATER</text>
  <text x="196" y="{size_y}" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="58" fill="#ffffff" text-anchor="middle">{size_disp}</text>
  <text x="196" y="{size_sub_y}" font-family="Inter, Arial, sans-serif" font-size="15" fill="#b8dcf5" text-anchor="middle" letter-spacing="3">{size_sub}</text>
  <line x1="146" y1="526" x2="246" y2="526" stroke="#1f6fa8" stroke-width="1"/>
  <text x="196" y="550" font-family="Inter, Arial, sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" letter-spacing="1">MAKE EVERY SIP A BRAND EXPERIENCE</text>
</g>
'''


VARIATIONS = [
    ('bottle-round-500', "HARBOR", "& OAK", "RESTAURANT", "500", "ml"),
    ('bottle-round-1l', "VERDE", "RESORT & SPA", "HOTEL", "1", "LITRE"),
    ('bottle-round-corporate', "NORTHGATE", "", "CORPORATE", "500", "ml"),
    ('bottle-square-300', "THE KITCHEN", "", "RESTAURANT", "300", "ml"),
    ('bottle-square-500', "WEDDING DAY", "", "CUSTOM LABEL", "500", "ml"),
]


def main():
    for name, b, b2, sub, sd, ss in VARIATIONS:
        suffix = name.replace('bottle-round-', 'r').replace('bottle-square-', 's').replace('-', '')
        inner = realistic_round_bottle(suffix, b, b2, sub, sd, ss)
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 720" '
               f'width="400" height="720" role="img" aria-label="{name} custom branded water bottle">\n'
               + inner + '\n</svg>\n')
        with open(os.path.join(OUT, name + '.svg'), 'w') as f:
            f.write(svg)
        print('wrote', name)


if __name__ == '__main__':
    main()