import next from '@next/eslint-plugin-next';
import { defineFlatConfig } from 'eslint-define-config';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactConfigJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactConfigRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import { reactNamingRuleConfig } from './share/naming-config.js';


const linkComponents = [
    {
        name: 'Link',
        linkAttribute: 'to'
    },
    {
        name: 'NavLink',
        linkAttribute: 'to'
    }
];

const files = ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

/**
 * @param {Object} [config]
 * @param {boolean} [config.a11y] Include config for a11y
 * @param {boolean} [config.nextjs] Include config for next.js
 */
export function prepareConfig({ a11y = false, nextjs = false } = {}) {
    const baseConfig = defineFlatConfig([
        {
            files,
            ...reactConfigRecommended
        },
        {
            files,
            ...reactConfigJsxRuntime
        },
        {
            files,
            languageOptions: {
                globals: {
                    ...globals.serviceworker,
                    ...globals.browser
                }
            },
            plugins: { 'react-hooks': reactHooks },
            rules: reactHooks.configs.recommended.rules
        },
        {
            files,
            settings: {
                react: { version: 'detect' },
                linkComponents
            },
            rules: {
                'jsx-quotes': ['error', 'prefer-double'],

                'react/button-has-type': 'warn',
                'react/hook-use-state': 'error',
                'react/iframe-missing-sandbox': 'error',
                'react/jsx-boolean-value': 'error',
                'react/jsx-child-element-spacing': 'error',
                'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
                'react/jsx-closing-tag-location': 'error',
                'react/jsx-curly-brace-presence': 'error',
                'react/jsx-curly-newline': ['error', {
                    multiline: 'forbid',
                    singleline: 'forbid'
                }],
                'react/jsx-curly-spacing': ['error', {
                    when: 'never',
                    allowMultiline: false,
                    attributes: { when: 'never' },
                    children: { when: 'never' }
                }],
                'react/jsx-equals-spacing': 'error',
                'react/jsx-first-prop-new-line': 'error',
                'react/jsx-fragments': ['error', 'syntax'],
                'react/jsx-handler-names': ['error', { checkInlineFunction: true }],
                'react/jsx-indent': ['error', 4, {
                    checkAttributes: true,
                    indentLogicalExpressions: true
                }],
                'react/jsx-indent-props': 'error',
                'react/jsx-key': ['error', {
                    checkFragmentShorthand: true,
                    checkKeyMustBeforeSpread: true,
                    warnOnDuplicates: true
                }],
                'react/jsx-max-props-per-line': ['error', {
                    maximum: {
                        single: 2,
                        multi: 1
                    }
                }],
                'react/jsx-no-bind': ['warn', { ignoreDOMComponents: true }],
                'react/jsx-no-constructed-context-values': 'error',
                'react/jsx-no-leaked-render': 'warn',
                'react/jsx-no-script-url': ['error', linkComponents.map(comp => ({ name: comp.name, props: [comp.linkAttribute] }))],
                'react/jsx-no-undef': 'off',
                'react/jsx-no-useless-fragment': 'error',
                'react/jsx-pascal-case': 'error',
                'react/jsx-tag-spacing': 'error',
                'react/jsx-uses-vars': 'off',
                'react/jsx-wrap-multilines': ['error', {
                    declaration: 'parens-new-line',
                    assignment: 'parens-new-line',
                    return: 'parens-new-line',
                    arrow: 'parens-new-line',
                    condition: 'parens-new-line',
                    logical: 'parens-new-line',
                    prop: 'parens-new-line'
                }],
                'react/no-access-state-in-setstate': 'error',
                'react/no-array-index-key': 'error',
                'react/no-danger': 'error',
                'react/no-did-mount-set-state': 'error',
                'react/no-did-update-set-state': 'error',
                'react/no-redundant-should-component-update': 'error',
                'react/no-this-in-sfc': 'error',
                'react/no-typos': 'error',
                'react/no-unsafe': 'error',
                'react/no-unused-prop-types': 'error',
                'react/no-unused-state': 'error',
                'react/no-will-update-set-state': 'error',
                'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
                'react/prop-types': 'off',
                'react/self-closing-comp': ['error', {
                    component: true,
                    html: true
                }],
                'react/state-in-constructor': 'error',
                'react/void-dom-elements-no-children': 'error'
            }
        },
        {
            files: ['**/*.{ts,cts,mts,tsx}'],
            rules: { '@typescript-eslint/naming-convention': /** @type {any} */(['error']).concat(reactNamingRuleConfig) }
        }
    ]);
    const nextConfig = defineFlatConfig([
        {
            files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
            plugins: { '@next/next': next },
            rules: { ...next.configs.recommended.rules }
        }
    ]);
    const a11yConfig = defineFlatConfig([
        {
            files: ['**/*.{jsx,tsx}'],
            plugins: { 'jsx-a11y': jsxA11y },
            rules: { ...jsxA11y.configs.recommended.rules }
        }
    ]);

    const result = [...baseConfig];
    if (nextjs) {
        result.push(...nextConfig);
    }
    if (a11y) {
        result.push(...a11yConfig);
    }

    return result;
}
