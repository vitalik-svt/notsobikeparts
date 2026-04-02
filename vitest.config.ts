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
    coverage: {
      provider: `v8`,
      reporter: [`text`, `json`, `json-summary`, `html`],
      include: [`src/**`],
      exclude: [
        `src/**/*.d.ts`,
        `src/app/**`,
        `src/components/**`,
        `src/providers/**`,
        `src/types/**`,
        `src/i18n/**`,
        `src/middleware.ts`,
        `src/hooks/**`,
        `src/stores/**`,
        `src/constants/contacts.ts`,
        `src/constants/routes.ts`,
      ],
    },
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