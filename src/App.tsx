import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useReducer } from 'react';
import Sentence from './components/Sentence/Sentence';
import Home from './pages/Home';
import WordsProvider from './components/Sentence/WordsProvider/WordsProvider';
import type { State, Action } from './App.types';

function wordsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_WORD_LIST':
      return { ...state, wordMap: ([] as (HTMLElement | null)[]).concat(action.wordMap) };
    case 'CAPTURE_WORD':
      return { ...state, capture: action.capture, eventCapture: action.eventCapture };
    case 'SET_START_COORDINATES':
      return {
        ...state,
        coordsXY: ([] as Record<'x' | 'y', string | number>[]).concat(action.coordsXY),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(wordsReducer, {
    wordMap: [],
    capture: false,
    eventCapture: undefined,
    coordsXY: [],
  });
  return (
    <BrowserRouter>
      <WordsProvider>
        <Sentence state={state} dispatch={dispatch} />
      </WordsProvider>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
