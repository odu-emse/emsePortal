import React, { Component } from "react";
import { removeToken, getToken } from "../helpers";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (getToken() !== `Bearer ${null}` || getToken() !== undefined) {
      removeToken();
      return this.props.history.push("/users/login");
    } else {
      this.props.history.push("/users/login");
    }
  }
}

export default Logout;
