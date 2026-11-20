// The base avatar, built entirely in code — no downloaded model.
// Real-leaning proportions (~7.2 heads at the 1.74 m design height)
// with smooth-shaded lathe/capsule forms and procedural PBR
// materials (see textures.ts).
//
// The avatar is generated from a CharacterParams vector (see
// character.ts): skin/hair/eye colors, hairstyle, height and the
// phase-2 face parameters are parameters, not constants. Height is
// applied at generation time as a frame scale — full strength
// vertically, damped across the width so a taller person is not
// simply a wider one — and setCharacter() regenerates the affected
// parts when the vector changes.
//
// Face design: a calm mannequin face. The chibi version's selectable
// expressions worked by squashing the eyes to 12% height, which on a
// realistic face reads as breakage, not cuteness — so expressions
// were deliberately dropped (see docs/DESIGN.md §9). Lifelikeness
// comes from subtle automatic blinking, camera-tracking gaze with
// saccades, and the poses instead.
// Items attach to named anchors (hat/glasses/neck/torso/bag) so
// dress-up code never needs the body's internal layout.

import * as THREE from 'three';
import { fabricTextures, hairTextures, skinTextures } from './textures';
import type { PoseId } from './outfit';
import {
  BASE_HEIGHT,
  skinColorForTone,
  type CharacterParams,
  type HairStyleId,
} from './character';

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
  /** Regenerate the parameter-driven parts (colors, hairstyle,
   *  height frame) from a new character vector. Cheap when nothing
   *  changed, so callers may invoke it on every state update. */
  setCharacter(next: CharacterParams): void;
  /** Advance idle motion. gazeTarget, when given, is a world-space
   *  point the eyes track (the host passes the camera position);
   *  omit it and the eyes rest looking straight ahead. */
  tick(timeSec: number, gazeTarget?: THREE.Vector3): void;
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

// Head-local skull profile (radius, height above the head origin).
// The lathe is radially symmetric; scale (0.88, 1, 1.12) stretches
// it into a real head's width/depth ratio.
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

/** A hairstyle as a head-local group: a lathe shell that follows
 *  the skull (a sphere cap cannot — the crown sits higher than a
 *  sphere of face width), a fringe shell, and style-specific mass.
 *  All shapes are procedural; the material (and its color) is the
 *  avatar's shared hair material. The skull's horizontal scale is
 *  a character parameter (faceWidth), so the cap and the side
 *  locks follow it — pass the current value at build time. */
function buildHair(style: HairStyleId, hairMat: THREE.Material, faceWidth = 1): THREE.Group {
  const g = new THREE.Group();
  const cap = latheFromProfile(
    SKULL_PROFILE.slice(3).map(([r, y]): [number, number] => [r + 0.005, y + 0.003]),
    hairMat,
    56,
  );
  cap.scale.set(0.88 * faceWidth, 1, 1.12);
  cap.position.z = -0.004;
  g.add(cap);

  const fringe = (
    sweep: number,
    y: number,
    tilt: number,
  ): THREE.Mesh => {
    const f = mesh(
      new THREE.SphereGeometry(0.0845, 48, 24, 0, Math.PI * 2, 0, Math.PI * sweep),
      hairMat,
      0,
      y,
      0.004,
    );
    f.scale.set(0.9 * faceWidth, 1.05, 1.1);
    f.rotation.x = tilt;
    return f;
  };

  switch (style) {
    case 'bob': {
      g.add(fringe(0.3, 0.132, 0.3));
      const back = mesh(new THREE.CapsuleGeometry(0.05, 0.14, 6, 18), hairMat, 0, 0.015, -0.062);
      back.rotation.x = 0.1;
      g.add(back);
      for (const side of [-1, 1]) {
        const lock = mesh(new THREE.CapsuleGeometry(0.017, 0.09, 4, 12), hairMat, side * 0.07 * faceWidth, 0.045, 0.03);
        lock.rotation.z = -side * 0.06;
        lock.rotation.x = -0.05;
        g.add(lock);
      }
      break;
    }
    case 'long': {
      g.add(fringe(0.3, 0.132, 0.3));
      const back = mesh(new THREE.CapsuleGeometry(0.056, 0.34, 6, 18), hairMat, 0, -0.1, -0.075);
      back.rotation.x = 0.06;
      g.add(back);
      for (const side of [-1, 1]) {
        const lock = mesh(new THREE.CapsuleGeometry(0.018, 0.2, 4, 12), hairMat, side * 0.072 * faceWidth, -0.03, 0.028);
        lock.rotation.z = -side * 0.05;
        lock.rotation.x = -0.04;
        g.add(lock);
      }
      break;
    }
    case 'short': {
      g.add(fringe(0.26, 0.138, 0.22));
      const tuft = mesh(new THREE.CapsuleGeometry(0.048, 0.03, 4, 14), hairMat, 0, 0.055, -0.058);
      tuft.rotation.x = 0.15;
      g.add(tuft);
      break;
    }
    case 'ponytail': {
      g.add(fringe(0.3, 0.132, 0.3));
      const base = mesh(new THREE.SphereGeometry(0.03, 14, 10), hairMat, 0, 0.2, -0.055);
      g.add(base);
      const band = mesh(new THREE.TorusGeometry(0.027, 0.0065, 8, 20), hairMat, 0, 0.198, -0.06);
      band.rotation.x = 1.1;
      g.add(band);
      const tail = mesh(new THREE.CapsuleGeometry(0.026, 0.24, 6, 14), hairMat, 0, 0.1, -0.09);
      tail.rotation.x = -0.3;
      g.add(tail);
      break;
    }
    case 'bun': {
      g.add(fringe(0.3, 0.132, 0.3));
      const bun = mesh(new THREE.SphereGeometry(0.037, 18, 12), hairMat, 0, 0.238, -0.04);
      g.add(bun);
      const wrap = mesh(new THREE.TorusGeometry(0.035, 0.006, 8, 20), hairMat, 0, 0.232, -0.042);
      wrap.rotation.x = 1.2;
      g.add(wrap);
      break;
    }
  }
  return g;
}

