import { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
    transform: {},
    preset: 'ts-jest/presets/js-with-ts-esm',
    testEnvironment: 'node'
};

export default jestConfig
