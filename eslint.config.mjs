import js from "@eslint/js";
import globals from "globals";
import nextPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  { ignores: ["node_modules/**", ".next/**"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { "@next/next": nextPlugin },
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "no-unused-vars": "warn",
    },
  },
];

export default config;
