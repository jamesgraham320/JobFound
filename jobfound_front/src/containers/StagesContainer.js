import React, { Component } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { nextStage, prevStage, closeStage } from "../actions/data";

class StagesContainer extends Component {
  setNextStage = () => {
    const stage = this.props.app.stage;
    this.props.nextStage(stage.id, "next");
  };
  setPreviousStage = () => {
    const stage = this.props.app.stage;
    this.props.nextStage(stage.id, "prev");
  };
  closeStage = () => {
    const stage = this.props.app.stage;
    this.props.nextStage(stage.id, "close");
  };
  openStage = () => {
    const stage = this.props.app.stage;
    this.props.nextStage(stage.id, "open");
  };

  render() {
    let divColor = "";
    let divText = "";
    const stage = this.props.app.stage;
    switch (this.props.app.stage.name) {
      case "Submitted":
        divColor = "#ffec3d";
        divText = (
          <p>
            You have <br /> Submitted <br /> an application
          </p>
        );
        break;
      case "Interviewing":
        divColor = "#73d13d";
        divText = (
          <p>
            You are now <br /> Interviewing!
          </p>
        );
        break;
      case "Closed":
        divColor = "#ff4d4f";
        divText = (
          <p>
            This application is <br /> Closed
          </p>
        );
        break;
      case "Offer":
        divColor = "#597ef7";
        divText = (
          <p>
            You have an <br /> Offer <br /> Congratulations!
          </p>
        );
        break;
      default:
        divColor = "#ff4d4f";
        break;
    }
    const divStyling = {
      height: "85%",
      paddingTop: "8vh",
      width: "100%",
      backgroundColor: divColor,
      marginRight: "2vh",
      textAlign: "center",
      display: "inline-block"
    };

    return (
      <div className="application-stages-container">
        <div style={{ height: "29vh" }}>
          <div style={divStyling}>{divText}</div>
        </div>
        {stage.name === "Closed" ? (
          <Button onClick={this.openStage} type="danger">
            Open
          </Button>
        ) : (
          <div className="buttons-div">
            {stage.name === "Submitted" ? (
              <Button disabled>Previous</Button>
            ) : (
              <Button onClick={this.setPreviousStage}>Previous</Button>
            )}
            <Button onClick={this.closeStage} type="danger">
              Close
            </Button>
            {stage.name === "Offer" ? (
              <Button disabled type="primary">
                Next Stage
              </Button>
            ) : (
              <Button onClick={this.setNextStage} type="primary">
                Next Stage
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { app: state.activeApplication };
}

export default connect(mapStateToProps, { nextStage, prevStage, closeStage })(
  StagesContainer
);
