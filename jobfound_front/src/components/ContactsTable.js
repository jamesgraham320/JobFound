import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { Collapse, Row, Col, Button, Modal } from "antd";
import EditContactForm from "../forms/EditContactForm";
import { setActiveContact } from "../actions/data";

class ContactsTable extends Component {
  state = { visible: false };

  showModal = (e, id) => {
    this.props.setActiveContact(id);
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
    console.log(this.props);
    const contactList = this.props.contacts
      ? this.props.contacts.map(contact => {
          return (
            <Collapse.Panel
              key={contact.id}
              header={
                <Row gutter={0}>
                  <Col span={5}>{contact.name}</Col>
                  <Col span={8}>{contact.email}</Col>
                  <Col span={4}>{contact.phone_num}</Col>
                  <Col span={4}>
                    <Button
                      onClick={e => this.showModal(e, contact.id)}
                      style={{ float: "right" }}
                      size="small"
                    >
                      Edit
                    </Button>
                    <Modal
                      footer={null}
                      title="Edit Contact"
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                    >
                      <EditContactForm handleOk={this.handleOk} />
                    </Modal>
                  </Col>
                </Row>
              }
            >
              Content here
            </Collapse.Panel>
          );
        })
      : null;
    return <Collapse bordered={false}>{contactList}</Collapse>;
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    contacts: state.activeApplication.company.contacts
  };
}

export default connect(mapStateToProps, { setActiveContact })(ContactsTable);
