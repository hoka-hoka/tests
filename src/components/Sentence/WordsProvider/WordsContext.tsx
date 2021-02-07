import React from 'react';

const WordsContext = React.createContext([
  {
    id: 0,
    word: '',
    position: 0,
    translate: '',
  },
]);
export default WordsContext;
