import { defineConfig } from 'eslint/config';
import jest from 'eslint-plugin-jest';
import globals from 'globals';

import { extendFlatConfig } from './share/extend-flat-config.js';


const testFiles = '**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}';
const mockFiles = '**/__mocks__/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}';

const tsTestFiles = '**/*.test.{ts,cts,mts,tsx}';
const tsMockFiles = '**/__mocks__/**/*.{ts,cts,mts,tsx}';

/**
 * @param {Object} [config]
 * @param {'jest' | 'vitest'} [config.mode]
 */
export function prepareConfig({ mode = 'jest' } = {}) {
    return defineConfig(
        {
            name: 'dtrw:jest:base',
            files: [testFiles, mockFiles],
            languageOptions: {
                globals: {
                    ...mode === 'vitest' ? globals.vitest : globals.jest,
                    ...globals.node
                }
            },
            settings: {
                jest: {
                    // lie to eslint-plugin-jest that we indeed use jest (vitest has same syntax), otherwise let auto-detect
                    ...mode === 'vitest' && { version: 30 }
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
        extendFlatConfig(
            jest.configs['flat/recommended'],
            jest.configs['flat/style'],
            {
                name: 'dtrw:jest:test',
                files: [testFiles],
                rules: {
                    'jest/consistent-test-it': 'error',
                    'jest/no-conditional-in-test': 'error',
                    'jest/no-confusing-set-timeout': 'error',
                    'jest/no-duplicate-hooks': 'error',
                    'jest/no-test-return-statement': 'error',
                    'jest/padding-around-all': 'error',
                    'jest/prefer-each': 'error',
                    'jest/prefer-hooks-in-order': 'error',
                    'jest/prefer-hooks-on-top': 'error',
                    'jest/prefer-mock-promise-shorthand': 'error',
                    'jest/prefer-strict-equal': 'error',
                    'jest/prefer-todo': 'error'
                }
            }
        ),
        {
            name: 'dtrw:jest:test.ts',
            files: [tsTestFiles],
            rules: {
                'jest/no-untyped-mock-factory': 'error',
                'jest/prefer-jest-mocked': 'error'
            }
        }
    );
}
