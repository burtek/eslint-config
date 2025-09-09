import { defineConfig } from 'eslint/config';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';

import { extendFlatConfig } from './share/extend-flat-config.js';


const files = ['**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

export function prepareConfig() {
    return defineConfig(
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
                    'testing-library/no-test-id-queries': 'warn',
                    'testing-library/prefer-explicit-assert': 'error',
                    'testing-library/prefer-user-event': 'warn'
                }
            }
        )
    );
}
