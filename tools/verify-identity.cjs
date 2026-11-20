// Headless verification of the identity foundation
// (docs/PERSPECTIVES-2.md implication 1; docs/DESIGN.md §18):
//   1. a name set in the character tab rides the seed (FR5-),
//      headlines the profile share card, and survives a full
//      reset via card restore — name included,
//   2. the roster keeps two people and calls each back by tap,
//   3. a genetics blend applied through the UI records its two
//      parents in the on-device lineage ONLY: the child's seed
//      and card carry no parentage, the child starts unnamed,
//   4. roster and lineage persist across a reload,
//   5. the whole run produces no console errors.
// Evidence: evidence/share-card-identity.png (profile card with
// the name as headline), evidence/screenshot-identity-panel.png
// (roster + history), evidence/screenshot-identity-child.png.
// Run: xvfb-run -a electron tools/verify-identity.cjs [baseUrl]
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

async function poll(win, expr, timeoutMs, label) {
  const t0 = Date.now();
  for (;;) {
    const v = await win.webContents.executeJavaScript(expr);
    if (v) return v;
    if (Date.now() - t0 > timeoutMs) throw new Error(`poll timeout: ${label}`);
    await sleep(400);
  }
}

function saveDataURL(dataUrl, file) {
  const png = Buffer.from(String(dataUrl).split(',')[1], 'base64');
  fs.writeFileSync(path.join(OUT, file), png);
  return png;
}

const PERSON_A = {
  name: 'ミライ',
  topStyle: 'dress',
  topColor: '#a83c46',
  character: { skinTone: 0.35, height: 1.78, hairStyle: 'long', hairColor: '#d9b380' },
};
const PERSON_B = {
  name: 'ソラタ',
  topStyle: 'hoodie',
  topColor: '#3a4152',
  character: { skinTone: 0.85, height: 1.56, hairStyle: 'short', hairColor: '#201612' },
};

