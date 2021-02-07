import React, { useContext, useEffect, useState } from 'react';
import WordsContext from '../WordsProvider/WordsContext';
import NucleusProps from './Nucleus.types';

const Cell = ({ dataKey, children }: { dataKey: number | string; children?: JSX.Element }) => (
  <li className="sentence__item" data-key={dataKey}>
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

const Nucleus = (props: NucleusProps) => {
  const [cells, setCells] = useState<JSX.Element[]>([]);
  const wordsMap = useContext(WordsContext);
  let nucleus: JSX.Element[] = [];
  wordsMap.forEach((item) => {
    nucleus.push(
      <Cell key={item.id} dataKey={item.id}>
        <Word word={item.word} dataId={item.id} />
      </Cell>,
    );
  });

  function restorePlaceWord(params: { className: string }) {
    if (!props.state.eventCapture) {
      return;
    }
    const target = props.state.eventCapture.target as HTMLElement;
    const { className } = params;
    const targetId = Number(target.dataset.id);
    const { x, y } = props.state.coordsXY[targetId];
    target.classList.add(className);
    target.style.left = `${+x + window.pageXOffset}px`;
    target.style.top = `${+y + window.pageYOffset}px`;
  }

  function insertWord() {
    if (!props.state.eventCapture) {
      return;
    }
    const target = props.state.eventCapture?.target as HTMLElement;
    const targetId = Number(target.dataset.id);
    const targetText = target.innerText;
    const targetWrapper = (
      <Cell key={targetId} dataKey={targetId}>
        <Word word={targetText} dataId={targetId} />
      </Cell>
    );

    const homeCells: JSX.Element[] = [];
    let prev = 0;

    cells.forEach((item) => {
      if (targetId >= prev && targetId < Number(item.key)) {
        homeCells.push(targetWrapper);
      }
      homeCells.push(item);
      prev = Number(item.key);
    });
    homeCells.pop();
    setCells(homeCells);
    target.remove();
  }

  useEffect(() => {
    if (props.restoreWord) {
      const restoreOptions = { className: 'sentence__word_active' };
      restorePlaceWord(restoreOptions);
      setTimeout(() => {
        insertWord();
      }, 700);
    }
  });

  function findIndexOfKey(target: React.MouseEvent, key: string) {
    const keyMap = nucleus.map((v) => v.key);
    const found = keyMap.indexOf(key);
    return found;
  }

  function handlerMouseDown(event: React.MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.sentence__word')) {
      return;
    }
    const key = (target?.parentElement as HTMLElement).dataset.key;
    if (!key) {
      return;
    }
    if (cells.length) {
      nucleus = ([] as JSX.Element[]).concat(cells);
    }
    props.setDataState({ inRestore: false });
    props.setDataState({ inField: { active: false, placeUnder: undefined } });
    const { top, left } = target.getBoundingClientRect();
    const [...newCoords] = props.state.coordsXY;
    newCoords[Number(key)] = { x: left, y: top };
    props.dispatch({ type: 'SET_START_COORDINATES', coordsXY: newCoords });
    props.dispatch({ type: 'CAPTURE_WORD', capture: true, eventCapture: event });
    const index = findIndexOfKey(event, key);
    const lastKey = Number(nucleus[nucleus.length - 1].key);
    const nextKey = lastKey + 1;
    nucleus.splice(index, 1);
    nucleus.push(<Cell key={nextKey} dataKey={nextKey} />);
    setCells(() => ([] as JSX.Element[]).concat(nucleus));
  }

  return (
    <div className="sentence__nucleus">
      <ul className="sentence__list" onMouseDown={handlerMouseDown} role="presentation">
        {cells.length ? cells : nucleus}
      </ul>
    </div>
  );
};

export default Nucleus;
