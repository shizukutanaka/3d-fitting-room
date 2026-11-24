// When does the shadow map need to be drawn again?
//
// The shadow pass draws every caster a second time, each frame,
// to produce a picture that almost never changes: the mannequin
// stands still apart from a slow idle sway. With
// renderer.shadowMap.autoUpdate off, the stage redraws the map
// only when a caster actually moved — this gate compares the
// casters' sampled positions against the ones the current shadow
// map was drawn from — or when it is told something else changed
// (clothes, light, quality step).
//
// Pure logic: unit-tested without a renderer.

/** Movement below this (metres) keeps the current shadow map. */
export const SHADOW_MOVE_EPS = 0.002;

export class MotionGate {
  private last: Float32Array = new Float32Array(0);

  constructor(readonly eps = SHADOW_MOVE_EPS) {}

  /** True when any sample differs from the last accepted snapshot
   *  by more than eps (or the sample count changed). The snapshot
   *  is replaced only then, so slow drift adds up against the
   *  state the shadow map was drawn from, not frame to frame. */
  moved(samples: ArrayLike<number>): boolean {
    let changed = samples.length !== this.last.length;
    if (!changed) {
      for (let i = 0; i < samples.length; i++) {
        if (Math.abs(samples[i] - this.last[i]) > this.eps) {
          changed = true;
          break;
        }
      }
    }
    if (changed) {
      if (this.last.length !== samples.length) this.last = new Float32Array(samples.length);
      this.last.set(samples);
    }
    return changed;
  }

  /** Forget the snapshot: the next check reports movement. */
  reset(): void {
    this.last = new Float32Array(0);
  }
}