async function main() {
  const win = new BrowserWindow({
    width: 1100,
    height: 900,
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

  console.log('STEP 1: name a person through the UI; seed becomes FR5');
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit(${JSON.stringify(PERSON_A)})`,
  );
  // open the character tab (first tab) and set the name in the field
  await win.webContents.executeJavaScript(
    `document.querySelectorAll('#tabs button')[0].click()`,
  );
  await poll(win, `Boolean(document.getElementById('person-name'))`, 10000, 'name field');
  await win.webContents.executeJavaScript(
    `(() => {
       const n = document.getElementById('person-name');
       n.value = 'ミライ';
       n.dispatchEvent(new Event('change', { bubbles: true }));
       return true;
     })()`,
  );
  results.checks.afterName = await poll(
    win,
    `(() => { const o = window.__fittingRoom.getOutfit(); return o.name === 'ミライ' ? o : null; })()`,
    10000,
    'name applied',
  );
  const seedMirai = await win.webContents.executeJavaScript(`window.__fittingRoom.getSeed()`);
  results.checks.seedMirai = seedMirai;
  results.checks.seedIsV5 = String(seedMirai).startsWith('FR5-');
  results.checks.rosterAtStart = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getRoster()`,
  );
  results.checks.lineageAtStart = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getLineage()`,
  );

  console.log('STEP 2: profile card -> scramble -> restore brings the name back');
  const card = await win.webContents.executeJavaScript(`window.__fittingRoom.cardDataURL()`);
  const cardPng = saveDataURL(card, 'share-card-identity.png');
  results.checks.cardBytes = cardPng.length;
  // the card's embedded seed is the named person's; no lineage
  // vocabulary and no storage keys ride inside the PNG bytes
  const cardText = cardPng.toString('latin1');
  results.checks.cardCarriesSeed = cardText.includes('FittingRoomSeed');
  results.checks.cardHasNoLineage = !cardText.includes('lineage') && !cardText.includes('fitting-room.');
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit(${JSON.stringify(PERSON_B)})`,
  );
  results.checks.scrambledName = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit().name`,
  );
  const restored = await win.webContents.executeJavaScript(
    `window.__fittingRoom.applyCardDataURL(${JSON.stringify(card)})`,
  );
  results.checks.cardRestored = restored;
  results.checks.restoredOutfit = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  results.checks.restoredSeed = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getSeed()`,
  );
  results.checks.restoreRecorded = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getLineage().some((e) => e.kind === 'restore')`,
  );

  console.log('STEP 3: roster — a second person, then call each back');
  await win.webContents.executeJavaScript(`document.getElementById('roster-new').click()`);
  await poll(
    win,
    `window.__fittingRoom.getRoster().entries.length === 2`,
    10000,
    'roster has two entries',
  );
  // name the new person ハナ through the name field
  await win.webContents.executeJavaScript(
    `(() => {
       const n = document.getElementById('person-name');
       n.value = 'ハナ';
       n.dispatchEvent(new Event('change', { bubbles: true }));
       return true;
     })()`,
  );
  await poll(
    win,
    `window.__fittingRoom.getOutfit().name === 'ハナ' ? true : null`,
    10000,
    'second person named',
  );
  results.checks.rosterTwo = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getRoster()`,
  );
  // call ミライ back by tapping her roster row
  await win.webContents.executeJavaScript(
    `(() => {
       const btns = [...document.querySelectorAll('.roster-load')];
       const b = btns.find((x) => x.textContent.includes('ミライ'));
       if (!b) throw new Error('roster row for ミライ not found: ' + btns.map((x) => x.textContent).join(' | '));
       b.click();
       return true;
     })()`,
  );
  results.checks.calledBack = await poll(
    win,
    `window.__fittingRoom.getOutfit().name === 'ミライ' ? window.__fittingRoom.getOutfit() : null`,
    10000,
    'called back Mirai',
  );
  // and ハナ again
  await win.webContents.executeJavaScript(
    `(() => {
       const b = [...document.querySelectorAll('.roster-load')].find((x) => x.textContent.includes('ハナ'));
       if (!b) throw new Error('roster row for ハナ not found');
       b.click();
       return true;
     })()`,
  );
  await poll(
    win,
    `window.__fittingRoom.getOutfit().name === 'ハナ' ? true : null`,
    10000,
    'called back Hana',
  );
  // panel evidence: scroll the roster/history into view
  await win.webContents.executeJavaScript(
    `(() => { const o = document.getElementById('options'); o.scrollTop = o.scrollHeight; })()`,
  );
  await sleep(1200);
  const panelShot = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-identity-panel.png'), panelShot.toPNG());

  console.log('STEP 4: blend through the UI — parents land in the lineage only');
  const seedA = await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit(${JSON.stringify(PERSON_A)}); window.__fittingRoom.getSeed()`,
  );
  const seedB = await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit(${JSON.stringify(PERSON_B)}); window.__fittingRoom.getSeed()`,
  );
  results.checks.parentSeeds = { seedA, seedB };
  await win.webContents.executeJavaScript(
    `(() => {
       const set = (id, v) => {
         const n = document.getElementById(id);
         n.value = v;
         n.dispatchEvent(new Event('input', { bubbles: true }));
       };
       set('blend-seed-a', ${JSON.stringify(seedA)});
       set('blend-seed-b', ${JSON.stringify(seedB)});
       document.getElementById('blend-generate').click();
       return true;
     })()`,
  );
  await poll(win, `Boolean(document.getElementById('blend-apply'))`, 10000, 'blend preview ready');
  await win.webContents.executeJavaScript(`document.getElementById('blend-apply').click()`);
  results.checks.childOutfit = await poll(
    win,
    `(() => { const o = window.__fittingRoom.getOutfit(); return o.name === '' ? o : null; })()`,
    10000,
    'child applied, unnamed',
  );
  const lineage = await win.webContents.executeJavaScript(`window.__fittingRoom.getLineage()`);
  results.checks.lineage = lineage;
  const blendEvent = [...lineage].reverse().find((e) => e.kind === 'blend');
  results.checks.blendParentsRecorded =
    Boolean(blendEvent) && blendEvent.parents && blendEvent.parents[0] === seedA && blendEvent.parents[1] === seedB;
  const childSeed = await win.webContents.executeJavaScript(`window.__fittingRoom.getSeed()`);
  results.checks.childSeed = childSeed;
  results.checks.childSeedHasNoParentage =
    childSeed !== seedA && childSeed !== seedB && !childSeed.includes('lineage');
  results.checks.historyShowsParents = await win.webContents.executeJavaScript(
    // the "blended from: A × B" note under the blend event is
    // the only place a '×' appears in the panel
    `document.getElementById('options').textContent.includes('×')`,
  );
  await sleep(1500);
  const childShot = await win.webContents.executeJavaScript(
    `document.getElementById('gl').toDataURL('image/png')`,
  );
  saveDataURL(childShot, 'screenshot-identity-child.png');

  console.log('STEP 5: reload — roster and lineage persist');
  await win.webContents.reload();
  await waitForBridge(win);
  await waitForRenderedFrame(win);
  results.checks.afterReload = await win.webContents.executeJavaScript(
    `({
       roster: window.__fittingRoom.getRoster(),
       lineageKinds: window.__fittingRoom.getLineage().map((e) => e.kind),
       seed: window.__fittingRoom.getSeed(),
     })`,
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
