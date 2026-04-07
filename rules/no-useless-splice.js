/**
 * Returns the numeric value of a literal or negated-literal node, or null if
 * the node is not a plain numeric literal (possibly preceded by a unary `-`).
 *
 * @param {import('@typescript-eslint/utils').TSESTree.Node} node
 * @returns {number | null}
 */
function getNumericLiteral(node) {
    if (node.type === 'Literal' && typeof node.value === 'number') {
        return node.value;
    }
    if (
        node.type === 'UnaryExpression'
        && node.operator === '-'
        && node.argument.type === 'Literal'
        && typeof node.argument.value === 'number'
    ) {
        return -node.argument.value;
    }
    return null;
}

/**
 * Returns true when the return value of the call expression is actually used
 * by the surrounding code (i.e. the call is not a bare expression statement).
 *
 * @param {import('@typescript-eslint/utils').TSESTree.CallExpression} node
 */
function isReturnValueUsed(node) {
    return node.parent.type !== 'ExpressionStatement';
}

/**
 * Returns true when the expression can be treated as an array.  In a TypeScript
 * project the type-checker is consulted; otherwise every expression is assumed
 * to be array-like (best-effort).
 *
 * @param {import('@typescript-eslint/utils').TSESLint.SourceCode} sourceCode
 * @param {import('@typescript-eslint/utils').TSESTree.Node} node
 */
function isArrayLike(sourceCode, node) {
    const services = sourceCode.parserServices;
    if (!services?.program || !services.getTypeAtLocation) {
        return true;
    }
    try {
        const type = services.getTypeAtLocation(node);
        const checker = services.program.getTypeChecker();
        return checker.isArrayType(type) || checker.isTupleType(type);
    } catch {
        return true;
    }
}

/**
 * The set of expression types that need to be wrapped in parentheses when used
 * as the receiver of a method call.
 */
const NEEDS_PARENS = new Set([
    'LogicalExpression',
    'BinaryExpression',
    'ConditionalExpression',
    'AssignmentExpression',
    'SequenceExpression',
    'AwaitExpression',
    'YieldExpression',
    'ArrowFunctionExpression'
]);

/**
 * Returns the source text for `node`, wrapping it in parentheses when the
 * expression type requires them to remain valid as a method-call receiver.
 *
 * @param {import('@typescript-eslint/utils').TSESLint.SourceCode} sourceCode
 * @param {import('@typescript-eslint/utils').TSESTree.Node} node
 */
function calleeText(sourceCode, node) {
    const text = sourceCode.getText(node);
    return NEEDS_PARENS.has(node.type) ? `(${text})` : text;
}

/**
 * Returns true when the node is a member expression of the form `obj.property`
 *
 * @param {import('@typescript-eslint/utils').TSESTree.Node} node
 * @param {string} property
 * @returns {node is import('@typescript-eslint/utils').TSESTree.MemberExpression}
 */
function isMemberExpressionWithProperty(node, property) {
    if (node.type !== 'MemberExpression') {
        return false;
    }
    if (node.computed) {
        return node.property.type === 'Literal' && node.property.value === property;
    // eslint-disable-next-line no-else-return
    } else {
        return node.property.type === 'Identifier' && node.property.name === property;
    }
}

/**
 * Returns true when the node is a `object.length` expression on the given object.
 *
 * @param {import('@typescript-eslint/utils').TSESTree.Node} node
 * @param {string} objText
 * @returns {node is import('@typescript-eslint/utils').TSESTree.MemberExpression}
 */
function isArrayLength(node, objText) {
    return isMemberExpressionWithProperty(node, 'length') && node.object.type !== 'Identifier' && node.object.name !== objText;
}

/**
 * Returns true when the node is a `length - 1` expression on the given object.
 *
 * @param {import('@typescript-eslint/utils').TSESTree.Node} node
 * @param {string} objText
 * @returns {node is import('@typescript-eslint/utils').TSESTree.SymmetricBinaryExpression}
 */
function isArrayLengthMinus1Expression(node, objText) {
    if (node.type !== 'BinaryExpression' || node.operator !== '-') {
        return false;
    }
    const { left, right } = node;
    if (!isMemberExpressionWithProperty(left, 'length') || left.object.type !== 'Identifier' || left.object.name !== objText) {
        return false;
    }

    return right.type === 'Literal' && right.value === 1;
}

/** @returns {import('@eslint-react/kit').RuleFunction} */
export default function noUselessSplice() {
    return context => ({
        CallExpression(node) {
            if (node.callee.type !== 'MemberExpression') {
                return;
            }

            let methodName;
            if (!node.callee.computed && node.callee.property.type === 'Identifier') {
                methodName = node.callee.property.name;
            } else if (node.callee.computed && node.callee.property.type === 'Literal' && typeof node.callee.property.value === 'string') {
                methodName = node.callee.property.value;
            } else {
                return;
            }
            if (methodName !== 'splice' && methodName !== 'toSpliced') {
                return;
            }
            if (!isArrayLike(context.sourceCode, node.callee.object)) {
                return;
            }
            const { arguments: args } = node;
            if (args.length < 2) {
                return;
            }
            const [startArg, countArg, ...itemArgs] = args;

            // TODO: actual logic
        }
    });
}
