# VRM／GLB 外部ランタイム実在検証（WORLD-CLASS M7）

実施日: 2026-11-21（JST）。対象ファイル: `evidence/exported-character.vrm` /
`evidence/exported-character.glb`（現行 HEAD の書き出しコードで生成された
証拠ファイル。書き出し実装 `src/export3d.ts` の最終変更は証拠の再生成
コミットより前であり、検証対象＝現行コードの出力であることを git 履歴で
確認した）。

M7 の要求は「書き出した VRM が、実在の外部ランタイム3つ以上で実際に
開けて使えること」。従来の検証は自前の three.js GLTFLoader による往復と
公式スキーマ照合のみで、外部ランタイムでの実績は **0件** だった
（DESIGN.md §17.5）。本検証で、互いに独立した実装3系統で実際に開き、
人型リグが使えることまでを確認した。

## 検証したランタイム

| # | ランタイム | 版数 | 実装系統 |
|---|---|---|---|
| 1 | @pixiv/three-vrm（VRMLoaderPlugin） | 3.5.5（three 0.170） | pixiv 製、Web 向け VRM の事実上の標準 |
| 2 | Blender + VRM Addon for Blender（saturday06） | Blender 5.2.0 LTS / アドオン 4.10.5 | Python 製の独立した VRM インポータ |
| 3 | Godot Engine + godot-vrm（V-Sekai） | Godot 4.7.2-stable / アドオン 2.0.1 | GDScript 製の独立した VRM インポータ |

いずれもローカルで完結する検証のみ（アカウント・アップロードを要する
サービスへの投稿は公開行為に当たるため対象外）。

検証スクリプトは `tools/vrm-verify/` にある（製品ビルドには含まれない）:

- `verify-three-vrm.mjs` — Node で three-vrm 読み込み、meta・ヒューマノイド・
  ポーズ適用・外形寸法を確認。依存は同フォルダの `package.json` で分離。
- `verify-blender.py` — Blender ヘッドレスでアドオンを有効化してインポートし、
  メッシュ・アーマチュア・meta・ヒューマノイド対応表を抽出。
  実行前にアドオン拡張をインストールしておくこと:
  `blender --command extension install-file -r user_default -e <アドオンzip>`
- `verify_godot.gd` — Godot プロジェクト（addons/vrm を配置し対象ファイルを
  `character.vrm` として置く）で `--headless --editor --import` した後に
  `--headless --script verify_godot.gd` で読み込み結果を検査。

## 結果

### 1. three-vrm 3.5.5

- **ライセンス許可リストを指定した読み込み: 成功（PASS）**。
  meta（名前・版数・作者・avatarPermission=everyone・commercialUsage=
  corporation）を全て読み取り。ヒューマノイド必須ボーン15＋任意の
  chest／neck が揃い、左上腕をヒューマノイド API 経由で回転させる
  ポーズ適用が実際に効き、`vrm.update()` も例外なし。メッシュ73点
  全てスキニング済み、外形の高さ 1.928m（書き出し時の人物と一致）。
- **既定オプションでの読み込み: 例外で拒否される**（下記「licenseUrl の
  扱い」参照）。これは three-vrm の設計どおりの挙動であり、ファイルの
  仕様違反ではない。
- GLB 版も three.js GLTFLoader で正常に解析できた（メッシュ73点）。

### 2. Blender 5.2.0 + VRM Addon 4.10.5

- **VRM インポート: 成功**（オペレータ結果 FINISHED、警告・エラーなし）。
  specVersion 1.0 を認識。アーマチュアはボーン17本＋ルート1本、
  **ヒューマノイド対応表は17件全て割り当て済み**。meta は名前・版数・
  作者・著作権情報・avatarPermission・commercialUsage・creditNotation・
  allowRedistribution・modification まで読み取れた。
- メッシュオブジェクトは74件と数えたが、内訳はキャラクター本体73点＋
  シーン管理上の1件（名前一覧で本体73点全ての存在を確認済み）。
  頂点総数 38,598。
