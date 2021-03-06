import React, { Component } from "react";
import Navbar from "../components/Navbar";

import { UserSession, AppConfig } from "blockstack";

import "./home.css";
import Loader from "../components/Loader";

import Lottie from 'react-lottie';
import animationData from '../public/images/hedghog.json'

const appConfig = new AppConfig();
const userSession = new UserSession(appConfig);

class Home extends Component {
  state = {
    showLoader: false
  };

  showLoader = () => {
    console.log("show");
    this.setState({ showLoader: true });
  };

  componentDidMount() {
    if (userSession.isSignInPending()) {
      this.showLoader();
      userSession.handlePendingSignIn().then(userData => {
        this.props.history.push("/entries");
        this.setState({ userData: userData });
      });
    }
  }

  render() {
   const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }
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
            <Lottie options={defaultOptions}
              height={500} width={350}
            />
          </div>
        </div>

        {this.state.showLoader ? <Loader show /> : null}
      </React.Fragment>
    );
  }
}

export default Home;
