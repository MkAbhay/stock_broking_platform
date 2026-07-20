import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import { defineConfig, globalIgnores } from "eslint/config";
// eslint.config.js

export default defineConfig([
  globalIgnores(["package.json", "package-lock.json", "dist/*", ".vscode/*"]),
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      // Ignore function arguments starting with underscore
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: ["markdown/recommended"],
  },
]);
