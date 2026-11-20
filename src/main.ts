// App bootstrap and UI wiring. All state lives in one Outfit object;
// every change flows through update() -> applyOutfit + save (local only).

import './style.css';
import * as THREE from 'three';
import { buildAvatar } from './avatar';
import { applyOutfit } from './items';
import { createStage } from './scene';
import { composeShareCard, composeShareCardFromImage, downloadBlob } from './share';
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
  DEFAULT_OUTFIT,
  loadOutfit,
  randomOutfit,
  sanitizeName,
  sanitizeOutfit,
  saveOutfit,
  type Outfit,
} from './outfit';
import {
  addEntry,
  currentEntry,
  loadRoster,
  removeEntry,
  renameEntry,
  saveRoster,
  upsertCurrent,
  type Roster,
} from './roster';
import {
  loadLineage,
  recordLineage,
  type LineageEvent,
  type LineageKind,
} from './lineage';
import { extractSeedFromPng } from './cardseed';
import { exportGlb, exportVrm, type ExportedFile } from './export3d';
import {
  BODY_PARAM_KEYS,
  CHARACTER_PARAM_SPECS,
  EYE_COLORS,
  FACE_PARAM_KEYS,
  HAIR_COLORS,
  HAIR_STYLES,
  HEIGHT_MAX,
  HEIGHT_MIN,
  fitzpatrickLabel,
  sanitizeCharacter,
  type CharacterParams,
} from './character';
import { decodeSeed, encodeSeed } from './seed';
import { synthesizeCharacter } from './genetics';
import {
  isValidEndpoint,
  loadLlmSettings,
  requestCommands,
  saveLlmSettings,
  testConnection,
  type LlmSettings,
} from './llm';
import {
  describeCommandProtocol,
  executeCommands,
  validateCommands,
  type Command,
} from './commands';
import {
  buildImagePrompt,
  generateImg2Img,
  generateTxt2Img,
  loadImagingSettings,
  saveImagingSettings,
  testImagingConnection,
  type GeneratedImage,
  type ImagingSettings,
} from './imaging';

const LANG_KEY = 'fitting-room.lang.v1';
const canvas = document.getElementById('gl') as HTMLCanvasElement;

setLang(detectLang(localStorage.getItem(LANG_KEY)));
document.documentElement.lang = getLang();

const stage = createStage(canvas);
// The roster is the save system (roster.ts): the person on
// stage is the roster's current entry, and every change is
// autosaved back into that entry. The first load migrates the
// pre-roster single save, so the person a returning user had is
// the person they get — byte for byte.
let roster: Roster = loadRoster();
let outfit: Outfit = decodeSeed(currentEntry(roster).seed) ?? loadOutfit();
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
  | 'pose'
  | 'llm';
