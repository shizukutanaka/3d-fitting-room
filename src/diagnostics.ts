// In-app performance diagnostics (WORLD-CLASS.md M1/M2 evidence).
//
// While a VR session is presenting, the frame loop feeds one
// sample per frame in here: the interval since the previous frame,
// the time the main thread spent inside the frame callback, and
// renderer.info's draw-call / triangle counters. Samples are folded
// into running sums (no per-frame allocation) and flushed as one
// log entry per window, kept in a bounded ring. The log is what a
// real Quest run is read from: shown on a board inside VR on
// demand, and copied / downloaded from the flat screen afterwards.
//
// CPU-bound vs GPU-bound follows the Meta WebXR performance
// workflow's first question. A browser cannot read the headset's
// GPU time directly, so the split is made from what it can see:
// if frames are late while the frame callback itself is short, the
// main thread is waiting on the GPU (GPU-bound: cut pixels —
// resolution, foveation, shadow filtering, overdraw); if the
// callback eats the budget, the frame is lost in JavaScript and
// draw-call submission (CPU-bound: cut draw calls and per-frame
// work). A GPU timer query sharpens the call where the platform
// offers one (gputimer.ts); it is sampled only while the overlay
// is shown.
//
// Pure logic, no three.js: unit-tested without a renderer.

export type Bottleneck = 'ok' | 'cpu' | 'gpu';

export interface DiagEntry {
  /** Seconds since the recorder was (re)started. */
  t: number;
  frames: number;
  /** Frame interval (ms): window average and worst frame. */
  frameMs: number;
  frameMaxMs: number;
  fps: number;
  /** Main-thread time inside the frame callback (ms). */
  cpuMs: number;
  cpuMaxMs: number;
  /** GPU time of a sampled frame (ms); null where no timer exists. */
  gpuMs: number | null;
  /** Frames in the window that overran 1.5x the budget. */
  late: number;
  /** renderer.info per frame, all passes (eyes, mirror, shadow). */
  calls: number;
  triangles: number;
  /** renderer.info.memory / programs at flush time. */
  geometries: number;
  textures: number;
  programs: number;
  /** XR quality ladder level at flush time. */
  quality: number;
  budgetMs: number;
  bottleneck: Bottleneck;
}

export interface DiagFlushContext {
  geometries: number;
  textures: number;
  programs: number;
  quality: number;
}

/** A frame is "on budget" up to this much over the nominal
 *  interval (timer jitter on a healthy headset). */
export const DIAG_BUDGET_SLACK = 1.08;
/** Callback time above this share of the budget means the main
 *  thread, not the GPU, is what the frame is waiting for. */
export const DIAG_CPU_SHARE = 0.7;

/** The CPU/GPU call for one window. With a GPU time it is a
 *  direct comparison; without one it is the inference described
 *  at the top of this file. */
export function classifyBottleneck(
  frameMs: number,
  cpuMs: number,
  gpuMs: number | null,
  budgetMs: number,
): Bottleneck {
  if (!(frameMs > budgetMs * DIAG_BUDGET_SLACK)) return 'ok';
  if (gpuMs !== null && gpuMs > budgetMs * DIAG_CPU_SHARE && gpuMs >= cpuMs) return 'gpu';
  return cpuMs >= budgetMs * DIAG_CPU_SHARE ? 'cpu' : 'gpu';
}

export class FrameDiagnostics {
  private readonly ring: DiagEntry[] = [];
  private startAt = -1;
  private lastAt = -1;
  private frames = 0;
  private frameSum = 0;
  private frameMax = 0;
  private cpuSum = 0;
  private cpuMax = 0;
  private late = 0;
  private callSum = 0;
  private triSum = 0;
  private gpuMs: number | null = null;

  constructor(
    /** Frames per log entry (72 = one entry a second at 72 Hz). */
    readonly windowFrames = 72,
    /** Entries kept (300 = five minutes at one a second). */
    readonly capacity = 300,
  ) {}

  /** Forget the open window and the frame clock (session start /
   *  end, recording paused): the gap must not read as a slow frame.
   *  The log itself is kept. */
  restart(): void {
    this.lastAt = -1;
    this.frames = 0;
    this.frameSum = 0;
    this.frameMax = 0;
    this.cpuSum = 0;
    this.cpuMax = 0;
    this.late = 0;
    this.callSum = 0;
    this.triSum = 0;
    this.gpuMs = null;
  }

