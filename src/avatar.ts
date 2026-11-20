// The base avatar, built entirely from Three.js primitives in code —
// no downloaded model. Chibi proportions, flat-shaded low-poly look.
// Items attach to named anchors (hat/glasses/neck/torso/bag) so the
// dress-up code never needs to know the body's internal layout.

import * as THREE from 'three';
import type { ExpressionId, PoseId } from './outfit';

export interface AvatarRig {
  root: THREE.Group;
  head: THREE.Group;
  hatAnchor: THREE.Group;
  glassesAnchor: THREE.Group;
  neckAnchor: THREE.Group;
  torsoAnchor: THREE.Group;
  bagAnchor: THREE.Group;
  /** Shared material for sleeves; item overlays use it too so a top
   *  always matches its sleeves. Recolored by the outfit. */
  topMaterial: THREE.MeshStandardMaterial;
  applyPose(pose: PoseId): void;
  applyExpression(expr: ExpressionId): void;
  tick(timeSec: number): void;
}

function mat(color: string, roughness = 0.85): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness, flatShading: true });
}

function mesh(
  geo: THREE.BufferGeometry,
  material: THREE.Material,
  x = 0,
  y = 0,
  z = 0,
): THREE.Mesh {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

export function buildAvatar(): AvatarRig {
  const skin = mat('#ffd9c0', 0.7);
  const hairMat = mat('#8a5a33', 0.9);
  const innerMat = mat('#fff5ee');
  const shortsMat = mat('#5b7fb4');
  const shoeMat = mat('#ef6461', 0.6);
  const darkMat = mat('#33323e', 0.5);
  const blushMat = new THREE.MeshStandardMaterial({
    color: '#ff9eb0',
    roughness: 1,
    transparent: true,
    opacity: 0.85,
  });
  const topMaterial = mat('#ff8fab');

  const root = new THREE.Group();
  // Stand on top of the stage rug (its surface is at y=0.095 in the
  // scene), not sunk into it.
  const BASE_Y = 0.095;
  root.position.y = BASE_Y;

  // ---- legs & shoes ----
  for (const side of [-1, 1]) {
    const leg = mesh(new THREE.CapsuleGeometry(0.075, 0.3, 3, 10), skin, side * 0.11, 0.33, 0);
    root.add(leg);
    const shoe = mesh(new THREE.BoxGeometry(0.16, 0.09, 0.26), shoeMat, side * 0.11, 0.045, 0.03);
    root.add(shoe);
  }
  // shorts
  root.add(mesh(new THREE.BoxGeometry(0.36, 0.24, 0.26), shortsMat, 0, 0.56, 0));

  // ---- torso (inner layer; outfit overlays wrap this) ----
  const torso = mesh(new THREE.CylinderGeometry(0.21, 0.27, 0.56, 14), innerMat, 0, 0.94, 0);
  root.add(torso);
  root.add(mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.12, 10), skin, 0, 1.26, 0));

  const torsoAnchor = new THREE.Group();
  torsoAnchor.position.set(0, 0.94, 0);
  root.add(torsoAnchor);

  const neckAnchor = new THREE.Group();
  neckAnchor.position.set(0, 1.18, 0);
  root.add(neckAnchor);

  const bagAnchor = new THREE.Group();
  bagAnchor.position.set(0.36, 1.05, 0);
  root.add(bagAnchor);

  // ---- arms (shoulder pivots; sleeves follow the top's material) ----
  function buildArm(side: -1 | 1): THREE.Group {
    const arm = new THREE.Group();
    arm.position.set(side * 0.31, 1.16, 0);
    const sleeve = mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.18, 10), topMaterial, 0, -0.07, 0);
    arm.add(sleeve);
    arm.add(mesh(new THREE.CapsuleGeometry(0.058, 0.28, 3, 10), skin, 0, -0.32, 0));
    arm.add(mesh(new THREE.SphereGeometry(0.07, 10, 8), skin, 0, -0.52, 0));
    root.add(arm);
    return arm;
  }
  const armL = buildArm(-1);
  const armR = buildArm(1);

  // ---- head ----
  const head = new THREE.Group();
  head.position.set(0, 1.3, 0);
  root.add(head);
  head.add(mesh(new THREE.SphereGeometry(0.42, 22, 16), skin, 0, 0.32, 0));

  // hair: cap + fringe + side locks + back panel
  const hairCap = mesh(
    new THREE.SphereGeometry(0.455, 22, 16, 0, Math.PI * 2, 0, Math.PI * 0.55),
    hairMat,
    0,
    0.36,
    -0.01,
  );
  hairCap.rotation.x = -0.32;
  head.add(hairCap);
  const fringe = mesh(new THREE.SphereGeometry(0.4, 18, 12), hairMat, 0, 0.52, 0.13);
  fringe.scale.set(1.02, 0.45, 0.9);
  head.add(fringe);
  for (const side of [-1, 1]) {
    head.add(mesh(new THREE.CapsuleGeometry(0.075, 0.3, 3, 8), hairMat, side * 0.4, 0.08, 0.04));
  }
  const backHair = mesh(new THREE.CapsuleGeometry(0.17, 0.34, 3, 10), hairMat, 0, 0.02, -0.32);
  head.add(backHair);

  // face: eyes are groups so expressions can squash them
  function buildEye(side: -1 | 1): THREE.Group {
    const eye = new THREE.Group();
    eye.position.set(side * 0.15, 0.34, 0.385);
    const ball = mesh(new THREE.SphereGeometry(0.05, 12, 10), darkMat, 0, 0, 0);
    ball.scale.set(1, 1.25, 0.55);
    eye.add(ball);
    const shine = new THREE.Mesh(
      new THREE.SphereGeometry(0.017, 8, 6),
      new THREE.MeshBasicMaterial({ color: '#ffffff' }),
    );
    shine.position.set(0.016, 0.024, 0.026);
    eye.add(shine);
    head.add(eye);
    return eye;
  }
  const eyeL = buildEye(-1);
  const eyeR = buildEye(1);

  for (const side of [-1, 1]) {
    const blush = mesh(new THREE.SphereGeometry(0.055, 10, 8), blushMat, side * 0.26, 0.22, 0.35);
    blush.scale.set(1, 0.6, 0.3);
    blush.castShadow = false;
    head.add(blush);
  }

  // mouths: one per expression family, toggled by visibility
  const mouthMat = mat('#a34a52', 0.6);
  const smile = mesh(new THREE.TorusGeometry(0.055, 0.013, 8, 18, Math.PI), mouthMat, 0, 0.19, 0.4);
  smile.rotation.z = Math.PI;
  const open = mesh(new THREE.CircleGeometry(0.042, 14), mat('#8c3b46', 0.6), 0, 0.16, 0.402);
  open.scale.set(1, 1.25, 1);
  const line = mesh(new THREE.BoxGeometry(0.07, 0.014, 0.01), mouthMat, 0, 0.17, 0.402);
  const oh = mesh(new THREE.TorusGeometry(0.03, 0.011, 8, 16), mouthMat, 0, 0.16, 0.4);
  for (const m of [smile, open, line, oh]) head.add(m);
  const mouths = { smile, open, line, oh };

  const hatAnchor = new THREE.Group();
  hatAnchor.position.set(0, 0.74, 0);
  head.add(hatAnchor);

  const glassesAnchor = new THREE.Group();
  glassesAnchor.position.set(0, 0.34, 0.4);
  head.add(glassesAnchor);

  // ---- pose / expression state ----
  let pose: PoseId = 'stand';

  function applyPose(next: PoseId): void {
    pose = next;
    armL.rotation.set(0, 0, -0.14);
    armR.rotation.set(0, 0, 0.14);
    head.rotation.set(0, 0, 0);
    switch (next) {
      case 'wave':
        armR.rotation.z = 2.55;
        head.rotation.z = 0.07;
        break;
      case 'cheer':
        armL.rotation.z = -2.5;
        armR.rotation.z = 2.5;
        head.rotation.x = -0.07;
        break;
      case 'peace':
        armR.rotation.z = 2.55;
        armL.rotation.z = -0.8;
        armL.rotation.x = -0.25;
        head.rotation.z = -0.06;
        break;
      case 'relax':
        armL.rotation.x = -0.28;
        armR.rotation.x = -0.28;
        head.rotation.z = 0.05;
        head.rotation.x = 0.05;
        break;
      case 'stand':
        break;
    }
  }

  function applyExpression(expr: ExpressionId): void {
    eyeL.scale.set(1, 1, 1);
    eyeR.scale.set(1, 1, 1);
    mouths.smile.visible = expr === 'normal' || expr === 'happy' || expr === 'wink';
    mouths.open.visible = false;
    mouths.line.visible = expr === 'sleepy';
    mouths.oh.visible = expr === 'surprised';
    if (expr === 'happy') {
      eyeL.scale.set(1, 0.16, 1);
      eyeR.scale.set(1, 0.16, 1);
    } else if (expr === 'wink') {
      eyeL.scale.set(1, 0.14, 1);
    } else if (expr === 'surprised') {
      eyeL.scale.set(1.3, 1.3, 1);
      eyeR.scale.set(1.3, 1.3, 1);
    } else if (expr === 'sleepy') {
      eyeL.scale.set(1, 0.12, 1);
      eyeR.scale.set(1, 0.12, 1);
    }
  }

  function tick(timeSec: number): void {
    // A gentle bob keeps the avatar alive without any rig/animation files.
    root.position.y = BASE_Y + Math.sin(timeSec * 1.7) * 0.015;
    if (pose === 'wave') {
      armR.rotation.z = 2.55 + Math.sin(timeSec * 7) * 0.22;
    }
  }

  applyPose('stand');
  applyExpression('normal');

  return {
    root,
    head,
    hatAnchor,
    glassesAnchor,
    neckAnchor,
    torsoAnchor,
    bagAnchor,
    topMaterial,
    applyPose,
    applyExpression,
    tick,
  };
}
