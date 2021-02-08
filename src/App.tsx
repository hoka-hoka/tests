// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useEffect } from 'react';
// import Sentence from './components/Sentence/Sentence';
// import Home from './pages/Home';
// import WordsProvider from './components/Sentence/WordsProvider/WordsProvider';
// import type { State, Action } from './App.types';

function App() {
  useEffect(() => {
    fetch('https://mockend.com/hoka-hoka/tests/posts')
      .then((response) => response.json)
      .then((result) => console.log(result));
  });
  return <div>123</div>;
}

export default App;
