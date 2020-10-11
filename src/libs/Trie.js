class TrieNode {
    constructor(letter, children) {
        this.letter = letter || '';
        this.value = '';
        this.children = {};
    }

    /*
     * @return {boolean}
     */
    isPrefix = () => this.value !== '';

    /*
     * @return {string[]}
     */
    getChildren = () => Object.keys(this.children);
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    /*
     * @param {string} word - Word to add to the Trie
     * @return void
     */
    add = (word) => {
        /*
         * TODO:
         * 1. Check if letter already exists
         * 2. Add letters from `word` one by one to the `Trie`
         */
        const letters = Array.from(word);
        let currentNode = this.root;
        let index = 0;
        /*
         * NOTE:
         * Check if the letters from the word are already
         * inserted and if so, increase the index
         */
        while (currentNode.children[letters[index]]) {
            currentNode = currentNode.children[letters[index]];
            index++;
        }

        for (; index < letters.length; index++) {
            let currentLetter = letters[index];
            let newNode = new TrieNode(currentLetter);
            currentNode.children[currentLetter] = newNode;
            currentNode = newNode;
        }

        currentNode.value = letters.join('');
    }

    /*
     * @param {string} word - Word to search
     * @return {TrieNode}
     */
    search = (word) => {
        const letters = Array.from(word);
        let currentNode = this.root;

        let index = 0;

        while (true) {
            if (currentNode.value === word) {
                break;
            }
            let currentLetter = letters[index];
            if (currentNode.getChildren().includes(currentLetter)) {
                currentNode = currentNode.children[currentLetter];
                index++;
            } else {
                return null;
            }
        }

        return currentNode;
    }

    /*
     * @param {string} key - Word to search suggestions for
     * @return {string[]} suggestions - Suggested words
     */
    suggestions = (key) => {
        const word = this.search(key);
        const suggestions = [];

        if (word) {
            return this._suggestionWord(word, key, suggestions);
        }
        return [];
    }

    /*
     * @param {string} node - Word to search suggestions for
     * @param {string} lastWord - Word to search suggestions for
     * @param {string[]} suggestions - Word to search suggestions for
     * @return {string[]} suggestions - Suggested words
     */
    _suggestionWord = (node, lastWord, suggestions) => {
        const letters = node.getChildren();
        for (let index = 0; index < letters.length; index++) {
            let element = letters[index];
            if (node.children[element].isPrefix()) {
                /* NOTE: We have found a complete suggestions */
                suggestions.push(lastWord + node.children[element].letter);
            } else {
                /* NOTE:
                 * If not a complete suggestion, add the letter and visit
                 * the next node
                 */
                let rest = lastWord + node.children[element].letter;
                this._suggestionWord(node.children[element], rest, suggestions);
            }
        }

        return suggestions;
    }

    /*
     * @params {string} word - Word to remove
     * @return void
     */
    remove = (word) => {
        throw new Error('Not implemented yet');
    }

    print = () => {
        this._preorder(this.root);
    }

    _preorder = (node) => {
        if (node.getChildren().length === 0) {
            return;
        } else {
            let children = node.getChildren();
            for (let index = 0; index < children.length; index++) {
                let element = node.children[children[index]];
                console.log(`${'-'.repeat(index)} ${element.letter}`);
                this._preorder(element);
            }
        }
    }

}

export default Trie;
