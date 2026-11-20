// Headless verification of the character system phase 3 (body
// parameters + the adult safety restriction, CUS-0779): drives
// the production build in Electron with a fresh profile and
// confirms that three visibly different adult bodies render with
// their clothes auto-fitted, that the character panel offers the
// body sliders, that a minor-like body combination sent through
// the bridge lands corrected (never raw), that seed format v4
// restores the body while a v3 seed still decodes with the
// default body, and that body parameters persist across a
// reload. Evidence screenshots land in evidence/ with the
// "body" infix.
// Run: xvfb-run -a electron tools/verify-body.cjs [baseUrl]
//
// Capture notes: same as verify-face.cjs — under SwiftShader the
// compositor lags, so evidence is read straight from the WebGL
// canvas after a settle wait, not via capturePage.
const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

if (process.env.FR_USERDATA) app.setPath('userData', process.env.FR_USERDATA);
app.commandLine.appendSwitch('use-angle', 'swiftshader');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.disableHardwareAcceleration();

const BASE = process.argv[2] || 'http://127.0.0.1:8734/';
const OUT = path.join(__dirname, '..', 'evidence');
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = { errors: [], checks: {} };

function waitForBridge(win) {
  return win.webContents.executeJavaScript(
    `new Promise((res, rej) => {
       const t0 = Date.now();
       const iv = setInterval(() => {
         if (window.__fittingRoom && window.__fittingRoom.ready) { clearInterval(iv); res(true); }
         else if (Date.now() - t0 > 20000) { clearInterval(iv); rej(new Error('bridge timeout')); }
       }, 100);
     })`,
  );
}

async function canvasDataURL(win) {
  return win.webContents.executeJavaScript(
    `document.getElementById('gl').toDataURL('image/png')`,
  );
}

async function waitForRenderedFrame(win, timeoutMs = 30000) {
  const t0 = Date.now();
  for (;;) {
    const url = await canvasDataURL(win);
    if (url.length > 60000) return url;
    if (Date.now() - t0 > timeoutMs) throw new Error(`frame timeout (len=${url.length})`);
    await sleep(500);
  }
}

function saveDataURL(file, dataUrl) {
  fs.writeFileSync(
    path.join(OUT, file),
    Buffer.from(String(dataUrl).split(',')[1], 'base64'),
  );
}

async function shoot(win, file, settleMs = 7000) {
  await sleep(settleMs);
  const url = await canvasDataURL(win);
  saveDataURL(file, url);
  return url;
}

// Three adult bodies, as far apart as the parameter space allows
// without tripping the safety restriction: a tall slim figure, a
// curvy figure, and a short stocky figure. Outfits are chosen so
// the auto-fit is visible (pants legs, a skirt at the hip, a
// hoodie's torso).
const PATTERNS = [
  {
    name: 'slim',
    file: 'screenshot-body-slim.png',
    outfit: { topStyle: 'tee', topColor: '#7cc7ff', bottomStyle: 'pants', bottomColor: '#2f3542' },
    body: { height: 1.88, shoulderWidth: 0.95, waist: 0.86, hip: 0.92, bust: 0.88, build: 0.88 },
  },
  {
    name: 'curvy',
    file: 'screenshot-body-curvy.png',
    outfit: { topStyle: 'tee', topColor: '#ff8fab', bottomStyle: 'skirt', bottomColor: '#a83c46' },
    body: { height: 1.62, shoulderWidth: 1.02, waist: 0.84, hip: 1.18, bust: 1.26, build: 1.05 },
  },
  {
    name: 'stocky',
    file: 'screenshot-body-stocky.png',
    outfit: { topStyle: 'hoodie', topColor: '#8fe3c0', bottomStyle: 'pants', bottomColor: '#44557a' },
    body: { height: 1.52, shoulderWidth: 1.12, waist: 1.16, hip: 1.1, bust: 1.05, build: 1.18 },
  },
];

// The full minor-like combination (every youthward signal at its
// extreme). Sent through the bridge's setOutfit, it must land
// corrected — this is the CUS-0779 acceptance check on a live
// path, mirroring the unit tests on sanitizeCharacter.
const CHILDLIKE = {
  height: 1.45,
  bust: 0.8,
  waist: 1.22,
  hip: 0.86,
  build: 0.85,
  shoulderWidth: 0.88,
};

// A hand-built v3 seed (pre-body format): the body must load
// with defaults while everything else decodes.
const V3_SEED = `FR3-${Buffer.from([
  3, 204, 26, 6, 4, 2, ...new Array(13).fill(128), 1, 2, 1, 1, 1, 1, 2, 3, 2, 4,
]).toString('base64url')}`;

