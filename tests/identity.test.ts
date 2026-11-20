import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  DEFAULT_OUTFIT,
  NAME_MAX_CHARS,
  NAME_MAX_UTF8_BYTES,
  sanitizeName,
  sanitizeOutfit,
  saveOutfit,
  type Outfit,
} from '../src/outfit';
import { decodeSeed, encodeSeed } from '../src/seed';
import { embedSeedInPng, extractSeedFromPng } from '../src/cardseed';
import { synthesizeCharacter } from '../src/genetics';
import { DEFAULT_CHARACTER } from '../src/character';
import {
  MAX_ROSTER_ENTRIES,
  addEntry,
  currentEntry,
  loadRoster,
  makeEntry,
  removeEntry,
  renameEntry,
  sanitizeRoster,
  upsertCurrent,
  type Roster,
} from '../src/roster';
import {
  MAX_LINEAGE_EVENTS,
  loadLineage,
  recordLineage,
  sanitizeLineage,
  type LineageEvent,
} from '../src/lineage';

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

/** The v4 core bytes of a state: encode as v5, take the first
 *  34 bytes, rewrite the version byte — the v5 core is the v4
 *  layout byte for byte. */
function v4BytesOf(outfit: Outfit): number[] {
  const bytes = [...Buffer.from(encodeSeed(outfit).slice(4), 'base64url')];
  return [4, ...bytes.slice(1, 34)];
}

function seedFromBytes(prefix: string, bytes: number[]): string {
  return `${prefix}${Buffer.from(bytes).toString('base64url')}`;
}

describe('display name (sanitizeName)', () => {
  it('keeps ordinary names, trims and collapses whitespace', () => {
    expect(sanitizeName('ミライ')).toBe('ミライ');
    expect(sanitizeName('  Mirai   Chan  ')).toBe('Mirai Chan');
    expect(sanitizeName('A B')).toBe('A B');
  });

  it('rejects non-strings and strips control characters', () => {
    expect(sanitizeName(null)).toBe('');
    expect(sanitizeName(42)).toBe('');
    expect(sanitizeName(undefined)).toBe('');
    expect(sanitizeName('A\u0007B\nC\tD')).toBe('ABCD');
    expect(sanitizeName('')).toBe('');
    expect(sanitizeName('   ')).toBe('');
  });

  it('truncates at the character cap', () => {
    const long = 'あ'.repeat(NAME_MAX_CHARS + 6);
    expect([...sanitizeName(long)].length).toBe(NAME_MAX_CHARS);
  });

  it('truncates at the UTF-8 byte budget, on a code-point boundary', () => {
    // 24 emoji fit the character cap but not the byte budget
    // (4 bytes each): 72 / 4 = 18 survive, none split.
    const emojis = '🌸'.repeat(NAME_MAX_CHARS);
    const out = sanitizeName(emojis);
    expect([...out].length).toBe(NAME_MAX_UTF8_BYTES / 4);
    expect(new TextEncoder().encode(out).length).toBeLessThanOrEqual(NAME_MAX_UTF8_BYTES);
  });

  it('sanitizeOutfit carries a valid name and drops an invalid one', () => {
    expect(sanitizeOutfit({ name: 'ミライ' }).name).toBe('ミライ');
    expect(sanitizeOutfit({ name: 42 }).name).toBe('');
    expect(sanitizeOutfit({})).toEqual(DEFAULT_OUTFIT); // pre-identity save: unnamed
  });
});

