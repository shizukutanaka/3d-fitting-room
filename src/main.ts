// App bootstrap and UI wiring. All state lives in one Outfit object;
// every change flows through update() -> applyOutfit + save (local only).

import './style.css';
import * as THREE from 'three';
import { buildAvatar, FIGURES, type FigureId } from './avatar';
import {
  LEG_RATIOS,
  WORLD_SCALE_MAX,
  WORLD_SCALE_MIN,
  DEFAULT_CALIBRATION,
  alignViewpoint,
  clampCalibration,
  loadCalibration,
  medianOf,
  type ViewpointAlignment,
  saveCalibration,
  type BodyCalibration,
} from './bodyscale';
import { applyOutfit, buildWarmupItems } from './items';
import { warmUpScene, type WarmupStats } from './warmup';
import { createStage } from './scene';
import { composeShareCard, composeShareCardFromImage, downloadBlob } from './share';
import {
  LANGS,
  LANG_LABELS,
  LANG_LOCALES,
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
  OUTER_COLORS,
  OUTER_STYLES,
  POSES,
  SHOE_COLORS,
  SHOE_STYLES,
  TOP_COLORS,
  TOP_STYLES,
  DEFAULT_OUTFIT,
  isDress,
  loadOutfit,
  randomOutfit,
  sanitizeName,
  sanitizeOutfit,
  saveOutfit,
  type Outfit,
} from './outfit';
import {
  addLook,
  loadLooks,
  lookOf,
  removeLook,
  sameLook,
  saveLooks,
  type Look,
  type SavedLook,
} from './looks';
import {
  addEntry,
  currentEntry,
  ROSTER_STORAGE_KEY,
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
  HEIGHT_MAX,
  HEIGHT_MIN,
  fitzpatrickLabel,
  sanitizeCharacter,
  type CharacterParams,
} from './character';
import { decodeSeed, encodeSeed } from './seed';
import { synthesizeCharacter } from './genetics';
import {
  MUTATION_STRENGTHS,
  mutationCandidates,
  type MutationStrength,
} from './mutation';
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
  type ExecutionResult,
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
import { createVrRig, vrActionId, type VrLookEntry, type VrRig } from './vr';

const LANG_KEY = 'fitting-room.lang.v1';
const canvas = document.getElementById('gl') as HTMLCanvasElement;

setLang(detectLang(localStorage.getItem(LANG_KEY)));
document.documentElement.lang = getLang();

const stage = createStage(canvas);
// The VR rig (vr.ts) is created near the bottom, once every
// host function it calls exists; outfit changes reach it
// through update() below, null-safely until then.
let vrRig: VrRig | null = null;
// The roster is the save system (roster.ts): the person on
// stage is the roster's current entry, and every change is
// autosaved back into that entry. The first load migrates the
// pre-roster single save, so the person a returning user had is
// the person they get — byte for byte.
const hadSavedPerson = ((): boolean => {
  try {
    return localStorage.getItem(ROSTER_STORAGE_KEY) !== null || localStorage.getItem('fitting-room.outfit.v1') !== null;
  } catch {
    return false;
  }
})();
let roster: Roster = loadRoster();
let outfit: Outfit = decodeSeed(currentEntry(roster).seed) ?? loadOutfit();
// Body Scale Calibration (bodyscale.ts): height, leg ratio and the
// VR world-scale trim, stored on this device only. Optional: a first
// visit enters at the default height and can calibrate later from the
// character tab (calibration dialog).
const savedCalibration = loadCalibration();
let calibration: BodyCalibration =
  savedCalibration ?? (hadSavedPerson ? clampCalibration({ heightM: outfit.character.height }) : { ...DEFAULT_CALIBRATION });
if (!hadSavedPerson) outfit = { ...outfit, character: { ...outfit.character, height: calibration.heightM } };
const FIGURE_KEY = 'fittingRoom.figure.v1';
function loadFigureChoice(): FigureId {
  try {
    const v = localStorage.getItem(FIGURE_KEY);
    return (FIGURES as readonly string[]).includes(v ?? '') ? (v as FigureId) : 'a';
  } catch {
    return 'a';
  }
}
// VR viewpoint alignment (bodyscale.ts alignViewpoint). A height
// counts as entered when the user saved a calibration or a person
// before, or sets one now; otherwise the default applies and a
// standing headset height may stand in for it during a session.
// The estimate is never written to storage.
let heightEntered = savedCalibration !== null || hadSavedPerson;
let sessionHeight: number | null = null;
let viewpoint: ViewpointAlignment | null = null;
const VIEWPOINT_SAMPLES = 45;
let headsetSamples: number[] = [];
/** Put a person on stage; a session height estimate overrides
 *  the stored stature for display only. */
function showCharacter(c: CharacterParams): void {
  const shown = sessionHeight === null ? c : { ...c, height: sessionHeight };
  rig.setCharacter(shown);
  stage.setSubjectHeight(shown.height);
}
function applyViewpoint(headsetYM: number): ViewpointAlignment {
  const v = alignViewpoint(heightEntered ? calibration.heightM : null, headsetYM, stage.player.scale.y);
  viewpoint = v;
  stage.player.position.y = v.floorOffsetM;
  const next = v.source === 'estimated' ? v.heightM : null;
  if (next !== sessionHeight) {
    sessionHeight = next;
    showCharacter(outfit.character);
  }
  return v;
}
function endViewpoint(): void {
  headsetSamples = [];
  viewpoint = null;
  if (sessionHeight !== null) {
    sessionHeight = null;
    showCharacter(outfit.character);
  }
}
function setCalibration(next: Partial<BodyCalibration>): void {
  if (next.heightM !== undefined) {
    heightEntered = true;
    sessionHeight = null;
    // An entered height replaces the estimate: measure again.
    if (viewpoint) {
      viewpoint = null;
      headsetSamples = [];
    }
  }
  calibration = clampCalibration({ ...calibration, ...next });
  saveCalibration(calibration);
  // The trim scales the player rig, so the room (and the person)
  // read slightly larger or smaller in the headset.
  stage.player.scale.setScalar(1 / calibration.worldScale);
}
const rig = buildAvatar(outfit.character, loadFigureChoice(), calibration.legRatio);
stage.scene.add(rig.root);
stage.player.scale.setScalar(1 / calibration.worldScale);
stage.setSubjectHeight(outfit.character.height);
applyOutfit(rig, outfit);
stage.invalidateShadows();

type TabId =
  | 'looks'
  | 'tops'
  | 'outer'
  | 'bottoms'
  | 'shoes'
  | 'hat'
  | 'glasses'
  | 'accessory'
  | 'pose'
  | 'character'
  | 'llm';
