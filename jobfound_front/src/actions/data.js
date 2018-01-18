import { AuthAdapter, RestfulAdapter } from "../adapter";

export function signInUser() {
  return dispatch => {
    AuthAdapter.login().then(userData => {
      console.log(userData);
      localStorage.setItem("token", userData.token);
      let action = { type: "LOGIN_USER", payload: userData };
      dispatch(action);
    });
  };
}

export function showUser(id) {
  return dispatch => {
    RestfulAdapter.showFetch("users", id).then(userData => {
      let action = { type: "LOGIN_USER", payload: userData };
      dispatch(action);
    });
  };
}

export function logOutUser() {
  localStorage.removeItem("token");
  return {
    type: "LOG_OUT_USER"
  };
}

export function loadingUser() {
  return {
    type: "LOADING_USER"
  };
}

export function createApplication(applicationData) {
  return dispatch => {
    RestfulAdapter.createFetch("applications", applicationData).then(json => {
      let action = { type: "ADD_APPLICATION", payload: json };
      dispatch(action);
    });
  };
}

export function setActiveApp(id) {
  return dispatch => {
    const action = { type: "SET_ACTIVE_APP", payload: id };
    dispatch(action);
  };
}
