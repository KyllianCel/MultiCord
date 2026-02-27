import js from "@eslint/js";
import ts from "typescript-eslint";

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "warn",
    },
    ignores: ["src/generated/**/*", "node_modules/**/*", "dist/**/*"]
  }
];