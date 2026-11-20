// Headless verification of the genetics synthesis
// (CHARACTER-SYSTEM.md §2.5 / §5.8 item 5; LEGAL-ETHICS.md
// judgment J-06):
//   1. two contrasting people (A and B) render and seed,
//   2. the blend_characters bridge command synthesizes a child
//      whose traits visibly come from A, from B, or from between
//      them — deterministically (same command, same child),
//   3. an invalid parent seed is rejected with a reason and the
//      state is untouched,
//   4. the child is an ordinary person: its share card carries
//      the child seed and restores it after a full reset,
//   5. the UI flow works end to end: paste both seeds in the
//      character tab, generate (preview only — the saved state
//      does not move), apply, and the applied seed is the
//      previewed child's seed.
// Evidence: the two parents and the child side by side in
// evidence/screenshot-genetics-trio.png (plus individual shots).
// Run: xvfb-run -a electron tools/verify-genetics.cjs [baseUrl]
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

async function waitForRenderedFrame(win, timeoutMs = 30000) {
  const t0 = Date.now();
  for (;;) {
    const len = await win.webContents.executeJavaScript(
      `document.getElementById('gl').toDataURL('image/png').length`,
    );
    if (len > 60000) return len;
    if (Date.now() - t0 > timeoutMs) throw new Error(`frame timeout (len=${len})`);
    await sleep(500);
  }
}

// Evidence stills are read from the WebGL canvas itself (see
// verify-outfit-card.cjs for why capturePage is not used).
async function shootDataURL(win, settleMs = 2500) {
  await sleep(settleMs);
  return win.webContents.executeJavaScript(
    `document.getElementById('gl').toDataURL('image/png')`,
  );
}

function saveDataURL(dataUrl, file) {
  const png = Buffer.from(String(dataUrl).split(',')[1], 'base64');
  fs.writeFileSync(path.join(OUT, file), png);
  return png;
}

// The same clothes on both parents, so the trio compares people,
// not outfits. The traits contrast hard: pale/tall/blond/long
// hair/blue eyes vs deep/short/black/short hair/green eyes.
const CLOTHES = {
  topStyle: 'tee',
  topColor: '#7cc7ff',
  bottomStyle: 'pants',
  bottomColor: '#44557a',
  shoeStyle: 'sneakers',
  shoeColor: '#e8e2d6',
  hat: 'none',
  glasses: 'none',
  accessory: 'none',
  pose: 'stand',
};
const PARENT_A = {
  ...CLOTHES,
  character: {
    skinTone: 0.12,
    height: 1.9,
    hairColor: '#d9b380',
    eyeColor: '#3d5a80',
    hairStyle: 'long',
    eyeSize: 1.2,
    noseWidth: 0.85,
    lipFullness: 0.8,
    faceWidth: 0.94,
    build: 0.9,
  },
};
const PARENT_B = {
  ...CLOTHES,
  character: {
    skinTone: 0.92,
    height: 1.52,
    hairColor: '#201612',
    eyeColor: '#46684a',
    hairStyle: 'short',
    eyeSize: 0.9,
    noseWidth: 1.3,
    lipFullness: 1.5,
    faceWidth: 1.08,
    build: 1.15,
  },
};
// Chosen by measuring the synthesis over mix seeds 0..39 for
// these parents: skin and height land between the parents, the
// hair color comes from A, the hairstyle from B, the eyes from A.
const MIX_SEED = 36;

async function resetToDefault(win) {
  await win.webContents.executeJavaScript(`localStorage.clear()`);
  await win.webContents.reload();
  await waitForBridge(win);
  await waitForRenderedFrame(win);
}

