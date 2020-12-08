import { combineReducers } from "redux";
import area from "./area";
import player from "./player";
import { RESET } from "../actionTypes";

const appReducer = combineReducers({ player, area });

const rootReducer = (state, action) => {
  if (action.type === RESET) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
