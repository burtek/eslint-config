/* eslint no-warning-comments: 1 */
import { defineFlatConfig } from 'eslint-define-config';
import cypress from 'eslint-plugin-cypress';
import globals from 'globals';


const files = ['**/*.cy.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

export function prepareConfig() {
    return defineFlatConfig([
        {
            files,
            plugins: { cypress: { rules: cypress.rules } },
            languageOptions: {
                globals: {
                    ...cypress.environments.globals,
                    ...globals.browser,
                    ...globals.mocha
                }
            },
            rules: {
                'cypress/no-assigning-return-values': 'error',
                'cypress/no-unnecessary-waiting': 'error',
                'cypress/assertion-before-screenshot': 'warn',
                'cypress/no-force': 'warn',
                'cypress/no-async-tests': 'error',
                'cypress/no-pause': 'error',
                'cypress/unsafe-to-chain-command': 'error',

                'no-unused-expressions': 'warn', // TODO: chai-friendly
                '@typescript-eslint/no-unused-expressions': 'warn' // TODO: chai-friendly
            }
        }
    ]);
}
