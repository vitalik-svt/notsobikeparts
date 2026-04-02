import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    jsx: `automatic`,
    jsxImportSource: `react`,
  },
  test: {
    environment: `happy-dom`,
    setupFiles: [`./vitest.setup.ts`],
    include: [`tests/**/*.test.ts`, `tests/**/*.test.tsx`],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, `./src`),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
});