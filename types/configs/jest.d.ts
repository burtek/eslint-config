/**
 * @param {Object} [config]
 * @param {'jest' | 'vitest'} [config.mode]
 */
export function prepareConfig({ mode }?: {
    mode?: "jest" | "vitest" | undefined;
} | undefined): import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray;
