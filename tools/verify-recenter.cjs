// Headless verification of the re-centering (DESIGN.md §21):
// the fitting experience is the product's center again.
//   1. the app opens on the looks tab; the wardrobe shelves come
//      before the character tab in the tab order,
//   2. the new wardrobe (blouse, long skirt, coat layering, new
//      colors) dresses the avatar through the bridge,
//   3. a look is saved through the UI, re-applied through the UI
//      after changing away, and survives a reload,
//   4. the before/after swap flips between the last two looks
//      and back,
//   5. the share card (outfit-centered composition) restores the
//      exact clothing, outerwear included, from a clean state.
// Evidence lands in evidence/ with "recenter" names.
// Run: xvfb-run -a electron tools/verify-recenter.cjs [baseUrl]
const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

if (process.env.FR_USERDATA) app.setPath('userData', process.env.FR_USERDATA);
app.commandLine.appendSwitch('use-angle', 'swiftshader');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.disableHardwareAcceleration();

const BASE = process.argv[2] || 'http://127.0.0.1:8741/';
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

async function poll(win, expr, timeoutMs, label) {
  const t0 = Date.now();
  for (;;) {
    const v = await win.webContents.executeJavaScript(expr);
    if (v) return v;
    if (Date.now() - t0 > timeoutMs) throw new Error(`poll timeout: ${label}`);
    await sleep(400);
  }
}

async function shootCanvas(win, file, settleMs = 2500) {
  await sleep(settleMs);
  const dataUrl = await win.webContents.executeJavaScript(
    `document.getElementById('gl').toDataURL('image/png')`,
  );
  const png = Buffer.from(String(dataUrl).split(',')[1], 'base64');
  fs.writeFileSync(path.join(OUT, file), png);
  return png;
}

