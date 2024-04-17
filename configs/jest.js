import jestPlugin from 'eslint-plugin-jest';
import * as jestFormatting from 'eslint-plugin-jest-formatting';
import globals from 'globals';
import tseslint from 'typescript-eslint';


const testFiles = '**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}';
const mockFiles = '**/__mocks__/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}';

const tsTestFiles = '**/*.test.{ts,cts,mts,tsx}';
const tsMockFiles = '**/__mocks__/**/*.{ts,cts,mts,tsx}';

/**
 * @param {Object} [config]
 * @param {'jest' | 'vitest'} [config.mode]
 */
export function prepareConfig({ mode = 'jest' } = {}) {
    return tseslint.config(
        {
            name: 'dtrw:jest:base',
            files: [testFiles, mockFiles],
            languageOptions: {
                globals: {
                    ...globals.jest,
                    ...globals.node,
                    ...mode === 'vitest' && {
                        jest: 'off',
                        vitest: 'readonly'
                    }
                }
            },
            settings: {
                jest: {
                    // lie to eslint-plugin-jest that we indeed use jest (vitest has same syntax), otherwise let auto-detect
                    ...mode === 'vitest' && { version: 29 }
                }
            },
            rules: {
                'no-console': 'off',
                'no-magic-numbers': 'off',
                'no-redeclare': 'off'
            }
        },
        {
            name: 'dtrw:jest:ts',
            files: [tsTestFiles, tsMockFiles],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-magic-numbers': 'off',
                '@typescript-eslint/no-redeclare': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off'
            }
        },
        {
            name: 'dtrw:jest:test',
            files: [testFiles],
            plugins: {
                'jest': jestPlugin,
                'jest-formatting': jestFormatting
            },
            rules: {
                'jest-formatting/padding-around-all': 'error',

                ...jestPlugin.configs.recommended.rules,
                ...jestPlugin.configs.style.rules,

                'jest/consistent-test-it': 'error',
                'jest/no-conditional-in-test': 'error',
                'jest/no-confusing-set-timeout': 'error',
                'jest/no-duplicate-hooks': 'error',
                'jest/no-test-return-statement': 'error',
                'jest/prefer-each': 'error',
                'jest/prefer-hooks-in-order': 'error',
                'jest/prefer-hooks-on-top': 'error',
                'jest/prefer-mock-promise-shorthand': 'error',
                'jest/prefer-strict-equal': 'error',
                'jest/prefer-todo': 'error'
            }
        },
        {
            name: 'dtrw:jest:test.ts',
            files: [tsTestFiles],
            rules: { 'jest/no-untyped-mock-factory': 'error' }
        }
    );
}
