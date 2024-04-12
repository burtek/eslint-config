import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';
import tseslint from 'typescript-eslint';


const files = ['**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

// eslint-disable-next-line no-warning-comments
// TODO: move to FlatConfig once testing-library and jest-dom are upgraded
export function prepareConfig() {
    return tseslint.config(
        {
            ...jestDom.configs['flat/all'],
            name: 'dtrw:testing-lib:jest-dom',
            files
        },
        {
            name: 'dtrw:testing-lib:react',
            files,
            plugins: { 'testing-library': { rules: testingLibrary.rules } },
            rules: {
                ...testingLibrary.configs.react.rules,
                'testing-library/prefer-explicit-assert': 'error',
                'testing-library/prefer-user-event': 'warn'
            }
        }
    );
}
