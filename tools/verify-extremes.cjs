// Parameter-extremes screenshot matrix (WORLD-CLASS, "no
// breakage" requirement): drives the production build in Electron
// under SwiftShader and renders the person at the extremes of
// every character parameter — each range parameter at its min and
// its max, the all-min and all-max corners, and every pose —
// checking each cell for breakage automatically:
//   - every set_character command is accepted (no rejections)
//   - a real frame renders (canvas payload in a sane band)
//   - the frame is not a uniform blank (pixel variance sampled
//     from the captured bitmap)
//   - stage stats stay sane (triangle and draw-call bands)
//   - no console errors during the cell
// Per-cell screenshots land in evidence/extremes/ for the human
// pass; report.json carries the machine verdicts. The adult-safety
// sanitizer may legitimately correct a corner combination — the
// matrix checks "renders without breakage", not "values applied
// raw".
// Run: xvfb-run -a <electron> tools/verify-extremes.cjs
const { app, BrowserWindow, nativeImage } = require('electron');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

app.commandLine.appendSwitch('use-angle', 'swiftshader');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.disableHardwareAcceleration();

const DIST = path.join(__dirname, '..', 'dist');
const OUT = path.join(__dirname, '..', 'evidence', 'extremes');
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
const FACE_PARAMS = {
  eyeSize: [0.8, 1.25, 1],
  eyeSpacing: [0.85, 1.18, 1],
  eyeHeight: [-0.01, 0.01, 0],
  eyeShape: [0.55, 0.95, 0.74],
  eyeTilt: [-0.2, 0.2, 0],
  browHeight: [-0.008, 0.008, 0],
  browTilt: [-0.25, 0.25, 0],
  noseWidth: [0.75, 1.35, 1],
  noseProminence: [0.7, 1.4, 1],
  lipWidth: [0.75, 1.3, 1],
  lipFullness: [0.6, 1.6, 1],
  faceWidth: [0.9, 1.1, 1],
  asymmetry: [0, 1, 0.35],
};
const ALL_PARAMS = { ...BODY_PARAMS, ...FACE_PARAMS };
const POSES = ['stand', 'wave', 'cheer', 'peace', 'relax'];

function defaults() {
  const d = {};
  for (const [k, v] of Object.entries(ALL_PARAMS)) d[k] = v[2];
  return d;
}

