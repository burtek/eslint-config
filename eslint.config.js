import { defineFlatConfig } from 'eslint-define-config';
import globals from 'globals';

import { prepareConfig } from './src/configs/index.js';


export default defineFlatConfig([
    ...prepareConfig({ json: { additionalFiles: { jsonc: ['.czrc'] } } }),
    {
        languageOptions: {
            globals: { ...globals.node },
            sourceType: 'module'
        },
        rules: {
            'no-extra-parens': 'off',
            'no-magic-numbers': 'off'
        }
    }
]);
