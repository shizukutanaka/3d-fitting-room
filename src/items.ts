// Dress-up items, all procedurally built — no external models or
// image textures, so the license story stays trivially clean (see
// docs/DESIGN.md ledger). Rebuilt at realistic scale alongside the
// avatar: lathe-sewn tops that follow the torso profile, thin metal
// glasses, a chain that drapes along the chest curve. Each builder
// returns a Group positioned for its anchor on the avatar rig.

import * as THREE from 'three';
import { latheFromProfile, type AvatarRig } from './avatar';
import { fabricTextures, leatherTextures, ribbedBump } from './textures';
import type { AccessoryId, GlassesId, HatId, Outfit, TopStyle } from './outfit';

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

function buildTop(style: TopStyle, cloth: THREE.Material): THREE.Group {
  const g = new THREE.Group();
  if (style === 'tee') {
    const top = latheFromProfile(
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
      cloth,
    );
    top.scale.set(1, 1, 0.8);
    g.add(top);
  } else if (style === 'hoodie') {
    const top = latheFromProfile(
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
      cloth,
    );
    top.scale.set(1, 1, 0.8);
    g.add(top);
    const hood = mesh(new THREE.TorusGeometry(0.082, 0.03, 12, 24), cloth, 0, 0.26, -0.05);
    hood.rotation.x = 1.25;
    hood.scale.set(1, 1, 0.8);
    g.add(hood);
    g.add(mesh(new THREE.BoxGeometry(0.17, 0.095, 0.028), cloth, 0, -0.155, 0.125));
    const stringMat = new THREE.MeshStandardMaterial({ color: '#e8e2d6', roughness: 0.8 });
    for (const side of [-1, 1]) {
      g.add(mesh(new THREE.CylinderGeometry(0.0035, 0.0035, 0.055, 8), stringMat, side * 0.018, 0.185, 0.098));
    }
  } else {
    // dress: fitted bodice flowing into a flared skirt in one lathe
    const dress = latheFromProfile(
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
        [0.218, -0.52],
        [0.248, -0.66],
      ],
      cloth,
    );
    dress.scale.set(1, 1, 0.8);
    g.add(dress);
    const satin = new THREE.MeshStandardMaterial({
      color: '#f2ead9',
      roughness: 0.35,
      envMapIntensity: 0.8,
    });
    const band = mesh(new THREE.TorusGeometry(0.13, 0.011, 10, 40), satin, 0, -0.115, 0);
    band.rotation.x = Math.PI / 2;
    band.scale.set(1, 0.8, 1);
    g.add(band);
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
    g.add(mesh(new THREE.BoxGeometry(thick, thick, 0.088), mat, side * 0.0555, 0.004, -0.04));
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

function buildAccessory(id: AccessoryId): { group: THREE.Group; anchor: 'neck' | 'bag' } | null {
  const g = new THREE.Group();
  switch (id) {
    case 'none':
      return null;
    case 'necklace': {
      // The chain is a tube along a curve fitted to the chest's
      // surface (computed from the torso profile) — a tilted torus
      // either floats off the bust or sinks into it.
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
  rig.torsoAnchor.add(buildTop(outfit.topStyle, rig.topMaterial));

  clearAnchor(rig.hatAnchor);
  const hat = buildHat(outfit.hat);
  if (hat) rig.hatAnchor.add(hat);

  clearAnchor(rig.glassesAnchor);
  const glasses = buildGlasses(outfit.glasses);
  if (glasses) rig.glassesAnchor.add(glasses);

  clearAnchor(rig.neckAnchor);
  clearAnchor(rig.bagAnchor);
  const acc = buildAccessory(outfit.accessory);
  if (acc) {
    (acc.anchor === 'neck' ? rig.neckAnchor : rig.bagAnchor).add(acc.group);
  }

  rig.applyPose(outfit.pose);
}
