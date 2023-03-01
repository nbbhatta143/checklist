import React, { Component } from "react";

const divStyle = {
  color: "black",
};

class Profile extends Component {
  render() {
    return (
      <div style={divStyle}>
        <h2>Profile Page</h2>
        <main>
          <p>This section contains information profile...</p>
        </main>
      </div>
    );
  }
}

export default Profile;
