import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./new.css";

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

  render() {
    const { editorState } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <div className="new-container">
          <div className="new__options">
            <h2 className="options__title">My Entries</h2>
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default New;
