import React, { Component } from "react";
import { connect } from "react-redux";

class ContentContainer extends Component {
  render() {
    const listData = this.props.applications.map(app => {
      return <p>hello</p>;
    });
    return { listData };
  }
}

function mapStateToProps(state) {
  return { applications: state.user.applications };
}

export default connect(mapStateToProps)(ContentContainer);
