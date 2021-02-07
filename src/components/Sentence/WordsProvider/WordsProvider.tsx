import React from 'react';
import WordsContext from './WordsContext';

const words = [
  {
    id: 0,
    word: 'kids',
    position: 3,
    translate: 'дети',
  },
  {
    id: 1,
    word: 'You',
    position: 0,
    translate: 'Вы',
  },
  {
    id: 2,
    word: 'this',
    position: 6,
    translate: 'это',
  },
  {
    id: 3,
    word: 'must',
    position: 4,
    translate: 'должны',
  },
  {
    id: 4,
    word: 'event',
    position: 7,
    translate: 'событие',
  },
  {
    id: 5,
    word: 'your',
    position: 2,
    translate: 'ваши',
  },
  {
    id: 6,
    word: 'and',
    position: 1,
    translate: 'и',
  },
  {
    id: 7,
    word: 'visit',
    position: 5,
    translate: 'посетить',
  },
];

const WordsProvider = ({ children }: { children: JSX.Element }) => (
  <WordsContext.Provider value={words}>{children}</WordsContext.Provider>
);

export default WordsProvider;
