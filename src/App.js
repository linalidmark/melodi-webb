import React, { Component } from "react";
import songbird from "./songbird.svg";
import "./Styles/App.css";
import ScoreCard from "./Components/ScoreCard";
import ScoreCardTabs from "./Components/ScoreCardTabs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      scoreCards: [
        {
          number: 1,
          artist: "Faith Kakembo",
          title: "Chasing rivers"
        },
        {
          number: 2,
          artist: "Suzi P",
          title: "Moves"
        },
        {
          number: 3,
          artist: "Felix Sandman",
          title: "Boys with Emotions"
        },
        {
          number: 4,
          artist: "The Mamas",
          title: "Move"
        }
      ]
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/artist").then(data => this.setState({ data }));

    console.log(this.data);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Melodi</h1>
          <img src={songbird} className="App-logo" alt="logo" />
        </header>
        Name: <input className="name" />
        <br />
        Group: <input className="group" />
        <div className="scorecard-container">
          <ScoreCardTabs scoreCards={this.state.scoreCards} />
          <div id="content">
            {this.state.scoreCards.map(card => {
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
