describe('Tests for search()', () => {
    it('should return an array with values containing the serach string', () => {
        expect(search('apple')).toEqual(['Apple', 'Custard apple', 'Pineapple'])
    });
    it('should should work with upper and lower case', () => {
        expect(search('APPle')).toEqual(['Apple', 'Custard apple', 'Pineapple'])
    });
    it('should should return an empty array if no items are found', () => {
        expect(search('tom sawyer ')).toEqual([])
    });
});