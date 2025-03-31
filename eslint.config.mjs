import js from '@eslint/js';
import globals from 'globals';
import * as tseslint from '@typescript-eslint/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    // Files to lint
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            globals: {
                ...globals.node,
            },
        },
    },

    // Base JS rules
    js.configs.recommended,

    // TypeScript rules (directly include the plugin and configuration)
    {
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
        },
    },

    // Prettier rules
    {
        plugins: {
            prettier,
        },
        rules: {
            'prettier/prettier': 'error',
        },
    },

    prettierConfig,
];
