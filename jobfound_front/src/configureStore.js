import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer.js";

//const rootReducer = combineReducers(userReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () =>
  createStore(userReducer, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
