import { defineConfig } from 'eslint/config';
import globals from 'globals';

import { prepareConfig } from './index.js';


export default defineConfig(
    ...prepareConfig({
        json: true,
        jest: { mode: 'vitest' },
        node: true
    }),
    {
        name: 'local-overrides',
        languageOptions: {
            globals: { ...globals.node },
            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: import.meta.dirname
            },
            sourceType: 'module'
        },
        rules: {
            'no-extra-parens': 'off',
            'no-magic-numbers': 'off',
            'import-x/no-named-as-default-member': 'off',
            '@stylistic/quote-props': ['error', 'consistent-as-needed']
        }
    },
    {
        files: ['.versionrc.cjs', '.versionrc.*.cjs'],
        rules: {
            '@stylistic/indent': ['error', 2]
        }
    },
    { ignores: ['index.d.ts'] }
);
