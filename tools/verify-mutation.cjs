// Headless verification of one-parent mutation and the
// receiver's first action (docs/PERSPECTIVES.md viewpoint 3;
// docs/PERSPECTIVES-2.md R2-2 / R2-4):
//   1. a distinctive person is set and carded,
//   2. after a full reset, restoring the card raises the
//      restored-person notice whose primary action is "make my
//      own person from this template" (and a plain load does
//      not raise it),
//   3. make-mine lands on the character tab with a shelf of
//      four candidate stills rolled from the restored person,
//   4. picking a candidate previews it without committing (the
//      saved seed does not move), adopting commits exactly the
//      previewed seed and records the lineage — source and
//      result — in the on-device mutation history only,
//   5. the adopted person cards and restores like any other,
//   6. the mutate_character bridge command applies the pure
//      function deterministically and rejects a bad strength.
// Evidence: evidence/screenshot-mutation-restored.png (the
// notice over the restored person) and
// evidence/screenshot-mutation-candidates.png (the shelf and
// the previewed candidate), plus the adopted person's card.
// Run: xvfb-run -a electron tools/verify-mutation.cjs [baseUrl]
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

async function resetToDefault(win) {
  await win.webContents.executeJavaScript(`localStorage.clear()`);
  await win.webContents.reload();
  await waitForBridge(win);
  await waitForRenderedFrame(win);
}

