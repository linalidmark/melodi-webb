import React, { Component } from "react";
import "../Styles/ScoreCardTabs.scss";
import ScoreCard from "./ScoreCard";

class ScoreCardTabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scoreCards: this.props.scoreCards,
      currentCardNumber: 1
    }
    this.handleClick = this.handleClick.bind(this);
    console.log(this.props.scoreCards);

  }

  handleClick(e) {
    e.preventDefault();
    var target = e.target.href;
    window.location = target;
    var current = target.split("#").slice(-1)[0];
    this.setState({ currentCardNumber: current });
  }


  render() {
    const content = this.state.scoreCards.map(function (card) {
      var tabNumber = card.number;
      if (card.number == this.state.currentCardNumber) {
        return (
          <li>
            <a className="active" href={"#" + card.number} onClick={(e) => this.handleClick(e)}>
              {tabNumber}
            </a>
          </li>
        );
      } else {
        return (
          <li>
            <a href={"#" + card.number} onClick={(e) => this.handleClick(e)}>
              {tabNumber}
            </a>
          </li>
        );
      }
    }.bind(this));

    const cards = this.state.scoreCards.map(function (card) {
      var active = card.number == this.state.currentCardNumber;
      return (
        <ScoreCard
          active={active}
          id={"#" + card.number}
          artist={card.artist}
          title={card.title}
        />
      );
    }.bind(this));

    return <div className="scorecard-container"><ul className="tabs group">{content}</ul>{cards}</div>;
  }

}

export default ScoreCardTabs;
