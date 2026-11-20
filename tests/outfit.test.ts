import { describe, expect, it } from 'vitest';
import {
  ACCESSORIES,
  BOTTOM_COLORS,
  BOTTOM_STYLES,
  DEFAULT_OUTFIT,
  GLASSES,
  HATS,
  POSES,
  SHOE_COLORS,
  SHOE_STYLES,
  TOP_COLORS,
  TOP_STYLES,
  loadOutfit,
  randomOutfit,
  sanitizeOutfit,
  saveOutfit,
} from '../src/outfit';

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

describe('outfit state', () => {
  it('sanitizeOutfit falls back to defaults for garbage', () => {
    expect(sanitizeOutfit(null)).toEqual(DEFAULT_OUTFIT);
    expect(sanitizeOutfit('nope')).toEqual(DEFAULT_OUTFIT);
    expect(sanitizeOutfit({ hat: 'crown-of-gold' })).toEqual(DEFAULT_OUTFIT);
    expect(sanitizeOutfit({ topColor: '#123456' }).topColor).toBe(DEFAULT_OUTFIT.topColor);
  });

  it('sanitizeOutfit keeps valid choices', () => {
    const o = sanitizeOutfit({ hat: 'catears', pose: 'cheer', topColor: '#7cc7ff' });
    expect(o.hat).toBe('catears');
    expect(o.pose).toBe('cheer');
    expect(o.topColor).toBe('#7cc7ff');
  });

  it('sanitizeOutfit keeps valid bottoms and shoes, rejects off-list ones', () => {
    const o = sanitizeOutfit({
      bottomStyle: 'pants',
      bottomColor: '#44557a',
      shoeStyle: 'sneakers',
      shoeColor: '#26262b',
    });
    expect(o.bottomStyle).toBe('pants');
    expect(o.bottomColor).toBe('#44557a');
    expect(o.shoeStyle).toBe('sneakers');
    expect(o.shoeColor).toBe('#26262b');
    const bad = sanitizeOutfit({
      bottomStyle: 'school-uniform',
      bottomColor: '#123456',
      shoeStyle: 'barefoot',
      shoeColor: 'red',
    });
    expect(bad.bottomStyle).toBe(DEFAULT_OUTFIT.bottomStyle);
    expect(bad.bottomColor).toBe(DEFAULT_OUTFIT.bottomColor);
    expect(bad.shoeStyle).toBe(DEFAULT_OUTFIT.shoeStyle);
    expect(bad.shoeColor).toBe(DEFAULT_OUTFIT.shoeColor);
  });

  it('a pre-bottoms save loads with the default bottoms and shoes', () => {
    const o = sanitizeOutfit({ topStyle: 'hoodie', hat: 'cap' });
    expect(o.bottomStyle).toBe('none');
    expect(o.shoeStyle).toBe('flats');
    // the original flat-shoe color, so the old look is unchanged
    expect(o.shoeColor).toBe('#5e2233');
  });

  it('save/load round-trips through storage', () => {
    const storage = new FakeStorage();
    const outfit = { ...DEFAULT_OUTFIT, hat: 'ribbon' as const, glasses: 'round' as const };
    saveOutfit(outfit, storage);
    expect(loadOutfit(storage)).toEqual(outfit);
  });

  it('loadOutfit on empty storage returns the default outfit', () => {
    expect(loadOutfit(new FakeStorage())).toEqual(DEFAULT_OUTFIT);
  });

  it('randomOutfit only ever picks listed values', () => {
    let seed = 42;
    const rng = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };
    for (let i = 0; i < 200; i++) {
      const o = randomOutfit(rng);
      expect(TOP_STYLES).toContain(o.topStyle);
      expect(TOP_COLORS).toContain(o.topColor);
      expect(BOTTOM_STYLES).toContain(o.bottomStyle);
      expect(BOTTOM_COLORS).toContain(o.bottomColor);
      expect(SHOE_STYLES).toContain(o.shoeStyle);
      expect(SHOE_COLORS).toContain(o.shoeColor);
      expect(HATS).toContain(o.hat);
      expect(GLASSES).toContain(o.glasses);
      expect(ACCESSORIES).toContain(o.accessory);
      expect(POSES).toContain(o.pose);
    }
  });
});
