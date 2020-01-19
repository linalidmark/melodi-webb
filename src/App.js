import React, { Component } from 'react';
import songbird from './songbird.svg';
import './Styles/App.css';
import Scoretable from './Components/ScoreTable';
import { render } from 'react-dom';
import ScoreCard from "./Components/ScoreCard";

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
      fetch('http://localhost:5000/artist')
        .then(data => this.setState({ data }));

      console.log(this.data);
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Melodi</h1>
          <img src={songbird} className="App-logo" alt="logo" />
        </header>
        Name: <input className="name"/>
        <br/>
        Group: <input className="group"/>
        <ScoreCard artist="FAITH KAKEMBO" title="Chasing rivers" />
      </div>
    );
  }
}

export default App;
