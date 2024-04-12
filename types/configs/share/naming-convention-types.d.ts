type PredefinedFormatsString = 'camelCase' | 'strictCamelCase' | 'PascalCase' | 'StrictPascalCase' | 'snake_case' | 'UPPER_CASE';
type UnderscoreOptionsString = 'forbid' | 'allow' | 'require' | 'requireDouble' | 'allowDouble' | 'allowSingleOrDouble';
type SelectorsString = 'variable' | 'function' | 'parameter' | 'parameterProperty' | 'accessor' | 'enumMember' | 'classMethod' | 'objectLiteralMethod' | 'typeMethod' | 'classProperty' | 'objectLiteralProperty' | 'typeProperty' | 'class' | 'interface' | 'typeAlias' | 'enum' | 'typeParameter' | 'import';
type MetaSelectorsString = 'default' | 'variableLike' | 'memberLike' | 'typeLike' | 'method' | 'property';
type IndividualAndMetaSelectorsString = MetaSelectorsString | SelectorsString;
type ModifiersString = 'const' | 'readonly' | 'static' | 'public' | 'protected' | 'private' | '#private' | 'abstract' | 'destructured' | 'global' | 'exported' | 'unused' | 'requiresQuotes' | 'override' | 'async' | 'default' | 'namespace';
type TypeModifiersString = 'boolean' | 'string' | 'number' | 'function' | 'array';
interface MatchRegex {
    regex: string;
    match: boolean;
}
export interface Selector {
    format: PredefinedFormatsString[] | null;
    custom?: MatchRegex;
    leadingUnderscore?: UnderscoreOptionsString;
    trailingUnderscore?: UnderscoreOptionsString;
    prefix?: string[];
    suffix?: string[];
    selector: IndividualAndMetaSelectorsString | IndividualAndMetaSelectorsString[];
    modifiers?: ModifiersString[];
    types?: TypeModifiersString[];
    filter?: MatchRegex | string;
}
export {};
