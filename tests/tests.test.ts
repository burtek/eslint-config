import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, promises as fs$ } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { Linter } from 'eslint';
import tseslint from 'typescript-eslint';

import { prepareConfig } from '../configs';


vitest.mock(import('@typescript-eslint/types'), async importOriginal => ({ ...await importOriginal() }));

describe.each<{
    modeDesc: string;
    config: Pick<NonNullable<Parameters<typeof prepareConfig>[0]>, 'jest'>;
    settings: Partial<Record<'jest', { version: number }>>;
}>([
    {
        modeDesc: 'vitest',
        config: { jest: { mode: 'vitest' } },
        settings: {}
    },
    {
        modeDesc: 'jest',
        config: { jest: true },
        settings: { jest: { version: 30 } }
    }
])('Eslint configs in $modeDesc mode', ({ config: conf, settings }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    const config = tseslint.config(
        ...prepareConfig({
            cypress: true,
            jest: conf.jest,
            json: true,
            lodash: true,
            node: true,
            react: { nextjs: true, a11y: true },
            testingLibrary: true
        }),
        {
            name: 'local-overrides',
            languageOptions: {
                parserOptions: {
                    disallowAutomaticSingleRunInference: true,
                    project: './tsconfig.test.json'
                },
                sourceType: 'module'
            },
            settings: {
                react: { version: '19.0' },
                ...settings
            }
        }
    ) as Linter.Config[];

    const testsDirname = resolve(process.cwd(), 'tests');
    const fixturesPath = resolve(testsDirname, 'fixtures');
    const files = readdirSync(fixturesPath, { withFileTypes: true }).filter(f => f.isFile() && f.name.startsWith('file-'));

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
        expect(lintResult).toStrictEqual([]);
    }, 2000);
});

describe('cleanup-changelog.sh', () => {
    it('removes prerelease sections and local prerelease tags', async () => {
        const repoPath = mkdtempSync(join(tmpdir(), 'cleanup-changelog-'));
        const changelogPath = resolve(repoPath, 'CHANGELOG.md');
        const cleanupScriptPath = resolve(process.cwd(), 'cleanup-changelog.sh');

        try {
            await fs$.writeFile(
                changelogPath,
                [
                    '# Changelog',
                    '',
                    '## [1.0.1-alpha.1](https://example.test/compare/v1.0.1-alpha.0...v1.0.1-alpha.1)',
                    '',
                    '* prerelease change',
                    '',
                    '## [1.0.0](https://example.test/compare/v0.9.0...v1.0.0)',
                    '',
                    '* stable change',
                    ''
                ].join('\n'),
                { encoding: 'utf8' }
            );
            await fs$.writeFile(resolve(repoPath, 'README.md'), '# temp repo\n', { encoding: 'utf8' });

            execFileSync('git', ['init'], { cwd: repoPath });
            execFileSync('git', ['config', 'user.name', 'Test User'], { cwd: repoPath });
            execFileSync('git', ['config', 'user.email', 'test@example.com'], { cwd: repoPath });
            execFileSync('git', ['add', 'README.md'], { cwd: repoPath });
            execFileSync('git', ['commit', '-m', 'init'], { cwd: repoPath });
            execFileSync('git', ['tag', 'v1.0.0'], { cwd: repoPath });
            execFileSync('git', ['tag', 'v1.0.1-alpha.0'], { cwd: repoPath });
            execFileSync('git', ['tag', 'v1.0.1-alpha.1'], { cwd: repoPath });

            execFileSync(cleanupScriptPath, [changelogPath], { cwd: repoPath });

            await expect(fs$.readFile(changelogPath, { encoding: 'utf8' })).resolves.toBe([
                '# Changelog',
                '',
                '## [1.0.0](https://example.test/compare/v0.9.0...v1.0.0)',
                '',
                '* stable change',
                ''
            ].join('\n'));
            expect(execFileSync('git', ['tag', '-l'], { cwd: repoPath, encoding: 'utf8' })).toBe('v1.0.0\n');
        } finally {
            await fs$.rm(repoPath, { recursive: true, force: true });
        }
    }, 5000);
});
