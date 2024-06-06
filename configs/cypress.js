import cypress from 'eslint-plugin-cypress/flat';
import tseslint from 'typescript-eslint';


const files = ['**/*.cy.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

export function prepareConfig() {
    return tseslint.config(
        {
            ...cypress.configs.recommended,
            name: 'dtrw:cypress:base',
            files,
            rules: {
                ...cypress.configs.recommended.rules,
                'cypress/assertion-before-screenshot': 'warn',
                'cypress/no-force': 'warn',
                'cypress/no-async-before': 'error',
                'cypress/no-pause': 'error',

                // chai-friendly
                'no-unused-expressions': 'off',
                '@typescript-eslint/no-unused-expressions': 'off'
                // eslint-disable-next-line no-warning-comments
                // TODO: fork of those above based on https://github.com/ihordiachenko/eslint-plugin-chai-friendly/blob/master/lib/rules/no-unused-expressions.js
            }
        }
    );
}
