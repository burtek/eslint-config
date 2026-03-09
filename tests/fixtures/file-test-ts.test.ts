function concatenate(a: string, b: string): string {
    return `${a}${b}`;
}

describe('concatenate', () => {
    it('joins two strings', () => {
        expect(concatenate('foo', 'bar')).toBe('foobar');
    });
});
