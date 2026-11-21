# 3D試着室（仮称）

ブラウザで開いて、VR でアバターに服を着せ替える試着アプリです。インストール不要、アカウント不要、広告なし。データは端末の外に出ません。

**試す**: https://shizukutanaka.github.io/3d-fitting-room/
Quest のブラウザで開くと、そのまま VR に入れます。フラット画面でも全機能が使えます。

A VR-first 3D fitting room that runs entirely in the browser (WebXR). No installs, no accounts, no ads, and no data ever leaves your device.

## できること

- VR（WebXR）の中で、等身大のアバターへ光線でそのまま着せ替え
- トップス／アウター／ボトムス／靴／帽子／メガネ／アクセサリーと、名前付きコーデの保存
- 人物の調整（肌色・身長・髪・顔・体型は連続パラメータ）と、遺伝合成・変異
- 人物とコーデをシード付き写真カードで持ち帰り、そのまま完全復元
- GLB／VRM 1.0 書き出し（three-vrm／Blender／Godot で開けることを実測済み）
- 自分の LLM／画像生成エンドポイントへの接続（任意。接続先とキーは端末内のみ）
- 8言語対応（日本語／English／Español／中文／Français／Deutsch／Português／한국어）

## 原則

- 登場する人物はすべて、パラメータから作られる**架空の成人キャラクター**です。生成は成人の範囲に限るよう設計されており、実在の人物を再現するためのものではありません
- お金は一切絡みません（課金・広告・寄付導線なし）
- 個人データは集めません。人物・コーデ・設定はすべて端末内にだけ保存されます

## 書き出しのライセンス

このアプリから書き出したキャラクター（VRM／GLB と同梱のパラメータ）は **CC0** で提供します。誰でも自由に使えます。アプリ本体のコードは MIT ライセンスです（下記）。

## 開発

```bash
npm install
npm run dev     # 開発サーバ
npm test        # テスト
npm run build   # 本番ビルド（dist/）
```

設計の正本は `docs/DESIGN.md`、世界水準の物差しは `docs/WORLD-CLASS.md`、法律・倫理の判定記録は `docs/LEGAL-ETHICS.md` にあります。

## License

MIT — see [LICENSE](LICENSE). Exported characters (VRM/GLB with their parameter JSON) are CC0.
