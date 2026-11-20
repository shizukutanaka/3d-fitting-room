import { describe, expect, it } from 'vitest';
import {
  EYE_COLOR_NAMES,
  EMPTY_IMAGING_SETTINGS,
  GARMENT_COLOR_NAMES,
  HAIR_COLOR_NAMES,
  IMAGE_NEGATIVE_PROMPT,
  PROMPT_CATALOGS,
  PROMPT_PHRASE_TABLES,
  RANGE_PHRASES,
  buildImagePrompt,
  generateImg2Img,
  generateTxt2Img,
  loadImagingSettings,
  saveImagingSettings,
  sdApiUrl,
  testImagingConnection,
} from '../src/imaging';
import {
  CHARACTER_PARAM_SPECS,
  EYE_COLORS,
  HAIR_COLORS,
  HAIR_STYLES,
  type CharacterParams,
} from '../src/character';
import { DEFAULT_OUTFIT, type Outfit } from '../src/outfit';

class FakeStorage implements Storage {
  private map = new Map<string, string>();
  get length(): number {
    return this.map.size;
  }
  clear(): void {
    this.map.clear();
  }
  getItem(key: string): string | null {
    return this.map.get(key) ?? null;
  }
  key(index: number): string | null {
    return [...this.map.keys()][index] ?? null;
  }
  removeItem(key: string): void {
    this.map.delete(key);
  }
  setItem(key: string, value: string): void {
    this.map.set(key, value);
  }
}

const outfitWith = (character: Partial<CharacterParams>, rest: Partial<Outfit> = {}): Outfit => ({
  ...DEFAULT_OUTFIT,
  ...rest,
  character: { ...DEFAULT_OUTFIT.character, ...character },
});

describe('SD settings (device-local only)', () => {
  it('defaults to empty: no endpoint exists until the user sets one', () => {
    const storage = new FakeStorage();
    expect(loadImagingSettings(storage)).toEqual(EMPTY_IMAGING_SETTINGS);
    expect(EMPTY_IMAGING_SETTINGS.endpoint).toBe('');
  });

  it('round-trips through storage and tolerates corrupt data', () => {
    const storage = new FakeStorage();
    const settings = { endpoint: 'http://localhost:7860', apiKey: 'u:p' };
    saveImagingSettings(settings, storage);
    expect(loadImagingSettings(storage)).toEqual(settings);
    storage.setItem('fitting-room.sd.v1', '{oops');
    expect(loadImagingSettings(storage)).toEqual(EMPTY_IMAGING_SETTINGS);
  });
});

describe('SD API URL handling', () => {
  it('derives API paths from the server root or a /sdapi/v1 base', () => {
    expect(sdApiUrl('http://localhost:7860', 'txt2img')).toBe(
      'http://localhost:7860/sdapi/v1/txt2img',
    );
    expect(sdApiUrl('http://localhost:7860/', 'sd-models')).toBe(
      'http://localhost:7860/sdapi/v1/sd-models',
    );
    expect(sdApiUrl('http://localhost:7860/sdapi/v1', 'img2img')).toBe(
      'http://localhost:7860/sdapi/v1/img2img',
    );
    expect(sdApiUrl('http://localhost:7860/sdapi/v1/', '/txt2img')).toBe(
      'http://localhost:7860/sdapi/v1/txt2img',
    );
  });
});

