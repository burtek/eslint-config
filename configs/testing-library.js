import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';
import tseslint from 'typescript-eslint';


const files = ['**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

export function prepareConfig() {
    return tseslint.config(
        {
            ...jestDom.configs['flat/all'],
            name: 'dtrw:testing-lib:jest-dom',
            files
        },
        {
            ...testingLibrary.configs['flat/react'],
            name: 'dtrw:testing-lib:react',
            files,
            rules: {
                ...testingLibrary.configs['flat/react'].rules,
                'testing-library/prefer-explicit-assert': 'error',
                'testing-library/prefer-user-event': 'warn'
            }
        }
    );
}
