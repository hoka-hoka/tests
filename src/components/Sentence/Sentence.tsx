import './Sentence.scss';
import React, { useState, useEffect, useContext } from 'react';
import SentenceProps from './Sentence.types';
import Avatar from './Avatar/Avatar';
import Cloud from './Cloud/Cloud';
import Field from './Field/Field';
import Nucleus from './Nucleus/Nucleus';
import Button from './Button/Button';
import Mistake from './Mistake/Mistake';
import WordsContext from './WordsProvider/WordsContext';

function Sentence(props: SentenceProps) {
  const { state, dispatch } = props;
  const wordsMap = useContext(WordsContext);
  const [restoreWord, setRestoreWord] = useState(false);
  const [fixWord, setFixWord] = useState<{ active: boolean; placeUnder: HTMLElement | undefined }>({
    active: false,
    placeUnder: undefined,
  });
  const [mistake, setMistake] = useState(false);

  function setDataState(options: {
    inField?: { active: boolean; placeUnder: HTMLElement | undefined };
    inRestore?: boolean;
  }) {
    const { inField, inRestore } = options;
    if (inField) {
      setFixWord(inField);
    } else if (typeof inRestore !== 'undefined') {
      setRestoreWord(inRestore);
    }
  }

  function moveWord(target: HTMLElement, pageX: number, pageY: number) {
    const elem = target;
    elem.style.left = `${pageX - target.offsetWidth / 2}px`;
    elem.style.top = `${pageY - target.offsetHeight / 2}px`;
  }

  function handlerMouseMove(event: MouseEvent) {
    let target = event.target as HTMLElement;
    if (props.state.eventCapture?.target !== target) {
      target = props.state.eventCapture?.target as HTMLElement;
    }
    moveWord(target, event.pageX, event.pageY);
  }

  function handlerMouseUp(event: MouseEvent) {
    const target = event.target as HTMLElement;

    target.hidden = true;
    const placeUnder = document.elementFromPoint(event.clientX, event.clientY);
    target.hidden = false;
    if (!placeUnder) {
      return;
    }
    const cell = placeUnder.closest('.sentence__cell') as HTMLElement;
    if (cell && !cell.hasChildNodes()) {
      setFixWord({ active: true, placeUnder: cell });
    } else {
      setRestoreWord(true);
    }
    document.removeEventListener('mousemove', handlerMouseMove);
    target.removeEventListener('mouseup', handlerMouseUp);
    props.dispatch({ type: 'CAPTURE_WORD', capture: false, eventCapture: undefined });
  }

  useEffect(() => {
    setMistake(false);
    const event = props.state.eventCapture;
    if (!event) {
      return;
    }
    const target = event.target as HTMLElement;
    target.style.position = 'absolute';
    document.body.append(target);
    moveWord(target, event.pageX, event.pageY);
    document.addEventListener('mousemove', handlerMouseMove);
    target.addEventListener('mouseup', handlerMouseUp);
  }, [props.state.capture]);

  function checkHunler() {
    const rezult = wordsMap.map((item, index) => {
      const target = props.state.wordMap[index];
      if (target) {
        const targetId = Number(target?.dataset.id);
        if (wordsMap[targetId].position === index) {
          return wordsMap[targetId].word;
        }
      }
      return undefined;
    });

    if (~rezult.indexOf(undefined)) {
      setMistake(true);
    } else {
      const utterance = new SpeechSynthesisUtterance(rezult.join(' '));
      utterance.pitch = 1.5;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
      setMistake(false);
    }
  }

  return (
    <div className="sentence">
      <h2 className="sentence__title">Translate this sentence</h2>
      <div className="sentence__top">
        <Avatar />
        <Cloud />
      </div>
      <Field state={state} dispatch={dispatch} fixWord={fixWord} setDataState={setDataState} />
      <Nucleus
        state={state}
        dispatch={dispatch}
        restoreWord={restoreWord}
        setDataState={setDataState}
      />
      <Mistake active={mistake} />
      {mistake && mistake}
      <Button onClick={checkHunler} state={state} dispatch={dispatch} />
    </div>
  );
}

export default Sentence;