// The tab order is the product's statement of what it is
// (DESIGN.md §21): the fitting comes first — saved looks, then
// the wardrobe shelves — and the person-making machinery sits
// after the pose tab, demoted from the head of the panel where
// the drift had put it. The AI connection stays last.
const TABS: Array<{ id: TabId; key: I18nKey }> = [
  { id: 'looks', key: 'cat.looks' },
  { id: 'tops', key: 'cat.tops' },
  { id: 'outer', key: 'cat.outer' },
  { id: 'bottoms', key: 'cat.bottoms' },
  { id: 'shoes', key: 'cat.shoes' },
  { id: 'hat', key: 'cat.hat' },
  { id: 'glasses', key: 'cat.glasses' },
  { id: 'accessory', key: 'cat.accessory' },
  { id: 'pose', key: 'cat.pose' },
  { id: 'character', key: 'cat.character' },
  { id: 'llm', key: 'cat.llm' },
];
let activeTab: TabId = 'looks';

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
// (with the two parent seeds, which live only here), varied
// from one person (with the source seed, which lives only
// here), or renamed. Slider drags and outfit changes are not
// events: the history is a list of people and how they came to
// be, not a log of every gesture. Nothing recorded here is ever
// copied into a seed, a card, or an exported file.
let lineageEvents: LineageEvent[] = loadLineage();

function recordEvent(
  kind: LineageKind,
  seed: string,
  extra: {
    parents?: [string, string];
    source?: string;
    strength?: MutationStrength;
  } = {},
): void {
  const event: LineageEvent = { at: Date.now(), kind, seed };
  if (extra.parents) event.parents = extra.parents;
  if (extra.source) event.source = extra.source;
  if (extra.strength) event.strength = extra.strength;
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
      recordEvent('blend', encodeSeed(result), { parents: [cmd.seedA, cmd.seedB] });
    }
  }
}

/** Record any variations a validated command list performed.
 *  The executor stays pure and reports the facts (its
 *  `mutations` list, with source and result captured where
 *  they are exact); recording them is the caller's business —
 *  the same policy as command blends above, so the two
 *  person-making commands leave the same kind of trace. */
function recordCommandMutations(exec: ExecutionResult): void {
  for (const m of exec.mutations) {
    recordEvent('mutate', m.seed, { source: m.source, strength: m.strength });
  }
}

// ---- saved looks and the before/after compare (looks.ts) ----
// Saved looks are the clothing-side save system: named
// combinations that re-dress whoever is on stage in one tap.
// prevLook is the clothing worn just before the last change —
// the fitting room's "how did the other one look?" — kept in
// memory only (it is a mirror of a moment ago, not a record).
let savedLooks: SavedLook[] = loadLooks();
let prevLook: Look | null = null;
/** The name being typed into the save-look field, kept in module
 *  state so panel re-renders never eat it (the sdExtra pattern). */
let lookNameDraft = '';

/** The current outfit's items as labeled segments — the text
 *  form of a look, shared by the looks tab summary and the share
 *  card face (share.ts draws them with color dots). */
function lookSegments(o: Outfit): Array<{ label: string; color?: string }> {
  const segs: Array<{ label: string; color?: string }> = [
    { label: t(`top.${o.topStyle}` as I18nKey), color: o.topColor },
  ];
  if (o.outerStyle !== 'none') {
    segs.push({ label: t(`outer.${o.outerStyle}` as I18nKey), color: o.outerColor });
  }
  if (o.bottomStyle !== 'none' && !isDress(o.topStyle)) {
    segs.push({ label: t(`bottom.${o.bottomStyle}` as I18nKey), color: o.bottomColor });
  }
  segs.push({ label: t(`shoe.${o.shoeStyle}` as I18nKey), color: o.shoeColor });
  if (o.hat !== 'none') segs.push({ label: t(`hat.${o.hat}` as I18nKey) });
  if (o.glasses !== 'none') segs.push({ label: t(`glasses.${o.glasses}` as I18nKey) });
  if (o.accessory !== 'none') segs.push({ label: t(`accessory.${o.accessory}` as I18nKey) });
  return segs;
}

function lookSummaryText(o: Outfit): string {
  return lookSegments(o).map((s) => s.label).join(' ・ ');
}

function onSaveLook(): void {
  const name = sanitizeName(lookNameDraft);
  if (!name) {
    showToast(t('ui.lookNameRequired'));
    return;
  }
  savedLooks = addLook(savedLooks, name, lookOf(outfit));
  saveLooks(savedLooks);
  lookNameDraft = '';
  showToast(t('ui.lookSaved'));
  renderOptions();
}

function onApplyLook(id: string): void {
  const entry = savedLooks.find((l) => l.id === id);
  if (!entry) return;
  update({ ...outfit, ...entry.look });
  showToast(t('ui.lookApplied'));
}

function onDeleteLook(id: string): void {
  savedLooks = removeLook(savedLooks, id);
  saveLooks(savedLooks);
  renderOptions();
}

/** Swap the current clothing with the previous look. update()
 *  records the clothing being replaced as the new prevLook, so
 *  swapping twice returns exactly where you started — the
 *  compare is a flip back and forth, not a one-way undo. */
function onSwapLook(): void {
  if (!prevLook) return;
  update({ ...outfit, ...prevLook });
  showToast(t('ui.swapped'));
}

