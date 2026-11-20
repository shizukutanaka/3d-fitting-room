// Bring-your-own image generation. The user may point the app
// at their own Stable Diffusion WebUI API (AUTOMATIC1111 / Forge
// and compatible servers) running in their own environment, and
// generate an illustration of the current person — either from
// the auto-built prompt alone (txt2img) or anchored on the
// current 3D rendering (img2img).
//
// Data rules (see docs/SD-CONNECT.md and docs/DESIGN.md §18):
//  - The product ships with NO endpoint and NO model. No weights
//    are bundled or downloaded; generation happens entirely on
//    the user's server, at the user's compute and cost (the
//    estate-wide rule: heavy processing runs on the user's own
//    account / contract / machine).
//  - Until the user saves settings, this module makes no network
//    requests at all. Settings (endpoint URL, optional auth) live
//    only in this device's localStorage.
//  - What is sent to that endpoint: the prompt (built on-device
//    from the current parameters and outfit), and for img2img
//    the current rendering as the input image. Nothing else,
//    and nowhere else.
//  - The generated image is the *user's* content, produced by
//    the user's model on the user's machine — it is not app
//    material and the app claims no rights in it (DESIGN.md §7).
//    It is kept in memory and in downloads/cards the user makes;
//    it is never uploaded anywhere by the app.

import {
  CHARACTER_PARAM_SPECS,
  fitzpatrickLabel,
  type CharacterParams,
} from './character';
import { isValidEndpoint } from './llm';
import type { Outfit } from './outfit';
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
  isDress,
} from './outfit';

export interface ImagingSettings {
  /** Base URL of a Stable Diffusion WebUI API, as the user typed
   *  it (with or without the /sdapi/v1 suffix — see helpers). */
  endpoint: string;
  /** Optional credentials. The WebUI's --api-auth form is
   *  "user:password" and is sent as HTTP Basic; any other value
   *  is sent as a Bearer token (for gateways in front of a
   *  server). ASCII is assumed for the Basic form. */
  apiKey: string;
}

export const IMAGING_SETTINGS_KEY = 'fitting-room.sd.v1';

export const EMPTY_IMAGING_SETTINGS: ImagingSettings = { endpoint: '', apiKey: '' };

export function loadImagingSettings(storage: Storage = localStorage): ImagingSettings {
  try {
    const raw = storage.getItem(IMAGING_SETTINGS_KEY);
    if (!raw) return { ...EMPTY_IMAGING_SETTINGS };
    const o = JSON.parse(raw) as Record<string, unknown>;
    return {
      endpoint: typeof o.endpoint === 'string' ? o.endpoint : '',
      apiKey: typeof o.apiKey === 'string' ? o.apiKey : '',
    };
  } catch {
    return { ...EMPTY_IMAGING_SETTINGS };
  }
}