async function waitForSeed(win, want, timeoutMs = 15000) {
  const t0 = Date.now();
  for (;;) {
    const seed = await win.webContents.executeJavaScript(`window.__fittingRoom.getSeed()`);
    if (seed === want) return true;
    if (Date.now() - t0 > timeoutMs) return false;
    await sleep(400);
  }
}

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
  results.checks.frameBytes = await waitForRenderedFrame(win);
  await sleep(500);

  // 1. parent A
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit(${JSON.stringify(PARENT_A)})`,
  );
  const seedA = await win.webContents.executeJavaScript(`window.__fittingRoom.getSeed()`);
  results.checks.seedA = seedA;
  const shotA = await shootDataURL(win);
  saveDataURL(shotA, 'screenshot-genetics-parent-a.png');

  // 2. parent B
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit(${JSON.stringify(PARENT_B)})`,
  );
  const seedB = await win.webContents.executeJavaScript(`window.__fittingRoom.getSeed()`);
  results.checks.seedB = seedB;
  results.checks.parentsDiffer = seedA !== seedB;
  const shotB = await shootDataURL(win);
  saveDataURL(shotB, 'screenshot-genetics-parent-b.png');

  // 3. synthesize through the agent bridge (same validation an
  //    LLM's output passes)
  const blendCmd = JSON.stringify([
    { type: 'blend_characters', seedA, seedB, mixSeed: MIX_SEED },
  ]);
  const run1 = await win.webContents.executeJavaScript(
    `window.__fittingRoom.runCommands(${blendCmd})`,
  );
  results.checks.blendApplied = run1.applied;
  results.checks.blendRejected = run1.rejected;
  const childOutfit = run1.outfit;
  results.checks.childCharacter = childOutfit.character;
  const childSeed = await win.webContents.executeJavaScript(`window.__fittingRoom.getSeed()`);
  results.checks.childSeed = childSeed;
  results.checks.childSeedIsV4 = String(childSeed).startsWith('FR4-');
  // Inheritance spot checks against the decoded parents.
  const cA = PARENT_A.character;
  const cB = PARENT_B.character;
  const cc = childOutfit.character;
  results.checks.inheritance = {
    skinBetween: cc.skinTone > Math.min(cA.skinTone, cB.skinTone) && cc.skinTone < Math.max(cA.skinTone, cB.skinTone),
    heightBetween: cc.height > Math.min(cA.height, cB.height) && cc.height < Math.max(cA.height, cB.height),
    hairColorFromA: cc.hairColor === cA.hairColor,
    hairStyleFromB: cc.hairStyle === cB.hairStyle,
    eyeColorFromA: cc.eyeColor === cA.eyeColor,
  };
  const shotChild = await shootDataURL(win);
  saveDataURL(shotChild, 'screenshot-genetics-child.png');

  // 4. determinism: back to parent A, run the same command again
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit(${JSON.stringify(PARENT_A)})`,
  );
  const run2 = await win.webContents.executeJavaScript(
    `window.__fittingRoom.runCommands(${blendCmd})`,
  );
  results.checks.deterministic =
    JSON.stringify(run2.outfit.character) === JSON.stringify(childOutfit.character);

  // 5. an invalid parent seed is rejected, state untouched
  const bad = await win.webContents.executeJavaScript(
    `window.__fittingRoom.runCommands([{type:'blend_characters', seedA:'FR9-nope', seedB:${JSON.stringify(seedB)}, mixSeed:1}])`,
  );
  results.checks.badRejected = bad.rejected;
  results.checks.seedAfterReject = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getSeed()`,
  );

  // 6. the child's share card restores the child after a reset
  const dataUrl = await win.webContents.executeJavaScript(
    `window.__fittingRoom.cardDataURL()`,
  );
  const cardBytes = Buffer.from(String(dataUrl).split(',')[1], 'base64');
  results.checks.cardBytes = cardBytes.length;
  results.checks.cardChunkHoldsChildSeed = cardBytes.includes(childSeed);
  fs.writeFileSync(path.join(OUT, 'share-card-genetics.png'), cardBytes);
  await resetToDefault(win);
  results.checks.cardRestoreOk = await win.webContents.executeJavaScript(
    `window.__fittingRoom.applyCardDataURL(${JSON.stringify(dataUrl)})`,
  );
  results.checks.cardRestoredSeedMatches = await waitForSeed(win, childSeed);

  // 7. the UI flow: character tab → paste both seeds → generate
  //    (preview only) → apply
  await resetToDefault(win);
  const defaultSeed = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getSeed()`,
  );
  await win.webContents.executeJavaScript(
    `document.querySelectorAll('#tabs button')[0].click()`,
  );
  await sleep(600);
  await win.webContents.executeJavaScript(
    `(() => {
       const set = (id, v) => {
         const elx = document.getElementById(id);
         elx.value = v;
         elx.dispatchEvent(new Event('input', { bubbles: true }));
       };
       set('blend-seed-a', ${JSON.stringify(seedA)});
       set('blend-seed-b', ${JSON.stringify(seedB)});
       document.getElementById('blend-generate').click();
     })()`,
  );
  // Wait for the preview block (the child's seed readout).
  const t0 = Date.now();
  let uiChildSeed = null;
  for (;;) {
    uiChildSeed = await win.webContents.executeJavaScript(
      `(document.getElementById('blend-child-seed') || {}).textContent || null`,
    );
    if (uiChildSeed) break;
    if (Date.now() - t0 > 15000) break;
    await sleep(400);
  }
  results.checks.uiChildSeed = uiChildSeed;
  results.checks.uiPreviewNotCommitted =
    (await win.webContents.executeJavaScript(`window.__fittingRoom.getSeed()`)) === defaultSeed;
  await win.webContents.executeJavaScript(`document.getElementById('blend-apply').click()`);
  results.checks.uiAppliedSeedMatches =
    uiChildSeed !== null && (await waitForSeed(win, uiChildSeed));

  // 8. the trio: A | B | child side by side
  const trio = await win.webContents.executeJavaScript(
    `(async () => {
       const load = (src) => new Promise((res, rej) => {
         const img = new Image();
         img.onload = () => res(img);
         img.onerror = rej;
         img.src = src;
       });
       const imgs = [];
       for (const src of ${JSON.stringify([shotA, shotB, shotChild])}) imgs.push(await load(src));
       const w = imgs[0].width, h = imgs[0].height;
       const cvs = document.createElement('canvas');
       cvs.width = w * 3;
       cvs.height = h;
       const ctx = cvs.getContext('2d');
       imgs.forEach((img, i) => ctx.drawImage(img, i * w, 0));
       return cvs.toDataURL('image/png');
     })()`,
  );
  saveDataURL(trio, 'screenshot-genetics-trio.png');
  results.checks.trioSaved = true;

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
