import globals from 'globals';
import tseslint from 'typescript-eslint';

import { prepareConfig } from './configs/index.js';


export default tseslint.config(
    ...prepareConfig({ json: true }),
    {
        name: 'local-overrides',
        languageOptions: {
            globals: { ...globals.node },
            parserOptions: { project: 'tsconfig.json' },
            sourceType: 'module'
        },
        rules: {
            'no-extra-parens': 'off',
            'no-magic-numbers': 'off',
            'import-x/no-named-as-default-member': 'off',
            '@stylistic/quote-props': ['error', 'consistent-as-needed']
        }
    },
    { ignores: ['index.d.ts'] }
);
