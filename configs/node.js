import { defineFlatConfig } from 'eslint-define-config';
import n from 'eslint-plugin-n';
import nodeSecurity from 'eslint-plugin-security-node';
import globals from 'globals';


export function prepareConfig() {
    return defineFlatConfig([
        {
            files: ['**/*.{js,cjs,mjs,ts,cts,mts}'],
            plugins: {
                n,
                'security-node': nodeSecurity
            },
            languageOptions: {
                globals: {
                    // eslint-disable-next-line no-warning-comments
                    ...n.configs['recommended-module'].globals, // TODO: recommended once eslint-plugin-n moves to FlatConfig
                    ...globals.node
                },
                parserOptions: { ecmaFeatures: { globalReturn: false } }
            },
            rules: {
                // eslint-disable-next-line no-warning-comments
                ...n.configs['recommended-module'].rules, // TODO: recommended once eslint-plugin-n moves to FlatConfig
                ...nodeSecurity.configs.recommended.rules,

                'no-console': 'off',

                'n/no-missing-import': 'off',
                'n/no-missing-require': 'off',
                'n/no-path-concat': 'error',
                'n/callback-return': 'error',
                'n/prefer-global/buffer': 'error',
                'n/prefer-global/console': 'error',
                'n/prefer-global/process': 'error',
                'n/prefer-global/url-search-params': 'error',
                'n/prefer-global/url': 'error',
                'n/prefer-promises/dns': 'error',
                'n/prefer-promises/fs': 'error'
            }
        },
        {
            files: ['**/*.{ts,cts,mts}'],
            rules: {
                'n/no-unpublished-import': 'error',
                'n/no-unpublished-require': 'error',
                'n/no-unsupported-features/es-syntax': 'off'
            }
        }
    ]);
}
