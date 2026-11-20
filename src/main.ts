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
  BOTTOM_COLORS,
  BOTTOM_STYLES,
  GLASSES,
  HATS,
  POSES,
  SHOE_COLORS,
  SHOE_STYLES,
  TOP_COLORS,
  TOP_STYLES,
  loadOutfit,
  randomOutfit,
  saveOutfit,
  type Outfit,
} from './outfit';
import { extractSeedFromPng } from './cardseed';
import {
  CHARACTER_PARAM_SPECS,
  EYE_COLORS,
  FACE_PARAM_KEYS,
  HAIR_COLORS,
  HAIR_STYLES,
  HEIGHT_MAX,
  HEIGHT_MIN,
  fitzpatrickLabel,
  type CharacterParams,
} from './character';
import { decodeSeed, encodeSeed } from './seed';

const LANG_KEY = 'fitting-room.lang.v1';
const canvas = document.getElementById('gl') as HTMLCanvasElement;

setLang(detectLang(localStorage.getItem(LANG_KEY)));
document.documentElement.lang = getLang();

const stage = createStage(canvas);
let outfit: Outfit = loadOutfit();
const rig = buildAvatar(outfit.character);
stage.scene.add(rig.root);
stage.setSubjectHeight(outfit.character.height);
applyOutfit(rig, outfit);

type TabId =
  | 'character'
  | 'tops'
  | 'bottoms'
  | 'shoes'
  | 'hat'
  | 'glasses'
  | 'accessory'
  | 'pose';
const TABS: Array<{ id: TabId; key: I18nKey }> = [
  { id: 'character', key: 'cat.character' },
  { id: 'tops', key: 'cat.tops' },
  { id: 'bottoms', key: 'cat.bottoms' },
  { id: 'shoes', key: 'cat.shoes' },
  { id: 'hat', key: 'cat.hat' },
  { id: 'glasses', key: 'cat.glasses' },
  { id: 'accessory', key: 'cat.accessory' },
  { id: 'pose', key: 'cat.pose' },
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
  rig.setCharacter(outfit.character);
  stage.setSubjectHeight(outfit.character.height);
  applyOutfit(rig, outfit);
  saveOutfit(outfit);
  renderOptions();
}

/** Live character patch for sliders: applies and persists without
 *  re-rendering the panel, so the dragged slider is never destroyed
 *  mid-gesture. The seed readout (if visible) is refreshed in place. */
