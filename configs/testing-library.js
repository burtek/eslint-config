import { defineFlatConfig } from 'eslint-define-config';
import testingLibrary from 'eslint-plugin-testing-library';


const files = ['**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

// eslint-disable-next-line no-warning-comments
// TODO: move to FlatConfig once testing-library and jest-dom are upgraded
export function prepareConfig() {
    // eslint-plugin-jest-dom depends on @testing-library/dom, let's not break eslint configs without TL installed.
    const { default: jestDom } = require('eslint-plugin-jest-dom');
    return defineFlatConfig([
        {
            files,
            plugins: {
                'jest-dom': { rules: jestDom.rules },
                'testing-library': { rules: testingLibrary.rules }
            },
            rules: {
                ...jestDom.configs.all.rules,
                ...testingLibrary.configs.react.rules,
                'testing-library/prefer-user-event': 'warn'
            }
        }
    ]);
}
