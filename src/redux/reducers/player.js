import { NEXT_PLAYER } from "../actionTypes";
import { TURNTIME } from "../../constants";
import makeReducer from "../makeReducer";

const nextPlayerSymbol = (player) => {
  if (player === "o") {
    player = "x";
  } else {
    player = "o";
  }
  return player;
};

const actions = {};

actions[NEXT_PLAYER] = (state, { player }) => {
  return { ...state, player: nextPlayerSymbol(player), turnStart: Date.now() };
};

const initialState = {
  player: "x",
  turnStart: Date.now()
};

export default makeReducer(initialState, actions);
