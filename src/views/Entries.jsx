import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import "./entries.css";

class Entries extends Component {
  getEntries = () => {
    const entries = JSON.parse(localStorage.getItem("bliss.entries")) || [];
    console.log("e", typeof entries);
    if (entries.length === 0)
      return (
        <span>You have no entries so far. Go ahead and create one now.</span>
      );
    else
      return entries.map(entry => {
        return (
          <Link to={`/post/${entry.id}`}>
            <div className="entry">
              <div
                className="entry__content"
                dangerouslySetInnerHTML={{ __html: entry.content }}
              ></div>
              <div className="entry__date">{entry.date}</div>
              <div className="entry__time">{entry.time}</div>
            </div>
          </Link>
        );
      });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="entries-container">
          <h2 className="entries__title">My Journal</h2>
          <div className="entries__sub-container">
            <Link to="/new" className="btn">
              New Entry
            </Link>
            <div className="entries">{this.getEntries()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Entries;
