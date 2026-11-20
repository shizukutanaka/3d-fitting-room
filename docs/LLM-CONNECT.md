# LLM 接続（自分の LLM／エージェントで操作する）

- 状態: 2026-11-20、mi 指示「自分で LLM を持ってる場合、接続
  できて操作できる仕組みを追加。エージェントなど」を受けて実装。
  実施記録とセキュリティレビューは `docs/DESIGN.md` §13。
- 前提の方針: 重い処理・外部サービスは利用者自身のアカウント・
  契約・エンドポイントで連携する（費用は利用者負担、アプリ側は
  課金・徴収しない）。作成者は個人データを持たない。

## 1. 概要

「AI接続」タブから、利用者自身の **OpenAI 互換 API** エンド
ポイントを登録すると、自然言語で試着室を操作できる。チャット欄
に指示を書くと、アプリが「現在の人物・コーデの状態」と「実行
可能な操作の一覧」を文脈としてエンドポイントへ送り、モデルが
構造化コマンド（JSON）で応答し、アプリが検証して適用する。

同じコマンドプロトコルは window ブリッジからも実行でき、外部
エージェント（スクリプト、自前のエージェントフレームワーク等）
が接続して操作できる。

**製品に既定のエンドポイントはない。** 利用者が設定を保存する
まで、アプリは一切のネットワーク接続をしない。接続先は常に
利用者が入力したエンドポイントだけである。

## 2. 接続設定

「AI接続」タブの接続設定に3項目を入力して保存する:

| 項目 | 内容 |
|---|---|
| エンドポイントURL | OpenAI 互換 API のベース URL（例: ローカルサーバの `…/v1`）。末尾が `/chat/completions` の完全な URL でもよい（どちらでも正規化される） |
| APIキー（任意） | ローカルサーバでは不要なことが多い。入力した場合は `Authorization: Bearer …` として**設定したエンドポイントにだけ**送られる |
| モデル名 | エンドポイントで使えるモデル名 |

「接続テスト」はエンドポイントのモデル一覧取得（`GET …/models`）
で疎通とキー確認を行い、使えるモデル名を表示する。

設定の保存先は**この端末の localStorage のみ**
（キー `fitting-room.llm.v1`）。開発者側のサーバは存在せず、
設定がどこかへ送信されることもない。

### 2.1 設定例

**Ollama**（ローカル）:
- 起動: `OLLAMA_ORIGINS=* ollama serve`（ブラウザから接続する
  ため CORS の許可が必要。`OLLAMA_ORIGINS` にアプリの配信元
  オリジンを指定するのが本来の形で、` * ` は自分の端末内だけで
  使う場合の簡易指定）
- エンドポイント: `http://localhost:11434/v1`
- モデル: `llama3.1` など、pull 済みのもの

**LM Studio**（ローカル）:
- ローカルサーバを起動し、CORS を有効化する
- エンドポイント: `http://localhost:1234/v1`
- モデル: 読み込んだモデル名

**llama.cpp server / vLLM 等**: OpenAI 互換エンドポイント
（`…/v1`）をそのまま指定する。リモートの自分のサーバでもよい
が、その場合も送信内容は §3 のとおりであり、通信の保護
（HTTPS 化等）は利用者側の責任になる。

注意: ブラウザの制約上、HTTPS で配信されたアプリから
`http://localhost` への接続はブラウザが制限する場合がある
（mixed content / Private Network Access）。その場合はアプリを
ローカルで配信するか、エンドポイント側を HTTPS にする。

## 3. データの流れ（何がどこへ送られるか）

チャット送信1回で、設定したエンドポイントへ送られるのは
次の**2つだけ**である:

1. 利用者がチャット欄に書いた指示文
2. 現在の人物・コーデの状態（パラメータの JSON: 肌色・身長・
   髪色などの数値と、着ているアイテムの ID）と、実行可能な
   操作の一覧（コマンドプロトコル）

送られないもの: 画像、シード以外の個人情報、利用履歴、
テレメトリ類は一切ない。会話履歴も送らない（毎回、現在の
状態を文脈として渡す無状態方式なので、蓄積される会話データ
自体が存在しない）。

APIキーは、設定したエンドポイントへのリクエストの
Authorization ヘッダとしてのみ使われる。それ以外の場所へ
送られることは構造上ない（ネットワーク呼び出しは
`src/llm.ts` の1モジュールに限定され、不変条件テストが固定
している）。

モデルからの応答は**信用しない**。応答 JSON のコマンドは全て
ホワイトリスト検証（`src/commands.ts`）を通り、パラメータは
仕様範囲へのクランプ／不正値の拒否を経て、さらに通常の保存
データと同じ sanitize 経路で適用される。法律・倫理層
（`docs/LEGAL-ETHICS.md`）の安全制限はパラメータ仕様と
sanitize の側にあるため、LLM 経由でも回避できない。未知の
コマンドは実行されず、却下理由がチャット欄に表示される。