// ---- poses ----
// A pose is a full set of joint angles; applyPose only retargets,
// and tick() eases the actual rotations toward the target, so
// switching poses is a smooth transition instead of a teleport.

type Vec3 = [number, number, number];
interface JointAngles {
  ls: Vec3;
  rs: Vec3;
  le: Vec3;
  re: Vec3;
  head: Vec3;
}

function poseTargets(pose: PoseId): JointAngles {
  const t: JointAngles = {
    ls: [0, 0, -0.1],
    rs: [0, 0, 0.1],
    le: [-0.06, 0, 0],
    re: [-0.06, 0, 0],
    head: [0, 0, 0],
  };
  switch (pose) {
    case 'wave':
      t.rs = [0, 0, 2.45];
      t.re = [-0.15, 0, 0];
      t.head = [0, 0, 0.05];
      break;
    case 'cheer':
      t.ls = [0, 0, -2.45];
      t.rs = [0, 0, 2.45];
      t.le = [0, 0, 0];
      t.re = [0, 0, 0];
      t.head = [-0.05, 0, 0];
      break;
    case 'peace':
      t.rs = [0, 0, 2.35];
      t.re = [-0.35, 0, 0];
      t.ls = [0, 0, -0.55];
      t.le = [-0.5, 0, 0];
      t.head = [0, 0, -0.05];
      break;
    case 'relax':
      t.ls = [0, 0, -0.16];
      t.rs = [0, 0, 0.16];
      t.le = [-0.38, 0, 0];
      t.re = [-0.38, 0, 0];
      t.head = [0.04, 0, 0.04];
      break;
    case 'stand':
      break;
  }
  return t;
}

