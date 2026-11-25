// Clothing poke-through matrix (backlog #5): drives the production
// build in Electron and, for every outfit x body-parameter extreme x
// pose cell, turns the figure through eight views with the leak
// probe on (avatar.ts probeLeaks) and counts pixels of
//   - body surface lying under the worn garments. It is left out of
//     normal drawing, so this is what the body mask removes; the
//     cell also checks that the mask really left triangles out.
//   - base layer lying under the worn garments. The base layer is
//     always drawn (LEGAL-ETHICS J-10), so this is what the garment
//     offsets must keep covered: it fails above BASE_LEAK_MAX.
// Screenshots of every outfit at the corners land in
// evidence/penetration/ for the human pass; report.json carries
// the per-cell counts.
// FR_CELLS=<regex> runs only the cells whose name matches.
// Run: xvfb-run -a <electron> tools/verify-penetration.cjs
const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

// FR_HARDWARE_GL=1 keeps the machine's own GL (for hosts where
// SwiftShader cannot create a context).
if (!process.env.FR_HARDWARE_GL) {
  app.commandLine.appendSwitch('use-angle', 'swiftshader');
  app.commandLine.appendSwitch('disable-gpu-sandbox');
  app.disableHardwareAcceleration();
}

const DIST = path.join(__dirname, '..', 'dist');
const OUT = path.join(__dirname, '..', 'evidence', 'penetration');
fs.mkdirSync(OUT, { recursive: true });
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2' };

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const file = path.join(DIST, urlPath === '/' ? 'index.html' : urlPath);
  if (!file.startsWith(DIST) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('not found'); return;
  }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Range parameters and defaults, mirrored from
// CHARACTER_PARAM_SPECS / DEFAULT_CHARACTER in src/character.ts.
// If a name drifts, runCommands rejects it and the cell fails
// loudly — the matrix never silently tests the wrong thing.
const BODY_PARAMS = {
  skinTone: [0, 1, 0.28],
  height: [1.45, 1.95, 1.74],
  shoulderWidth: [0.88, 1.14, 1],
  waist: [0.82, 1.22, 1],
  hip: [0.86, 1.2, 1],
  bust: [0.8, 1.3, 1],
  build: [0.85, 1.2, 1],
};
const POSES = ['stand', 'wave', 'cheer', 'peace', 'relax'];
const OUTFITS = {
  'tee-shorts': { topStyle: 'tee', outerStyle: 'none', bottomStyle: 'shorts' },
  'blouse-skirt': { topStyle: 'blouse', outerStyle: 'none', bottomStyle: 'skirt' },
  'hoodie-pants': { topStyle: 'hoodie', outerStyle: 'none', bottomStyle: 'pants' },
  'dress': { topStyle: 'dress', outerStyle: 'none', bottomStyle: 'none' },
  'tee-jacket-pants': { topStyle: 'tee', outerStyle: 'jacket', bottomStyle: 'pants' },
  'blouse-cardigan-skirtLong': { topStyle: 'blouse', outerStyle: 'cardigan', bottomStyle: 'skirtLong' },
  'dressLong-coat': { topStyle: 'dressLong', outerStyle: 'coat', bottomStyle: 'none' },
};
/** Most base-layer pixels allowed to show, summed over the eight
 *  views of one cell (1100x822 each, so 0.03 % of the pixels). The
 *  count includes base layer seen through an opening wider than the
 *  probe's edge margin, such as the dress's armholes. */
const BASE_LEAK_MAX = Number(process.env.FR_BASE_LEAK_MAX || 2000);

function defaults() {
  const d = {};
  for (const [k, v] of Object.entries(BODY_PARAMS)) d[k] = v[2];
  return d;
}

function buildCells() {
  const bodies = [['baseline', defaults()]];
  const allMin = defaults(); const allMax = defaults();
  for (const [k, [min, max]] of Object.entries(BODY_PARAMS)) {
    allMin[k] = min; allMax[k] = max;
    if (k === 'skinTone' || k === 'height') continue;
    bodies.push([`${k}-min`, { ...defaults(), [k]: min }]);
    bodies.push([`${k}-max`, { ...defaults(), [k]: max }]);
  }
  bodies.push(['all-min', allMin], ['all-max', allMax]);
  const cells = [];
  for (const [outfit, garments] of Object.entries(OUTFITS))
    for (const [body, params] of bodies)
      for (const pose of POSES) {
        // Single-parameter extremes run in the two poses that bracket
        // the arm range; baseline and the corners run in every pose.
        const everyPose = body === 'baseline' || body.startsWith('all-');
        if (!everyPose && pose !== 'stand' && pose !== 'cheer') continue;
        cells.push({ name: `${outfit}_${body}_${pose}`, garments, params, pose, shot: body.startsWith('all-') && (pose === 'stand' || pose === 'cheer') });
      }
  return cells;
}

