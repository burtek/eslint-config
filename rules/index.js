import eslintReactKit from '@eslint-react/kit';

import jsxShorthandBoolean from './jsx-shorthand-boolean.js';
import jsxShorthandFragment from './jsx-shorthand-fragment.js';
import noUselessSplice from './no-useless-splice.js';


export default eslintReactKit()
    .use(jsxShorthandBoolean)
    .use(jsxShorthandFragment)
    .use(noUselessSplice)
    .getPlugin();
