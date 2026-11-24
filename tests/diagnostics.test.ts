import { describe, expect, it } from 'vitest';
import {
  FrameDiagnostics,
  classifyBottleneck,
  diagLogJson,
  formatDiagLines,
} from '../src/diagnostics';
import { parseVrActionId, vrActionId } from '../src/vr';

const BUDGET = 1000 / 72;
const ctx = () => ({ geometries: 10, textures: 20, programs: 5, quality: 1 });

function run(d: FrameDiagnostics, frames: number, dt: number, cpu: number, start = 0) {
  const out = [];
  for (let i = 0; i <= frames; i += 1) {
    const e = d.frame(start + i * dt, cpu, 100, 50000, BUDGET, ctx);
    if (e) out.push(e);
  }
  return out;
}

describe('classifyBottleneck', () => {
  it('is ok while frames are on budget', () => {
    expect(classifyBottleneck(BUDGET, 12, null, BUDGET)).toBe('ok');
    expect(classifyBottleneck(BUDGET * 1.05, 2, 30, BUDGET)).toBe('ok');
  });
  it('late frames with a short callback are GPU-bound', () => {
    expect(classifyBottleneck(27.8, 3, null, BUDGET)).toBe('gpu');
  });
  it('late frames with a long callback are CPU-bound', () => {
    expect(classifyBottleneck(27.8, 20, null, BUDGET)).toBe('cpu');
  });
  it('a GPU timer reading decides when it dominates', () => {
    expect(classifyBottleneck(27.8, 11, 22, BUDGET)).toBe('gpu');
    expect(classifyBottleneck(27.8, 20, 4, BUDGET)).toBe('cpu');
  });
});

describe('FrameDiagnostics', () => {
  it('emits one entry per window with per-frame averages', () => {
    const d = new FrameDiagnostics(10, 5);
    const entries = run(d, 10, 14, 4);
    expect(entries).toHaveLength(1);
    const e = entries[0];
    expect(e.frames).toBe(10);
    expect(e.frameMs).toBeCloseTo(14, 5);
    expect(e.fps).toBeCloseTo(71.43, 2);
    expect(e.cpuMs).toBe(4);
    expect(e.calls).toBe(100);
    expect(e.triangles).toBe(50000);
    expect(e.programs).toBe(5);
    expect(e.quality).toBe(1);
    expect(e.gpuMs).toBeNull();
    expect(e.bottleneck).toBe('ok');
    expect(d.latest()).toBe(e);
  });

  it('counts late frames and tracks the worst frame', () => {
    const d = new FrameDiagnostics(4, 5);
    const times = [0, 14, 28, 70, 84];
    let entry = null;
    for (const t of times) entry = d.frame(t, 3, 1, 1, BUDGET, ctx) ?? entry;
    expect(entry).not.toBeNull();
    expect(entry!.late).toBe(1);
    expect(entry!.frameMaxMs).toBe(42);
  });

  it('keeps a bounded ring', () => {
    const d = new FrameDiagnostics(2, 3);
    run(d, 20, 14, 1);
    expect(d.log()).toHaveLength(3);
  });

  it('does not count the gap across a restart as a frame', () => {
    const d = new FrameDiagnostics(3, 5);
    run(d, 2, 14, 1);
    d.restart();
    const entries = run(d, 3, 14, 1, 100000);
    expect(entries).toHaveLength(1);
    expect(entries[0].frameMaxMs).toBeCloseTo(14, 5);
    expect(entries[0].late).toBe(0);
  });

  it('continues the frame clock across windows', () => {
    const d = new FrameDiagnostics(3, 5);
    expect(run(d, 9, 14, 1)).toHaveLength(3);
  });

  it('folds a GPU reading into the next entry', () => {
    const d = new FrameDiagnostics(3, 5);
    d.frame(0, 2, 1, 1, BUDGET, ctx);
    d.noteGpuMs(25);
    const [e] = run(d, 3, 28, 2, 28);
    expect(e.gpuMs).toBe(25);
    expect(e.bottleneck).toBe('gpu');
  });

  it('clear empties the log', () => {
    const d = new FrameDiagnostics(2, 3);
    run(d, 4, 14, 1);
    d.clear();
    expect(d.log()).toHaveLength(0);
    expect(d.latest()).toBeNull();
  });
});

describe('diagnostics output', () => {
  it('formats a placeholder and an entry', () => {
    expect(formatDiagLines(null)).toHaveLength(1);
    const d = new FrameDiagnostics(2, 3);
    const [e] = run(d, 2, 28, 20);
    const text = formatDiagLines(e).join('\n');
    expect(text).toContain('draw calls 100');
    expect(text).toContain('triangles 50000');
    expect(text).toContain('gpu n/a');
    expect(text).toContain('CPU-bound');
  });
  it('serialises the log as JSON', () => {
    const d = new FrameDiagnostics(2, 3);
    run(d, 4, 14, 1);
    const doc = JSON.parse(diagLogJson(d.log(), { userAgent: 'x' }));
    expect(doc.kind).toBe('fitting-room-diagnostics');
    expect(doc.userAgent).toBe('x');
    expect(doc.entries).toHaveLength(2);
  });
  it('round-trips the VR panel action', () => {
    expect(parseVrActionId(vrActionId({ type: 'diag' }))).toEqual({ type: 'diag' });
  });
});
