import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import { UserSession, AppConfig } from "blockstack";

import "./entries.css";

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });
const options = { decrypt: false };

class Entries extends Component {
  state = {
    entries: JSON.parse(localStorage.getItem("bliss.entries")) || []
  };

  componentDidMount() {
    userSession
      .getFile("bliss.entries.json", options)
      .then(data => {
        const entries = JSON.parse(data);
        localStorage.setItem("bliss.entries", data);
        this.setState({ entries });
      })
      .catch(err => {
        console.error(err);
      });
  }

  getEntries = () => {
    const { entries } = this.state;
    if (!entries)
      return (
        <span>You have no entries so far. Go ahead and create one now.</span>
      );
    else
      return entries.map(entry => {
        return (
          <Link key={entry.id} to={`/post/${entry.id}`}>
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
    if (!userSession.isUserSignedIn()) this.props.history.push("/");
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