describe('prompt construction (generated from the specs and catalogs)', () => {
  it('describes the default person and outfit as a fictional adult', () => {
    const { prompt, negativePrompt } = buildImagePrompt(DEFAULT_OUTFIT);
    expect(prompt).toContain('fictional adult character');
    expect(prompt).toContain('adult person');
    expect(prompt).toContain('bob cut');
    expect(prompt).toContain('T-shirt');
    expect(negativePrompt).toBe(IMAGE_NEGATIVE_PROMPT);
  });

  it('never phrases a minor: the negative prompt excludes minors and school uniforms', () => {
    expect(IMAGE_NEGATIVE_PROMPT).toContain('minor');
    expect(IMAGE_NEGATIVE_PROMPT).toContain('child');
    expect(IMAGE_NEGATIVE_PROMPT).toContain('school uniform');
    const { prompt } = buildImagePrompt(DEFAULT_OUTFIT);
    for (const word of ['girl', 'boy', 'woman', 'man', 'female', 'male']) {
      expect(prompt.toLowerCase()).not.toContain(word);
    }
  });

  it('follows the parameters: hair, height, body and outfit changes change the prompt', () => {
    const base = buildImagePrompt(DEFAULT_OUTFIT).prompt;
    const changed = buildImagePrompt(
      outfitWith(
        { hairStyle: 'ponytail', hairColor: '#d9b380', height: 1.95, build: 1.2, eyeSize: 1.25 },
        { topStyle: 'dress', topColor: '#a83c46', shoeStyle: 'boots' },
      ),
    ).prompt;
    expect(changed).not.toBe(base);
    expect(changed).toContain('ponytail');
    expect(changed).toContain('blonde');
    expect(changed).toContain('very tall');
    expect(changed).toContain('sturdy build');
    expect(changed).toContain('large eyes');
    expect(changed).toContain('red');
    expect(changed).toContain('one-piece dress');
    expect(changed).toContain('boots');
  });

  it('suppresses bottoms under a dress, like the renderer does', () => {
    const dressed = buildImagePrompt(
      outfitWith({}, { topStyle: 'dress', bottomStyle: 'pants' }),
    ).prompt;
    expect(dressed).not.toContain('pants');
    const pants = buildImagePrompt(outfitWith({}, { bottomStyle: 'pants' })).prompt;
    expect(pants).toContain('pants');
  });

  it('appends the user extra words last, and anchors img2img on the input image', () => {
    const withExtra = buildImagePrompt(DEFAULT_OUTFIT, { extra: 'watercolor illustration' });
    expect(withExtra.prompt.endsWith('watercolor illustration')).toBe(true);
    const anchored = buildImagePrompt(DEFAULT_OUTFIT, { forImg2Img: true });
    expect(anchored.prompt).toContain('same fictional adult character as the input image');
  });

  it('names every palette and catalog color, and phrases every catalog option', () => {
    // If a color or option is added to character.ts / outfit.ts
    // without a prompt name, this fails — the prompt builder can
    // never silently degrade to a missing description.
    for (const hex of HAIR_COLORS) expect(HAIR_COLOR_NAMES[hex], `hair ${hex}`).toBeTruthy();
    for (const hex of EYE_COLORS) expect(EYE_COLOR_NAMES[hex], `eye ${hex}`).toBeTruthy();
    for (const hex of [
      ...PROMPT_CATALOGS.topColors,
      ...PROMPT_CATALOGS.bottomColors,
      ...PROMPT_CATALOGS.shoeColors,
    ]) {
      expect(GARMENT_COLOR_NAMES[hex], `garment ${hex}`).toBeTruthy();
    }
    for (const style of HAIR_STYLES) {
      const built = buildImagePrompt(outfitWith({ hairStyle: style })).prompt;
      expect(built).not.toContain('simple hairstyle');
    }
    const phraseTables = PROMPT_PHRASE_TABLES as unknown as Record<
      string,
      Record<string, string>
    >;
    const catalogs: Record<string, readonly string[]> = {
      top: PROMPT_CATALOGS.top,
      bottom: PROMPT_CATALOGS.bottom,
      shoe: PROMPT_CATALOGS.shoe,
      hat: PROMPT_CATALOGS.hat,
      glasses: PROMPT_CATALOGS.glasses,
      accessory: PROMPT_CATALOGS.accessory,
      pose: PROMPT_CATALOGS.pose,
    };
    for (const [name, options] of Object.entries(catalogs)) {
      for (const option of options) {
        if (option === 'none') continue;
        expect(phraseTables[name][option], `${name}.${option}`).toBeTruthy();
      }
    }
  });

  it('range phrases only reference real range parameters', () => {
    for (const key of Object.keys(RANGE_PHRASES)) {
      expect(CHARACTER_PARAM_SPECS[key as keyof CharacterParams].kind).toBe('range');
    }
  });
});

