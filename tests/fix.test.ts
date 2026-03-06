import { promises as fs$ } from 'node:fs';
import { resolve } from 'node:path';

import { buildConfig, lintFixAndCompare } from './helpers';


vitest.mock(import('@typescript-eslint/types'), async importOriginal => ({ ...await importOriginal() }));

const redFixturesPath = resolve(process.cwd(), 'tests', 'fixtures', 'red');

describe.each([
    {
        scenario: 'node',
        dir: 'node',
        basename: 'quotes',
        ext: '.ts',
        config: buildConfig({ node: true })
    },
    {
        scenario: 'react',
        dir: 'react',
        basename: 'quotes',
        ext: '.tsx',
        config: buildConfig({ react: { a11y: true } })
    },
    {
        scenario: 'vitest',
        dir: 'vitest',
        basename: 'quotes',
        ext: '.test.ts',
        config: buildConfig({ jest: { mode: 'vitest' } })
    },
    {
        scenario: 'testing-library',
        dir: 'testing-library',
        basename: 'quotes',
        ext: '.test.tsx',
        config: buildConfig({ react: { a11y: true }, jest: { mode: 'vitest' }, testingLibrary: true })
    }
])('Fix fixtures - $scenario', ({ dir, basename, ext, config }) => {
    it(`should autofix ${basename}${ext} to use single quotes`, async () => {
        const fixtureDir = resolve(redFixturesPath, dir);
        const input = await fs$.readFile(resolve(fixtureDir, `${basename}.input${ext}`), { encoding: 'utf8' });
        const expected = await fs$.readFile(resolve(fixtureDir, `${basename}.expected${ext}`), { encoding: 'utf8' });

        lintFixAndCompare({
            input,
            expected,
            filename: resolve('tests/fixtures/red', dir, `${basename}.input${ext}`),
            config
        });
    }, 10000);
});
