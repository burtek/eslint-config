import base from './.versionrc.base.mjs';


const config = {
  ...base,
  scripts: {
    prechangelog: './cleanup-changelog.sh pre',
    postchangelog: './cleanup-changelog.sh post',
  },
  commitAll: true
};

export default config;
