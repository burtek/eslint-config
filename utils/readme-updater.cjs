module.exports.readVersion = function(contents) {
    return /@dtrw\/eslint-config@~(\d+\.\d+\.\d+) eslint/.exec(contents)[1];
}
module.exports.writeVersion = function (contents, version) {
    const newVersion = version.split('.').with(2, 0).join('.');
    return contents.replaceAll(
        /@dtrw\/eslint-config@~\d+\.\d+\.\d+ eslint/g,
        `@dtrw/eslint-config@~${newVersion} eslint`
    );
};
