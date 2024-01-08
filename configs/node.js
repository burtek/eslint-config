import { defineFlatConfig } from 'eslint-define-config';
import nPlugin from 'eslint-plugin-n';
import nodeSecurity from 'eslint-plugin-security-node';
import globals from 'globals';


export function prepareConfig() {
    return defineFlatConfig([
        ...nPlugin.configs['flat/mixed-esm-and-cjs'].map(c => ({ ...c, files: c.files.flatMap(f => [f, f.replace('.js', '.ts')]) })),
        {
            files: ['**/*.{js,cjs,mjs,ts,cts,mts}'],
            languageOptions: {
                globals: { ...globals.node },
                parserOptions: { ecmaFeatures: { globalReturn: false } }
            },
            rules: {
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
        },
        {
            files: ['**/*.{js,cjs,mjs,ts,cts,mts}'],
            plugins: { 'security-node': nodeSecurity },
            rules: {
                ...nodeSecurity.configs.recommended.rules,

                // https://github.com/gkouziik/eslint-plugin-security-node/pull/63
                'security-node/detect-unhandled-async-errors': 'off'
            }
        }
    ]);
}
