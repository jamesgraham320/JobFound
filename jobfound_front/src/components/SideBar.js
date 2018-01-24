import React, { Component } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { Menu, Icon, Button, Modal } from "antd";
import ApplicationForm from "../forms/ApplicationForm";
import { logOutUser } from "../actions/data";

class SideBar extends Component {
  state = { visible: false };

  showModal = () => {
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
    return (
      <Menu
        style={{ marginTop: 10 }}
        theme="dark"
        mode="inline"
        selectable={false}
      >
        <Menu.Item key="0">
          <Button type="primary" onClick={this.showModal} size="large">
            New Application
          </Button>
          <Modal
            footer={null}
            title="What Company did you apply to?"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <ApplicationForm handleOk={this.handleOk} />
          </Modal>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/">
            <Icon type="bars" />
            <span className="nav-text">Applications</span>
          </Link>
        </Menu.Item>
        <Menu.Item onClick={this.props.logOutUser} key="3">
          <Icon type="user" />
          <span className="nav-text">Log Out</span>
        </Menu.Item>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { logOutUser })(SideBar);
