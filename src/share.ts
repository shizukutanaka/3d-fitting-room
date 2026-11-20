// Share-card export — the product's discovery engine. One tap renders
// the current canvas into a square PNG card with the app name on it,
// ready to post anywhere. Composition happens on a 2D canvas entirely
// on-device; nothing is uploaded anywhere.
//
// The card is also the character's container file: the seed is
// embedded in a PNG tEXt chunk (cardseed.ts) so the image itself
// restores the person, and printed on the card face as the fallback
// for platforms that re-encode uploads and strip chunks. The card
// states plainly that the person is fictional (LEGAL-ETHICS J-07).

import { getLang } from './i18n';
import { embedSeedInPng } from './cardseed';

const CARD_SIZE = 1080;

export interface ShareCardOptions {
  appName: string;
  workingTitleNote: string;
  tagline: string;
  /** The seed string for this person + outfit: embedded into the
   *  PNG and printed on the card face. */
  seed: string;
}

/** Compose the share card and return it as a PNG blob with the
 *  seed embedded. */
export async function composeShareCard(
  glCanvas: HTMLCanvasElement,
  opts: ShareCardOptions,
): Promise<Blob> {
  const card = document.createElement('canvas');
  card.width = CARD_SIZE;
  card.height = CARD_SIZE;
  const ctx = card.getContext('2d');
  if (!ctx) throw new Error('2d context unavailable');

  // background: soft vertical gradient
  const grad = ctx.createLinearGradient(0, 0, 0, CARD_SIZE);
  grad.addColorStop(0, '#faf6f0');
  grad.addColorStop(1, '#e7dbc7');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CARD_SIZE, CARD_SIZE);

  // photo area: center-crop the WebGL canvas into a rounded square
  // (slightly smaller than the original layout: the footer now also
  // carries the printed seed and the fictional-person note)
  const photo = 800;
  const px = (CARD_SIZE - photo) / 2;
  const py = 44;
  const srcSide = Math.min(glCanvas.width, glCanvas.height);
  const sx = (glCanvas.width - srcSide) / 2;
  const sy = (glCanvas.height - srcSide) / 2;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(px, py, photo, photo, 36);
  ctx.clip();
  ctx.drawImage(glCanvas, sx, sy, srcSide, srcSide, px, py, photo, photo);
  ctx.restore();
  ctx.strokeStyle = 'rgba(255,255,255,0.9)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.roundRect(px, py, photo, photo, 36);
  ctx.stroke();

  // title block
  ctx.fillStyle = '#33302a';
  ctx.textAlign = 'center';
  ctx.font = '700 58px "Hiragino Sans", "Noto Sans JP", sans-serif';
  ctx.fillText(opts.appName, CARD_SIZE / 2, py + photo + 72);
  ctx.font = '400 28px "Hiragino Sans", sans-serif';
  ctx.fillStyle = '#8a7a63';
  const sub =
    getLang() === 'ja'
      ? `${opts.tagline}（${opts.workingTitleNote}）`
      : `${opts.tagline} (${opts.workingTitleNote})`;
  ctx.fillText(sub, CARD_SIZE / 2, py + photo + 114);

  // the seed, printed bare so it can be copied off the image by
  // eye and pasted into the app when the embedded chunk is gone
  ctx.font = '600 24px ui-monospace, "SF Mono", Menlo, monospace';
  ctx.fillStyle = '#6b5d49';
  ctx.fillText(opts.seed, CARD_SIZE / 2, py + photo + 152);

  // J-07: the person on the card is fictional — say so on the card
  ctx.font = '400 22px "Hiragino Sans", sans-serif';
  ctx.fillStyle = '#8a7a63';
  ctx.fillText(
    getLang() === 'ja' ? '※この人物は架空のキャラクターです' : '* This character is fictional.',
    CARD_SIZE / 2,
    py + photo + 184,
  );

  const raw = await new Promise<Blob>((resolve, reject) => {
    card.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('PNG encode failed'))),
      'image/png',
    );
  });
  const bytes = new Uint8Array(await raw.arrayBuffer());
  const embedded = embedSeedInPng(bytes, opts.seed);
  return embedded ? new Blob([embedded.buffer as ArrayBuffer], { type: 'image/png' }) : raw;
}

/** Trigger a download of the blob. Returns the object URL used. */
export function downloadBlob(blob: Blob, filename: string): string {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
  return url;
}
