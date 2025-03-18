/* eslint no-warning-comments: 1 */
import next from '@next/eslint-plugin-next';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import * as reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { reactNamingRuleConfig } from './share/naming-config.js';


const linkComponents = [
    {
        name: 'Link',
        linkAttribute: ['to', 'href']
    },
    {
        name: 'NavLink',
        linkAttribute: ['to', 'href']
    }
];

const files = ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];
const testFiles = ['**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];
const tsFiles = ['**/*.{ts,cts,mts,tsx}'];
const jsxFiles = ['**/*.{jsx,tsx}'];

// TODO: move to FlatConfig once react-hooks is upgraded
/**
 * @param {Object} [config]
 * @param {boolean} [config.a11y] Include config for a11y
 * @param {boolean} [config.nextjs] Include config for next.js
 */
export function prepareConfig({ a11y = false, nextjs = false } = {}) {
    const baseConfig = tseslint.config(
        {
            name: 'dtrw:react:base',
            files,
            plugins: { react },
            languageOptions: {
                parserOptions: {
                    ecmaFeatures: { jsx: true },
                    jsxPragma: null
                },
                globals: globals.browser
            },
            settings: {
                react: { version: 'detect' },
                linkComponents
            },
            rules: {
                ...react.configs.flat.recommended.rules,
                ...react.configs.flat['jsx-runtime'].rules,

                '@stylistic/jsx-function-call-newline': ['error', 'multiline'],
                '@stylistic/jsx-quotes': ['error', 'prefer-double'],

                // TODO: move other rules to stylistic
                // see https://github.com/jsx-eslint/eslint-plugin-react/issues/3671
                // see https://eslint.style/packages/default?filter=jsx

                'react/button-has-type': 'warn',
                'react/display-name': [
                    'error',
                    {
                        checkContextObjects: true,
                        ignoreTranspilerName: true
                    }
                ],
                'react/forward-ref-uses-ref': 'error',
                'react/hook-use-state': ['error', { allowDestructuredState: true }],
                'react/iframe-missing-sandbox': 'error',
                'react/jsx-boolean-value': 'error',
                'react/jsx-child-element-spacing': 'error',
                'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
                'react/jsx-closing-tag-location': 'error',
                'react/jsx-curly-brace-presence': 'error',
                'react/jsx-curly-newline': [
                    'error',
                    {
                        multiline: 'forbid',
                        singleline: 'forbid'
                    }
                ],
                'react/jsx-curly-spacing': [
                    'error',
                    {
                        when: 'never',
                        allowMultiline: false,
                        attributes: { when: 'never' },
                        children: { when: 'never' }
                    }
                ],
                'react/jsx-equals-spacing': 'error',
                'react/jsx-first-prop-new-line': ['error', 'multiprop'],
                'react/jsx-fragments': ['error', 'syntax'],
                'react/jsx-handler-names': ['error', { checkInlineFunction: true }],
                'react/jsx-indent': [
                    'error',
                    4,
                    {
                        checkAttributes: true,
                        indentLogicalExpressions: true
                    }
                ],
                'react/jsx-indent-props': 'error',
                'react/jsx-key': [
                    'error',
                    {
                        checkFragmentShorthand: true,
                        checkKeyMustBeforeSpread: true,
                        warnOnDuplicates: true
                    }
                ],
                'react/jsx-max-props-per-line': [
                    'error',
                    {
                        maximum: {
                            single: 2,
                            multi: 1
                        }
                    }
                ],
                'react/jsx-no-bind': ['warn', { ignoreDOMComponents: true }],
                'react/jsx-no-constructed-context-values': 'error',
                'react/jsx-no-leaked-render': 'warn',
                'react/jsx-no-script-url': ['error', { includeFromSettings: true }],
                'react/jsx-props-no-spread-multi': 'error',
                'react/jsx-no-undef': 'off',
                'react/jsx-no-useless-fragment': 'error',
                'react/jsx-one-expression-per-line': ['error', { allow: 'non-jsx' }],
                'react/jsx-pascal-case': 'error',
                'react/jsx-tag-spacing': 'error',
                'react/jsx-uses-vars': 'off',
                'react/jsx-wrap-multilines': [
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
                'react/no-access-state-in-setstate': 'error',
                'react/no-array-index-key': 'error',
                'react/no-danger': 'error',
                'react/no-deprecated': 'error',
                'react/no-did-mount-set-state': 'error',
                'react/no-did-update-set-state': 'error',
                'react/no-object-type-as-default-prop': 'error',
                'react/no-redundant-should-component-update': 'error',
                'react/no-this-in-sfc': 'error',
                'react/no-typos': 'error',
                'react/no-unsafe': 'error',
                'react/no-unused-prop-types': 'error',
                'react/no-unused-state': 'error',
                'react/no-will-update-set-state': 'error',
                'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
                'react/prop-types': 'off',
                'react/self-closing-comp': [
                    'error',
                    {
                        component: true,
                        html: true
                    }
                ],
                'react/state-in-constructor': 'error',
                'react/void-dom-elements-no-children': 'error'
            }
        },
        {
            ...reactHooks.configs['recommended-latest'],
            files,
            languageOptions: {
                globals: {
                    ...globals.serviceworker,
                    ...globals.browser
                }
            }
        },
        {
            name: 'dtrw:react:ts',
            files: tsFiles,
            rules: { '@typescript-eslint/naming-convention': /** @type {any} */(['error']).concat(reactNamingRuleConfig) }
        },
        {
            name: 'dtrw:react:test',
            files: testFiles,
            rules: {
                'react-hooks/rules-of-hooks': 'off',
                'react/display-name': 'off'
            }
        }
    );
    const nextConfig = tseslint.config(
        {
            name: 'dtrw:react:next',
            files,
            plugins: { '@next/next': next },
            rules: { ...next.configs.recommended.rules }
        }
    );
    const a11yConfig = tseslint.config(
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
