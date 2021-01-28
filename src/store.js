import { applyMiddleware, createStore, combineReducers } from "redux";
import promise from "redux-promise-middleware";
import logger from "redux-logger";
import { ticketReducer, userReducer } from "./redux/reducer";

const middleware = applyMiddleware(promise, logger);
const store = createStore(
  combineReducers({ ticketReducer, userReducer }),
  middleware
);
export default store;
