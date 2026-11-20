// Headless verification of the VR dress-up surface (DESIGN.md
// §22). There is no headset in this environment, so this script
// verifies exactly what can honestly be verified without one:
//
//  Run A (no WebXR at all — the plain environment):
//   - the "enter VR" button stays hidden and the note explains
//     why VR cannot be entered;
//   - the flat experience is untouched (bridge ready, panel of
//     the flat UI works, a frame renders).
//
//  Run B (navigator.xr mocked by a local static server that
//  serves the same dist with the mock injected into index.html
//  — a separate origin, so its service worker can never leak
//  into Run A; the mock reports immersive-vr as supported and
//  its requestSession records its arguments and then rejects,
//  as a headset-less browser would):
//   - the enter button appears;
//   - clicking it requests an 'immersive-vr' session with the
//     local-floor feature, and the app survives the rejection
//     (toast, still flat, still functional);
//   - the 3D dress-up panel exists in the scene with its full
//     button set, built from the catalogs;
//   - pressing panel buttons by action id — through the same
//     dispatch a controller select uses — changes the outfit
//     (garment, color, pose), switches the panel page, and
//     snap-turns the player rig around the podium;
//   - a saved look written to the looks store appears on the
//     panel and applies in one press;
//   - the VR photo path composes a real share card (seed chunk
//     included — it restores through the ordinary card path);
//   - draw calls are measured with and without the mirror for
//     the DESIGN.md record;
//   - evidence screenshots: the room interior with the VR
//     panel, from the flat camera.
//
//  What this does NOT verify: an actual immersive session on a
//  headset — presence, comfort, controller feel, the mirror in
//  stereo. That is recorded as unverified in DESIGN.md §22.
//
// Run: xvfb-run -a electron tools/verify-vr.cjs [baseUrl]
const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const http = require('node:http');
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

const MOCK_XR = `
  window.__xrCalls = [];
  Object.defineProperty(navigator, 'xr', {
    configurable: true,
    value: {
      isSessionSupported: async (mode) => {
        window.__xrCalls.push(['isSessionSupported', mode]);
        return mode === 'immersive-vr';
      },
      requestSession: async (mode, opts) => {
        window.__xrCalls.push(['requestSession', mode, JSON.stringify(opts || {})]);
        throw new DOMException('mock xr: no headset in this environment', 'NotSupportedError');
      },
    },
  });
`;

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

async function makeWindow() {
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
  return win;
}

async function runA() {
  console.log('RUN A: no WebXR');
  const win = await makeWindow();
  await win.loadURL(BASE);
  await waitForBridge(win);
  await sleep(1500);
  results.checks.a_vrState = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getVrState()`,
  );
  results.checks.a_buttonHidden = await win.webContents.executeJavaScript(
    `document.getElementById('btn-vr').hidden`,
  );
  results.checks.a_noteShown = await win.webContents.executeJavaScript(
    `(() => { const n = document.getElementById('vr-note'); return !n.hidden && n.textContent.length > 10; })()`,
  );
  results.checks.a_flatWorks = await win.webContents.executeJavaScript(
    `(() => { const o = window.__fittingRoom.getOutfit(); return o && typeof o.topStyle === 'string'; })()`,
  );
  results.checks.a_qualityLevel = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getVrState().qualityLevel`,
  );
  // The window is NOT destroyed: in this environment (Electron +
  // SwiftShader), destroying a window that ran the WebGL app
  // makes the NEXT window's navigation fail with ERR_FAILED
  // (measured — the request reaches the server, then the load
  // dies). Navigating away stops the app's render loop and
  // releases its contexts without that side effect; app.exit
  // takes every window down at the end.
  await win.loadURL('about:blank');
}

const MOCK_PORT = 8736;
const MOCK_BASE = `http://127.0.0.1:${MOCK_PORT}/`;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.ico': 'image/x-icon',
};

