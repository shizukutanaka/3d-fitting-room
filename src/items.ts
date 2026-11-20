// Dress-up items, all procedurally built — no external models or
// image textures, so the license story stays trivially clean (see
// docs/DESIGN.md ledger). Rebuilt at realistic scale alongside the
// avatar: lathe-sewn tops that follow the torso profile, thin metal
// glasses, a chain that drapes along the chest curve. Each builder
// returns a Group positioned for its anchor on the avatar rig.

import * as THREE from 'three';
import { latheFromProfile, type AvatarRig } from './avatar';
import { bodyRadiusFactor, legGirthFactor, type CharacterParams } from './character';
import { fabricTextures, leatherTextures, ribbedBump } from './textures';
import { isDress } from './outfit';
import type {
  AccessoryId,
  BottomStyle,
  GlassesId,
  HatId,
  OuterStyle,
  Outfit,
  ShoeStyle,
  TopStyle,
} from './outfit';

function mesh(geo: THREE.BufferGeometry, material: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

function fabricMat(color: string, roughness = 0.85): THREE.MeshStandardMaterial {
  const tex = fabricTextures([2, 2]);
  return new THREE.MeshStandardMaterial({
    color,
    map: tex.map,
    bumpMap: tex.bump,
    bumpScale: 0.35,
    roughness,
    envMapIntensity: 0.4,
  });
}

// ---------- tops (anchor: torso center, y=1.12 in root space) ----------
// Profiles mirror the base torso's silhouette, offset ~11 mm out.
// Auto-fit: every profile radius passes through the same
// bodyRadiusFactor() the body itself uses (character.ts), at the
// point's absolute height — so when the wearer's waist, bust, hip
// or build changes, the garment is re-sewn around the new body
// instead of clipping into it or floating off it. At the default
// body the factor is 1 and the original profiles come out
// unchanged. The ~11 mm offset scales with the factor too, which
// is how real ease behaves (bigger body, slightly more ease).

const TORSO_ANCHOR_Y = 1.12;
const WAIST_ANCHOR_Y = 0.95;

function shapeTop(profile: Array<[number, number]>, c: CharacterParams): Array<[number, number]> {
  return profile.map(([r, y]): [number, number] => [r * bodyRadiusFactor(y + TORSO_ANCHOR_Y, c), y]);
}

function shapeBottom(profile: Array<[number, number]>, c: CharacterParams): Array<[number, number]> {
  return profile.map(([r, y]): [number, number] => [r * bodyRadiusFactor(y + WAIST_ANCHOR_Y, c), y]);
}

function buildTop(style: TopStyle, cloth: THREE.Material, c: CharacterParams): THREE.Group {
  const g = new THREE.Group();
  if (style === 'tee') {
    const top = latheFromProfile(
      shapeTop(
        [
          [0.149, -0.275],
          [0.156, -0.24],
          [0.151, -0.18],
          [0.131, -0.1],
          [0.132, -0.04],
          [0.157, 0.05],
          [0.152, 0.13],
          [0.128, 0.215],
          [0.086, 0.27],
          [0.06, 0.295],
        ],
        c,
      ),
      cloth,
    );
    top.scale.set(1, 1, 0.8);
    g.add(top);
  } else if (style === 'hoodie') {
    const top = latheFromProfile(
      shapeTop(
        [
          [0.165, -0.28],
          [0.168, -0.2],
          [0.15, -0.1],
          [0.152, -0.03],
          [0.172, 0.05],
          [0.166, 0.13],
          [0.14, 0.215],
          [0.092, 0.27],
          [0.064, 0.295],
        ],
        c,
      ),
      cloth,
    );
    top.scale.set(1, 1, 0.8);
    g.add(top);
    const hood = mesh(new THREE.TorusGeometry(0.082, 0.03, 12, 24), cloth, 0, 0.26, -0.05);
    hood.rotation.x = 1.25;
    hood.scale.set(1, 1, 0.8);
    g.add(hood);
    // The pocket rides on the belly: push it out with the body's
    // radius factor at its height so a larger build does not
    // swallow it.
    const pocket = mesh(new THREE.BoxGeometry(0.17, 0.095, 0.028), cloth, 0, -0.155, 0.125);
    pocket.position.z = 0.125 * bodyRadiusFactor(0.965, c);
    g.add(pocket);
    const stringMat = new THREE.MeshStandardMaterial({ color: '#e8e2d6', roughness: 0.8 });
    for (const side of [-1, 1]) {
      g.add(mesh(new THREE.CylinderGeometry(0.0035, 0.0035, 0.055, 8), stringMat, side * 0.018, 0.185, 0.098));
    }
  } else if (style === 'blouse') {
    // blouse: a fitted top — the tee's silhouette drawn in at
    // the waist, with a small collar ring at the neck.
    const top = latheFromProfile(
      shapeTop(
        [
          [0.146, -0.275],
          [0.152, -0.24],
          [0.146, -0.18],
          [0.126, -0.1],
          [0.128, -0.04],
          [0.155, 0.05],
          [0.15, 0.13],
          [0.126, 0.215],
          [0.084, 0.27],
          [0.058, 0.295],
        ],
        c,
      ),
      cloth,
    );
    top.scale.set(1, 1, 0.8);
    g.add(top);
    const collarF = bodyRadiusFactor(1.385, c);
    const collar = mesh(new THREE.TorusGeometry(0.062, 0.009, 10, 36), cloth, 0, 0.272, 0);
    collar.rotation.x = Math.PI / 2;
    collar.scale.set(collarF, 0.8 * collarF, collarF);
    g.add(collar);
  } else {
    // dresses: fitted bodice flowing into a flared skirt in one
    // lathe. 'dress' hems at the knee; 'dressLong' continues the
    // same flare to the ankle.
    const long = style === 'dressLong';
    const dress = latheFromProfile(
      shapeTop(
        [
          [0.06, 0.295],
          [0.086, 0.27],
          [0.128, 0.215],
          [0.152, 0.13],
          [0.157, 0.05],
          [0.132, -0.04],
          [0.13, -0.115],
          [0.148, -0.2],
          [0.18, -0.36],
          ...(long
            ? ([
                [0.205, -0.52],
                [0.232, -0.72],
                [0.258, -0.9],
                [0.272, -1.02],
              ] as Array<[number, number]>)
            : ([
                [0.218, -0.52],
                [0.248, -0.66],
              ] as Array<[number, number]>)),
        ],
        c,
      ),
      cloth,
    );
    dress.scale.set(1, 1, 0.8);
    g.add(dress);
    const satin = new THREE.MeshStandardMaterial({
      color: '#f2ead9',
      roughness: 0.35,
      envMapIntensity: 0.8,
    });
    // The waist band follows the shaped waist at its height.
    const bandF = bodyRadiusFactor(1.005, c);
    const band = mesh(new THREE.TorusGeometry(0.13, 0.011, 10, 40), satin, 0, -0.115, 0);
    band.rotation.x = Math.PI / 2;
    band.scale.set(bandF, 0.8 * bandF, bandF);
    g.add(band);
  }
  return g;
}

// ---------- outerwear (anchor: torso center, layered over the top) ----------
// The re-centering's new category (DESIGN.md §21): a fitting room
// is where you layer. Each style is a shell lathe sewn ~2 cm
// outside the top beneath it, run through the same shapeTop()
// auto-fit, so a changed body re-fits the layer exactly like the
// top. The profiles are checked against what they must clear:
// the hoodie is the bulkiest top (r 0.172), the dress flares to
// r 0.272 at its long hem and the skirt to r 0.232 — the coat's
// lower flare is drawn outside all of them, so outerwear
// composes with every top and bottom instead of suppressing
// them. A front placket strip and a collar carry the "worn"
// read; the shell is closed, in the same visual language as the
// sleeveless tops.

function buildOuter(style: OuterStyle, color: string, c: CharacterParams): THREE.Group | null {
  if (style === 'none') return null;
  const g = new THREE.Group();
  const knit = style === 'cardigan';
  const cloth = fabricMat(color, style === 'coat' ? 0.92 : 0.85);
  if (knit) {
    // The cardigan is a knit: the beanie's ribbed bump, reused.
    cloth.bumpMap = ribbedBump([16, 1]);
    cloth.bumpScale = 0.5;
  }
  // Profiles run bottom -> top (ascending y), like the tops and
  // skirts: LatheGeometry's faces point outward only in that
  // order. (The dress profile is the one historical exception —
  // it runs top -> bottom and only reads correctly because the
  // torso lathe beneath it shares the inversion. Outerwear
  // layers over correctly-wound tops, so it cannot rely on that
  // accident; the first draft of these profiles ran top -> down
  // and the shells rendered inside-out, the top showing through
  // the front. Pinned by a standalone lathe repro, DESIGN §21.4.)
  const profiles: Record<Exclude<OuterStyle, 'none'>, Array<[number, number]>> = {
    jacket: [
      [0.18, -0.3],
      [0.17, -0.22],
      [0.156, -0.12],
      [0.16, -0.04],
      [0.184, 0.05],
      [0.178, 0.13],
      [0.15, 0.215],
      [0.108, 0.27],
      [0.078, 0.295],
    ],
    coat: [
      [0.258, -0.62],
      [0.238, -0.52],
      [0.208, -0.42],
      [0.185, -0.32],
      [0.175, -0.22],
      [0.158, -0.12],
      [0.16, -0.04],
      [0.185, 0.05],
      [0.178, 0.13],
      [0.15, 0.215],
      [0.108, 0.27],
      [0.078, 0.295],
    ],
    cardigan: [
      [0.19, -0.35],
      [0.176, -0.3],
      [0.165, -0.22],
      [0.15, -0.12],
      [0.152, -0.04],
      [0.176, 0.05],
      [0.17, 0.13],
      [0.144, 0.215],
      [0.1, 0.27],
      [0.07, 0.295],
    ],
  };
  const shaped = shapeTop(profiles[style], c);
  const shell = latheFromProfile(shaped, cloth);
  shell.scale.set(1, 1, 0.8);
  g.add(shell);
  if (!knit) {
    // collar: a standing ring at the neck, following the body's
    // radius factor at its height like the blouse collar.
    const collarF = bodyRadiusFactor(1.385, c);
    const collar = mesh(new THREE.TorusGeometry(0.07, 0.014, 10, 36), cloth, 0, 0.268, 0);
    collar.rotation.x = Math.PI / 2;
    collar.scale.set(collarF, 0.8 * collarF, collarF);
    g.add(collar);
  }
  // placket: a thin strip down the front. Its z is read off the
  // shaped profile at its mid height (front surface = r × the
  // shell's 0.8 z-scale, plus the strip's own half-depth), so it
  // lies on the shell at any body shape instead of floating or
  // sinking. Its length follows the shell.
  const bottomY = style === 'coat' ? -0.55 : -0.28;
  const midY = (0.18 + bottomY) / 2;
  let rAtMid = shaped[0][0];
  for (let i = 0; i + 1 < shaped.length; i++) {
    const [r0, y0] = shaped[i];
    const [r1, y1] = shaped[i + 1];
    if ((midY - y0) * (midY - y1) <= 0) {
      rAtMid = r0 + ((r1 - r0) * (midY - y0)) / (y1 - y0 || 1);
      break;
    }
    rAtMid = r1;
  }
  const placket = mesh(
    new THREE.BoxGeometry(0.02, 0.18 - bottomY, 0.006),
    cloth,
    0,
    midY,
    rAtMid * 0.8 + 0.002,
  );
  g.add(placket);
  if (style === 'coat') {
    // a belt at the waist, like the dress band
    const beltF = bodyRadiusFactor(1.005, c);
    const belt = mesh(new THREE.TorusGeometry(0.163, 0.012, 10, 40), cloth, 0, -0.115, 0);
    belt.rotation.x = Math.PI / 2;
    belt.scale.set(beltF, 0.8 * beltF, beltF);
    g.add(belt);
  }
  return g;
}

// ---------- bottoms (anchor: waist, y=0.95 in frame space) ----------
// Profiles hang down from the waist anchor and are offset from the
// pelvis / leg profiles the same way tops are offset from the
// torso (~11 mm), so they follow height and frame scaling with the
// body. All styles are plain contemporary garments — no cultural
// or religious dress, no brand marks (LEGAL-ETHICS G5: J-03/J-09),
// and the base layer underneath is never touched (J-10). Nothing
// here evokes a school uniform or a minor (J-11).

/** The hip block shared by pants and shorts: a lathe that wraps
 *  the pelvis and the tops of the thighs, ending where the leg
 *  tubes take over. Profiles here are ordered bottom -> top, like
 *  the body's own lathes (avatar.ts): latheFromProfile's winding
 *  faces outward only in that order for FrontSide materials.
 *  Shaped by shapeBottom() like the tops, so the block re-wraps a
 *  changed pelvis instead of clipping it. */
function hipBlock(cloth: THREE.Material, c: CharacterParams): THREE.Mesh {
  const hip = latheFromProfile(
    shapeBottom(
      [
        [0.168, -0.2],
        [0.18, -0.16],
        [0.186, -0.11],
        [0.184, -0.06],
        [0.172, -0.01],
        [0.15, 0.045],
      ],
      c,
    ),
    cloth,
  );
  hip.scale.set(1, 1, 0.8);
  return hip;
}

function legTube(
  profile: Array<[number, number]>,
  cloth: THREE.Material,
  side: number,
  girthF: number,
): THREE.Mesh {
  const leg = latheFromProfile(
    profile.map(([r, y]): [number, number] => [r * girthF, y]),
    cloth,
  );
  leg.position.x = side * 0.096;
  leg.scale.set(1, 1, 0.92);
  return leg;
}

function buildBottom(style: BottomStyle, cloth: THREE.Material, c: CharacterParams): THREE.Group | null {
  const g = new THREE.Group();
  switch (style) {
    case 'none':
      return null;
    case 'skirt': {
      const skirt = latheFromProfile(
        shapeBottom(
          [
            [0.232, -0.43],
            [0.216, -0.33],
            [0.196, -0.22],
            [0.182, -0.13],
            [0.176, -0.065],
            [0.166, -0.03],
            [0.147, 0.03],
          ],
          c,
        ),
        cloth,
      );
      skirt.scale.set(1, 1, 0.8);
      g.add(skirt);
      return g;
    }
    case 'skirtLong': {
      // the same flare continued to mid-shin
      const skirt = latheFromProfile(
        shapeBottom(
          [
            [0.262, -0.78],
            [0.246, -0.62],
            [0.226, -0.45],
            [0.202, -0.28],
            [0.186, -0.13],
            [0.176, -0.065],
            [0.166, -0.03],
            [0.147, 0.03],
          ],
          c,
        ),
        cloth,
      );
      skirt.scale.set(1, 1, 0.8);
      g.add(skirt);
      return g;
    }
    case 'pants': {
      g.add(hipBlock(cloth, c));
      // Radii clear the thigh capsule (r 0.067, its cylinder part
      // reaching down to abs 0.52) by a trouser-like margin; the
      // first build hugged the knee line and the capsule's lower
      // dome punched through — measured in the outfit evidence.
      const legProfile: Array<[number, number]> = [
        [0.049, -0.905],
        [0.048, -0.85],
        [0.052, -0.73],
        [0.056, -0.6],
        [0.058, -0.55],
        [0.068, -0.488],
        [0.078, -0.45],
        [0.082, -0.4],
        [0.084, -0.28],
        [0.086, -0.17],
        [0.088, -0.11],
      ];
      for (const side of [-1, 1]) g.add(legTube(legProfile, cloth, side, legGirthFactor(c)));
      return g;
    }
    case 'shorts': {
      g.add(hipBlock(cloth, c));
      const legProfile: Array<[number, number]> = [
        [0.083, -0.3],
        [0.084, -0.24],
        [0.087, -0.17],
        [0.089, -0.11],
      ];
      for (const side of [-1, 1]) g.add(legTube(legProfile, cloth, side, legGirthFactor(c)));
      return g;
    }
  }
}

// ---------- shoes (anchor: frame origin; feet at x=±0.096) ----------
// The avatar has no bare-foot geometry: the legs end at the ankle
// and footwear completes the foot. 'flats' is the design the
// avatar originally shipped with, rebuilt here so the outfit owns
// it. Every style stays inside the original footprint, so no
// style lifts or shifts the planted foot.

function shoeMaterial(color: string, roughness: number, envMapIntensity = 0.9): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness, envMapIntensity });
}

