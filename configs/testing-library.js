import { defineFlatConfig } from 'eslint-define-config';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';


const files = ['**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

// eslint-disable-next-line no-warning-comments
// TODO: move to FlatConfig once testing-library and jest-dom are upgraded
export function prepareConfig() {
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
                'testing-library/prefer-explicit-assert': 'error',
                'testing-library/prefer-user-event': 'warn'
            }
        }
    ]);
}