describe('connection test', () => {
  const settings = { endpoint: 'http://localhost:7860', apiKey: 'user:pass' };

  it('lists checkpoints and sends --api-auth credentials as Basic', async () => {
    let seenUrl = '';
    let seenAuth: string | null = null;
    const fakeFetch = (async (url: string, init?: RequestInit) => {
      seenUrl = url;
      seenAuth = new Headers(init?.headers).get('Authorization');
      return new Response(
        JSON.stringify([{ model_name: 'anything-v5', title: 'anything-v5.safetensors [abc]' }]),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }) as typeof fetch;
    const result = await testImagingConnection(settings, fakeFetch);
    expect(result).toEqual({ ok: true, models: ['anything-v5'] });
    expect(seenUrl).toBe('http://localhost:7860/sdapi/v1/sd-models');
    expect(seenAuth).toBe(`Basic ${btoa('user:pass')}`);
  });

  it('sends a colon-free credential as a Bearer token', async () => {
    let seenAuth: string | null = null;
    const fakeFetch = (async (_url: string, init?: RequestInit) => {
      seenAuth = new Headers(init?.headers).get('Authorization');
      return new Response('[]', { status: 200 });
    }) as unknown as typeof fetch;
    await testImagingConnection({ endpoint: 'http://localhost:7860', apiKey: 'tok123' }, fakeFetch);
    expect(seenAuth).toBe('Bearer tok123');
  });

  it('reports HTTP and network failures without throwing', async () => {
    const httpFail = (async () => new Response('nope', { status: 403 })) as unknown as typeof fetch;
    expect(await testImagingConnection(settings, httpFail)).toEqual({
      ok: false,
      error: 'HTTP 403',
    });
    const netFail = (async () => {
      throw new Error('connection refused');
    }) as unknown as typeof fetch;
    expect(await testImagingConnection(settings, netFail)).toEqual({
      ok: false,
      error: 'connection refused',
    });
    expect(await testImagingConnection({ ...settings, endpoint: 'not a url' })).toEqual({
      ok: false,
      error: 'invalid endpoint URL',
    });
  });
});

describe('generation calls (A1111 API shape)', () => {
  const settings = { endpoint: 'http://localhost:7860', apiKey: '' };
  const built = buildImagePrompt(DEFAULT_OUTFIT);
  const pngB64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

  it('txt2img posts the prompt and returns the first image as a data URL', async () => {
    let seenUrl = '';
    let seenBody: Record<string, unknown> = {};
    const fakeFetch = (async (url: string, init?: RequestInit) => {
      seenUrl = url;
      seenBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return new Response(JSON.stringify({ images: [pngB64], parameters: {}, info: '' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }) as typeof fetch;
    const result = await generateTxt2Img(settings, built, {}, fakeFetch);
    expect(seenUrl).toBe('http://localhost:7860/sdapi/v1/txt2img');
    expect(seenBody.prompt).toBe(built.prompt);
    expect(seenBody.negative_prompt).toBe(built.negativePrompt);
    expect(seenBody.width).toBe(768);
    expect(seenBody.height).toBe(768);
    expect(seenBody.init_images).toBeUndefined();
    expect(result.dataUrl).toBe(`data:image/png;base64,${pngB64}`);
    expect(result.prompt).toBe(built.prompt);
  });

  it('img2img posts the rendering (data: prefix stripped) with a denoising strength', async () => {
    let seenUrl = '';
    let seenBody: Record<string, unknown> = {};
    const fakeFetch = (async (url: string, init?: RequestInit) => {
      seenUrl = url;
      seenBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return new Response(JSON.stringify({ images: [pngB64] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }) as typeof fetch;
    const init = `data:image/png;base64,${pngB64}`;
    const result = await generateImg2Img(
      settings,
      built,
      init,
      { width: 640, height: 480 },
      {},
      fakeFetch,
    );
    expect(seenUrl).toBe('http://localhost:7860/sdapi/v1/img2img');
    expect(seenBody.init_images).toEqual([pngB64]);
    expect(seenBody.denoising_strength).toBe(0.65);
    expect(seenBody.width).toBe(640);
    expect(seenBody.height).toBe(480);
    expect(result.dataUrl).toBe(`data:image/png;base64,${pngB64}`);
  });

  it('throws on HTTP errors and on an empty image list', async () => {
    const httpFail = (async () => new Response('boom', { status: 500 })) as unknown as typeof fetch;
    await expect(generateTxt2Img(settings, built, {}, httpFail)).rejects.toThrow('HTTP 500');
    const empty = (async () =>
      new Response(JSON.stringify({ images: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })) as unknown as typeof fetch;
    await expect(generateTxt2Img(settings, built, {}, empty)).rejects.toThrow('no image');
    await expect(
      generateTxt2Img({ ...settings, endpoint: 'not a url' }, built, {}),
    ).rejects.toThrow('invalid endpoint URL');
  });
});
