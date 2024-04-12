import lodash from 'eslint-plugin-lodash';
import tseslint from 'typescript-eslint';


const files = ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

export function prepareConfig() {
    return tseslint.config(
        {
            name: 'dtrw:lodash:base',
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
    );
}
