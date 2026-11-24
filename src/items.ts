// Dress-up items. Garments (tops, outerwear, bottoms, shoes) are
// skinned meshes cut from the mannequin surface in the asset pipeline
// (avatar.ts / tools/avatar-pipeline/), so they follow pose and Body
// Scale Calibration. Small accessories (hats, glasses, necklace,
// scarf, bag) stay procedural and ride the rig's anchors.

import * as THREE from 'three';
import type { AccessoryFit, AvatarRig } from './avatar';
import { fabricTextures, leatherTextures, ribbedBump } from './textures';
import type {
  AccessoryId,
  GlassesId,
  HatId,
  Outfit,
} from './outfit';

function mesh(geo: THREE.BufferGeometry, material: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

// Cloth accessories share the garments' fabric model (avatar.ts
// FABRIC): a physical material whose sheen lobe gives the fuzzy
// rim light of cloth at grazing angles. Sheen strength and
// roughness are per fabric type; the sheen colour is the cloth's
// own colour lifted toward white, as on the garments.
export type AccessoryFabric = 'cotton' | 'knit' | 'fur' | 'wool' | 'satin';

export const ACCESSORY_FABRIC: Record<AccessoryFabric, { roughness: number; sheen: number; sheenRoughness: number }> = {
  cotton: { roughness: 0.8, sheen: 0.35, sheenRoughness: 0.8 },
  knit: { roughness: 0.95, sheen: 0.7, sheenRoughness: 0.9 },
  fur: { roughness: 0.95, sheen: 0.9, sheenRoughness: 0.95 },
  wool: { roughness: 0.95, sheen: 0.65, sheenRoughness: 0.85 },
  satin: { roughness: 0.35, sheen: 0.6, sheenRoughness: 0.3 },
};

function sheenTint(color: string): THREE.Color {
  return new THREE.Color(color).lerp(new THREE.Color('#ffffff'), 0.35);
}

function fabricMat(color: string, fabric: AccessoryFabric): THREE.MeshPhysicalMaterial {
  const tex = fabricTextures([2, 2]);
  const spec = ACCESSORY_FABRIC[fabric];
  return new THREE.MeshPhysicalMaterial({
    name: `fabric-${fabric}`,
    color,
    map: tex.map,
    bumpMap: tex.bump,
    bumpScale: 0.35,
    roughness: spec.roughness,
    metalness: 0,
    sheen: spec.sheen,
    sheenRoughness: spec.sheenRoughness,
    sheenColor: sheenTint(color),
    envMapIntensity: 0.4,
  });
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
      const cloth = fabricMat('#a83c46', 'cotton');
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
      const knit = fabricMat('#7d9b8a', 'knit');
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
      const bandMat = fabricMat('#6d8a7a', 'knit');
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
      g.add(mesh(new THREE.SphereGeometry(0.024, 14, 10), fabricMat('#f0ebe2', 'knit'), 0, -0.028, -0.002));
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
      const fur = fabricMat('#5a4232', 'fur');
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
      const satin = new THREE.MeshPhysicalMaterial({
        name: 'fabric-satin',
        color: '#b03050',
        roughness: ACCESSORY_FABRIC.satin.roughness,
        metalness: 0,
        sheen: ACCESSORY_FABRIC.satin.sheen,
        sheenRoughness: ACCESSORY_FABRIC.satin.sheenRoughness,
        sheenColor: sheenTint('#b03050'),
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
  fit: AccessoryFit | null,
): { group: THREE.Group; anchor: 'neck' | 'bag' } | null {
  const g = new THREE.Group();
  switch (id) {
    case 'none':
      return null;
    case 'necklace': {
      // The chain follows the chest's front surface over whatever is
      // worn, from inside the collar (hidden) down to a pendant.
      if (!fit) return null;
      const ny = fit.neckY;
      const { z: nz, rx } = fit.neck;
      const side = (sx: number, y: number) => onFront(fit, sx, y, 0.004);
      const pts = [
        new THREE.Vector3(-rx * 0.7, ny + 0.012, nz),
        side(-0.05, ny - 0.02),
        side(-0.04, ny - 0.06),
        side(0, ny - 0.088),
        side(0.04, ny - 0.06),
        side(0.05, ny - 0.02),
        new THREE.Vector3(rx * 0.7, ny + 0.012, nz),
      ].map((v) => fit.toNeck(v));
      g.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.0022, 8), goldMat, 0, 0, 0));
      const gemAt = fit.toNeck(onFront(fit, 0, ny - 0.1, 0.014));
      const gem = mesh(
        new THREE.OctahedronGeometry(0.0095),
        new THREE.MeshStandardMaterial({
          color: '#e58bb1',
          roughness: 0.12,
          envMapIntensity: 1.5,
        }),
        gemAt.x,
        gemAt.y,
        gemAt.z,
      );
      g.add(gem);
      return { group: g, anchor: 'neck' };
    }
    case 'scarf': {
      // A rolled wrap around the neck's own cross-section, with one
      // end lying on the chest over the clothes.
      if (!fit) return null;
      const cloth = fabricMat('#a63d46', 'wool');
      cloth.side = THREE.DoubleSide;
      const tube = 0.016;
      const { y, z, rx, rz } = fit.neck;
      const ring: THREE.Vector3[] = [];
      for (let i = 0; i < 24; i++) {
        const t = (i / 24) * Math.PI * 2;
        const ex = rx * 0.85 + tube * 0.8;
        const ez = rz * 0.9 + tube * 0.8;
        ring.push(fit.toNeck(new THREE.Vector3(Math.sin(t) * ex, y - 0.015 - Math.cos(t) * 0.008, z + Math.cos(t) * ez)));
      }
      g.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ring, true), 64, tube, 12, true), cloth, 0, 0, 0));
      const front = z + rz + tube;
      const top = onFront(fit, 0.03, y - 0.03, 0.012, 0.024);
      const tail = [new THREE.Vector3(0.03, y - 0.03, Math.max(front, top.z))];
      // Below the fullest point the end hangs rather than hugging the body.
      for (let k = 1; k <= 10; k++) {
        const p = onFront(fit, 0.03 + k * 0.001, y - 0.03 - k * 0.013, 0.015, 0.024);
        p.z = Math.max(p.z, tail[k - 1].z - 0.004);
        tail.push(p);
      }
      g.add(mesh(ribbon(tail.map((v) => fit.toNeck(v)), 0.044), cloth, 0, 0, 0));
      return { group: g, anchor: 'neck' };
    }
    case 'bag': {
      // A small crossbody bag at the front of the hip; the strap lies
      // over the worn clothes across the chest to the far shoulder.
      if (!fit) return null;
      const leatherTex = leatherTextures();
      const leather = new THREE.MeshStandardMaterial({
        color: '#7c4a2d',
        map: leatherTex.map,
        bumpMap: leatherTex.bump,
        bumpScale: 0.5,
        roughness: 0.55,
        envMapIntensity: 0.7,
        side: THREE.DoubleSide,
      });
      const bx = 0.13;
      const by = fit.hipsY - 0.07;
      const bz = Math.max(onFront(fit, bx - 0.06, by, 0).z, onFront(fit, bx + 0.06, by, 0).z, onFront(fit, bx, by, 0).z) + 0.031;
      const at = fit.toBag(new THREE.Vector3(bx, by, bz));
      g.add(mesh(new THREE.BoxGeometry(0.2, 0.15, 0.056), leather, at.x, at.y, at.z));
      g.add(mesh(new THREE.BoxGeometry(0.203, 0.062, 0.059), leather, at.x, at.y + 0.046, at.z));
      g.add(mesh(new THREE.BoxGeometry(0.02, 0.014, 0.006), goldMat, at.x, at.y + 0.018, at.z + 0.031));
      const sy = fit.shoulderTopY;
      const strap: THREE.Vector3[] = [new THREE.Vector3(bx + 0.07, by + 0.075, bz - 0.01)];
      const x0 = bx + 0.05;
      const x1 = -0.1;
      const y0 = by + 0.1;
      const y1 = sy - 0.03;
      for (let k = 0; k <= 16; k++) {
        const t = k / 16;
        strap.push(onFront(fit, x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, 0.008));
      }
      strap.push(new THREE.Vector3(x1 - 0.005, sy + 0.006, 0.01), new THREE.Vector3(x1 - 0.01, sy - 0.03, -0.07));
      g.add(mesh(ribbon(strap.map((v) => fit.toBag(v)), 0.016), leather, 0, 0, 0));
      return { group: g, anchor: 'bag' };
    }
  }
}