/** Serve dist/ with MOCK_XR injected into index.html. The
 *  injection is a classic script in <head>, so it runs before
 *  the app's module bundle defines anything. Injection over
 *  CDP (Page.addScriptToEvaluateOnNewDocument) was the first
 *  approach; in this environment the debugger commands stall
 *  under load, so the mock moved to the transport layer, where
 *  it is deterministic. */
function startMockServer() {
  const distDir = path.join(__dirname, '..', 'dist');
  const server = http.createServer((req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      const rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
      const filePath = path.normalize(path.join(distDir, rel));
      if (!filePath.startsWith(distDir) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        res.writeHead(404);
        res.end('not found');
        return;
      }
      const ext = path.extname(filePath);
      let body = fs.readFileSync(filePath);
      if (rel === 'index.html') {
        const html = body.toString('utf8').replace(
          '<head>',
          `<head>\n<script>\n${MOCK_XR}\n</script>`,
        );
        body = Buffer.from(html, 'utf8');
      }
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(body);
    } catch (err) {
      res.writeHead(500);
      res.end(String(err));
    }
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(MOCK_PORT, '127.0.0.1', () => resolve(server));
  });
}

async function runB() {
  console.log('RUN B: mocked WebXR (supported, session rejects)');
  const win = await makeWindow();
  await win.loadURL(MOCK_BASE);
  await waitForBridge(win);

  // 1. the entry appears once support is confirmed
  results.checks.b_buttonShown = await poll(
    win,
    `!document.getElementById('btn-vr').hidden`,
    15000,
    'vr button appears',
  );
  results.checks.b_supportCall = await win.webContents.executeJavaScript(`window.__xrCalls`);

  // 2. clicking requests the right session; rejection is survived
  await win.webContents.executeJavaScript(`document.getElementById('btn-vr').click()`);
  results.checks.b_requestCall = await poll(
    win,
    `window.__xrCalls.find((c) => c[0] === 'requestSession') || null`,
    15000,
    'requestSession called',
  );
  await sleep(1200);
  results.checks.b_stillFlat = await win.webContents.executeJavaScript(
    `(() => { const s = window.__fittingRoom.getVrState(); return s.presenting === false && s.support === 'supported'; })()`,
  );

  // 3. the panel exists with a full button set (page 0 = clothes;
  //    the extras page's buttons are checked after switching to
  //    it in step 4 — the panel only ever carries one page of
  //    pressable buttons at a time, by design)
  const vr = await win.webContents.executeJavaScript(`window.__fittingRoom.getVrState()`);
  results.checks.b_panelButtons = vr.panelButtons;
  results.checks.b_panelHasBasics = ['f:topStyle:dress', 'c:topColor:#ff8fab', 'page:0', 'page:1'].every(
    (id) => vr.panelActionIds.includes(id),
  );

  // 4. presses through the controller dispatch change the outfit
  results.checks.b_pressDress = await win.webContents.executeJavaScript(
    `window.__fittingRoom.vrPress('f:topStyle:dress')`,
  );
  results.checks.b_dressApplied = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit().topStyle`,
  );
  await win.webContents.executeJavaScript(`window.__fittingRoom.vrPress('c:bottomColor:#a83c46')`);
  results.checks.b_colorApplied = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit().bottomColor`,
  );
  await win.webContents.executeJavaScript(`window.__fittingRoom.vrPress('page:1')`);
  results.checks.b_page1HasPose = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getVrState().panelActionIds.includes('f:pose:peace')`,
  );
  results.checks.b_page1HasBasics = await win.webContents.executeJavaScript(
    `['f:pose:wave', 'photo', 'turn:1', 'turn:-1'].every(
       (id) => window.__fittingRoom.getVrState().panelActionIds.includes(id))`,
  );
  await win.webContents.executeJavaScript(`window.__fittingRoom.vrPress('f:pose:peace')`);
  results.checks.b_poseApplied = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit().pose`,
  );
  results.checks.b_badPressRejected = await win.webContents.executeJavaScript(
    `window.__fittingRoom.vrPress('f:topStyle:tuxedo') === false ||
     window.__fittingRoom.getOutfit().topStyle === 'dress'`,
  );

  // 5. snap turn orbits the player rig around the podium.
  //    Headless there is no session, so the rig still stands at
  //    the pivot itself (the origin) and its position cannot
  //    move — the yaw is the observable here. In a session the
  //    rig starts at the spawn 1.9 m out and the same dispatch
  //    orbits the position (the orbit math itself is covered
  //    by the unit tests in tests/vr.test.ts).
  const before = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getVrState().playerPosition`,
  );
  const yawBefore = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getVrState().playerRotationY`,
  );
  await win.webContents.executeJavaScript(`window.__fittingRoom.vrPress('turn:1')`);
  await win.webContents.executeJavaScript(`window.__fittingRoom.vrPress('turn:1')`);
  const after = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getVrState().playerPosition`,
  );
  const yawAfter = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getVrState().playerRotationY`,
  );
  results.checks.b_turnOrbit = {
    before,
    after,
    distBefore: Math.hypot(before[0], before[2]),
    distAfter: Math.hypot(after[0], after[2]),
    yawBefore,
    yawAfter,
    yawAdvancedQuarter: Math.abs(yawAfter - yawBefore - Math.PI / 2) < 0.02,
  };

  // 6. a saved look in the store appears on the panel and applies
  await win.webContents.executeJavaScript(
    `localStorage.setItem('fitting-room.looks.v1', JSON.stringify([
       { id: 'look-verify-1', name: 'Verify Look', updatedAt: 1,
         look: { topStyle: 'hoodie', topColor: '#3a4152', bottomStyle: 'pants',
                 bottomColor: '#44557a', shoeStyle: 'boots', shoeColor: '#26262b',
                 hat: 'beanie', glasses: 'none', accessory: 'scarf' } },
     ]))`,
  );
  await win.webContents.executeJavaScript(`window.__fittingRoom.vrPress('page:0')`);
  results.checks.b_lookOnPanel = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getVrState().panelActionIds.includes('look:look-verify-1')`,
  );
  await win.webContents.executeJavaScript(`window.__fittingRoom.vrPress('look:look-verify-1')`);
  results.checks.b_lookApplied = await win.webContents.executeJavaScript(
    `(() => { const o = window.__fittingRoom.getOutfit();
       return o.topStyle === 'hoodie' && o.shoeStyle === 'boots' && o.accessory === 'scarf'; })()`,
  );

  // 7. the VR photo composes a real share card that restores
  const photo = await win.webContents.executeJavaScript(
    `window.__fittingRoom.vrPhotoDataURL()`,
  );
  results.checks.b_photoIsPngCard = typeof photo === 'string' && photo.startsWith('data:image/png') && photo.length > 40000;
  results.checks.b_photoRestores = await win.webContents.executeJavaScript(
    `window.__fittingRoom.applyCardDataURL(${JSON.stringify(photo)})`,
  );

  // 8. draw calls for the record (mirror on/off)
  results.checks.b_drawCalls = await win.webContents.executeJavaScript(
    `window.__fittingRoom.measureStageStats()`,
  );

  // 9. evidence: the interior with the VR panel, flat camera
  await win.webContents.executeJavaScript(`window.__fittingRoom.viewVrPanel()`);
  await sleep(6000);
  const img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-vr-panel.png'), img.toPNG());
  await win.webContents.executeJavaScript(`window.__fittingRoom.focusFace(0)`);
  await sleep(4000);
  const img2 = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-vr-room.png'), img2.toPNG());
  win.destroy();
}

async function main() {
  await runA();
  const mockServer = await startMockServer();
  try {
    await runB();
  } finally {
    mockServer.close();
  }
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
