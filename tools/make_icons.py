#!/usr/bin/env python3
"""Generate the PWA icons procedurally (no external art assets):
a chibi face on a pink rounded square, drawn with PIL primitives."""
from PIL import Image, ImageDraw

def draw(size: int) -> Image.Image:
    s = size / 512  # scale factor from the 512 master
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    def R(v):  # scale a master coordinate
        return v * s

    # rounded-square background
    d.rounded_rectangle([0, 0, size, size], radius=R(110), fill=(255, 143, 171, 255))
    # face
    d.ellipse([R(126), R(150), R(386), R(430)], fill=(255, 217, 192, 255))
    # hair cap
    d.pieslice([R(112), R(96), R(400), R(400)], start=180, end=360, fill=(138, 90, 51, 255))
    d.rounded_rectangle([R(112), R(238), R(400), R(268)], radius=R(14), fill=(138, 90, 51, 255))
    # eyes
    for cx in (206, 306):
        d.ellipse([R(cx - 17), R(292), R(cx + 17), R(348)], fill=(51, 50, 62, 255))
        d.ellipse([R(cx + 2), R(300), R(cx + 13), R(316)], fill=(255, 255, 255, 255))
    # blush
    for cx in (168, 344):
        d.ellipse([R(cx - 24), R(336), R(cx + 24), R(362)], fill=(255, 158, 176, 255))
    # smile
    d.arc([R(226), R(330), R(286), R(378)], start=15, end=165, fill=(163, 74, 82, 255), width=max(2, int(R(7))))
    # shirt hint at the bottom
    d.rounded_rectangle([R(176), R(428), R(336), R(512)], radius=R(26), fill=(255, 255, 255, 255))
    return img

import os
out = os.path.join(os.path.dirname(__file__), "..", "public", "icons")
os.makedirs(out, exist_ok=True)
for size in (192, 512):
    draw(size).save(os.path.join(out, f"icon-{size}.png"))
print("icons written to", out)