/** A point on the front surface of the body / worn clothes, `clear` in front of it. */
function onFront(fit: AccessoryFit, x: number, y: number, clear: number, d = 0.015): THREE.Vector3 {
  // The highest point nearby, so the smoothed strip cannot dip into
  // a bulge between samples.
  const z = Math.max(fit.frontZ(x, y), fit.frontZ(x - d, y), fit.frontZ(x + d, y), fit.frontZ(x, y - d), fit.frontZ(x, y + d));
  return new THREE.Vector3(x, y, z + clear);
}

/** A flat strip of the given width along a polyline (in the xy-plane sense: width runs across the path, facing +z). */
function ribbon(pts: THREE.Vector3[], width: number): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(pts);
  const n = pts.length * 6;
  const pos: number[] = [];
  const idx: number[] = [];
  const side = new THREE.Vector3();
  for (let i = 0; i <= n; i++) {
    const p = curve.getPointAt(i / n);
    const t = curve.getTangentAt(i / n);
    side.set(-t.y, t.x, 0).normalize().multiplyScalar(width / 2);
    pos.push(p.x - side.x, p.y - side.y, p.z, p.x + side.x, p.y + side.y, p.z);
    if (i < n) idx.push(2 * i, 2 * i + 1, 2 * i + 2, 2 * i + 1, 2 * i + 3, 2 * i + 2);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
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

function applyAccessory(rig: AvatarRig, outfit: Outfit): void {
  clearAnchor(rig.neckAnchor);
  clearAnchor(rig.bagAnchor);
  const acc = buildAccessory(outfit.accessory, rig.fit());
  if (acc) (acc.anchor === 'neck' ? rig.neckAnchor : rig.bagAnchor).add(acc.group);
}

/** Swap the visible items on the rig to match the outfit. Pose is
 *  applied here too, so this is the single entry point the UI calls
 *  for any state change. A dress is a one-piece, so bottoms are not
 *  shown under it (the selection is kept); the base layer is part of
 *  the mannequin and is never removed (J-10). */
export function applyOutfit(rig: AvatarRig, outfit: Outfit): void {
  rig.setGarments({
    top: outfit.topStyle,
    topColor: outfit.topColor,
    outer: outfit.outerStyle,
    outerColor: outfit.outerColor,
    bottom: outfit.bottomStyle,
    bottomColor: outfit.bottomColor,
    shoes: outfit.shoeStyle,
    shoeColor: outfit.shoeColor,
  });

  clearAnchor(rig.hatAnchor);
  const hat = buildHat(outfit.hat);
  if (hat) rig.hatAnchor.add(hat);

  clearAnchor(rig.glassesAnchor);
  const glasses = buildGlasses(outfit.glasses);
  if (glasses) rig.glassesAnchor.add(glasses);

  applyAccessory(rig, outfit);
  // The drape is fitted to the loaded figure: refit when it (re)loads.
  rig.onMount = () => applyAccessory(rig, outfit);

  rig.applyPose(outfit.pose);
}
