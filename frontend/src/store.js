import thunkMiddleware from "redux-thunk";
import reducers from "./reducers/index.js";
import { applyMiddleware, compose, createStore } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createSmartStore = (initialState) => createStore(reducers, initialState, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

export default createSmartStore;
