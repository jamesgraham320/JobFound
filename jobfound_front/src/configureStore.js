import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer.js";
import { combineReducers } from "redux";

//const rootReducer = combineReducers(userReducer);

const configureStore = () => createStore(userReducer, applyMiddleware(thunk));

export default configureStore;