function buildShoes(style: ShoeStyle, color: string): THREE.Group {
  const g = new THREE.Group();
  for (const side of [-1, 1]) {
    const x = side * 0.096;
    const foot = new THREE.Group();
    foot.position.set(x, 0, 0.012);
    g.add(foot);
    if (style === 'flats' || style === 'boots') {
      const mat = shoeMaterial(color, style === 'boots' ? 0.5 : 0.32);
      if (style === 'boots') {
        const tex = leatherTextures();
        mat.map = tex.map;
        mat.bumpMap = tex.bump;
        mat.bumpScale = 0.4;
      }
      foot.add(mesh(new THREE.BoxGeometry(0.072, 0.016, 0.235), mat, 0, 0.008, 0.028));
      const upper = mesh(new THREE.SphereGeometry(1, 20, 14), mat, 0, 0.026, 0.02);
      upper.scale.set(0.04, 0.027, 0.105);
      foot.add(upper);
      const toe = mesh(new THREE.SphereGeometry(1, 18, 12), mat, 0, 0.019, 0.112);
      toe.scale.set(0.037, 0.02, 0.045);
      foot.add(toe);
      foot.add(mesh(new THREE.BoxGeometry(0.054, 0.028, 0.034), mat, 0, 0.014, -0.07));
      if (style === 'boots') {
        // shaft around the shin (leg axis is at z=0, not the
        // foot group's z offset), plus a cuff ring at the top
        const shaft = mesh(new THREE.CylinderGeometry(0.058, 0.052, 0.3, 20), mat, x, 0.19, 0);
        g.add(shaft);
        const cuff = mesh(new THREE.CylinderGeometry(0.061, 0.06, 0.025, 20), mat, x, 0.345, 0);
        g.add(cuff);
      }
    } else if (style === 'sneakers') {
      const tex = fabricTextures([2, 2]);
      const upperMat = new THREE.MeshStandardMaterial({
        color,
        map: tex.map,
        bumpMap: tex.bump,
        bumpScale: 0.3,
        roughness: 0.85,
        envMapIntensity: 0.4,
      });
      const soleMat = shoeMaterial('#ece7db', 0.6, 0.5);
      foot.add(mesh(new THREE.BoxGeometry(0.078, 0.026, 0.245), soleMat, 0, 0.013, 0.028));
      const upper = mesh(new THREE.SphereGeometry(1, 20, 14), upperMat, 0, 0.036, 0.015);
      upper.scale.set(0.042, 0.032, 0.108);
      foot.add(upper);
      const toe = mesh(new THREE.SphereGeometry(1, 18, 12), upperMat, 0, 0.026, 0.105);
      toe.scale.set(0.039, 0.022, 0.05);
      foot.add(toe);
      foot.add(mesh(new THREE.BoxGeometry(0.06, 0.05, 0.03), upperMat, 0, 0.032, -0.085));
    } else {
      // pumps: a wedge silhouette — honest for a planted flat
      // foot, where a stiletto would float the heel in the air.
      const patent = shoeMaterial(color, 0.18, 1.2);
      const wedge = mesh(new THREE.BoxGeometry(0.07, 0.02, 0.23), patent, 0, 0.031, 0.02);
      // positive rotation.x tips the toe (+z) side down
      wedge.rotation.x = 0.18;
      foot.add(wedge);
      foot.add(mesh(new THREE.BoxGeometry(0.05, 0.05, 0.03), patent, 0, 0.025, -0.075));
      const toe = mesh(new THREE.SphereGeometry(1, 18, 12), patent, 0, 0.03, 0.07);
      toe.scale.set(0.038, 0.024, 0.07);
      foot.add(toe);
      const cup = mesh(new THREE.SphereGeometry(1, 18, 12), patent, 0, 0.045, -0.06);
      cup.scale.set(0.036, 0.03, 0.04);
      foot.add(cup);
    }
  }
  return g;
}

