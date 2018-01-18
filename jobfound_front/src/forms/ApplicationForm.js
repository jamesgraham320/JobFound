import React, { Component } from "react";
import { connect } from "react-redux";
import { createApplication } from "../actions/data";

class ApplicationForm extends Component {
  state = { companyName: "", applicationMethod: "", companyAddress: "" };

  handleSubmit = e => {
    e.preventDefault();
    const applicationPayload = {
      company: {
        name: this.state.companyName,
        address: this.state.companyAddress,
        source: this.state.applicationMethod
      },
      application: { user_id: this.props.user_id }
    };
    this.props.createApplication(applicationPayload);
    this.setState({
      companyName: "",
      applicationMethod: "",
      companyAddress: ""
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <form layout="vertical" onSubmit={this.handleSubmit}>
        <input
          placeholder="Company Name"
          name="companyName"
          onChange={this.handleChange}
          value={this.state.companyName}
        />
        <input
          placeholder="Address"
          name="companyAddress"
          onChange={this.handleChange}
          value={this.state.companyAddress}
        />
        <input
          placeholder="How did you apply?"
          name="applicationMethod"
          onChange={this.handleChange}
          value={this.state.applicationMethod}
        />
        <button type="primary" htmlType="submit">
          Create
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { user_id: state.user.id };
}

export default connect(mapStateToProps, { createApplication })(ApplicationForm);
