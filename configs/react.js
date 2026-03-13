/* eslint no-warning-comments: 1 */
import eslintReact from '@eslint-react/eslint-plugin';
import * as next from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

import { reactNamingRuleConfig } from './share/naming-config.js';


const files = ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];
const testFiles = ['**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];
const tsFiles = ['**/*.{ts,cts,mts,tsx}'];
const jsxFiles = ['**/*.{jsx,tsx}'];

/**
 * @param {Object} [config]
 * @param {boolean} [config.a11y] Include config for a11y
 * @param {boolean} [config.nextjs] Include config for next.js
 */
export function prepareConfig({ a11y = false, nextjs = false } = {}) {
    const baseConfig = defineConfig(
        {
            name: 'dtrw:react:base',
            files,
            plugins: { ...eslintReact.configs.all.plugins },
            languageOptions: {
                parserOptions: {
                    ecmaFeatures: { jsx: true },
                    jsxPragma: null
                },
                globals: {
                    ...globals.serviceworker,
                    ...globals.browser
                }
            },
            rules: {
                '@stylistic/jsx-child-element-spacing': 'error',
                '@stylistic/jsx-closing-bracket-location': ['error', 'tag-aligned'],
                '@stylistic/jsx-closing-tag-location': 'error',
                '@stylistic/jsx-curly-brace-presence': 'error',
                '@stylistic/jsx-curly-newline': [
                    'error',
                    {
                        multiline: 'forbid',
                        singleline: 'forbid'
                    }
                ],
                '@stylistic/jsx-curly-spacing': [
                    'error',
                    {
                        when: 'never',
                        allowMultiline: false,
                        attributes: { when: 'never' },
                        children: { when: 'never' }
                    }
                ],
                '@stylistic/jsx-equals-spacing': 'error',
                '@stylistic/jsx-first-prop-new-line': ['error', 'multiprop'],
                '@stylistic/jsx-function-call-newline': ['error', 'multiline'],
                '@stylistic/jsx-indent-props': 'error',
                '@stylistic/jsx-max-props-per-line': [
                    'error',
                    {
                        maximum: {
                            single: 2,
                            multi: 1
                        }
                    }
                ],
                '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'non-jsx' }],
                '@stylistic/jsx-quotes': ['error', 'prefer-double'],
                '@stylistic/jsx-self-closing-comp': [
                    'error',
                    {
                        component: true,
                        html: true
                    }
                ],
                '@stylistic/jsx-tag-spacing': 'error',
                '@stylistic/jsx-wrap-multilines': [
                    'error',
                    {
                        declaration: 'parens-new-line',
                        assignment: 'parens-new-line',
                        return: 'parens-new-line',
                        arrow: 'parens-new-line',
                        condition: 'parens-new-line',
                        logical: 'parens-new-line',
                        prop: 'parens-new-line'
                    }
                ],

                '@eslint-react/component-hook-factories': 'error',
                '@eslint-react/dom/no-dangerously-set-innerhtml-with-children': 'error',
                '@eslint-react/dom/no-dangerously-set-innerhtml': 'error',
                '@eslint-react/dom/no-find-dom-node': 'error',
                '@eslint-react/dom/no-hydrate': 'error',
                '@eslint-react/dom/no-missing-button-type': 'error',
                '@eslint-react/dom/no-missing-iframe-sandbox': 'error',
                '@eslint-react/dom/no-render-return-value': 'error',
                '@eslint-react/dom/no-render': 'error',
                '@eslint-react/dom/no-script-url': 'error',
                '@eslint-react/dom/no-unknown-property': 'error',
                '@eslint-react/dom/no-unsafe-target-blank': 'error',
                '@eslint-react/dom/no-void-elements-with-children': 'error',
                '@eslint-react/error-boundaries': 'error',
                '@eslint-react/exhaustive-deps': 'error',
                '@eslint-react/jsx-key-before-spread': 'error',
                '@eslint-react/jsx-no-comment-textnodes': 'error',
                '@eslint-react/jsx-shorthand-boolean': 'error',
                '@eslint-react/jsx-shorthand-fragment': 'error',
                '@eslint-react/naming-convention/context-name': 'error',
                '@eslint-react/naming-convention/id-name': 'error',
                '@eslint-react/naming-convention/ref-name': 'error',
                '@eslint-react/no-access-state-in-setstate': 'error',
                '@eslint-react/no-array-index-key': 'error',
                '@eslint-react/no-children-prop': 'error',
                '@eslint-react/no-component-will-mount': 'error',
                '@eslint-react/no-component-will-receive-props': 'error',
                '@eslint-react/no-component-will-update': 'error',
                '@eslint-react/no-create-ref': 'error',
                '@eslint-react/no-direct-mutation-state': 'error',
                '@eslint-react/no-duplicate-key': 'error',
                '@eslint-react/no-forward-ref': 'error',
                '@eslint-react/no-leaked-conditional-rendering': 'error',
                '@eslint-react/no-missing-component-display-name': 'error',
                '@eslint-react/no-missing-context-display-name': 'error',
                '@eslint-react/no-missing-key': 'error',
                '@eslint-react/no-nested-component-definitions': 'error',
                '@eslint-react/no-nested-lazy-component-declarations': 'error',
                '@eslint-react/no-redundant-should-component-update': 'error',
                '@eslint-react/no-set-state-in-component-did-mount': 'error',
                '@eslint-react/no-set-state-in-component-did-update': 'error',
                '@eslint-react/no-set-state-in-component-will-update': 'error',
                '@eslint-react/no-unsafe-component-will-mount': 'error',
                '@eslint-react/no-unsafe-component-will-receive-props': 'error',
                '@eslint-react/no-unsafe-component-will-update': 'error',
                '@eslint-react/no-unstable-context-value': 'error',
                '@eslint-react/no-unstable-default-props': 'error',
                '@eslint-react/no-useless-fragment': 'error',
                '@eslint-react/rules-of-hooks': 'error',
                '@eslint-react/set-state-in-effect': 'error',
                '@eslint-react/use-memo': 'error',
                '@eslint-react/use-state': 'error',
                '@eslint-react/web-api/no-leaked-event-listener': 'error',
                '@eslint-react/web-api/no-leaked-interval': 'error',
                '@eslint-react/web-api/no-leaked-resize-observer': 'error'

                // HOOKS - TODO: migrate once implemented/stable in @eslint-react
                // 'react-hooks/globals': 'error',
                // 'react-hooks/immutability': 'error',
                // 'react-hooks/incompatible-library': 'error',
                // 'react-hooks/purity': 'error',
                // 'react-hooks/refs': 'error',
                // 'react-hooks/set-state-in-render': 'error',
            }
        },
        {
            name: 'dtrw:react:ts',
            files: tsFiles,
            rules: {
                '@eslint-react/no-implicit-key': 'error',
                '@typescript-eslint/naming-convention': /** @type {any} */(['error']).concat(reactNamingRuleConfig)
            }
        },
        {
            name: 'dtrw:react:test',
            files: testFiles,
            rules: {
                '@eslint-react/rules-of-hooks': 'off',
                '@eslint-react/no-missing-component-display-name': 'off',
                '@eslint-react/no-missing-context-display-name': 'off'
            }
        }
    );
    const nextConfig = defineConfig(
        {
            ...next.default.configs['core-web-vitals'],
            name: 'dtrw:react:next',
            files
        }
    );
    const a11yConfig = defineConfig(
        {
            name: 'dtrw:react:a11y',
            files: jsxFiles,
            plugins: { 'jsx-a11y': jsxA11y },
            rules: {
                ...jsxA11y.flatConfigs.recommended.rules,
                'jsx-a11y/anchor-ambiguous-text': 'error'
            }
        }
    );

    const result = [...baseConfig];
    if (nextjs) {
        result.push(...nextConfig);
    }
    if (a11y) {
        result.push(...a11yConfig);
    }

    return result;
}