// ---------- hats (anchor: crown of the head) ----------
// The skull's center sits ~0.12 below the anchor; domes are centered
// there so they hug the head instead of perching on the crown point.

function buildHat(hat: HatId): THREE.Group | null {
  const g = new THREE.Group();
  switch (hat) {
    case 'none':
      return null;
    case 'cap': {
      const cloth = fabricMat('#a83c46', 0.8);
      const dome = mesh(
        new THREE.SphereGeometry(0.0875, 36, 20, 0, Math.PI * 2, 0, Math.PI * 0.52),
        cloth,
        0,
        -0.12,
        -0.002,
      );
      dome.scale.set(0.9, 0.82, 1.1);
      g.add(dome);
      const brim = mesh(new THREE.SphereGeometry(1, 24, 12), cloth, 0, -0.106, 0.08);
      brim.scale.set(0.052, 0.008, 0.048);
      g.add(brim);
      g.add(mesh(new THREE.SphereGeometry(0.008, 12, 8), cloth, 0, -0.046, -0.002));
      return g;
    }
    case 'beanie': {
      const knit = fabricMat('#7d9b8a', 0.95);
      knit.bumpMap = ribbedBump([16, 1]);
      knit.bumpScale = 0.5;
      const dome = mesh(
        new THREE.SphereGeometry(0.0885, 36, 22, 0, Math.PI * 2, 0, Math.PI * 0.55),
        knit,
        0,
        -0.114,
        -0.002,
      );
      dome.scale.set(0.9, 0.85, 1.1);
      g.add(dome);
      const bandMat = fabricMat('#6d8a7a', 0.95);
      bandMat.bumpMap = ribbedBump([22, 1]);
      bandMat.bumpScale = 0.7;
      const band = mesh(
        new THREE.CylinderGeometry(0.0895, 0.0905, 0.036, 36, 1, true),
        bandMat,
        0,
        -0.15,
        -0.002,
      );
      band.scale.set(0.9, 1, 1.1);
      g.add(band);
      g.add(mesh(new THREE.SphereGeometry(0.024, 14, 10), fabricMat('#f0ebe2', 0.95), 0, -0.028, -0.002));
      return g;
    }
    case 'catears': {
      const band = mesh(
        new THREE.TorusGeometry(0.082, 0.0038, 8, 32, Math.PI),
        new THREE.MeshStandardMaterial({ color: '#26262b', roughness: 0.4, metalness: 0.3 }),
        0,
        -0.122,
        0,
      );
      band.scale.set(0.9, 1, 1.08);
      band.rotation.x = 0.08;
      g.add(band);
      const fur = fabricMat('#5a4232', 0.95);
      const inner = new THREE.MeshStandardMaterial({ color: '#d98a9e', roughness: 0.9 });
      for (const side of [-1, 1]) {
        const ear = mesh(new THREE.ConeGeometry(0.021, 0.048, 16), fur, side * 0.052, -0.028, 0);
        ear.rotation.z = -side * 0.28;
        g.add(ear);
        const core = mesh(new THREE.ConeGeometry(0.011, 0.026, 12), inner, side * 0.05, -0.034, 0.009);
        core.rotation.z = -side * 0.28;
        g.add(core);
      }
      return g;
    }
    case 'ribbon': {
      const satin = new THREE.MeshStandardMaterial({
        color: '#b03050',
        roughness: 0.35,
        envMapIntensity: 0.8,
      });
      const grp = new THREE.Group();
      grp.position.set(0.048, -0.052, 0.028);
      for (const side of [-1, 1]) {
        const wing = mesh(new THREE.ConeGeometry(0.027, 0.052, 18), satin, side * 0.028, 0.004, 0);
        wing.rotation.z = side * 1.15;
        wing.scale.set(1, 1, 0.45);
        grp.add(wing);
      }
      const knot = mesh(new THREE.SphereGeometry(0.0105, 12, 10), satin, 0, 0.002, 0);
      knot.scale.set(1, 1, 0.7);
      grp.add(knot);
      g.add(grp);
      return g;
    }
  }
}

