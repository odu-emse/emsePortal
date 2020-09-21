import React, { Component } from "react";
import { removeToken, getToken } from "../helpers";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (getToken() !== `Bearer ${null}` || getToken() !== undefined) {
      removeToken();
      return this.props.history.push("/users/login");
    } else {
      return this.props.location;
    }
  }
}

export default Logout;
