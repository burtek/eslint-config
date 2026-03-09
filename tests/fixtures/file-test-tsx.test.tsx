function greet(name: string): string {
    return `Hello, ${name}!`;
}

describe('greet', () => {
    it('creates a greeting', () => {
        expect(greet('World')).toBe('Hello, World!');
    });
});
