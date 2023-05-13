import { defineFlatConfig } from 'eslint-define-config';
import lodash from 'eslint-plugin-lodash';


const files = ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

export function prepareConfig() {
    return defineFlatConfig([
        {
            files,
            plugins: { lodash },
            rules: {
                'lodash/import-scope': ['error', 'method'],
                'lodash/prefer-compact': 'error',
                'lodash/prefer-find': 'error',
                'lodash/prefer-flat-map': 'error',
                'lodash/prefer-immutable-method': 'error',
                'lodash/prefer-is-nil': 'error',
                'lodash/prefer-map': 'error',
                'lodash/prefer-matches': 'error',
                'lodash/prefer-noop': 'error',
                'lodash/prefer-reject': 'error',
                'lodash/prefer-times': 'error'
            }
        }
    ]);
}
