// Scene setup: a boutique fitting room — wood floor, plaster walls,
// a real mirror, spot lighting — instead of the chibi version's
// pastel void. The room exists to make screenshots (the product's
// whole point) look like a place, with zero art assets: every
// texture is procedural (see textures.ts) and the props are
// primitives dressed in PBR materials.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { fabricTextures, plasterTexture, woodFloorTexture } from './textures';
import { NO_MIRROR_LAYER, XR_QUALITY_STEPS, XR_VIEWPORT_SCALE_MIN, nextXrQualityLevelAfterScale, nextXrViewportScale, xrStartLevel } from './vr';
import { MotionGate } from './shadowgate';

export interface Stage {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  /** The XR player rig: the camera (and the VR controllers) are
   *  parented to this group, so moving/rotating it moves the
   *  viewpoint in VR. At the identity transform on the flat
   *  screen, so the flat framing is exactly what it always was.
   *  On session start it is placed at the spawn point in front
   *  of the podium; snap turns (vr.ts) orbit it around the
   *  podium. */
  player: THREE.Group;
  /** Whether an immersive VR session is currently presenting. */
  isPresenting(): boolean;
  /** The XR quality ladder's current level (vr.ts): 0 on the
   *  flat screen and at session start; steps down on its own
   *  while presenting if frame times stay over budget. */
  xrQualityLevel(): number;
  /** The viewport scale last asked of the headset (vr.ts
   *  nextXrViewportScale): 1 on the flat screen, at session start,
   *  and where the browser has no XRView.requestViewportScale. */
  xrViewportScale(): number;
  tick(timeSec: number): void;
  resize(): void;
  resetView(): void;
  /** Reframe the room around a subject of this height (meters):
   *  the camera's home position and orbit target track it, and the
   *  mirror grows/shrinks so it always covers the full figure. */
  setSubjectHeight(heightM: number): void;
  /** Draw-call cost of one frame, measured on the spot: with the
   *  mirror's reflection pass and without it. The mirror roughly
   *  doubles the scene's draw calls — the number the XR mirror
   *  resolution decision (below) is based on. `stereo` is the
   *  same frame drawn through a two-eye ArrayCamera, the path
   *  three.js takes in an XR session (each eye draws the scene
   *  and its own reflection pass). */
  measureDrawCalls(): { withMirror: number; withoutMirror: number; triangles: number; stereo: number };
  /** Redraw the shadow map on the next frame (something that casts
   *  a shadow changed in a way the motion watch cannot see: a
   *  garment shown or hidden, an accessory swapped). */
  invalidateShadows(): void;
  /** Watch this subtree's bones: the shadow map is redrawn when
   *  they move (pose change, sway, spin, rescale). */
  watchShadowCasters(root: THREE.Object3D): void;
  /** Shadow map redraw requests so far, and its current size / filter. */
  shadowStats(): { updates: number; mapPx: number; soft: boolean };
}

/** Where a VR user starts: standing on the floor 1.9 m in front
 *  of the podium, facing the person. local-floor puts the
 *  play-space origin at the user's floor point, so the player
 *  rig is offset by this much and the person is at eye range. */
export const XR_SPAWN = { x: 0, z: 1.9 };
/** Mirror reflection resolution: full on the flat screen (the
 *  share photo is the product's calling card), halved per side
 *  in XR, where the reflection pass is paid per eye at headset
 *  frame rates. See DESIGN.md §22. */
export const MIRROR_FLAT_PX = 1024;
export const MIRROR_XR_PX = 512;
/** Shadow map edge on the flat screen (XR steps: vr.ts). */
export const SHADOW_FLAT_PX = 2048;

/** Fixed dynamic-light budget (backlog #8): 1 shadow-casting key
 *  light + 1 fill light. Room lighting lives in emissive meshes and
 *  the PMREM environment so shaders never recompile for extra lights. */
export const DYNAMIC_LIGHT_BUDGET = {
  total: 2,
  shadowCasting: 1,
  fill: 1,
} as const;

export interface LightAudit {
  total: number;
  shadowCasting: number;
  spot: number;
  directional: number;
  point: number;
  hemisphere: number;
}

