const readmeUpdater = {
  readVersion(contents) {
      return /@dtrw\/eslint-config@~(\d+\.\d+\.\d+) eslint/.exec(contents)[1];
  },
  writeVersion(contents, version) {
      if (version.includes('-'))
          return contents; // do not write prerelease version to README;

      const newVersion = version.split('.').with(2, 0).join('.');
      return contents
          .replaceAll(
            /(?<=@dtrw\/eslint-config@~)\d+\.\d+\.\d+(?= eslint)/g,
            newVersion
          )
          .replaceAll(
            /(?<=badge\.socket\.dev\/npm\/package\/@dtrw\/eslint-config\/)\d+\.\d+\.\d+(?=\))/g,
            version
          );
  },
}

const config = {
  types: [
    { type: 'feat', section: 'Features' },
    { type: 'fix', section: 'Bug Fixes' },
    { type: 'chore', section: 'Chores' },
    { type: 'docs', section: 'Documentation changes:' },
    { type: 'refactor', hidden: 'Chores' },
    { type: 'test', hidden: true },
    { type: 'types', hidden: true }
  ],
  packageFiles: [
    {
      filename: 'package.json',
      type: 'json'
    }
  ],
  bumpFiles: [
    {
      filename: 'README.md',
      updater: readmeUpdater
    },
    {
      filename: 'package.json',
      type: 'json'
    }
  ]
};

export default config;
