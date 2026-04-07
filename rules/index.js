import eslintReactKit from '@eslint-react/kit';

import jsxShorthandBoolean from './jsx-shorthand-boolean.js';
import jsxShorthandFragment from './jsx-shorthand-fragment.js';
import noUselessSplite from './no-useless-splite.js';


export default eslintReactKit()
    .use(jsxShorthandBoolean)
    .use(jsxShorthandFragment)
    .use(noUselessSplite)
    .getPlugin();
