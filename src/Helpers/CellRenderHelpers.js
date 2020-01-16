import React from "react";
import StarRating from "../Components/StarRating";


export function handleChange(event) {
  const data = "abc"
  fetch( 'http://localhost:5000/api/v1', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    method: 'POST',
    body: JSON.stringify({
      song: event.target.value,
  })
  });
  console.log("handleChange")
}

export function ScoreCell() {
  console.log("scorecell");
  
  return (
    <input onChange={handleChange}
      className="score-cell"
      type="number"
      placeholder="score"
      min="1"
      max="10"
    ></input >
  );
}

export function StarRatingCell() {
  return <StarRating className="star-rating-cell" />;
}

export function CommentCell() {
  return <input className="comment-cell" />;
}
