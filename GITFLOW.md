# Git Flow description for this project

This project uses Git Flow for branch management:

- `master` - source of truth for production - get auto-deployed to npm repo. Also, is push-secured
- `eslint/x.y.z` - update for eslint configs to version `x.y.z`
- `tsc/x.y.z` - update for tsc configs to version `x.y.z`
- `stylelint/x.y.z` - update for stylelint configs to version `x.y.z`

`x.y` in branch name needs to match tool's minor version, while patch number `z` is used for own versioning needs in case of fixes and changes. **Due to that, `z` change might also be used for breaking changes, including enabling a rule as `"error"`.** Config packages therefore do not follow semantic versioning system.

Pull requests to `master` branch need to pass following tests:

- peerDependency version for the tool need to equal `x.y` or `~x.y.a` from branch name
- config must be validated correctly by tool's validation tool
- config's `package.json` `version` must match version in branch name
- there must not be a package already published with the same version as branch name
