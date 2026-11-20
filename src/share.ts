// Share-card export — the product's discovery engine. One tap renders
// the current canvas into a square PNG card with the app name on it,
// ready to post anywhere. Composition happens on a 2D canvas entirely
// on-device; nothing is uploaded anywhere.

import { getLang } from './i18n';

const CARD_SIZE = 1080;

export interface ShareCardOptions {
  appName: string;
  workingTitleNote: string;
  tagline: string;
}

/** Compose the share card and return it as a PNG blob. */
export function composeShareCard(
  glCanvas: HTMLCanvasElement,
  opts: ShareCardOptions,
): Promise<Blob> {
  const card = document.createElement('canvas');
  card.width = CARD_SIZE;
  card.height = CARD_SIZE;
  const ctx = card.getContext('2d');
  if (!ctx) return Promise.reject(new Error('2d context unavailable'));

  // background: soft vertical gradient
  const grad = ctx.createLinearGradient(0, 0, 0, CARD_SIZE);
  grad.addColorStop(0, '#fff5f9');
  grad.addColorStop(1, '#ffd9e8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CARD_SIZE, CARD_SIZE);

  // photo area: center-crop the WebGL canvas into a rounded square
  const photo = 860;
  const px = (CARD_SIZE - photo) / 2;
  const py = 56;
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
  ctx.fillStyle = '#43303e';
  ctx.textAlign = 'center';
  ctx.font = '700 64px "Hiragino Maru Gothic ProN", "Hiragino Sans", sans-serif';
  ctx.fillText(opts.appName, CARD_SIZE / 2, py + photo + 82);
  ctx.font = '400 30px "Hiragino Sans", sans-serif';
  ctx.fillStyle = '#9a6b84';
  const sub =
    getLang() === 'ja'
      ? `${opts.tagline}（${opts.workingTitleNote}）`
      : `${opts.tagline} (${opts.workingTitleNote})`;
  ctx.fillText(sub, CARD_SIZE / 2, py + photo + 128);

  return new Promise((resolve, reject) => {
    card.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('PNG encode failed'))),
      'image/png',
    );
  });
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