  clear(): void {
    this.ring.length = 0;
    this.startAt = -1;
    this.restart();
  }

  /** The latest GPU-timer reading (ms), folded into the next entry. */
  noteGpuMs(ms: number): void {
    this.gpuMs = ms;
  }

  /** One rendered frame. Returns the new log entry when this frame
   *  closed a window, otherwise null. `ctx` is only called on flush. */
  frame(
    nowMs: number,
    cpuMs: number,
    calls: number,
    triangles: number,
    budgetMs: number,
    ctx: () => DiagFlushContext,
  ): DiagEntry | null {
    if (this.startAt < 0) this.startAt = nowMs;
    if (this.lastAt < 0) {
      // The first frame after a restart only sets the clock.
      this.lastAt = nowMs;
      return null;
    }
    const dt = nowMs - this.lastAt;
    this.lastAt = nowMs;
    this.frames += 1;
    this.frameSum += dt;
    if (dt > this.frameMax) this.frameMax = dt;
    if (dt > budgetMs * 1.5) this.late += 1;
    this.cpuSum += cpuMs;
    if (cpuMs > this.cpuMax) this.cpuMax = cpuMs;
    this.callSum += calls;
    this.triSum += triangles;
    if (this.frames < this.windowFrames) return null;

    const n = this.frames;
    const frameMs = this.frameSum / n;
    const cpu = this.cpuSum / n;
    const c = ctx();
    const entry: DiagEntry = {
      t: Math.round((nowMs - this.startAt) / 100) / 10,
      frames: n,
      frameMs: round2(frameMs),
      frameMaxMs: round2(this.frameMax),
      fps: round2(1000 / frameMs),
      cpuMs: round2(cpu),
      cpuMaxMs: round2(this.cpuMax),
      gpuMs: this.gpuMs === null ? null : round2(this.gpuMs),
      late: this.late,
      calls: Math.round(this.callSum / n),
      triangles: Math.round(this.triSum / n),
      geometries: c.geometries,
      textures: c.textures,
      programs: c.programs,
      quality: c.quality,
      budgetMs: round2(budgetMs),
      bottleneck: classifyBottleneck(frameMs, cpu, this.gpuMs, budgetMs),
    };
    if (this.ring.length >= this.capacity) this.ring.shift();
    this.ring.push(entry);
    const keepAt = this.lastAt;
    this.restart();
    this.lastAt = keepAt;
    return entry;
  }

  latest(): DiagEntry | null {
    return this.ring.length ? this.ring[this.ring.length - 1] : null;
  }

  log(): readonly DiagEntry[] {
    return this.ring;
  }
}

function round2(v: number): number {
  return Math.round(v * 100) / 100;
}

const BOTTLENECK_TEXT: Record<Bottleneck, string> = {
  ok: 'on budget',
  cpu: 'CPU-bound (JS / draw calls)',
  gpu: 'GPU-bound (pixels / fill)',
};

/** The overlay's text for one entry: the same lines on the VR board
 *  and on the flat screen. Developer-facing, so not translated. */
export function formatDiagLines(e: DiagEntry | null): string[] {
  if (!e) return ['diagnostics: collecting…'];
  return [
    `${e.fps.toFixed(1)} fps  frame ${e.frameMs.toFixed(1)} ms (max ${e.frameMaxMs.toFixed(1)})  budget ${e.budgetMs.toFixed(1)}`,
    `cpu ${e.cpuMs.toFixed(1)} ms (max ${e.cpuMaxMs.toFixed(1)})  gpu ${e.gpuMs === null ? 'n/a' : `${e.gpuMs.toFixed(1)} ms`}  late ${e.late}/${e.frames}`,
    `draw calls ${e.calls}  triangles ${e.triangles}`,
    `programs ${e.programs}  geometries ${e.geometries}  textures ${e.textures}`,
    `quality L${e.quality}  ${BOTTLENECK_TEXT[e.bottleneck]}`,
  ];
}

/** The log as a self-describing JSON document (copy / download). */
export function diagLogJson(log: readonly DiagEntry[], meta: Record<string, unknown>): string {
  return JSON.stringify({ kind: 'fitting-room-diagnostics', version: 1, ...meta, entries: log }, null, 1);
}
