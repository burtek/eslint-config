import type { JestConfigWithTsJest } from 'ts-jest';


const jestConfig: JestConfigWithTsJest = {
    transform: {
        'tests.test.ts$': [
            'ts-jest',
            { tsconfig: 'tsconfig.test.json' }
        ]
    },
    preset: 'ts-jest/presets/js-with-ts-esm',
    testEnvironment: 'node',
    transformIgnorePatterns: ['node_modules/(?!@stylistic/eslint-plugin)']
};

export default jestConfig;
