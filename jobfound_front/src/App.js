import React, { Component } from "react";
import Login from "./components/Login";
import SideBar from "./components/SideBar";
import { Route } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import ContentContainer from "./containers/ContentContainer";
import ApplicationContainer from "./containers/ApplicationContainer";
import ApplicationForm from "./forms/ApplicationForm";
import { signInUser, showUser } from "./actions/data";
import "antd/dist/antd.css";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  componentDidMount() {
    //this.props.signInUser();
    this.props.showUser(1);
  }

  signInButton = () => {
    let signInWindow = window.open("http://localhost:3000/auth/google_oauth2");
  };
  render() {
    return (
      <div>
        <Layout>
          <Sider>
            <SideBar />
          </Sider>
          <Layout>
            <Header />
            <Content>
              <Route
                exact
                path="/new-application"
                component={ApplicationForm}
              />
              <Route
                exact
                path="/applications/:id"
                component={ApplicationContainer}
              />
              <Route exact path="/applications" component={ContentContainer} />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { signInUser, showUser })(App);