describe('seed v5 (name block)', () => {
  const named: Outfit = { ...DEFAULT_OUTFIT, name: 'ミライ' };

  it('round-trips a Japanese name exactly', () => {
    const seed = encodeSeed(named);
    expect(seed.startsWith('FR5-')).toBe(true);
    const back = decodeSeed(seed);
    expect(back).not.toBeNull();
    expect(back!.name).toBe('ミライ');
    expect(encodeSeed(back!)).toBe(seed);
  });

  it('round-trips emoji and mixed names', () => {
    for (const name of ['🌸さくら🌸', 'Mirai-chan 2', 'Æthel']) {
      const back = decodeSeed(encodeSeed({ ...DEFAULT_OUTFIT, name }));
      expect(back!.name).toBe(name);
    }
  });

  it('an unnamed person round-trips as unnamed', () => {
    expect(decodeSeed(encodeSeed(DEFAULT_OUTFIT))!.name).toBe('');
  });

  it('a name at both caps round-trips exactly (24 chars = 72 UTF-8 bytes)', () => {
    const name = 'あ'.repeat(NAME_MAX_CHARS);
    expect(new TextEncoder().encode(name).length).toBe(NAME_MAX_UTF8_BYTES);
    expect(decodeSeed(encodeSeed({ ...DEFAULT_OUTFIT, name }))!.name).toBe(name);
  });

  it('an over-cap name is truncated by the encoder, never spilled', () => {
    const back = decodeSeed(encodeSeed({ ...DEFAULT_OUTFIT, name: 'あ'.repeat(30) }));
    expect(back!.name).toBe('あ'.repeat(NAME_MAX_CHARS));
  });

  it('v1–v4 seeds decode with no name', () => {
    const v4 = seedFromBytes('FR4-', v4BytesOf(named));
    const back = decodeSeed(v4);
    expect(back).not.toBeNull();
    expect(back!.name).toBe('');
    // and the rest of the person is untouched by the version gap:
    // the v4 decode is the v5 decode of the same person, minus
    // the name (compared at the encoded level, where round-trips
    // are exact — see character.test.ts).
    expect(back).toEqual({ ...decodeSeed(encodeSeed(named))!, name: '' });
  });

  it('rejects a v5 whose name length byte disagrees with the payload', () => {
    const core = v4BytesOf(DEFAULT_OUTFIT);
    core[0] = 5;
    // declares 5 name bytes, supplies 2
    expect(decodeSeed(seedFromBytes('FR5-', [...core, 5, 0x41, 0x42]))).toBeNull();
    // trailing garbage after a complete name block
    const good = [...Buffer.from(encodeSeed(named).slice(4), 'base64url')];
    expect(decodeSeed(seedFromBytes('FR5-', [...good, 0]))).toBeNull();
    // no name block at all (v4 length carrying the v5 byte)
    expect(decodeSeed(seedFromBytes('FR5-', core))).toBeNull();
  });

  it('rejects a v5 whose name exceeds the byte budget', () => {
    const core = v4BytesOf(DEFAULT_OUTFIT);
    core[0] = 5;
    const tooLong = new Array(NAME_MAX_UTF8_BYTES + 1).fill(0x41);
    expect(decodeSeed(seedFromBytes('FR5-', [...core, tooLong.length, ...tooLong]))).toBeNull();
  });

  it('rejects a v5 whose name block is not valid UTF-8', () => {
    const core = v4BytesOf(DEFAULT_OUTFIT);
    core[0] = 5;
    expect(decodeSeed(seedFromBytes('FR5-', [...core, 2, 0xff, 0xfe]))).toBeNull();
  });

  it('sanitizes (does not reject) a structurally sound but dirty name', () => {
    const core = v4BytesOf(DEFAULT_OUTFIT);
    core[0] = 5;
    const dirty = [...new TextEncoder().encode('A\u0007 B')];
    const back = decodeSeed(seedFromBytes('FR5-', [...core, dirty.length, ...dirty]));
    expect(back).not.toBeNull();
    expect(back!.name).toBe('A B');
  });
});

