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
import {
  EYE_COLORS,
  HAIR_COLORS,
  HAIR_STYLES,
  HEIGHT_MAX,
  HEIGHT_MIN,
  fitzpatrickLabel,
  type CharacterParams,
} from './character';
import { decodeSeed, encodeSeed } from './seed';
import {
  isValidEndpoint,
  loadLlmSettings,
  requestCommands,
  saveLlmSettings,
  testConnection,
  type LlmSettings,
} from './llm';
import { describeCommandProtocol, executeCommands, validateCommands } from './commands';

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

type TabId = 'character' | 'tops' | 'hat' | 'glasses' | 'accessory' | 'pose' | 'llm';
const TABS: Array<{ id: TabId; key: I18nKey }> = [
  { id: 'character', key: 'cat.character' },
  { id: 'tops', key: 'cat.tops' },
  { id: 'hat', key: 'cat.hat' },
  { id: 'glasses', key: 'cat.glasses' },
  { id: 'accessory', key: 'cat.accessory' },
  { id: 'pose', key: 'cat.pose' },
  { id: 'llm', key: 'cat.llm' },
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

// ---- bring-your-own-LLM (docs/LLM-CONNECT.md) ----
// Settings live only in this device's localStorage; until the
// user saves an endpoint, nothing in this section makes a network
// request. The chat log is module state so it survives the panel
// re-renders that outfit changes trigger.
let llmSettings: LlmSettings = loadLlmSettings();
let llmBusy = false;
let llmStatus: { kind: 'ok' | 'ng'; text: string } | null = null;
interface ChatEntry {
  who: 'you' | 'ai' | 'sys';
  text: string;
}
const chatLog: ChatEntry[] = [];

function readSettingsForm(): LlmSettings {
  const get = (id: string) =>
    (document.getElementById(id) as HTMLInputElement | null)?.value.trim() ?? '';
  return {
    endpoint: get('llm-endpoint'),
    apiKey: get('llm-apikey'),
    model: get('llm-model'),
  };
}

function onSaveSettings(): void {
  const candidate = readSettingsForm();
  if (candidate.endpoint && !isValidEndpoint(candidate.endpoint)) {
    llmStatus = { kind: 'ng', text: t('llm.invalidEndpoint') };
    renderOptions();
    return;
  }
  llmSettings = candidate;
  saveLlmSettings(llmSettings);
  llmStatus = { kind: 'ok', text: t('llm.saved') };
  renderOptions();
}

async function onTestConnection(): Promise<void> {
  const candidate = readSettingsForm();
  llmBusy = true;
  llmStatus = { kind: 'ok', text: t('llm.testing') };
  renderOptions();
  const result = await testConnection(candidate);
  llmBusy = false;
  llmStatus = result.ok
    ? {
        kind: 'ok',
        text: result.models.length
          ? `${t('llm.testOk')}: ${result.models.join(', ')}`
          : t('llm.testOk'),
      }
    : { kind: 'ng', text: `${t('llm.testFail')}: ${result.error}` };
  renderOptions();
}

async function onSendChat(): Promise<void> {
  const input = document.getElementById('llm-chat-input') as HTMLInputElement | null;
  const text = input?.value.trim() ?? '';
  if (!text || llmBusy) return;
  chatLog.push({ who: 'you', text });
  if (!llmSettings.endpoint) {
    chatLog.push({ who: 'sys', text: t('llm.notConfigured') });
    renderOptions();
    return;
  }
  if (!llmSettings.model.trim()) {
    chatLog.push({ who: 'sys', text: t('llm.modelMissing') });
    renderOptions();
    return;
  }
  llmBusy = true;
  renderOptions();
  try {
    const outcome = await requestCommands(llmSettings, outfit, text, getLang());
    if (outcome.reply) chatLog.push({ who: 'ai', text: outcome.reply });
    const { validation } = outcome;
    if (validation.commands.length) {
      const exec = executeCommands(validation.commands, outfit);
      if (validation.commands.some((c) => c.type !== 'get_state')) update(exec.outfit);
      if (exec.applied.length) {
        chatLog.push({ who: 'sys', text: `${t('llm.applied')}: ${exec.applied.join('; ')}` });
      }
      if (exec.stateRequested) {
        chatLog.push({ who: 'sys', text: JSON.stringify(outfit) });
      }
      if (exec.wantShareCard) void exportPhoto();
    }
    if (validation.rejected.length) {
      chatLog.push({
        who: 'sys',
        text: `${t('llm.rejected')}: ${validation.rejected.map((r) => r.reason).join('; ')}`,
      });
    }
  } catch (err) {
    chatLog.push({
      who: 'sys',
      text: `${t('llm.error')}: ${err instanceof Error ? err.message : String(err)}`,
    });
  }
  llmBusy = false;
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
  } else if (activeTab === 'llm') {
    const block = el('div', 'llm-block');
    block.append(el('span', 'group-label', t('llm.settingsTitle')));
    const formRow = (labelKey: I18nKey, id: string, value: string, placeholder: string, type = 'text') => {
      const row = el('div', 'form-row');
      const label = el('label', 'form-label', t(labelKey));
      label.htmlFor = id;
      const input = el('input', 'form-input');
      input.id = id;
      input.type = type;
      input.value = value;
      input.placeholder = placeholder;
      input.autocomplete = 'off';
      row.append(label, input);
      return row;
    };
    block.append(
      formRow('llm.endpoint', 'llm-endpoint', llmSettings.endpoint, 'http://localhost:11434/v1'),
    );
    block.append(formRow('llm.apiKey', 'llm-apikey', llmSettings.apiKey, '', 'password'));
    block.append(formRow('llm.model', 'llm-model', llmSettings.model, 'llama3.1'));
    const btnRow = el('div', 'chat-row');
    const saveBtn = chip(t('llm.save'), false, onSaveSettings);
    saveBtn.id = 'llm-save';
    const testBtn = chip(t('llm.test'), false, () => void onTestConnection());
    testBtn.id = 'llm-test';
    testBtn.disabled = llmBusy;
    btnRow.append(saveBtn, testBtn);
    if (llmStatus) {
      btnRow.append(el('span', `llm-status ${llmStatus.kind}`, llmStatus.text));
    }
    block.append(btnRow);
    block.append(el('p', 'llm-note', t('llm.note')));

    block.append(el('span', 'group-label', t('llm.chatTitle')));
    const log = el('div', 'chat-log');
    log.id = 'llm-chat-log';
    for (const entry of chatLog) {
      const msg = el('div', `chat-msg ${entry.who}`);
      const who = el('span', 'who', entry.who === 'you' ? t('llm.you') : entry.who === 'ai' ? t('llm.ai') : '>');
      msg.append(who, document.createTextNode(entry.text));
      log.append(msg);
    }
    if (llmBusy) {
      const msg = el('div', 'chat-msg sys');
      msg.append(el('span', 'who', '>'), document.createTextNode(t('llm.thinking')));
      log.append(msg);
    }
    block.append(log);
    const chatRow = el('div', 'chat-row');
    const chatInput = el('input', 'form-input');
    chatInput.id = 'llm-chat-input';
    chatInput.type = 'text';
    chatInput.placeholder = t('llm.chatPlaceholder');
    chatInput.setAttribute('aria-label', t('llm.chatTitle'));
    chatInput.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') void onSendChat();
    });
    const sendBtn = chip(t('llm.send'), false, () => void onSendChat());
    sendBtn.id = 'llm-send';
    sendBtn.disabled = llmBusy;
    chatRow.append(chatInput, sendBtn);
    block.append(chatRow);
    nodes.push(block);
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
  getSeed(): string;
  setSeed(seed: string): boolean;
  cardDataURL(): Promise<string>;
  /** The agent connection point (docs/LLM-CONNECT.md): the same
   *  command protocol the LLM chat uses. Input is untrusted —
   *  every command passes validateCommands, exactly as model
   *  output does. A share_card command is reported back via
   *  wantShareCard instead of triggering a download; call
   *  cardDataURL() for the image. */
  runCommands(raw: unknown): {
    applied: string[];
    rejected: Array<{ reason: string }>;
    wantShareCard: boolean;
    outfit: Outfit;
  };
  /** The command protocol description, generated from the specs. */
  commandSpec(): string;
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
  runCommands: (raw) => {
    const list = Array.isArray(raw)
      ? raw
      : typeof raw === 'object' && raw !== null && Array.isArray((raw as { commands?: unknown }).commands)
        ? (raw as { commands: unknown[] }).commands
        : raw;
    const validation = validateCommands(list);
    const exec = executeCommands(validation.commands, outfit);
    if (validation.commands.some((c) => c.type !== 'get_state')) update(exec.outfit);
    return {
      applied: exec.applied,
      rejected: validation.rejected.map((r) => ({ reason: r.reason })),
      wantShareCard: exec.wantShareCard,
      outfit: { ...outfit },
    };
  },
  commandSpec: () => describeCommandProtocol(),
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
