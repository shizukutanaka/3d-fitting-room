// Procedural textures, all generated on a 2D canvas at runtime —
// no image files, no downloads, so the license ledger stays clean
// (see docs/DESIGN.md). These carry the "real-ish" material quality:
// fabric weave, skin mottling, hair strands, wood grain, plaster,
// pebbled leather. Color maps are kept near-neutral so the material
// color can tint them.

import * as THREE from 'three';

function canvasTexture(
  size: number,
  draw: (ctx: CanvasRenderingContext2D, size: number) => void,
  opts: { srgb?: boolean; repeat?: [number, number] } = {},
): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d')!;
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  if (opts.srgb) tex.colorSpace = THREE.SRGBColorSpace;
  if (opts.repeat) tex.repeat.set(opts.repeat[0], opts.repeat[1]);
  tex.anisotropy = 4;
  return tex;
}

/** Deterministic pseudo-random source so textures look the same on
 *  every load (and screenshots are comparable across runs). */
function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

function speckle(
  ctx: CanvasRenderingContext2D,
  size: number,
  count: number,
  rand: () => number,
  style: (a: number) => string,
  rMin: number,
  rMax: number,
): void {
  for (let i = 0; i < count; i++) {
    const r = rMin + rand() * (rMax - rMin);
    ctx.fillStyle = style(0.03 + rand() * 0.08);
    ctx.beginPath();
    ctx.ellipse(rand() * size, rand() * size, r, r * (0.4 + rand() * 0.6), rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
}

export interface MapBump {
  map: THREE.Texture;
  bump: THREE.Texture;
}

/** Woven cloth: fine cross-hatch threads. Near-white map so the
 *  outfit color tints it; the bump carries the weave relief. */
export function fabricTextures(repeat: [number, number] = [3, 3]): MapBump {
  const drawMap = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.fillStyle = '#f4f1ec';
    ctx.fillRect(0, 0, size, size);
    const rand = rng(11);
    for (let y = 0; y < size; y += 2) {
      ctx.fillStyle = `rgba(120,110,100,${0.05 + rand() * 0.06})`;
      ctx.fillRect(0, y, size, 1);
    }
    for (let x = 0; x < size; x += 2) {
      ctx.fillStyle = `rgba(255,255,255,${0.05 + rand() * 0.05})`;
      ctx.fillRect(x, 0, 1, size);
    }
    speckle(ctx, size, 500, rand, (a) => `rgba(105,95,85,${a})`, 0.6, 1.8);
  };
  const drawBump = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, size, size);
    for (let y = 0; y < size; y += 3) {
      ctx.fillStyle = y % 6 === 0 ? '#a8a8a8' : '#5c5c5c';
      ctx.fillRect(0, y, size, 1.4);
    }
    for (let x = 0; x < size; x += 3) {
      ctx.fillStyle = x % 6 === 0 ? 'rgba(168,168,168,0.55)' : 'rgba(92,92,92,0.55)';
      ctx.fillRect(x, 0, 1.4, size);
    }
  };
  return {
    map: canvasTexture(256, drawMap, { srgb: true, repeat }),
    bump: canvasTexture(256, drawBump, { repeat }),
  };
}

/** Skin: extremely subtle warm mottling over white (tinted by the
 *  material color) plus a micro-noise bump. Kept faint on purpose —
 *  strong skin detail at this scale reads as dirt, not realism. */
export function skinTextures(): MapBump {
  const drawMap = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.fillStyle = '#fdf6f0';
    ctx.fillRect(0, 0, size, size);
    const rand = rng(23);
    speckle(ctx, size, 260, rand, (a) => `rgba(214,150,110,${a * 0.7})`, 4, 16);
    speckle(ctx, size, 200, rand, (a) => `rgba(240,200,170,${a})`, 3, 10);
    speckle(ctx, size, 900, rand, (a) => `rgba(190,130,95,${a * 0.5})`, 0.5, 1.2);
  };
  const drawBump = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, size, size);
    const rand = rng(29);
    speckle(ctx, size, 2600, rand, (a) => `rgba(255,255,255,${a})`, 0.4, 1.1);
    speckle(ctx, size, 2600, rand, (a) => `rgba(0,0,0,${a})`, 0.4, 1.1);
  };
  return {
    map: canvasTexture(256, drawMap, { srgb: true }),
    bump: canvasTexture(256, drawBump),
  };
}

