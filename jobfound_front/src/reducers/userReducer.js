export default function userReducer(
  state = {
    loading: true,
    loggedIn: false,
    activeApplication: {},
    user: { id: "1", uid: "105017088341350762828", name: "", applications: [] }
  },
  action
) {
  switch (action.type) {
    case "LOADING_USER":
      return { ...state, loading: true };
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        loggedIn: true
      };
    case "LOGOUT_USER":
      return { ...state, user: null, loggedIn: false };
    case "ADD_APPLICATION":
      return {
        ...state,
        user: {
          ...state.user,
          applications: [...state.user.applications, action.payload]
        }
      };
    case "SET_ACTIVE_APP":
      const currentApp = state.user.applications.find(app => {
        return app.id === action.payload;
      });
      return { ...state, activeApplication: currentApp };

    default:
      return state;
  }
}
