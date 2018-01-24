import update from "immutability-helper";

export default function userReducer(
  state = {
    loading: true,
    loggedIn: false,
    activeApplication: {},
    user: { id: "", uid: "", name: "", applications: [] }
  },
  action
) {
  switch (action.type) {
    case "LOADING_USER":
      return { ...state, loading: true };
    case "LOGIN_USER":
      const normalizedApps = action.user.applications.map((app, i) => {
        return { ...app, stateId: i };
      });
      const newUser = { ...action.user, applications: normalizedApps };
      return {
        ...state,
        user: newUser,
        loading: false,
        loggedIn: true
      };
    case "LOGOUT_USER":
      return { ...state, user: null, loggedIn: false };
    case "ADD_APPLICATION":
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          applications: [...state.user.applications, action.payload.application]
        }
      };
    case "ADD_CONTACT":
      debugger;
      return update(state, {
        activeApplication: {
          company: {
            contacts: {
              $push: [action.payload.contact]
            }
          }
        }
      });
    case "SET_ACTIVE_APP":
      const currentApp = state.user.applications.find(app => {
        return app.id === action.payload;
      });
      return update(state, { activeApplication: { $set: currentApp } });
    case "SET_ACTIVE_CONTACT":
      const currentContact = state.activeApplication.company.contacts.find(
        cont => {
          return cont.id === action.payload;
        }
      );
      return update(state, { activeContact: { $set: currentContact } });
    case "UPDATE_CONTACT":
      let index = "";
      state.activeApplication.company.contacts.forEach((cont, i) => {
        if (cont.id === action.payload.id) {
          index = i;
        }
      });
      return update(state, {
        loading: { $set: false },
        activeContact: { $set: action.payload.contact },
        activeApplication: {
          company: {
            contacts: {
              [index]: { $set: action.payload.contact }
            }
          }
        }
      });

    default:
      return state;
  }
}