function buildCells() {
  const cells = [];
  cells.push({ name: 'baseline', params: defaults(), pose: 'stand', face: false });
  for (const [k, [min, max]] of Object.entries(BODY_PARAMS)) {
    cells.push({ name: `body-${k}-min`, params: { ...defaults(), [k]: min }, pose: 'stand', face: false });
    cells.push({ name: `body-${k}-max`, params: { ...defaults(), [k]: max }, pose: 'stand', face: false });
  }
  const allMin = defaults(); const allMax = defaults();
  for (const [k, [min, max]] of Object.entries(ALL_PARAMS)) { allMin[k] = min; allMax[k] = max; }
  cells.push({ name: 'corner-all-min', params: allMin, pose: 'stand', face: false });
  cells.push({ name: 'corner-all-max', params: allMax, pose: 'stand', face: false });
  for (const pose of POSES) {
    cells.push({ name: `pose-${pose}`, params: defaults(), pose, face: false });
  }
  cells.push({ name: 'pose-wave-tallest', params: { ...defaults(), height: BODY_PARAMS.height[1] }, pose: 'wave', face: false });
  cells.push({ name: 'pose-cheer-shortest', params: { ...defaults(), height: BODY_PARAMS.height[0] }, pose: 'cheer', face: false });
  for (const [k, [min, max]] of Object.entries(FACE_PARAMS)) {
    cells.push({ name: `face-${k}-min`, params: { ...defaults(), [k]: min }, pose: 'stand', face: true });
    cells.push({ name: `face-${k}-max`, params: { ...defaults(), [k]: max }, pose: 'stand', face: true });
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

async function waitFrame(win) {
  const t0 = Date.now();
  for (;;) {
    const len = await win.webContents.executeJavaScript(
      `document.getElementById('gl').toDataURL('image/png').length`,
    );
    if (len > 60000) return len;
    if (Date.now() - t0 > 30000) throw new Error(`frame timeout (len=${len})`);
    await sleep(500);
  }
}

function frameStats(pngBuffer) {
  const img = nativeImage.createFromBuffer(pngBuffer);
  const bmp = img.getBitmap();
  const size = img.getSize();
  const px = size.width * size.height;
  let n = 0; let sum = 0; let sumSq = 0;
  const colors = new Set();
  for (let i = 0; i + 3 < bmp.length; i += 4 * 97) {
    const lum = 0.2126 * bmp[i + 2] + 0.7152 * bmp[i + 1] + 0.0722 * bmp[i];
    sum += lum; sumSq += lum * lum; n++;
    colors.add((bmp[i + 2] >> 4) << 8 | (bmp[i + 1] >> 4) << 4 | (bmp[i] >> 4));
  }
  const mean = sum / n;
  return { width: size.width, height: size.height, pixels: px, variance: sumSq / n - mean * mean, distinctColors: colors.size };
}

app.whenReady().then(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const win = new BrowserWindow({ width: 1100, height: 850, show: false });
  const consoleErrors = [];
  win.webContents.on('console-message', (_e, level, message) => {
    if (level >= 3) consoleErrors.push(String(message).slice(0, 200));
  });
  const report = { cells: [], failed: 0 };
  try {
    await win.loadURL(`http://127.0.0.1:${port}/`);
    await waitForBridge(win);
    await sleep(2500);
    const cells = buildCells();
    let facePhaseStarted = false;
    for (const cell of cells) {
      if (cell.face && !facePhaseStarted) {
        // Reload for a clean camera, then move to the face close-up.
        await win.loadURL(`http://127.0.0.1:${port}/`);
        await waitForBridge(win);
        await sleep(2500);
        await win.webContents.executeJavaScript(`window.__fittingRoom.focusFace(0)`);
        facePhaseStarted = true;
      }
      const errMark = consoleErrors.length;
      const verdict = { name: cell.name, ok: true, problems: [] };
      try {
        const cmds = Object.entries(cell.params).map(([param, value]) => ({ type: 'set_character', param, value }));
        const r = await win.webContents.executeJavaScript(
          `window.__fittingRoom.runCommands(${JSON.stringify(cmds)})`,
        );
        if (r.rejected && r.rejected.length > 0) {
          verdict.ok = false;
          verdict.problems.push(`rejected: ${JSON.stringify(r.rejected).slice(0, 200)}`);
        }
        await win.webContents.executeJavaScript(
          `window.__fittingRoom.setOutfit({ pose: ${JSON.stringify(cell.pose)} })`,
        );
        await sleep(1100);
        const dataLen = await waitFrame(win);
        const dataUrl = await win.webContents.executeJavaScript(
          `document.getElementById('gl').toDataURL('image/png')`,
        );
        const png = Buffer.from(dataUrl.split(',')[1], 'base64');
        fs.writeFileSync(path.join(OUT, `${cell.name}.png`), png);
        const st = frameStats(png);
        const stats = await win.webContents.executeJavaScript(`window.__fittingRoom.measureStageStats()`);
        verdict.frame = { dataLen, ...st, triangles: stats.triangles, drawCalls: stats.withoutMirror };
        if (st.variance < 50) { verdict.ok = false; verdict.problems.push(`frame looks uniform (variance ${st.variance.toFixed(1)})`); }
        if (st.distinctColors < 20) { verdict.ok = false; verdict.problems.push(`too few colors (${st.distinctColors})`); }
        if (!(stats.triangles > 30000 && stats.triangles < 200000)) { verdict.ok = false; verdict.problems.push(`triangles out of band: ${stats.triangles}`); }
        if (!(stats.withoutMirror >= 40)) { verdict.ok = false; verdict.problems.push(`draw calls too low: ${stats.withoutMirror}`); }
      } catch (e) {
        verdict.ok = false;
        verdict.problems.push(`exception: ${e && e.message ? e.message : String(e)}`);
      }
      const newErrors = consoleErrors.slice(errMark);
      if (newErrors.length > 0) { verdict.ok = false; verdict.problems.push(`console errors: ${newErrors.join(' | ').slice(0, 300)}`); }
      if (!verdict.ok) report.failed++;
      report.cells.push(verdict);
      console.log(`CELL ${cell.name} ${verdict.ok ? 'OK' : 'FAIL: ' + verdict.problems.join('; ')}`);
    }
  } catch (e) {
    console.log('EXTREMES_ERROR ' + (e && e.message ? e.message : String(e)));
    report.failed = -1;
  } finally {
    fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
    console.log(`EXTREMES_SUMMARY ${JSON.stringify({ cells: report.cells.length, failed: report.failed })}`);
    app.quit();
    server.close();
    process.exitCode = report.failed === 0 ? 0 : 1;
  }
});
