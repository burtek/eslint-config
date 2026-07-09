const base = require('./.versionrc.base.cjs');

module.exports = {
  ...base,
  scripts: {
    prechangelog: './cleanup-changelog.sh pre',
    postchangelog: './cleanup-changelog.sh post',
  },
  commitAll: true
};
