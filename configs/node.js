import { defineFlatConfig } from 'eslint-define-config';
import nModule from 'eslint-plugin-n/configs/recommended-module.js';
import nScript from 'eslint-plugin-n/configs/recommended-script.js';
import nodeSecurity from 'eslint-plugin-security-node';
import globals from 'globals';


/**
 * @param {Object} [config]
 * @param {'module' | 'script'} [config.mode]
 */
export function prepareConfig({ mode = 'module' } = {}) {
    const isModule = mode === 'module';

    return defineFlatConfig([
        {
            files: [isModule ? '**/*.{cjs,cts}' : '**/*.{js,cjs,ts,cts}'],
            ...nScript
        },
        {
            files: [isModule ? '**/*.{js,mjs,ts,mts}' : '**/*.{mjs,mts}'],
            ...nModule
        },
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
