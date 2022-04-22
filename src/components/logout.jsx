import React, { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