describe('roster (multiple people, one device)', () => {
  it('migrates the pre-roster single save without losing the person', () => {
    const storage = new FakeStorage();
    const person: Outfit = { ...DEFAULT_OUTFIT, name: 'ミライ', topStyle: 'dress' };
    saveOutfit(person, storage);
    const roster = loadRoster(storage);
    expect(roster.entries).toHaveLength(1);
    const back = decodeSeed(currentEntry(roster).seed)!;
    expect(back.name).toBe('ミライ');
    expect(back.topStyle).toBe('dress');
    expect(encodeSeed(back)).toBe(encodeSeed(person));
    // the migration is persisted: a second load is the same roster
    expect(loadRoster(storage)).toEqual(roster);
  });

  it('a fresh device starts with one default person', () => {
    const roster = loadRoster(new FakeStorage());
    expect(roster.entries).toHaveLength(1);
    const back = decodeSeed(currentEntry(roster).seed)!;
    expect(encodeSeed(back)).toBe(encodeSeed(DEFAULT_OUTFIT));
  });

  it('upsertCurrent follows the current person (autosave)', () => {
    const storage = new FakeStorage();
    const roster = loadRoster(storage);
    const renamed = encodeSeed({ ...DEFAULT_OUTFIT, name: '改名後' });
    const next = upsertCurrent(roster, renamed, 1234);
    expect(next.entries).toHaveLength(1);
    expect(next.currentId).toBe(roster.currentId);
    expect(decodeSeed(currentEntry(next).seed)!.name).toBe('改名後');
    expect(currentEntry(next).updatedAt).toBe(1234);
  });

  it('addEntry keeps the old person and switches to the new one', () => {
    const roster = loadRoster(new FakeStorage());
    const seedB = encodeSeed({ ...DEFAULT_OUTFIT, name: '二人目' });
    const next = addEntry(roster, seedB, 2000);
    expect(next.entries).toHaveLength(2);
    expect(decodeSeed(currentEntry(next).seed)!.name).toBe('二人目');
    expect(next.entries.some((e) => e.id === roster.currentId)).toBe(true);
  });

  it('removeEntry: removing another person keeps current; removing current falls back', () => {
    let roster = loadRoster(new FakeStorage());
    roster = addEntry(roster, encodeSeed({ ...DEFAULT_OUTFIT, name: 'B' }), 2000);
    const [first, second] = roster.entries;
    const keptCurrent = removeEntry(roster, first.id);
    expect(keptCurrent.currentId).toBe(second.id);
    expect(keptCurrent.entries).toHaveLength(1);
    const fellBack = removeEntry(roster, second.id);
    expect(fellBack.currentId).toBe(first.id);
  });

  it('removeEntry: removing the last person leaves a fresh default person', () => {
    const roster = loadRoster(new FakeStorage());
    const next = removeEntry(roster, roster.currentId);
    expect(next.entries).toHaveLength(1);
    const back = decodeSeed(currentEntry(next).seed)!;
    expect(encodeSeed(back)).toBe(encodeSeed(DEFAULT_OUTFIT));
  });

  it('renameEntry renames any entry through its seed', () => {
    let roster = loadRoster(new FakeStorage());
    roster = addEntry(roster, encodeSeed({ ...DEFAULT_OUTFIT, name: 'B' }), 2000);
    const other = roster.entries.find((e) => e.id !== roster.currentId)!;
    const next = renameEntry(roster, other.id, '新しい名前', 3000);
    expect(next).not.toBeNull();
    const renamed = next!.entries.find((e) => e.id === other.id)!;
    expect(decodeSeed(renamed.seed)!.name).toBe('新しい名前');
    expect(renameEntry(roster, 'no-such-id', 'x')).toBeNull();
  });

  it('sanitizeRoster drops undecodable entries and duplicate ids', () => {
    const good = makeEntry(encodeSeed(DEFAULT_OUTFIT), 1, 'a');
    const roster = sanitizeRoster({
      entries: [
        good,
        { id: 'a', seed: encodeSeed({ ...DEFAULT_OUTFIT, name: 'dup' }), updatedAt: 2 },
        { id: 'b', seed: 'FR9-nonsense', updatedAt: 3 },
        { id: 'c', seed: 42, updatedAt: 4 },
        'garbage',
      ],
      currentId: 'b',
    });
    expect(roster).not.toBeNull();
    expect(roster!.entries).toHaveLength(1);
    expect(roster!.currentId).toBe('a'); // 'b' did not survive: fall back
    expect(sanitizeRoster(null)).toBeNull();
    expect(sanitizeRoster({ entries: [] })).toBeNull();
  });

  it('the roster cap holds under sanitize and add', () => {
    const entries = Array.from({ length: MAX_ROSTER_ENTRIES + 5 }, (_, i) =>
      makeEntry(encodeSeed(DEFAULT_OUTFIT), i + 1, `e${i}`),
    );
    const roster = sanitizeRoster({ entries, currentId: 'e0' })!;
    expect(roster.entries).toHaveLength(MAX_ROSTER_ENTRIES);
    const added = addEntry(roster, encodeSeed({ ...DEFAULT_OUTFIT, name: '新入り' }), 9999);
    expect(added.entries).toHaveLength(MAX_ROSTER_ENTRIES);
    expect(decodeSeed(currentEntry(added).seed)!.name).toBe('新入り');
  });
});