const TABS: Array<{ id: TabId; key: I18nKey }> = [
  { id: 'character', key: 'cat.character' },
  { id: 'tops', key: 'cat.tops' },
  { id: 'bottoms', key: 'cat.bottoms' },
  { id: 'shoes', key: 'cat.shoes' },
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

/** Persist the current person: the legacy single-save key
 *  (outfit.ts — its autosave behavior is unchanged) and the
 *  roster's current entry, which is the same person as a seed. */
function persist(): void {
  saveOutfit(outfit);
  roster = upsertCurrent(roster, encodeSeed(outfit));
  saveRoster(roster);
}

// ---- lineage: the on-device edit history (lineage.ts) ----
// Recorded at the identity-level event points only — a person
// is created, restored from a seed/card/history entry, blended
// (with the two parent seeds, which live only here), or
// renamed. Slider drags and outfit changes are not events: the
// history is a list of people and how they came to be, not a
// log of every gesture. Nothing recorded here is ever copied
// into a seed, a card, or an exported file.
let lineageEvents: LineageEvent[] = loadLineage();

function recordEvent(kind: LineageKind, seed: string, parents?: [string, string]): void {
  const event: LineageEvent = { at: Date.now(), kind, seed };
  if (parents) event.parents = parents;
  const name = decodeSeed(seed)?.name ?? '';
  if (name) event.name = name;
  lineageEvents = recordLineage(event);
}

/** Record any blends a validated command list performed, with
 *  the resulting person's seed (the lineage keeps the parents;
 *  the person and their seed keep nothing). */
function recordCommandBlends(commands: Command[], result: Outfit): void {
  for (const cmd of commands) {
    if (cmd.type === 'blend_characters') {
      recordEvent('blend', encodeSeed(result), [cmd.seedA, cmd.seedB]);
    }
  }
}

function update(next: Outfit): void {
  // Every state that lands in the app passes the sanitize gate —
  // including the ones arriving through the verification/agent
  // bridge — so the parameter ranges and the adult safety
  // restriction (character.ts, CUS-0779) hold on every path.
  // A committed change also ends any genetics preview: the view
  // is re-rendered from the new state below, so a previewed
  // person must not linger as if still on offer.
  blendChild = null;
  outfit = sanitizeOutfit(next);
  rig.setCharacter(outfit.character);
  stage.setSubjectHeight(outfit.character.height);
  applyOutfit(rig, outfit);
  persist();
  renderOptions();
}

/** Live character patch for sliders: applies and persists without
 *  re-rendering the panel, so the dragged slider is never destroyed
 *  mid-gesture. The seed readout (if visible) is refreshed in place.
 *  The patch passes through sanitizeCharacter like every other
 *  path: if a slider drag completes a minor-like body combination,
 *  the safety restriction corrects the *combination* (another
 *  parameter moves), the avatar shows the corrected figure at
 *  once, and the panel re-render on release shows the corrected
 *  slider positions — the correction is never silent. */
function patchCharacter(patch: Partial<CharacterParams>): void {
  // A slider edit likewise ends a genetics preview (the rig is
  // re-rendered from the current person below). The preview block
  // disappears at the next panel render; its apply button checks
  // blendChild before doing anything.
  blendChild = null;
  outfit = {
    ...outfit,
    character: sanitizeCharacter({ ...outfit.character, ...patch }),
  };
  rig.setCharacter(outfit.character);
  stage.setSubjectHeight(outfit.character.height);
  persist();
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

// ---- bring-your-own image generation (docs/SD-CONNECT.md) ----
// The same pattern as the LLM connection above: the product
// ships with no endpoint and no model; settings live only in
// this device's localStorage; nothing is sent until the user
// configures their own SD server and presses a generate button.
// The generated image is held in memory together with the seed
// of the person it was generated from — downloads and cards are
// how it persists, on purpose: localStorage is the wrong size
// class for generated images, and the image is the user's
// content to keep where they like.
let sdSettings: ImagingSettings = loadImagingSettings();
let sdBusy = false;
let sdStatus: { kind: 'ok' | 'ng'; text: string } | null = null;
let sdExtra = '';
let sdResult: { dataUrl: string; seed: string } | null = null;

// ---- genetics: synthesize a new person from two seeds ----
// (CHARACTER-SYSTEM.md §2.5; LEGAL-ETHICS.md judgment J-06.)
// The two inputs are seeds of fictional people — the only kind
// this app has. The synthesized person is previewed on the rig
// without touching the saved state; only "use this person"
// commits it, through update() and its sanitize gate like every
// other path. Once applied, the person is an ordinary
// character with an ordinary seed — no parentage rides on the
// person, the seed, the card, or exported files. The blend
// itself is recorded, parents included, in the on-device edit
// history only (lineage.ts; J-06's edit-history allowance —
// see DESIGN.md §19.2). The form state is module state so it
// survives panel re-renders.
let blendSeedA = '';
let blendSeedB = '';
let blendChild: CharacterParams | null = null;

/** Show a person on the rig without committing it: the preview
 *  path for a synthesized person (and, with the current person,
 *  the way a preview is taken down). */
function showCharacterPreview(c: CharacterParams): void {
  rig.setCharacter(c);
  stage.setSubjectHeight(c.height);
  applyOutfit(rig, { ...outfit, character: c });
}

function onBlendGenerate(): void {
  const pa = decodeSeed(blendSeedA);
  const pb = decodeSeed(blendSeedB);
  if (!pa || !pb) {
    showToast(t('ui.seedInvalid'));
    return;
  }
  // A fresh mix seed per press: re-rolling is the fun of it. The
  // result is fully captured by the child's own seed, so nothing
  // about the roll needs to be kept.
  const mixSeed = Math.floor(Math.random() * 0x100000000) >>> 0;
  blendChild = synthesizeCharacter(pa.character, pb.character, mixSeed);
  showCharacterPreview(blendChild);
  showToast(t('genetics.created'));
  renderOptions();
}

// ---- identity: name, roster, history (the character tab) ----
// The name field commits on change (blur/Enter), not per
// keystroke: a rename is an identity event, recorded once.
function commitName(raw: string): void {
  const name = sanitizeName(raw);
  if (name === outfit.name) {
    renderOptions();
    return;
  }
  const next = { ...outfit, name };
  recordEvent('rename', encodeSeed(next));
  update(next);
}

/** Start a new, blank person as a new roster entry. The person
 *  who was on stage stays in the roster, one tap away. */
function onNewPerson(): void {
  const seed = encodeSeed({ ...DEFAULT_OUTFIT });
  roster = addEntry(roster, seed);
  saveRoster(roster);
  recordEvent('create', seed);
  update(decodeSeed(seed) ?? { ...DEFAULT_OUTFIT });
}

/** Call a roster person back onto the stage. Switching people
 *  is navigation, not an edit — nothing is recorded. */
function onLoadPerson(id: string): void {
  const entry = roster.entries.find((e) => e.id === id);
  if (!entry || id === roster.currentId) return;
  const decoded = decodeSeed(entry.seed);
  if (!decoded) return;
  roster = { ...roster, currentId: id };
  saveRoster(roster);
  renamingId = null;
  update(decoded);
}

function onDeletePerson(id: string): void {
  const wasCurrent = id === roster.currentId;
  roster = removeEntry(roster, id);
  saveRoster(roster);
  if (renamingId === id) renamingId = null;
  if (wasCurrent) {
    const decoded = decodeSeed(currentEntry(roster).seed);
    if (decoded) update(decoded);
    else renderOptions();
  } else {
    renderOptions();
  }
}

/** Rename any roster entry (not just the person on stage): the
 *  name lives in the entry's seed, so this re-issues that seed
 *  with the new name. Renaming the current person also flows
 *  through update(), keeping stage, save and roster in step. */
function commitEntryRename(id: string, raw: string): void {
  const next = renameEntry(roster, id, sanitizeName(raw));
  renamingId = null;
  if (!next) {
    renderOptions();
    return;
  }
  roster = next;
  saveRoster(roster);
  const entry = roster.entries.find((e) => e.id === id);
  if (entry) recordEvent('rename', entry.seed);
  if (id === roster.currentId && entry) {
    const decoded = decodeSeed(entry.seed);
    if (decoded) update(decoded);
    else renderOptions();
  } else {
    renderOptions();
  }
}

/** Which roster row is currently showing its rename input. */
let renamingId: string | null = null;

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
      recordCommandBlends(validation.commands, exec.outfit);
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

function readSdForm(): ImagingSettings {
  const get = (id: string) =>
    (document.getElementById(id) as HTMLInputElement | null)?.value.trim() ?? '';
  return {
    endpoint: get('sd-endpoint'),
    apiKey: get('sd-auth'),
  };
}

function onSaveSdSettings(): void {
  const candidate = readSdForm();
  if (candidate.endpoint && !isValidEndpoint(candidate.endpoint)) {
    sdStatus = { kind: 'ng', text: t('llm.invalidEndpoint') };
    renderOptions();
    return;
  }
  sdSettings = candidate;
  saveImagingSettings(sdSettings);
  sdStatus = { kind: 'ok', text: t('llm.saved') };
  renderOptions();
}

async function onTestSdConnection(): Promise<void> {
  const candidate = readSdForm();
  sdBusy = true;
  sdStatus = { kind: 'ok', text: t('llm.testing') };
  renderOptions();
  const result = await testImagingConnection(candidate);
  sdBusy = false;
  sdStatus = result.ok
    ? {
        kind: 'ok',
        text: result.models.length
          ? `${t('llm.testOk')}: ${result.models.join(', ')}`
          : t('llm.testOk'),
      }
    : { kind: 'ng', text: `${t('llm.testFail')}: ${result.error}` };
  renderOptions();
}

/** The current rendering as a PNG data URL, downscaled so the
 *  long side is at most 768px — the img2img input. Rendered
 *  fresh first, so the capture is what is on screen. */
function captureStageImage(): { dataUrl: string; width: number; height: number } {
  stage.renderer.render(stage.scene, stage.camera);
  const scale = Math.min(1, 768 / Math.max(canvas.width, canvas.height));
  const w = Math.max(8, Math.round((canvas.width * scale) / 8) * 8);
  const h = Math.max(8, Math.round((canvas.height * scale) / 8) * 8);
  const c2 = document.createElement('canvas');
  c2.width = w;
  c2.height = h;
  const ctx = c2.getContext('2d');
  if (!ctx) throw new Error('2d context unavailable');
  ctx.drawImage(canvas, 0, 0, w, h);
  return { dataUrl: c2.toDataURL('image/png'), width: w, height: h };
}

async function onGenerateSd(mode: 'txt2img' | 'img2img'): Promise<void> {
  if (sdBusy) return;
  if (!sdSettings.endpoint) {
    sdStatus = { kind: 'ng', text: t('sd.notConfigured') };
    renderOptions();
    return;
  }
  sdBusy = true;
  sdStatus = { kind: 'ok', text: t('sd.generating') };
  renderOptions();
  try {
    let generated: GeneratedImage;
    if (mode === 'img2img') {
      const shot = captureStageImage();
      const built = buildImagePrompt(outfit, { extra: sdExtra, forImg2Img: true });
      generated = await generateImg2Img(sdSettings, built, shot.dataUrl, {
        width: shot.width,
        height: shot.height,
      });
    } else {
      const built = buildImagePrompt(outfit, { extra: sdExtra });
      generated = await generateTxt2Img(sdSettings, built);
    }
    // The seed is captured now, with the image: the person this
    // picture depicts is the person as they are at generation
    // time, whatever the user changes afterwards.
    sdResult = { dataUrl: generated.dataUrl, seed: encodeSeed(outfit) };
    sdStatus = { kind: 'ok', text: t('sd.resultTitle') };
  } catch (err) {
    sdStatus = {
      kind: 'ng',
      text: `${t('llm.error')}: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
  sdBusy = false;
  renderOptions();
}

function dataUrlToBlob(dataUrl: string): Blob {
  const comma = dataUrl.indexOf(',');
  const mime = /data:([^;]+)/.exec(dataUrl.slice(0, comma))?.[1] ?? 'application/octet-stream';
  const bin = atob(dataUrl.slice(comma + 1));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

function onDownloadSdImage(): void {
  if (!sdResult) return;
  downloadBlob(dataUrlToBlob(sdResult.dataUrl), '3d-fitting-room-ai.png');
}

/** The share card for the held generated image — the same
 *  composition the card button downloads and the bridge serves. */
async function composeSdCard(): Promise<Blob | null> {
  if (!sdResult) return null;
  const result = sdResult;
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('generated image could not be loaded'));
    img.src = result.dataUrl;
  });
  return composeShareCardFromImage(img, {
    appName: t('app.title'),
    workingTitleNote: t('app.workingTitle'),
    tagline: t('app.tagline'),
    seed: result.seed,
  });
}

async function onSdCard(): Promise<void> {
  const blob = await composeSdCard();
  if (!blob) return;
  downloadBlob(blob, '3d-fitting-room-card-ai.png');
  showToast(t('sd.cardSaved'));
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
    // name: the identity anchor, first in the tab because it is
    // what makes this a *person* rather than a parameter set
    // (PERSPECTIVES-2.md R2-1/R2-2). Optional, device-local,
    // travels inside the seed and headlines the share card.
    // J-07: naming a person after a real person is prohibited
    // by the terms — upheld by the note below, not by matching.
    nodes.push(el('span', 'group-label', t('ui.name')));
    const nameRow = el('div', 'seed-row');
    const nameInput = el('input', 'seed-input');
    nameInput.id = 'person-name';
    nameInput.type = 'text';
    nameInput.value = outfit.name;
    nameInput.placeholder = t('ui.namePlaceholder');
    nameInput.setAttribute('aria-label', t('ui.name'));
    nameInput.addEventListener('change', () => commitName(nameInput.value));
    nameRow.append(nameInput);
    nodes.push(nameRow);
    nodes.push(el('p', 'llm-note', t('ui.nameNote')));

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

    // body: the phase-3 silhouette parameters (CHARACTER-SYSTEM.md
    // §5.8 priority 4). Same spec-driven rows as the face; labels
    // name shapes only — no gender wording (LEGAL-ETHICS.md
    // judgment J-04). Garments re-fit automatically (items.ts).
    // Combinations are fenced by the adult safety restriction in
    // sanitizeCharacter (CUS-0779 / J-02): if a drag completes a
    // minor-like combination, another slider's value is corrected
    // and this panel re-renders with it on release.
    nodes.push(el('span', 'group-label', t('ui.body')));
    for (const param of BODY_PARAM_KEYS) {
      const spec = CHARACTER_PARAM_SPECS[param];
      if (spec.kind !== 'range') continue;
      nodes.push(
        rangeRow(
          t(`body.${param}` as I18nKey),
          c[param],
          spec.min,
          spec.max,
          (v) => `${Math.round((v / spec.def) * 100)}%`,
          (v) => patchCharacter({ [param]: v } as Partial<CharacterParams>),
        ),
      );
    }

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
      if (decoded) {
        // A received seed taking the stage is a restoration —
        // the variation's arrival is an identity event.
        recordEvent('restore', encodeSeed(decoded));
        update(decoded);
      } else showToast(t('ui.seedInvalid'));
    });
    applyRow.append(seedInput, applyBtn);
    nodes.push(applyRow);
    // …or bring a person back from a share-card image file: the
    // card carries its seed inside the PNG (see cardseed.ts).
    const cardRow = el('div', 'seed-row');
    cardRow.append(chip(t('ui.cardLoad'), false, () => cardFileInput.click()));
    nodes.push(cardRow);
    // roster: every person kept on this device (roster.ts).
    // One tap calls a person back — the reappearance the
    // recognition loop runs on (PERSPECTIVES-2.md R2-1) is
    // only as real as this list makes it. Most recently
    // updated first; the person on stage is marked.
    nodes.push(el('span', 'group-label', t('ui.roster')));
    const byRecent = [...roster.entries].sort((a, b) => b.updatedAt - a.updatedAt);
    for (const entry of byRecent) {
      const row = el('div', 'seed-row');
      const person = decodeSeed(entry.seed);
      const label = person?.name || t('ui.unnamed');
      if (renamingId === entry.id) {
        const input = el('input', 'seed-input');
        input.type = 'text';
        input.value = person?.name ?? '';
        input.placeholder = t('ui.namePlaceholder');
        input.setAttribute('aria-label', t('ui.name'));
        input.addEventListener('change', () => commitEntryRename(entry.id, input.value));
        row.append(input);
      } else {
        const isCurrent = entry.id === roster.currentId;
        const loadBtn = chip(
          isCurrent
            ? getLang() === 'ja'
              ? `${label}（${t('ui.currentPerson')}）`
              : `${label} (${t('ui.currentPerson')})`
            : label,
          isCurrent,
          () => onLoadPerson(entry.id),
        );
        loadBtn.classList.add('roster-load');
        row.append(loadBtn);
        const renameBtn = chip(t('ui.rename'), false, () => {
          renamingId = entry.id;
          renderOptions();
        });
        renameBtn.classList.add('roster-rename');
        const deleteBtn = chip(t('ui.delete'), false, () => onDeletePerson(entry.id));
        deleteBtn.classList.add('roster-delete');
        row.append(renameBtn, deleteBtn);
      }
      nodes.push(row);
    }
    const newRow = el('div', 'seed-row');
    const newBtn = chip(t('ui.newPerson'), false, onNewPerson);
    newBtn.id = 'roster-new';
    newRow.append(newBtn);
    nodes.push(newRow);

    // The 3D-file export lives here, with the other "person as a
    // file" machinery: a T-posed, boned, self-describing file
    // (glTF or VRM) whose honest positioning is stated in the
    // note (docs/DESIGN.md §17).
    nodes.push(el('span', 'group-label', t('ui.export3d')));
    nodes.push(el('p', 'llm-note', t('export.note')));
    const exportRow = el('div', 'seed-row');
    const glbBtn = chip(t('ui.exportGlb'), false, () => downloadExport('glb'));
    glbBtn.id = 'btn-export-glb';
    const vrmBtn = chip(t('ui.exportVrm'), false, () => downloadExport('vrm'));
    vrmBtn.id = 'btn-export-vrm';
    exportRow.append(glbBtn, vrmBtn);
    nodes.push(exportRow);

    // genetics: synthesize a new person from two people's seeds
    // (see the module-state block above). The result is presented
    // as what it is — a new adult person — and previewed before
    // it can be applied. Applying records the blend (parents
    // included) in the on-device history only; the new person
    // starts unnamed, like every new person.
    nodes.push(el('span', 'group-label', t('genetics.title')));
    nodes.push(el('p', 'llm-note', t('genetics.note')));
    const blendRow = (
      labelKey: I18nKey,
      id: string,
      value: string,
      set: (v: string) => void,
    ): HTMLDivElement => {
      const row = el('div', 'seed-row');
      const input = el('input', 'seed-input');
      input.id = id;
      input.type = 'text';
      input.value = value;
      input.placeholder = 'FR1-…';
      input.setAttribute('aria-label', t(labelKey));
      input.addEventListener('input', () => set(input.value));
      const useBtn = chip(t('genetics.useCurrent'), false, () => {
        set(encodeSeed(outfit));
        renderOptions();
      });
      row.append(input, useBtn);
      return row;
    };
    nodes.push(el('span', 'group-label', t('genetics.personA')));
    nodes.push(
      blendRow('genetics.personA', 'blend-seed-a', blendSeedA, (v) => {
        blendSeedA = v;
      }),
    );
    nodes.push(el('span', 'group-label', t('genetics.personB')));
    nodes.push(
      blendRow('genetics.personB', 'blend-seed-b', blendSeedB, (v) => {
        blendSeedB = v;
      }),
    );
    const genRow = el('div', 'seed-row');
    const genBtn = chip(t('genetics.generate'), false, onBlendGenerate);
    genBtn.id = 'blend-generate';
    genRow.append(genBtn);
    nodes.push(genRow);
    if (blendChild) {
      nodes.push(el('span', 'group-label', t('genetics.result')));
      const childSeedRow = el('div', 'seed-row');
      const childSeedVal = el(
        'code',
        'seed-value',
        encodeSeed({ ...outfit, character: blendChild, name: '' }),
      );
      childSeedVal.id = 'blend-child-seed';
      childSeedRow.append(childSeedVal);
      nodes.push(childSeedRow);
      const actRow = el('div', 'seed-row');
      const applyBtn = chip(t('genetics.apply'), false, () => {
        if (!blendChild) return;
        const child = blendChild;
        const parents: [string, string] = [blendSeedA.trim(), blendSeedB.trim()];
        blendChild = null;
        // The synthesized person is new: unnamed, and the blend
        // is recorded — parents included — in the on-device
        // history only (lineage.ts). The person's own seed is
        // an ordinary seed with no parentage in it.
        const next = { ...outfit, character: child, name: '' };
        recordEvent('blend', encodeSeed(next), parents);
        update(next);
      });
      applyBtn.id = 'blend-apply';
      const cancelBtn = chip(t('genetics.cancel'), false, () => {
        blendChild = null;
        showCharacterPreview(outfit.character);
        renderOptions();
      });
      cancelBtn.id = 'blend-cancel';
      actRow.append(applyBtn, cancelBtn);
      nodes.push(actRow);
    }

    // edit history: the lineage, newest first (lineage.ts).
    // Every row is a person as they stood at that event —
    // tapping one restores them, which is what "traceable"
    // means here. Blend rows name their two parents (decoded
    // from the parent seeds kept only in this history). The
    // history itself never leaves the device and is never
    // written into a card, a seed, or an exported file.
    nodes.push(el('span', 'group-label', t('ui.history')));
    nodes.push(el('p', 'llm-note', t('ui.historyNote')));
    const recent = [...lineageEvents].reverse().slice(0, 20);
    for (const ev of recent) {
      const row = el('div', 'seed-row');
      const person = decodeSeed(ev.seed);
      const label = ev.name || person?.name || t('ui.unnamed');
      const when = new Date(ev.at).toLocaleString(getLang() === 'ja' ? 'ja-JP' : 'en-US', {
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      const btn = chip(
        `${when} · ${t(`history.${ev.kind}` as I18nKey)} · ${label}`,
        false,
        () => {
          const decoded = decodeSeed(ev.seed);
          if (!decoded) return;
          recordEvent('restore', encodeSeed(decoded));
          update(decoded);
          showToast(t('ui.historyRestored'));
        },
      );
      btn.classList.add('history-load');
      row.append(btn);
      nodes.push(row);
      if (ev.kind === 'blend' && ev.parents) {
        const a = decodeSeed(ev.parents[0])?.name || t('ui.unnamed');
        const b = decodeSeed(ev.parents[1])?.name || t('ui.unnamed');
        nodes.push(el('p', 'llm-note', `${t('history.parents')}: ${a} × ${b}`));
      }
    }
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

    // ---- image generation: the user's own SD server ----
    block.append(el('span', 'group-label', t('sd.settingsTitle')));
    block.append(
      formRow('sd.endpoint', 'sd-endpoint', sdSettings.endpoint, 'http://localhost:7860'),
    );
    block.append(formRow('sd.auth', 'sd-auth', sdSettings.apiKey, '', 'password'));
    const sdBtnRow = el('div', 'chat-row');
    const sdSaveBtn = chip(t('llm.save'), false, onSaveSdSettings);
    sdSaveBtn.id = 'sd-save';
    const sdTestBtn = chip(t('llm.test'), false, () => void onTestSdConnection());
    sdTestBtn.id = 'sd-test';
    sdTestBtn.disabled = sdBusy;
    sdBtnRow.append(sdSaveBtn, sdTestBtn);
    if (sdStatus) {
      const status = el('span', `llm-status ${sdStatus.kind} sd-status`, sdStatus.text);
      sdBtnRow.append(status);
    }
    block.append(sdBtnRow);
    block.append(el('p', 'llm-note', t('sd.note')));

    block.append(el('span', 'group-label', t('sd.promptTitle')));
    const promptPreview = el('textarea', 'sd-prompt');
    promptPreview.id = 'sd-prompt-preview';
    promptPreview.readOnly = true;
    promptPreview.value = buildImagePrompt(outfit, { extra: sdExtra }).prompt;
    promptPreview.setAttribute('aria-label', t('sd.promptTitle'));
    block.append(promptPreview);
    const extraRow = el('div', 'form-row');
    const extraLabel = el('label', 'form-label', t('sd.extraLabel'));
    extraLabel.htmlFor = 'sd-extra';
    const extraInput = el('input', 'form-input');
    extraInput.id = 'sd-extra';
    extraInput.type = 'text';
    extraInput.value = sdExtra;
    extraInput.placeholder = t('sd.extraPlaceholder');
    extraInput.autocomplete = 'off';
    extraInput.addEventListener('input', () => {
      // Keep the module state (and the prompt preview) current
      // without a panel re-render, so typing never loses focus.
      sdExtra = extraInput.value;
      promptPreview.value = buildImagePrompt(outfit, { extra: sdExtra }).prompt;
    });
    extraRow.append(extraLabel, extraInput);
    block.append(extraRow);
    const genRow = el('div', 'chat-row');
    const genImgBtn = chip(t('sd.fromPhoto'), false, () => void onGenerateSd('img2img'));
    genImgBtn.id = 'sd-gen-img2img';
    genImgBtn.disabled = sdBusy;
    const genTxtBtn = chip(t('sd.fromText'), false, () => void onGenerateSd('txt2img'));
    genTxtBtn.id = 'sd-gen-txt2img';
    genTxtBtn.disabled = sdBusy;
    genRow.append(genImgBtn, genTxtBtn);
    block.append(genRow);

    if (sdResult) {
      block.append(el('span', 'group-label', t('sd.resultTitle')));
      const img = el('img', 'sd-result-img');
      img.id = 'sd-result-img';
      img.src = sdResult.dataUrl;
      img.alt = t('sd.resultTitle');
      block.append(img);
      const resultRow = el('div', 'chat-row');
      const dlBtn = chip(t('sd.download'), false, onDownloadSdImage);
      dlBtn.id = 'sd-download';
      const cardBtn = chip(t('sd.toCard'), false, () => void onSdCard());
      cardBtn.id = 'sd-card';
      resultRow.append(dlBtn, cardBtn);
      block.append(resultRow);
    }
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
  recordEvent('restore', encodeSeed(decoded));
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
    name: outfit.name,
  });
  downloadBlob(blob, '3d-fitting-room.png');
  showToast(t('ui.saved'));
}

document.getElementById('btn-photo')!.addEventListener('click', () => {
  void exportPhoto();
});

// ---- 3D file export (glTF / VRM) ----
// The person + outfit as a portable file that opens outside this
// app (export3d.ts): built entirely on-device from a throwaway
// T-posed rig, with the seed and the named-parameter JSON inside
// the file, so the file describes itself wherever it travels.
function export3dFile(format: 'glb' | 'vrm'): ExportedFile {
  return format === 'vrm' ? exportVrm(outfit) : exportGlb(outfit);
}

function downloadExport(format: 'glb' | 'vrm'): void {
  const { bytes } = export3dFile(format);
  downloadBlob(
    new Blob([bytes.buffer as ArrayBuffer], { type: 'model/gltf-binary' }),
    `fitting-room-character.${format}`,
  );
  showToast(t('ui.exported'));
}
document.getElementById('btn-random')!.addEventListener('click', () => {
  // Randomize the outfit, not the person — name included.
  update({ ...randomOutfit(), character: outfit.character, name: outfit.name });
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

// A fresh device (or one whose history starts with this
// version) opens its edit history with the person on stage:
// their creation is the first event every later event hangs
// from.
if (lineageEvents.length === 0) {
  recordEvent('create', encodeSeed(outfit));
}

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
  /** The roster of people kept on this device (a read-only
   *  snapshot for verification: who is kept, and which entry is
   *  on stage). */
  getRoster(): Roster;
  /** The on-device edit history (a read-only snapshot). */
  getLineage(): LineageEvent[];
  cardDataURL(): Promise<string>;
  /** Export the current person + outfit as a 3D file ('glb' or
   *  'vrm'): the bytes as a base64 data URL, plus the part count
   *  and the seed the file carries in its extras (export3d.ts). */
  export3dInfo(format: 'glb' | 'vrm'): { dataUrl: string; parts: number; bytes: number; seed: string };
  /** Restore the person from a share-card PNG given as a data
   *  URL — the same code path as dropping the file on the window.
   *  Resolves true when a seed was found and applied. */
  applyCardDataURL(dataUrl: string): Promise<boolean>;
  /** Move the camera to a close-up of the face at an azimuth
   *  angle (degrees, 0 = front). Verification uses it to read the
   *  eyes and gaze; it is equally handy in devtools. */
  focusFace(angleDeg?: number): void;
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
  /** Image-generation state for verification: whether an SD
   *  endpoint is configured, the auto-built prompt for the
   *  current person and outfit, and whether a generated image is
   *  being held (with the seed it was generated from). */
  getSdState(): {
    configured: boolean;
    prompt: string;
    hasResult: boolean;
    resultSeed: string | null;
  };
  /** The share card for the held generated image, as a data
   *  URL — the same composition the "make a card" button
   *  downloads. Null when no image is held. */
  sdCardDataURL(): Promise<string | null>;
}
const bridge: FittingRoomBridge = {
  ready: true,
  getOutfit: () => ({ ...outfit }),
  setOutfit: (partial) => update({ ...outfit, ...partial }),
  getSeed: () => encodeSeed(outfit),
  setSeed: (seed) => {
    const decoded = decodeSeed(seed);
    if (!decoded) return false;
    recordEvent('restore', encodeSeed(decoded));
    update(decoded);
    return true;
  },
  getRoster: () => ({
    entries: roster.entries.map((e) => ({ ...e })),
    currentId: roster.currentId,
  }),
  getLineage: () => lineageEvents.map((e) => ({ ...e })),
  runCommands: (raw) => {
    const list = Array.isArray(raw)
      ? raw
      : typeof raw === 'object' && raw !== null && Array.isArray((raw as { commands?: unknown }).commands)
        ? (raw as { commands: unknown[] }).commands
        : raw;
    const validation = validateCommands(list);
    const exec = executeCommands(validation.commands, outfit);
    recordCommandBlends(validation.commands, exec.outfit);
    if (validation.commands.some((c) => c.type !== 'get_state')) update(exec.outfit);
    return {
      applied: exec.applied,
      rejected: validation.rejected.map((r) => ({ reason: r.reason })),
      wantShareCard: exec.wantShareCard,
      outfit: { ...outfit },
    };
  },
  commandSpec: () => describeCommandProtocol(),
  export3dInfo: (format) => {
    const { bytes, parts, seed } = export3dFile(format);
    let bin = '';
    const CHUNK = 0x8000;
    for (let i = 0; i < bytes.length; i += CHUNK) {
      bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
    }
    return {
      dataUrl: `data:model/gltf-binary;base64,${btoa(bin)}`,
      parts,
      bytes: bytes.length,
      seed,
    };
  },
  getSdState: () => ({
    configured: Boolean(sdSettings.endpoint),
    prompt: buildImagePrompt(outfit, { extra: sdExtra }).prompt,
    hasResult: sdResult !== null,
    resultSeed: sdResult?.seed ?? null,
  }),
  sdCardDataURL: async () => {
    const blob = await composeSdCard();
    if (!blob) return null;
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  },
  cardDataURL: async () => {
    stage.renderer.render(stage.scene, stage.camera);
    const blob = await composeShareCard(canvas, {
      appName: t('app.title'),
      workingTitleNote: t('app.workingTitle'),
      tagline: t('app.tagline'),
      seed: encodeSeed(outfit),
      name: outfit.name,
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
