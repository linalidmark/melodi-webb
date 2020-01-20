import React from "react";
import "../Styles/ScoreCardTabs.scss";

function ScoreCardTabs({ scoreCards }) {
  function handleClick(e) {
    e.preventDefault();
    var target = e.target.href;
    window.location = target;
    var current = target.split("/").slice(-1)[0];
    console.log(current);
    var list = document.getElementsByTagName("a");
    for (let item of list) {
      item.classList.remove("active");
    }
    e.target.classList.add("active");
    var cards = document.getElementsByClassName("score-card");
    for (let card of cards) {
      card.style.display = "none";
    }
    document.getElementById(current).style.display = "flex";
  }

  const content = scoreCards.map(function(card) {
    if (card.number == 1) {
      return (
        <li>
          <a className="active" href={"#" + card.number} onClick={handleClick}>
            {card.number}
          </a>
        </li>
      );
    } else {
      return (
        <li>
          <a href={"#" + card.number} onClick={handleClick}>
            {card.number}
          </a>
        </li>
      );
    }
  });

  return <ul className="tabs group">{content}</ul>;
}

export default ScoreCardTabs;
