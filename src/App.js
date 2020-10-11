import React, { useRef, useState, useEffect } from 'react';
import './App.css';

import Suggestions from './components/Suggestions';

import { useDebounce } from './common/hooks/';

import Trie from './libs/Trie';

const KEY_CODE = {
  ENTER: 13,
};

const trie = new Trie();
const DEBOUNCE = 500;

function App() {
  const inputRef = useRef(null);
  const searchInputRef = useRef(null);

  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE)

  const insertString = () => {
    const newString = inputRef.current.value;
    trie.add(newString);
    inputRef.current.value = '';

    console.log(`Added ${newString}`);
  }

  const searchString = () => {
    const searchValue = searchInputRef.current.value;
    const result = trie.search(searchValue);
    if (result) {
      console.log(`String ${searchValue} found`);
    }
  }

  const handleSubmit = (evt) => {
    const { which} = evt;
    if (which === KEY_CODE.ENTER) {
      insertString();
      inputRef.current.value = '';
    }
  }

  const printTrie = () => {
    trie.print();
  }

  useEffect(() => {
    if (debouncedSearchQuery) {
      const suggested = trie.suggestions(debouncedSearchQuery);
      setSuggestions(suggested);
    }

  }, [debouncedSearchQuery])

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <input
            className="input-string"
            ref={inputRef}
            onKeyDown={handleSubmit}
            placeholder="Insert string"
          />
          <Suggestions
            suggestions={suggestions}
          />
          <input
            className="search-string"
            onChange={(evt) => setSearchQuery(evt.target.value)}
            placeholder="String to search"
          />
          <button className="insert-button" onClick={insertString}>Insert string</button>
          <button className="search-button" onClick={searchString}>Search string</button>
          <button onClick={printTrie}>Print trie</button>
        </div>
      </div>
    </div>
  );
}

export default App;
