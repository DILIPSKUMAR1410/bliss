import React, { Component } from "react";
import Navbar from "../components/Navbar";

import hedgehog from "../public/images/hedghog.gif";
import walking from "../public/images/loading.gif";
import { UserSession, AppConfig } from "blockstack";

import "./home.css";

const appConfig = new AppConfig();
const userSession = new UserSession(appConfig);

class Home extends Component {
  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
        this.props.history.push("/entries");
        this.setState({ userData: userData });
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar notLoggedIn />
        <div className="landing">
          <div className="landing__sub landing__sub--1">
            <p className="landing__desc">
              Start the art of journaling as it brings with itself a sure sense
              of positivity.
            </p>
            <p className="landing__desc">
              <span className="bliss">Bliss</span> is a gratitude journal that
              nudges you to cultivate the habit of being thankful everyday and
              experience the change
            </p>
            <p className="landing__desc">It is built on Blockstack Platform.</p>
            <p className="landing__desc">
              Start by exploring what <span className="bliss">Bliss</span> is
              all about.
            </p>
          </div>
          <div className="landing__sub landing__sub--2">
            <img src={hedgehog} alt="" />
          </div>
        </div>
        <div className="loading">
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
      </React.Fragment>
    );
  }
}

export default Home;
