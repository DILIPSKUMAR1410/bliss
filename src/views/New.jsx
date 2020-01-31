import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import shortid from "shortid";

import { UserSession, AppConfig } from "blockstack";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./new.css";

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });
const options = { encrypt: false };

class New extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  getToolbar = () => {
    return {
      options: ["fontSize", "fontFamily", "colorPicker"]
    };
  };

  handleSubmit = e => {
    let newEntry = {};

    newEntry.id = shortid.generate();

    newEntry.content = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );

    newEntry.date = new Date()
      .toDateString()
      .split(" ")
      .splice(1)
      .join(" ");

    newEntry.time = new Date()
      .toTimeString()
      .split(":")
      .splice(0, 2)
      .join(":");

    let entries = JSON.parse(localStorage.getItem("bliss.entries")) || [];
    entries.push(newEntry);
    userSession
      .putFile("bliss.entries.json", JSON.stringify(entries), options)
      .then(() => {
        localStorage.setItem("bliss.entries", JSON.stringify(entries));
        this.props.history.push("/entries");
      });
  };

  render() {
    const { editorState } = this.state;
    if (!userSession.isUserSignedIn()) this.props.history.push("/");
    return (
      <React.Fragment>
        <Navbar />
        <div className="new-container">
          <div className="new__options">
            <Link to="/entries">
              <h2 className="options__title">My Entries</h2>
            </Link>
          </div>
          <div className="new__editor">
            <Editor
              editorState={editorState}
              toolbarClassName="toolbar"
              wrapperClassName="wrapper"
              editorClassName="editor"
              onEditorStateChange={this.onEditorStateChange}
              toolbar={this.getToolbar()}
            />
            <button className="new__submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default New;
