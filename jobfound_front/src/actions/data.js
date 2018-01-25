import { RestfulAdapter } from "../adapter";
const baseUrl = "http://localhost:3000";
const clientId =
  "1041156522360-oljcrjq22qvb3694m2cmqcm7jvvl08fu.apps.googleusercontent.com";

export const signInUser = (history, handleOk) => {
  return dispatch => {
    window.auth2
      .grantOfflineAccess()
      .then(authResult => {
        let user = "";
        if (authResult["code"]) {
          const getProfile = window.auth2.currentUser.get().getBasicProfile();
          user = {
            uid: getProfile.getId(),
            email: getProfile.getEmail(),
            name: getProfile.getName(),
            family_name: getProfile.getFamilyName(),
            given_name: getProfile.getGivenName(),
            image_url: getProfile.getImageUrl(),
            code: authResult["code"]
          };
        }
        return user;
      })
      .then(user => {
        // console.log("before authUsercall", user);
        fetch(`${baseUrl}/users/`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            aadccept: "application/json",
            Authorization: localStorage.getItem("token")
          },
          body: JSON.stringify({
            user: user
          })
        })
          .then(res => res.json())
          .then(json => {
            dispatch({
              type: "LOGIN_USER",
              user: json.user.user
            });
            //handleOk();
            localStorage.setItem("token", json.token);
          });
      });
    history.push("/");
  };
};

export const startGoogleClient = dispatch => {
  return dispatch => {
    window.gapi.load("auth2", function() {
      window.auth2 = window.gapi.auth2.init({
        client_id: clientId,
        scope: "email profile"
      });
    });
  };
};

export function showUser() {
  return dispatch => {
    RestfulAdapter.getUser().then(userData => {
      let action = { type: "LOGIN_USER", user: userData.user };
      dispatch(action);
    });
  };
}

export function logOutUser() {
  return dispatch => {
    localStorage.removeItem("token");
    const action = { type: "LOGOUT_USER" };
    dispatch(action);
  };
}

export function loadingUser() {
  return {
    type: "LOADING_USER"
  };
}

export function createApplication(applicationData) {
  return dispatch => {
    dispatch({ type: "LOADING_USER" });
    RestfulAdapter.createFetch("applications", applicationData).then(json => {
      let action = { type: "ADD_APPLICATION", payload: json };
      dispatch(action);
    });
  };
}

export function createContact(contactData) {
  return dispatch => {
    dispatch({ type: "LOADING_USER" });
    RestfulAdapter.createFetch("contacts", contactData).then(json => {
      let action = { type: "ADD_CONTACT", payload: json };
      dispatch(action);
    });
  };
}

export function createNote(noteData) {
  return dispatch => {
    RestfulAdapter.createFetch("notes", noteData).then(json => {
      let action = { type: "ADD_NOTE", payload: json };
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

export function setActiveContact(id) {
  return dispatch => {
    const action = { type: "SET_ACTIVE_CONTACT", payload: id };
    dispatch(action);
  };
}

export function editContact(id, contactData) {
  return dispatch => {
    RestfulAdapter.editFetch("contacts", id, contactData).then(json => {
      const action = {
        type: "UPDATE_CONTACT",
        payload: { id: json.contact.id, contact: json.contact }
      };
      dispatch(action);
    });
  };
}

export function nextStage(id, direction) {
  return dispatch => {
    RestfulAdapter.createFetch("stages", { id: id, direction: direction }).then(
      json => {
        const action = { type: "UPDATE_STAGE", stage: json.stage };
        dispatch(action);
      }
    );
  };
}
export function prevStage() {}
export function closeStage() {}

export function deleteNote(id) {
  return dispatch => {
    dispatch({ type: "LOADING_USER" });
    RestfulAdapter.deleteFetch("notes", id).then(json => {
      const action = { type: "DELETE_NOTE", payload: id };
      dispatch(action);
    });
  };
}
