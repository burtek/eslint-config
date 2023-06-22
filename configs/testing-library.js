import { defineFlatConfig } from 'eslint-define-config';
import testingLibrary from 'eslint-plugin-testing-library';


const files = ['**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];
const cyFiles = ['**/*.cy.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

// eslint-disable-next-line no-warning-comments
// TODO: move to FlatConfig once testing-library is upgraded
/**
 * @param {Object} [config]
 * @param {boolean} [config.enableCypress]
 */
export function prepareConfig({ enableCypress = false } = {}) {
    return defineFlatConfig([
        {
            files: [
                ...files,
                ...(enableCypress ? cyFiles : [])
            ],
            plugins: { 'testing-library': { rules: testingLibrary.rules } },
            rules: {
                ...testingLibrary.configs.react.rules,
                'testing-library/prefer-user-event': 'warn'
            }
        }
    ]);
}