function patchCharacter(patch: Partial<CharacterParams>): void {
  outfit = { ...outfit, character: { ...outfit.character, ...patch } };
  rig.setCharacter(outfit.character);
  stage.setSubjectHeight(outfit.character.height);
  saveOutfit(outfit);
  const seedEl = document.getElementById('seed-value');
  if (seedEl) seedEl.textContent = encodeSeed(outfit);
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

  if (activeTab === 'character') {
    const c = outfit.character;
    // skin tone: continuous Fitzpatrick slider (label shows the
    // nearest roman numeral so the scale stays legible)
    const skinRow = el('div', 'slider-row');
    const skinVal = el('span', 'slider-val', fitzpatrickLabel(c.skinTone));
    const skin = el('input', 'slider');
    skin.type = 'range';
    skin.min = '0';
    skin.max = '1000';
    skin.step = '1';
    skin.value = String(Math.round(c.skinTone * 1000));
    skin.setAttribute('aria-label', t('ui.skinTone'));
    skin.addEventListener('input', () => {
      const v = Number(skin.value) / 1000;
      patchCharacter({ skinTone: v });
      skinVal.textContent = fitzpatrickLabel(v);
    });
    skin.addEventListener('change', () => renderOptions());
    skinRow.append(el('span', 'slider-label', t('ui.skinTone')), skin, skinVal);
    nodes.push(skinRow);

    // face: the phase-2 identity parameters (CHARACTER-SYSTEM.md
    // §5 phase 2, trimmed by the §5.8 audit). One generic range row
    // per parameter, driven by the specs in character.ts. Labels
    // name features only — no lineage/ethnicity wording anywhere
    // in the UI (LEGAL-ETHICS.md judgment J-01).
    const rangeRow = (
      label: string,
      value: number,
      min: number,
      max: number,
      fmt: (v: number) => string,
      apply: (v: number) => void,
    ): HTMLDivElement => {
      const row = el('div', 'slider-row');
      const val = el('span', 'slider-val', fmt(value));
      const input = el('input', 'slider');
      input.type = 'range';
      input.min = String(min);
      input.max = String(max);
      input.step = String((max - min) / 200);
      input.value = String(value);
      input.setAttribute('aria-label', label);
      input.addEventListener('input', () => {
        const v = Number(input.value);
        apply(v);
        val.textContent = fmt(v);
      });
      input.addEventListener('change', () => renderOptions());
      row.append(el('span', 'slider-label', label), input, val);
      return row;
    };
    const fmtMm = (v: number): string => `${v >= 0 ? '+' : ''}${Math.round(v * 1000)} mm`;
    const fmtDeg = (v: number): string =>
      `${v >= 0 ? '+' : ''}${Math.round((v * 180) / Math.PI)}°`;
    const faceFmt = (param: (typeof FACE_PARAM_KEYS)[number], def: number): ((v: number) => string) => {
      switch (param) {
        case 'eyeHeight':
        case 'browHeight':
          return fmtMm;
        case 'eyeTilt':
        case 'browTilt':
          return fmtDeg;
        case 'asymmetry':
          return (v) => `${Math.round(v * 100)}%`;
        default:
          return (v) => `${Math.round((v / def) * 100)}%`;
      }
    };


    // height: regenerated profile + camera/mirror follow
    const heightRow = el('div', 'slider-row');
    const cm = Math.round(c.height * 100);
    const heightVal = el('span', 'slider-val', `${cm} cm`);
    const height = el('input', 'slider');
    height.type = 'range';
    height.min = String(Math.round(HEIGHT_MIN * 100));
    height.max = String(Math.round(HEIGHT_MAX * 100));
    height.step = '1';
    height.value = String(cm);
    height.setAttribute('aria-label', t('ui.height'));
    height.addEventListener('input', () => {
      const v = Number(height.value);
      patchCharacter({ height: v / 100 });
      heightVal.textContent = `${v} cm`;
    });
    height.addEventListener('change', () => renderOptions());
    heightRow.append(el('span', 'slider-label', t('ui.height')), height, heightVal);
    nodes.push(heightRow);

    nodes.push(el('span', 'group-label', t('ui.face')));
    for (const param of FACE_PARAM_KEYS) {
      const spec = CHARACTER_PARAM_SPECS[param];
      if (spec.kind !== 'range') continue;
      nodes.push(
        rangeRow(
          t(`face.${param}` as I18nKey),
          c[param],
          spec.min,
          spec.max,
          faceFmt(param, spec.def),
          (v) => patchCharacter({ [param]: v } as Partial<CharacterParams>),
        ),
      );
    }

    // hairstyle chips
    nodes.push(el('span', 'group-label', t('ui.hairStyle')));
    for (const style of HAIR_STYLES) {
      nodes.push(
        chip(t(key('hair', style)), c.hairStyle === style, () =>
          update({ ...outfit, character: { ...c, hairStyle: style } }),
        ),
      );
    }
    // hair / eye color swatches
    const swatch = (color: string, selected: boolean, label: string, onClick: () => void) => {
      const s = el('button', 'swatch') as HTMLButtonElement;
      s.type = 'button';
      s.style.background = color;
      s.setAttribute('aria-pressed', String(selected));
      s.setAttribute('aria-label', `${label} ${color}`);
      s.addEventListener('click', onClick);
      return s;
    };
    nodes.push(el('span', 'group-label', t('ui.hairColor')));
    for (const color of HAIR_COLORS) {
      nodes.push(
        swatch(color, c.hairColor === color, t('ui.hairColor'), () =>
          update({ ...outfit, character: { ...c, hairColor: color } }),
        ),
      );
    }
    nodes.push(el('span', 'group-label', t('ui.eyeColor')));
    for (const color of EYE_COLORS) {
      nodes.push(
        swatch(color, c.eyeColor === color, t('ui.eyeColor'), () =>
          update({ ...outfit, character: { ...c, eyeColor: color } }),
        ),
      );
    }

    // seed: this person + outfit as one short string. Copy it out,
    // or paste someone else's in — everything resolves on-device.
    nodes.push(el('span', 'group-label', t('ui.seed')));
    const seedRow = el('div', 'seed-row');
    const seedVal = el('code', 'seed-value', encodeSeed(outfit));
    seedVal.id = 'seed-value';
    const copyBtn = chip(t('ui.copy'), false, () => {
      try {
        void navigator.clipboard
          ?.writeText(encodeSeed(outfit))
          .then(() => showToast(t('ui.seedCopied')))
          .catch(() => undefined);
      } catch {
        // Clipboard unavailable (permissions/context): the seed is
        // still visible to copy by hand.
      }
    });
    seedRow.append(seedVal, copyBtn);
    nodes.push(seedRow);
    const applyRow = el('div', 'seed-row');
    const seedInput = el('input', 'seed-input');
    seedInput.type = 'text';
    seedInput.placeholder = 'FR1-…';
    seedInput.setAttribute('aria-label', t('ui.seed'));
    const applyBtn = chip(t('ui.seedApply'), false, () => {
      const decoded = decodeSeed(seedInput.value);
      if (decoded) update(decoded);
      else showToast(t('ui.seedInvalid'));
    });
    applyRow.append(seedInput, applyBtn);
    nodes.push(applyRow);
    // …or bring a person back from a share-card image file: the
    // card carries its seed inside the PNG (see cardseed.ts).
    const cardRow = el('div', 'seed-row');
    cardRow.append(chip(t('ui.cardLoad'), false, () => cardFileInput.click()));
    nodes.push(cardRow);
  } else if (activeTab === 'tops') {
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
  } else if (activeTab === 'bottoms') {
    for (const style of BOTTOM_STYLES) {
      nodes.push(
        chip(t(style === 'none' ? 'item.none' : key('bottom', style)), outfit.bottomStyle === style, () =>
          update({ ...outfit, bottomStyle: style }),
        ),
      );
    }
    if (outfit.topStyle === 'dress') {
      // The dress rule (items.ts): a one-piece hides bottoms.
      nodes.push(el('span', 'group-label', t('ui.dressHidesBottom')));
    }
    nodes.push(el('span', 'group-label', t('ui.color')));
    for (const color of BOTTOM_COLORS) {
      const s = el('button', 'swatch') as HTMLButtonElement;
      s.type = 'button';
      s.style.background = color;
      s.setAttribute('aria-pressed', String(outfit.bottomColor === color));
      s.setAttribute('aria-label', `${t('ui.color')} ${color}`);
      s.addEventListener('click', () => update({ ...outfit, bottomColor: color }));
      nodes.push(s);
    }
  } else if (activeTab === 'shoes') {
    for (const style of SHOE_STYLES) {
      nodes.push(
        chip(t(key('shoe', style)), outfit.shoeStyle === style, () =>
          update({ ...outfit, shoeStyle: style }),
        ),
      );
    }
    nodes.push(el('span', 'group-label', t('ui.color')));
    for (const color of SHOE_COLORS) {
      const s = el('button', 'swatch') as HTMLButtonElement;
      s.type = 'button';
      s.style.background = color;
      s.setAttribute('aria-pressed', String(outfit.shoeColor === color));
      s.setAttribute('aria-label', `${t('ui.color')} ${color}`);
      s.addEventListener('click', () => update({ ...outfit, shoeColor: color }));
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

// ---- restoring a person from a share-card image ----
// The card PNG carries the seed in a chunk (cardseed.ts). Dropping
// the file anywhere on the window, or picking it through the file
// input in the character tab, rebuilds the person it shows. The
// file is read on-device only — nothing is uploaded anywhere.
const cardFileInput = document.createElement('input');
cardFileInput.type = 'file';
cardFileInput.accept = 'image/png';
cardFileInput.hidden = true;
document.body.appendChild(cardFileInput);
cardFileInput.addEventListener('change', () => {
  const file = cardFileInput.files?.[0];
  cardFileInput.value = '';
  if (file) void applyCardFile(file);
});

async function applyCardBytes(bytes: Uint8Array): Promise<boolean> {
  const seed = extractSeedFromPng(bytes);
  if (!seed) return false;
  const decoded = decodeSeed(seed);
  if (!decoded) return false;
  update(decoded);
  return true;
}

async function applyCardFile(file: File): Promise<void> {
  try {
    const ok = await applyCardBytes(new Uint8Array(await file.arrayBuffer()));
    showToast(ok ? t('ui.cardRestored') : t('ui.cardInvalid'));
  } catch {
    showToast(t('ui.cardInvalid'));
  }
}

window.addEventListener('dragover', (e) => e.preventDefault());
window.addEventListener('drop', (e) => {
  e.preventDefault();
  const file = e.dataTransfer?.files?.[0];
  if (file) void applyCardFile(file);
});

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
    seed: encodeSeed(outfit),
  });
  downloadBlob(blob, '3d-fitting-room.png');
  showToast(t('ui.saved'));
}

