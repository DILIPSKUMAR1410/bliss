import React, { Component } from "react";
import walking from "../public/images/loading.gif";

import "./loader.css";

class Loader extends Component {
  render() {
    if (!this.props.show) return null;
    return (
      <div className="loader">
        <img src={walking} alt="" className="loading__img" />
        <p className="loading__desc">
          Gratitude Journaling enhances positivity
        </p>
        <p className="loading__desc">Start by making one entry per day</p>
        <p className="loading__desc">A habit is difficult to cultivate</p>
        <p className="loading__desc">
          Keep your efforts on for few days before expecting any output
        </p>
        <p className="loading__desc">
          Explore <span className="bliss">Bliss</span>
        </p>
      </div>
    );
  }
}

export default Loader;
