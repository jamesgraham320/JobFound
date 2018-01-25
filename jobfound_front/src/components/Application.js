import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Divider } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { setActiveApp } from "../actions/data";
import { Spin, Row, Col, Button, Modal } from "antd";
import ContactsTable from "./ContactsTable";
import EditContactForm from "../forms/EditContactForm";
import NotesContainer from "../containers/NotesContainer";
import StagesContainer from "../containers/StagesContainer";
import { setActiveContact } from "../actions/data";

class Application extends Component {
  state = { visible: false };

  showModal = e => {
    this.props.setActiveContact(-1);
    this.setState({ visible: true });
  };

  handleOk = e => {
    this.setState({ visible: false });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  render() {
    if (
      !this.props.application ||
      typeof this.props.application.company === "undefined"
    ) {
      return <Spin />;
    } else {
      const app = this.props.application;
      const activeContact = app.company.contacts
        ? app.company.contacts.find(contact => contact.active)
        : null;
      const contactList = app.company.contacts;
      return (
        <div className="container">
          <div className="application-header-container">
            <Header as="h2">{app.company.name}</Header>
            <Divider />
            <Header as="h3">{app.company.address}</Header>
          </div>
          <div className="application-contacts-container">
            <div>
              <h3 style={{ display: "inline-block" }}>Contacts</h3>
              <Button
                style={{ display: "inline-block", float: "right" }}
                onClick={this.showModal}
              >
                New Contact
              </Button>
              <Modal
                footer={null}
                title="New Contact"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <EditContactForm handleOk={this.handleOk} />
              </Modal>
            </div>
            <div style={{ height: "35vh", overflowY: "auto" }}>
              <ContactsTable />
            </div>
          </div>
          <NotesContainer />
          <StagesContainer />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  //state.user.applications.find(app => app === id)
  return {
    application: state.activeApplication,
    loading: state.loading,
    activeContact: state.activeContact
  };
}

export default withRouter(
  connect(mapStateToProps, { setActiveContact, setActiveApp })(Application)
);