## 4. コマンドプロトコル仕様

### 4.1 応答エンベロープ（モデル → アプリ）

モデルは次の形の JSON オブジェクト**だけ**を返すよう指示
される（コードフェンスや前後の文章はアプリ側で剥がして読む
が、コマンド配列を持たない応答は全体を却下する）:

```json
{
  "reply": "利用者への短い返答",
  "commands": [ { "type": "…" }, … ]
}
```

### 4.2 コマンド一覧

正本は `src/character.ts` の `CHARACTER_PARAM_SPECS` と
`src/outfit.ts` のカタログであり、下表はそこから自動生成
される説明（`describeCommandProtocol()`）の写しである。
パラメータが増えれば、プロトコル説明と検証は自動で追従する。

```
- {"type":"set_character","param":"skinTone","value":<number>} — range 0..1
- {"type":"set_character","param":"hairColor","value":<one of: #201612 | #3a2417 | #503729 | #7a4a26 | #8c3b22 | #a97c50 | #d9b380 | #b9b4ad>}
- {"type":"set_character","param":"eyeColor","value":<one of: #2e2019 | #5a3a1e | #7a5a26 | #46684a | #3d5a80 | #707880>}
- {"type":"set_character","param":"hairStyle","value":<one of: bob | long | short | ponytail | bun>}
- {"type":"set_character","param":"height","value":<number>} — range 1.45..1.95
- {"type":"set_top_style","value":<one of: tee | hoodie | dress>}
- {"type":"set_top_color","value":<one of: #ffffff | #ff8fab | #7cc7ff | #8fe3c0 | #c9a7ff | #ffd166 | #3a4152>}
- {"type":"set_hat","value":<one of: none | cap | beanie | catears | ribbon>}
- {"type":"set_glasses","value":<one of: none | round | square | sunglasses>}
- {"type":"set_accessory","value":<one of: none | necklace | scarf | bag>}
- {"type":"set_pose","value":<one of: stand | wave | cheer | peace | relax>}
- {"type":"randomize_outfit"} — random clothes, same person
- {"type":"randomize_character"} — a new random person
- {"type":"share_card"} — save a photo of the current look
- {"type":"get_state"} — report the current state back
```

### 4.3 検証規則

- `type` がホワイトリストにないコマンドは却下。
- 範囲パラメータ（skinTone, height 等）は数値（数値文字列も
  可）を受け付け、**仕様範囲にクランプ**して適用する。
- 選択式パラメータ（パレット・列挙）は選択肢にない値を却下。
- 未知のパラメータ名は却下。
- 適用結果は全て `sanitizeOutfit` を通った後の状態であり、
  コマンド経由で検証済み状態空間の外に出ることはない。

## 5. エージェントからの使い方

アプリは検証ブリッジ `window.__fittingRoom` を公開している
（従来の検証用メソッドに加え、今回2つ追加）:

```js
// プロトコル説明（LLM のシステムプロンプトと同じ生成物）
window.__fittingRoom.commandSpec();

// コマンド実行。LLM 出力と全く同じ検証を通る。
const result = window.__fittingRoom.runCommands([
  { type: 'set_top_style', value: 'dress' },
  { type: 'set_character', param: 'height', value: 9 }, // 1.95 にクランプ
  { type: 'teleport' },                                  // 却下される
]);
// result = { applied: [...], rejected: [{ reason }], wantShareCard, outfit }
```

- `runCommands` はコマンド配列、または `{"commands": [...]}` の
  形を受け付ける。
- `share_card` コマンドはブリッジ経由ではダウンロードを開始
  せず、`wantShareCard: true` を返す。画像が欲しい場合は
  `await window.__fittingRoom.cardDataURL()` を使う。
- 現在状態は `getOutfit()`、シードは `getSeed()` で取得できる。
- エージェントが LLM を介す場合は §2〜§4 の経路をそのまま
  使えばよい（エージェント側の LLM がエンドポイントになる）。

## 6. 制約と正直な限界

- モデルの応答品質はモデル次第である。小さいローカルモデルは
  JSON 形式を崩すことがあり、その場合は「期待した JSON では
  なかった」として何も適用されない（壊れた応答の部分適用は
  しない設計）。
- CORS はエンドポイント側の設定が必須。接続テストが失敗する
  場合、まずエンドポイント側の CORS と起動状態を確認すること。
- 接続設定をした端末・ブラウザでのみ有効。設定は端末外に
  出ない代わりに、端末を変えれば再設定が必要。
