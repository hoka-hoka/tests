import React, { useContext, useEffect, useState } from 'react';
import WordsContext from '../WordsProvider/WordsContext';
import FieldProps from './Field.types';

const Cell = ({ dataKey, children }: { dataKey: number | string; children?: JSX.Element }) => (
  <li className="sentence__cell" data-key={dataKey}>
    {children}
  </li>
);

Cell.defaultProps = {
  children: <></>,
};

const Word = ({ dataId, word }: { dataId: number; word: string }) => (
  <div className="sentence__word" data-id={dataId}>
    {word}
  </div>
);

const Field = (props: FieldProps) => {
  const wordsMap = useContext(WordsContext);
  const wordsListJSX: JSX.Element[] = [];
  wordsMap.forEach((item) => {
    wordsListJSX.push(<Cell key={item.id} dataKey={item.id} />);
  });
  const [wordsList, setWordsList] = useState<JSX.Element[]>([...wordsListJSX]);

  function handlerMouseDown(event: React.MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.sentence__word')) {
      return;
    }
    const [...newWordMap] = props.state.wordMap;
    const [...list] = wordsList;

    const placeKey = Number(target.parentElement?.dataset.key);
    list.splice(placeKey, 1, <Cell key={placeKey} dataKey={placeKey} />);
    setWordsList(list);

    newWordMap.splice(placeKey, 1, null);
    props.dispatch({ type: 'SET_WORD_LIST', wordMap: newWordMap });

    props.setDataState({ inRestore: false });
    props.setDataState({ inField: { active: false, placeUnder: undefined } });
    props.dispatch({ type: 'CAPTURE_WORD', capture: true, eventCapture: event });
  }

  useEffect(() => {
    if (props.fixWord.active) {
      if (!props.state.eventCapture) {
        return;
      }
      const target = props.state.eventCapture.target as HTMLElement;
      const targetId = Number(target.dataset.id);
      const targetText = target.innerText;
      const [...newWordMap] = props.state.wordMap;
      const [...list] = wordsList;
      target.style.cssText = `position: none;
      left: none,
      right: none`;
      const placeKey = Number(props.fixWord.placeUnder?.dataset.key);
      const targetWrapper = (
        <Cell key={placeKey} dataKey={placeKey}>
          <Word word={targetText} dataId={targetId} />
        </Cell>
      );
      list.splice(placeKey, 1, targetWrapper);
      setWordsList(list);

      newWordMap[placeKey] = target;
      props.dispatch({ type: 'SET_WORD_LIST', wordMap: newWordMap });
      target.remove();
    }
  }, [props.fixWord.active]);

  return (
    <div className="sentence__field">
      <ul className="sentence__rectangle" onMouseDown={handlerMouseDown} role="presentation">
        {wordsList}
      </ul>
    </div>
  );
};

export default Field;
