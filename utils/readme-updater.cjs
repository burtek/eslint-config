module.exports.readVersion = function(contents) {
    return /@dtrw\/eslint-config@~(\d+\.\d+\.\d+) eslint/.exec(contents)[1];
}
module.exports.writeVersion = function (contents, version) {
    if (version.includes('-')) return contents; // do not write prerelease version to README;
    
    const newVersion = version.split('.').with(2, 0).join('.');
    return contents
        .replaceAll(
            /@dtrw\/eslint-config@~\d+\.\d+\.\d+ eslint/g,
            `@dtrw/eslint-config@~${newVersion} eslint`
        )
        .replaceAll(
            /badge\.socket\.dev\/npm\/package\/@dtrw\/eslint-config\/\d+\.\d+\.\d+\)/g,
            `badge.socket.dev/npm/package/@dtrw/eslint-config/${newVersion})`
        );
};
