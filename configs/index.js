import { defineFlatConfig } from 'eslint-define-config';

import { prepareConfig as base } from './base.js';
import { prepareConfig as cypress } from './cypress.js';
import { prepareConfig as jest } from './jest.js';
import { prepareConfig as json } from './json.js';
import { prepareConfig as lodash } from './lodash.js';
import { prepareConfig as node } from './node.js';
import { prepareConfig as react } from './react.js';
import { prepareConfig as testingLibrary } from './testing-library.js';

/** @satisfies {Record<string, (config?: any) => import('eslint-define-config').FlatESLintConfig[]>} */
export const configs = {
    base,
    cypress,
    jest,
    json,
    lodash,
    node,
    react,
    testingLibrary
};

/**
 * @template {keyof typeof configs} T
 * @typedef {NonNullable<Parameters<(typeof configs)[T]>[0]>} Config
 */

/**
 * Creates eslint flat config based on provided configuration object.
 *
 * @param {{ [K in Exclude<keyof typeof configs, 'base'>]?: Config<K> | true }} [providedConfigs]
 * @returns
 */
export function prepareConfig(providedConfigs = {}) {
    /** @type {{ [K in keyof typeof configs]?: Config<K> | true }} */
    const config = { ...providedConfigs, base: true };
    const configKeys = /** @type {Array<keyof typeof configs>} */(Object.keys(configs));

    /**
     * @template {keyof typeof configs} T
     * @param {T} key
     */
    function mapConfig(key) {
        if (!config[key]) {
            return [];
        }
        if (config[key] === true) {
            return configs[key]();
        }
        // @ts-expect-error -- TODO: fixme
        return configs[key](config[key]);
    }

    return defineFlatConfig([
        ...base(),
        ...configKeys.flatMap(mapConfig)
    ]);
}
