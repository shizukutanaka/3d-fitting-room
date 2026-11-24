// GPU time of one frame via EXT_disjoint_timer_query_webgl2, where
// the browser exposes it (desktop Chrome does; the Quest browser
// may not — then createGpuTimer returns null and diagnostics.ts
// falls back to its CPU-side inference). One query is in flight at
// a time: a frame is timed, its result is collected a few frames
// later, then the next frame is timed. Only driven while the
// diagnostics overlay is shown.

export interface GpuTimer {
  /** Call right before / after the frame's render. */
  begin(): void;
  end(): void;
  /** A finished measurement in ms, or null if none is ready. */
  poll(): number | null;
}

export function createGpuTimer(gl: WebGLRenderingContext | WebGL2RenderingContext): GpuTimer | null {
  if (typeof WebGL2RenderingContext === 'undefined' || !(gl instanceof WebGL2RenderingContext)) return null;
  const ext = gl.getExtension('EXT_disjoint_timer_query_webgl2') as
    | { TIME_ELAPSED_EXT: number; GPU_DISJOINT_EXT: number }
    | null;
  if (!ext) return null;
  let pending: WebGLQuery | null = null;
  let active = false;
  return {
    begin() {
      if (pending) return;
      pending = gl.createQuery();
      if (!pending) return;
      gl.beginQuery(ext.TIME_ELAPSED_EXT, pending);
      active = true;
    },
    end() {
      if (!active) return;
      gl.endQuery(ext.TIME_ELAPSED_EXT);
      active = false;
    },
    poll() {
      if (!pending || active) return null;
      if (!gl.getQueryParameter(pending, gl.QUERY_RESULT_AVAILABLE)) return null;
      const disjoint = gl.getParameter(ext.GPU_DISJOINT_EXT) as boolean;
      const ns = gl.getQueryParameter(pending, gl.QUERY_RESULT) as number;
      gl.deleteQuery(pending);
      pending = null;
      return disjoint ? null : ns / 1e6;
    },
  };
}
