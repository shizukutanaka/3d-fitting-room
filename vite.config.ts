import { defineConfig } from 'vite';

// Single-page PWA. base './' so the built app also works when opened
// from a plain static folder or a sub-path, with no server config.
export default defineConfig({
  base: './',
});
