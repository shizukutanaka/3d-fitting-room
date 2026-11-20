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
import { fabricTextures, plasterTexture, woodFloorTexture } from './textures';

export interface Stage {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  tick(timeSec: number): void;
  resize(): void;
  resetView(): void;
  /** Reframe the room around a subject of this height (meters):
   *  the camera's home position and orbit target track it, and the
   *  mirror grows/shrinks so it always covers the full figure. */
  setSubjectHeight(heightM: number): void;
}

function mesh(geo: THREE.BufferGeometry, material: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  return m;
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
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#241f1c');

  // Image-based lighting from a procedural room environment: this is
  // what makes metals read as metal and skin/fabric sit in the room.
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.45;

  // The framing is expressed relative to the subject's height so a
  // height change (character parameter) reframes instead of cropping.
  let subjectHeight = 1.74;
  const homePos = (): THREE.Vector3 => new THREE.Vector3(0, subjectHeight * 0.76, 3.9);
  const homeTarget = (): THREE.Vector3 => new THREE.Vector3(0, subjectHeight * 0.54, 0);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
  camera.position.copy(homePos());

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

  // ---- lights ----
  scene.add(new THREE.HemisphereLight('#fff4e2', '#5c4a3a', 0.35));
  const key = new THREE.SpotLight('#fff1dd', 140, 0, 0.46, 0.8, 1.8);
  key.position.set(1.8, 3.2, 2.4);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.0003;
  key.shadow.normalBias = 0.02;
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 12;
  key.target.position.set(0, 0.9, 0);
  scene.add(key, key.target);
  const rim = new THREE.SpotLight('#dfe9ff', 70, 0, 0.6, 0.9, 1.8);
  rim.position.set(-2.4, 2.6, -2.0);
  rim.target.position.set(0, 1.2, 0);
  scene.add(rim, rim.target);
  const fill = new THREE.DirectionalLight('#ffe9d2', 0.5);
  fill.position.set(-2.5, 2.0, 3.0);
  scene.add(fill);

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
    envMapIntensity: 0.25,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: '#e2d7c4',
    roughness: 0.85,
    envMapIntensity: 0.3,
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

  const backWall = mesh(new THREE.PlaneGeometry(13, 3.8), wallMat, 0, 1.9, -2.6);
  backWall.receiveShadow = true;
  scene.add(backWall);
  // Front wall behind the camera: never seen directly, but the
  // mirror reflects it — without it the mirror reflects void and
  // reads as a black hole instead of glass.
  const frontWall = mesh(new THREE.PlaneGeometry(13, 5.4), wallMat, 0, 2.7, 5.5);
  frontWall.rotation.y = Math.PI;
  frontWall.receiveShadow = true;
  scene.add(frontWall);
  scene.add(mesh(new THREE.BoxGeometry(13, 0.09, 0.02), trimMat, 0, 0.045, 5.48));
  for (const x of [-3.4, -1.7, 0, 1.7, 3.4]) {
    const strip = mesh(new THREE.BoxGeometry(0.05, 3.2, 0.018), trimMat, x, 1.75, 5.485);
    strip.rotation.y = Math.PI;
    scene.add(strip);
  }
  // Sconces on the front wall: they exist mainly to give the mirror
  // something warm to reflect (two glowing points + lit plaster).
  for (const x of [-1.7, 1.7]) {
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 14, 10),
      new THREE.MeshBasicMaterial({ color: '#ffd9a0' }),
    );
    glow.position.set(x, 2.25, 5.42);
    scene.add(glow);
    scene.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.1, 8), brass, x, 2.36, 5.44));
    const pt = new THREE.PointLight('#ffcf99', 2.5, 7, 1.8);
    pt.position.set(x, 2.25, 5.25);
    scene.add(pt);
  }
  for (const side of [-1, 1]) {
    const wall = mesh(new THREE.PlaneGeometry(10, 3.8), wallMat, side * 4.6, 1.9, 0.6);
    wall.rotation.y = -side * Math.PI * 0.5;
    wall.receiveShadow = true;
    scene.add(wall);
    const base = mesh(new THREE.BoxGeometry(10, 0.09, 0.02), trimMat, side * 4.58, 0.045, 0.6);
    scene.add(base);
  }
  const backBase = mesh(new THREE.BoxGeometry(13, 0.09, 0.02), trimMat, 0, 0.045, -2.58);
  scene.add(backBase);
  // panel moulding on the back wall + a picture rail
  for (const x of [-3.4, -1.9, 1.9, 3.4]) {
    scene.add(mesh(new THREE.BoxGeometry(0.05, 3.2, 0.018), trimMat, x, 1.75, -2.585));
  }
  scene.add(mesh(new THREE.BoxGeometry(13, 0.05, 0.018), trimMat, 0, 2.95, -2.585));

  // ---- the mirror (a real reflection — it is a fitting room) ----
  const mirror = new Reflector(new THREE.PlaneGeometry(1.5, 2.3), {
    clipBias: 0.003,
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0xc9ced2,
  });
  mirror.position.set(0, 1.42, -2.575);
  scene.add(mirror);
  const mirrorFrameTop = mesh(new THREE.BoxGeometry(1.62, 0.055, 0.035), brass, 0, 2.6, -2.565);
  const mirrorFrameBottom = mesh(new THREE.BoxGeometry(1.62, 0.055, 0.035), brass, 0, 0.245, -2.565);
  const mirrorFrameL = mesh(new THREE.BoxGeometry(0.055, 2.42, 0.035), brass, -0.81, 1.42, -2.565);
  const mirrorFrameR = mesh(new THREE.BoxGeometry(0.055, 2.42, 0.035), brass, 0.81, 1.42, -2.565);
  scene.add(mirrorFrameTop, mirrorFrameBottom, mirrorFrameL, mirrorFrameR);

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
    mirrorFrameTop.position.y = bottom + mirrorH + 0.0275;
    mirrorFrameBottom.position.y = bottom - 0.0275;
    for (const bar of [mirrorFrameL, mirrorFrameR]) {
      bar.geometry.dispose();
      bar.geometry = new THREE.BoxGeometry(0.055, mirrorH + 0.11, 0.035);
      bar.position.y = centerY;
    }
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
  scene.add(inlay);

  // ---- clothing rack prop (left) ----
  const rack = new THREE.Group();
  rack.position.set(-2.35, 0, -1.15);
  rack.rotation.y = 0.45;
  for (const side of [-1, 1]) {
    rack.add(mesh(new THREE.CylinderGeometry(0.016, 0.016, 1.5, 12), brass, side * 0.65, 0.75, 0));
    const foot = mesh(new THREE.BoxGeometry(0.05, 0.03, 0.55), brass, side * 0.65, 0.015, 0);
    rack.add(foot);
  }
  const bar = mesh(new THREE.CylinderGeometry(0.014, 0.014, 1.36, 12), brass, 0, 1.5, 0);
  bar.rotation.z = Math.PI / 2;
  rack.add(bar);
  const garmentColors = ['#97a08a', '#d9cfc0', '#4a4a52'];
  garmentColors.forEach((color, i) => {
    const tex = fabricTextures([1.5, 1.5]);
    const cloth = new THREE.MeshStandardMaterial({
      color,
      map: tex.map,
      bumpMap: tex.bump,
      bumpScale: 0.3,
      roughness: 0.9,
      envMapIntensity: 0.3,
      side: THREE.DoubleSide,
    });
    const x = -0.4 + i * 0.4;
    const hook = mesh(new THREE.TorusGeometry(0.035, 0.004, 6, 14, Math.PI), brass, x, 1.5, 0);
    rack.add(hook);
    const garment = new THREE.Mesh(
      new THREE.LatheGeometry(
        [
          new THREE.Vector2(0.012, 0),
          new THREE.Vector2(0.1, -0.07),
          new THREE.Vector2(0.055, -0.18),
          new THREE.Vector2(0.135, -0.54),
        ],
        24,
      ),
      cloth,
    );
    garment.position.set(x, 1.47, 0);
    garment.scale.set(1, 1, 0.45);
    garment.castShadow = true;
    rack.add(garment);
  });
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
  for (let i = 0; i < 7; i++) {
    const leaf = mesh(new THREE.SphereGeometry(1, 12, 8), leafMat, 0, 0.72, 0);
    leaf.scale.set(0.035, 0.17, 0.07);
    const pivot = new THREE.Group();
    pivot.position.set(0, 0.55, 0);
    leaf.position.y = 0.17;
    pivot.rotation.set(0.5 + (i % 3) * 0.22, (i / 7) * Math.PI * 2, 0);
    pivot.add(leaf);
    plant.add(pivot);
  }
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
    camera.position.y = heightM * 0.76;
  }

  function tick(): void {
    controls.update();
  }

  resize();
  return { scene, camera, renderer, controls, tick, resize, resetView, setSubjectHeight };
}
