// Japanese + English UI strings. Every user-facing string goes through
// t() so both languages are always complete — the parity test in
// tests/i18n.test.ts fails the build if a key exists in only one.

export type Lang = 'ja' | 'en';

const ja = {
  'app.title': '3D試着室',
  'app.workingTitle': '仮称',
  'app.tagline': '着せ替えて、撮って、見せびらかそう。',
  'cat.character': '人物',
  'cat.tops': 'トップス',
  'cat.hat': '帽子',
  'cat.glasses': 'メガネ',
  'cat.accessory': 'アクセサリー',
  'cat.pose': 'ポーズ',
  'cat.llm': 'AI接続',
  'item.none': 'なし',
  'top.tee': 'Tシャツ',
  'top.hoodie': 'パーカー',
  'top.dress': 'ワンピース',
  'hat.cap': 'キャップ',
  'hat.beanie': 'ニット帽',
  'hat.catears': 'ねこ耳',
  'hat.ribbon': 'リボン',
  'glasses.round': 'まるメガネ',
  'glasses.square': 'しかくメガネ',
  'glasses.sunglasses': 'サングラス',
  'accessory.necklace': 'ネックレス',
  'accessory.scarf': 'マフラー',
  'accessory.bag': 'バッグ',
  'pose.stand': 'ふつう',
  'pose.wave': 'てをふる',
  'pose.cheer': 'バンザイ',
  'pose.peace': 'ピース',
  'pose.relax': 'リラックス',
  'ui.skinTone': '肌の色',
  'ui.height': '身長',
  'ui.hairStyle': '髪型',
  'ui.hairColor': '髪の色',
  'ui.eyeColor': '瞳の色',
  'hair.bob': 'ボブ',
  'hair.long': 'ロング',
  'hair.short': 'ショート',
  'hair.ponytail': 'ポニーテール',
  'hair.bun': 'お団子',
  'ui.seed': 'シード',
  'ui.copy': 'コピー',
  'ui.seedCopied': 'シードをコピーしました',
  'ui.seedApply': '適用',
  'ui.seedInvalid': 'シードが読み取れませんでした',
  'ui.color': '色',
  'ui.savePhoto': '写真を保存',
  'ui.random': 'ランダム',
  'ui.spin': '自動回転',
  'ui.saved': '写真を保存しました',
  'ui.resetView': '視点を戻す',
  'llm.settingsTitle': '接続設定（自分のLLM）',
  'llm.endpoint': 'エンドポイントURL',
  'llm.apiKey': 'APIキー（任意）',
  'llm.model': 'モデル名',
  'llm.save': '保存',
  'llm.saved': '設定を保存しました',
  'llm.test': '接続テスト',
  'llm.testing': '接続中…',
  'llm.testOk': '接続できました',
  'llm.testFail': '接続できませんでした',
  'llm.note': '設定はこの端末にだけ保存されます。送信されるのは指示文と現在の人物・コーデの状態だけで、送信先は設定したエンドポイントのみです。',
  'llm.chatTitle': 'AIに頼む',
  'llm.chatPlaceholder': '例: ドレスに着替えて、髪を金色にして',
  'llm.send': '送信',
  'llm.thinking': '考え中…',
  'llm.notConfigured': 'まず接続設定を保存してください',
  'llm.modelMissing': 'モデル名を入力してください',
  'llm.invalidEndpoint': 'エンドポイントURLを確認してください',
  'llm.applied': '実行',
  'llm.rejected': '却下',
  'llm.error': 'エラー',
  'llm.you': 'あなた',
  'llm.ai': 'AI',
  'footer.note': '無料・広告なし・アカウントなし。データはこの端末の中だけ。',
} as const;

export type I18nKey = keyof typeof ja;

const en: Record<I18nKey, string> = {
  'app.title': '3D Fitting Room',
  'app.workingTitle': 'working title',
  'app.tagline': 'Dress up, snap it, show it off.',
  'cat.character': 'Character',
  'cat.tops': 'Tops',
  'cat.hat': 'Hats',
  'cat.glasses': 'Glasses',
  'cat.accessory': 'Accessories',
  'cat.pose': 'Pose',
  'cat.llm': 'AI Connect',
  'item.none': 'None',
  'top.tee': 'T-shirt',
  'top.hoodie': 'Hoodie',
  'top.dress': 'Dress',
  'hat.cap': 'Cap',
  'hat.beanie': 'Beanie',
  'hat.catears': 'Cat ears',
  'hat.ribbon': 'Ribbon',
  'glasses.round': 'Round glasses',
  'glasses.square': 'Square glasses',
  'glasses.sunglasses': 'Sunglasses',
  'accessory.necklace': 'Necklace',
  'accessory.scarf': 'Scarf',
  'accessory.bag': 'Bag',
  'pose.stand': 'Stand',
  'pose.wave': 'Wave',
  'pose.cheer': 'Cheer',
  'pose.peace': 'Peace',
  'pose.relax': 'Relax',
  'ui.skinTone': 'Skin tone',
  'ui.height': 'Height',
  'ui.hairStyle': 'Hairstyle',
  'ui.hairColor': 'Hair color',
  'ui.eyeColor': 'Eye color',
  'hair.bob': 'Bob',
  'hair.long': 'Long',
  'hair.short': 'Short',
  'hair.ponytail': 'Ponytail',
  'hair.bun': 'Bun',
  'ui.seed': 'Seed',
  'ui.copy': 'Copy',
  'ui.seedCopied': 'Seed copied',
  'ui.seedApply': 'Apply',
  'ui.seedInvalid': 'That seed could not be read',
  'ui.color': 'Color',
  'ui.savePhoto': 'Save photo',
  'ui.random': 'Random',
  'ui.spin': 'Auto-spin',
  'ui.saved': 'Photo saved',
  'ui.resetView': 'Reset view',
  'llm.settingsTitle': 'Connection (your own LLM)',
  'llm.endpoint': 'Endpoint URL',
  'llm.apiKey': 'API key (optional)',
  'llm.model': 'Model name',
  'llm.save': 'Save',
  'llm.saved': 'Settings saved',
  'llm.test': 'Test connection',
  'llm.testing': 'Testing…',
  'llm.testOk': 'Connected',
  'llm.testFail': 'Could not connect',
  'llm.note': 'Settings are stored only on this device. The only things ever sent are your instruction and the current character/outfit state, and only to the endpoint you set.',
  'llm.chatTitle': 'Ask the AI',
  'llm.chatPlaceholder': 'e.g. Put on a dress and make my hair blonde',
  'llm.send': 'Send',
  'llm.thinking': 'Thinking…',
  'llm.notConfigured': 'Save the connection settings first',
  'llm.modelMissing': 'Enter a model name',
  'llm.invalidEndpoint': 'Check the endpoint URL',
  'llm.applied': 'Applied',
  'llm.rejected': 'Rejected',
  'llm.error': 'Error',
  'llm.you': 'You',
  'llm.ai': 'AI',
  'footer.note': 'Free, no ads, no accounts. Your data never leaves this device.',
};

const dicts: Record<Lang, Record<I18nKey, string>> = { ja, en };

let current: Lang = 'ja';

export function setLang(lang: Lang): void {
  current = lang;
}

export function getLang(): Lang {
  return current;
}

export function t(key: I18nKey): string {
  return dicts[current][key];
}

/** Sorted key list for a language — used by the parity test. */
export function dictionaryKeys(lang: Lang): string[] {
  return Object.keys(dicts[lang]).sort();
}

export function detectLang(saved: string | null): Lang {
  if (saved === 'ja' || saved === 'en') return saved;
  return navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en';
}
