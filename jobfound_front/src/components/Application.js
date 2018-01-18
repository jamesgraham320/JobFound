import React, { Component } from "react";
import { connect } from "react-redux";

class Application extends Component {
  render() {
    if (this.props.loading) {
      return <div />;
    } else {
      const app = this.props.application;
      console.log(app);
      const activeContact = app.company.contacts
        ? app.company.contacts.find(contact => contact.active)
        : null;
      console.log(activeContact);
      return <div>hello</div>;
    }
  }
}

function mapStateToProps(state) {
  //state.user.applications.find(app => app === id)
  return {
    application: state.activeApplication,
    loading: state.loading
  };
}

export default connect(mapStateToProps)(Application);