async function main() {
  const win = new BrowserWindow({
    width: 1100,
    height: 850,
    show: true,
    webPreferences: { sandbox: false },
  });
  win.webContents.on('console-message', (_e, level, message) => {
    if (level >= 3) results.errors.push(message);
  });
  win.webContents.on('did-fail-load', (_e, code, desc) => {
    results.errors.push(`did-fail-load ${code} ${desc}`);
  });

  await win.loadURL(BASE);
  await waitForBridge(win);
  results.checks.frameBytes = (await waitForRenderedFrame(win)).length;
  const base = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  results.checks.defaultSeed = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getSeed()`,
  );
  results.checks.defaultSeedIsV6 = String(results.checks.defaultSeed).startsWith('FR6-');

  // 1. the three bodies: state applies exactly, shots all differ
  const shots = {};
  for (const p of PATTERNS) {
    const character = { ...base.character, ...p.body };
    await win.webContents.executeJavaScript(
      `window.__fittingRoom.setOutfit(${JSON.stringify({ ...p.outfit, character })})`,
    );
    const got = await win.webContents.executeJavaScript(
      `window.__fittingRoom.getOutfit()`,
    );
    const c = got.character;
    results.checks[`applied_${p.name}`] =
      c.height === p.body.height &&
      c.shoulderWidth === p.body.shoulderWidth &&
      c.waist === p.body.waist &&
      c.hip === p.body.hip &&
      c.bust === p.body.bust &&
      c.build === p.body.build;
    shots[p.name] = await shoot(win, p.file);
    if (p.name === 'curvy') {
      results.checks.curvySeed = await win.webContents.executeJavaScript(
        `window.__fittingRoom.getSeed()`,
      );
    }
  }
  results.checks.shotsDiffer =
    shots.slim !== shots.curvy && shots.curvy !== shots.stocky && shots.slim !== shots.stocky;

  // 2. the safety restriction on the bridge path: the childlike
  //    combination lands corrected (bust and hip raised, height
  //    untouched)
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit({ character: ${JSON.stringify({ ...base.character, ...CHILDLIKE })} })`,
  );
  const guarded = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  results.checks.safety = {
    height: guarded.character.height,
    bust: guarded.character.bust,
    hip: guarded.character.hip,
    bustCorrected: guarded.character.bust > CHILDLIKE.bust,
    hipCorrected: guarded.character.hip > CHILDLIKE.hip,
    heightKept: guarded.character.height === CHILDLIKE.height,
  };

  // 3. seed v4 restores a body; v3 still decodes with defaults
  results.checks.seedRestoreOk = await win.webContents.executeJavaScript(
    `window.__fittingRoom.setSeed(${JSON.stringify(results.checks.curvySeed)})`,
  );
  await sleep(400);
  const restored = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  const tol = (min, max) => (max - min) / 255 + 1e-9;
  results.checks.seedBodyClose =
    Math.abs(restored.character.hip - 1.18) <= tol(0.86, 1.2) &&
    Math.abs(restored.character.bust - 1.26) <= tol(0.8, 1.3) &&
    Math.abs(restored.character.waist - 0.84) <= tol(0.82, 1.22);
  results.checks.v3SeedAccepted = await win.webContents.executeJavaScript(
    `window.__fittingRoom.setSeed(${JSON.stringify(V3_SEED)})`,
  );
  await sleep(400);
  const afterV3 = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  results.checks.v3BodyIsDefault =
    afterV3.character.shoulderWidth === base.character.shoulderWidth &&
    afterV3.character.bust === base.character.bust &&
    afterV3.character.build === base.character.build;

  // 4. persistence: body parameters survive a reload exactly
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setSeed(${JSON.stringify(results.checks.curvySeed)})`,
  );
  await win.webContents.reload();
  await waitForBridge(win);
  await waitForRenderedFrame(win);
  const afterReload = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  results.checks.reloadBodyExact =
    afterReload.character.hip === restored.character.hip &&
    afterReload.character.bust === restored.character.bust &&
    afterReload.character.build === restored.character.build;

  // 5. the character panel shows the body sliders (skin + height
  //    + 5 body + 13 face = 20 rows) under a body group label
  await win.webContents.executeJavaScript(
    `(() => { const b = [...document.querySelectorAll('#tabs button')].find((x) => ['\u4eba\u7269', 'Character'].includes(x.textContent.trim())); if (b) b.click(); })()`,
  );
  results.checks.panel = await win.webContents.executeJavaScript(
    `new Promise((res, rej) => {
       const t0 = Date.now();
       const iv = setInterval(() => {
         const rows = document.querySelectorAll('.slider-row').length;
         const labels = [...document.querySelectorAll('.group-label')].map((n) => n.textContent);
         if (rows >= 20) { clearInterval(iv); res({ rows, labels }); }
         else if (Date.now() - t0 > 10000) { clearInterval(iv); rej(new Error('panel timeout')); }
       }, 100);
     })`,
  );
  await sleep(6000);
  const img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-body-panel.png'), img.toPNG());

  console.log(JSON.stringify(results, null, 2));
  app.exit(results.errors.length ? 2 : 0);
}

app
  .whenReady()
  .then(main)
  .catch((err) => {
    console.error('VERIFY FAILED:', err && err.message);
    app.exit(1);
  });