/** Count dynamic lights in a scene subtree for budget verification. */
export function auditSceneLights(root: THREE.Object3D): LightAudit {
  const out: LightAudit = { total: 0, shadowCasting: 0, spot: 0, directional: 0, point: 0, hemisphere: 0 };
  root.traverse((o) => {
    const l = o as THREE.Light;
    if (!l.isLight) return;
    out.total += 1;
    if (l.castShadow) out.shadowCasting += 1;
    if ((l as THREE.SpotLight).isSpotLight) out.spot += 1;
    else if ((l as THREE.DirectionalLight).isDirectionalLight) out.directional += 1;
    else if ((l as THREE.PointLight).isPointLight) out.point += 1;
    else if ((l as THREE.HemisphereLight).isHemisphereLight) out.hemisphere += 1;
  });
  return out;
}

/** Procedural environment scene baked into PMREM: starts from
 *  three.js's RoomEnvironment and adds warm sconce bounce panels and
 *  a cool rear rim panel so ambient fill, rim highlights, and room
 *  warmth come from IBL instead of dynamic lights. */
export function createBoutiqueEnvironment(): THREE.Scene {
  const env = new RoomEnvironment();
  const addPanel = (color: string, intensity: number, w: number, h: number, pos: [number, number, number], target: [number, number, number]) => {
    const mat = new THREE.MeshStandardMaterial({
      color: '#000000',
      emissive: color,
      emissiveIntensity: intensity,
      roughness: 1,
      metalness: 0,
      side: THREE.DoubleSide,
    });
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    panel.position.set(...pos);
    panel.lookAt(...target);
    env.add(panel);
  };
  // Cool back rim panel (replaces the old rim SpotLight).
  addPanel('#dfe9ff', 3.5, 4.0, 2.6, [-3.0, 3.2, -3.5], [0, 1.2, 0]);
  // Warm front sconce panels (replaces the two sconce PointLights).
  addPanel('#ffd5a3', 2.4, 1.8, 1.8, [-2.2, 2.4, 4.5], [0, 1.2, 0]);
  addPanel('#ffd5a3', 2.4, 1.8, 1.8, [2.2, 2.4, 4.5], [0, 1.2, 0]);
  // Soft warm ceiling bounce (absorbs the old HemisphereLight).
  addPanel('#fff4e2', 1.4, 7.0, 7.0, [0, 5.2, 0.5], [0, 0, 0.5]);
  return env;
}

/** Add the fixed two-light dynamic rig (1 shadow-casting key SpotLight
 *  + 1 non-shadow-casting fill DirectionalLight). */
export function buildLightingRig(scene: THREE.Scene): { key: THREE.SpotLight; fill: THREE.DirectionalLight } {
  const key = new THREE.SpotLight('#fff1dd', 150, 0, 0.48, 0.82, 1.8);
  key.name = 'key-light';
  key.position.set(1.8, 3.2, 2.4);
  key.castShadow = true;
  key.shadow.mapSize.set(SHADOW_FLAT_PX, SHADOW_FLAT_PX);
  key.shadow.bias = -0.0003;
  key.shadow.normalBias = 0.02;
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 12;
  key.target.position.set(0, 0.9, 0);
  scene.add(key, key.target);

  const fill = new THREE.DirectionalLight('#f4ece4', 0.65);
  fill.name = 'fill-light';
  fill.castShadow = false;
  fill.position.set(-2.5, 2.0, 3.0);
  scene.add(fill);
  return { key, fill };
}

/** Radial-gradient alpha texture for the emissive sconce wall halos
 *  (replaces the old sconce PointLights' plaster wash). */
function sconceHaloTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(64, 64, 2, 64, 64, 64);
  g.addColorStop(0, 'rgba(255, 224, 178, 0.55)');
  g.addColorStop(0.45, 'rgba(255, 207, 153, 0.22)');
  g.addColorStop(1, 'rgba(255, 207, 153, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function mesh(geo: THREE.BufferGeometry, material: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  return m;
}

/** Bake a set of already-placed meshes into one merged mesh in
 *  `root`'s local space (draw-call budget, WORLD-CLASS M2). The
 *  parts must already sit in root's subtree with their final
 *  transforms; their world matrices are baked into the merged
 *  geometry exactly, so the picture does not change — only the
 *  number of meshes does. The caller removes the original parts
 *  and adds the returned mesh to root. Only for geometry that
 *  never moves again: anything re-laid-out at runtime (the
 *  mirror frame) stays unmerged. */
function mergeParts(parts: THREE.Mesh[], root: THREE.Object3D, material: THREE.Material): THREE.Mesh {
  root.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
  const geos = parts.map((p) => {
    const g = p.geometry.clone();
    g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, p.matrixWorld));
    return g;
  });
  const merged = mergeGeometries(geos, false);
  for (const g of geos) g.dispose();
  return new THREE.Mesh(merged!, material);
}