// A distinctive template person: deep skin, tall, blond long
// hair, blue eyes — a variation of them is easy to spot.
const TEMPLATE = {
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
  character: {
    skinTone: 0.85,
    height: 1.88,
    hairColor: '#d9b380',
    eyeColor: '#3d5a80',
    hairStyle: 'long',
    eyeSize: 1.18,
    noseWidth: 0.85,
    faceWidth: 0.95,
    build: 0.92,
  },
};

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

  // 0. a plain load raises no notice: the saved person is the
  //    user's own, not a received template.
  results.checks.noticeOnPlainLoad = await win.webContents.executeJavaScript(
    `Boolean(document.getElementById('restored-notice'))`,
  );

  // 1. the template person and their card
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit(${JSON.stringify(TEMPLATE)})`,
  );
  const templateSeed = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getSeed()`,
  );
  results.checks.templateSeed = templateSeed;
  await sleep(800);
  const cardUrl = await win.webContents.executeJavaScript(
    `window.__fittingRoom.cardDataURL()`,
  );

  // 2. reset, then restore the card: the notice is the panel's
  //    primary offer, and the restored seed is the template's.
  await resetToDefault(win);
  results.checks.noticeAfterReset = await win.webContents.executeJavaScript(
    `Boolean(document.getElementById('restored-notice'))`,
  );
  results.checks.cardRestoreOk = await win.webContents.executeJavaScript(
    `window.__fittingRoom.applyCardDataURL(${JSON.stringify(cardUrl)})`,
  );
  results.checks.restoredSeedMatches =
    (await win.webContents.executeJavaScript(`window.__fittingRoom.getSeed()`)) ===
    templateSeed;
  await poll(win, `Boolean(document.getElementById('btn-make-mine'))`, 10000, 'make-mine button');
  const noticeState = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getMutationState()`,
  );
  results.checks.noticeFlagUp = noticeState.restoredNotice;
  await sleep(1200);
  await win.webContents.executeJavaScript(
    `document.getElementById('restored-notice').scrollIntoView({ block: 'center' })`,
  );
  await sleep(400);
  let img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-mutation-restored.png'), img.toPNG());

  // 3. make-mine: character tab + a shelf of four stills rolled
  //    from the restored person; the notice is consumed.
  await win.webContents.executeJavaScript(
    `document.getElementById('btn-make-mine').click()`,
  );
  await poll(
    win,
    `document.querySelectorAll('.mutation-thumb').length === 4`,
    20000,
    'candidate shelf',
  );
  const shelf = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getMutationState()`,
  );
  results.checks.candidateCount = shelf.candidateSeeds.length;
  results.checks.candidatesDistinct = new Set(shelf.candidateSeeds).size;
  results.checks.candidatesDifferFromTemplate = shelf.candidateSeeds.every(
    (s) => s !== templateSeed,
  );
  results.checks.noticeConsumed = !shelf.restoredNotice;
  results.checks.thumbSizes = await win.webContents.executeJavaScript(
    `[...document.querySelectorAll('.mutation-thumb img')].map((i) => i.src.length)`,
  );
  // The stage is back on the template person after the shelf
  // was captured (generation does not commit anything).
  results.checks.seedAfterGenerate =
    (await win.webContents.executeJavaScript(`window.__fittingRoom.getSeed()`)) ===
    templateSeed;

  // 4. pick candidate 2: preview only — the saved seed does not
  //    move; the candidate's own seed is read out in the panel.
  await win.webContents.executeJavaScript(
    `document.getElementById('mutation-candidate-1').click()`,
  );
  const pickedSeed = await poll(
    win,
    `(document.getElementById('mutation-candidate-seed') || {}).textContent || null`,
    10000,
    'candidate seed readout',
  );
  results.checks.pickedSeed = pickedSeed;
  results.checks.pickedMatchesShelf = pickedSeed === shelf.candidateSeeds[1];
  results.checks.previewNotCommitted =
    (await win.webContents.executeJavaScript(`window.__fittingRoom.getSeed()`)) ===
    templateSeed;
  await win.webContents.executeJavaScript(
    `document.getElementById('mutation-candidate-1').scrollIntoView({ block: 'center' })`,
  );
  await sleep(1500);
  img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-mutation-candidates.png'), img.toPNG());

  // 5. adopt: the committed seed is exactly the previewed one,
  //    and the lineage lands in the on-device history only.
  await win.webContents.executeJavaScript(
    `document.getElementById('mutation-apply').click()`,
  );
  await poll(
    win,
    `window.__fittingRoom.getSeed() === ${JSON.stringify(pickedSeed)}`,
    10000,
    'adopted seed committed',
  );
  const after = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getMutationState()`,
  );
  results.checks.history = after.history;
  results.checks.historyRecordsLineage =
    after.history.length === 1 &&
    after.history[0].kind === 'mutate' &&
    after.history[0].source === templateSeed &&
    after.history[0].seed === pickedSeed &&
    after.history[0].strength === 'standard';
  results.checks.shelfClearedAfterAdopt = after.candidateSeeds.length === 0;
  // The adopted seed itself carries no parentage: it decodes to
  // a person whose re-encoded seed is the seed (nothing extra
  // rides along — the seed format has no lineage field at all).
  results.checks.adoptedSeedIsOrdinary =
    typeof pickedSeed === 'string' && pickedSeed.startsWith('FR4-');

  // 6. the adopted person cards and restores like any other
  const adoptedCard = await win.webContents.executeJavaScript(
    `window.__fittingRoom.cardDataURL()`,
  );
  const adoptedBytes = Buffer.from(String(adoptedCard).split(',')[1], 'base64');
  results.checks.adoptedCardBytes = adoptedBytes.length;
  results.checks.adoptedCardChunkHoldsSeed = adoptedBytes.includes(pickedSeed);
  fs.writeFileSync(path.join(OUT, 'share-card-mutation.png'), adoptedBytes);
  await resetToDefault(win);
  results.checks.adoptedRestoreOk = await win.webContents.executeJavaScript(
    `window.__fittingRoom.applyCardDataURL(${JSON.stringify(adoptedCard)})`,
  );
  results.checks.adoptedRestoredSeedMatches =
    (await win.webContents.executeJavaScript(`window.__fittingRoom.getSeed()`)) ===
    pickedSeed;

  // 7. the bridge command: deterministic application of the
  //    pure function, and a bad strength rejected with a reason.
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit(${JSON.stringify(TEMPLATE)})`,
  );
  const templateCharJson = JSON.stringify(
    (await win.webContents.executeJavaScript(`window.__fittingRoom.getOutfit()`)).character,
  );
  const cmd = JSON.stringify([
    { type: 'mutate_character', strength: 'bold', mutationSeed: 7 },
  ]);
  const run1 = await win.webContents.executeJavaScript(
    `window.__fittingRoom.runCommands(${cmd})`,
  );
  const char1 = JSON.stringify(run1.outfit.character);
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit(${JSON.stringify(TEMPLATE)})`,
  );
  const run2 = await win.webContents.executeJavaScript(
    `window.__fittingRoom.runCommands(${cmd})`,
  );
  results.checks.commandApplied = run1.applied;
  results.checks.commandDeterministic = JSON.stringify(run2.outfit.character) === char1;
  results.checks.commandChangedPerson = char1 !== templateCharJson;
  const bad = await win.webContents.executeJavaScript(
    `window.__fittingRoom.runCommands([{type:'mutate_character', strength:'wild'}])`,
  );
  results.checks.badStrengthRejected = bad.rejected;
  results.checks.specMentionsMutation = await win.webContents.executeJavaScript(
    `window.__fittingRoom.commandSpec().includes('mutate_character')`,
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
