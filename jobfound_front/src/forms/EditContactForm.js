import React, { Component } from "react";
import { connect } from "react-redux";
import { editContact, createContact } from "../actions/data";
import { Button, Form } from "semantic-ui-react";

class EditContactForm extends Component {
  state = this.props.contact
    ? {
        contactName: this.props.contact.name,
        contactEmail: this.props.contact.email,
        contactPhone: this.props.contact.phone_num
      }
    : { contactName: "", contactEmail: "", contactPhone: "" };

  handleSubmit = e => {
    e.preventDefault();
    const contactPayload = {
      contact: {
        name: this.state.contactName,
        phone_num: this.state.contactPhone,
        email: this.state.contactEmail
      }
    };
    if (this.props.contact) {
      this.props.editContact(this.props.contact.id, contactPayload);
    } else {
      this.props.createContact(contactPayload);
    }
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
            placeholder="Name"
            name="contactName"
            onChange={this.handleChange}
            value={this.state.contactName}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            name="contactEmail"
            onChange={this.handleChange}
            value={this.state.contactEmail}
          />
        </Form.Field>
        <Form.Field>
          <label>Phone</label>
          <input
            placeholder="Phone"
            name="contactPhone"
            onChange={this.handleChange}
            value={this.state.contactPhone}
          />
        </Form.Field>
        <Form.Field>
          <Button type="primary" htmltype="submit" onSubmit={this.handleSubmit}>
            Update
          </Button>
          <Button type="primary" onClick={this.props.handleOk}>
            Cancel
          </Button>
        </Form.Field>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return { contact: state.activeContact };
}

export default connect(mapStateToProps, { editContact, createContact })(
  EditContactForm
);