export function saveImagingSettings(settings: ImagingSettings, storage: Storage = localStorage): void {
  try {
    storage.setItem(IMAGING_SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Storage blocked: settings just won't persist.
  }
}

function baseUrl(endpoint: string): string {
  return endpoint.trim().replace(/\/+$/, '').replace(/\/sdapi\/v1$/, '');
}

/** Accepts the server root (http://localhost:7860) or a base that
 *  already ends in /sdapi/v1, and returns the API path URL. */
export function sdApiUrl(endpoint: string, path: string): string {
  return `${baseUrl(endpoint)}/sdapi/v1/${path.replace(/^\/+/, '')}`;
}

function authHeaders(settings: ImagingSettings): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const auth = settings.apiKey.trim();
  if (auth) {
    if (auth.includes(':')) {
      try {
        headers.Authorization = `Basic ${btoa(auth)}`;
      } catch {
        headers.Authorization = `Bearer ${auth}`;
      }
    } else {
      headers.Authorization = `Bearer ${auth}`;
    }
  }
  return headers;
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number,
  fetchImpl: typeof fetch,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetchImpl(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export type ImagingTestResult = { ok: true; models: string[] } | { ok: false; error: string };

/** Connection test: list the checkpoints the server offers.
 *  Proves reachability and (when credentials are set) that they
 *  are accepted, without spending a generation. */
export async function testImagingConnection(
  settings: ImagingSettings,
  fetchImpl: typeof fetch = fetch,
): Promise<ImagingTestResult> {
  if (!isValidEndpoint(settings.endpoint)) return { ok: false, error: 'invalid endpoint URL' };
  try {
    const res = await fetchWithTimeout(
      sdApiUrl(settings.endpoint, 'sd-models'),
      { headers: authHeaders(settings) },
      15000,
      fetchImpl,
    );
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const data = (await res.json()) as Array<{ model_name?: unknown; title?: unknown }>;
    const models = Array.isArray(data)
      ? data
          .map((m) => (typeof m?.model_name === 'string' ? m.model_name : m?.title))
          .filter((n): n is string => typeof n === 'string')
      : [];
    return { ok: true, models };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ---- prompt construction ----
// The prompt is generated from the same sources of truth as
// everything else: the parameter specs in character.ts (ranges,
// palettes, option lists) and the outfit catalogs in outfit.ts.
// A parameter added to the specs is described here by the
// generic range-deviation mechanism below as soon as it has a
// phrase entry; palette and catalog colors resolve through the
// name tables, and tests/imaging.test.ts pins those tables to
// cover every palette/catalog entry — so a new color without a
// prompt name fails the build instead of silently degrading.

/** Prompt names for every hair palette color (character.ts). */
export const HAIR_COLOR_NAMES: Record<string, string> = {
  '#201612': 'black',
  '#3a2417': 'dark brown',
  '#503729': 'brown',
  '#7a4a26': 'chestnut brown',
  '#8c3b22': 'auburn',
  '#a97c50': 'light brown',
  '#d9b380': 'blonde',
  '#b9b4ad': 'silver-gray',
};

/** Prompt names for every eye palette color (character.ts). */
export const EYE_COLOR_NAMES: Record<string, string> = {
  '#2e2019': 'dark brown',
  '#5a3a1e': 'brown',
  '#7a5a26': 'amber',
  '#46684a': 'green',
  '#3d5a80': 'blue',
  '#707880': 'gray',
};

/** Prompt names for every garment color across the outfit
 *  catalogs (tops, bottoms, shoes). */
export const GARMENT_COLOR_NAMES: Record<string, string> = {
  '#ffffff': 'white',
  '#ff8fab': 'pink',
  '#7cc7ff': 'light blue',
  '#8fe3c0': 'mint green',
  '#c9a7ff': 'lavender',
  '#ffd166': 'yellow',
  '#3a4152': 'dark navy',
  '#44557a': 'indigo denim blue',
  '#2f3542': 'charcoal gray',
  '#e8e2d6': 'cream',
  '#a83c46': 'red',
  '#5e2233': 'burgundy',
  '#26262b': 'black',
  '#7c4a2d': 'brown',
  '#3d5a80': 'steel blue',
  '#d8b25c': 'gold',
  '#b03050': 'wine red',
  '#2e5e4e': 'deep green',
  '#f2a65a': 'apricot',
  '#5b4a68': 'muted plum',
  '#8a6642': 'camel',
  '#606c38': 'olive green',
  '#c0c6cc': 'silver gray',
  '#b08954': 'tan',
  '#2c3a55': 'navy',
  '#7a2e3a': 'wine',
  '#6b7250': 'khaki olive',
};

const HAIR_STYLE_PHRASES: Record<string, string> = {
  bob: 'a bob cut',
  long: 'long hair',
  short: 'short hair',
  ponytail: 'a ponytail',
  bun: 'a hair bun',
};

/** Low/high prompt phrases for range parameters, keyed by spec
 *  name. A phrase is emitted only when the value sits notably
 *  away from the spec default (see deviationPhrase). Parameters
 *  with no entry — the millimetre/degree offsets (eyeHeight,
 *  browHeight, eyeTilt, browTilt) and asymmetry — are below the
 *  resolution a text prompt can express, so they stay out of the
 *  prompt rather than pretending to steer it. */
export const RANGE_PHRASES: Partial<
  Record<keyof CharacterParams, { low: string; high: string }>
> = {
  shoulderWidth: { low: 'narrow shoulders', high: 'broad shoulders' },
  waist: { low: 'a slim waist', high: 'a wide waist' },
  hip: { low: 'narrow hips', high: 'wide hips' },
  bust: { low: 'a small bust', high: 'a full bust' },
  build: { low: 'a slim build', high: 'a sturdy build' },
  eyeSize: { low: 'small eyes', high: 'large eyes' },
  eyeSpacing: { low: 'close-set eyes', high: 'wide-set eyes' },
  eyeShape: { low: 'almond-shaped eyes', high: 'round eyes' },
  noseWidth: { low: 'a narrow nose', high: 'a wide nose' },
  noseProminence: { low: 'a small nose', high: 'a prominent nose' },
  lipWidth: { low: 'a small mouth', high: 'a wide mouth' },
  lipFullness: { low: 'thin lips', high: 'full lips' },
  faceWidth: { low: 'a narrow face', high: 'a wide face' },
};

const SKIN_PHRASES = [
  'very pale skin',
  'pale skin',
  'light skin',
  'a medium skin tone',
  'brown skin',
  'deep brown skin',
] as const;

const TOP_PHRASES: Record<string, string> = {
  tee: 'T-shirt',
  hoodie: 'hoodie',
  blouse: 'blouse',
  dress: 'one-piece dress',
  dressLong: 'long one-piece dress',
};
const OUTER_PHRASES: Record<string, string> = {
  jacket: 'a jacket',
  coat: 'a long coat',
  cardigan: 'a knit cardigan',
};
const BOTTOM_PHRASES: Record<string, string> = {
  skirt: 'a skirt',
  skirtLong: 'a long skirt',
  pants: 'pants',
  shorts: 'shorts',
};
const SHOE_PHRASES: Record<string, string> = {
  flats: 'flat shoes',
  sneakers: 'sneakers',
  pumps: 'pumps',
  boots: 'boots',
};
const HAT_PHRASES: Record<string, string> = {
  cap: 'a baseball cap',
  beanie: 'a knit beanie',
  catears: 'a cat-ear headband',
  ribbon: 'a ribbon in the hair',
};
const GLASSES_PHRASES: Record<string, string> = {
  round: 'round glasses',
  square: 'square glasses',
  sunglasses: 'sunglasses',
};
const ACCESSORY_PHRASES: Record<string, string> = {
  necklace: 'a necklace',
  scarf: 'a scarf',
  bag: 'a shoulder bag',
};
const POSE_PHRASES: Record<string, string> = {
  stand: 'standing',
  wave: 'waving one hand',
  cheer: 'both arms raised in celebration',
  peace: 'making a peace sign',
  relax: 'a relaxed pose',
};

/** The catalogs the phrase tables must cover — checked by tests
 *  so a new garment or option cannot slip in undescribed. */
export const PROMPT_CATALOGS = {
  top: TOP_STYLES,
  outer: OUTER_STYLES,
  bottom: BOTTOM_STYLES,
  shoe: SHOE_STYLES,
  hat: HATS,
  glasses: GLASSES,
  accessory: ACCESSORIES,
  pose: POSES,
  topColors: TOP_COLORS,
  outerColors: OUTER_COLORS,
  bottomColors: BOTTOM_COLORS,
  shoeColors: SHOE_COLORS,
} as const;

export const PROMPT_PHRASE_TABLES = {
  top: TOP_PHRASES,
  outer: OUTER_PHRASES,
  bottom: BOTTOM_PHRASES,
  shoe: SHOE_PHRASES,
  hat: HAT_PHRASES,
  glasses: GLASSES_PHRASES,
  accessory: ACCESSORY_PHRASES,
  pose: POSE_PHRASES,
} as const;

function deviationPhrase(key: keyof CharacterParams, value: number): string | null {
  const phrases = RANGE_PHRASES[key];
  const spec = CHARACTER_PARAM_SPECS[key];
  if (!phrases || spec.kind !== 'range') return null;
  const span = spec.max - spec.min;
  if (span <= 0) return null;
  const norm = (value - spec.min) / span;
  const defNorm = (spec.def - spec.min) / span;
  if (norm - defNorm > 0.22) return phrases.high;
  if (defNorm - norm > 0.22) return phrases.low;
  return null;
}

export interface BuiltPrompt {
  prompt: string;
  negativePrompt: string;
}

/** The negative prompt is fixed and safety-first: the person is
 *  an adult by design (LEGAL-ETHICS.md judgment J-02), and the
 *  app never helps phrase a minor — the exclusion terms below
 *  are part of the product, not a user option. */
export const IMAGE_NEGATIVE_PROMPT =
  'minor, child, teenager, young-looking, school uniform, loli, nsfw, nude, naked, ' +
  'blurry, lowres, deformed hands, extra fingers, extra limbs, watermark, text';

export interface PromptOptions {
  /** Extra words the user adds, appended last so they can steer
   *  style ("watercolor illustration", "at sunset", …). */
  extra?: string;
  /** img2img: anchor the wording on the input image being the
   *  same person. */
  forImg2Img?: boolean;
}

/** Build the image-generation prompt for the current person and
 *  outfit. Always describes a fictional adult character (J-02);
 *  no gender label is used anywhere — the character system's
 *  parameters are shape values, not a gender (J-04). */
export function buildImagePrompt(outfit: Outfit, options: PromptOptions = {}): BuiltPrompt {
  const c = outfit.character;
  const parts: string[] = [];
  if (options.forImg2Img) {
    parts.push('the same fictional adult character as the input image');
    parts.push('keep the same face, hairstyle and outfit');
  } else {
    parts.push('full-body portrait of a fictional adult character, one adult person');
  }

  // skin: the continuous Fitzpatrick value, in the same six
  // bands the slider labels use (fitzpatrickLabel is the single
  // place that bands it)
  const skinIdx = ['I', 'II', 'III', 'IV', 'V', 'VI'].indexOf(fitzpatrickLabel(c.skinTone));
  parts.push(SKIN_PHRASES[Math.max(0, skinIdx)]);

  // height: quartiles of the spec range
  const hSpec = CHARACTER_PARAM_SPECS.height;
  if (hSpec.kind === 'range') {
    const h01 = (c.height - hSpec.min) / (hSpec.max - hSpec.min);
    if (h01 < 0.25) parts.push('short in stature');
    else if (h01 >= 0.75) parts.push('very tall');
    else if (h01 >= 0.5) parts.push('tall');
  }

  // body and face: whatever sits notably off its default
  for (const key of Object.keys(RANGE_PHRASES) as Array<keyof CharacterParams>) {
    const phrase = deviationPhrase(key, c[key] as number);
    if (phrase) parts.push(phrase);
  }

  // hair and eyes
  const hairName = HAIR_COLOR_NAMES[c.hairColor] ?? 'natural-colored';
  const hairStyle = HAIR_STYLE_PHRASES[c.hairStyle] ?? 'a simple hairstyle';
  parts.push(`${hairName} hair in ${hairStyle}`);
  const eyeName = EYE_COLOR_NAMES[c.eyeColor] ?? 'dark';
  parts.push(`${eyeName} eyes`);

  // outfit, from the catalogs
  const topName = GARMENT_COLOR_NAMES[outfit.topColor] ?? '';
  parts.push(`wearing a ${topName} ${TOP_PHRASES[outfit.topStyle] ?? 'top'}`.replace(/\s+/g, ' '));
  if (outfit.outerStyle !== 'none') {
    const outerName = GARMENT_COLOR_NAMES[outfit.outerColor] ?? '';
    parts.push(`${outerName} ${OUTER_PHRASES[outfit.outerStyle] ?? 'outerwear'} over it`.replace(/\s+/g, ' '));
  }
  if (outfit.bottomStyle !== 'none' && !isDress(outfit.topStyle)) {
    const bottomName = GARMENT_COLOR_NAMES[outfit.bottomColor] ?? '';
    parts.push(`${bottomName} ${BOTTOM_PHRASES[outfit.bottomStyle] ?? ''}`.replace(/\s+/g, ' '));
  }
  const shoeName = GARMENT_COLOR_NAMES[outfit.shoeColor] ?? '';
  parts.push(`${shoeName} ${SHOE_PHRASES[outfit.shoeStyle] ?? 'shoes'}`.replace(/\s+/g, ' '));
  if (outfit.hat !== 'none') parts.push(HAT_PHRASES[outfit.hat] ?? '');
  if (outfit.glasses !== 'none') parts.push(GLASSES_PHRASES[outfit.glasses] ?? '');
  if (outfit.accessory !== 'none') parts.push(ACCESSORY_PHRASES[outfit.accessory] ?? '');

  parts.push(POSE_PHRASES[outfit.pose] ?? 'standing');
  parts.push('in a boutique fitting room, soft studio lighting, high quality, detailed');

  const extra = options.extra?.trim();
  if (extra) parts.push(extra);
  return { prompt: parts.filter(Boolean).join(', '), negativePrompt: IMAGE_NEGATIVE_PROMPT };
}

// ---- generation ----

export interface GenerationOptions {
  steps?: number;
  cfgScale?: number;
  sampler?: string;
  /** txt2img canvas size (square by default: the share card is
   *  square). */
  width?: number;
  height?: number;
  /** img2img only: how far the result may depart from the input
   *  rendering (0 = the rendering itself, 1 = unrelated). */
  denoisingStrength?: number;
}

export interface GeneratedImage {
  /** A data: URL for the first returned image. */
  dataUrl: string;
  /** The exact prompt that was sent. */
  prompt: string;
}

function toDataUrl(image: string): string {
  return image.startsWith('data:') ? image : `data:image/png;base64,${image}`;
}

function stripDataUrl(dataUrl: string): string {
  const comma = dataUrl.indexOf(',');
  return dataUrl.startsWith('data:') && comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
}

function round8(n: number): number {
  return Math.max(64, Math.round(n / 8) * 8);
}

async function postGeneration(
  settings: ImagingSettings,
  path: string,
  body: Record<string, unknown>,
  prompt: string,
  fetchImpl: typeof fetch,
): Promise<GeneratedImage> {
  const res = await fetchWithTimeout(
    sdApiUrl(settings.endpoint, path),
    { method: 'POST', headers: authHeaders(settings), body: JSON.stringify(body) },
    300000,
    fetchImpl,
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as { images?: unknown };
  const images = Array.isArray(data.images)
    ? data.images.filter((i): i is string => typeof i === 'string' && i.length > 0)
    : [];
  if (!images.length) throw new Error('the server returned no image');
  return { dataUrl: toDataUrl(images[0]), prompt };
}

/** txt2img: generate from the prompt alone. */
export async function generateTxt2Img(
  settings: ImagingSettings,
  built: BuiltPrompt,
  options: GenerationOptions = {},
  fetchImpl: typeof fetch = fetch,
): Promise<GeneratedImage> {
  if (!isValidEndpoint(settings.endpoint)) throw new Error('invalid endpoint URL');
  return postGeneration(
    settings,
    'txt2img',
    {
      prompt: built.prompt,
      negative_prompt: built.negativePrompt,
      steps: options.steps ?? 20,
      cfg_scale: options.cfgScale ?? 7,
      sampler_name: options.sampler ?? 'Euler a',
      width: round8(options.width ?? 768),
      height: round8(options.height ?? 768),
      batch_size: 1,
      n_iter: 1,
    },
    built.prompt,
    fetchImpl,
  );
}

/** img2img: generate from the prompt anchored on the current
 *  rendering, given as a PNG data URL. The rendering is what
 *  ties the result to *this* person — their face, hair and
 *  outfit — instead of an unrelated pretty picture. */
export async function generateImg2Img(
  settings: ImagingSettings,
  built: BuiltPrompt,
  initImageDataUrl: string,
  initSize: { width: number; height: number },
  options: GenerationOptions = {},
  fetchImpl: typeof fetch = fetch,
): Promise<GeneratedImage> {
  if (!isValidEndpoint(settings.endpoint)) throw new Error('invalid endpoint URL');
  return postGeneration(
    settings,
    'img2img',
    {
      prompt: built.prompt,
      negative_prompt: built.negativePrompt,
      init_images: [stripDataUrl(initImageDataUrl)],
      denoising_strength: options.denoisingStrength ?? 0.65,
      steps: options.steps ?? 20,
      cfg_scale: options.cfgScale ?? 7,
      sampler_name: options.sampler ?? 'Euler a',
      width: round8(options.width ?? initSize.width),
      height: round8(options.height ?? initSize.height),
      resize_mode: 0,
      batch_size: 1,
      n_iter: 1,
    },
    built.prompt,
    fetchImpl,
  );
}
