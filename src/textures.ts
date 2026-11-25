// Procedural textures, all generated on a 2D canvas at runtime —
// no image files, no downloads, so the license ledger stays clean
// (see docs/DESIGN.md). These carry the "real-ish" material quality:
// fabric weave, wood grain, plaster, pebbled leather. Color maps are
// kept near-neutral so the material color can tint them.

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

// ---- garment wrinkle and hem normals ----
// A garment's static detail that the weave bump cannot carry: worn-in
// wrinkles and the raised, turned hem along its open edges. Computed
// as a height field in plain arrays (no canvas, so it also runs under
// node) and stored as a tangent-space normal map, one texel per
// GARMENT_NORMAL_TEXEL_M of cloth.

/** Edge length of a garment normal map (px). Every wardrobe item has
 *  its own and all are uploaded at warm-up, so this stays small. */
export const GARMENT_NORMAL_SIZE = 256;
/** Cloth covered by one texel: the garments' UVs run about 1.5 m per
 *  unit. */
export const GARMENT_NORMAL_TEXEL_M = 1.5 / GARMENT_NORMAL_SIZE;
const WRINKLE_COUNT = 70;
const WRINKLE_HEIGHT_M = 0.005;
const HEM_HEIGHT_M = 0.003;
const HEM_HALF_WIDTH_PX = 2.2;

/** RGBA tangent-space normals (OpenGL convention, row 0 at v = 0)
 *  for one garment. `hemEdges` are its open edges in UV space, four
 *  numbers (u0, v0, u1, v1) per edge; UVs outside 0..1 wrap. The map
 *  tiles, and the same seed always gives the same map. */
export function garmentNormalData(hemEdges: ArrayLike<number>, seed: number, size = GARMENT_NORMAL_SIZE): Uint8Array<ArrayBuffer> {
  const h = new Float32Array(size * size);
  const wrap = (i: number) => ((i % size) + size) % size;
  const rand = rng(seed);
  // Wrinkles: long, narrow ridges and valleys in loose clusters, so
  // some areas stay smooth.
  let cx = 0;
  let cy = 0;
  for (let n = 0; n < WRINKLE_COUNT; n++) {
    if (n % 5 === 0) {
      cx = rand() * size;
      cy = rand() * size;
    }
    const x0i = Math.round(cx + (rand() - 0.5) * size * 0.22);
    const y0i = Math.round(cy + (rand() - 0.5) * size * 0.22);
    const angle = rand() * Math.PI;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    const half = 8 + rand() * 16;
    const width = 1.6 + rand() * 1.8;
    const amp = WRINKLE_HEIGHT_M * (0.4 + rand() * 0.6) * (rand() < 0.5 ? -1 : 1);
    const invHalf = 1 / half;
    const invTwoW2 = 1 / (2 * width * width);
    const acrossMax = width * 4;
    const reachX = Math.ceil(half * Math.abs(dx) + acrossMax * Math.abs(dy));
    const reachY = Math.ceil(half * Math.abs(dy) + acrossMax * Math.abs(dx));
    for (let j = -reachY; j <= reachY; j++) {
      const jdy = j * dy;
      const jdx = j * dx;
      const row = wrap(y0i + j) * size;
      for (let i = -reachX; i <= reachX; i++) {
        const along = i * dx + jdy;
        const a = Math.abs(along) * invHalf;
        if (a >= 1) continue;
        const across = jdx - i * dy;
        if (Math.abs(across) > acrossMax) continue;
        const t = 1 - a * a;
        h[row + wrap(x0i + i)] += amp * t * t * Math.exp(-(across * across) * invTwoW2);
      }
    }
  }
  // Hems: a rounded ridge along every open edge.
  const hem = new Float32Array(size * size);
  const r = HEM_HALF_WIDTH_PX;
  const invR2 = 1 / (r * r);
  for (let e = 0; e + 3 < hemEdges.length; e += 4) {
    const ax = hemEdges[e] * size;
    const ay = hemEdges[e + 1] * size;
    const bx = hemEdges[e + 2] * size;
    const by = hemEdges[e + 3] * size;
    const ex = bx - ax;
    const ey = by - ay;
    const invLen2 = 1 / (ex * ex + ey * ey || 1);
    const yMin = Math.floor(Math.min(ay, by) - r);
    const yMax = Math.ceil(Math.max(ay, by) + r);
    const xMin = Math.floor(Math.min(ax, bx) - r);
    const xMax = Math.ceil(Math.max(ax, bx) + r);
    for (let y = yMin; y <= yMax; y++) {
      const py = y - ay;
      const row = wrap(y) * size;
      for (let x = xMin; x <= xMax; x++) {
        const px = x - ax;
        const rawT = (px * ex + py * ey) * invLen2;
        const t = rawT < 0 ? 0 : rawT > 1 ? 1 : rawT;
        const ox = px - t * ex;
        const oy = py - t * ey;
        const d2 = (ox * ox + oy * oy) * invR2;
        if (d2 >= 1) continue;
        const k = row + wrap(x);
        const v = HEM_HEIGHT_M * (1 - d2);
        if (v > hem[k]) hem[k] = v;
      }
    }
  }
  for (let k = 0; k < h.length; k++) h[k] += hem[k];
  const invTwoTexel = 1 / (2 * GARMENT_NORMAL_TEXEL_M * (GARMENT_NORMAL_SIZE / size));
  const out = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    const row = y * size;
    const rowUp = (y === 0 ? size - 1 : y - 1) * size;
    const rowDn = (y === size - 1 ? 0 : y + 1) * size;
    for (let x = 0; x < size; x++) {
      const xL = x === 0 ? size - 1 : x - 1;
      const xR = x === size - 1 ? 0 : x + 1;
      const nx = -(h[row + xR] - h[row + xL]) * invTwoTexel;
      const ny = -(h[rowDn + x] - h[rowUp + x]) * invTwoTexel;
      const inv = 1 / Math.sqrt(nx * nx + ny * ny + 1);
      const o = (row + x) * 4;
      out[o] = Math.round((nx * inv * 0.5 + 0.5) * 255);
      out[o + 1] = Math.round((ny * inv * 0.5 + 0.5) * 255);
      out[o + 2] = Math.round((inv * 0.5 + 0.5) * 255);
      out[o + 3] = 255;
    }
  }
  return out;
}

