/** @returns {import('@eslint-react/kit').RuleFunction} */
export default function jsxShorthandFragment() {
    return context => ({
        JSXElement(node) {
            const { openingElement } = node;
            const { name } = openingElement;
            const isFragment
                = (name.type === 'JSXIdentifier' && name.name === 'Fragment')
                    || (
                        name.type === 'JSXMemberExpression'
                        && name.object.type === 'JSXIdentifier' && name.object.name === 'React'
                        && name.property.type === 'JSXIdentifier' && name.property.name === 'Fragment'
                    );
            if (!isFragment) {
                return;
            }
            if (openingElement.attributes.length > 0) {
                return;
            }
            context.report({
                node,
                message: "Use fragment shorthand syntax instead of 'Fragment' component.",
                fix(fixer) {
                    const { closingElement } = node;
                    if (closingElement === null) {
                        return [];
                    }
                    return [
                        fixer.replaceTextRange([openingElement.range[0], openingElement.range[1]], '<>'),
                        fixer.replaceTextRange([closingElement.range[0], closingElement.range[1]], '</>')
                    ];
                }
            });
        }
    });
}
