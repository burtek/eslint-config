module.exports = {
    extends: [
        "./eslint-config-react.js"
    ],
    plugins: [
        "jsx-a11y"
    ],
    overrides: [
        {
            files: ["*.jsx", "*.tsx"],
            extends: [
                "plugin:jsx-a11y/recommended"
            ]
        }
    ]
};
