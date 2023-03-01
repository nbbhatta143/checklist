import { Component } from "react";
import React from "react";
import { Link } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul id="navigation">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;
