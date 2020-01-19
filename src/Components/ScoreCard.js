import React from "react";
import "../Styles/ScoreCard.scss";
import StarRating from "../Components/StarRating";

function ScoreCard(props) {
  return (
    <div className="score-card">
      <div className="artist-image"></div>
      <div className="score-container">
        <h1>{props.artist}</h1>
        <h2>{props.title}</h2>
        <div className="scoring">
          <div className="star-scoring">
            <p>SONG</p>
            <StarRating value={props.songScore} />
          </div>

          <div className="star-scoring">
            <p>SHOW</p>
            <StarRating value={props.showScore} />
          </div>

          <div className="comment-input">
            <p>COMMENT</p>
            <input value={props.comment} />
          </div>
          <button>SEND</button>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
