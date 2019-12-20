import "../Styles/StarRating.css";
import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
var _ = require("lodash");

function Star(props) {
  return (
    <div
      className={`star ${props.value == 0 ? "semi-active" : ""} ${
        props.position <= props.rated ? "active" : ""
      } `}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={faStar} />
    </div>
  );
}

class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: Array(5).fill(-1),
      rated: 0
    };
  }

  handleMouseOver(i) {
    let currentRating = this.state.rated;

    if (currentRating > 0) {
      const hoverRatedStars = this.state.stars.slice();
      _.fill(hoverRatedStars, 0, currentRating, i);
      this.setState({ stars: hoverRatedStars });
    } else {
      const hoverStars = Array(5).fill(-1);
      _.fill(hoverStars, 0, 0, i + 1);
      this.setState({ stars: hoverStars });
    }
  }

  handleMouseOut() {
    let currentRating = this.state.rated;
    if (currentRating > 0) {
      const resetRatedStars = this.state.stars.slice();
      _.fill(resetRatedStars, -1, currentRating, resetRatedStars.length);
      this.setState({ stars: resetRatedStars });
    } else {
      const resetStars = this.state.stars.slice();
      _.fill(resetStars, -1, 0, resetStars.length);
      this.setState({ stars: resetStars });
    }
  }

  handleClick(i) {
    const clickedStar = this.state.stars.slice();

    _.fill(clickedStar, 1, 0, i);
    _.fill(clickedStar, 1, i, clickedStar.length);

    this.setState({
      stars: clickedStar,
      rated: i
    });
  }

  renderStar(i) {
    return (
      <Star
        position={i}
        value={this.state.stars[i]}
        rated={this.state.rated}
        onMouseEnter={() => this.handleMouseOver(i)}
        onMouseLeave={() => this.handleMouseOut()}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="rating-stars-widget-outer">
        <div className="rating-stars">
          {this.renderStar(1)}
          {this.renderStar(2)}
          {this.renderStar(3)}
          {this.renderStar(4)}
          {this.renderStar(5)}
        </div>
      </div>
    );
  }
}

export default StarRating;