/** Hair strands: vertical streaks used as bump (and faint map). */
export function hairTextures(): MapBump {
  const draw = (base: string, amp: number) => (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, size, size);
    const rand = rng(37);
    for (let x = 0; x < size; x += 1) {
      const v = (rand() - 0.5) * amp;
      ctx.fillStyle = v > 0 ? `rgba(255,235,210,${v})` : `rgba(10,5,0,${-v})`;
      const w = 1 + rand() * 2;
      ctx.fillRect(x, 0, w, size);
      x += w - 1;
    }
    // a few longer darker strands for depth
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(15,8,4,${0.10 + rand() * 0.12})`;
      ctx.fillRect(rand() * size, 0, 1, size);
    }
  };
  return {
    map: canvasTexture(256, draw('#f7f2ec', 0.16), { srgb: true, repeat: [2, 1] }),
    bump: canvasTexture(256, draw('#808080', 0.85), { repeat: [2, 1] }),
  };
}

/** Oak floor planks with grain streaks. This one carries real color
 *  (used with a white material color). */
export function woodFloorTexture(): THREE.Texture {
  return canvasTexture(
    512,
    (ctx, size) => {
      const rand = rng(41);
      const plankH = size / 4;
      for (let p = 0; p < 4; p++) {
        const tone = 0.9 + rand() * 0.2;
        const r = Math.round(178 * tone);
        const g = Math.round(138 * tone);
        const b = Math.round(98 * tone);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(0, p * plankH, size, plankH);
        // grain: long wavy streaks
        for (let i = 0; i < 46; i++) {
          const y0 = p * plankH + rand() * plankH;
          ctx.strokeStyle = `rgba(110,74,44,${0.05 + rand() * 0.13})`;
          ctx.lineWidth = 0.6 + rand() * 1.6;
          ctx.beginPath();
          ctx.moveTo(0, y0);
          for (let x = 0; x <= size; x += 32) {
            ctx.lineTo(x, y0 + Math.sin(x * 0.02 + i) * 2.2 + (rand() - 0.5) * 2);
          }
          ctx.stroke();
        }
        // plank seams + a butt joint per plank
        ctx.fillStyle = 'rgba(70,45,26,0.55)';
        ctx.fillRect(0, p * plankH, size, 2);
        const joint = rand() * size;
        ctx.fillRect(joint, p * plankH, 2, plankH);
      }
    },
    { srgb: true, repeat: [2.5, 2.5] },
  );
}

/** Warm plaster wall: near-flat with fine noise. */
export function plasterTexture(): THREE.Texture {
  return canvasTexture(
    256,
    (ctx, size) => {
      ctx.fillStyle = '#efe7db';
      ctx.fillRect(0, 0, size, size);
      const rand = rng(53);
      speckle(ctx, size, 1500, rand, (a) => `rgba(190,175,155,${a * 0.6})`, 0.5, 2.2);
      speckle(ctx, size, 900, rand, (a) => `rgba(255,252,246,${a})`, 0.5, 2);
    },
    { srgb: true, repeat: [3, 1.5] },
  );
}

/** Pebbled leather for the bag: cellular bumps. */
export function leatherTextures(): MapBump {
  const drawBump = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.fillStyle = '#6f6f6f';
    ctx.fillRect(0, 0, size, size);
    const rand = rng(67);
    for (let i = 0; i < 2400; i++) {
      const r = 2 + rand() * 4;
      const x = rand() * size;
      const y = rand() * size;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, 'rgba(255,255,255,0.5)');
      grad.addColorStop(0.75, 'rgba(128,128,128,0.12)');
      grad.addColorStop(1, 'rgba(0,0,0,0.4)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  const drawMap = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.fillStyle = '#f5efe8';
    ctx.fillRect(0, 0, size, size);
    const rand = rng(71);
    speckle(ctx, size, 700, rand, (a) => `rgba(120,90,60,${a * 0.55})`, 0.6, 2.4);
  };
  return {
    map: canvasTexture(256, drawMap, { srgb: true, repeat: [2, 2] }),
    bump: canvasTexture(256, drawBump, { repeat: [2, 2] }),
  };
}

/** Ribbed knit bump (beanie band, cuffs). */
export function ribbedBump(repeat: [number, number] = [10, 1]): THREE.Texture {
  return canvasTexture(
    128,
    (ctx, size) => {
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, size, size);
      for (let x = 0; x < size; x += 8) {
        ctx.fillStyle = '#b2b2b2';
        ctx.fillRect(x, 0, 3.4, size);
        ctx.fillStyle = '#4a4a4a';
        ctx.fillRect(x + 4.4, 0, 2.2, size);
      }
    },
    { repeat },
  );
}