async function waitForBridge(win) {
  await win.webContents.executeJavaScript(
    `new Promise((res, rej) => {
       const t0 = Date.now();
       const iv = setInterval(() => {
         if (window.__fittingRoom && window.__fittingRoom.ready) { clearInterval(iv); res(true); }
         else if (Date.now() - t0 > 30000) { clearInterval(iv); rej(new Error('bridge timeout')); }
       }, 100);
     })`,
  );
}

app.whenReady().then(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const win = new BrowserWindow({ width: 1100, height: 850, show: false });
  const consoleErrors = [];
  win.webContents.on('console-message', (_e, level, message) => {
    if (level >= 3) consoleErrors.push(String(message).slice(0, 200));
  });
  const report = { baseLeakMax: BASE_LEAK_MAX, cells: [], failed: 0, worstBase: 0, bodyPixelsMasked: 0 };
  try {
    await win.loadURL(`http://127.0.0.1:${port}/`);
    await waitForBridge(win);
    await sleep(2500);
    for (const cell of buildCells().filter((c) => new RegExp(process.env.FR_CELLS || '').test(c.name))) {
      const errMark = consoleErrors.length;
      const verdict = { name: cell.name, ok: true, problems: [] };
      try {
        const cmds = Object.entries(cell.params).map(([param, value]) => ({ type: 'set_character', param, value }));
        const r = await win.webContents.executeJavaScript(`window.__fittingRoom.runCommands(${JSON.stringify(cmds)})`);
        if (r.rejected && r.rejected.length > 0) { verdict.ok = false; verdict.problems.push(`rejected: ${JSON.stringify(r.rejected).slice(0, 200)}`); }
        await win.webContents.executeJavaScript(`window.__fittingRoom.setOutfit(${JSON.stringify({ ...cell.garments, pose: cell.pose })})`);
        await sleep(1100);
        if (cell.shot) {
          const dataUrl = await win.webContents.executeJavaScript(`document.getElementById('gl').toDataURL('image/jpeg', 0.85)`);
          fs.writeFileSync(path.join(OUT, `${cell.name}.jpg`), Buffer.from(dataUrl.split(',')[1], 'base64'));
        }
        const leaks = await win.webContents.executeJavaScript(`window.__fittingRoom.measureLeaks()`);
        verdict.leaks = leaks;
        report.worstBase = Math.max(report.worstBase, leaks.base);
        report.bodyPixelsMasked += leaks.body;
        if (!(leaks.maskedTriangles > 0)) { verdict.ok = false; verdict.problems.push('no body triangles masked'); }
        if (leaks.base > BASE_LEAK_MAX) { verdict.ok = false; verdict.problems.push(`base layer shows through: ${leaks.base} px`); }
      } catch (e) {
        verdict.ok = false;
        verdict.problems.push(`exception: ${e && e.message ? e.message : String(e)}`);
      }
      const newErrors = consoleErrors.slice(errMark);
      if (newErrors.length > 0) { verdict.ok = false; verdict.problems.push(`console errors: ${newErrors.join(' | ').slice(0, 300)}`); }
      if (!verdict.ok) report.failed++;
      report.cells.push(verdict);
      console.log(`CELL ${cell.name} ${JSON.stringify(verdict.leaks)} ${verdict.ok ? 'OK' : 'FAIL: ' + verdict.problems.join('; ')}`);
    }
  } catch (e) {
    console.log('PENETRATION_ERROR ' + (e && e.message ? e.message : String(e)));
    report.failed = -1;
  } finally {
    fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
    console.log(`PENETRATION_SUMMARY ${JSON.stringify({ cells: report.cells.length, failed: report.failed, worstBase: report.worstBase, bodyPixelsMasked: report.bodyPixelsMasked })}`);
    app.quit();
    server.close();
    process.exitCode = report.failed === 0 ? 0 : 1;
  }
});
