import { describe, expect, it } from 'vitest';
import {
  LOOKS_MAX,
  addLook,
  loadLooks,
  lookOf,
  removeLook,
  sameLook,
  sanitizeLook,
  sanitizeLooks,
  saveLooks,
  type Look,
} from '../src/looks';
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

const dressed: Outfit = {
  ...DEFAULT_OUTFIT,
  name: 'ミライ',
  topStyle: 'blouse',
  topColor: '#b03050',
  outerStyle: 'coat',
  outerColor: '#2c3a55',
  bottomStyle: 'skirtLong',
  bottomColor: '#5b4a68',
  shoeStyle: 'boots',
  shoeColor: '#26262b',
  hat: 'beanie',
  glasses: 'round',
  accessory: 'bag',
  pose: 'wave',
};

describe('looks (saved clothing combinations)', () => {
  it('lookOf carries only the clothing — never the person, name or pose', () => {
    const look = lookOf(dressed);
    expect(look).toEqual({
      topStyle: 'blouse',
      topColor: '#b03050',
      outerStyle: 'coat',
      outerColor: '#2c3a55',
      bottomStyle: 'skirtLong',
      bottomColor: '#5b4a68',
      shoeStyle: 'boots',
      shoeColor: '#26262b',
      hat: 'beanie',
      glasses: 'round',
      accessory: 'bag',
    });
    expect('character' in look).toBe(false);
    expect('name' in look).toBe(false);
    expect('pose' in look).toBe(false);
  });

  it('applying a look to another person changes only their clothes', () => {
    const other: Outfit = { ...DEFAULT_OUTFIT, name: 'そら', pose: 'cheer' };
    const applied: Outfit = { ...other, ...lookOf(dressed) };
    expect(applied.name).toBe('そら');
    expect(applied.pose).toBe('cheer');
    expect(applied.character).toEqual(other.character);
    expect(applied.topStyle).toBe('blouse');
    expect(applied.outerStyle).toBe('coat');
  });

  it('sanitizeLook rejects off-catalog values toward the defaults', () => {
    const look = sanitizeLook({
      topStyle: 'tuxedo',
      outerStyle: 'coat',
      outerColor: '#000000',
      bottomStyle: 'skirtLong',
    });
    expect(look.topStyle).toBe(DEFAULT_OUTFIT.topStyle);
    expect(look.outerStyle).toBe('coat');
    expect(look.outerColor).toBe(DEFAULT_OUTFIT.outerColor);
    expect(look.bottomStyle).toBe('skirtLong');
    expect(sanitizeLook(null)).toEqual(lookOf(DEFAULT_OUTFIT));
    expect(sanitizeLook('nope')).toEqual(lookOf(DEFAULT_OUTFIT));
  });

  it('sameLook compares every clothing field', () => {
    const a = lookOf(dressed);
    expect(sameLook(a, { ...a })).toBe(true);
    expect(sameLook(a, { ...a, outerStyle: 'none' })).toBe(false);
    expect(sameLook(a, { ...a, shoeColor: '#ffffff' })).toBe(false);
    expect(sameLook(a, { ...a, hat: 'cap' })).toBe(false);
  });

  it('save/load round-trips the look list through storage', () => {
    const storage = new FakeStorage();
    let looks = addLook([], '雨の日', lookOf(dressed), 1000);
    looks = addLook(looks, 'おでかけ', lookOf(DEFAULT_OUTFIT), 2000);
    saveLooks(looks, storage);
    const back = loadLooks(storage);
    expect(back.map((l) => l.name)).toEqual(['おでかけ', '雨の日']);
    expect(back[1].look).toEqual(lookOf(dressed));
    expect(loadLooks(new FakeStorage())).toEqual([]);
  });

  it('addLook caps the rail and removeLook drops by id', () => {
    let looks: ReturnType<typeof addLook> = [];
    for (let i = 0; i < LOOKS_MAX + 5; i++) {
      looks = addLook(looks, `look-${i}`, lookOf(DEFAULT_OUTFIT), i);
    }
    expect(looks).toHaveLength(LOOKS_MAX);
    expect(looks[0].name).toBe(`look-${LOOKS_MAX + 4}`);
    const id = looks[0].id;
    expect(removeLook(looks, id)).toHaveLength(LOOKS_MAX - 1);
    expect(removeLook(looks, 'no-such-id')).toHaveLength(LOOKS_MAX);
  });

  it('sanitizeLooks drops nameless and duplicate entries and sanitizes looks', () => {
    const good = addLook([], 'keep', lookOf(dressed), 5)[0];
    const raw = [
      good,
      { ...good, name: 'duplicate id' },
      { id: 'x1', name: '   ', look: lookOf(dressed), updatedAt: 9 },
      { id: 'x2', name: 'off-list', look: { topStyle: 'tuxedo' }, updatedAt: 9 },
      'garbage',
      null,
    ];
    const out = sanitizeLooks(raw);
    expect(out.map((l) => l.name)).toEqual(['off-list', 'keep']);
    expect(out[0].look.topStyle).toBe(DEFAULT_OUTFIT.topStyle);
    expect(sanitizeLooks('nope')).toEqual([]);
    expect(sanitizeLooks(null)).toEqual([]);
  });

  it('a stored look survives as data even if its JSON was hand-edited', () => {
    const storage = new FakeStorage();
    const looks = addLook([], '手編集', lookOf(dressed), 42);
    storage.setItem(
      'fitting-room.looks.v1',
      JSON.stringify(looks).replace('coat', 'spacesuit'),
    );
    const back = loadLooks(storage);
    expect(back).toHaveLength(1);
    expect(back[0].look.outerStyle).toBe(DEFAULT_OUTFIT.outerStyle);
    const look: Look = back[0].look;
    expect(look.bottomStyle).toBe('skirtLong');
  });
});
