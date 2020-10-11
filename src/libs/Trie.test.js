import Trie from './Trie';

describe('Tests for Trie data structure', () => {
    let trie;
    beforeAll(() => {
        trie = new Trie();
    })

    test('Should add & find an element', () => {
        trie.add('sigfried');

        const node = trie.search('sigfried');
        expect(node.value).toBe('sigfried');
        expect(node.letter).toBe('d');
    });

    test('Should suggest 3 words', () => {
        trie.add('red');
        trie.add('redux');
        trie.add('reducer');
        trie.add('redmond');

        const result = trie.suggestions('red');

        expect(result).toHaveLength(3);
        expect(result).toStrictEqual(['redux', 'reducer', 'redmond'])
    });


})
