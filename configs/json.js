import * as jsonc from 'eslint-plugin-jsonc';
import * as jsonParser from 'jsonc-eslint-parser';
import tseslint from 'typescript-eslint';


/** @typedef {Partial<import('@typescript-eslint/utils').TSESLint.SharedConfig.RulesRecord>} Rules  */

const wellKnownJsonc = [
    '**/tsconfig.json',
    '**/tsconfig.*.json',
    '**/jsconfig.json',
    '**/jsconfig.*.json',
    '.vscode/**/*.json'
];

/**
 * @param {Array<{ rules?: Rules }>} configs
 */
const mergeRules = configs => configs.reduce((acc, { rules = {} }) => ({ ...acc, ...rules }), /** @type {Rules} */({}));

/**
 * @param {Object} [config]
 * @param {Partial<Record<'json' | 'jsonc' | 'json5', string[]>>} [config.additionalFiles]
 */
export function prepareConfig({
    additionalFiles: {
        json: additionalFilesJson = [],
        json5: additionalFilesJson5 = [],
        jsonc: additionalFilesJsonc = []
    } = {}
} = {}) {
    return tseslint.config(
        {
            name: 'dtrw:json:base',
            files: ['**/*.{json,jsonc,json5}', ...additionalFilesJson, ...additionalFilesJson5, ...additionalFilesJsonc],
            plugins: { jsonc },
            languageOptions: { parser: jsonParser }
        },
        {
            name: 'dtrw:json:json',
            files: ['**/*.json', ...additionalFilesJson],
            ignores: [...wellKnownJsonc, ...additionalFilesJsonc, ...additionalFilesJson5],
            rules: mergeRules(jsonc.configs['flat/recommended-with-json'])
        },
        {
            name: 'dtrw:json:jsonc',
            files: ['**/*.jsonc', ...wellKnownJsonc, ...additionalFilesJsonc],
            ignores: [...additionalFilesJson, ...additionalFilesJson5],
            rules: mergeRules(jsonc.configs['flat/recommended-with-jsonc'])
        },
        {
            name: 'dtrw:json:json5',
            files: ['**/*.json5', ...additionalFilesJson5],
            ignores: [...wellKnownJsonc, ...additionalFilesJson, ...additionalFilesJsonc],
            rules: mergeRules(jsonc.configs['flat/recommended-with-json5'])
        },
        {
            name: 'dtrw:json:overrides',
            files: ['**/*.{json,jsonc,json5}', ...additionalFilesJson, ...additionalFilesJson5, ...additionalFilesJsonc],
            rules: { 'jsonc/indent': ['error', 2] }
        }
    );
}
