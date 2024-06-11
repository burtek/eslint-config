import stylisticPlugin from '@stylistic/eslint-plugin';
import * as importPlugin from 'eslint-plugin-import-x';
import promise from 'eslint-plugin-promise';
import tseslint from 'typescript-eslint';

import { baseNamingRuleConfig } from './share/naming-config.js';


// eslint-disable-next-line no-warning-comments
// TODO: need no-splice-add and no-splice-remove

const allFiles = ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];
const tsFiles = ['**/*.{ts,cts,mts,tsx}'];

const allImportExtensions = ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.cts', '.mts', '.tsx'];

export function prepareConfig() {
    return tseslint.config(
        { plugins: { '@stylistic': /** @type {Pick<typeof stylisticPlugin, 'rules'>} */(stylisticPlugin) } },
        {
            name: 'dtrw:base:base',
            files: allFiles,
            linterOptions: { reportUnusedDisableDirectives: true },
            settings: {
                ...importPlugin.configs.typescript.settings,
                'import-x/extensions': allImportExtensions,
                'import-x/parsers': { '@typescript-eslint/parser': allImportExtensions },
                'import-x/resolver': {
                    node: { extensions: allImportExtensions },
                    typescript: true
                }
            },
            plugins: {
                'import-x': importPlugin,
                promise
            },
            rules: {
                'accessor-pairs': 'error',
                'array-callback-return': 'error',
                'arrow-body-style': 'error',
                'block-spacing': 'error',
                'brace-style': 'error',
                'camelcase': 'error',
                'consistent-return': 'error',
                'constructor-super': 'error',
                'curly': 'error',
                'default-case': 'error',
                'default-case-last': 'error',
                'dot-notation': 'error',
                'eqeqeq': 'error',
                'for-direction': 'error',
                'func-names': 'error',
                'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
                'getter-return': 'error',
                'grouped-accessor-pairs': 'error',
                'guard-for-in': 'error',
                'new-cap': 'error',
                'no-alert': 'error',
                'no-array-constructor': 'error',
                'no-async-promise-executor': 'error',
                'no-await-in-loop': 'error',
                'no-caller': 'error',
                'no-case-declarations': 'error',
                'no-class-assign': 'error',
                'no-compare-neg-zero': 'error',
                'no-cond-assign': ['error', 'always'],
                'no-console': 'error',
                'no-const-assign': 'error',
                'no-constant-binary-expression': 'error',
                'no-constant-condition': 'error',
                'no-constructor-return': 'error',
                'no-continue': 'error',
                'no-control-regex': 'error',
                'no-debugger': 'error',
                'no-delete-var': 'error',
                'no-div-regex': 'error',
                'no-dupe-args': 'error',
                'no-dupe-class-members': 'error',
                'no-dupe-else-if': 'error',
                'no-dupe-keys': 'error',
                'no-duplicate-case': 'error',
                'no-else-return': 'error',
                'no-empty': ['error', { allowEmptyCatch: true }],
                'no-empty-character-class': 'error',
                'no-empty-function': 'error',
                'no-empty-pattern': 'error',
                'no-empty-static-block': 'error',
                'no-eval': 'error',
                'no-ex-assign': 'error',
                'no-extend-native': 'error',
                'no-extra-bind': 'error',
                'no-extra-boolean-cast': 'error',
                'no-fallthrough': ['error', { allowEmptyCase: true }],
                'no-func-assign': 'error',
                'no-global-assign': 'error',
                'no-implicit-coercion': ['error', { allow: ['!!'] }],
                'no-implied-eval': 'error',
                'no-import-assign': 'error',
                'no-inner-declarations': 'error',
                'no-invalid-regexp': 'error',
                'no-invalid-this': 'error',
                'no-irregular-whitespace': 'error',
                'no-iterator': 'error',
                'no-labels': 'error',
                'no-lone-blocks': 'error',
                'no-lonely-if': 'error',
                'no-loop-func': 'error',
                'no-loss-of-precision': 'warn',
                'no-magic-numbers': [
                    'warn',
                    {
                        enforceConst: true,
                        ignoreArrayIndexes: true,
                        ignoreClassFieldInitialValues: true,
                        ignoreDefaultValues: true
                    }
                ],
                'no-misleading-character-class': 'error',
                'no-multi-assign': 'error',
                'no-multi-str': 'error',
                'no-negated-condition': 'error',
                'no-nested-ternary': 'warn',
                'no-new': 'error',
                'no-new-func': 'error',
                'no-new-native-nonconstructor': 'error',
                'no-new-wrappers': 'error',
                'no-nonoctal-decimal-escape': 'error',
                'no-obj-calls': 'error',
                'no-object-constructor': 'error',
                'no-octal': 'error',
                'no-octal-escape': 'error',
                'no-param-reassign': 'error',
                'no-promise-executor-return': 'error',
                'no-redeclare': 'error',
                'no-regex-spaces': 'error',
                'no-return-assign': 'error',
                'no-script-url': 'error',
                'no-self-assign': 'error',
                'no-self-compare': 'error',
                'no-sequences': 'error',
                'no-setter-return': 'error',
                'no-shadow': 'error',
                'no-shadow-restricted-names': 'error',
                'no-sparse-arrays': 'error',
                'no-template-curly-in-string': 'warn',
                'no-this-before-super': 'error',
                'no-throw-literal': 'error',
                'no-undef': 'error',
                'no-undef-init': 'error',
                'no-unexpected-multiline': 'error',
                'no-unmodified-loop-condition': 'error',
                'no-unreachable': 'error',
                'no-unreachable-loop': 'error',
                'no-unsafe-finally': 'error',
                'no-unsafe-negation': 'error',
                'no-unused-expressions': 'error',
                'no-unused-labels': 'error',
                'no-unused-vars': [
                    'error',
                    {
                        argsIgnorePattern: '^_',
                        destructuredArrayIgnorePattern: '^_',
                        ignoreRestSiblings: true
                    }
                ],
                'no-use-before-define': ['error', { classes: true, functions: false, variables: true }],
                'no-useless-call': 'error',
                'no-useless-catch': 'error',
                'no-useless-computed-key': 'error',
                'no-useless-concat': 'error',
                'no-useless-constructor': 'error',
                'no-useless-escape': 'error',
                'no-useless-rename': 'error',
                'no-useless-return': 'error',
                'no-var': 'error',
                'no-void': ['error', { allowAsStatement: true }],
                'no-warning-comments': 'error',
                'no-with': 'error',
                'object-shorthand': 'error',
                'one-var': ['error', 'never'],
                'operator-assignment': 'error',
                'prefer-arrow-callback': 'error',
                'prefer-const': 'error',
                'prefer-destructuring': 'error',
                'prefer-exponentiation-operator': 'error',
                'prefer-numeric-literals': 'error',
                'prefer-object-spread': 'error',
                'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
                'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
                'prefer-rest-params': 'error',
                'prefer-spread': 'error',
                'prefer-template': 'error',
                'radix': 'error',
                'require-atomic-updates': 'error',
                'require-await': 'error',
                'require-yield': 'error',
                'symbol-description': 'error',
                'use-isnan': 'error',
                'valid-typeof': ['error', { requireStringLiterals: true }],
                'yoda': ['error', 'never', { exceptRange: true }],

                ...importPlugin.configs.recommended.rules,
                'import-x/no-unresolved': 'off',
                'import-x/named': 'off',
                'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
                'import-x/first': 'error',
                'import-x/newline-after-import': [
                    'error',
                    {
                        considerComments: true,
                        count: 2
                    }
                ],
                'import-x/no-anonymous-default-export': 'error',
                'import-x/no-cycle': 'error',
                'import-x/no-deprecated': 'warn',
                'import-x/no-duplicates': 'error',
                'import-x/no-empty-named-blocks': 'error',
                'import-x/no-mutable-exports': 'error',
                'import-x/no-self-import': 'error',
                'import-x/order': [
                    'error',
                    {
                        'groups': [
                            'builtin',
                            'external',
                            'internal',
                            'parent',
                            ['index', 'sibling']
                        ],
                        'newlines-between': 'always',
                        'alphabetize': {
                            order: 'asc',
                            orderImportKind: 'asc'
                        }
                    }
                ],

                'promise/no-multiple-resolved': 'error',
                'promise/prefer-await-to-callbacks': 'error',
                'promise/prefer-await-to-then': 'error',

                '@stylistic/array-bracket-newline': 'error',
                '@stylistic/array-bracket-spacing': ['error', 'never'],
                '@stylistic/array-element-newline': ['error', { consistent: true, multiline: true }],
                '@stylistic/arrow-parens': ['error', 'as-needed'],
                '@stylistic/arrow-spacing': 'error',
                '@stylistic/block-spacing': 'error',
                '@stylistic/brace-style': 'error',
                '@stylistic/comma-dangle': 'error',
                '@stylistic/comma-spacing': 'error',
                '@stylistic/comma-style': 'error',
                '@stylistic/computed-property-spacing': ['error', 'never', { enforceForClassMembers: true }],
                '@stylistic/dot-location': ['error', 'property'],
                '@stylistic/eol-last': 'error',
                '@stylistic/func-call-spacing': 'error',
                '@stylistic/function-call-argument-newline': ['error', 'consistent'],
                '@stylistic/function-call-spacing': 'error',
                '@stylistic/function-paren-newline': ['error', 'consistent'],
                '@stylistic/generator-star-spacing': ['error', 'after'],
                '@stylistic/indent': ['error', 4],
                '@stylistic/indent-binary-ops': ['error', 4],
                '@stylistic/key-spacing': 'error',
                '@stylistic/keyword-spacing': 'error',
                '@stylistic/linebreak-style': ['error', 'unix'],
                '@stylistic/lines-between-class-members': 'error',
                '@stylistic/max-len': [
                    'error',
                    {
                        code: 150,
                        ignoreRegExpLiterals: true,
                        ignoreUrls: true,
                        ignoreStrings: true,
                        ignoreTemplateLiterals: true
                    }
                ],
                '@stylistic/max-statements-per-line': 'error',
                '@stylistic/member-delimiter-style': 'error',
                '@stylistic/multiline-ternary': ['error', 'always-multiline'],
                '@stylistic/new-parens': 'error',
                '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
                '@stylistic/no-confusing-arrow': 'error',
                '@stylistic/no-extra-parens': [
                    'error',
                    'all',
                    {
                        allowParensAfterCommentPattern: '@type',
                        enforceForArrowConditionals: false,
                        enforceForFunctionPrototypeMethods: false,
                        ignoreJSX: 'multi-line',
                        nestedBinaryExpressions: false
                    }
                ],
                '@stylistic/no-extra-semi': 'error',
                '@stylistic/no-floating-decimal': 'error',
                '@stylistic/no-mixed-operators': 'error',
                '@stylistic/no-multi-spaces': 'error',
                '@stylistic/no-multiple-empty-lines': ['error', { max: 2 }],
                '@stylistic/no-trailing-spaces': 'error',
                '@stylistic/no-whitespace-before-property': 'error',
                '@stylistic/object-curly-newline': ['error', { multiline: true }],
                '@stylistic/object-curly-spacing': ['error', 'always'],
                '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
                '@stylistic/operator-linebreak': ['error', 'before'],
                '@stylistic/padded-blocks': ['error', 'never'],
                '@stylistic/quote-props': ['error', 'as-needed'],
                '@stylistic/quotes': ['error', 'single'],
                '@stylistic/rest-spread-spacing': 'error',
                '@stylistic/semi': 'error',
                '@stylistic/semi-spacing': 'error',
                '@stylistic/semi-style': 'error',
                '@stylistic/space-before-blocks': 'error',
                '@stylistic/space-before-function-paren': [
                    'error',
                    {
                        anonymous: 'never',
                        asyncArrow: 'always',
                        named: 'never'
                    }
                ],
                '@stylistic/space-in-parens': 'error',
                '@stylistic/space-infix-ops': ['error', { int32Hint: false }],
                '@stylistic/space-unary-ops': ['error', { words: true, nonwords: false }],
                '@stylistic/spaced-comment': 'error',
                '@stylistic/switch-colon-spacing': 'error',
                '@stylistic/template-curly-spacing': 'error',
                '@stylistic/template-tag-spacing': 'error',
                '@stylistic/type-annotation-spacing': 'error',
                '@stylistic/type-generic-spacing': 'error',
                '@stylistic/type-named-tuple-spacing': 'error',
                '@stylistic/wrap-iife': ['error', 'inside'],
                '@stylistic/yield-star-spacing': ['error', 'after']
            }
        },
        {
            name: 'dtrw:base:ts',
            files: tsFiles,
            plugins: { '@typescript-eslint': tseslint.plugin },
            languageOptions: { parser: tseslint.parser },
            rules: {
                ...tseslint.configs.eslintRecommended.rules,
                ...importPlugin.configs.typescript.rules,

                'camelcase': 'off',
                'default-case': 'off',
                'dot-notation': 'off',
                'no-array-constructor': 'off',
                'no-empty-function': 'off',
                'no--implicit-returns': 'off',
                'no-implied-eval': 'off',
                'no-invalid-this': 'off',
                'no-loop-func': 'off',
                'no-loss-of-precision': 'off',
                'no-magic-numbers': 'off',
                'no-shadow': 'off',
                'no-throw-literal': 'off', // extended by tseslint/only-throw-error
                'no-unused-expressions': 'off',
                'no-unused-vars': 'off',
                'no-use-before-define': 'off',
                'no-useless-constructor': 'off',
                'prefer-destructuring': 'off',
                'require-await': 'off',

                '@typescript-eslint/adjacent-overload-signatures': 'error',
                '@typescript-eslint/await-thenable': 'error',
                '@typescript-eslint/ban-ts-comment': 'error',
                '@typescript-eslint/ban-types': 'error',
                '@typescript-eslint/consistent-generic-constructors': 'error',
                '@typescript-eslint/consistent-indexed-object-style': 'error',
                '@typescript-eslint/consistent-type-assertions': [
                    'error',
                    {
                        assertionStyle: 'as',
                        objectLiteralTypeAssertions: 'allow-as-parameter'
                    }
                ],
                '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
                '@typescript-eslint/consistent-type-imports': [
                    'error',
                    {
                        prefer: 'type-imports',
                        fixStyle: 'separate-type-imports',
                        disallowTypeAnnotations: false
                    }
                ],
                '@typescript-eslint/dot-notation': 'error',
                '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
                '@typescript-eslint/member-ordering': [
                    'error',
                    {
                        default: {
                            memberTypes: [
                                'public-static-field',
                                'protected-static-field',
                                'private-static-field',

                                'static-initialization',

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
                            order: 'natural-case-insensitive'
                        }
                    }
                ],
                '@typescript-eslint/method-signature-style': 'error',
                '@typescript-eslint/naming-convention': ['error', ...baseNamingRuleConfig],
                '@typescript-eslint/no-array-constructor': 'error',
                '@typescript-eslint/no-array-delete': 'error',
                '@typescript-eslint/no-base-to-string': 'error',
                '@typescript-eslint/no-confusing-non-null-assertion': 'error',
                '@typescript-eslint/no-confusing-void-expression': 'error',
                '@typescript-eslint/no-dupe-class-members': 'error',
                '@typescript-eslint/no-duplicate-enum-values': 'error',
                '@typescript-eslint/no-duplicate-type-constituents': 'error',
                '@typescript-eslint/no-empty-function': [
                    'error',
                    {
                        allow: [
                            'private-constructors',
                            'protected-constructors',
                            'decoratedFunctions',
                            'overrideMethods'
                        ]
                    }
                ],
                '@typescript-eslint/no-empty-interface': 'error',
                '@typescript-eslint/no-explicit-any': 'error',
                '@typescript-eslint/no-extra-non-null-assertion': 'error',
                '@typescript-eslint/no-extraneous-class': 'error',
                '@typescript-eslint/no-floating-promises': 'error',
                '@typescript-eslint/consistent-return': 'error',
                '@typescript-eslint/no-implied-eval': 'error',
                // import-x/consistent-type-specifier-style makes sure we don't inline `type` modifier
                '@typescript-eslint/no-import-type-side-effects': 'off',
                '@typescript-eslint/no-invalid-this': 'error',
                '@typescript-eslint/no-invalid-void-type': 'error',
                '@typescript-eslint/no-loop-func': 'error',
                '@typescript-eslint/no-loss-of-precision': 'warn',
                '@typescript-eslint/no-magic-numbers': [
                    'warn',
                    {
                        ignoreArrayIndexes: true,
                        ignoreDefaultValues: true,
                        ignoreEnums: true,
                        ignoreNumericLiteralTypes: true,
                        ignoreReadonlyClassProperties: true,
                        ignoreTypeIndexes: true
                    }
                ],
                '@typescript-eslint/no-misused-new': 'error',
                '@typescript-eslint/no-misused-promises': [
                    'error',
                    { checksVoidReturn: false }
                ],
                '@typescript-eslint/no-mixed-enums': 'error',
                '@typescript-eslint/no-namespace': 'error',
                '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
                '@typescript-eslint/no-non-null-assertion': 'error',
                '@typescript-eslint/no-redeclare': 'error',
                '@typescript-eslint/no-redundant-type-constituents': 'error',
                '@typescript-eslint/no-require-imports': 'error',
                '@typescript-eslint/no-shadow': 'error',
                '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
                '@typescript-eslint/no-unnecessary-condition': ['error', { allowConstantLoopConditions: true }],
                '@typescript-eslint/no-unnecessary-type-arguments': 'error',
                '@typescript-eslint/no-unnecessary-type-assertion': 'error',
                '@typescript-eslint/no-unnecessary-type-constraint': 'error',
                '@typescript-eslint/no-unsafe-assignment': 'error',
                '@typescript-eslint/no-unsafe-call': 'error',
                '@typescript-eslint/no-unsafe-declaration-merging': 'error',
                '@typescript-eslint/no-unsafe-enum-comparison': 'error',
                '@typescript-eslint/no-unsafe-member-access': 'error',
                '@typescript-eslint/no-unsafe-return': 'error',
                '@typescript-eslint/no-unsafe-unary-minus': 'error',
                '@typescript-eslint/no-unused-expressions': 'error',
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        argsIgnorePattern: '^_',
                        destructuredArrayIgnorePattern: '^_',
                        ignoreRestSiblings: true
                    }
                ],
                '@typescript-eslint/no-use-before-define': [
                    'error',
                    {
                        classes: true,
                        enums: true,
                        functions: false,
                        ignoreTypeReferences: false,
                        typedefs: false,
                        variables: true
                    }
                ],
                '@typescript-eslint/no-useless-constructor': 'error',
                '@typescript-eslint/no-useless-empty-export': 'error',
                '@typescript-eslint/no-unnecessary-template-expression': 'error',
                '@typescript-eslint/no-var-requires': 'error',
                '@typescript-eslint/only-throw-error': 'error', // extends no-throw-literal
                '@typescript-eslint/parameter-properties': ['error', { prefer: 'parameter-property' }],
                '@typescript-eslint/prefer-destructuring': 'error',
                '@typescript-eslint/prefer-enum-initializers': 'error',
                '@typescript-eslint/prefer-find': 'error',
                '@typescript-eslint/prefer-for-of': 'error',
                '@typescript-eslint/prefer-function-type': 'error',
                '@typescript-eslint/prefer-includes': 'error',
                '@typescript-eslint/prefer-literal-enum-member': 'error',
                '@typescript-eslint/prefer-nullish-coalescing': ['error', { ignoreConditionalTests: true }],
                '@typescript-eslint/prefer-optional-chain': 'error',
                '@typescript-eslint/prefer-promise-reject-errors': 'error',
                '@typescript-eslint/prefer-readonly': 'error',
                '@typescript-eslint/prefer-reduce-type-parameter': 'error',
                '@typescript-eslint/prefer-regexp-exec': 'warn',
                '@typescript-eslint/prefer-string-starts-ends-with': ['error', { allowSingleElementEquality: 'always' }],
                '@typescript-eslint/require-await': 'error',
                '@typescript-eslint/restrict-plus-operands': 'error',
                '@typescript-eslint/restrict-template-expressions': [
                    'error',
                    {
                        allowBoolean: true,
                        allowNullish: true,
                        allowNumber: true
                    }
                ],
                '@typescript-eslint/return-await': ['error', 'always'],
                '@typescript-eslint/switch-exhaustiveness-check': [
                    'error',
                    {
                        allowDefaultCaseForExhaustiveSwitch: false,
                        requireDefaultForNonUnion: true
                    }
                ],
                '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error'
            }
        },
        {
            name: 'dtrw:base:eslintconfig',
            files: ['eslint.config.js'],
            rules: { '@stylistic/quote-props': ['error', 'consistent-as-needed'] }
        }
    );
}
