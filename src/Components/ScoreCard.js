import React, { Component } from "react";
import "../Styles/ScoreCard.scss";
import StarRating from "../Components/StarRating";

class ScoreCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      song: 0,
      show: 0,
      comment: ""
    };

    this.sendVote = this.sendVote.bind(this);
    this.setComment = this.setComment.bind(this);
    this.updateShowScore = this.updateShowScore.bind(this);
    this.updateSongScore = this.updateSongScore.bind(this);
  }

  sendVote() {
    fetch("http://localhost:5000/vote", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        artist: this.props.artist,
        title: this.props.title,
        number: this.props.number,
        song: this.state.song,
        show: this.state.show,
        comment: this.state.comment
      })
    });
  }

  setComment(event) {
    this.setState({ comment: event.target.value });
  }

  updateSongScore(score) {
    this.setState({ song: score });
  }

  updateShowScore(score) {
    this.setState({ show: score });
  }

  render() {
    return (
      <div id={this.props.id} className="score-card">
        <div className="artist-image"></div>
        <div className="score-container">
          <h1>{this.props.artist}</h1>
          <h2>{this.props.title}</h2>
          <div className="scoring">
            <div className="star-scoring">
              <p>SONG</p>
              <StarRating
                value={this.props.songScore}
                onClick={this.setSong}
                handleChange={this.updateSongScore}
              />

            </div>

            <div className="star-scoring">
              <p>SHOW</p>
              <StarRating
                value={this.props.showScore}
                onClick={this.setShow}
                handleChange={this.updateShowScore}
              />

            </div>

            <div className="comment-input">
              <p>COMMENT</p>
              <input value={this.props.comment} onChange={this.setComment} />
            </div>
            <button onClick={this.sendVote}>SEND</button>
          </div>
        </div>
      </div>
    );
  }

}
export default ScoreCard;
