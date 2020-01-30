import React, { Component } from "react";
import songbird from "./songbird.svg";
import "./Styles/App.css";
import ScoreCardTabs from "./Components/ScoreCardTabs";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      ],
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
        Name: <input className="name" />
        <br />
        Group: <input className="group" />
        <ScoreCardTabs scoreCards={this.state.scoreCards} />
      </div>
    );
  }
}

export default App;
