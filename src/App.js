import React, { Component } from "react";
import songbird from "./songbird.svg";
import "./Styles/App.css";
import ScoreCard from "./Components/ScoreCard";
import ScoreTable from "./Components/ScoreTable";
import ScoreCardTabs from "./Components/ScoreCardTabs";
import {columnsGroup, columnsAll} from "./Helpers/ColumnsHelper.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: [],
      group: [{artistNr: "", song: 1, show: 1, user: ""}],
      all: [{artistNr: "", song: 1, show: 1, user: ""}]
    };
    this.getArtist = this.getArtist.bind(this);
    this.getGroupVote = this.getGroupVote.bind(this);
    this.getAllVotes = this.getAllVotes.bind(this);
  }

  componentDidMount() {
    this.getArtist();
    this.getGroupVote();
    this.getAllVotes();
  }

  getGroupVote () {
    fetch("http://localhost:5000/group/5")
    .then(res => res.json())
    .then(data => {
      this.setState({ group: data });
    });
  }

  
  getAllVotes() {
    fetch("http://localhost:5000/all")
      .then(res => res.json())
      .then(data => {
        this.setState({ all: data });
    });
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
                  key={card.number}
                  number={card.number} //jag fattar inte varför detta fungerar, o inte props.key
                  id={"#" + card.number}
                  artist={card.artist}
                  title={card.title}
                />
              );
            })}
          </div>
        </div>
        <ScoreTable vote={this.state.group} columns={columnsGroup} number={this.state.artist.number}/>
        <ScoreTable vote={this.state.all}   columns={columnsAll}   number={this.state.artist.number}/>
      </div>
    );
  }
}

export default App;
