import React, { Component } from "react";
import { connect } from "react-redux";
import { signInUser } from "../actions/data";

class Login extends Component {
  render() {
    return <button onClick={signInUser}>Log In With Google!</button>;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, signInUser)(Login);
