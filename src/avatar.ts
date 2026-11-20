// The base avatar, built entirely in code — no downloaded model.
// Real-leaning proportions (~7.2 heads, 1.74 m) with smooth-shaded
// lathe/capsule forms and procedural PBR materials (see textures.ts).
//
// Face design: a calm mannequin face. The chibi version's selectable
// expressions worked by squashing the eyes to 12% height, which on a
// realistic face reads as breakage, not cuteness — so expressions
// were deliberately dropped (see docs/DESIGN.md §9). Lifelikeness
// comes from subtle automatic blinking and the poses instead.
// Items attach to named anchors (hat/glasses/neck/torso/bag) so
// dress-up code never needs the body's internal layout.

import * as THREE from 'three';
import { fabricTextures, hairTextures, skinTextures } from './textures';
import type { PoseId } from './outfit';

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
  tick(timeSec: number): void;
}

/** Smooth lathe from (radius, y) control points via a spline, so
 *  silhouettes curve like a body instead of a stack of cones. */
export function latheFromProfile(
  profile: Array<[number, number]>,
  material: THREE.Material,
  segments = 48,
): THREE.Mesh {
  const curve = new THREE.SplineCurve(profile.map(([x, y]) => new THREE.Vector2(x, y)));
  const geo = new THREE.LatheGeometry(curve.getPoints(56), segments);
  const m = new THREE.Mesh(geo, material);
  m.castShadow = true;
  return m;
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
  const skinTex = skinTextures();
  const skin = new THREE.MeshStandardMaterial({
    color: '#e9b48c',
    map: skinTex.map,
    bumpMap: skinTex.bump,
    bumpScale: 0.15,
    roughness: 0.58,
    envMapIntensity: 0.45,
  });
  const hairTex = hairTextures();
  const hairMat = new THREE.MeshStandardMaterial({
    color: '#503729',
    map: hairTex.map,
    bumpMap: hairTex.bump,
    bumpScale: 0.3,
    roughness: 0.38,
    envMapIntensity: 1.15,
  });
  const baseFabricTex = fabricTextures([2, 2]);
  const baseFabric = new THREE.MeshStandardMaterial({
    color: '#a8a29a',
    map: baseFabricTex.map,
    bumpMap: baseFabricTex.bump,
    bumpScale: 0.3,
    roughness: 0.9,
    envMapIntensity: 0.3,
  });
  const topFabricTex = fabricTextures([3, 3]);
  const topMaterial = new THREE.MeshStandardMaterial({
    color: '#ff8fab',
    map: topFabricTex.map,
    bumpMap: topFabricTex.bump,
    bumpScale: 0.35,
    roughness: 0.84,
    envMapIntensity: 0.4,
    side: THREE.DoubleSide,
  });
  const shoeMat = new THREE.MeshStandardMaterial({
    color: '#5e2233',
    roughness: 0.32,
    envMapIntensity: 0.9,
  });

  const root = new THREE.Group();
  // The stage podium's top surface sits at y=0.12 (see scene.ts).
  const BASE_Y = 0.12;
  root.position.y = BASE_Y;

  // ---- legs & shoes ----
  for (const side of [-1, 1]) {
    const x = side * 0.096;
    root.add(mesh(new THREE.CapsuleGeometry(0.067, 0.25, 6, 20), skin, x, 0.645, 0));
    root.add(mesh(new THREE.SphereGeometry(0.047, 20, 14), skin, x, 0.462, 0.004));
    root.add(mesh(new THREE.CapsuleGeometry(0.043, 0.26, 6, 18), skin, x, 0.278, 0));
    root.add(mesh(new THREE.CylinderGeometry(0.031, 0.034, 0.1, 14), skin, x, 0.075, 0));
    // flat shoe: sole + upper + toe + low heel
    const shoe = new THREE.Group();
    shoe.position.set(x, 0, 0.012);
    const sole = mesh(new THREE.BoxGeometry(0.072, 0.016, 0.235), shoeMat, 0, 0.008, 0.028);
    const upper = mesh(new THREE.SphereGeometry(1, 20, 14), shoeMat, 0, 0.026, 0.02);
    upper.scale.set(0.04, 0.027, 0.105);
    const toe = mesh(new THREE.SphereGeometry(1, 18, 12), shoeMat, 0, 0.019, 0.112);
    toe.scale.set(0.037, 0.02, 0.045);
    const heel = mesh(new THREE.BoxGeometry(0.054, 0.028, 0.034), shoeMat, 0, 0.014, -0.07);
    shoe.add(sole, upper, toe, heel);
    root.add(shoe);
  }

  // ---- pelvis (base-layer shorts) ----
  const pelvis = mesh(new THREE.SphereGeometry(1, 36, 24), baseFabric, 0, 0.885, 0);
  pelvis.scale.set(0.163, 0.115, 0.128);
  root.add(pelvis);
  for (const side of [-1, 1]) {
    root.add(
      mesh(new THREE.CylinderGeometry(0.078, 0.07, 0.13, 20), baseFabric, side * 0.096, 0.8, 0),
    );
  }

  // ---- torso (base camisole; outfit overlays wrap this) ----
  const torso = latheFromProfile(
    [
      [0.138, 0.845],
      [0.145, 0.88],
      [0.14, 0.94],
      [0.12, 1.02],
      [0.121, 1.08],
      [0.146, 1.17],
      [0.141, 1.25],
      [0.117, 1.335],
      [0.075, 1.39],
      [0.05, 1.415],
    ],
    baseFabric,
  );
  torso.scale.set(1, 1, 0.8);
  root.add(torso);
  root.add(mesh(new THREE.CylinderGeometry(0.042, 0.05, 0.15, 20), skin, 0, 1.465, 0));

  const torsoAnchor = new THREE.Group();
  torsoAnchor.position.set(0, 1.12, 0);
  root.add(torsoAnchor);

  const neckAnchor = new THREE.Group();
  neckAnchor.position.set(0, 1.415, 0);
  root.add(neckAnchor);

  const bagAnchor = new THREE.Group();
  bagAnchor.position.set(0.235, 1.02, 0.02);
  root.add(bagAnchor);

  // ---- arms ----
  function buildArm(side: -1 | 1): { shoulder: THREE.Group; elbow: THREE.Group } {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.172, 1.374, 0);
    shoulder.add(mesh(new THREE.SphereGeometry(0.052, 20, 14), skin, 0, 0.002, 0));
    // 3/4 sleeve in the shared top material, so sleeves always match
    const sleeve = mesh(new THREE.CylinderGeometry(0.054, 0.045, 0.22, 20), topMaterial, 0, -0.09, 0);
    shoulder.add(sleeve);
    shoulder.add(mesh(new THREE.CapsuleGeometry(0.04, 0.16, 6, 16), skin, 0, -0.16, 0));
    const elbow = new THREE.Group();
    elbow.position.set(0, -0.27, 0);
    elbow.add(mesh(new THREE.CapsuleGeometry(0.034, 0.17, 6, 16), skin, 0, -0.115, 0));
    const hand = new THREE.Group();
    hand.position.set(0, -0.26, 0);
    const palm = mesh(new THREE.SphereGeometry(1, 16, 12), skin, 0, -0.032, 0);
    palm.scale.set(0.03, 0.049, 0.017);
    const thumb = mesh(new THREE.SphereGeometry(0.01, 10, 8), skin, -side * 0.024, -0.018, 0.01);
    hand.add(palm, thumb);
    elbow.add(hand);
    shoulder.add(elbow);
    root.add(shoulder);
    return { shoulder, elbow };
  }
  const armL = buildArm(-1);
  const armR = buildArm(1);

  // ---- head ----
  // Lathe profile is radially symmetric; scale (0.88, 1, 1.12)
  // stretches it into a real head's width/depth ratio. Feature
  // depths below are computed against that scaled surface.
  const head = new THREE.Group();
  head.position.set(0, 1.5, 0);
  root.add(head);
  const SKULL_PROFILE: Array<[number, number]> = [
    [0.015, 0.002],
    [0.05, 0.01],
    [0.066, 0.032],
    [0.075, 0.062],
    [0.08, 0.098],
    [0.081, 0.132],
    [0.076, 0.168],
    [0.062, 0.205],
    [0.036, 0.232],
    [0.001, 0.244],
  ];
  const skull = latheFromProfile(SKULL_PROFILE, skin, 56);
  skull.scale.set(0.88, 1, 1.12);
  head.add(skull);

  // eyes: almond eyeballs + skin lids (the lids do the blinking)
  const eyeMat = new THREE.MeshStandardMaterial({
    color: '#2e2019',
    roughness: 0.12,
    envMapIntensity: 1.3,
  });
  function buildEye(side: -1 | 1): THREE.Group {
    const g = new THREE.Group();
    g.position.set(side * 0.034, 0.115, 0.0735);
    const ball = mesh(new THREE.SphereGeometry(0.0135, 20, 14), eyeMat, 0, 0, 0);
    ball.scale.set(1.3, 0.74, 0.62);
    ball.castShadow = false;
    g.add(ball);
    const shine = new THREE.Mesh(
      new THREE.SphereGeometry(0.0028, 8, 6),
      new THREE.MeshBasicMaterial({ color: '#ffffff' }),
    );
    shine.position.set(0.004, 0.0048, 0.0072);
    g.add(shine);
    const lid = new THREE.Group();
    const lidMesh = mesh(
      new THREE.SphereGeometry(0.0148, 20, 12, 0, Math.PI * 2, 0, 1.25),
      skin,
      0,
      0,
      0,
    );
    lidMesh.scale.set(1.3, 0.78, 0.66);
    lidMesh.castShadow = false;
    lid.add(lidMesh);
    lid.rotation.x = -0.18;
    g.add(lid);
    head.add(g);
    return lid;
  }
  const lidL = buildEye(-1);
  const lidR = buildEye(1);

  // brows, nose, lips, ears — kept quiet; a mannequin face, not a doll's
  for (const side of [-1, 1]) {
    const brow = mesh(
      new THREE.TorusGeometry(0.02, 0.0028, 8, 20, 1.5),
      hairMat,
      side * 0.0345,
      0.15,
      0.0765,
    );
    // Center the torus arc at the top (a brow's ⌒), tilted onto the
    // brow ridge, outer end a touch lower than the inner end.
    brow.rotation.set(-0.3, 0, Math.PI / 2 - 0.75 - side * 0.09);
    brow.castShadow = false;
    head.add(brow);
    const ear = mesh(new THREE.SphereGeometry(1, 12, 10), skin, side * 0.0695, 0.105, -0.002);
    ear.scale.set(0.0075, 0.0155, 0.011);
    ear.castShadow = false;
    head.add(ear);
  }
  const nose = mesh(new THREE.SphereGeometry(1, 14, 10), skin, 0, 0.08, 0.0855);
  nose.scale.set(0.0105, 0.015, 0.009);
  nose.castShadow = false;
  head.add(nose);
  const lipMat = new THREE.MeshStandardMaterial({
    color: '#a96052',
    roughness: 0.45,
    envMapIntensity: 0.6,
  });
  const lips = mesh(new THREE.SphereGeometry(1, 18, 12), lipMat, 0, 0.047, 0.0785);
  lips.scale.set(0.0195, 0.0062, 0.0068);
  lips.castShadow = false;
  head.add(lips);

  // hair: a lathe shell that follows the skull (a sphere cap cannot —
  // the crown sits higher than a sphere of face width), plus a
  // forward-tilted fringe shell, back mass and side locks
  const hairCap = latheFromProfile(
    SKULL_PROFILE.slice(3).map(([r, y]): [number, number] => [r + 0.005, y + 0.003]),
    hairMat,
    56,
  );
  hairCap.scale.set(0.88, 1, 1.12);
  hairCap.position.z = -0.004;
  head.add(hairCap);
  const fringe = mesh(
    new THREE.SphereGeometry(0.0845, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.3),
    hairMat,
    0,
    0.132,
    0.004,
  );
  fringe.scale.set(0.9, 1.05, 1.1);
  fringe.rotation.x = 0.3;
  head.add(fringe);
  const backHair = mesh(new THREE.CapsuleGeometry(0.05, 0.14, 6, 18), hairMat, 0, 0.015, -0.062);
  backHair.rotation.x = 0.1;
  head.add(backHair);
  for (const side of [-1, 1]) {
    const lock = mesh(new THREE.CapsuleGeometry(0.017, 0.09, 4, 12), hairMat, side * 0.07, 0.045, 0.03);
    lock.rotation.z = -side * 0.06;
    lock.rotation.x = -0.05;
    head.add(lock);
  }

  const hatAnchor = new THREE.Group();
  hatAnchor.position.set(0, 0.242, 0);
  head.add(hatAnchor);

  const glassesAnchor = new THREE.Group();
  glassesAnchor.position.set(0, 0.115, 0.077);
  head.add(glassesAnchor);

  // ---- poses & idle motion ----
  let pose: PoseId = 'stand';

  function applyPose(next: PoseId): void {
    pose = next;
    armL.shoulder.rotation.set(0, 0, -0.1);
    armR.shoulder.rotation.set(0, 0, 0.1);
    armL.elbow.rotation.set(-0.06, 0, 0);
    armR.elbow.rotation.set(-0.06, 0, 0);
    head.rotation.set(0, 0, 0);
    switch (next) {
      case 'wave':
        armR.shoulder.rotation.z = 2.45;
        armR.elbow.rotation.x = -0.15;
        head.rotation.z = 0.05;
        break;
      case 'cheer':
        armL.shoulder.rotation.z = -2.45;
        armR.shoulder.rotation.z = 2.45;
        armL.elbow.rotation.x = 0;
        armR.elbow.rotation.x = 0;
        head.rotation.x = -0.05;
        break;
      case 'peace':
        armR.shoulder.rotation.z = 2.35;
        armR.elbow.rotation.x = -0.35;
        armL.shoulder.rotation.z = -0.55;
        armL.elbow.rotation.x = -0.5;
        head.rotation.z = -0.05;
        break;
      case 'relax':
        armL.shoulder.rotation.z = -0.16;
        armR.shoulder.rotation.z = 0.16;
        armL.elbow.rotation.x = -0.38;
        armR.elbow.rotation.x = -0.38;
        head.rotation.set(0.04, 0, 0.04);
        break;
      case 'stand':
        break;
    }
  }

  function tick(timeSec: number): void {
    // Barely-there idle sway — a living model, not a bobbing toy.
    root.position.y = BASE_Y + Math.sin(timeSec * 1.5) * 0.0035;
    root.rotation.z = Math.sin(timeSec * 0.6) * 0.004;
    // Blink: lids swing down for ~150 ms every ~3.6 s.
    const phase = timeSec % 3.6;
    const blink = phase < 0.16 ? Math.sin((phase / 0.16) * Math.PI) : 0;
    lidL.rotation.x = -0.18 + blink * 0.95;
    lidR.rotation.x = -0.18 + blink * 0.95;
    if (pose === 'wave') {
      armR.shoulder.rotation.z = 2.45 + Math.sin(timeSec * 6.5) * 0.18;
    }
  }

  applyPose('stand');

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
    tick,
  };
}
