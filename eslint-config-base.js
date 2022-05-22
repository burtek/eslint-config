const makeNamingRules = require('./helpers/make-naming-config');

// need no-splice-add and no-splice-remove

module.exports = {
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:import/typescript'
    ],
    plugins: [
        '@typescript-eslint',
        'import',
        'jest',
        'jest-formatting',
        'jsonc',
        'promise'
    ],
    env: {
        es2020: true
    },
    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx']
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            rules: {
                '@typescript-eslint/adjacent-overload-signatures': 'error',
                '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
                '@typescript-eslint/await-thenable': 'error',
                '@typescript-eslint/ban-ts-comment': 'error',
                '@typescript-eslint/ban-types': 'error',
                '@typescript-eslint/consistent-indexed-object-style': 'error',
                '@typescript-eslint/consistent-type-assertions': ['error', {
                    'assertionStyle': 'as',
                    'objectLiteralTypeAssertions': 'allow-as-parameter'
                }],
                '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
                '@typescript-eslint/consistent-type-imports': 'error',
                '@typescript-eslint/explicit-member-accessibility': ['error', {
                    'accessibility': 'no-public'
                }],
                '@typescript-eslint/member-delimiter-style': 'error',
                '@typescript-eslint/member-ordering': ['error', {
                    'default': {
                        'memberTypes': [
                            'public-static-field',
                            'protected-static-field',
                            'private-static-field',
                            'public-field',
                            'protected-field',
                            'private-field',

                            'constructor',

                            'public-method',
                            'protected-method',
                            'private-method',
                            'public-static-method',
                            'protected-static-method',
                            'private-static-method'
                        ],
                        'order': 'alphabetically-case-insensitive'
                    }
                }],
                '@typescript-eslint/method-signature-style': 'error',
                'camelcase': 'off',
                '@typescript-eslint/naming-convention': makeNamingRules(),
                '@typescript-eslint/no-base-to-string': 'error',
                '@typescript-eslint/no-confusing-non-null-assertion': 'error',
                '@typescript-eslint/no-confusing-void-expression': 'error',
                '@typescript-eslint/no-empty-interface': 'error',
                '@typescript-eslint/no-explicit-any': 'error',
                '@typescript-eslint/no-extra-non-null-assertion': 'error',
                '@typescript-eslint/no-extraneous-class': 'error',
                '@typescript-eslint/no-floating-promises': 'error',
                '@typescript-eslint/no-implicit-any-catch': 'error',
                '@typescript-eslint/no-invalid-void-type': 'error',
                '@typescript-eslint/no-misused-new': 'error',
                '@typescript-eslint/no-misused-promises': [
                    'error',
                    {
                        'checksVoidReturn': false
                    }
                ],
                '@typescript-eslint/no-namespace': 'error',
                '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
                '@typescript-eslint/no-non-null-assertion': 'error',
                '@typescript-eslint/no-require-imports': 'error',
                '@typescript-eslint/no-type-alias': ['error', {
                    'allowAliases': 'in-unions-and-intersections',
                    'allowCallbacks': 'always',
                    'allowConditionalTypes': 'always',
                    'allowConstructors': 'always',
                    'allowGenerics': 'always',
                    'allowLiterals': 'in-unions-and-intersections',
                    'allowMappedTypes': 'always',
                    'allowTupleTypes': 'always'
                }],
                '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
                '@typescript-eslint/no-unnecessary-condition': ['error', {
                    'allowConstantLoopConditions': true
                }],
                '@typescript-eslint/no-unnecessary-type-arguments': 'error',
                '@typescript-eslint/no-unnecessary-type-assertion': 'error',
                '@typescript-eslint/no-unnecessary-type-constraint': 'error',
                '@typescript-eslint/no-unsafe-assignment': 'error',
                '@typescript-eslint/no-unsafe-call': 'error',
                '@typescript-eslint/no-unsafe-member-access': 'error',
                '@typescript-eslint/no-unsafe-return': 'error',
                '@typescript-eslint/no-var-requires': 'error',
                '@typescript-eslint/prefer-enum-initializers': 'error',
                '@typescript-eslint/prefer-for-of': 'error',
                '@typescript-eslint/prefer-function-type': 'error',
                '@typescript-eslint/prefer-includes': 'error',
                '@typescript-eslint/prefer-literal-enum-member': 'error',
                '@typescript-eslint/prefer-nullish-coalescing': ['error'],
                '@typescript-eslint/prefer-optional-chain': 'error',
                '@typescript-eslint/prefer-readonly': 'error',
                '@typescript-eslint/prefer-reduce-type-parameter': 'error',
                '@typescript-eslint/prefer-regexp-exec': 'warn',
                '@typescript-eslint/prefer-string-starts-ends-with': 'error',
                '@typescript-eslint/prefer-ts-expect-error': 'error',
                '@typescript-eslint/restrict-plus-operands': 'error',
                '@typescript-eslint/restrict-template-expressions': 'error',
                '@typescript-eslint/strict-boolean-expressions': 'error',
                '@typescript-eslint/switch-exhaustiveness-check': 'error',
                '@typescript-eslint/type-annotation-spacing': 'error',

                'brace-style': 'off',
                'comma-dangle': 'off',
                'comma-spacing': 'off',
                'dot-notation': 'off',
                'func-call-spacing': 'off',
                'indent': 'off',
                'keyword-spacing': 'off',
                'lines-between-class-members': 'off',
                'no-array-constructor': 'off',
                'no-dupe-class-members': 'off',
                'no-empty-function': 'off',
                'no-extra-parens': 'off',
                'no-extra-semi': 'off',
                'no-implied-eval': 'off',
                'no-invalid-this': 'off',
                'no-loop-func': 'off',
                'no-loss-of-precision': 'off',
                'no-magic-numbers': 'off',
                'no-redeclare': 'off',
                'no-shadow': 'off',
                'no-throw-literal': 'off',
                'no-unused-expressions': 'off',
                'no-unused-vars': 'off',
                'no-use-before-define': 'off',
                'no-useless-constructor': 'off',
                'quotes': 'off',
                'require-await': 'off',
                'no-return-await': 'off',
                'semi': 'off',
                'space-before-blocks': 'off',
                'space-before-function-paren': 'off',

                '@typescript-eslint/brace-style': 'error',
                '@typescript-eslint/comma-dangle': 'error',
                '@typescript-eslint/comma-spacing': 'error',
                '@typescript-eslint/dot-notation': 'error',
                '@typescript-eslint/func-call-spacing': 'error',
                '@typescript-eslint/indent': 'error',
                '@typescript-eslint/keyword-spacing': 'error',
                '@typescript-eslint/lines-between-class-members': 'error',
                '@typescript-eslint/no-array-constructor': 'error',
                '@typescript-eslint/no-dupe-class-members': 'error',
                '@typescript-eslint/no-duplicate-enum-values': 'error',
                '@typescript-eslint/no-empty-function': ['error', {
                    'allow': [
                        'private-constructors',
                        'protected-constructors',
                        'decoratedFunctions',
                        'overrideMethods'
                    ]
                }],
                '@typescript-eslint/no-extra-parens': ['error', 'all', {
                    'enforceForArrowConditionals': false,
                    'enforceForSequenceExpressions': false,
                    'enforceForFunctionPrototypeMethods': false,
                    'ignoreJSX': 'multi-line',
                    'nestedBinaryExpressions': false
                }],
                '@typescript-eslint/no-extra-semi': 'error',
                '@typescript-eslint/no-implied-eval': 'error',
                '@typescript-eslint/no-invalid-this': 'error',
                '@typescript-eslint/no-loop-func': 'error',
                '@typescript-eslint/no-loss-of-precision': 'warn',
                '@typescript-eslint/no-magic-numbers': ['warn', {
                    'ignoreArrayIndexes': true,
                    'ignoreDefaultValues': true,
                    'ignoreEnums': true,
                    'ignoreNumericLiteralTypes': true,
                    'ignoreReadonlyClassProperties': true,
                    'ignoreTypeIndexes': true
                }],
                '@typescript-eslint/no-redeclare': 'error',
                '@typescript-eslint/no-redundant-type-constituents': 'error',
                '@typescript-eslint/no-shadow': 'error',
                '@typescript-eslint/no-throw-literal': 'error',
                '@typescript-eslint/no-unused-expressions': 'error',
                '@typescript-eslint/no-unused-vars': ['error', {
                    argsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    ignoreRestSiblings: true
                }],
                '@typescript-eslint/no-use-before-define': ['error', {
                    'functions': false,
                    'classes': true,
                    'variables': true,
                    'enums': true,
                    'typedefs': false,
                    'ignoreTypeReferences': false
                }],
                '@typescript-eslint/no-useless-constructor': 'error',
                '@typescript-eslint/no-useless-empty-export': 'error',
                '@typescript-eslint/parameter-properties': ['error', { 'prefer': 'parameter-property' }],
                '@typescript-eslint/quotes': ['error', 'single'],
                '@typescript-eslint/require-await': 'error',
                '@typescript-eslint/return-await': 'error',
                '@typescript-eslint/semi': 'error',
                '@typescript-eslint/space-before-blocks': 'error',
                '@typescript-eslint/space-before-function-paren': ['error', {
                    'anonymous': 'never',
                    'named': 'never',
                    'asyncArrow': 'always'
                }]
            }
        },
        {
            files: ['*.test.js', '*.test.jsx', '*.test.ts', '*.test.tsx', '**/__mocks__/**/*'],
            env: {
                jest: true,
                node: true
            },
            rules: {
                'no-console': 'off',
                'no-magic-numbers': 'off',
                'no-redeclare': 'off'
            },
            overrides: [
                {
                    files: ['*.ts', '*.tsx'],
                    rules: {
                        '@typescript-eslint/no-explicit-any': 'off',
                        '@typescript-eslint/no-magic-numbers': 'off',
                        '@typescript-eslint/no-redeclare': 'off',
                        '@typescript-eslint/no-unsafe-assignment': 'off'
                    }
                },
                {
                    files: ['*.test.*'],
                    extends: [
                        'plugin:jest-formatting/strict',
                        'plugin:jest/recommended',
                        'plugin:jest/style'
                    ],
                    rules: {
                        'jest/consistent-test-it': 'error',
                        'jest/no-conditional-in-test': 'error',
                        'jest/no-duplicate-hooks': 'error',
                        'jest/no-test-return-statement': 'error',
                        'jest/prefer-hooks-on-top': 'error',
                        'jest/prefer-strict-equal': 'error',
                        'jest/prefer-todo': 'error'
                    }
                }
            ]
        },
        {
            files: ['*.json', '*.json5', '*.jsonc'],
            parser: 'jsonc-eslint-parser',
            overrides: [
                {
                    files: ['*.json'],
                    excludedFiles: ['tsconfig.json', 'jsconfig.json'],
                    extends: ['plugin:jsonc/recommended-with-json']
                },
                {
                    files: ['*.jsonc', 'tsconfig.json', 'jsconfig.json'],
                    extends: ['plugin:jsonc/recommended-with-jsonc']
                },
                {
                    files: ['*.json5'],
                    extends: ['plugin:jsonc/recommended-with-json5']
                }
            ]
        }
    ],
    reportUnusedDisableDirectives: true,
    rules: {
        'for-direction': 'error',
        'getter-return': 'error',
        'no-async-promise-executor': 'error',
        'no-await-in-loop': 'error',
        'no-compare-neg-zero': 'error',
        'no-cond-assign': ['error', 'always'],
        'no-console': 'error',
        'no-constant-binary-expression': 'error',
        'no-constant-condition': 'error',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-dupe-args': 'error',
        'no-dupe-else-if': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-empty': 'error',
        'no-empty-character-class': 'error',
        'no-ex-assign': 'error',
        'no-extra-boolean-cast': 'error',
        'no-extra-parens': ['error', 'all', {
            'enforceForArrowConditionals': false,
            'enforceForSequenceExpressions': false,
            'enforceForFunctionPrototypeMethods': false
        }],
        'no-extra-semi': 'error',
        'no-func-assign': 'error',
        'no-import-assign': 'error',
        'no-inner-declarations': 'error',
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': 'error',
        'no-loss-of-precision': 'warn',
        'no-misleading-character-class': 'error',
        'no-obj-calls': 'error',
        'no-promise-executor-return': 'error',
        'no-regex-spaces': 'error',
        'no-setter-return': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'warn',
        'no-unexpected-multiline': 'error',
        'no-unreachable': 'error',
        'no-unreachable-loop': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'require-atomic-updates': 'error',
        'use-isnan': 'error',
        'valid-typeof': ['error', {
            'requireStringLiterals': true
        }],
        'array-callback-return': 'error',
        'consistent-return': 'error',
        'curly': 'error',
        'default-case': 'error',
        'default-case-last': 'error',
        'dot-location': ['error', 'property'],
        'dot-notation': 'error',
        'eqeqeq': 'error',
        'grouped-accessor-pairs': 'error',
        'guard-for-in': 'error',
        'no-alert': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-constructor-return': 'error',
        'no-div-regex': 'error',
        'no-else-return': 'error',
        'no-empty-function': 'error',
        'no-empty-pattern': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-fallthrough': 'error',
        'no-floating-decimal': 'error',
        'no-global-assign': 'error',
        'no-implicit-coercion': 'error',
        'no-implied-eval': 'error',
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-loop-func': 'error',
        'no-magic-numbers': 'warn',
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-nonoctal-decimal-escape': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': 'error',
        'no-redeclare': 'error',
        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-script-url': 'error',
        'no-self-assign': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-throw-literal': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-concat': 'error',
        'no-useless-escape': 'error',
        'no-useless-return': 'error',
        'no-void': 'error',
        'no-warning-comments': 'error',
        'no-with': 'error',
        'prefer-promise-reject-errors': ['error', {
            'allowEmptyReject': true
        }],
        'prefer-regex-literals': ['error', {
            'disallowRedundantWrapping': true
        }],
        'radix': 'error',
        'require-await': 'error',
        'yoda': ['error', 'never', {
            'exceptRange': true
        }],
        'no-delete-var': 'error',
        'no-shadow': 'error',
        'no-shadow-restricted-names': 'error',
        'no-undef': 'error',
        'no-undef-init': 'error',
        'no-unused-vars': ['error', {
            argsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            ignoreRestSiblings: true
        }],
        'no-use-before-define': ['error', {
            'functions': false,
            'classes': true,
            'variables': true
        }],
        'array-bracket-newline': ['error', 'consistent'],
        'array-bracket-spacing': 'error',
        'array-element-newline': ['error', 'consistent'],
        'block-spacing': 'error',
        'brace-style': 'error',
        'camelcase': 'error',
        'comma-dangle': 'error',
        'comma-spacing': 'error',
        'comma-style': 'error',
        'computed-property-spacing': 'error',
        'eol-last': 'error',
        'func-call-spacing': 'error',
        'func-names': 'error',
        'func-style': ['error', 'declaration', {
            'allowArrowFunctions': true
        }],
        'function-call-argument-newline': ['error', 'consistent'],
        'function-paren-newline': ['error', 'consistent'],
        'implicit-arrow-linebreak': 'error',
        'indent': ['error', 4],
        'key-spacing': 'error',
        'keyword-spacing': 'error',
        'linebreak-style': ['error', 'unix'],
        'lines-between-class-members': 'error',
        'max-len': ['error', {
            'code': 150,
            'ignoreRegExpLiterals': true
        }],
        'max-statements-per-line': 'error',
        'multiline-comment-style': 'error',
        'multiline-ternary': ['error', 'never'],
        'new-cap': 'error',
        'newline-per-chained-call': 'error',
        'no-array-constructor': 'error',
        'no-continue': 'error',
        'no-lonely-if': 'error',
        'no-mixed-operators': 'off', // need to make better config or make own custom rule
        'no-multi-assign': 'error',
        'no-multiple-empty-lines': ['error', {
            'max': 2
        }],
        'no-negated-condition': 'error',
        'no-nested-ternary': 'warn',
        'no-new-object': 'error',
        'no-trailing-spaces': 'error',
        'no-whitespace-before-property': 'error',
        'object-curly-newline': ['error', {
            'ObjectExpression': {
                'minProperties': 2,
                'consistent': true
            },
            'ObjectPattern': {
                'multiline': true
            },
            'ImportDeclaration': {
                'multiline': true
            },
            'ExportDeclaration': {
                'multiline': true,
                'minProperties': 3,
                'consistent': true
            }
        }],
        'object-curly-spacing': ['error', 'always'],
        'one-var': ['error', {
            'initialized': 'never',
            'uninitialized': 'consecutive'
        }],
        'operator-assignment': 'error',
        'padded-blocks': ['error', 'never'],
        'prefer-exponentiation-operator': 'error',
        'prefer-object-spread': 'error',
        'quote-props': ['error', 'consistent-as-needed'],
        'quotes': ['error', 'single'],
        'semi': 'error',
        'semi-spacing': 'error',
        'semi-style': 'error',
        'space-before-blocks': 'error',
        'space-before-function-paren': ['error', {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always'
        }],
        'space-in-parens': 'error',
        'spaced-comment': 'error',
        'switch-colon-spacing': 'error',
        'template-tag-spacing': 'error',
        'arrow-body-style': 'error',
        'arrow-parens': ['error', 'as-needed'],
        'arrow-spacing': 'error',
        'constructor-super': 'error',
        'generator-star-spacing': ['error', 'after'],
        'no-class-assign': 'error',
        'no-confusing-arrow': 'error',
        'no-const-assign': 'error',
        'no-dupe-class-members': 'error',
        'no-new-symbol': 'error',
        'no-this-before-super': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-destructuring': 'error',
        'prefer-numeric-literals': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'require-yield': 'error',
        'rest-spread-spacing': 'error',
        'symbol-description': 'error',
        'template-curly-spacing': 'error',
        'yield-star-spacing': ['error', 'after'],

        'import/default': 'error',
        'import/export': 'error',
        'import/first': 'error',
        'import/namespace': 'error',
        'import/newline-after-import': 'error',
        'import/no-cycle': 'error',
        'import/no-deprecated': 'warn',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-as-default': 'warn',
        'import/no-named-as-default-member': 'warn',
        'import/no-self-import': 'error',
        'import/order': ['error', {
            'groups': [
                'builtin',
                'external',
                ['parent', 'sibling'],
                'index'
            ],
            'newlines-between': 'always',
            'alphabetize': {
                'order': 'asc'
            }
        }],

        'promise/prefer-await-to-then': 'error',
        'promise/prefer-await-to-callbacks': 'error'
    }
};