/** garmentNormalData as a repeating, mipmapped texture. */
export function garmentNormalTexture(hemEdges: ArrayLike<number>, seed: number): THREE.DataTexture {
  const tex = new THREE.DataTexture(garmentNormalData(hemEdges, seed), GARMENT_NORMAL_SIZE, GARMENT_NORMAL_SIZE, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

/** Resolution of the procedural contact/blob shadow texture. */
export const BLOB_SHADOW_SIZE = 128;

/** Radial RGBA contact-shadow map (backlog #18): warm charcoal at the
 *  center with a smooth Gaussian-like falloff that reaches zero well
 *  before the quad boundary so no hard square edge ever shows. */
export function blobShadowData(size = BLOB_SHADOW_SIZE): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(size * size * 4);
  const half = (size - 1) / 2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - half) / half;
      const dy = (y - half) / half;
      const r = Math.hypot(dx, dy);
      let alpha = 0;
      if (r < 1) {
        const t = Math.max(0, Math.min(1, (1 - r) / 0.35));
        const edge = t * t * (3 - 2 * t);
        alpha = Math.exp(-3.2 * r * r) * edge;
      }
      const o = (y * size + x) * 4;
      out[o] = 32;
      out[o + 1] = 26;
      out[o + 2] = 20;
      out[o + 3] = Math.round(alpha * 255);
    }
  }
  return out;
}

/** Clamped, mipmapped contact-shadow texture built from blobShadowData. */
export function blobShadowTexture(): THREE.DataTexture {
  const tex = new THREE.DataTexture(blobShadowData(), BLOB_SHADOW_SIZE, BLOB_SHADOW_SIZE, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}
