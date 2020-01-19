import React, { Component } from 'react';
import songbird from './songbird.svg';
import './Styles/App.css';
import ScoreCard from "./Components/ScoreCard";


class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      artist: []
    };
    this.getArtist = this.getArtist.bind(this);
  
  }

  componentDidMount() {
    this.getArtist()
  }

  getArtist() {
    fetch('http://localhost:5000/artist')
      .then(res => res.json())
      .then((data) => {
          this.setState({artist:data});
      });
}
  
  render() {
    
    console.log("data: " + this.state.artist)
    try {
      return (
        <div className="App">
          <header className="App-header">
            
          </header>
          <ScoreCard artist={this.state.artist[0].Artist} title={this.state.artist[0].Låt} />
        </div>
      );
    } catch (error) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Melodi</h1>
            <img src={songbird} className="App-logo" alt="logo" />
          </header>
        </div>
      );
    }
  }
}

export default App;
