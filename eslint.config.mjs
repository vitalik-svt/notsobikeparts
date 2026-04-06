import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(`next/core-web-vitals`, `next/typescript`),
  {
    ignores: [
      `node_modules/**`,
      `.next/**`,
      `out/**`,
      `build/**`,
      `coverage/**`,
      `next-env.d.ts`,
      `eslint.config.mjs`,
      `postcss.config.mjs`,
    ],
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      quotes: [`error`, `backtick`],
      "prefer-template": `error`,
      "simple-import-sort/imports": `error`,
      "simple-import-sort/exports": `error`,
      "@typescript-eslint/consistent-type-imports": [`error`, { prefer: `type-imports` }],
      "@typescript-eslint/switch-exhaustiveness-check": `error`,
    },
  },
];

export default eslintConfig;
