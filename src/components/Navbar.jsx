import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import "./navbar.css";

class Navbar extends Component {
  getDefaultNav = () => {
    return (
      <nav className="nav">
        <div className="nav__logo">
          <img src={logo} alt="" className="logo__img" />
          <span className="logo__text">Bliss</span>
        </div>
        <a className="nav__login">Login</a>
      </nav>
    );
  };

  getUserNav = () => {
    return (
      <nav className="nav">
        <div className="nav__logo">
          <img src={logo} alt="" className="logo__img" />
          <span className="logo__text">Bliss</span>
        </div>
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
