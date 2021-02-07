import React, { useContext } from 'react';
import WordsContext from '../WordsProvider/WordsContext';

const Word = ({ word }: { word: string }) => (
  <li className="sentence__task-item">
    <div className="sentence__task-word">{word}</div>
  </li>
);

const Cloud = () => {
  const wordsMap = ([] as {
    id: number;
    word: string;
    position: number;
    translate: string;
  }[]).concat(useContext(WordsContext));
  wordsMap.sort((a, b) => a.position - b.position);
  const wordsListJSX: JSX.Element[] = [];
  wordsMap.forEach((item) => {
    wordsListJSX.push(<Word key={item.id} word={item.translate} />);
  });

  return (
    <div className="sentence__cloud">
      <ul className="sentence__task-list">{wordsListJSX}</ul>
    </div>
  );
};

export default Cloud;
