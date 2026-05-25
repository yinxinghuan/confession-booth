#!/usr/bin/env python3
"""
Sin of the Week — 1080×1080 poster generator.

Takes a high-res screenshot of the live booth screen (Wolność v4 style)
and centers it on a 1080×1080 black canvas with festival-style border
decoration (color zigzag bands on top + bottom).

Run:
  ~/miniconda3/bin/python3 gen_poster_v4.py
"""
import os
from PIL import Image, ImageDraw, ImageFont

W = 1080
HERE = os.path.dirname(os.path.abspath(__file__))
OUTPUT = '/Users/yin/code/games/games/posters/confession-booth-v4.png'
RAW = os.path.join(HERE, '_screens', 'v4-booth-poster.png')

BLACK   = (10, 10, 10)
CREAM   = (252, 232, 200)
PINK    = (255, 77, 142)
CORAL   = (255, 122, 74)
TEAL    = (62, 217, 185)
LAVENDR = (168, 136, 255)
YELLOW  = (255, 210, 74)
ORANGE  = (255, 154, 60)


def zigzag_band(w, h, color1, color2, cols=18):
  """Top zigzag band — alternating colored triangles."""
  img = Image.new('RGB', (w, h), BLACK)
  d = ImageDraw.Draw(img)
  step = w / cols
  for i in range(cols + 1):
    x = int(i * step)
    half = int(step * 0.4)
    color = color1 if i % 2 == 0 else color2
    d.polygon([(x - half, 0), (x + half, 0), (x, h)], fill=color)
  return img


def main():
  if not os.path.exists(RAW):
    raise SystemExit(f"missing {RAW}")

  raw = Image.open(RAW).convert('RGBA')
  rw, rh = raw.size

  # Scale to 960 height (60px margin top+bottom)
  target_h = 960
  scale = target_h / rh
  new_w = int(rw * scale)
  raw_scaled = raw.resize((new_w, target_h), Image.LANCZOS)

  canvas = Image.new('RGBA', (W, W), BLACK + (255,))

  # Top + bottom zigzag bands
  band_h = 40
  top_band = zigzag_band(W, band_h, LAVENDR, PINK, cols=20)
  bot_band = zigzag_band(W, band_h, CORAL, YELLOW, cols=20).rotate(180)
  canvas.paste(top_band.convert('RGBA'), (0, 0))
  canvas.paste(bot_band.convert('RGBA'), (0, W - band_h))

  # Center the phone screen
  x = (W - new_w) // 2
  y = (W - target_h) // 2

  # 4px black halo + brass border
  d = ImageDraw.Draw(canvas)
  d.rectangle([(x - 5, y - 5), (x + new_w + 4, y + target_h + 4)], outline=CREAM, width=3)

  canvas.paste(raw_scaled, (x, y), raw_scaled)

  # Top-left "FESTIVAL" tag chip
  try:
    title_font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 22)
    small_font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 14)
  except Exception:
    title_font = ImageFont.load_default()
    small_font = ImageFont.load_default()

  canvas = canvas.convert('RGB')
  d = ImageDraw.Draw(canvas)

  # Small "WEEK x" chip top-right
  chip_text = '· FESTIVAL ·'
  bbox = d.textbbox((0, 0), chip_text, font=small_font)
  chip_w = bbox[2] - bbox[0] + 20
  chip_h = 28
  cx = (W - chip_w) // 2
  cy = band_h + 10
  d.rounded_rectangle([(cx, cy), (cx + chip_w, cy + chip_h)], radius=14, fill=YELLOW, outline=BLACK, width=3)
  d.text((cx + 10, cy + 4), chip_text, fill=BLACK, font=small_font)

  canvas.save(OUTPUT, optimize=True)
  print(f"wrote {OUTPUT}")


if __name__ == '__main__':
  main()
