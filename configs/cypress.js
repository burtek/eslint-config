/* eslint no-warning-comments: 1 */
import cypress from 'eslint-plugin-cypress';
import globals from 'globals';
import tseslint from 'typescript-eslint';


const files = ['**/*.cy.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

// eslint-disable-next-line no-warning-comments
// TODO: move to FlatConfig once cypress is upgraded
export function prepareConfig() {
    return tseslint.config(
        {
            name: 'dtrw:cypress:base',
            files,
            plugins: { cypress: { rules: cypress.rules } },
            languageOptions: {
                globals: {
                    ...cypress.environments.globals.globals,
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
    );
}
