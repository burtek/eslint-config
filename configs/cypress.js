/* eslint no-warning-comments: 1 */
import cypress from 'eslint-plugin-cypress/flat';
import tseslint from 'typescript-eslint';

import { extendFlatConfig } from './share/extend-flat-config.js';


const files = ['**/*.cy.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

export function prepareConfig() {
    return tseslint.config(
        extendFlatConfig(
            cypress.configs.recommended,
            {
                name: 'dtrw:cypress:base',
                files,
                rules: {
                    'cypress/assertion-before-screenshot': 'warn',
                    'cypress/no-force': 'warn',
                    'cypress/no-async-before': 'error',
                    'cypress/no-debug': 'error',
                    'cypress/no-pause': 'error',

                    // chai-friendly
                    'no-unused-expressions': 'off',
                    '@typescript-eslint/no-unused-expressions': 'off'
                    // TODO: fork of those above based on https://github.com/ihordiachenko/eslint-plugin-chai-friendly/blob/master/lib/rules/no-unused-expressions.js
                }
            }
        )
    );
}