export function buildAvatar(character: CharacterParams): AvatarRig {
  const skinTex = skinTextures();
  const skin = new THREE.MeshStandardMaterial({
    color: skinColorForTone(character.skinTone),
    map: skinTex.map,
    bumpMap: skinTex.bump,
    bumpScale: 0.15,
    roughness: 0.58,
    envMapIntensity: 0.45,
  });
  const hairTex = hairTextures();
  const hairMat = new THREE.MeshStandardMaterial({
    color: character.hairColor,
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
  const eyeMat = new THREE.MeshStandardMaterial({
    color: character.eyeColor,
    roughness: 0.12,
    envMapIntensity: 1.3,
  });
  // Eye construction materials (phase 2): the pre-phase-2 eye was
  // a single dark almond blob, the biggest single contributor to
  // the mannequin look. A real eye reads through its parts —
  // warm-white sclera, a colored iris with a dark limbal ring, a
  // black pupil, and a glossy cornea that catches the room.
  const scleraMat = new THREE.MeshStandardMaterial({
    color: '#f3ede1',
    roughness: 0.22,
    envMapIntensity: 1.0,
  });
  const limbalMat = new THREE.MeshStandardMaterial({
    color: '#241a14',
    roughness: 0.3,
    envMapIntensity: 0.6,
  });
  const pupilMat = new THREE.MeshStandardMaterial({
    color: '#14100d',
    roughness: 0.25,
    envMapIntensity: 0.8,
  });
  const corneaMat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.16,
    roughness: 0.05,
    envMapIntensity: 2.2,
    depthWrite: false,
  });

  const root = new THREE.Group();
  // The stage podium's top surface sits at y=0.12 (see scene.ts).
  const BASE_Y = 0.12;
  root.position.y = BASE_Y;
  // The frame carries the height scale; root stays unscaled so the
  // feet remain planted on the podium at any height.
  const frame = new THREE.Group();
  root.add(frame);

  // ---- legs & shoes ----
  for (const side of [-1, 1]) {
    const x = side * 0.096;
    frame.add(mesh(new THREE.CapsuleGeometry(0.067, 0.25, 6, 20), skin, x, 0.645, 0));
    frame.add(mesh(new THREE.SphereGeometry(0.047, 20, 14), skin, x, 0.462, 0.004));
    frame.add(mesh(new THREE.CapsuleGeometry(0.043, 0.26, 6, 18), skin, x, 0.278, 0));
    frame.add(mesh(new THREE.CylinderGeometry(0.031, 0.034, 0.1, 14), skin, x, 0.075, 0));
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
    frame.add(shoe);
  }

  // ---- pelvis (base-layer shorts) ----
  const pelvis = mesh(new THREE.SphereGeometry(1, 36, 24), baseFabric, 0, 0.885, 0);
  pelvis.scale.set(0.163, 0.115, 0.128);
  frame.add(pelvis);
  for (const side of [-1, 1]) {
    frame.add(
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
  frame.add(torso);
  frame.add(mesh(new THREE.CylinderGeometry(0.042, 0.05, 0.15, 20), skin, 0, 1.465, 0));

  const torsoAnchor = new THREE.Group();
  torsoAnchor.position.set(0, 1.12, 0);
  frame.add(torsoAnchor);

  const neckAnchor = new THREE.Group();
  neckAnchor.position.set(0, 1.415, 0);
  frame.add(neckAnchor);

  const bagAnchor = new THREE.Group();
  bagAnchor.position.set(0.235, 1.02, 0.02);
  frame.add(bagAnchor);

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
    frame.add(shoulder);
    return { shoulder, elbow };
  }
  const armL = buildArm(-1);
  const armR = buildArm(1);

  // ---- head ----
  // Feature depths below are computed against the scaled skull
  // surface (lathe profile × (0.88, 1, 1.12)).
  const head = new THREE.Group();
  head.position.set(0, 1.5, 0);
  frame.add(head);
  const skull = latheFromProfile(SKULL_PROFILE, skin, 56);
  skull.scale.set(0.88, 1, 1.12);
  head.add(skull);

  // ---- eyes (phase 2 rebuild) ----
  // Each eye is a small rig: a sclera ball, an iris group that
  // rotates for gaze, and a skin lid that does the blinking. The
  // iris stack (limbal ring, iris, pupil, cornea) is built as
  // concentric spherical caps around the ball — a flat disc at
  // the front of a squashed sphere sinks under the surface at
  // its center and floats at its edges, while caps hug the ball
  // at a uniform offset and pivot correctly with the gaze. Size
  // and shape come from the character vector via applyFace(),
  // which scales every shell with the same (1.3, eyeShape, 0.62).
  interface EyeRig {
    group: THREE.Group;
    shells: THREE.Mesh[];
    iris: THREE.Group;
    lid: THREE.Group;
    lidMesh: THREE.Mesh;
  }
  function buildEye(): EyeRig {
    const group = new THREE.Group();
    const ball = mesh(new THREE.SphereGeometry(0.0135, 24, 16), scleraMat, 0, 0, 0);
    ball.castShadow = false;
    group.add(ball);
    const iris = new THREE.Group();
    const cap = (radius: number, theta: number, material: THREE.Material): THREE.Mesh => {
      const geo = new THREE.SphereGeometry(radius, 24, 12, 0, Math.PI * 2, 0, theta);
      geo.rotateX(Math.PI / 2); // sphere caps grow from +Y; face them +Z
      const m = mesh(geo, material, 0, 0, 0);
      m.castShadow = false;
      return m;
    };
    const ring = cap(0.0139, 0.46, limbalMat);
    const irisCap = cap(0.01405, 0.4, eyeMat);
    const pupil = cap(0.0142, 0.19, pupilMat);
    const cornea = cap(0.0149, 0.52, corneaMat);
    iris.add(ring, irisCap, pupil, cornea);
    group.add(iris);
    const lid = new THREE.Group();
    const lidMesh = mesh(
      new THREE.SphereGeometry(0.0148, 20, 12, 0, Math.PI * 2, 0, 1.25),
      skin,
      0,
      0,
      0,
    );
    lidMesh.castShadow = false;
    lid.add(lidMesh);
    lid.rotation.x = -0.18;
    group.add(lid);
    head.add(group);
    return { group, shells: [ball, ring, irisCap, pupil, cornea], iris, lid, lidMesh };
  }
  const eyeL = buildEye();
  const eyeR = buildEye();

  // brows, nose, lips, ears — kept quiet; a mannequin face, not a doll's.
  // References are kept so applyFace() can pose them from the
  // character vector.
  const browL = mesh(new THREE.TorusGeometry(0.02, 0.0028, 8, 20, 1.5), hairMat);
  const browR = mesh(new THREE.TorusGeometry(0.02, 0.0028, 8, 20, 1.5), hairMat);
  const earL = mesh(new THREE.SphereGeometry(1, 12, 10), skin);
  const earR = mesh(new THREE.SphereGeometry(1, 12, 10), skin);
  for (const m of [browL, browR, earL, earR]) {
    m.castShadow = false;
    head.add(m);
  }
  earL.scale.set(0.0075, 0.0155, 0.011);
  earR.scale.set(0.0075, 0.0155, 0.011);
  const nose = mesh(new THREE.SphereGeometry(1, 14, 10), skin, 0, 0.08, 0.0855);
  nose.castShadow = false;
  head.add(nose);
  const lipMat = new THREE.MeshStandardMaterial({
    color: '#a96052',
    roughness: 0.45,
    envMapIntensity: 0.6,
  });
  const lips = mesh(new THREE.SphereGeometry(1, 18, 12), lipMat, 0, 0.047, 0.0785);
  lips.castShadow = false;
  head.add(lips);

  // ---- face parameters -> transforms ----
  // Every phase-2 face parameter lands here as a position, scale
  // or rotation of an existing part — the audit (§5.8) kept only
  // what the lathe head can express this way. The asymmetry
  // pattern is fixed and millimetre-scale: left eye a touch
  // higher, right brow a touch higher, nose and lips shifted by
  // fractions of a millimetre, left ear a touch higher. The
  // `asymmetry` parameter scales the whole pattern.
  function applyFace(c: CharacterParams): void {
    const a = c.asymmetry;
    skull.scale.set(0.88 * c.faceWidth, 1, 1.12);
    // Features sit on the skull, so a wider face carries the eyes
    // and brows part of the way out with it.
    const follow = 1 + (c.faceWidth - 1) * 0.6;
    const eyes: Array<[EyeRig, -1 | 1]> = [
      [eyeL, -1],
      [eyeR, 1],
    ];
    for (const [eye, side] of eyes) {
      // z: the ball must clear the skull surface on the nose side
      // too — set deeper, the skull hides the inner half of the
      // ball and the centered iris reads as cross-eyed.
      eye.group.position.set(
        side * 0.034 * c.eyeSpacing * follow,
        0.115 + c.eyeHeight + (side < 0 ? 0.0011 * a : -0.0011 * a),
        0.079,
      );
      eye.group.rotation.z = side * c.eyeTilt;
      eye.group.scale.setScalar(c.eyeSize);
      for (const shell of eye.shells) shell.scale.set(1.3, c.eyeShape, 0.62);
      eye.lidMesh.scale.set(1.3, c.eyeShape + 0.04, 0.66);
    }
    const brows: Array<[THREE.Mesh, -1 | 1]> = [
      [browL, -1],
      [browR, 1],
    ];
    for (const [brow, side] of brows) {
      brow.position.set(
        side * 0.0345 * c.eyeSpacing * follow,
        0.15 + c.browHeight + (side < 0 ? -0.0014 * a : 0.0014 * a),
        0.0765,
      );
      // Center the torus arc at the top (a brow's ⌒), tilted onto
      // the brow ridge, outer end a touch lower than the inner
      // end; browTilt then raises/lowers the outer ends.
      brow.rotation.set(-0.3, 0, Math.PI / 2 - 0.75 - side * 0.09 + side * c.browTilt * 0.7);
    }
    earL.position.set(-0.0695 * c.faceWidth, 0.105 + 0.0016 * a, -0.002);
    earR.position.set(0.0695 * c.faceWidth, 0.105, -0.002);
    nose.position.x = 0.0009 * a;
    nose.position.z = 0.0855 + (c.noseProminence - 1) * 0.004;
    nose.scale.set(0.0105 * c.noseWidth, 0.015, 0.009 * c.noseProminence);
    lips.position.x = -0.0007 * a;
    lips.scale.set(0.0195 * c.lipWidth, 0.0062 * c.lipFullness, 0.0068 * c.lipFullness);
  }
  applyFace(character);

  // hair (style is a character parameter; rebuilt by setCharacter)
  let hairGroup = buildHair(character.hairStyle, hairMat, character.faceWidth);
  head.add(hairGroup);

  const hatAnchor = new THREE.Group();
  hatAnchor.position.set(0, 0.242, 0);
  head.add(hatAnchor);

  const glassesAnchor = new THREE.Group();
  glassesAnchor.position.set(0, 0.115, 0.0905);
  head.add(glassesAnchor);

  // ---- character regeneration ----
  let current: CharacterParams = { ...character };

  function applyHeight(height: number): void {
    const sy = height / BASE_HEIGHT;
    const sxz = 1 + (sy - 1) * 0.45;
    frame.scale.set(sxz, sy, sxz);
  }
  applyHeight(character.height);

  function setCharacter(next: CharacterParams): void {
    skin.color.set(skinColorForTone(next.skinTone));
    hairMat.color.set(next.hairColor);
    eyeMat.color.set(next.eyeColor);
    applyFace(next);
    // The hair shell follows the skull, so it is rebuilt when the
    // style changes — and when the face width changes under it.
    if (next.hairStyle !== current.hairStyle || next.faceWidth !== current.faceWidth) {
      head.remove(hairGroup);
      hairGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) obj.geometry.dispose();
      });
      hairGroup = buildHair(next.hairStyle, hairMat, next.faceWidth);
      head.add(hairGroup);
    }
    if (next.height !== current.height) applyHeight(next.height);
    current = { ...next };
  }

  // ---- poses & idle motion ----
  let pose: PoseId = 'stand';
  let target = poseTargets('stand');
  let lastTick: number | null = null;

  function snapTo(angles: JointAngles): void {
    armL.shoulder.rotation.set(...angles.ls);
    armR.shoulder.rotation.set(...angles.rs);
    armL.elbow.rotation.set(...angles.le);
    armR.elbow.rotation.set(...angles.re);
    head.rotation.set(...angles.head);
  }
  snapTo(target);

  function applyPose(next: PoseId): void {
    pose = next;
    target = poseTargets(next);
  }

  function ease(joint: THREE.Group, a: Vec3, k: number): void {
    joint.rotation.x += (a[0] - joint.rotation.x) * k;
    joint.rotation.y += (a[1] - joint.rotation.y) * k;
    joint.rotation.z += (a[2] - joint.rotation.z) * k;
  }

  // ---- blinking ----
  // Naturalized: the interval varies (2.1–5.7 s, with an occasional
  // quick double blink), and the lid curve closes fast, holds a
  // beat, then opens slowly — the fixed 3.6 s metronome read as
  // mechanical. Both lids share one curve: synchronized, as real
  // blinks are. The schedule uses a seeded LCG so headless
  // verification runs stay comparable.
  let blinkSeed = 987654321;
  const blinkRand = (): number => {
    blinkSeed = (blinkSeed * 1103515245 + 12345) % 2147483648;
    return blinkSeed / 2147483648;
  };
  let nextBlinkAt = 1.6 + blinkRand() * 2;
  let blinkStart = -1;
  let blinkDur = 0.22;

  function blinkAmount(timeSec: number): number {
    if (blinkStart < 0 && timeSec >= nextBlinkAt) {
      blinkStart = timeSec;
      blinkDur = 0.17 + blinkRand() * 0.13;
    }
    if (blinkStart < 0) return 0;
    const u = (timeSec - blinkStart) / blinkDur;
    if (u >= 1) {
      blinkStart = -1;
      nextBlinkAt = timeSec + (blinkRand() < 0.16 ? 0.3 : 2.1 + blinkRand() * 3.6);
      return 0;
    }
    const ss = (x: number): number => {
      const c = Math.min(1, Math.max(0, x));
      return c * c * (3 - 2 * c);
    };
    if (u < 0.38) return ss(u / 0.38); // fast close
    if (u < 0.52) return 1; // brief hold
    return 1 - ss((u - 0.52) / 0.48); // slower open
  }

  // ---- gaze ----
  // The eyes track a world-space target (the camera) with natural
  // saccades: every second or so the gaze makes a quick small
  // jump — mostly re-centering on the target, sometimes a brief
  // glance away — instead of locking on like a turret. This is
  // behavior, not a character parameter (no UI, no seed bytes):
  // in a share card it reads as eye contact, in the app as life.
  // The schedule uses the same kind of seeded LCG as the blink
  // schedule, so verification runs stay comparable.
  let gazeSeed = 135792468;
  const gazeRand = (): number => {
    gazeSeed = (gazeSeed * 1103515245 + 12345) % 2147483648;
    return gazeSeed / 2147483648;
  };
  let saccadeAt = 1.1;
  let saccadeTarget = { x: 0, y: 0 };
  const saccadeCur = { x: 0, y: 0 };
  const gazeLocal = new THREE.Vector3();

  function gazeAngles(timeSec: number, dt: number, target?: THREE.Vector3): { yaw: number; pitch: number } {
    if (timeSec >= saccadeAt) {
      saccadeAt = timeSec + 0.7 + gazeRand() * 1.9;
      const glance = gazeRand() < 0.22;
      saccadeTarget = {
        x: glance ? (gazeRand() - 0.5) * 0.22 : (gazeRand() - 0.5) * 0.05,
        y: glance ? (gazeRand() - 0.5) * 0.1 : (gazeRand() - 0.5) * 0.03,
      };
    }
    const k = 1 - Math.exp(-dt * 22);
    if (k > 0) {
      saccadeCur.x += (saccadeTarget.x - saccadeCur.x) * k;
      saccadeCur.y += (saccadeTarget.y - saccadeCur.y) * k;
    }
    let yaw = 0;
    let pitch = 0;
    if (target) {
      gazeLocal.copy(target);
      head.worldToLocal(gazeLocal);
      // Head origin sits at the neck; the eyes are ~0.115 above it.
      const dy = gazeLocal.y - 0.115;
      yaw = Math.atan2(gazeLocal.x, gazeLocal.z);
      pitch = Math.atan2(dy, Math.hypot(gazeLocal.x, gazeLocal.z));
    }
    const clamp = (v: number, lo: number, hi: number): number =>
      Math.min(hi, Math.max(lo, v));
    return {
      yaw: clamp(yaw, -0.38, 0.38) + saccadeCur.x,
      pitch: clamp(pitch, -0.22, 0.28) + saccadeCur.y,
    };
  }

  function tick(timeSec: number, gazeTarget?: THREE.Vector3): void {
    const dt = lastTick === null ? 0 : Math.min(0.05, Math.max(0, timeSec - lastTick));
    lastTick = timeSec;
    // Barely-there idle sway — a living model, not a bobbing toy.
    root.position.y = BASE_Y + Math.sin(timeSec * 1.5) * 0.0035;
    root.rotation.z = Math.sin(timeSec * 0.6) * 0.004;
    // Pose transition: ease every joint toward the pose target.
    const k = 1 - Math.exp(-dt * 7);
    if (k > 0) {
      const waveZ = pose === 'wave' ? Math.sin(timeSec * 6.5) * 0.18 : 0;
      ease(armL.shoulder, target.ls, k);
      ease(armR.shoulder, [target.rs[0], target.rs[1], target.rs[2] + waveZ], k);
      ease(armL.elbow, target.le, k);
      ease(armR.elbow, target.re, k);
      ease(head, target.head, k);
    }
    // Blink: both lids on the same natural curve.
    const blink = blinkAmount(timeSec);
    eyeL.lid.rotation.x = -0.18 + blink * 0.95;
    eyeR.lid.rotation.x = -0.18 + blink * 0.95;
    // Gaze: both irises share one direction, as real eyes do.
    const g = gazeAngles(timeSec, dt, gazeTarget);
    eyeL.iris.rotation.set(-g.pitch, g.yaw, 0);
    eyeR.iris.rotation.set(-g.pitch, g.yaw, 0);
  }

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
    setCharacter,
    tick,
  };
}
