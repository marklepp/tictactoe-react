import { RESET } from "./actionTypes";

export default (initialState, actions) => (state = initialState, action) => {
  if (actions.hasOwnProperty(action.type)) {
    return actions[action.type](state, action.payload);
  } else if (action.type === RESET) {
    return { ...initialState };
  } else {
    return state;
  }
};
