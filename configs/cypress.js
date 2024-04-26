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
                ...cypress.configs.recommended.rules,
                'cypress/assertion-before-screenshot': 'warn',
                'cypress/no-force': 'warn',
                'cypress/no-async-before': 'error',
                'cypress/no-pause': 'error',

                // chai-friendly
                'no-unused-expressions': 'off',
                '@typescript-eslint/no-unused-expressions': 'off'
            }
        }
    );
}
