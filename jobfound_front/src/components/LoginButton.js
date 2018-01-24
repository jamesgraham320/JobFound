import React, { Component } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signInUser } from "../actions/data";

class Login extends Component {
  render() {
    return (
      <Button
        type="primary"
        size="large"
        onClick={() =>
          this.props.signInUser(this.props.history)
        }
      >
        Log In With Google!
      </Button>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default withRouter(connect(mapStateToProps, { signInUser })(Login));
