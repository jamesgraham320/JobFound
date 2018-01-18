import React, { Component } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { NavLink } from "react-router-dom";
import { Menu, Icon, Button, Modal } from "antd";
import ApplicationForm from "../forms/ApplicationForm";

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
        <Menu.Item key="1">
          <Icon type="home" />
          <span className="nav-text">Home</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="bars" />
          <span className="nav-text">Applications</span>
        </Menu.Item>
        <Menu.Item key="3">
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

export default connect(mapStateToProps)(SideBar);
