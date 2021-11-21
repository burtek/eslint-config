const linkComponents = [
    {
        'name': 'Link', 'linkAttribute': 'to'
    },
    {
        'name': 'NavLink', 'linkAttribute': 'to'
    }
];

module.exports = {
    extends: [
        'plugin:react-hooks/recommended',
        './eslint-config-base.js'
    ],
    plugins: [
        'react',
        'react-hooks'
    ],
    env: {
        browser: true
    },
    settings: {
        react: {
            version: 'detect'
        },
        linkComponents: linkComponents
    },
    rules: {
        'react/button-has-type': 'error',
        'react/display-name': 'error',
        'react/no-access-state-in-setstate': 'error',
        'react/no-array-index-key': 'error',
        'react/no-children-prop': 'error',
        'react/no-danger': 'error',
        'react/no-danger-with-children': 'error',
        'react/no-deprecated': 'error',
        'react/no-did-mount-set-state': 'error',
        'react/no-did-update-set-state': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-is-mounted': 'error',
        'react/no-redundant-should-component-update': 'error',
        'react/no-render-return-value': 'error',
        'react/no-string-refs': 'error',
        'react/no-this-in-sfc': 'error',
        'react/no-typos': 'error',
        'react/no-unescaped-entities': 'error',
        'react/no-unsafe': 'error',
        'react/no-unused-prop-types': 'error',
        'react/no-unused-state': 'error',
        'react/no-will-update-set-state': 'error',
        'react/prefer-stateless-function': ['error', {
            'ignorePureComponents': true
        }],
        'react/require-render-return': 'error',
        'react/self-closing-comp': ['error', {
            'component': true,
            'html': true
        }],
        'react/state-in-constructor': 'error',
        'react/void-dom-elements-no-children': 'error'
    },
    overrides: [
        {
            files: ['*.tsx'],
            rules: {
                '@typescript-eslint/naming-convention': ['error',
                    {
                        'selector': 'default',
                        'format': ['camelCase'],
                        'leadingUnderscore': 'forbid',
                        'trailingUnderscore': 'forbid'
                    },
                    {
                        'selector': 'variable',
                        'modifiers': ['const', 'global'],
                        'format': ['camelCase', 'UPPER_CASE']
                    },
                    {
                        'selector': 'variable',
                        'modifiers': ['const', 'global', 'exported'],
                        'types': ['function'],
                        'format': ['camelCase', 'UPPER_CASE', 'PascalCase']
                    },
                    {
                        'selector': 'variable',
                        'modifiers': ['const', 'global', 'exported'],
                        'types': ['function'],
                        'filter': '^use',
                        'format': ['camelCase']
                    },
                    {
                        'selector': 'function',
                        'modifiers': ['global'],
                        'format': ['camelCase', 'PascalCase']
                    },
                    {
                        'selector': 'function',
                        'filter': '^use',
                        'format': ['camelCase']
                    },
                    {
                        'selector': 'parameter',
                        'modifiers': ['unused'],
                        'leadingUnderscore': 'allow',
                        'format': null
                    },
                    {
                        'selector': 'enumMember',
                        'format': ['UPPER_CASE']
                    },
                    {
                        'selector': 'typeLike',
                        'format': ['PascalCase']
                    }]
            }
        },
        {
            files: ['*.jsx', '*.tsx'],
            rules: {
                'react/jsx-boolean-value': 'error',
                'react/jsx-child-element-spacing': 'error',
                'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
                'react/jsx-closing-tag-location': 'error',
                'react/jsx-curly-brace-presence': 'error',
                'react/jsx-curly-newline': ['error', {
                    'multiline': 'require',
                    'singleline': 'forbid'
                }],
                'react/jsx-curly-spacing': ['error', {
                    'when': 'never',
                    'allowMultiline': false,
                    'attributes': { 'when': 'never' },
                    'children': { 'when': 'never' }
                }],
                'react/jsx-equals-spacing': 'error',
                'react/jsx-first-prop-new-line': 'error',
                'react/jsx-fragments': ['error', 'element'],
                'react/jsx-handler-names': ['error', {
                    'checkInlineFunction': true
                }],
                'react/jsx-indent': ['error', 4, {
                    'checkAttributes': true,
                    'indentLogicalExpressions': true
                }],
                'react/jsx-indent-props': 'error',
                'react/jsx-key': ['error', {
                    'checkFragmentShorthand': true,
                    'checkKeyMustBeforeSpread': true
                }],
                'react/jsx-max-props-per-line': 'error',
                'react/jsx-no-bind': 'error',
                'react/jsx-no-comment-textnodes': 'error',
                'react/jsx-no-constructed-context-values': 'error',
                'react/jsx-no-duplicate-props': 'error',
                'react/jsx-no-script-url': ['error', linkComponents.map(function map(comp) {
                    return {
                        name: comp.name, props: [comp.linkAttribute]
                    };
                })],
                'react/jsx-no-target-blank': 'error',
                'react/jsx-no-useless-fragment': 'error',
                'react/jsx-one-expression-per-line': ['error', {
                    'allow': 'literal'
                }],
                'react/jsx-pascal-case': 'error',
                'react/jsx-space-before-closing': 'error',
                'react/jsx-tag-spacing': 'error',
                'react/jsx-wrap-multilines': ['error', {
                    'declaration': 'parens-new-line',
                    'assignment': 'parens-new-line',
                    'return': 'parens-new-line',
                    'arrow': 'parens-new-line',
                    'condition': 'parens-new-line',
                    'logical': 'parens-new-line',
                    'prop': 'parens-new-line'
                }]
            }
        }
    ]
};
