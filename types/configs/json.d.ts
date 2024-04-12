/**
 * @param {Object} [config]
 * @param {Partial<Record<'json' | 'jsonc' | 'json5', string[]>>} [config.additionalFiles]
 */
export function prepareConfig({ additionalFiles: { json: additionalFilesJson, json5: additionalFilesJson5, jsonc: additionalFilesJsonc } }?: {
    additionalFiles?: Partial<Record<"json" | "jsonc" | "json5", string[]>> | undefined;
} | undefined): import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray;
export type Rules = Partial<import('@typescript-eslint/utils').TSESLint.SharedConfig.RulesRecord>;
