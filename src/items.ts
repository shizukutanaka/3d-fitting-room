// Dress-up items, all procedurally built from primitives — no external
// models or textures, so the license story stays trivially clean
// (see docs/DESIGN.md ledger). Each builder returns a Group positioned
// for its anchor on the avatar rig.

import * as THREE from 'three';
import type { AvatarRig } from './avatar';
import type { AccessoryId, GlassesId, HatId, Outfit, TopStyle } from './outfit';

function mat(color: string, roughness = 0.85): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness, flatShading: true });
}

function mesh(geo: THREE.BufferGeometry, material: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

// ---------- tops (anchor: torso center) ----------

function buildTop(style: TopStyle, cloth: THREE.Material): THREE.Group {
  const g = new THREE.Group();
  if (style === 'tee') {
    g.add(mesh(new THREE.CylinderGeometry(0.235, 0.3, 0.52, 14), cloth, 0, 0.02, 0));
  } else if (style === 'hoodie') {
    g.add(mesh(new THREE.CylinderGeometry(0.25, 0.31, 0.58, 14), cloth, 0, 0, 0));
    const hood = mesh(new THREE.TorusGeometry(0.155, 0.06, 8, 16), cloth, 0, 0.31, -0.09);
    hood.rotation.x = 1.15;
    g.add(hood);
    g.add(mesh(new THREE.BoxGeometry(0.26, 0.13, 0.04), cloth, 0, -0.17, 0.28));
  } else {
    // dress: fitted top + flared skirt
    g.add(mesh(new THREE.CylinderGeometry(0.235, 0.29, 0.5, 14), cloth, 0, 0.03, 0));
    const skirt = mesh(new THREE.CylinderGeometry(0.29, 0.54, 0.46, 16, 1, true), cloth, 0, -0.42, 0);
    skirt.material = cloth;
    g.add(skirt);
    const hem = mesh(new THREE.TorusGeometry(0.54, 0.02, 6, 24), mat('#ffffff', 0.7), 0, -0.65, 0);
    hem.rotation.x = Math.PI / 2;
    g.add(hem);
  }
  return g;
}

// ---------- hats (anchor: top of head) ----------

function buildHat(hat: HatId): THREE.Group | null {
  const g = new THREE.Group();
  switch (hat) {
    case 'none':
      return null;
    case 'cap': {
      const cloth = mat('#ff5964', 0.8);
      g.add(mesh(new THREE.SphereGeometry(0.47, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), cloth, 0, 0.01, 0));
      const brim = mesh(new THREE.BoxGeometry(0.46, 0.03, 0.3), cloth, 0, 0.02, 0.36);
      brim.rotation.x = 0.1;
      g.add(brim);
      g.add(mesh(new THREE.SphereGeometry(0.06, 10, 8), mat('#ffffff'), 0, 0.48, 0));
      return g;
    }
    case 'beanie': {
      const cloth = mat('#7fd8be', 0.95);
      const dome = mesh(new THREE.SphereGeometry(0.47, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.62), cloth, 0, 0.03, 0);
      dome.scale.y = 0.82;
      g.add(dome);
      g.add(mesh(new THREE.CylinderGeometry(0.465, 0.475, 0.11, 18, 1, true), mat('#5fbfa5', 0.95), 0, 0.0, 0));
      g.add(mesh(new THREE.SphereGeometry(0.095, 10, 8), mat('#ffffff', 0.95), 0, 0.42, 0));
      return g;
    }
    case 'catears': {
      // The band must hug the head: centered near head-center height,
      // not floating above the crown like a halo.
      const band = mesh(new THREE.TorusGeometry(0.43, 0.022, 8, 24, Math.PI), mat('#33323e', 0.6), 0, -0.38, 0);
      band.rotation.x = 0.12;
      g.add(band);
      for (const side of [-1, 1]) {
        const ear = mesh(new THREE.ConeGeometry(0.115, 0.26, 4), mat('#8a5a33', 0.9), side * 0.25, 0.14, 0);
        ear.rotation.z = -side * 0.22;
        ear.rotation.y = Math.PI / 4;
        g.add(ear);
        const inner = mesh(new THREE.ConeGeometry(0.06, 0.15, 4), mat('#ff9eb0', 0.9), side * 0.245, 0.13, 0.045);
        inner.rotation.z = -side * 0.22;
        inner.rotation.y = Math.PI / 4;
        g.add(inner);
      }
      return g;
    }
    case 'ribbon': {
      const cloth = mat('#ff5964', 0.7);
      for (const side of [-1, 1]) {
        const wing = mesh(new THREE.ConeGeometry(0.13, 0.3, 10), cloth, side * 0.15, 0.08, 0);
        wing.rotation.z = side * 1.15;
        wing.scale.set(1, 1, 0.45);
        g.add(wing);
      }
      g.add(mesh(new THREE.SphereGeometry(0.065, 10, 8), mat('#e04452', 0.7), 0, 0.06, 0));
      return g;
    }
  }
}

// ---------- glasses (anchor: eye line, front of face) ----------

function temples(frame: THREE.Material): THREE.Group {
  const g = new THREE.Group();
  for (const side of [-1, 1]) {
    g.add(mesh(new THREE.BoxGeometry(0.016, 0.016, 0.36), frame, side * 0.245, 0.03, -0.14));
  }
  return g;
}

function buildGlasses(id: GlassesId): THREE.Group | null {
  const frame = new THREE.MeshStandardMaterial({
    color: '#33323e',
    roughness: 0.35,
    metalness: 0.4,
    flatShading: true,
  });
  const g = new THREE.Group();
  switch (id) {
    case 'none':
      return null;
    case 'round': {
      for (const side of [-1, 1]) {
        g.add(mesh(new THREE.TorusGeometry(0.088, 0.013, 8, 20), frame, side * 0.15, 0, 0.03));
      }
      g.add(mesh(new THREE.BoxGeometry(0.13, 0.02, 0.02), frame, 0, 0.025, 0.03));
      g.add(temples(frame));
      return g;
    }
    case 'square': {
      for (const side of [-1, 1]) {
        const cx = side * 0.15;
        g.add(mesh(new THREE.BoxGeometry(0.19, 0.02, 0.02), frame, cx, 0.065, 0.03));
        g.add(mesh(new THREE.BoxGeometry(0.19, 0.02, 0.02), frame, cx, -0.065, 0.03));
        g.add(mesh(new THREE.BoxGeometry(0.02, 0.15, 0.02), frame, cx - 0.085, 0, 0.03));
        g.add(mesh(new THREE.BoxGeometry(0.02, 0.15, 0.02), frame, cx + 0.085, 0, 0.03));
      }
      g.add(mesh(new THREE.BoxGeometry(0.13, 0.02, 0.02), frame, 0, 0.03, 0.03));
      g.add(temples(frame));
      return g;
    }
    case 'sunglasses': {
      const lens = new THREE.MeshStandardMaterial({
        color: '#1c1c26',
        roughness: 0.15,
        metalness: 0.2,
        flatShading: true,
      });
      for (const side of [-1, 1]) {
        const l = mesh(new THREE.BoxGeometry(0.18, 0.12, 0.015), lens, side * 0.15, -0.005, 0.03);
        l.rotation.z = -side * 0.06;
        g.add(l);
      }
      g.add(mesh(new THREE.BoxGeometry(0.5, 0.028, 0.02), frame, 0, 0.065, 0.03));
      g.add(temples(frame));
      return g;
    }
  }
}

// ---------- accessories (neck anchor or bag anchor) ----------

function buildAccessory(id: AccessoryId): { group: THREE.Group; anchor: 'neck' | 'bag' } | null {
  const g = new THREE.Group();
  switch (id) {
    case 'none':
      return null;
    case 'necklace': {
      const gold = new THREE.MeshStandardMaterial({
        color: '#f4c542',
        roughness: 0.3,
        metalness: 0.7,
        flatShading: true,
      });
      const chain = mesh(new THREE.TorusGeometry(0.125, 0.013, 8, 20), gold, 0, -0.03, 0.17);
      chain.rotation.x = 1.05;
      g.add(chain);
      const gem = mesh(new THREE.OctahedronGeometry(0.038), mat('#ff8fab', 0.3), 0, -0.175, 0.28);
      g.add(gem);
      return { group: g, anchor: 'neck' };
    }
    case 'scarf': {
      const cloth = mat('#e63946', 0.95);
      const wrap = mesh(new THREE.TorusGeometry(0.155, 0.058, 10, 20), cloth, 0, 0.03, 0);
      wrap.rotation.x = Math.PI / 2;
      g.add(wrap);
      const tail = mesh(new THREE.BoxGeometry(0.12, 0.3, 0.035), cloth, 0.11, -0.16, 0.16);
      tail.rotation.x = 0.08;
      g.add(tail);
      return { group: g, anchor: 'neck' };
    }
    case 'bag': {
      const body = mat('#ffb703', 0.8);
      g.add(mesh(new THREE.BoxGeometry(0.1, 0.24, 0.3), body, 0.03, -0.34, 0));
      g.add(mesh(new THREE.BoxGeometry(0.105, 0.1, 0.31), mat('#fb8500', 0.8), 0.03, -0.26, 0));
      const handle = mesh(new THREE.TorusGeometry(0.13, 0.016, 8, 18, Math.PI), mat('#fb8500', 0.8), 0.03, -0.22, 0);
      g.add(handle);
      // strap up to the shoulder
      const strap = mesh(new THREE.BoxGeometry(0.02, 0.34, 0.02), mat('#fb8500', 0.8), -0.02, -0.02, 0);
      strap.rotation.z = 0.5;
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

/** Swap the visible items on the rig to match the outfit. Pose and
 *  expression are applied here too, so this is the single entry point
 *  the UI calls for any state change. */
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
  rig.applyExpression(outfit.expression);
}
