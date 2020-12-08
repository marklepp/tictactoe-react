import {
  CLICK_CELL,
  CHECK_WIN,
  NEXT_PLAYER,
  EXPAND_BOUNDS,
  RESET
} from "./actionTypes";

export const clickCell = (row, column, player) => ({
  type: CLICK_CELL,
  payload: { row, column, player }
});

export const checkPlayerWin = (player, row, column) => ({
  type: CHECK_WIN,
  payload: { row, column, player }
});

export const nextPlayer = (player) => ({
  type: NEXT_PLAYER,
  payload: { player }
});

export const expandBounds = (point) => ({
  type: EXPAND_BOUNDS,
  payload: point
});

export const reset = () => ({
  type: RESET,
  payload: {}
});