describe('lineage (on-device edit history)', () => {
  const seedA = encodeSeed({ ...DEFAULT_OUTFIT, name: 'A子' });
  const seedB = encodeSeed({ ...DEFAULT_OUTFIT, name: 'B子' });

  it('records and loads events, blend parents included', () => {
    const storage = new FakeStorage();
    recordLineage({ at: 1, kind: 'create', seed: seedA, name: 'A子' }, storage);
    const events = recordLineage(
      { at: 2, kind: 'blend', seed: encodeSeed(DEFAULT_OUTFIT), parents: [seedA, seedB] },
      storage,
    );
    expect(events).toHaveLength(2);
    expect(loadLineage(storage)).toEqual(events);
    expect(events[1].parents).toEqual([seedA, seedB]);
  });

  it('sanitizeLineage drops events that cannot be traced to a person', () => {
    const good: LineageEvent = { at: 1, kind: 'create', seed: seedA };
    const out = sanitizeLineage([
      good,
      { at: 2, kind: 'restore', seed: 'FR9-nonsense' },
      { at: 3, kind: 'blend', seed: seedA }, // parents missing
      { at: 4, kind: 'blend', seed: seedA, parents: [seedA, 'FR9-nonsense'] },
      { at: 5, kind: 'teleport', seed: seedA },
      { at: 'now', kind: 'create', seed: seedA },
      { at: 6, kind: 'restore', seed: seedA, parents: [seedA, seedB] }, // parents off-kind: dropped field, event kept
    ]);
    expect(out).toHaveLength(2);
    expect(out[0]).toEqual(good);
    expect(out[1].kind).toBe('restore');
    expect(out[1].parents).toBeUndefined();
  });

  it('caps the history at the newest events', () => {
    const storage = new FakeStorage();
    let events: LineageEvent[] = [];
    for (let i = 0; i < MAX_LINEAGE_EVENTS + 10; i++) {
      events = recordLineage({ at: i, kind: 'create', seed: seedA }, storage);
    }
    expect(events).toHaveLength(MAX_LINEAGE_EVENTS);
    expect(events[events.length - 1].at).toBe(MAX_LINEAGE_EVENTS + 9);
    expect(loadLineage(storage)).toHaveLength(MAX_LINEAGE_EVENTS);
  });
});

describe('lineage never enters an artifact', () => {
  it('the artifact-path sources do not reference the lineage at all', () => {
    const root = join(__dirname, '..');
    for (const file of ['src/seed.ts', 'src/share.ts', 'src/cardseed.ts', 'src/export3d.ts']) {
      const text = readFileSync(join(root, file), 'utf8');
      expect(text.toLowerCase(), `${file} must not know the lineage exists`).not.toContain('lineage');
    }
    // and the lineage module itself imports only outfit/seed —
    // it has no path into the artifact builders.
    const lineage = readFileSync(join(root, 'src/lineage.ts'), 'utf8');
    expect(lineage).not.toMatch(/from '\.\/(share|export3d|cardseed)'/);
  });

  it('a blended person’s seed and card carry the person only — no parents', () => {
    const a = { ...DEFAULT_CHARACTER, skinTone: 0.15, height: 1.9 };
    const b = { ...DEFAULT_CHARACTER, skinTone: 0.9, height: 1.52 };
    const child: Outfit = {
      ...DEFAULT_OUTFIT,
      name: '',
      character: synthesizeCharacter(a, b, 42),
    };
    const seed = encodeSeed(child);
    const back = decodeSeed(seed)!;
    expect(back.name).toBe('');
    expect(encodeSeed(back)).toBe(seed); // exact at the encoded level
    expect(JSON.stringify(back)).not.toContain('parents');
    // the card path: embed -> extract -> decode is the same person
    const png = new Uint8Array(
      Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        'base64',
      ),
    );
    const embedded = embedSeedInPng(png, seed)!;
    expect(extractSeedFromPng(embedded)).toBe(seed);
    expect(decodeSeed(extractSeedFromPng(embedded)!)).toEqual(back);
  });
});
