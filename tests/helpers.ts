import { Linter } from 'eslint';
import { expect } from 'vitest';
import tseslint from 'typescript-eslint';

import { prepareConfig } from '../configs';


type PrepareConfigOptions = NonNullable<Parameters<typeof prepareConfig>[0]>;

export function buildConfig(options: PrepareConfigOptions = {}): Linter.Config[] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return tseslint.config(
        ...prepareConfig(options),
        {
            name: 'test-overrides',
            languageOptions: {
                parserOptions: {
                    disallowAutomaticSingleRunInference: true,
                    project: './tsconfig.test.json'
                },
                sourceType: 'module'
            },
            settings: {
                react: { version: '19.0' }
            }
        }
    ) as Linter.Config[];
}

function normalizeEol(content: string): string {
    return content.replace(/\r\n/g, '\n');
}

export function lintNoMessages(
    content: string,
    filename: string,
    config: Linter.Config[]
): void {
    const linter = new Linter({ configType: 'flat' });
    const messages = linter.verify(content, config, filename);
    expect(messages).toStrictEqual([]);
}

export interface LintFixOptions {
    input: string;
    expected: string;
    filename: string;
    config: Linter.Config[];
}

export function lintFixAndCompare({ input, expected, filename, config }: LintFixOptions): void {
    const linter = new Linter({ configType: 'flat' });

    const { output } = linter.verifyAndFix(input, config, { filename });
    expect(normalizeEol(output)).toBe(normalizeEol(expected));

    const secondMessages = linter.verify(output, config, filename);
    expect(secondMessages).toStrictEqual([]);
}
