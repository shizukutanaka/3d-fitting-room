// App bootstrap and UI wiring. All state lives in one Outfit object;
// every change flows through update() -> applyOutfit + save (local only).

import './style.css';
import * as THREE from 'three';
import { buildAvatar } from './avatar';
import { applyOutfit } from './items';
import { createStage } from './scene';
import { composeShareCard, downloadBlob } from './share';
import {
  detectLang,
  getLang,
  setLang,
  t,
  type I18nKey,
  type Lang,
} from './i18n';
import {
  ACCESSORIES,
  EXPRESSIONS,
  GLASSES,
  HATS,
  POSES,
  TOP_COLORS,
  TOP_STYLES,
  loadOutfit,
  randomOutfit,
  saveOutfit,
  type Outfit,
} from './outfit';

const LANG_KEY = 'fitting-room.lang.v1';
const canvas = document.getElementById('gl') as HTMLCanvasElement;

setLang(detectLang(localStorage.getItem(LANG_KEY)));
document.documentElement.lang = getLang();

const stage = createStage(canvas);
const rig = buildAvatar();
stage.scene.add(rig.root);

let outfit: Outfit = loadOutfit();
applyOutfit(rig, outfit);

type TabId = 'tops' | 'hat' | 'glasses' | 'accessory' | 'pose' | 'expression';
const TABS: Array<{ id: TabId; key: I18nKey }> = [
  { id: 'tops', key: 'cat.tops' },
  { id: 'hat', key: 'cat.hat' },
  { id: 'glasses', key: 'cat.glasses' },
  { id: 'accessory', key: 'cat.accessory' },
  { id: 'pose', key: 'cat.pose' },
  { id: 'expression', key: 'cat.expression' },
];
let activeTab: TabId = 'tops';

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function update(next: Outfit): void {
  outfit = next;
  applyOutfit(rig, outfit);
  saveOutfit(outfit);
  renderOptions();
}

function chip(label: string, selected: boolean, onClick: () => void): HTMLButtonElement {
  const b = el('button', 'chip', label) as HTMLButtonElement;
  b.type = 'button';
  b.setAttribute('aria-pressed', String(selected));
  b.addEventListener('click', onClick);
  return b;
}

function renderTabs(): void {
  const nav = document.getElementById('tabs')!;
  nav.replaceChildren(
    ...TABS.map(({ id, key }) => {
      const b = el('button', undefined, t(key)) as HTMLButtonElement;
      b.type = 'button';
      b.setAttribute('aria-pressed', String(activeTab === id));
      b.addEventListener('click', () => {
        activeTab = id;
        renderTabs();
        renderOptions();
      });
      return b;
    }),
  );
}

function renderOptions(): void {
  const box = document.getElementById('options')!;
  const nodes: HTMLElement[] = [];
  const key = (prefix: string, id: string) => `${prefix}.${id}` as I18nKey;

  if (activeTab === 'tops') {
    for (const style of TOP_STYLES) {
      nodes.push(
        chip(t(key('top', style)), outfit.topStyle === style, () =>
          update({ ...outfit, topStyle: style }),
        ),
      );
    }
    nodes.push(el('span', 'group-label', t('ui.color')));
    for (const color of TOP_COLORS) {
      const s = el('button', 'swatch') as HTMLButtonElement;
      s.type = 'button';
      s.style.background = color;
      s.setAttribute('aria-pressed', String(outfit.topColor === color));
      s.setAttribute('aria-label', `${t('ui.color')} ${color}`);
      s.addEventListener('click', () => update({ ...outfit, topColor: color }));
      nodes.push(s);
    }
  } else if (activeTab === 'hat') {
    for (const id of HATS) {
      nodes.push(
        chip(t(id === 'none' ? 'item.none' : key('hat', id)), outfit.hat === id, () =>
          update({ ...outfit, hat: id }),
        ),
      );
    }
  } else if (activeTab === 'glasses') {
    for (const id of GLASSES) {
      nodes.push(
        chip(t(id === 'none' ? 'item.none' : key('glasses', id)), outfit.glasses === id, () =>
          update({ ...outfit, glasses: id }),
        ),
      );
    }
  } else if (activeTab === 'accessory') {
    for (const id of ACCESSORIES) {
      nodes.push(
        chip(t(id === 'none' ? 'item.none' : key('accessory', id)), outfit.accessory === id, () =>
          update({ ...outfit, accessory: id }),
        ),
      );
    }
  } else if (activeTab === 'pose') {
    for (const id of POSES) {
      nodes.push(
        chip(t(key('pose', id)), outfit.pose === id, () => update({ ...outfit, pose: id })),
      );
    }
  } else {
    for (const id of EXPRESSIONS) {
      nodes.push(
        chip(t(key('expr', id)), outfit.expression === id, () =>
          update({ ...outfit, expression: id }),
        ),
      );
    }
  }
  box.replaceChildren(...nodes);
}

