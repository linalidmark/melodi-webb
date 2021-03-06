import React from "react";
import StarRating from "../Components/StarRating";

export function ScoreCell() {
  return (
    <input
      className="score-cell"
      type="number"
      placeholder="score"
      min="1"
      max="10"
    ></input>
  );
}

export function StarRatingCell() {
  return <StarRating className="star-rating-cell" />;
}

export function CommentCell() {
  return <input className="comment-cell" />;
}
