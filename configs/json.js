import { defineFlatConfig } from 'eslint-define-config';
import * as jsonc from 'eslint-plugin-jsonc';
import jsonParser from 'jsonc-eslint-parser';

/** @typedef {Partial<import('eslint-define-config/src/rules/jsonc/index.js').JsoncRules>} JsoncRules  */
/** @typedef {Partial<import('eslint-define-config/src/rules/eslint/index.js').EslintRules>} EslintRules  */

const wellKnownJsonc = [
    '**/tsconfig.json',
    '**/jsconfig.json',
    '.vscode/**/*.json'
];

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
    return defineFlatConfig([
        {
            files: ['**/*.{json,jsonc,json5}', ...additionalFilesJson, ...additionalFilesJson5, ...additionalFilesJsonc],
            plugins: /** @type {any} */({ jsonc }),
            languageOptions: { parser: /** @type {any} */(jsonParser) },
            rules: /** @type {EslintRules} */(jsonc.configs.base.overrides[0].rules)
        },
        {
            files: ['**/*.json', ...additionalFilesJson],
            ignores: [...wellKnownJsonc],
            rules: {
                .../** @type {JsoncRules} */(jsonc.configs['recommended-with-json'].rules),
                'jsonc/indent': ['error', 2]
            }
        },
        {
            files: ['**/*.jsonc', ...wellKnownJsonc, ...additionalFilesJsonc],
            rules: {
                .../** @type {JsoncRules} */(jsonc.configs['recommended-with-jsonc'].rules),
                'jsonc/indent': ['error', 2]
            }
        },
        {
            files: ['**/*.json5', ...additionalFilesJson5],
            rules: {
                .../** @type {JsoncRules} */(jsonc.configs['recommended-with-json5'].rules),
                'jsonc/indent': ['error', 2]
            }
        }
    ]);
}
