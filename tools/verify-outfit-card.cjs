// Headless verification of the bottoms/shoes categories and the
// share-card seed embedding (CHARACTER-SYSTEM.md §5.8 items 2-3):
//   1. a full outfit with the new categories renders (two looks:
//      skirt + boots, then pants + sneakers),
//   2. the exported card PNG carries the seed in a tEXt chunk,
//   3. after a full reset to the default person, the card restores
//      the exact same person + outfit — twice: once through the
//      bridge (same code path as the file picker) and once through
//      a real synthetic drop event on the window.
// Evidence screenshots land in evidence/ with "outfit"/"restore"
// names. Run: xvfb-run -a electron tools/verify-outfit-card.cjs [baseUrl]
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

// Evidence stills are read from the WebGL canvas itself, like
// verify-face.cjs: capturePage can return a stale compositor frame
// under SwiftShader (an earlier run photographed the previous
// outfit), while a canvas read is synchronous with the render
// loop and always shows the current state.
async function shootCanvas(win, file, settleMs = 2500) {
  await sleep(settleMs);
  const dataUrl = await win.webContents.executeJavaScript(
    `document.getElementById('gl').toDataURL('image/png')`,
  );
  const png = Buffer.from(String(dataUrl).split(',')[1], 'base64');
  fs.writeFileSync(path.join(OUT, file), png);
  return png;
}

const CUSTOM = {
  topStyle: 'tee',
  topColor: '#7cc7ff',
  bottomStyle: 'skirt',
  bottomColor: '#a83c46',
  shoeStyle: 'boots',
  shoeColor: '#26262b',
  hat: 'cap',
  glasses: 'none',
  accessory: 'scarf',
  pose: 'wave',
  character: {
    skinTone: 0.92,
    hairColor: '#d9b380',
    eyeColor: '#3d5a80',
    hairStyle: 'long',
    height: 1.92,
    eyeSize: 1.15,
    eyeSpacing: 0.95,
    eyeHeight: 0.003,
    eyeShape: 0.65,
    eyeTilt: 0.1,
    browHeight: 0.004,
    browTilt: 0.08,
    noseWidth: 1.15,
    noseProminence: 1.2,
    lipWidth: 1.1,
    lipFullness: 1.3,
    faceWidth: 1.04,
    asymmetry: 0.6,
  },
};

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

  // 1. full outfit with the new categories: skirt + boots
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit(${JSON.stringify(CUSTOM)})`,
  );
  results.checks.customOutfit = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  const fullShot = await shootCanvas(win, 'screenshot-outfit-full.png');
  results.checks.seed = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getSeed()`,
  );
  results.checks.seedIsV4 = String(results.checks.seed).startsWith('FR4-');

  // 2. second look: pants + sneakers (proves the other bottom
  //    type renders, and differently)
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit({
       bottomStyle: 'pants', bottomColor: '#44557a',
       shoeStyle: 'sneakers', shoeColor: '#e8e2d6'
     })`,
  );
  const pantsShot = await shootCanvas(win, 'screenshot-outfit-pants.png');
  results.checks.pantsShotChanged = !pantsShot.equals(fullShot);

  // 2b. third look: shorts + pumps (the remaining two styles)
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit({
       bottomStyle: 'shorts', bottomColor: '#7cc7ff',
       shoeStyle: 'pumps', shoeColor: '#a83c46'
     })`,
  );
  const shortsShot = await shootCanvas(win, 'screenshot-outfit-shorts.png');
  results.checks.shortsShotChanged = !shortsShot.equals(pantsShot);
  // back to the skirt + boots look for the card
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit({
       bottomStyle: 'skirt', bottomColor: '#a83c46',
       shoeStyle: 'boots', shoeColor: '#26262b'
     })`,
  );
  await sleep(1200);

  // 3. card export: PNG bytes must carry the seed chunk
  const dataUrl = await win.webContents.executeJavaScript(
    `window.__fittingRoom.cardDataURL()`,
  );
  const cardBytes = Buffer.from(String(dataUrl).split(',')[1], 'base64');
  results.checks.cardBytes = cardBytes.length;
  results.checks.cardHasSeedChunk = cardBytes.includes('FittingRoomSeed');
  results.checks.cardChunkHoldsSeed = cardBytes.includes(results.checks.seed);
  fs.writeFileSync(path.join(OUT, 'share-card-outfit.png'), cardBytes);

  // 4. reset to the factory state, then restore via the bridge
  //    (the same applyCardBytes path the file picker uses)
  await resetToDefault(win);
  results.checks.afterReset = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  const beforeShot = await shootCanvas(win, 'screenshot-restore-before.png');
  results.checks.bridgeRestoreOk = await win.webContents.executeJavaScript(
    `window.__fittingRoom.applyCardDataURL(${JSON.stringify(dataUrl)})`,
  );
  results.checks.bridgeRestoredSeedMatches = await waitForSeed(win, results.checks.seed);
  results.checks.afterBridgeRestore = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  const afterShot = await shootCanvas(win, 'screenshot-restore-after.png');
  results.checks.restoreShotChanged = !afterShot.equals(beforeShot);

  // 5. reset again, then restore through a real drop event
  await resetToDefault(win);
  await win.webContents.executeJavaScript(
    `(async () => {
       const res = await fetch(${JSON.stringify(dataUrl)});
       const blob = await res.blob();
       const file = new File([blob], 'card.png', { type: 'image/png' });
       const dt = new DataTransfer();
       dt.items.add(file);
       window.dispatchEvent(new DragEvent('drop', { dataTransfer: dt, bubbles: true, cancelable: true }));
     })()`,
  );
  results.checks.dropRestoredSeedMatches = await waitForSeed(win, results.checks.seed);
  results.checks.afterDropRestore = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );

  // 6. a PNG without a seed chunk is refused, state untouched
  results.checks.plainPngRejected = await win.webContents.executeJavaScript(
    `window.__fittingRoom.applyCardDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=')`,
  );
  results.checks.seedAfterReject = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getSeed()`,
  );

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