document.getElementById('btn-photo')!.addEventListener('click', () => {
  void exportPhoto();
});
document.getElementById('btn-random')!.addEventListener('click', () => {
  // Randomize the outfit, not the person.
  update({ ...randomOutfit(), character: outfit.character });
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
  // The camera position is the gaze target: the avatar's eyes
  // track whoever is looking at it (see avatar.ts gaze).
  rig.tick(tSec, stage.camera.position);
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
  getSeed(): string;
  setSeed(seed: string): boolean;
  cardDataURL(): Promise<string>;
  /** Restore the person from a share-card PNG given as a data
   *  URL — the same code path as dropping the file on the window.
   *  Resolves true when a seed was found and applied. */
  applyCardDataURL(dataUrl: string): Promise<boolean>;
  /** Move the camera to a close-up of the face at an azimuth
   *  angle (degrees, 0 = front). Verification uses it to read the
   *  eyes and gaze; it is equally handy in devtools. */
  focusFace(angleDeg?: number): void;
}
const bridge: FittingRoomBridge = {
  ready: true,
  getOutfit: () => ({ ...outfit }),
  setOutfit: (partial) => update({ ...outfit, ...partial }),
  getSeed: () => encodeSeed(outfit),
  setSeed: (seed) => {
    const decoded = decodeSeed(seed);
    if (!decoded) return false;
    update(decoded);
    return true;
  },
  cardDataURL: async () => {
    stage.renderer.render(stage.scene, stage.camera);
    const blob = await composeShareCard(canvas, {
      appName: t('app.title'),
      workingTitleNote: t('app.workingTitle'),
      tagline: t('app.tagline'),
      seed: encodeSeed(outfit),
    });
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  },
  applyCardDataURL: async (dataUrl) => {
    const comma = dataUrl.indexOf(',');
    if (comma < 0) return false;
    try {
      const bin = atob(dataUrl.slice(comma + 1));
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return applyCardBytes(bytes);
    } catch {
      return false;
    }
  },
  focusFace: (angleDeg = 0) => {
    const p = new THREE.Vector3();
    rig.head.getWorldPosition(p);
    const r = 0.62;
    const a = (angleDeg * Math.PI) / 180;
    stage.camera.position.set(p.x + Math.sin(a) * r, p.y + 0.01, p.z + Math.cos(a) * r);
    stage.controls.target.copy(p);
    stage.controls.update();
  },
};
(window as unknown as { __fittingRoom: FittingRoomBridge }).__fittingRoom = bridge;
