import React, { Component } from "react";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
const CLIENT_KEY =
  "1041156522360-cphh5macgp8hsbit75v19luk6lo37sg9.apps.googleusercontent.com";
const REDIRECT_URL = "http://localhost:3001";
//var loadjs = require("loadjs");
//loadjs("https://apis.google.com/js/client:platform.js?onload=start", "gapi");

//const gapi = require("googleapis");
//const OAuth2 = gapi.auth.OAuth2;
//var oauth2Client = new OAuth2(CLIENT_KEY, null, REDIRECT_URL);

class Login extends Component {
  render() {
    const responseGoogle = response => {
      console.log(response);
    };
    return (
      <div>
        <GoogleLogin
          clientId={CLIENT_KEY}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Login);
