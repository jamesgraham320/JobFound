import update from "immutability-helper";
export default function userReducer(
  state = {
    loading: true,
    loggedIn: false,
    activeApplication: { stateId: null },
    activeContact: null,
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
      return update(state, { user: { $set: null }, loggedIn: { $set: false } });
    case "ADD_APPLICATION":
      let newApp = {
        ...action.payload.application,
        stateId: state.user.applications.length
      };
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          applications: [...state.user.applications, newApp]
        }
      };
    case "ADD_CONTACT":
      let activeId = state.activeApplication.stateId;
      const updatedState = update(state, {
        loading: { $set: false },
        user: {
          applications: {
            [activeId]: {
              company: {
                contacts: {
                  $unshift: [action.payload.contact]
                }
              }
            }
          }
        },
        activeApplication: {
          company: {
            contacts: {
              $unshift: [action.payload.contact]
            }
          }
        }
      });
      return updatedState;
    case "UPDATE_STAGE":
      activeId = state.activeApplication.stateId;
      return update(state, {
        loading: { $set: false },
        user: {
          applications: {
            [activeId]: {
              stage: { $set: action.stage }
            }
          }
        },
        activeApplication: {
          stage: { $set: action.stage }
        }
      });
    case "ADD_NOTE":
      activeId = state.activeApplication.stateId;
      let index = "";
      const nextState = update(state, {
        loading: { $set: false },
        user: {
          applications: {
            [activeId]: {
              stage: {
                notes: { $unshift: [action.payload.note] }
              }
            }
          }
        },
        activeApplication: {
          stage: {
            notes: { $unshift: [action.payload.note] }
          }
        }
      });
      return nextState;
    case "SET_ACTIVE_APP":
      const currentApp = state.user.applications.find(app => {
        return app.id === action.payload;
      });
      return update(state, { activeApplication: { $set: currentApp } });
    case "SET_ACTIVE_CONTACT":
      const currentContact =
        action.payload === -1
          ? null
          : state.activeApplication.company.contacts.find(cont => {
              return cont.id === action.payload;
            });
      const updateContact = update(state, {
        activeContact: { $set: currentContact }
      });
      return updateContact;
    case "UPDATE_CONTACT":
      index = "";
      state.activeApplication.company.contacts.forEach((cont, i) => {
        if (cont.id === action.payload.id) {
          index = i;
        }
      });
      const active = state.activeApplication.stateId;
      const updated = update(state, {
        user: {
          applications: {
            [active]: {
              company: {
                contacts: {
                  [index]: { $set: action.payload.contact }
                }
              }
            }
          }
        },
        activeApplication: {
          company: {
            contacts: {
              [index]: { $set: action.payload.contact }
            }
          }
        }
      });
      return updated;
    case "DELETE_NOTE":
      activeId = state.activeApplication.stateId;
      const newNotes = state.activeApplication.stage.notes.filter(
        n => n.id !== action.payload
      );
      return update(state, {
        user: {
          applications: {
            [activeId]: {
              stage: {
                notes: { $set: newNotes }
              }
            }
          }
        },
        activeApplication: {
          stage: {
            notes: { $set: newNotes }
          }
        }
      });
    default:
      return state;
  }
}