const LOOK_A = {
  topStyle: 'blouse',
  topColor: '#b03050',
  outerStyle: 'coat',
  outerColor: '#2c3a55',
  bottomStyle: 'skirtLong',
  bottomColor: '#5b4a68',
  shoeStyle: 'boots',
  shoeColor: '#26262b',
  hat: 'beanie',
  glasses: 'none',
  accessory: 'scarf',
};
const LOOK_B = {
  topStyle: 'tee',
  topColor: '#7cc7ff',
  outerStyle: 'none',
  outerColor: '#b08954',
  bottomStyle: 'pants',
  bottomColor: '#44557a',
  shoeStyle: 'sneakers',
  shoeColor: '#ffffff',
  hat: 'none',
  glasses: 'none',
  accessory: 'none',
};
const clothingOf = (o) => ({
  topStyle: o.topStyle,
  topColor: o.topColor,
  outerStyle: o.outerStyle,
  outerColor: o.outerColor,
  bottomStyle: o.bottomStyle,
  bottomColor: o.bottomColor,
  shoeStyle: o.shoeStyle,
  shoeColor: o.shoeColor,
  hat: o.hat,
  glasses: o.glasses,
  accessory: o.accessory,
});
const sameClothing = (a, b) => JSON.stringify(clothingOf(a)) === JSON.stringify(clothingOf(b));

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
  await sleep(1200);

  console.log('STEP 1: opens on the looks tab; wardrobe before character');
  results.checks.tabOrder = await win.webContents.executeJavaScript(
    `(() => {
       const tabs = [...document.querySelectorAll('#tabs button')];
       const labels = tabs.map((b) => b.textContent.trim());
       return {
         count: labels.length,
         first: labels[0],
         firstPressed: tabs[0].getAttribute('aria-pressed'),
         characterIndex: labels.findIndex((l) => ['人物', 'Character'].includes(l)),
         llmIsLast: ['AI接続', 'AI Connect'].includes(labels[labels.length - 1]),
         looksPanelShown: Boolean(document.getElementById('look-name')),
       };
     })()`,
  );
  const order = results.checks.tabOrder;
  results.checks.opensOnLooks =
    order.firstPressed === 'true' && order.looksPanelShown && order.count === 11;
  results.checks.wardrobeBeforeCharacter =
    order.characterIndex === order.count - 2 && order.llmIsLast;

  console.log('STEP 2: dress in the new wardrobe (blouse + coat + long skirt)');
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit(${JSON.stringify(LOOK_A)})`,
  );
  await poll(
    win,
    `window.__fittingRoom.getOutfit().outerStyle === 'coat'`,
    10000,
    'coat applied',
  );
  results.checks.seedIsV6 = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getSeed().startsWith('FR6-')`,
  );
  await shootCanvas(win, 'screenshot-recenter-wardrobe.png');

  console.log('STEP 3: save the look through the UI');
  await win.webContents.executeJavaScript(
    `(() => {
       const input = document.getElementById('look-name');
       input.value = 'verify-look';
       input.dispatchEvent(new Event('input', { bubbles: true }));
       document.getElementById('look-save').click();
     })()`,
  );
  results.checks.savedLooks = await poll(
    win,
    `(() => { const l = window.__fittingRoom.getLooks(); return l.length === 1 ? l : null; })()`,
    10000,
    'look saved',
  );
  results.checks.savedLookMatches = sameClothing(results.checks.savedLooks[0].look, LOOK_A);
  const panelShot = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-recenter-looks.png'), panelShot.toPNG());

  console.log('STEP 4: change away, then re-apply the saved look through the UI');
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit(${JSON.stringify(LOOK_B)})`,
  );
  results.checks.prevLookAfterChange = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getPrevLook()`,
  );
  results.checks.prevIsA = sameClothing(results.checks.prevLookAfterChange, LOOK_A);
  await win.webContents.executeJavaScript(
    `document.querySelector('.look-apply').click()`,
  );
  results.checks.reapplied = await poll(
    win,
    `(() => { const o = window.__fittingRoom.getOutfit(); return ${JSON.stringify(LOOK_A)}.topStyle === o.topStyle && o.outerStyle === 'coat' ? o : null; })()`,
    10000,
    'look re-applied',
  );
  results.checks.reappliedMatches = sameClothing(results.checks.reapplied, LOOK_A);

  console.log('STEP 5: before/after swap flips both ways');
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit({ shoeStyle: 'sneakers', shoeColor: '#ffffff' })`,
  );
  await win.webContents.executeJavaScript(`document.getElementById('look-swap').click()`);
  results.checks.afterSwap1 = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  results.checks.swapBackToA = sameClothing(results.checks.afterSwap1, LOOK_A);
  await win.webContents.executeJavaScript(`document.getElementById('look-swap').click()`);
  results.checks.afterSwap2 = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  results.checks.swapForwardAgain =
    results.checks.afterSwap2.shoeStyle === 'sneakers' && results.checks.afterSwap2.outerStyle === 'coat';

  console.log('STEP 6: saved looks survive a reload');
  await win.webContents.reload();
  await waitForBridge(win);
  await sleep(800);
  results.checks.looksAfterReload = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getLooks().length`,
  );

  console.log('STEP 7: the card restores the exact clothing from a clean state');
  const cardDataUrl = await win.webContents.executeJavaScript(
    `window.__fittingRoom.cardDataURL()`,
  );
  const cardPng = Buffer.from(String(cardDataUrl).split(',')[1], 'base64');
  fs.writeFileSync(path.join(OUT, 'share-card-recenter.png'), cardPng);
  results.checks.cardBytes = cardPng.length;
  const seedBefore = await win.webContents.executeJavaScript(`window.__fittingRoom.getSeed()`);
  await win.webContents.executeJavaScript(`localStorage.clear()`);
  await win.webContents.reload();
  await waitForBridge(win);
  await sleep(800);
  results.checks.restored = await win.webContents.executeJavaScript(
    `window.__fittingRoom.applyCardDataURL(${JSON.stringify(cardDataUrl)})`,
  );
  const after = await win.webContents.executeJavaScript(`window.__fittingRoom.getOutfit()`);
  results.checks.restoredSeedMatches =
    (await win.webContents.executeJavaScript(`window.__fittingRoom.getSeed()`)) === seedBefore;
  results.checks.restoredClothing = clothingOf(after);
  results.checks.restoredMatches = sameClothing(after, {
    ...LOOK_A,
    shoeStyle: 'sneakers',
    shoeColor: '#ffffff',
  });

  console.log(JSON.stringify(results, null, 2));
  const ok =
    results.errors.length === 0 &&
    results.checks.opensOnLooks &&
    results.checks.wardrobeBeforeCharacter &&
    results.checks.seedIsV6 &&
    results.checks.savedLookMatches &&
    results.checks.prevIsA &&
    results.checks.reappliedMatches &&
    results.checks.swapBackToA &&
    results.checks.swapForwardAgain &&
    results.checks.looksAfterReload === 1 &&
    results.checks.restored &&
    results.checks.restoredSeedMatches &&
    results.checks.restoredMatches;
  app.exit(ok ? 0 : 2);
}

app
  .whenReady()
  .then(main)
  .catch((err) => {
    console.error('VERIFY FAILED:', err && err.message);
    app.exit(1);
  });
