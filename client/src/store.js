import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { connectRoutes } from "redux-first-router";
import thunk from "redux-thunk";

import Routes from "./routes";
import app from "./reducers";

const initialState = {};

const { reducer, middleware, enhancer } = connectRoutes(Routes);

const rootReducer = combineReducers({ app, location: reducer })
const middlewares = [thunk, middleware];
const appliedMiddleware = applyMiddleware(...middlewares);
const enhancers = compose(enhancer, appliedMiddleware);

const store = createStore(rootReducer, initialState, enhancers);

export default store;
