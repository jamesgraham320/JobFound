import React, { Component } from "react";
import { connect } from "react-redux";
import { setActiveApp } from "../actions/data";
import Application from "../components/Application";

class ApplicationsContainer extends Component {
  state = {};
  componentWillReceiveProps(nextProps) {
    let splitUrl = this.props.location.pathname.split("/");
    let stringId = splitUrl[splitUrl.length - 1];
    const id = parseInt(stringId, 10);
    if (!this.props.loading) {
      this.props.setActiveApp(id);
    }
  }
  render() {
    if (this.props.loading) {
      return <p>loading</p>;
    } else {
      return <Application />;
    }
  }
}

function mapStateToProps(state) {
  return { application: state.activeApplication, lodaing: state.loading };
}

export default connect(mapStateToProps, { setActiveApp })(
  ApplicationsContainer
);