// ---------- glasses (anchor: eye line, front of face) ----------

const frameMat = new THREE.MeshStandardMaterial({
  color: '#26262b',
  roughness: 0.35,
  metalness: 0.85,
  envMapIntensity: 1.1,
});
const lensMat = new THREE.MeshStandardMaterial({
  color: '#d7e6ea',
  roughness: 0.05,
  metalness: 0,
  transparent: true,
  opacity: 0.16,
  envMapIntensity: 1.4,
  depthWrite: false,
});

function temples(mat: THREE.Material, thick = 0.0016): THREE.Group {
  const g = new THREE.Group();
  for (const side of [-1, 1]) {
    g.add(mesh(new THREE.BoxGeometry(thick, thick, 0.102), mat, side * 0.0555, 0.004, -0.047));
  }
  return g;
}

function buildGlasses(id: GlassesId): THREE.Group | null {
  const g = new THREE.Group();
  switch (id) {
    case 'none':
      return null;
    case 'round': {
      for (const side of [-1, 1]) {
        g.add(mesh(new THREE.TorusGeometry(0.0215, 0.0016, 8, 28), frameMat, side * 0.034, 0, 0.002));
        const lens = mesh(new THREE.CircleGeometry(0.02, 28), lensMat, side * 0.034, 0, 0.0015);
        lens.castShadow = false;
        g.add(lens);
      }
      g.add(mesh(new THREE.BoxGeometry(0.017, 0.002, 0.002), frameMat, 0, 0.004, 0.002));
      g.add(temples(frameMat));
      return g;
    }
    case 'square': {
      for (const side of [-1, 1]) {
        const cx = side * 0.034;
        g.add(mesh(new THREE.BoxGeometry(0.047, 0.0022, 0.0022), frameMat, cx, 0.018, 0.002));
        g.add(mesh(new THREE.BoxGeometry(0.047, 0.0022, 0.0022), frameMat, cx, -0.018, 0.002));
        g.add(mesh(new THREE.BoxGeometry(0.0022, 0.038, 0.0022), frameMat, cx - 0.0225, 0, 0.002));
        g.add(mesh(new THREE.BoxGeometry(0.0022, 0.038, 0.0022), frameMat, cx + 0.0225, 0, 0.002));
        const lens = mesh(new THREE.PlaneGeometry(0.043, 0.034), lensMat, cx, 0, 0.0015);
        lens.castShadow = false;
        g.add(lens);
      }
      g.add(mesh(new THREE.BoxGeometry(0.017, 0.002, 0.002), frameMat, 0, 0.006, 0.002));
      g.add(temples(frameMat));
      return g;
    }
    case 'sunglasses': {
      const dark = new THREE.MeshStandardMaterial({
        color: '#101014',
        roughness: 0.08,
        metalness: 0.1,
        transparent: true,
        opacity: 0.94,
        envMapIntensity: 1.5,
      });
      for (const side of [-1, 1]) {
        const lens = mesh(new THREE.SphereGeometry(1, 24, 16), dark, side * 0.034, -0.002, 0.002);
        lens.scale.set(0.0255, 0.0185, 0.0055);
        g.add(lens);
      }
      g.add(mesh(new THREE.BoxGeometry(0.118, 0.004, 0.003), frameMat, 0, 0.016, 0.002));
      g.add(temples(frameMat, 0.003));
      return g;
    }
  }
}

