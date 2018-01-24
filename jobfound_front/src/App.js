import React, { Component } from "react";
import LoginButton from "./components/LoginButton";
import SideBar from "./components/SideBar";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import ApplicationsList from "./components/ApplicationsList";
import ApplicationsContainer from "./containers/ApplicationsContainer";
import { showUser } from "./actions/data";
import "antd/dist/antd.css";
import { Layout, Modal } from "antd";
import { startGoogleClient } from "./actions/data";
const { Sider, Content } = Layout;

class App extends Component {
  state = { visible: true };

  handleOk = e => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.showUser();
    }
    this.props.startGoogleClient();
    //this.props.showUser(1);
  }

  render() {
    return (
      <div>
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              left: 0
            }}
          >
            <SideBar />
          </Sider>
          <Layout>
            <Content style={{ padding: "2vh" }}>
              <Route
                exact
                path="/applications/:id"
                component={ApplicationsContainer}
              />
              <Route exact path="/" component={ApplicationsList} />
              <Route exact path="/login" component={LoginButton} />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user, loading: state.loading, loggedIn: state.loggedIn };
}

export default withRouter(
  connect(mapStateToProps, { showUser, startGoogleClient })(App)
);
