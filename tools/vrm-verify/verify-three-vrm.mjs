// External runtime verification #1: @pixiv/three-vrm (the reference VRM
// runtime for three.js, by pixiv — NOT the loader this product ships with).
// Loads the exported .vrm / .glb in plain Node and checks that the VRM is
// actually usable: meta, humanoid rig, posing, bounding box.
// Usage: node verify-three-vrm.mjs <file.vrm> [file.glb]
import { readFile } from 'node:fs/promises';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { VRMMetaLoaderPlugin } from '@pixiv/three-vrm-core';

const REQUIRED_BONES = [
  'hips', 'spine', 'head',
  'leftUpperArm', 'leftLowerArm', 'leftHand',
  'rightUpperArm', 'rightLowerArm', 'rightHand',
  'leftUpperLeg', 'leftLowerLeg', 'leftFoot',
  'rightUpperLeg', 'rightLowerLeg', 'rightFoot',
];

async function loadWith(loader, path) {
  const buf = await readFile(path);
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  return loader.parseAsync(ab, '');
}

function report(label, obj) {
  console.log(`--- ${label} ---`);
  console.log(JSON.stringify(obj, null, 1));
}

const vrmPath = process.argv[2];
const glbPath = process.argv[3];
let failures = 0;
const fail = (msg) => { failures++; console.log('FAIL: ' + msg); };

// ---- VRM via three-vrm ----
// Pass 1: default options. three-vrm's meta plugin by design only accepts
// license URLs the consuming app has opted into (default: the VRM standard
// license URL only) and throws otherwise. Record that behavior as-is.
const defaultLoader = new GLTFLoader();
defaultLoader.register((parser) => new VRMLoaderPlugin(parser));
let defaultLoadError = null;
try {
  await loadWith(defaultLoader, vrmPath);
} catch (e) {
  defaultLoadError = e?.message || String(e);
}
report('three-vrm default-options load', {
  parsed: defaultLoadError === null,
  error: defaultLoadError,
  note: 'three-vrm requires the consuming app to whitelist meta.licenseUrl (VRMMetaLoaderPlugin.acceptLicenseUrls). A rejection here means "app must opt in to this license", not a spec violation.',
});

// Pass 2: the way a real consumer app loads a CC0 VRM — whitelist the
// standard license URL plus the license URL this file declares.
const buf0 = await readFile(vrmPath);
const jsonLen = buf0.readUInt32LE(12);
const declaredLicense = JSON.parse(buf0.toString('utf8', 20, 20 + jsonLen)).extensions.VRMC_vrm.meta.licenseUrl;
const loader = new GLTFLoader();
loader.register((parser) => new VRMLoaderPlugin(parser, {
  metaPlugin: new VRMMetaLoaderPlugin(parser, {
    acceptLicenseUrls: ['https://vrm.dev/licenses/1.0/', declaredLicense],
  }),
}));
let gltf;
try {
  gltf = await loadWith(loader, vrmPath);
} catch (e) {
  fail('three-vrm could not parse the VRM even with its license whitelisted: ' + (e?.message || e));
  process.exit(1);
}
const vrm = gltf.userData.vrm;
if (!vrm) fail('GLTFLoader parsed the file but userData.vrm is missing (VRMC_vrm not recognized)');
const scene = gltf.scene;
let meshCount = 0, skinnedCount = 0;
scene.traverse((o) => { if (o.isMesh) { meshCount++; if (o.isSkinnedMesh) skinnedCount++; } });
const bbox = new THREE.Box3().setFromObject(scene);
const size = bbox.getSize(new THREE.Vector3());

const bones = {};
if (vrm?.humanoid) {
  for (const name of [...REQUIRED_BONES, 'chest', 'neck', 'leftToes', 'rightToes', 'leftEye', 'rightEye', 'jaw']) {
    bones[name] = !!vrm.humanoid.getRawBoneNode(name);
  }
  for (const name of REQUIRED_BONES) if (!bones[name]) fail(`required humanoid bone missing: ${name}`);
}

// Posing check: rotate the left upper arm through the humanoid API and
// confirm the scene graph actually moves, then run a vrm.update tick.
let poseMoved = false;
try {
  const arm = vrm.humanoid.getNormalizedBoneNode('leftUpperArm');
  const before = arm.quaternion.clone();
  arm.quaternion.setFromEuler(new THREE.Euler(0, 0, 1.0));
  vrm.update(0.016);
  poseMoved = !arm.quaternion.equals(before);
  if (!poseMoved) fail('posing leftUpperArm did not change its quaternion');
} catch (e) {
  fail('posing via humanoid API threw: ' + (e?.message || e));
}

report('three-vrm VRM load', {
  runtime: '@pixiv/three-vrm ' + (await import('@pixiv/three-vrm/package.json', { with: { type: 'json' } })).default.version,
  three: THREE.REVISION,
  metaName: vrm?.meta?.name,
  metaVersion: vrm?.meta?.version,
  metaAuthors: vrm?.meta?.authors,
  licenseUrl: vrm?.meta?.licenseUrl,
  avatarPermission: vrm?.meta?.avatarPermission,
  commercialUsage: vrm?.meta?.commercialUsage,
  bones,
  expressions: vrm?.expressionManager?.expressionNames ?? [],
  lookAtPresent: !!vrm?.lookAt,
  firstPersonPresent: !!vrm?.firstPerson,
  meshCount, skinnedCount,
  heightMeters: +size.y.toFixed(3),
  poseMoved,
});

// ---- plain GLB via three.js GLTFLoader (glTF-level sanity, no VRM plugin) ----
if (glbPath) {
  try {
    const plain = await loadWith(new GLTFLoader(), glbPath);
    let m = 0; plain.scene.traverse((o) => { if (o.isMesh) m++; });
    report('three.js GLTFLoader GLB load', { parsed: true, meshCount: m, animations: plain.animations.length });
  } catch (e) {
    fail('plain GLTFLoader could not parse the GLB: ' + (e?.message || e));
  }
}

console.log(failures === 0 ? 'THREE-VRM RESULT: PASS' : `THREE-VRM RESULT: FAIL (${failures})`);
process.exit(failures === 0 ? 0 : 1);
