import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../public/images/logo.png";
import { UserSession, AppConfig } from "blockstack";

import "./navbar.css";

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

class Navbar extends Component {
  handleLogin = e => {
    e.preventDefault();
    userSession.redirectToSignIn();
  };

  handleLogout = e => {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  };

  getDefaultNav = () => {
    return (
      <nav className="nav">
        <div className="nav__logo">
          <img src={logo} alt="" className="logo__img" />
          <span className="logo__text">Bliss</span>
        </div>
        {userSession.isUserSignedIn() ? (
          <div>
            <button className="nav__link" onClick={this.handleLogout}>
              Logout
            </button>
            <Link className="nav__login" to="/entries">
              My Entries
            </Link>
          </div>
        ) : (
          <button className="nav__login" onClick={this.handleLogin}>
            Login
          </button>
        )}
      </nav>
    );
  };

  getUserNav = () => {
    return (
      <nav className="nav">
        <Link to="/">
          <div className="nav__logo">
            <img src={logo} alt="" className="logo__img" />
            <span className="logo__text">Bliss</span>
          </div>
        </Link>
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav__item">
            <Link to="/entries">Entries</Link>
          </li>
          <li className="nav__item">
            <Link to="/new">New Entry</Link>
          </li>
          <li className="nav__item">
            <button className="nav__link">Logout</button>
          </li>
        </ul>
      </nav>
    );
  };

  render() {
    if (this.props.notLoggedIn) {
      return this.getDefaultNav();
    } else {
      return this.getUserNav();
    }
  }
}

export default Navbar;
