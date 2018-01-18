import React, { Component } from "react";
import { connect } from "react-redux";
import { createApplication } from "../actions/data";
import { Button, Form, Segment } from "semantic-ui-react";

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
    this.props.handleOk();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="Company Name"
            name="companyName"
            onChange={this.handleChange}
            value={this.state.companyName}
          />
        </Form.Field>
        <Form.Field>
          <label>Address</label>
          <input
            placeholder="Address"
            name="companyAddress"
            onChange={this.handleChange}
            value={this.state.companyAddress}
          />
        </Form.Field>
        <Form.Field>
          <label>How did you apply?</label>
          <input
            placeholder="How did you apply?"
            name="applicationMethod"
            onChange={this.handleChange}
            value={this.state.applicationMethod}
          />
        </Form.Field>
        <Form.Field>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Field>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return { user_id: state.user.id };
}

export default connect(mapStateToProps, { createApplication })(ApplicationForm);
