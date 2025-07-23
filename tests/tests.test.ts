import { readdirSync, promises as fs$ } from 'node:fs';
import { resolve } from 'node:path';

import { Linter } from 'eslint';
import tseslint from 'typescript-eslint';

import { prepareConfig } from '../configs';


vitest.mock(import('@typescript-eslint/types'), async importOriginal => ({ ...await importOriginal() }));

describe.each<{
    config: Pick<NonNullable<Parameters<typeof prepareConfig>[0]>, 'jest'>;
    settings: Partial<Record<'jest', { version: number }>>;
}>([
    {
        config: { jest: { mode: 'vitest' } },
        settings: {}
    },
    {
        config: { jest: true },
        settings: { jest: { version: 30 } }
    }
])('Eslint configs', ({ config: conf, settings }) => {
    let config: Linter.Config[];

    const testsDirname = resolve(process.cwd(), 'tests');
    const fixturesPath = resolve(testsDirname, 'fixtures');
    const files = readdirSync(fixturesPath, { withFileTypes: true }).filter(f => f.isFile() && f.name.startsWith('file-'));

    beforeAll(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        config = tseslint.config(
            ...prepareConfig({
                cypress: true,
                jest: conf.jest,
                json: true,
                lodash: true,
                node: true,
                react: true,
                testingLibrary: true
            }),
            {
                name: 'local-overrides',
                languageOptions: {
                    parserOptions: { project: 'tsconfig.test.json' },
                    sourceType: 'module'
                },
                settings: {
                    react: { version: '18.0' },
                    ...settings
                }
            }
        ) as Linter.Config[];
    });

    it.each(files)('should return no errors for $name', async ({ parentPath, name }) => {
        const content = await fs$.readFile(resolve(parentPath, name), { encoding: 'utf8' });

        const linter = new Linter({ configType: 'flat' });
        let lintResult: unknown[] = [];
        function validate() {
            lintResult = linter.verify(
                content,
                config,
                resolve('tests/fixtures', name)
            );
        }

        expect(validate).not.toThrow();
        expect(lintResult).toHaveLength(0);
    }, 2000);
});
