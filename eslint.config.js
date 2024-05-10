import stylisticPlugin from '@stylistic/eslint-plugin';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { prepareConfig } from './configs/index.js';


export default tseslint.config(
    ...await prepareConfig({ json: { additionalFiles: { jsonc: ['.czrc'] } } }),
    {
        name: 'local-overrides',
        languageOptions: {
            globals: { ...globals.node },
            parserOptions: { project: 'tsconfig.json' },
            sourceType: 'module'
        },
        plugins: { '@stylistic': /** @type {Pick<typeof stylisticPlugin, 'rules'>} */(stylisticPlugin) },
        rules: {
            'no-extra-parens': 'off',
            'no-magic-numbers': 'off',
            'import/no-named-as-default-member': 'off',
            '@stylistic/quote-props': ['error', 'consistent-as-needed']
        }
    },
    { ignores: ['index.d.ts'] }
);

export const { config } = tseslint;