export function createStage(canvas: HTMLCanvasElement): Stage {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    // Required so the share-card export can read the rendered frame.
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // The shadow map is redrawn on demand, not every frame: see
  // "shadow map on demand" below and shadowgate.ts.
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  // WebXR: VR dress-up is the product's main act (mi's
  // direction). The session itself is requested from main.ts
  // (the button lives there); the stage only prepares the
  // renderer and reacts to the session starting/ending.
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local-floor');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#241f1c');

  // Image-based lighting from a procedural boutique room environment
  // (warm sconces + cool rim + ceiling bounce baked into PMREM):
  // carries ambient/room light without dynamic Point/Hemisphere lights.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = createBoutiqueEnvironment();
  scene.environment = pmrem.fromScene(envScene, 0.04).texture;
  envScene.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) {
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    }
  });
  pmrem.dispose();
  scene.environmentIntensity = 0.72;

  // The framing is expressed relative to the subject's height so a
  // height change (character parameter) reframes instead of cropping.
  let subjectHeight = 1.74;
  const homePos = (): THREE.Vector3 => new THREE.Vector3(0, subjectHeight * 0.76, 3.9);
  const homeTarget = (): THREE.Vector3 => new THREE.Vector3(0, subjectHeight * 0.54, 0);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
  camera.position.copy(homePos());
  // The main view (and the XR eyes, which inherit this mask) also
  // draws what is kept out of the mirror's reflection pass.
  camera.layers.enable(NO_MIRROR_LAYER);

  // The player rig: in VR the headset pose is expressed in the
  // camera's parent space, so the camera (and, in vr.ts, the
  // controllers) ride on this group. Identity on the flat
  // screen; placed at the spawn point while presenting.
  const player = new THREE.Group();
  player.name = 'player';
  scene.add(player);
  player.add(camera);
  let presenting = false;

  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(homeTarget());
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  // Close enough to read the face: since phase 2 the face is
  // editable, and editing it from full-body distance is pointless.
  controls.minDistance = 0.5;
  controls.maxDistance = 4.8;
  controls.minPolarAngle = 0.35;
  controls.maxPolarAngle = Math.PI * 0.56;
  controls.enablePan = false;
  controls.autoRotateSpeed = 2.4;

  // ---- lights (fixed 2-light budget: 1 shadow key + 1 fill) ----
  const { key } = buildLightingRig(scene);

  // ---- materials ----
  const brass = new THREE.MeshStandardMaterial({
    color: '#b08d57',
    roughness: 0.3,
    metalness: 1,
    envMapIntensity: 1.2,
  });
  const wallMat = new THREE.MeshStandardMaterial({
    map: plasterTexture(),
    roughness: 0.95,
    envMapIntensity: 0.52,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: '#e2d7c4',
    roughness: 0.85,
    envMapIntensity: 0.52,
  });

  // ---- floor & walls ----
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(13, 10),
    new THREE.MeshPhysicalMaterial({
      map: woodFloorTexture(),
      roughness: 0.38,
      clearcoat: 0.25,
      clearcoatRoughness: 0.35,
      envMapIntensity: 0.7,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, 0.6);
  floor.receiveShadow = true;
  scene.add(floor);

  // The four plaster walls share one material and never move,
  // so they are baked into a single merged mesh (M2 budget);
  // transforms are baked exactly, so the room is unchanged.
  const backWall = mesh(new THREE.PlaneGeometry(13, 3.8), wallMat, 0, 1.9, -2.6);
  // Front wall behind the camera: never seen directly, but the
  // mirror reflects it — without it the mirror reflects void and
  // reads as a black hole instead of glass.
  const frontWall = mesh(new THREE.PlaneGeometry(13, 5.4), wallMat, 0, 2.7, 5.5);
  frontWall.rotation.y = Math.PI;
  const wallParts = [backWall, frontWall];
  for (const side of [-1, 1]) {
    const wall = mesh(new THREE.PlaneGeometry(10, 3.8), wallMat, side * 4.6, 1.9, 0.6);
    wall.rotation.y = -side * Math.PI * 0.5;
    wallParts.push(wall);
  }
  for (const p of wallParts) scene.add(p);
  const walls = mergeParts(wallParts, scene, wallMat);
  walls.receiveShadow = true;
  for (const p of wallParts) scene.remove(p);
  scene.add(walls);
  // Ceiling: on the flat screen the camera never looks up past
  // the wall tops, but in VR the user stands *inside* the room
  // and does. A plain plaster slab at wall height closes the
  // room; without it the headset shows the background void.
  // (Kept separate from the walls: it does not receive shadows.)
  const ceiling = mesh(new THREE.PlaneGeometry(13, 10), wallMat, 0, 3.8, 0.6);
  ceiling.rotation.x = Math.PI / 2;
  scene.add(ceiling);
  // Trim — baseboards, panel moulding, picture rail — is one
  // material and never moves: merged into a single mesh too.
  const trimParts: THREE.Mesh[] = [
    mesh(new THREE.BoxGeometry(13, 0.09, 0.02), trimMat, 0, 0.045, 5.48),
    mesh(new THREE.BoxGeometry(13, 0.09, 0.02), trimMat, 0, 0.045, -2.58),
    mesh(new THREE.BoxGeometry(13, 0.05, 0.018), trimMat, 0, 2.95, -2.585),
  ];
  for (const x of [-3.4, -1.7, 0, 1.7, 3.4]) {
    const strip = mesh(new THREE.BoxGeometry(0.05, 3.2, 0.018), trimMat, x, 1.75, 5.485);
    strip.rotation.y = Math.PI;
    trimParts.push(strip);
  }
  for (const x of [-3.4, -1.9, 1.9, 3.4]) {
    trimParts.push(mesh(new THREE.BoxGeometry(0.05, 3.2, 0.018), trimMat, x, 1.75, -2.585));
  }
  for (const side of [-1, 1]) {
    // The side baseboards run along the side walls (their length
    // is the wall's length). They were originally placed
    // unrotated, which laid them across the floor — mostly hidden
    // by the podium, but a stray strip on the floorboards.
    // Rotated onto the wall here, as intended.
    const base = mesh(new THREE.BoxGeometry(10, 0.09, 0.02), trimMat, side * 4.58, 0.045, 0.6);
    base.rotation.y = Math.PI / 2;
    trimParts.push(base);
  }
  for (const p of trimParts) scene.add(p);
  const trim = mergeParts(trimParts, scene, trimMat);
  for (const p of trimParts) scene.remove(p);
  scene.add(trim);
  // Sconces on the front wall: emissive bulbs + soft emissive plaster
  // wash halos give the mirror warm reflections with zero dynamic
  // PointLights (backlog #8). The glow bulbs merge into one mesh,
  // the brass stems join the scene-level brass merge at the podium.
  const glowMat = new THREE.MeshStandardMaterial({
    color: '#ffd9a0',
    emissive: '#ffcf99',
    emissiveIntensity: 2.2,
    roughness: 0.3,
    metalness: 0,
  });
  const haloMat = new THREE.MeshBasicMaterial({
    map: sconceHaloTexture(),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const glowParts: THREE.Mesh[] = [];
  const haloParts: THREE.Mesh[] = [];
  const brassParts: THREE.Mesh[] = [];
  for (const x of [-1.7, 1.7]) {
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.045, 14, 10), glowMat);
    glow.position.set(x, 2.25, 5.42);
    glowParts.push(glow);
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.5), haloMat);
    halo.position.set(x, 2.25, 5.475);
    halo.rotation.y = Math.PI;
    haloParts.push(halo);
    brassParts.push(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.1, 8), brass, x, 2.36, 5.44));
  }
  for (const p of glowParts) scene.add(p);
  const glows = mergeParts(glowParts, scene, glowMat);
  for (const p of glowParts) scene.remove(p);
  scene.add(glows);
  for (const p of haloParts) scene.add(p);
  const halos = mergeParts(haloParts, scene, haloMat);
  for (const p of haloParts) scene.remove(p);
  scene.add(halos);

  // ---- the mirror (a real reflection — it is a fitting room) ----
  const mirror = new Reflector(new THREE.PlaneGeometry(1.5, 2.3), {
    clipBias: 0.003,
    textureWidth: MIRROR_FLAT_PX,
    textureHeight: MIRROR_FLAT_PX,
    color: 0xc9ced2,
  });
  mirror.position.set(0, 1.42, -2.575);
  scene.add(mirror);
  // The frame's four bars are instances of one unit box (one draw
  // call); layoutMirror() below places and sizes them. The frame
  // lies in the mirror's own plane, so it is never in a reflection.
  const mirrorFrame = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), brass, 4);
  mirrorFrame.layers.set(NO_MIRROR_LAYER);
  scene.add(mirrorFrame);
  const barMatrix = new THREE.Matrix4();
  function setBar(i: number, x: number, y: number, w: number, h: number): void {
    barMatrix.makeScale(w, h, 0.035).setPosition(x, y, -2.565);
    mirrorFrame.setMatrixAt(i, barMatrix);
  }

  // The mirror follows the subject's height: its glass and frame
  // are re-laid-out so the full figure stays reflectable, from the
  // shortest to the tallest character the parameters allow.
  function layoutMirror(heightM: number): void {
    const mirrorH = heightM + 0.62;
    const bottom = 0.25;
    const centerY = bottom + mirrorH / 2;
    mirror.geometry.dispose();
    mirror.geometry = new THREE.PlaneGeometry(1.5, mirrorH);
    mirror.position.y = centerY;
    setBar(0, 0, bottom + mirrorH + 0.0275, 1.62, 0.055);
    setBar(1, 0, bottom - 0.0275, 1.62, 0.055);
    setBar(2, -0.81, centerY, 0.055, mirrorH + 0.11);
    setBar(3, 0.81, centerY, 0.055, mirrorH + 0.11);
    mirrorFrame.instanceMatrix.needsUpdate = true;
    mirrorFrame.computeBoundingSphere();
  }
  layoutMirror(subjectHeight);

  // ---- podium (top surface at y=0.12 — the avatar stands on it) ----
  const podium = new THREE.Mesh(
    new THREE.CylinderGeometry(1.05, 1.14, 0.12, 56),
    new THREE.MeshPhysicalMaterial({
      color: '#e9e3d7',
      roughness: 0.22,
      clearcoat: 0.3,
      clearcoatRoughness: 0.25,
      envMapIntensity: 0.9,
    }),
  );
  podium.position.y = 0.06;
  podium.receiveShadow = true;
  scene.add(podium);
  const inlay = mesh(new THREE.TorusGeometry(1.0, 0.007, 8, 72), brass, 0, 0.118, 0);
  inlay.rotation.x = Math.PI / 2;
  brassParts.push(inlay);
  for (const p of brassParts) scene.add(p);
  const brassMerged = mergeParts(brassParts, scene, brass);
  for (const p of brassParts) scene.remove(p);
  scene.add(brassMerged);

  // ---- clothing rack prop (left) ----
  const rack = new THREE.Group();
  rack.position.set(-2.35, 0, -1.15);
  rack.rotation.y = 0.45;
  // The rack's brass (posts, feet, bar, hooks) is merged into
  // one mesh in rack space; the garments keep their own
  // materials and stay separate.
  const rackBrass: THREE.Mesh[] = [];
  for (const side of [-1, 1]) {
    rackBrass.push(mesh(new THREE.CylinderGeometry(0.016, 0.016, 1.5, 12), brass, side * 0.65, 0.75, 0));
    rackBrass.push(mesh(new THREE.BoxGeometry(0.05, 0.03, 0.55), brass, side * 0.65, 0.015, 0));
  }
  const bar = mesh(new THREE.CylinderGeometry(0.014, 0.014, 1.36, 12), brass, 0, 1.5, 0);
  bar.rotation.z = Math.PI / 2;
  rackBrass.push(bar);
  // The three hanging garments are the same shape in three
  // colors: instances of one mesh (one draw call), tinted by
  // instance color.
  const garmentColors = ['#97a08a', '#d9cfc0', '#4a4a52'];
  const rackTex = fabricTextures([1.5, 1.5]);
  const rackGarments = new THREE.InstancedMesh(
    new THREE.LatheGeometry(
      [
        new THREE.Vector2(0.012, 0),
        new THREE.Vector2(0.1, -0.07),
        new THREE.Vector2(0.055, -0.18),
        new THREE.Vector2(0.135, -0.54),
      ],
      24,
    ),
    new THREE.MeshStandardMaterial({
      map: rackTex.map,
      bumpMap: rackTex.bump,
      bumpScale: 0.3,
      roughness: 0.9,
      envMapIntensity: 0.3,
      side: THREE.DoubleSide,
    }),
    garmentColors.length,
  );
  rackGarments.castShadow = true;
  const garmentMatrix = new THREE.Matrix4();
  garmentColors.forEach((color, i) => {
    const x = -0.4 + i * 0.4;
    rackBrass.push(mesh(new THREE.TorusGeometry(0.035, 0.004, 6, 14, Math.PI), brass, x, 1.5, 0));
    rackGarments.setMatrixAt(i, garmentMatrix.makeScale(1, 1, 0.45).setPosition(x, 1.47, 0));
    rackGarments.setColorAt(i, new THREE.Color(color));
  });
  rackGarments.computeBoundingSphere();
  rack.add(rackGarments);
  for (const p of rackBrass) rack.add(p);
  const rackBrassMerged = mergeParts(rackBrass, rack, brass);
  for (const p of rackBrass) rack.remove(p);
  rack.add(rackBrassMerged);
  scene.add(rack);

  // ---- plant prop (right) ----
  const plant = new THREE.Group();
  plant.position.set(2.45, 0, -1.5);
  const pot = mesh(
    new THREE.CylinderGeometry(0.17, 0.125, 0.3, 24),
    new THREE.MeshStandardMaterial({ color: '#a9603c', roughness: 0.8, envMapIntensity: 0.3 }),
    0,
    0.15,
    0,
  );
  pot.castShadow = true;
  plant.add(pot);
  plant.add(
    mesh(
      new THREE.CylinderGeometry(0.018, 0.026, 0.35, 10),
      new THREE.MeshStandardMaterial({ color: '#6b4a2f', roughness: 0.9 }),
      0,
      0.45,
      0,
    ),
  );
  const leafMat = new THREE.MeshStandardMaterial({
    color: '#5a7247',
    roughness: 0.7,
    envMapIntensity: 0.4,
  });
  // The seven leaves share one material and never move: baked
  // into a single mesh (their pivot transforms are preserved in
  // the baked geometry).
  const leafParts: THREE.Mesh[] = [];
  const leafPivots: THREE.Group[] = [];
  for (let i = 0; i < 7; i++) {
    const leaf = mesh(new THREE.SphereGeometry(1, 12, 8), leafMat, 0, 0.72, 0);
    leaf.scale.set(0.035, 0.17, 0.07);
    const pivot = new THREE.Group();
    pivot.position.set(0, 0.55, 0);
    leaf.position.y = 0.17;
    pivot.rotation.set(0.5 + (i % 3) * 0.22, (i / 7) * Math.PI * 2, 0);
    pivot.add(leaf);
    plant.add(pivot);
    leafParts.push(leaf);
    leafPivots.push(pivot);
  }
  const leaves = mergeParts(leafParts, plant, leafMat);
  for (const p of leafPivots) plant.remove(p);
  plant.add(leaves);
  scene.add(plant);

  function resize(): void {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function resetView(): void {
    camera.position.copy(homePos());
    controls.target.copy(homeTarget());
  }

  function setSubjectHeight(heightM: number): void {
    if (Math.abs(heightM - subjectHeight) < 0.001) return;
    subjectHeight = heightM;
    layoutMirror(heightM);
    controls.target.y = heightM * 0.54;
    // While presenting, the flat camera's local position is not
    // the viewpoint (the headset is); moving it would only
    // disturb the framing the user returns to.
    if (!presenting) camera.position.y = heightM * 0.76;
  }

  function setMirrorResolution(px: number): void {
    mirror.getRenderTarget().setSize(px, px);
  }

  // ---- XR quality ladder (WORLD-CLASS.md M2) ----
  // The ladder's steps and decision rule are pure logic in
  // vr.ts; the stage applies them. Level 0 is the session-start
  // state (and must agree with MIRROR_XR_PX above). While
  // presenting, tick() averages frame times over a window and
  // steps the level before the frame rate breaks; on end,
  // everything is restored, so the flat screen resumes exactly
  // where it was.
  let xrQuality = 0;
  /** The best level this session may hold (vr.ts xrStartLevel). */
  let xrFloor = 0;
  let frameTimeSum = 0;
  let frameCount = 0;
  let lastFrameAt = -1;
  const XR_EVAL_FRAMES = 90;
  // ---- XR dynamic resolution ----
  // Decided on a shorter window than the ladder, and asked of every
  // view on every frame (a request lasts one frame's getViewport).
  const XR_SCALE_EVAL_FRAMES = 18;
  let xrScale = 1;
  let xrScaleSupported = false;
  let scaleTimeSum = 0;
  let scaleFrames = 0;

  /** The current frame's views, where the browser can scale them. */
  function scalableViews(): readonly XRView[] {
    const frame = renderer.xr.getFrame() as XRFrame | null;
    const space = renderer.xr.getReferenceSpace();
    const views = (frame && space && frame.getViewerPose(space)?.views) || [];
    return views.length > 0 && typeof views[0].requestViewportScale === 'function' ? views : [];
  }

  // ---- shadow map on demand ----
  // autoUpdate is off; the map is redrawn when (a) a watched bone
  // moved more than SHADOW_MOVE_EPS since the map was last drawn,
  // (b) invalidateShadows() was called, or (c) the map's size /
  // filter / light changed. Bone positions are read from
  // matrixWorld as left by the previous frame's render, so the
  // check costs a few dozen float compares and no matrix work.
  const shadowGate = new MotionGate();
  let casterRoot: THREE.Object3D | null = null;
  let casterBones: THREE.Object3D[] = [];
  let casterSamples = new Float32Array(0);
  let shadowUpdates = 0;

  function invalidateShadows(): void {
    if (!renderer.shadowMap.needsUpdate) shadowUpdates += 1;
    renderer.shadowMap.needsUpdate = true;
  }

  function watchShadowCasters(root: THREE.Object3D): void {
    casterRoot = root;
    casterBones = [];
    invalidateShadows();
  }

  function attached(obj: THREE.Object3D, root: THREE.Object3D): boolean {
    for (let o: THREE.Object3D | null = obj; o; o = o.parent) if (o === root) return true;
    return false;
  }

  function checkShadowCasters(): void {
    if (!casterRoot) return;
    // The figure is replaced when the body changes: re-collect.
    if (casterBones.length === 0 || !attached(casterBones[0], casterRoot)) {
      casterBones = [];
      casterRoot.traverse((o) => {
        if ((o as THREE.Bone).isBone) casterBones.push(o);
      });
      casterSamples = new Float32Array(casterBones.length * 3);
      shadowGate.reset();
      if (casterBones.length === 0) return;
    }
    for (let i = 0; i < casterBones.length; i++) {
      const e = casterBones[i].matrixWorld.elements;
      casterSamples[i * 3] = e[12];
      casterSamples[i * 3 + 1] = e[13];
      casterSamples[i * 3 + 2] = e[14];
    }
    if (shadowGate.moved(casterSamples)) invalidateShadows();
  }

  /** Shadow map size and filter. Changing the filter changes the
   *  lit materials' shader variant, so they are flagged to rebuild. */
  function setShadowQuality(px: number, soft: boolean): void {
    const type = soft ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
    if (key.shadow.mapSize.x !== px) {
      key.shadow.mapSize.set(px, px);
      key.shadow.map?.dispose();
      key.shadow.map = null;
    }
    if (renderer.shadowMap.type !== type) {
      renderer.shadowMap.type = type;
      scene.traverse((o) => {
        const mat = (o as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
        if (!mat) return;
        for (const m of Array.isArray(mat) ? mat : [mat]) m.needsUpdate = true;
      });
    }
    invalidateShadows();
  }

  function shadowStats(): { updates: number; mapPx: number; soft: boolean } {
    return {
      updates: shadowUpdates,
      mapPx: key.shadow.mapSize.x,
      soft: renderer.shadowMap.type === THREE.PCFSoftShadowMap,
    };
  }

  function applyXrQuality(level: number): void {
    const step = XR_QUALITY_STEPS[level];
    if (step.mirrorPx === null) {
      mirror.visible = false;
    } else {
      mirror.visible = true;
      setMirrorResolution(step.mirrorPx);
    }
    key.castShadow = step.shadows;
    setShadowQuality(step.shadowPx, step.shadowSoft);
    try {
      renderer.xr.setFoveation(step.foveation);
    } catch {
      // Foveation is an optimization where the platform offers
      // it; absence is not an error.
    }
  }

  function resetFrameSampling(): void {
    frameTimeSum = 0;
    frameCount = 0;
    lastFrameAt = -1;
    scaleTimeSum = 0;
    scaleFrames = 0;
  }

  // ---- XR session lifecycle ----
  // On start: the player rig goes to the spawn point in front
  // of the podium, the orbit controls stand down (the headset
  // owns the camera), and the quality ladder takes its top step
  // (mirror at XR resolution, fixed foveation trimming the
  // periphery on standalone headsets).
  renderer.xr.addEventListener('sessionstart', () => {
    presenting = true;
    player.position.set(XR_SPAWN.x, 0, XR_SPAWN.z);
    player.rotation.set(0, 0, 0);
    controls.enabled = false;
    xrFloor = xrStartLevel(navigator.userAgent);
    xrQuality = xrFloor;
    xrScale = 1;
    xrScaleSupported = false;
    resetFrameSampling();
    applyXrQuality(xrQuality);
  });
  renderer.xr.addEventListener('sessionend', () => {
    presenting = false;
    player.position.set(0, 0, 0);
    player.rotation.set(0, 0, 0);
    controls.enabled = true;
    xrQuality = 0;
    xrScale = 1;
    xrScaleSupported = false;
    resetFrameSampling();
    mirror.visible = true;
    key.castShadow = true;
    setShadowQuality(SHADOW_FLAT_PX, true);
    setMirrorResolution(MIRROR_FLAT_PX);
    try {
      renderer.xr.setFoveation(1);
    } catch {
      // Same as above.
    }
  });

  function measureDrawCalls(): { withMirror: number; withoutMirror: number; triangles: number; stereo: number } {
    const wasMirrorVisible = mirror.visible;
    const wasAutoReset = renderer.info.autoReset;
    // The Reflector re-renders the scene from the mirrored
    // camera *inside* the main render, and renderer.info resets
    // per render by default — so a naive read counts only the
    // tail of the mirrored frame. With autoReset off, the
    // counter accumulates honestly across both passes.
    renderer.info.autoReset = false;
    mirror.visible = false;
    renderer.info.reset();
    renderer.render(scene, camera);
    const withoutMirror = renderer.info.render.calls;
    const triangles = renderer.info.render.triangles;
    mirror.visible = true;
    renderer.info.reset();
    renderer.render(scene, camera);
    const withMirror = renderer.info.render.calls;
    // Two eyes side by side through an ArrayCamera, as in XR.
    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    camera.updateMatrixWorld();
    const eyes = [-0.032, 0.032].map((dx, i) => {
      const eye = new THREE.PerspectiveCamera(camera.fov, size.x / 2 / size.y, camera.near, camera.far);
      eye.layers.mask = camera.layers.mask;
      camera.matrixWorld.decompose(eye.position, eye.quaternion, eye.scale);
      eye.translateX(dx);
      eye.updateMatrixWorld();
      eye.viewport = new THREE.Vector4((i * size.x) / 2, 0, size.x / 2, size.y);
      return eye;
    });
    const stereoCam = new THREE.ArrayCamera(eyes);
    stereoCam.layers.mask = camera.layers.mask;
    camera.matrixWorld.decompose(stereoCam.position, stereoCam.quaternion, stereoCam.scale);
    stereoCam.projectionMatrix.copy(camera.projectionMatrix);
    stereoCam.projectionMatrixInverse.copy(camera.projectionMatrixInverse);
    renderer.info.reset();
    renderer.render(scene, stereoCam);
    const stereo = renderer.info.render.calls;
    mirror.visible = wasMirrorVisible;
    renderer.info.autoReset = wasAutoReset;
    renderer.info.reset();
    // Leave the canvas showing an ordinary frame.
    renderer.setViewport(0, 0, canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight);
    renderer.render(scene, camera);
    return { withMirror, withoutMirror, triangles, stereo };
  }

  function tick(): void {
    checkShadowCasters();
    // In VR the headset owns the camera; the orbit controls
    // would fight it for the same transform.
    if (!presenting) {
      controls.update();
      return;
    }
    // Feed the quality ladder: windowed average frame time
    // (CPU-side, measured between ticks — a proxy for frame
    // cost, not a GPU timer; see DESIGN.md §22).
    const now = performance.now();
    const views = scalableViews();
    xrScaleSupported = views.length > 0;
    if (lastFrameAt >= 0) {
      scaleTimeSum += now - lastFrameAt;
      scaleFrames += 1;
      if (scaleFrames >= XR_SCALE_EVAL_FRAMES && xrScaleSupported) {
        xrScale = nextXrViewportScale(xrScale, scaleTimeSum / scaleFrames, views[0].recommendedViewportScale);
      }
      if (scaleFrames >= XR_SCALE_EVAL_FRAMES) {
        scaleTimeSum = 0;
        scaleFrames = 0;
      }
      frameTimeSum += now - lastFrameAt;
      frameCount += 1;
      if (frameCount >= XR_EVAL_FRAMES) {
        // Without viewport scaling the ladder runs as it always did.
        const next = nextXrQualityLevelAfterScale(
          xrQuality,
          frameTimeSum / frameCount,
          xrFloor,
          xrScaleSupported ? xrScale : XR_VIEWPORT_SCALE_MIN,
        );
        resetFrameSampling();
        if (next !== xrQuality) {
          xrQuality = next;
          applyXrQuality(next);
        }
      }
    }
    lastFrameAt = now;
    for (const view of views) view.requestViewportScale(xrScale);
  }

  resize();
  return {
    scene,
    camera,
    renderer,
    controls,
    player,
    isPresenting: () => presenting,
    xrQualityLevel: () => xrQuality,
    xrViewportScale: () => xrScale,
    tick,
    resize,
    resetView,
    setSubjectHeight,
    measureDrawCalls,
    invalidateShadows,
    watchShadowCasters,
    shadowStats,
  };
}
