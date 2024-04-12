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
export function prepareConfig(providedConfigs?: {
    react?: true | {
        a11y?: boolean | undefined;
        nextjs?: boolean | undefined;
    } | undefined;
    cypress?: true | undefined;
    jest?: true | {
        mode?: "jest" | "vitest" | undefined;
    } | undefined;
    json?: true | {
        additionalFiles?: Partial<Record<"json" | "jsonc" | "json5", string[]>> | undefined;
    } | undefined;
    lodash?: true | undefined;
    node?: true | undefined;
    testingLibrary?: true | undefined;
} | undefined): Promise<import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray>;
export namespace configs {
    export { base };
    export { cypress };
    export { jest };
    export { json };
    export { lodash };
    export { node };
    export { react };
    export { testingLibrary };
}
export type Config<T extends "react" | "cypress" | "jest" | "json" | "lodash" | "base" | "node" | "testingLibrary"> = NonNullable<Parameters<(typeof configs)[T]>[0]>;
export type FlatESLintConfig = import('typescript-eslint').Config;
import { prepareConfig as base } from './base.js';
import { prepareConfig as cypress } from './cypress.js';
import { prepareConfig as jest } from './jest.js';
import { prepareConfig as json } from './json.js';
import { prepareConfig as lodash } from './lodash.js';
import { prepareConfig as node } from './node.js';
import { prepareConfig as react } from './react.js';
import { prepareConfig as testingLibrary } from './testing-library.js';
