import { defineFlatConfig } from 'eslint-define-config';
import globals from 'globals';

import { prepareConfig } from './configs/index.js';


export default defineFlatConfig([
    ...prepareConfig({ json: { additionalFiles: { jsonc: ['.czrc'] } } }),
    {
        languageOptions: {
            globals: { ...globals.node },
            parserOptions: { project: 'tsconfig.json' },
            sourceType: 'module'
        },
        rules: {
            'no-extra-parens': 'off',
            'no-magic-numbers': 'off'
        }
    }
]);
