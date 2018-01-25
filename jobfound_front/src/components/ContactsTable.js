import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { Collapse, Row, Col, Button, Modal } from "antd";
import EditContactForm from "../forms/EditContactForm";
import { setActiveContact } from "../actions/data";

class ContactsTable extends Component {
  state = { visible: false, chosenContact: {} };

  showModal = e => {
    this.props.setActiveContact(parseInt(e.target.name, 10));
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
    const contactList = this.props.contacts
      ? this.props.contacts.map(contact => {
          return (
            <Collapse.Panel
              key={contact.id}
              header={
                <Row gutter={0}>
                  <Col span={6}>{contact.name}</Col>
                  <Col span={10}>{contact.email}</Col>
                  <Col span={7}>{contact.phone_num}</Col>
                  <Col span={1}>
                    <Button
                      name={contact.id}
                      onClick={this.showModal}
                      style={{ float: "right" }}
                      size="small"
                    >
                      Edit
                    </Button>
                  </Col>
                </Row>
              }
            >
              Content here
            </Collapse.Panel>
          );
        })
      : null;
    return (
      <div>
        <Collapse bordered={false}>{contactList}</Collapse>
        <Modal
          footer={null}
          title="Edit Contact"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <EditContactForm handleOk={this.handleOk} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    contacts: state.activeApplication.company.contacts
  };
}

export default connect(mapStateToProps, { setActiveContact })(ContactsTable);
