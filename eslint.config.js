// eslint.config.js
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const eslintRecommended = require("@eslint/js/src/configs/eslint-recommended");
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...eslintRecommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      "@typescript-eslint/no-floating-promises": "error",
      "no-extra-boolean-cast": "off",
    },
  },
  {
    ignores: ["node_modules", "build", "examples"],
  },
];
