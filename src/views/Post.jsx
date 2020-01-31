import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserSession, AppConfig } from "blockstack";

import "./post.css";

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

class Post extends Component {
  getPost = () => {
    const postId = this.props.match.params.id;
    const post = JSON.parse(localStorage.getItem("bliss.entries")).filter(
      entry => entry.id === postId
    )[0];
    console.log(post);

    return (
      <div className="post">
        <div
          className="post__content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
        <div className="post__date">{post.date}</div>
        <div className="post__time">{post.time}</div>
      </div>
    );
  };

  render() {
    if (!userSession.isUserSignedIn()) this.props.history.push("/");
    return (
      <React.Fragment>
        <Navbar />
        <div className="post__container">
          <div className="post__options">
            <Link to="/entries" className="btn">
              My Journal
            </Link>
            <Link to="/new" className="btn">
              New Entry
            </Link>
          </div>
          <div className="post__body">{this.getPost()}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Post;