- GLB 版も Blender 標準 glTF インポータで成功（アーマチュア17ボーン）。

### 3. Godot 4.7.2 + godot-vrm 2.0.1

- **VRM インポート: 成功（PASS）**。メッシュインスタンス73点。
  スケルトンは18ボーンで、**ボーン名が Godot のヒューマノイド
  プロファイル名（Hips／Spine／Chest／…＋Root）に変換されていた** —
  つまり godot-vrm がヒューマノイド対応を認識し、リターゲット可能な
  形に取り込んだ証拠である。meta は title・version・authors・
  allowed_user=Everyone・commercial=AllowCorporation を読み取り。
- GLB 版も成功（73メッシュ、17ボーン、元のボーン名のまま）。

## licenseUrl の扱い（3ランタイムで挙動が異なる）

本作の VRM は `meta.licenseUrl` に CC0 1.0 の証書 URL
（`https://creativecommons.org/publicdomain/zero/1.0/`）を書く。これは
「課した条件が CC0 の条文と一致するので正直に書ける」という意図的な
製品判断であり（`src/export3d.ts` のコメントに明記）、VRM 1.0 の
スキーマ上も正当（licenseUrl は自由な URL 文字列）。ただし実測では、
道具ごとに扱いが割れた:

| 道具 | licenseUrl の扱い |
|---|---|
| three-vrm | 既定では標準ライセンス URL のみ許可し、それ以外は**例外で読み込み全体が失敗**する。利用側アプリが `VRMMetaLoaderPlugin.acceptLicenseUrls` に許可 URL を渡す設計（ライセンスへの同意をアプリに強制する仕様）。許可すれば全機能が正常に読める |
| Blender アドオン | `meta.licenseUrl` を**読まない**（読むのは `otherLicenseUrl` のみ。再書き出し時は標準 URL が固定で書かれる）。CC0 の条件文は copyrightInformation に残るため利用条件自体は失われない |
| godot-vrm | licenseUrl は表面化しない（meta の許可項目は全て読める） |

結論: ファイルが開けない道具は無かったが、「既定設定の three-vrm アプリ
ではカスタムな licenseUrl を持つ VRM は常にこの挙動になる」という
相互運用上の事実は残る。licenseUrl の方針変更は法務・製品判断に属する
ため、本検証では書き出し側を変更していない。

## その他の実測メモ

- 表情（expressions）と揺れ物（spring bone）は書き出しに含まれない
  （設計どおり。DESIGN §17 の「指・表情なし」の範囲）。
  three-vrm では expressions は空、Blender／Godot でも不足として
  エラーにはならなかった。
- `firstPerson`／`lookAt` のブロックはファイルに無い（任意項目）。
  three-vrm は既定の firstPerson オブジェクトを生成して処理を続けた。
- テクスチャは設計どおり同梱されない（色のみ）。どのランタイムでも
  欠落エラーにはならなかった。

## M7 の判定

**満たせた。** 独立実装3系統（three-vrm／Blender アドオン／godot-vrm）
の全てで VRM が開け、ヒューマノイドリグが実際に使える状態で取り込まれ、
meta の許可情報が読み取れることを実測した。GLB 版も同3系統の
ローダで開けた。書き出し側の欠陥は見つからなかったため、製品コードの
修正は行っていない（製品テストは全200件合格を再確認）。

## 未検証のまま残る範囲

- **VRoid Hub へのアップロード確認**（アカウントと投稿＝公開行為のため
  対象外。公開判断とセットで mi が行う範囲）。
- **UniVRM（Unity）での読み込み**。この VM に Unity が無く未実施。
  three-vrm／Blender／Godot の3系統は UniVRM とは独立実装であり、
  M7 の「3つ以上」は満たすが、UniVRM 系ツール（VRChat の SDK 経由
  など）での実績としては数えていない。
- **実在ビューアでの見た目の目視**（質感は色のみという設計上の到達点
  の評価であり、読み込み可否とは別問題として未検証）。
- VRChat 等への実アップロード（アカウント必須のため対象外）。
