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

describe('Tests for showSuggestions()', () => {
    it('should add the found items to the suggestions div', () => {
        showSuggestions(['Apple', 'Custard apple', 'Pineapple']);
        expect(suggestions.childElementCount).toEqual(3);
        expect(suggestions.children[0].innerText).toEqual('Apple');
        expect(suggestions.children[1].innerText).toEqual('Custard apple');
        expect(suggestions.children[2].innerText).toEqual('Pineapple');
    });
});

afterEach(() => {
    suggestions.innerHTML = '';
    suggestions.classList.remove('has-suggestions')
})