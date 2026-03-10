/* eslint no-warning-comments: 1 */
import * as next from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

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
            plugins: { react },
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
            settings: {
                react: { version: 'detect' },
                linkComponents
            },
            rules: {
                ...react.configs.flat.recommended.rules,
                ...react.configs.flat['jsx-runtime'].rules,

                // JSX formatting rules migrated from eslint-plugin-react to @stylistic
                // see https://eslint.style/packages/default?filter=jsx
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
                '@stylistic/jsx-indent': [
                    'error',
                    4,
                    {
                        checkAttributes: true,
                        indentLogicalExpressions: true
                    }
                ],
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
                '@stylistic/jsx-pascal-case': 'error',
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

                // react/jsx rules NOT available in @stylistic (kept as react/ rules):
                //   react/jsx-boolean-value       - enforce boolean attribute notation
                //   react/jsx-filename-extension  - restrict file extensions that may contain JSX
                //   react/jsx-fragments           - enforce shorthand or standard form for React fragments
                //   react/jsx-handler-names       - enforce event handler naming conventions
                //   react/jsx-key                 - require key prop for elements in arrays/iterators
                //   react/jsx-max-depth           - enforce JSX maximum depth
                //   react/jsx-no-bind             - prevent usage of .bind() and arrow functions in JSX props
                //   react/jsx-no-comment-textnodes - prevent comments from being inserted as text nodes
                //   react/jsx-no-constructed-context-values - prevent construction of values passed through context
                //   react/jsx-no-duplicate-props  - prevent duplicate props in JSX
                //   react/jsx-no-leaked-render    - prevent problematic leaked values from being rendered
                //   react/jsx-no-literals         - prevent usage of string literals in JSX
                //   react/jsx-no-script-url       - prevent usage of javascript: URLs
                //   react/jsx-no-target-blank      - prevent target="_blank" without rel="noreferrer"
                //   react/jsx-no-undef            - disallow undeclared variables in JSX
                //   react/jsx-no-useless-fragment - disallow unnecessary fragments
                //   react/jsx-props-no-spread-multi - prevent spreading the same object multiple times
                //   react/jsx-props-no-spreading  - prevent JSX prop spreading
                //   react/jsx-sort-default-props  - enforce default props alphabetical sorting
                //   react/jsx-uses-react          - prevent React from being marked as unused
                //   react/jsx-uses-vars           - prevent variables used in JSX to be incorrectly marked as unused

                // @stylistic JSX rules exclusive to @stylistic (not in eslint-plugin-react) - already enabled above:
                //   @stylistic/jsx-function-call-newline - require a newline after each function call argument in JSX
                //   @stylistic/jsx-quotes              - enforce consistent use of quotes in JSX attributes
                //   @stylistic/jsx-self-closing-comp   - require self-closing on components/elements without children (replaces react/self-closing-comp)
                //
                // additional @stylistic JSX rules not currently enabled to consider:
                //   @stylistic/jsx-newline             - require or prevent a newline following a JSX element (also: react/jsx-newline)
                //   @stylistic/jsx-props-no-multi-spaces - disallow multiple spaces between inline JSX props (also: react/jsx-props-no-multi-spaces)
                //   @stylistic/jsx-sort-props          - enforce props alphabetical sorting (also: react/jsx-sort-props)

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
                'react/jsx-fragments': ['error', 'syntax'],
                'react/jsx-handler-names': ['error', { checkInlineFunction: true }],
                'react/jsx-key': [
                    'error',
                    {
                        checkFragmentShorthand: true,
                        checkKeyMustBeforeSpread: true,
                        warnOnDuplicates: true
                    }
                ],
                'react/jsx-no-bind': ['warn', { ignoreDOMComponents: true }],
                'react/jsx-no-constructed-context-values': 'error',
                'react/jsx-no-leaked-render': 'warn',
                'react/jsx-no-script-url': ['error', { includeFromSettings: true }],
                'react/jsx-props-no-spread-multi': 'error',
                'react/jsx-no-undef': 'off',
                'react/jsx-no-useless-fragment': 'error',
                'react/jsx-uses-vars': 'off',
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
                'react/state-in-constructor': 'error',
                'react/void-dom-elements-no-children': 'error'
            }
        },
        {
            ...reactHooks.configs.flat['recommended-latest'],
            name: 'dtrw:react:hooks',
            files
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