// ---------- accessories (neck anchor or bag anchor) ----------

const goldMat = new THREE.MeshStandardMaterial({
  color: '#d8b25c',
  roughness: 0.27,
  metalness: 1,
  envMapIntensity: 1.3,
});

function buildAccessory(
  id: AccessoryId,
  c: CharacterParams,
): { group: THREE.Group; anchor: 'neck' | 'bag' } | null {
  const g = new THREE.Group();
  switch (id) {
    case 'none':
      return null;
    case 'necklace': {
      // The chain is a tube along a curve fitted to the chest's
      // surface (computed from the torso profile) — a tilted torus
      // either floats off the bust or sinks into it. The whole
      // drape is pushed out (or pulled in) with the bust, so the
      // chain keeps lying on the chest when the body changes.
      g.scale.z = 1 + (c.bust - 1) * 0.55;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.042, 0.005, 0.012),
        new THREE.Vector3(-0.052, -0.045, 0.062),
        new THREE.Vector3(0, -0.118, 0.108),
        new THREE.Vector3(0.052, -0.045, 0.062),
        new THREE.Vector3(0.042, 0.005, 0.012),
      ]);
      g.add(mesh(new THREE.TubeGeometry(curve, 40, 0.0022, 8), goldMat, 0, 0, 0));
      const gem = mesh(
        new THREE.OctahedronGeometry(0.0095),
        new THREE.MeshStandardMaterial({
          color: '#e58bb1',
          roughness: 0.12,
          envMapIntensity: 1.5,
        }),
        0,
        -0.13,
        0.106,
      );
      g.add(gem);
      return { group: g, anchor: 'neck' };
    }
    case 'scarf': {
      const cloth = fabricMat('#a63d46', 0.95);
      const wrap = mesh(new THREE.TorusGeometry(0.056, 0.019, 12, 28), cloth, 0, 0.038, 0);
      wrap.rotation.x = Math.PI / 2;
      g.add(wrap);
      const tail = mesh(new THREE.BoxGeometry(0.042, 0.105, 0.011), cloth, 0.038, -0.052, 0.088);
      tail.rotation.x = 0.06;
      g.add(tail);
      return { group: g, anchor: 'neck' };
    }
    case 'bag': {
      const leatherTex = leatherTextures();
      const leather = new THREE.MeshStandardMaterial({
        color: '#7c4a2d',
        map: leatherTex.map,
        bumpMap: leatherTex.bump,
        bumpScale: 0.5,
        roughness: 0.55,
        envMapIntensity: 0.7,
      });
      g.add(mesh(new THREE.BoxGeometry(0.058, 0.165, 0.215), leather, 0.012, -0.145, 0));
      g.add(mesh(new THREE.BoxGeometry(0.06, 0.068, 0.218), leather, 0.012, -0.095, 0));
      g.add(mesh(new THREE.BoxGeometry(0.02, 0.014, 0.006), goldMat, 0.012, -0.128, 0.109));
      // crossbody strap up to the opposite shoulder
      const strap = mesh(new THREE.BoxGeometry(0.015, 0.583, 0.004), leather, -0.204, 0.148, -0.005);
      strap.rotation.z = 0.8;
      g.add(strap);
      return { group: g, anchor: 'bag' };
    }
  }
}

