/* eslint no-warning-comments: 1 */
import js from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import eslint from 'eslint';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importPlugin from 'eslint-plugin-import-x';
import promise from 'eslint-plugin-promise';
import semver from 'semver';
import tseslint from 'typescript-eslint';

import { baseNamingRuleConfig } from './share/naming-config.js';


// TODO: need no-splice-add and no-splice-remove

const allFiles = ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];
const tsFiles = ['**/*.{ts,cts,mts,tsx}'];

const allImportExtensions = ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.cts', '.mts', '.tsx'];
/**
 * @param {Object} [config]
 * @param {boolean} [config.nextResolver=true]
 */
export function prepareConfig({ nextResolver = true } = {}) {
    const resolverSettings = nextResolver
        ? {
            'import-x/resolver-next': [
                createTypeScriptImportResolver(),
                importPlugin.createNodeResolver({ extensions: allImportExtensions })
            ]
        }
        : {
            'import-x/resolver': {
                node: { extensions: allImportExtensions },
                typescript: true
            }
        };

    return tseslint.config(
        { ignores: ['node_modules'] },
        { plugins: { '@stylistic': stylisticPlugin } },
        {
            name: 'dtrw:base:base',
            files: allFiles,
            linterOptions: {
                reportUnusedDisableDirectives: true,
                ...semver.satisfies(eslint.Linter.version, '>=9.19.0')
                    ? /** @satisfies {import('@typescript-eslint/utils').TSESLint.FlatConfig.LinterOptions} */({ reportUnusedInlineConfigs: 'warn' })
                    : {}
            },
            settings: {
                'import-x/extensions': allImportExtensions,
                'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
                'import-x/parsers': { '@typescript-eslint/parser': allImportExtensions },
                ...resolverSettings
            },
            plugins: {
                'import-x': importPlugin,
                promise
            },
            rules: {
                ...js.configs.recommended.rules,
                'accessor-pairs': 'error',
                'array-callback-return': 'error',
                'arrow-body-style': 'error',
                'block-spacing': 'error',
                'brace-style': 'error',
                'camelcase': 'error',
                'consistent-return': 'error',
                'curly': 'error',
                'default-case': 'error',
                'default-case-last': 'error',
                'dot-notation': 'error',
                'eqeqeq': 'error',
                'func-names': 'error',
                'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
                'grouped-accessor-pairs': 'error',
                'guard-for-in': 'error',
                'new-cap': 'error',
                'no-alert': 'error',
                'no-array-constructor': 'error',
                'no-await-in-loop': 'error',
                'no-caller': 'error',
                'no-cond-assign': ['error', 'always'],
                'no-console': 'error',
                'no-constructor-return': 'error',
                'no-continue': 'error',
                'no-div-regex': 'error',
                'no-else-return': 'error',
                'no-empty': ['error', { allowEmptyCatch: true }],
                'no-empty-function': 'error',
                'no-eval': 'error',
                'no-extend-native': 'error',
                'no-extra-bind': 'error',
                'no-fallthrough': ['error', { allowEmptyCase: true }],
                'no-implicit-coercion': ['error', { allow: ['!!'] }],
                'no-implied-eval': 'error',
                'no-inner-declarations': 'error',
                'no-invalid-this': 'error',
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
                'no-multi-assign': 'error',
                'no-multi-str': 'error',
                'no-negated-condition': 'error',
                'no-nested-ternary': 'warn',
                'no-new': 'error',
                'no-new-func': 'error',
                'no-new-wrappers': 'error',
                'no-object-constructor': 'error',
                'no-octal-escape': 'error',
                'no-param-reassign': 'error',
                'no-promise-executor-return': 'error',
                'no-return-assign': 'error',
                'no-script-url': 'error',
                'no-self-compare': 'error',
                'no-sequences': 'error',
                'no-shadow': 'error',
                'no-template-curly-in-string': 'warn',
                'no-throw-literal': 'error',
                'no-unassigned-vars': 'error',
                'no-undef-init': 'error',
                'no-unmodified-loop-condition': 'error',
                'no-unreachable-loop': 'error',
                'no-unused-expressions': 'error',
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
                'no-useless-computed-key': 'error',
                'no-useless-concat': 'error',
                'no-useless-constructor': 'error',
                'no-useless-rename': 'error',
                'no-useless-return': 'error',
                'no-var': 'error',
                'no-void': ['error', { allowAsStatement: true }],
                'no-warning-comments': 'error',
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
                'symbol-description': 'error',
                'valid-typeof': ['error', { requireStringLiterals: true }],
                'yoda': ['error', 'never', { exceptRange: true }],

                ...importPlugin.flatConfigs.recommended.rules,
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
                'promise/prefer-catch': 'error',

                ...stylisticPlugin.configs.customize({
                    braceStyle: '1tbs',
                    commaDangle: 'never',
                    indent: 4,
                    pluginName: '@stylistic',
                    quoteProps: 'as-needed',
                    quotes: 'single',
                    semi: true,
                    severity: 'error'
                }).rules,
                '@stylistic/array-bracket-newline': 'error',
                '@stylistic/array-element-newline': ['error', { consistent: true, multiline: true }],
                '@stylistic/arrow-parens': ['error', 'as-needed'],
                '@stylistic/brace-style': 'error',
                '@stylistic/curly-newline': ['error', 'always'],
                '@stylistic/function-call-argument-newline': ['error', 'consistent'],
                '@stylistic/function-call-spacing': 'error',
                '@stylistic/function-paren-newline': ['error', 'consistent'],
                '@stylistic/indent': ['error', 4],
                '@stylistic/linebreak-style': ['error', 'unix'],
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
                        nestedBinaryExpressions: false,
                        nestedConditionalExpressions: false
                    }
                ],
                '@stylistic/no-extra-semi': 'error',
                '@stylistic/no-mixed-operators': 'error',
                '@stylistic/no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 0 }],
                '@stylistic/object-curly-newline': [
                    'error',
                    {
                        ObjectExpression: { multiline: true },
                        ObjectPattern: { multiline: true },
                        ImportDeclaration: { multiline: true },
                        ExportDeclaration: { multiline: true },
                        TSTypeLiteral: { multiline: true },
                        TSInterfaceBody: 'always'
                    }
                ],
                '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
                '@stylistic/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: 'avoidEscape' }],
                '@stylistic/semi-style': 'error',
                '@stylistic/space-before-function-paren': [
                    'error',
                    {
                        anonymous: 'never',
                        asyncArrow: 'always',
                        named: 'never'
                    }
                ],
                '@stylistic/switch-colon-spacing': 'error',
                '@stylistic/wrap-iife': ['error', 'inside']
            }
        },
        {
            name: 'dtrw:base:ts',
            files: tsFiles,
            plugins: { '@typescript-eslint': tseslint.plugin },
            languageOptions: { parser: tseslint.parser },
            rules: {
                ...tseslint.configs.eslintRecommended.rules,
                ...importPlugin.flatConfigs.typescript.rules,

                'camelcase': 'off',
                'default-case': 'off',
                'dot-notation': 'off',
                'no-array-constructor': 'off',
                'no-empty-function': 'off',
                'no-implicit-returns': 'off',
                'no-implied-eval': 'off',
                'no-invalid-this': 'off',
                'no-loop-func': 'off',
                'no-magic-numbers': 'off',
                'no-shadow': 'off',
                'no-throw-literal': 'off', // extended by tseslint/only-throw-error
                'no-unsafe-optional-chaining': 'off',
                'no-unused-expressions': 'off',
                'no-unused-vars': 'off',
                'no-use-before-define': 'off',
                'no-useless-constructor': 'off',
                'prefer-destructuring': 'off',
                'require-await': 'off',

                '@typescript-eslint/adjacent-overload-signatures': 'error',
                '@typescript-eslint/await-thenable': 'error',
                '@typescript-eslint/ban-ts-comment': 'error',
                '@typescript-eslint/consistent-generic-constructors': 'error',
                '@typescript-eslint/consistent-indexed-object-style': 'error',
                '@typescript-eslint/consistent-type-assertions': [
                    'error',
                    {
                        arrayLiteralTypeAssertions: 'allow-as-parameter',
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
                '@typescript-eslint/no-empty-object-type': 'error',
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
                '@typescript-eslint/no-misused-spread': 'error',
                '@typescript-eslint/no-mixed-enums': 'error',
                '@typescript-eslint/no-namespace': 'error',
                '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
                '@typescript-eslint/no-non-null-assertion': 'error',
                '@typescript-eslint/no-redeclare': 'error',
                '@typescript-eslint/no-redundant-type-constituents': 'error',
                '@typescript-eslint/no-require-imports': 'error',
                '@typescript-eslint/no-shadow': 'error',
                '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
                '@typescript-eslint/no-unnecessary-condition': ['error', { allowConstantLoopConditions: true, checkTypePredicates: true }],
                '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
                '@typescript-eslint/no-unnecessary-type-arguments': 'error',
                '@typescript-eslint/no-unnecessary-type-assertion': 'error',
                '@typescript-eslint/no-unnecessary-type-constraint': 'error',
                '@typescript-eslint/no-unnecessary-type-conversion': 'error',
                '@typescript-eslint/no-unsafe-assignment': 'error',
                '@typescript-eslint/no-unsafe-call': 'error',
                '@typescript-eslint/no-unsafe-declaration-merging': 'error',
                '@typescript-eslint/no-unsafe-enum-comparison': 'error',
                '@typescript-eslint/no-unsafe-function-type': 'error',
                '@typescript-eslint/no-unsafe-member-access': 'error',
                '@typescript-eslint/no-unsafe-return': 'error',
                '@typescript-eslint/no-unsafe-type-assertion': 'error',
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
                '@typescript-eslint/no-wrapper-object-types': 'error',
                '@typescript-eslint/only-throw-error': 'error', // extends no-throw-literal
                '@typescript-eslint/parameter-properties': ['error', { prefer: 'parameter-property' }],
                '@typescript-eslint/prefer-destructuring': 'error',
                '@typescript-eslint/prefer-enum-initializers': 'error',
                '@typescript-eslint/prefer-find': 'error',
                '@typescript-eslint/prefer-for-of': 'error',
                '@typescript-eslint/prefer-function-type': 'error',
                '@typescript-eslint/prefer-includes': 'error',
                '@typescript-eslint/prefer-literal-enum-member': 'error',
                '@typescript-eslint/prefer-nullish-coalescing': 'error',
                '@typescript-eslint/prefer-optional-chain': 'error',
                '@typescript-eslint/prefer-promise-reject-errors': 'error',
                '@typescript-eslint/prefer-readonly': 'error',
                '@typescript-eslint/prefer-reduce-type-parameter': 'error',
                '@typescript-eslint/prefer-regexp-exec': 'warn',
                '@typescript-eslint/prefer-string-starts-ends-with': ['error', { allowSingleElementEquality: 'always' }],
                '@typescript-eslint/require-await': 'error',
                '@typescript-eslint/related-getter-setter-pairs': 'warn',
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
