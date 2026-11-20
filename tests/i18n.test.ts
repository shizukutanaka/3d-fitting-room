import { describe, expect, it } from 'vitest';
import { dictionaryKeys, setLang, t, type I18nKey } from '../src/i18n';

describe('i18n dictionaries', () => {
  it('ja and en have exactly the same keys', () => {
    expect(dictionaryKeys('ja')).toEqual(dictionaryKeys('en'));
  });

  it('no translation is empty', () => {
    for (const lang of ['ja', 'en'] as const) {
      setLang(lang);
      for (const key of dictionaryKeys(lang)) {
        expect(t(key as I18nKey).length).toBeGreaterThan(0);
      }
    }
  });
});
