import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  // Files to lint
  { files: ["**/*.{js,mjs,cjs,ts}"] },

  // Base JS rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error", 
    },
  },

  prettierConfig,
];