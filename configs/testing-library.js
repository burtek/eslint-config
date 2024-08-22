import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';
import tseslint from 'typescript-eslint';

import { extendFlatConfig } from './share/extend-flat-config.js';


const files = ['**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

export function prepareConfig() {
    return tseslint.config(
        extendFlatConfig(
            jestDom.configs['flat/all'],
            {
                name: 'dtrw:testing-lib:jest-dom',
                files
            }
        ),
        extendFlatConfig(
            testingLibrary.configs['flat/react'],
            {
                name: 'dtrw:testing-lib:react',
                files,
                rules: {
                    'testing-library/prefer-explicit-assert': 'error',
                    'testing-library/prefer-user-event': 'warn'
                }
            }
        )
    );
}
