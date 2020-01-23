import React, { Component } from "react";
import songbird from "./songbird.svg";
import "./Styles/App.css";
import ScoreCard from "./Components/ScoreCard";
import ScoreCardTabs from "./Components/ScoreCardTabs";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: []
    };
    this.getArtist = this.getArtist.bind(this);
  }

  componentDidMount() {
    this.getArtist();
  }

  getArtist() {
    fetch("http://localhost:5000/artist")
      .then(res => res.json())
      .then(data => {
        this.setState({ artist: data });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Melodi</h1>
          <img src={songbird} className="App-logo" alt="logo" />
        </header>
        <div className="scorecard-container">
          <ScoreCardTabs scoreCards={this.state.artist} />
          <div id="content">
            {this.state.artist.map(card => {
              return (
                <ScoreCard
                  id={"#" + card.number}
                  artist={card.artist}
                  title={card.title}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
