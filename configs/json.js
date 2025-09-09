import json from '@eslint/json';
import { defineConfig } from 'eslint/config';
import * as jsonc from 'eslint-plugin-jsonc';
import * as jsonParser from 'jsonc-eslint-parser';


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
const mergeRules = (...configs) => configs.reduce((acc, { rules = {} }) => ({ ...acc, ...rules }), /** @type {Rules} */({}));

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
    return defineConfig(
        {
            name: 'dtrw:json:base',
            files: ['**/*.{json,jsonc,json5}', ...additionalFilesJson, ...additionalFilesJson5, ...additionalFilesJsonc],
            // configs has rules with "string" type rather than RuleSeverity, but it's not needed in here as we use the config directly
            // so we can mute the TS error by overriding configs with undefined
            plugins: { json, jsonc: { ...jsonc, configs: undefined } },
            languageOptions: { parser: jsonParser }
        },
        {
            name: 'dtrw:json:json',
            language: 'json/json',
            files: ['**/*.json', ...additionalFilesJson],
            ignores: [...wellKnownJsonc, ...additionalFilesJsonc, ...additionalFilesJson5],
            rules: mergeRules(...jsonc.configs['flat/recommended-with-json'], json.configs.recommended)
        },
        {
            name: 'dtrw:json:jsonc',
            language: 'json/jsonc',
            files: ['**/*.jsonc', ...wellKnownJsonc, ...additionalFilesJsonc],
            ignores: [...additionalFilesJson, ...additionalFilesJson5],
            rules: mergeRules(...jsonc.configs['flat/recommended-with-jsonc'], json.configs.recommended)
        },
        {
            name: 'dtrw:json:json5',
            language: 'json/json5',
            files: ['**/*.json5', ...additionalFilesJson5],
            ignores: [...wellKnownJsonc, ...additionalFilesJson, ...additionalFilesJsonc],
            rules: mergeRules(...jsonc.configs['flat/recommended-with-json5'], json.configs.recommended)
        },
        {
            name: 'dtrw:json:overrides',
            files: ['**/*.{json,jsonc,json5}', ...additionalFilesJson, ...additionalFilesJson5, ...additionalFilesJsonc],
            rules: { 'jsonc/indent': ['error', 2] }
        }
    );
}