let toastTimer = 0;
function showToast(message: string): void {
  const toast = document.getElementById('toast')!;
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.hidden = true;
  }, 2000);
}

function applyStaticTexts(): void {
  document.getElementById('app-title')!.textContent = t('app.title');
  document.getElementById('working-title')!.textContent = t('app.workingTitle');
  document.getElementById('tagline')!.textContent = t('app.tagline');
  document.getElementById('footer-note')!.textContent = t('footer.note');
  document.getElementById('btn-photo')!.textContent = t('ui.savePhoto');
  document.getElementById('btn-random')!.textContent = t('ui.random');
  document.getElementById('btn-spin')!.textContent = t('ui.spin');
  document.getElementById('btn-reset-view')!.textContent = t('ui.resetView');
  document.getElementById('lang-toggle')!.textContent = getLang() === 'ja' ? 'EN' : '日本語';
  document.title = `${t('app.title')}（${t('app.workingTitle')}）`;
}

async function exportPhoto(): Promise<void> {
  stage.renderer.render(stage.scene, stage.camera);
  const blob = await composeShareCard(canvas, {
    appName: t('app.title'),
    workingTitleNote: t('app.workingTitle'),
    tagline: t('app.tagline'),
  });
  downloadBlob(blob, '3d-fitting-room.png');
  showToast(t('ui.saved'));
}

document.getElementById('btn-photo')!.addEventListener('click', () => {
  void exportPhoto();
});
document.getElementById('btn-random')!.addEventListener('click', () => {
  update(randomOutfit());
});
const spinBtn = document.getElementById('btn-spin')!;
spinBtn.addEventListener('click', () => {
  stage.controls.autoRotate = !stage.controls.autoRotate;
  spinBtn.setAttribute('aria-pressed', String(stage.controls.autoRotate));
});
document.getElementById('btn-reset-view')!.addEventListener('click', () => {
  stage.resetView();
});
document.getElementById('lang-toggle')!.addEventListener('click', () => {
  const next: Lang = getLang() === 'ja' ? 'en' : 'ja';
  setLang(next);
  document.documentElement.lang = next;
  try {
    localStorage.setItem(LANG_KEY, next);
  } catch {
    // ignore: language just won't persist
  }
  applyStaticTexts();
  renderTabs();
  renderOptions();
});

window.addEventListener('resize', () => stage.resize());

applyStaticTexts();
renderTabs();
renderOptions();

const clock = new THREE.Clock();
function loop(): void {
  const tSec = clock.getElapsedTime();
  rig.tick(tSec);
  stage.tick(tSec);
  stage.renderer.render(stage.scene, stage.camera);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {
    // Offline support is a bonus; the app works without it.
  });
}

// Verification bridge: lets headless checks (and curious users in
// devtools) drive the app and confirm rendering/export really work.
interface FittingRoomBridge {
  ready: boolean;
  getOutfit(): Outfit;
  setOutfit(partial: Partial<Outfit>): void;
  cardDataURL(): Promise<string>;
}
const bridge: FittingRoomBridge = {
  ready: true,
  getOutfit: () => ({ ...outfit }),
  setOutfit: (partial) => update({ ...outfit, ...partial }),
  cardDataURL: async () => {
    stage.renderer.render(stage.scene, stage.camera);
    const blob = await composeShareCard(canvas, {
      appName: t('app.title'),
      workingTitleNote: t('app.workingTitle'),
      tagline: t('app.tagline'),
    });
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  },
};
(window as unknown as { __fittingRoom: FittingRoomBridge }).__fittingRoom = bridge;
