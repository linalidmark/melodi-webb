import React from 'react';
import songbird from './songbird.svg';
import './Styles/App.css';
import Scoretable from './Components/ScoreTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Melodi</h1>
        <img src={songbird} className="App-logo" alt="logo" />
      </header>
      <Scoretable/>
    </div>
  );
}

export default App;
