import React, { Component } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";
import { Item } from "semantic-ui-react";
import { setActiveApp } from "../actions/data";
import moment from "moment";

class ApplicationsList extends Component {
  handleClick = id => {
    this.props.setActiveApp(id);
    this.props.history.push(`/applications/${id}`);
  };
  render() {
    if (this.props.loading) {
      return <Spin size="large" />;
    } else {
      const listData = this.props.applications.map(app => {
        let divColor = "";
        switch (app.active_stage.name) {
          case "Submitted":
            divColor = "#ffec3d";
            break;
          case "Interviewing":
            divColor = "#73d13d";
            break;
          case "Closed":
            divColor = "#ff4d4f";
            break;
          case "Offer":
            divColor = "#597ef7";
            break;
          default:
            divColor = "#ff4d4f";
        }
        const divStyling = {
          height: "6.5vw",
          width: "6.5vw",
          paddingTop: "2.25vw",
          backgroundColor: divColor,
          marginRight: "2vw",
          fontSize: "0.7em",
          textAlign: "center"
        };
        const activeContact = app.company.contacts
          ? app.company.contacts.find(contact => contact.active)
          : null;
        return (
          <Item onClick={() => this.handleClick(app.id)} key={app.id}>
            <div style={divStyling}>{app.active_stage.name}</div>
            <Item.Content>
              <Item.Header as="a">{app.company.name}</Item.Header>
              <Item.Meta>{app.company.address}</Item.Meta>
              <Item.Description>From: {app.company.source}</Item.Description>
            </Item.Content>
            <Item.Content>
              Last Updated <br />
              <Item.Meta>{moment(app.active_stage.start).fromNow()}</Item.Meta>
            </Item.Content>
            <Item.Content>
              Active Contact: <br />
              <Item.Meta>
                {activeContact ? activeContact.name : "No contacts yet"}
              </Item.Meta>
            </Item.Content>
          </Item>
        );
      });
      return (
        <div className="application-page-container">
          <Item.Group divided>{listData}</Item.Group>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    applications: state.user.applications,
    loading: state.loading
  };
}

export default connect(mapStateToProps, { setActiveApp })(ApplicationsList);