function update(next: Outfit): void {
  // Every state that lands in the app passes the sanitize gate —
  // including the ones arriving through the verification/agent
  // bridge — so the parameter ranges and the adult safety
  // restriction (character.ts, CUS-0779) hold on every path.
  // A committed change also ends any genetics preview: the view
  // is re-rendered from the new state below, so a previewed
  // person must not linger as if still on offer. The same holds
  // for a mutation preview, and for the restored-person notice:
  // once the state moves on, the "you just received this person"
  // moment is over.
  blendChild = null;
  mutationCands = null;
  mutationSelected = null;
  restoredNotice = false;
  const sanitized = sanitizeOutfit(next);
  // Before/after: when the clothing actually changes, what was
  // worn until now becomes the previous look (character-only
  // changes and re-selecting the same item do not touch it).
  if (!sameLook(lookOf(outfit), lookOf(sanitized))) prevLook = lookOf(outfit);
  outfit = sanitized;
  showCharacter(outfit.character);
  applyOutfit(rig, outfit);
  stage.invalidateShadows();
  persist();
  renderOptions();
  // The VR panel shows the same state; a committed change
  // re-lays its selection highlights (a no-op cost on the flat
  // screen, where presses are discrete events anyway).
  vrRig?.refreshPanel();
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
  // blendChild before doing anything. Mutation previews and the
  // restored-person notice end the same way: a hand on a slider
  // means the person is being edited now, not received or
  // previewed.
  blendChild = null;
  mutationCands = null;
  mutationSelected = null;
  restoredNotice = false;
  outfit = {
    ...outfit,
    character: sanitizeCharacter({ ...outfit.character, ...patch }),
  };
  showCharacter(outfit.character);
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
  showCharacter(c);
  applyOutfit(rig, { ...outfit, character: c });
  stage.invalidateShadows();
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
// ---- mutation: one-parent variation, offered as candidates ----
// (docs/PERSPECTIVES.md viewpoint 3, in the corrected form of
// docs/PERSPECTIVES-2.md R2-2/R2-4.) The current person is
// varied into four nearby-but-different people; each candidate
// is shown as a still captured from the stage, the picked one
// is previewed on the rig, and only "use this person" commits
// it — through update() and its sanitize gate, like every other
// path. An adopted candidate is a *new* person: they start
// unnamed (candidateOutfit clears the name — the name is the
// source person's identity anchor, not a trait), and where
// they came from is recorded only in the on-device lineage
// (lineage.ts), never in their seed or any other artifact.
let mutationStrength: MutationStrength = 'standard';
let mutationCands: {
  list: CharacterParams[];
  thumbs: string[];
  /** The strength this shelf was rolled at (the picker may
   *  have moved on since; the lineage record names the roll,
   *  not the picker). */
  strength: MutationStrength;
} | null = null;
let mutationSelected: number | null = null;

/** A candidate as an outfit of their own: the current outfit's
 *  clothes on the candidate's person, and no name — a
 *  variation is a new person, and the name is the source
 *  person's anchor, not a trait (PERSPECTIVES-2.md R2-2).
 *  Every seed built from a candidate — the panel readout, the
 *  bridge, adoption — goes through here, so a candidate is
 *  unnamed from the first moment they can be referred to. */
function candidateOutfit(c: CharacterParams): Outfit {
  return { ...outfit, character: c, name: '' };
}

/** Capture a small still of a person from the live stage: show
 *  them, render one frame, and read the canvas back (the same
 *  readback the share card uses). The captures for a candidate
 *  shelf happen inside one synchronous block, so the stage is
 *  never painted mid-shelf — the viewer sees only the person
 *  who was on stage before, and after. */
function captureStill(c: CharacterParams): string {
  showCharacterPreview(c);
  stage.renderer.render(stage.scene, stage.camera);
  const size = 200;
  const tmp = document.createElement('canvas');
  tmp.width = size;
  tmp.height = size;
  const ctx = tmp.getContext('2d');
  if (!ctx) return '';
  const side = Math.min(canvas.width, canvas.height);
  ctx.drawImage(
    canvas,
    (canvas.width - side) / 2,
    (canvas.height - side) / 2,
    side,
    side,
    0,
    0,
    size,
    size,
  );
  return tmp.toDataURL('image/jpeg', 0.85);
}

function onMutationGenerate(): void {
  // A fresh base seed per press: re-rolling is the fun of it.
  // The shelf itself is deterministic in the base seed, and an
  // adopted candidate is fully captured by their own seed.
  const baseSeed = Math.floor(Math.random() * 0x100000000) >>> 0;
  const list = mutationCandidates(outfit.character, baseSeed, mutationStrength);
  const thumbs = list.map((c) => captureStill(c));
  mutationCands = { list, thumbs, strength: mutationStrength };
  mutationSelected = null;
  // Capturing walked the rig through the candidates; put the
  // current person back on stage.
  showCharacterPreview(outfit.character);
  stage.renderer.render(stage.scene, stage.camera);
  showToast(t('mutation.created'));
  renderOptions();
}

function onMutationSelect(index: number): void {
  if (!mutationCands || !mutationCands.list[index]) return;
  mutationSelected = index;
  showCharacterPreview(mutationCands.list[index]);
  renderOptions();
}

function onMutationApply(): void {
  if (!mutationCands || mutationSelected === null) return;
  const candidate = mutationCands.list[mutationSelected];
  // Record the lineage before the state moves: the source is
  // the person on stage now, the result is the adopted
  // candidate — who starts unnamed (candidateOutfit): a new
  // person, whose name is theirs to earn. The record stays on
  // this device (lineage.ts) — the candidate's own seed
  // carries nothing about where they came from.
  const next = candidateOutfit(candidate);
  recordEvent('mutate', encodeSeed(next), {
    source: encodeSeed(outfit),
    strength: mutationCands.strength,
  });
  update(next);
  showToast(t('mutation.applied'));
}

function onMutationCancel(): void {
  mutationSelected = null;
  showCharacterPreview(outfit.character);
  renderOptions();
}

// ---- the receiver's first action (PERSPECTIVES-2.md R2-4) ----
// Set when a person has just been restored from a share card or
// a pasted seed. The receiver's real motive is projection —
// "I want a person of my own" — so the prominent offer on the
// restored screen is not "edit this person" but "make your own
// person from this template": the restored parameters become
// the starting point, and the first thing offered is a shelf of
// variations of them. The ordinary editing path stays exactly
// where it was; only the primary/secondary order changes. The
// notice ends at the first committed change (update() and
// patchCharacter() clear it), or when the receiver dismisses
// it ("keep this person").
let restoredNotice = false;

function onMakeMine(): void {
  restoredNotice = false;
  activeTab = 'character';
  renderTabs();
  // The restored person stays on stage as the template, name
  // and all — the received person in the roster keeps the
  // author's anchor, which is what makes them recognisable.
  // What does not travel is the name into the people made
  // from the template: the variations are rolled at the
  // standard strength so the receiver immediately sees what
  // *their* version could look like, and candidates are built
  // unnamed (candidateOutfit), so the receiver's person is
  // their own from the first seed that refers to them.
  mutationStrength = 'standard';
  onMutationGenerate();
}

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
      recordCommandMutations(exec);
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
  const depicted = decodeSeed(result.seed);
  return composeShareCardFromImage(img, {
    appName: t('app.title'),
    workingTitleNote: t('app.workingTitle'),
    tagline: t('app.tagline'),
    seed: result.seed,
    look: depicted ? lookSegments(depicted) : [],
    name: depicted?.name ?? '',
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

  // The restored-person notice sits above every tab's content:
  // the moment right after a restore is the receiver's entry
  // point (PERSPECTIVES.md viewpoint 2), and its primary action
  // is "make my own person from this template" (PERSPECTIVES-2
  // R2-4) — not editing the received person, which remains
  // available everywhere it always was.
  if (restoredNotice) {
    const block = el('div', 'restored-block');
    block.id = 'restored-notice';
    block.append(el('p', 'restored-note', t('restore.note')));
    const row = el('div', 'seed-row');
    const makeBtn = chip(t('restore.makeMine'), false, onMakeMine);
    makeBtn.id = 'btn-make-mine';
    makeBtn.classList.add('primary');
    const dismissBtn = chip(t('restore.dismiss'), false, () => {
      restoredNotice = false;
      renderOptions();
    });
    dismissBtn.id = 'btn-restore-dismiss';
    row.append(makeBtn, dismissBtn);
    block.append(row);
    nodes.push(block);
  }

  if (activeTab === 'looks') {
    // The fitting room's home tab (DESIGN.md §21): what you are
    // wearing now, the looks you saved, and the one you just
    // took off. Everything here is clothing — the person is
    // never part of a look.
    nodes.push(el('span', 'group-label', t('ui.currentLook')));
    nodes.push(el('p', 'llm-note', lookSummaryText(outfit)));
    const saveRow = el('div', 'seed-row');
    const nameInput = el('input', 'seed-input');
    nameInput.id = 'look-name';
    nameInput.type = 'text';
    nameInput.value = lookNameDraft;
    nameInput.placeholder = t('ui.lookNamePlaceholder');
    nameInput.setAttribute('aria-label', t('ui.saveLook'));
    nameInput.addEventListener('input', () => {
      lookNameDraft = nameInput.value;
    });
    nameInput.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') onSaveLook();
    });
    const saveBtn = chip(t('ui.saveLook'), false, onSaveLook);
    saveBtn.id = 'look-save';
    saveRow.append(nameInput, saveBtn);
    nodes.push(saveRow);
    if (savedLooks.length === 0) {
      nodes.push(el('p', 'llm-note', t('ui.looksEmpty')));
    }
    for (const entry of savedLooks) {
      const row = el('div', 'seed-row');
      const applyBtn = chip(entry.name, false, () => onApplyLook(entry.id));
      applyBtn.classList.add('look-apply');
      const deleteBtn = chip(t('ui.delete'), false, () => onDeleteLook(entry.id));
      deleteBtn.classList.add('look-delete');
      row.append(applyBtn, deleteBtn);
      nodes.push(row);
      nodes.push(
        el('p', 'llm-note', lookSegments({ ...outfit, ...entry.look }).map((s) => s.label).join(' ・ ')),
      );
    }
    if (prevLook) {
      nodes.push(el('span', 'group-label', t('ui.prevLook')));
      nodes.push(
        el('p', 'llm-note', lookSegments({ ...outfit, ...prevLook }).map((s) => s.label).join(' ・ ')),
      );
      const swapRow = el('div', 'seed-row');
      const swapBtn = chip(t('ui.swapLook'), false, onSwapLook);
      swapBtn.id = 'look-swap';
      swapRow.append(swapBtn);
      nodes.push(swapRow);
    }
  } else if (activeTab === 'character') {
    const c = outfit.character;
    // M9: the adult/fictional principle stands at the head of the
    // character tab too — the place where a person is made.
    nodes.push(el('p', 'principle-note', t('principle.note')));
    // name: the identity anchor (PERSPECTIVES-2.md R2-1/R2-2).
    // Optional, device-local, travels inside the seed and is
    // noted on the share card as the wearer — since the
    // re-centering (DESIGN.md §21) the card's headline is the
    // outfit, not the person.
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
      setCalibration({ heightM: v / 100 });
      heightVal.textContent = `${v} cm`;
    });
    height.addEventListener('change', () => renderOptions());
    heightRow.append(el('span', 'slider-label', t('ui.height')), height, heightVal);
    nodes.push(heightRow);

    // Body Scale Calibration: mannequin figure, leg ratio, VR trim
    // and the worn hems against body landmarks (bodyscale.ts).
    nodes.push(chip(t('calib.open'), false, () => openCalibrationDialog()));
    nodes.push(el('span', 'group-label', t('calib.figure')));
    for (const f of FIGURES) {
      nodes.push(
        chip(t(f === 'a' ? 'calib.figureA' : 'calib.figureB'), rig.figure() === f, () => {
          try {
            localStorage.setItem(FIGURE_KEY, f);
          } catch {
            // storage disabled: the choice lasts for this visit
          }
          void rig.setBody(f, calibration.legRatio).then(() => renderOptions());
        }),
      );
    }
    nodes.push(el('span', 'group-label', t('calib.leg')));
    for (const l of LEG_RATIOS) {
      nodes.push(
        chip(t(`calib.leg.${l}`), calibration.legRatio === l, () => {
          setCalibration({ legRatio: l });
          void rig.setBody(rig.figure(), l).then(() => renderOptions());
        }),
      );
    }
    nodes.push(
      rangeRow(t('calib.worldScale'), calibration.worldScale, WORLD_SCALE_MIN, WORLD_SCALE_MAX, (v) => `${Math.round(v * 100)}%`, (v) =>
        setCalibration({ worldScale: v }),
      ),
    );
    const lengths = rig.garmentLengths();
    if (lengths.length) {
      nodes.push(el('span', 'group-label', t('calib.lengths')));
      for (const g of lengths) {
        const cmTxt = g.label.cm === 0 ? '±0' : `${g.label.cm > 0 ? '+' : ''}${g.label.cm}`;
        const name = t(key(g.slot, g.style));
        nodes.push(el('span', 'length-note', `${name}: ${t(`lm.${g.label.landmark}` as I18nKey)} ${cmTxt} cm`));
      }
    }

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

    // Face, hairstyle, hair and eye colour do not show on the
    // mannequin, so they have no controls; the values stay in the
    // seed for compatibility (DESIGN.md §26).

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
        // the seed's arrival is an identity event.
        recordEvent('restore', encodeSeed(decoded));
        update(decoded);
        // A pasted seed is the same receiver moment as a card
        // restore (R2-4): offer "make your own from this
        // template" first.
        restoredNotice = true;
        renderOptions();
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
        const fullWidthParens = getLang() === 'ja' || getLang() === 'zh';
        const loadBtn = chip(
          isCurrent
            ? fullWidthParens
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
    const glbBtn = chip(t('ui.exportGlb'), false, () => void downloadExport('glb'));
    glbBtn.id = 'btn-export-glb';
    const vrmBtn = chip(t('ui.exportVrm'), false, () => void downloadExport('vrm'));
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
        recordEvent('blend', encodeSeed(next), { parents });
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
      const when = new Date(ev.at).toLocaleString(LANG_LOCALES[getLang()], {
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
      if (ev.kind === 'mutate' && ev.source) {
        const s = decodeSeed(ev.source)?.name || t('ui.unnamed');
        nodes.push(el('p', 'llm-note', `${t('history.source')}: ${s}`));
      }
    }
    // mutation: one-parent variations of the current person
    // (see the module-state block above). The strength is picked
    // first, then a shelf of four candidates is rolled; each
    // candidate is a still captured from the stage, picking one
    // previews it, and adopting it starts a new person.
    nodes.push(el('span', 'group-label', t('mutation.title')));
    nodes.push(el('p', 'llm-note', t('mutation.note')));
    const strengthRow = el('div', 'seed-row');
    for (const s of MUTATION_STRENGTHS) {
      const b = chip(t(`mutation.${s}` as I18nKey), mutationStrength === s, () => {
        mutationStrength = s;
        renderOptions();
      });
      b.id = `mutation-strength-${s}`;
      strengthRow.append(b);
    }
    nodes.push(strengthRow);
    const mutGenRow = el('div', 'seed-row');
    const mutGenBtn = chip(t('mutation.generate'), false, onMutationGenerate);
    mutGenBtn.id = 'mutation-generate';
    mutGenRow.append(mutGenBtn);
    nodes.push(mutGenRow);
    if (mutationCands) {
      nodes.push(el('span', 'group-label', t('mutation.candidates')));
      const thumbsRow = el('div', 'mutation-thumbs');
      mutationCands.list.forEach((candidate, i) => {
        const b = el('button', 'mutation-thumb') as HTMLButtonElement;
        b.type = 'button';
        b.id = `mutation-candidate-${i}`;
        b.setAttribute('aria-pressed', String(mutationSelected === i));
        b.setAttribute('aria-label', `${t('mutation.candidates')} ${i + 1}`);
        const img = el('img');
        img.src = mutationCands!.thumbs[i];
        img.alt = '';
        b.append(img);
        b.addEventListener('click', () => onMutationSelect(i));
        thumbsRow.append(b);
      });
      nodes.push(thumbsRow);
      if (mutationSelected !== null) {
        const candSeedRow = el('div', 'seed-row');
        const candSeedVal = el(
          'code',
          'seed-value',
          encodeSeed(candidateOutfit(mutationCands.list[mutationSelected])),
        );
        candSeedVal.id = 'mutation-candidate-seed';
        candSeedRow.append(candSeedVal);
        nodes.push(candSeedRow);
        const actRow = el('div', 'seed-row');
        const applyBtn = chip(t('mutation.apply'), false, onMutationApply);
        applyBtn.id = 'mutation-apply';
        const cancelBtn = chip(t('mutation.cancel'), false, onMutationCancel);
        cancelBtn.id = 'mutation-cancel';
        actRow.append(applyBtn, cancelBtn);
        nodes.push(actRow);
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
  } else if (activeTab === 'outer') {
    for (const style of OUTER_STYLES) {
      nodes.push(
        chip(t(style === 'none' ? 'item.none' : key('outer', style)), outfit.outerStyle === style, () =>
          update({ ...outfit, outerStyle: style }),
        ),
      );
    }
    nodes.push(el('span', 'group-label', t('ui.color')));
    for (const color of OUTER_COLORS) {
      const s = el('button', 'swatch') as HTMLButtonElement;
      s.type = 'button';
      s.style.background = color;
      s.setAttribute('aria-pressed', String(outfit.outerColor === color));
      s.setAttribute('aria-label', `${t('ui.color')} ${color}`);
      s.addEventListener('click', () => update({ ...outfit, outerColor: color }));
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
    if (isDress(outfit.topStyle)) {
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
  // A person has just arrived from outside: this is the
  // receiver's moment (R2-4). update() cleared the flag; set it
  // now and re-render so the notice is what the panel shows.
  restoredNotice = true;
  renderOptions();
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
  document.getElementById('footer-principle')!.textContent = t('principle.note');
  document.getElementById('btn-photo')!.textContent = t('ui.savePhoto');
  document.getElementById('btn-random')!.textContent = t('ui.random');
  document.getElementById('btn-spin')!.textContent = t('ui.spin');
  document.getElementById('btn-reset-view')!.textContent = t('ui.resetView');
  const langSelect = document.getElementById('lang-select') as HTMLSelectElement;
  if (langSelect.options.length === 0) {
    for (const lang of LANGS) {
      const opt = document.createElement('option');
      opt.value = lang;
      opt.textContent = LANG_LABELS[lang];
      langSelect.append(opt);
    }
  }
  langSelect.value = getLang();
  document.title = `${t('app.title')}（${t('app.workingTitle')}）`;
}

async function exportPhoto(): Promise<void> {
  stage.renderer.render(stage.scene, stage.camera);
  const blob = await composeShareCard(canvas, {
    appName: t('app.title'),
    workingTitleNote: t('app.workingTitle'),
    tagline: t('app.tagline'),
    seed: encodeSeed(outfit),
    look: lookSegments(outfit),
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
function export3dFile(format: 'glb' | 'vrm'): Promise<ExportedFile> {
  const fig = rig.figure();
  return format === 'vrm' ? exportVrm(outfit, fig, calibration.legRatio) : exportGlb(outfit, fig, calibration.legRatio);
}

async function downloadExport(format: 'glb' | 'vrm'): Promise<void> {
  const { bytes } = await export3dFile(format);
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
(document.getElementById('lang-select') as HTMLSelectElement).addEventListener('change', (e) => {
  const next = (e.target as HTMLSelectElement).value as Lang;
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
  vrRig?.refreshPanel();
  renderVrButton();
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

// ---- VR dress-up (WebXR) — the product's main act ----
// The user stands in the room (scene.ts places the player rig
// at the spawn point while presenting) and dresses the person
// from the panel beside the rack (vr.ts). Every press flows
// back into the same state paths the flat UI uses: outfit
// patches go through update() and its sanitize gate, looks are
// read from the saved-looks store, and the photo is the share
// card. Nothing about the person in VR bypasses the gates the
// flat screen lives under.

// Saved looks live in the looks store (localStorage, written
// by the flat UI's looks shelf). The VR panel reads the store
// directly on every refresh, so the two surfaces can never
// disagree about what is saved. Entries are re-validated on
// the way in, and applying one merges its clothing fields over
// the current outfit — through update(), so the sanitize gate
// decides what a stored look may name (fields this build does
// not know are dropped there, never smuggled).
const LOOKS_STORAGE_KEY = 'fitting-room.looks.v1';

interface StoredLook {
  id: string;
  name: string;
  look: Record<string, unknown>;
}

function readStoredLooks(): StoredLook[] {
  try {
    const raw = localStorage.getItem(LOOKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const out: StoredLook[] = [];
    for (const entry of parsed) {
      if (typeof entry !== 'object' || entry === null) continue;
      const e = entry as Record<string, unknown>;
      if (typeof e.id !== 'string' || !e.id) continue;
      if (typeof e.name !== 'string' || !e.name.trim()) continue;
      if (typeof e.look !== 'object' || e.look === null) continue;
      out.push({ id: e.id, name: e.name, look: e.look as Record<string, unknown> });
    }
    return out;
  } catch {
    return [];
  }
}

function applyStoredLook(id: string): void {
  const entry = readStoredLooks().find((l) => l.id === id);
  if (!entry) return;
  update({ ...outfit, ...(entry.look as Partial<Outfit>) });
}

// The VR photo: the share card, composed from a dedicated
// camera at the flat home framing (the same angle the flat
// photo shows), rendered offscreen. While presenting, three.js
// swaps any render's camera for the XR camera, so for this one
// render XR is switched off and back on inside the same frame
// callback — no headset frame is produced in between. The card
// itself is the ordinary share card (composeShareCardFromImage
// is the same composition the generated-image card uses), seed
// embedded and printed as always.
const VR_PHOTO_W = 600;
const VR_PHOTO_H = 750;
const vrPhotoTarget = new THREE.WebGLRenderTarget(VR_PHOTO_W, VR_PHOTO_H);
const vrPhotoCam = new THREE.PerspectiveCamera(40, VR_PHOTO_W / VR_PHOTO_H, 0.1, 60);
let vrPhotoRequested = false;

async function composeVrPhotoCard(): Promise<Blob> {
  const h = outfit.character.height;
  vrPhotoCam.position.set(0, h * 0.76, 3.9);
  vrPhotoCam.lookAt(0, h * 0.54, 0);
  vrPhotoCam.updateMatrixWorld();
  const renderer = stage.renderer;
  const wasXrEnabled = renderer.xr.enabled;
  if (stage.isPresenting()) renderer.xr.enabled = false;
  const prevTarget = renderer.getRenderTarget();
  renderer.setRenderTarget(vrPhotoTarget);
  renderer.render(stage.scene, vrPhotoCam);
  const pixels = new Uint8Array(VR_PHOTO_W * VR_PHOTO_H * 4);
  renderer.readRenderTargetPixels(vrPhotoTarget, 0, 0, VR_PHOTO_W, VR_PHOTO_H, pixels);
  renderer.setRenderTarget(prevTarget);
  if (stage.isPresenting()) renderer.xr.enabled = wasXrEnabled;

  // readRenderTargetPixels is bottom-up; flip into a 2D canvas.
  const c2 = document.createElement('canvas');
  c2.width = VR_PHOTO_W;
  c2.height = VR_PHOTO_H;
  const ctx = c2.getContext('2d');
  if (!ctx) throw new Error('2d context unavailable');
  const imgData = ctx.createImageData(VR_PHOTO_W, VR_PHOTO_H);
  const rowBytes = VR_PHOTO_W * 4;
  for (let y = 0; y < VR_PHOTO_H; y++) {
    imgData.data.set(
      pixels.subarray((VR_PHOTO_H - 1 - y) * rowBytes, (VR_PHOTO_H - y) * rowBytes),
      y * rowBytes,
    );
  }
  ctx.putImageData(imgData, 0, 0);
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('vr photo image could not be loaded'));
    img.src = c2.toDataURL('image/png');
  });
  return composeShareCardFromImage(img, {
    appName: t('app.title'),
    workingTitleNote: t('app.workingTitle'),
    tagline: t('app.tagline'),
    seed: encodeSeed(outfit),
    look: lookSegments(outfit),
    name: outfit.name,
  });
}

async function deliverVrPhoto(): Promise<void> {
  try {
    const blob = await composeVrPhotoCard();
    downloadBlob(blob, '3d-fitting-room.png');
    showToast(t('ui.saved'));
  } catch {
    showToast(t('vr.sessionError'));
  }
}

function takeVrPhoto(): void {
  // Inside the headset the render must happen inside the frame
  // callback (the loop picks the flag up); on the flat screen
  // it can go right away.
  if (stage.isPresenting()) {
    vrPhotoRequested = true;
  } else {
    void deliverVrPhoto();
  }
}

vrRig = createVrRig(stage, {
  getOutfit: () => outfit,
  applyPatch: (patch) => update({ ...outfit, ...patch }),
  getLooks: (): VrLookEntry[] => readStoredLooks().map((l) => ({ id: l.id, name: l.name })),
  applyLook: applyStoredLook,
  takePhoto: takeVrPhoto,
});

// The "VRで入る" entry: shown only when an immersive-vr session
// is actually available; where it is not, a note says why (the
// flat experience is untouched either way). The check is the
// platform's own — no headset is assumed, none is simulated.
type VrSupport = 'unknown' | 'supported' | 'unsupported';
let vrSupport: VrSupport = 'unknown';
let xrSession: XRSession | null = null;

function renderVrButton(): void {
  const btn = document.getElementById('btn-vr') as HTMLButtonElement | null;
  const note = document.getElementById('vr-note') as HTMLElement | null;
  if (btn) {
    btn.hidden = vrSupport !== 'supported';
    btn.textContent = stage.isPresenting() ? t('vr.exit') : t('vr.enter');
  }
  if (note) {
    note.hidden = vrSupport !== 'unsupported';
    if (vrSupport === 'unsupported') note.textContent = t('vr.unsupported');
  }
}

async function initVrEntry(): Promise<void> {
  let supported = false;
  if (navigator.xr) {
    try {
      supported = await navigator.xr.isSessionSupported('immersive-vr');
    } catch {
      supported = false;
    }
  }
  vrSupport = supported ? 'supported' : 'unsupported';
  renderVrButton();
}

async function onVrButton(): Promise<void> {
  if (stage.isPresenting()) {
    try {
      await xrSession?.end();
    } catch {
      // Already ended from the headset side.
    }
    return;
  }
  if (!navigator.xr || vrSupport !== 'supported') return;
  // XR pixel-ratio discipline: the session's framebuffer is
  // created from the canvas drawing buffer when the session
  // starts, so the ratio is lowered *before* the request and
  // restored when the session ends (standalone headsets render
  // per eye at frame rate; the flat screen's up-to-2x buffer is
  // fill cost the room does not need twice).
  const prevRatio = stage.renderer.getPixelRatio();
  stage.renderer.setPixelRatio(1);
  stage.resize();
  let session: XRSession | null = null;
  try {
    session = await navigator.xr.requestSession('immersive-vr', {
      optionalFeatures: ['local-floor', 'bounded-floor'],
    });
    xrSession = session;
    session.addEventListener('end', () => {
      xrSession = null;
      stage.renderer.setPixelRatio(prevRatio);
      stage.resize();
      renderVrButton();
    });
    await stage.renderer.xr.setSession(session);
  } catch {
    if (session) {
      try {
        await session.end();
      } catch {
        // Nothing to end.
      }
      xrSession = null;
    }
    stage.renderer.setPixelRatio(prevRatio);
    stage.resize();
    showToast(t('vr.sessionError'));
  }
  renderVrButton();
}

document.getElementById('btn-vr')!.addEventListener('click', () => {
  void onVrButton();
});
stage.renderer.xr.addEventListener('sessionstart', renderVrButton);
stage.renderer.xr.addEventListener('sessionend', renderVrButton);
void initVrEntry();

const clock = new THREE.Clock();
const gazePos = new THREE.Vector3();
function loop(): void {
  const tSec = clock.getElapsedTime();
  // The camera's world position is the gaze target: the
  // avatar's eyes track whoever is looking at it (see avatar.ts
  // gaze) — on the flat screen that is the orbit camera, in VR
  // it is the user's head.
  stage.camera.getWorldPosition(gazePos);
  rig.tick(tSec, gazePos);
  stage.tick(tSec);
  vrRig?.update();
  stage.renderer.render(stage.scene, stage.camera);
  // Viewpoint alignment: once per session (and again after the
  // height is changed), from the median of the first headset
  // heights. In VR three.js writes the local-floor pose to the
  // camera's local position during render.
  if (viewpoint === null && stage.renderer.xr.isPresenting) {
    const y = stage.camera.position.y;
    if (Number.isFinite(y)) headsetSamples.push(y);
    if (headsetSamples.length >= VIEWPOINT_SAMPLES) {
      applyViewpoint(medianOf(headsetSamples));
      headsetSamples = [];
    }
  }
  if (vrPhotoRequested) {
    vrPhotoRequested = false;
    void deliverVrPhoto();
  }
}
stage.renderer.setAnimationLoop(loop);
stage.renderer.xr.addEventListener('sessionend', endViewpoint);

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {
    // Offline support is a bonus; the app works without it.
  });
}

// Verification bridge: lets headless checks (and curious users in
// devtools) drive the app and confirm rendering/export really work.
interface FittingRoomBridge {
  ready: boolean;
  /** Shader/texture warm-up result (warmup.ts); null until it ran. */
  warmup: WarmupStats | null;
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
  /** The saved looks — named clothing combinations kept on
   *  this device (a read-only snapshot for verification). */
  getLooks(): SavedLook[];
  /** The clothing worn just before the last change (the
   *  before/after compare), or null when nothing changed yet. */
  getPrevLook(): Look | null;
  cardDataURL(): Promise<string>;
  /** Export the current person + outfit as a 3D file ('glb' or
   *  'vrm'): the bytes as a base64 data URL, plus the part count
   *  and the seed the file carries in its extras (export3d.ts). */
  export3dInfo(format: 'glb' | 'vrm'): Promise<{ dataUrl: string; parts: number; bytes: number; seed: string }>;
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
  /** Mutation state for verification: the candidate shelf
   *  currently on offer (as seeds), the previewed candidate,
   *  whether the restored-person notice is up, and the
   *  variation events in the on-device lineage (lineage.ts) —
   *  the mutation slice of the one history. */
  getMutationState(): {
    candidateSeeds: string[];
    selectedSeed: string | null;
    restoredNotice: boolean;
    history: LineageEvent[];
  };
  /** VR state for verification: whether immersive-vr reported
   *  itself supported, whether a session is presenting, the
   *  panel's pressable buttons (by action id), where the player
   *  rig stands, and the last action the panel dispatched. A
   *  real session needs a headset — what headless checks can
   *  honestly confirm is the detection, the panel and the
   *  dispatch path, not the immersion. */
  getVrState(): {
    support: string;
    presenting: boolean;
    qualityLevel: number;
    panelButtons: number;
    panelActionIds: string[];
    playerPosition: [number, number, number];
    playerRotationY: number;
    lastAction: string | null;
    /** The principle note currently rendered on the panel (M9),
     *  or null when the panel is not showing it. */
    panelNote: string | null;
  };
  /** Press a VR panel button by its action id, through the
   *  same dispatch a controller select event uses. */
  vrPress(actionId: string): boolean;
  /** The VR photo card (the dedicated-camera composition the
   *  panel's photo button downloads) as a data URL. */
  vrPhotoDataURL(): Promise<string | null>;
  /** Draw-call measurement from the stage (scene.ts): one
   *  frame with the mirror's reflection pass and without it. */
  measureStageStats(): { withMirror: number; withoutMirror: number; triangles: number };
  /** VR viewpoint alignment state (bodyscale.ts alignViewpoint). */
  getViewpoint(): { entered: boolean; shownHeightM: number; playerY: number; alignment: ViewpointAlignment | null };
  /** Apply the alignment for a headset height, as the first frames
   *  of a VR session do (verification without a headset). */
  simulateHeadsetHeight(headsetYM: number): ViewpointAlignment;
  endViewpoint(): void;
  /** Shadow map redraw count and current size / filter (scene.ts). */
  shadowStats(): { updates: number; mapPx: number; soft: boolean };
  /** Compiled shader programs (verifies the warm-up: stays flat while changing clothes). */
  programCount(): number;
  /** Aim the flat camera at the VR panel (evidence framing;
   *  the panel is furniture beside the rack, so the default
   *  home view does not show it). */
  viewVrPanel(): void;
}
const bridge: FittingRoomBridge = {
  ready: false,
  warmup: null,
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
  getLooks: () => savedLooks.map((l) => ({ ...l, look: { ...l.look } })),
  getPrevLook: () => (prevLook ? { ...prevLook } : null),
  runCommands: (raw) => {
    const list = Array.isArray(raw)
      ? raw
      : typeof raw === 'object' && raw !== null && Array.isArray((raw as { commands?: unknown }).commands)
        ? (raw as { commands: unknown[] }).commands
        : raw;
    const validation = validateCommands(list);
    const exec = executeCommands(validation.commands, outfit);
    recordCommandBlends(validation.commands, exec.outfit);
    recordCommandMutations(exec);
    if (validation.commands.some((c) => c.type !== 'get_state')) update(exec.outfit);
    return {
      applied: exec.applied,
      rejected: validation.rejected.map((r) => ({ reason: r.reason })),
      wantShareCard: exec.wantShareCard,
      outfit: { ...outfit },
    };
  },
  commandSpec: () => describeCommandProtocol(),
  export3dInfo: async (format) => {
    const { bytes, parts, seed } = await export3dFile(format);
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
  getMutationState: () => ({
    candidateSeeds: mutationCands
      ? mutationCands.list.map((c) => encodeSeed(candidateOutfit(c)))
      : [],
    selectedSeed:
      mutationCands && mutationSelected !== null
        ? encodeSeed(candidateOutfit(mutationCands.list[mutationSelected]))
        : null,
    restoredNotice,
    history: lineageEvents.filter((e) => e.kind === 'mutate'),
  }),
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
      look: lookSegments(outfit),
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
  getVrState: () => ({
    support: vrSupport,
    presenting: stage.isPresenting(),
    qualityLevel: stage.xrQualityLevel(),
    panelButtons: vrRig ? vrRig.panel.targets.length : 0,
    panelActionIds: vrRig
      ? vrRig.panel.targets.map((o) => String(o.userData.actionId ?? ''))
      : [],
    playerPosition: [
      stage.player.position.x,
      stage.player.position.y,
      stage.player.position.z,
    ] as [number, number, number],
    playerRotationY: stage.player.rotation.y,
    lastAction: vrRig?.lastAction ? vrActionId(vrRig.lastAction) : null,
    panelNote: vrRig ? vrRig.panel.noteText : null,
  }),
  vrPress: (actionId) => (vrRig ? vrRig.press(actionId) : false),
  vrPhotoDataURL: async () => {
    const blob = await composeVrPhotoCard();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  },
  measureStageStats: () => stage.measureDrawCalls(),
  getViewpoint: () => ({ entered: heightEntered, shownHeightM: sessionHeight ?? outfit.character.height, playerY: stage.player.position.y, alignment: viewpoint }),
  simulateHeadsetHeight: (y) => applyViewpoint(y),
  endViewpoint: () => {
    endViewpoint();
    stage.player.position.y = 0;
  },
  shadowStats: () => stage.shadowStats(),
  programCount: () => stage.renderer.info.programs?.length ?? 0,
  viewVrPanel: () => {
    stage.camera.position.set(0.55, 1.6, 1.85);
    stage.controls.target.set(-1.35, 1.25, -0.45);
    stage.controls.update();
  },
};
(window as unknown as { __fittingRoom: FittingRoomBridge }).__fittingRoom = bridge;
// Ready once the mannequin asset is on stage (avatar.ts loads it).
stage.watchShadowCasters(rig.root);
// ...and the wardrobe is warm (warmup.ts): every garment and
// accessory has its shader programs compiled and its textures
// uploaded behind the loading screen, so the first change of
// clothes does not hitch. A failed warm-up never blocks entry.
const loadingEl = document.getElementById('loading');
const loadingText = document.getElementById('loading-text');
if (loadingText) loadingText.textContent = t('ui.loading');
function hideLoading(): void {
  if (!loadingEl) return;
  loadingEl.classList.add('done');
  window.setTimeout(() => loadingEl.remove(), 400);
}
void rig.ready
  .then(async () => {
    try {
      const garments: THREE.Object3D[] = [];
      rig.root.traverse((obj) => {
        if (!(obj instanceof THREE.SkinnedMesh)) return;
        if (obj.name.startsWith('G_') || obj.parent?.name.startsWith('G_')) garments.push(obj);
      });
      const extras = buildWarmupItems(rig);
      // Pumps stand on heel posts: plain (unskinned) meshes in the
      // shoe's material, which is a program variant of its own.
      const shoe = garments.find((g) => g.name === 'G_shoesLow' || g.parent?.name === 'G_shoesLow');
      if (shoe) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.005, 0.02, 6), (shoe as THREE.Mesh).material);
        post.castShadow = true;
        extras.add(post);
      }
      bridge.warmup = await warmUpScene(stage.renderer, stage.scene, stage.camera, {
        reveal: garments,
        extras,
        extrasParent: rig.root,
      });
    } catch (err) {
      console.warn('warm-up skipped', err);
    }
    // Visibility was restored to what it was before the warm-up;
    // re-apply in case the outfit changed meanwhile.
    applyOutfit(rig, outfit);
    // The warm frames drew the shadow map from partial scenes.
    stage.invalidateShadows();
    bridge.ready = true;
    renderOptions();
  })
  .finally(hideLoading);

// ---- Body Scale Calibration dialog (optional, from the character tab) ----
// Every field is optional; an empty height keeps the current one.
// Nothing leaves the device (bodyscale.ts storage).
function openCalibrationDialog(): void {
  const overlay = el('div', 'calib-overlay');
  const box = el('div', 'calib-dialog');
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', t('calib.title'));
  const form = document.createElement('form');
  const hInput = el('input', 'calib-height') as HTMLInputElement;
  hInput.type = 'number';
  hInput.min = String(Math.round(HEIGHT_MIN * 100));
  hInput.max = String(Math.round(HEIGHT_MAX * 100));
  hInput.step = '1';
  hInput.value = String(Math.round(calibration.heightM * 100));
  hInput.setAttribute('aria-label', t('calib.height'));
  let leg = calibration.legRatio;
  const legRow = el('div', 'calib-row');
  const legChips = LEG_RATIOS.map((l) => {
    const c = chip(t(`calib.leg.${l}`), l === leg, () => {
      leg = l;
      legChips.forEach((b, i) => b.setAttribute('aria-pressed', String(LEG_RATIOS[i] === l)));
    });
    return c;
  });
  legRow.append(...legChips);
  const ws = el('input', 'slider') as HTMLInputElement;
  ws.type = 'range';
  ws.min = String(WORLD_SCALE_MIN);
  ws.max = String(WORLD_SCALE_MAX);
  ws.step = '0.01';
  ws.value = String(calibration.worldScale);
  ws.setAttribute('aria-label', t('calib.worldScale'));
  const ok = el('button', 'chip primary', t('calib.ok')) as HTMLButtonElement;
  ok.type = 'submit';
  const cancel = el('button', 'chip', t('calib.cancel')) as HTMLButtonElement;
  cancel.type = 'button';
  cancel.addEventListener('click', () => overlay.remove());
  const actions = el('div', 'calib-row');
  actions.append(ok, cancel);
  const hRow = el('label', 'calib-row');
  hRow.append(el('span', 'slider-label', t('calib.height')), hInput, el('span', 'slider-val', 'cm'));
  form.append(
    el('h2', 'calib-title', t('calib.title')),
    el('p', 'calib-intro', t('calib.intro')),
    hRow,
    el('span', 'group-label', t('calib.leg')),
    legRow,
    el('span', 'group-label', t('calib.worldScale')),
    ws,
    el('p', 'calib-hint', t('calib.worldScaleHint')),
    actions,
  );
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!hInput.reportValidity()) return;
    const h = hInput.value.trim() === '' ? calibration.heightM : Number(hInput.value) / 100;
    setCalibration({ heightM: h, legRatio: leg, worldScale: Number(ws.value) });
    patchCharacter({ height: h });
    void rig.setBody(rig.figure(), calibration.legRatio).then(() => renderOptions());
    overlay.remove();
  });
  box.append(form);
  overlay.append(box);
  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay.remove();
  });
  document.body.append(overlay);
  hInput.focus();
}
