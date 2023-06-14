import "./App.css";
import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./component/Navigation";
import Profile from "./component/Profile";
import Checklist from "./component/Checklists";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Checklist />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    );
  }
}

export default App;
