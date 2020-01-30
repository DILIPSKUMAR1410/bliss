import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./views/Home";
import New from "./views/New";
import Entries from "./views/Entries";
import Post from "./views/Post";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/new" component={New} />
        <Route path="/entries" component={Entries} />
        <Route path="/post/:id" component={Post} />
      </Router>
    </div>
  );
}

export default App;
