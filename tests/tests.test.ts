import { readdirSync, promises as fs$ } from 'node:fs';
import { resolve } from 'node:path';

import { Linter } from 'eslint';
import tseslint from 'typescript-eslint';

import { prepareConfig } from '../configs';


describe('Eslint configs', () => {
    let config: Linter.FlatConfig[];

    const testsDirname = resolve(process.cwd(), 'tests');
    const fixturesPath = resolve(testsDirname, 'fixtures');
    const files = readdirSync(fixturesPath, { withFileTypes: true }).filter(f => f.isFile() && f.name.startsWith('file-'));

    beforeAll(async () => {
        config = tseslint.config(
            ...await prepareConfig({
                cypress: true,
                jest: true,
                json: true,
                lodash: true,
                node: true,
                react: true,
                testingLibrary: true
            }),
            {
                name: 'local-overrides',
                languageOptions: {
                    parserOptions: { project: 'tsconfig.json' },
                    sourceType: 'module'
                },
                settings: { react: { version: '18.0' } }
            }
        ) as Linter.FlatConfig[];
    });

    it.each(files)('should return no errors for $name', async ({ path, name }) => {
        const content = await fs$.readFile(resolve(path, name), { encoding: 'utf8' });

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
    }, 1000);
});