// ---------- applying an outfit ----------

function clearAnchor(anchor: THREE.Group): void {
  for (const child of [...anchor.children]) {
    anchor.remove(child);
    child.traverse((obj) => {
      if (obj instanceof THREE.Mesh) obj.geometry.dispose();
    });
  }
}

/** Swap the visible items on the rig to match the outfit. Pose is
 *  applied here too, so this is the single entry point the UI calls
 *  for any state change. */
export function applyOutfit(rig: AvatarRig, outfit: Outfit): void {
  rig.topMaterial.color.set(outfit.topColor);

  clearAnchor(rig.torsoAnchor);
  rig.torsoAnchor.add(buildTop(outfit.topStyle, rig.topMaterial, outfit.character));
  // Outerwear layers over the top on the same anchor (profiles
  // in buildOuter clear every top and flared bottom beneath).
  const outer = buildOuter(outfit.outerStyle, outfit.outerColor, outfit.character);
  if (outer) rig.torsoAnchor.add(outer);

  // A dress is a one-piece: it already covers waist to knee, so
  // bottoms are not rendered under it (the selection is kept in
  // the state and returns when the top changes). The base layer
  // itself is part of the body and is never removed (J-10).
  clearAnchor(rig.bottomAnchor);
  if (!isDress(outfit.topStyle) && outfit.bottomStyle !== 'none') {
    const bottom = buildBottom(outfit.bottomStyle, fabricMat(outfit.bottomColor), outfit.character);
    if (bottom) rig.bottomAnchor.add(bottom);
  }

  clearAnchor(rig.shoesAnchor);
  rig.shoesAnchor.add(buildShoes(outfit.shoeStyle, outfit.shoeColor));

  clearAnchor(rig.hatAnchor);
  const hat = buildHat(outfit.hat);
  if (hat) rig.hatAnchor.add(hat);

  clearAnchor(rig.glassesAnchor);
  const glasses = buildGlasses(outfit.glasses);
  if (glasses) rig.glassesAnchor.add(glasses);

  clearAnchor(rig.neckAnchor);
  clearAnchor(rig.bagAnchor);
  const acc = buildAccessory(outfit.accessory, outfit.character);
  if (acc) {
    (acc.anchor === 'neck' ? rig.neckAnchor : rig.bagAnchor).add(acc.group);
  }

  rig.applyPose(outfit.pose);
}
