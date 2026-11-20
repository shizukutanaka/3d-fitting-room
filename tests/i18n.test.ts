import { describe, expect, it } from 'vitest';
import {
  LANGS,
  detectLang,
  dictionaryKeys,
  setLang,
  t,
  type I18nKey,
  type Lang,
} from '../src/i18n';

describe('i18n dictionaries', () => {
  it('supports exactly the eight M8 languages', () => {
    expect([...LANGS]).toEqual(['ja', 'en', 'es', 'zh', 'fr', 'de', 'pt', 'ko']);
  });

  it('every language has exactly the same keys as Japanese', () => {
    const reference = dictionaryKeys('ja');
    for (const lang of LANGS) {
      expect(dictionaryKeys(lang), lang).toEqual(reference);
    }
  });

  it('no translation is empty', () => {
    for (const lang of LANGS) {
      setLang(lang);
      for (const key of dictionaryKeys(lang)) {
        expect(t(key as I18nKey).length, `${lang}:${key}`).toBeGreaterThan(0);
      }
    }
  });

  it('the adult/fictional principle note names both halves in every language (M9)', () => {
    // One marker for "fictional" and one for "adult" per language:
    // the note must actually carry the principle, not just exist.
    const markers: Record<Lang, [string, string]> = {
      ja: ['架空', '成人'],
      en: ['fictional', 'adult'],
      es: ['ficticios', 'adultos'],
      zh: ['虚构', '成年'],
      fr: ['fictifs', 'adultes'],
      de: ['fiktive', 'Erwachsene'],
      pt: ['fictícios', 'adultos'],
      ko: ['가상', '성인'],
    };
    for (const lang of LANGS) {
      setLang(lang);
      const note = t('principle.note');
      const [fictional, adult] = markers[lang];
      expect(note, `${lang} fictional`).toContain(fictional);
      expect(note, `${lang} adult`).toContain(adult);
    }
  });

  it('detectLang accepts every saved language and maps browser locales', () => {
    for (const lang of LANGS) {
      expect(detectLang(lang)).toBe(lang);
    }
    expect(detectLang('xx')).toBe(detectLang(null));
    const original = globalThis.navigator;
    const stub = (language: string) =>
      Object.defineProperty(globalThis, 'navigator', {
        value: { language },
        configurable: true,
      });
    try {
      stub('ko-KR');
      expect(detectLang(null)).toBe('ko');
      stub('es-ES');
      expect(detectLang(null)).toBe('es');
      stub('zh-CN');
      expect(detectLang(null)).toBe('zh');
      stub('pt-BR');
      expect(detectLang(null)).toBe('pt');
      stub('de-DE');
      expect(detectLang(null)).toBe('de');
      stub('fr-FR');
      expect(detectLang(null)).toBe('fr');
      stub('it-IT');
      expect(detectLang(null)).toBe('en');
    } finally {
      Object.defineProperty(globalThis, 'navigator', {
        value: original,
        configurable: true,
      });
    }
  });
});
