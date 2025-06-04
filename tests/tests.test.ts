import { readdirSync, promises as fs$ } from 'node:fs';
import { resolve } from 'node:path';

import { Linter } from 'eslint';
import tseslint from 'typescript-eslint';

import { prepareConfig } from '../configs';


const TIMEOUT = 1000;
describe('Eslint configs', () => {
    const testsDirname = resolve(process.cwd(), 'tests');
    const fixturesPath = resolve(testsDirname, 'fixtures');
    const files = readdirSync(fixturesPath, { withFileTypes: true }).filter(f => f.isFile() && f.name.startsWith('file-'));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    const config = tseslint.config(
        ...prepareConfig({
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
                parserOptions: { project: 'tsconfig.test.json' },
                sourceType: 'module'
            },
            settings: { react: { version: '18.0' } }
        }
    ) as Linter.Config[];

    it.each(files)('should return no errors for $name', async ({ path, name }) => {
        const content = await fs$.readFile(resolve(path, name), { encoding: 'utf8' });

        const linter = new Linter({ configType: 'flat' });
        let lintResult: Linter.LintMessage[] = [];
        function validate() {
            lintResult = linter.verify(
                content,
                config,
                resolve('tests/fixtures', name)
            );
        }
        expect(validate).not.toThrow();
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(lintResult).toHaveLength(0);
    }, TIMEOUT);
});
