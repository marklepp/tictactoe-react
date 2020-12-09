import { CLICK_CELL, CHECK_WIN, EXPAND_BOUNDS } from "../actionTypes";
import makeReducer from "../makeReducer";

const getCellValue = (cells, row, col) => {
  return cells[row] ? (cells[row][col] ? cells[row][col] : "") : "";
};

const cellIterator = (cells, rowStart, rowEnd, columnStart, columnEnd) => {
  var currentRow = rowStart;
  var dRow = 1;
  var currentCol = columnStart;
  var dCol = 1;

  if (rowStart > rowEnd) {
    dRow = -1;
  } else if (rowStart === rowEnd) {
    dRow = 0;
  }

  if (columnStart > columnEnd) {
    dCol = -1;
  } else if (columnStart === columnEnd) {
    dCol = 0;
  }

  return {
    next: function () {
      if (currentRow !== rowEnd || currentCol !== columnEnd) {
        currentRow += dRow;
        currentCol += dCol;
        return {
          value: getCellValue(cells, currentRow, currentCol),
          done: false
        };
      } else {
        return { value: undefined, done: true };
      }
    },
    [Symbol.iterator]: function () {
      return this;
    }
  };
};

const checkStraightLineWin = (player, cellIter) => {
  let winning = 0;
  for (let cell of cellIter) {
    if (player === cell) {
      winning++;
    } else {
      winning = 0;
    }
    if (winning >= 5) {
      return true;
    }
  }
  return false;
};

const checkWinCondition = (store, player, row, column) => {
  const cells = store.cells;

  if (
    checkStraightLineWin(
      player,
      cellIterator(cells, row, row, column - 5, column + 5)
    ) ||
    checkStraightLineWin(
      player,
      cellIterator(cells, row - 5, row + 5, column, column)
    ) ||
    checkStraightLineWin(
      player,
      cellIterator(cells, row - 5, row + 5, column - 5, column + 5)
    ) ||
    checkStraightLineWin(
      player,
      cellIterator(cells, row + 5, row - 5, column - 5, column + 5)
    )
  ) {
    alert("Player " + (player === "x" ? "1" : "2") + " won!");
    return true;
  }
  return false;
};

const actions = {};

actions[CLICK_CELL] = (state, { row, column, player }) => {
  const rowItem = state.cells[row] ? { ...state.cells[row] } : {};
  rowItem[column] = player;
  return {
    ...state,
    cells: {
      ...state.cells,
      [row]: rowItem
    }
  };
};

actions[CHECK_WIN] = (state, { row, column, player }) => {
  return {
    ...state,
    gameFinished: checkWinCondition(state, player, row, column)
  };
};

actions[EXPAND_BOUNDS] = (state, { x, y }) => {
  let { minX, maxX, minY, maxY } = state.bounds;

  let change = false;

  if (x - 3 < minX) {
    change = true;
    minX = x - 3;
  }

  if (x + 3 > maxX) {
    change = true;
    maxX = x + 3;
  }

  if (y - 3 < minY) {
    change = true;
    minY = y - 3;
  }

  if (y + 3 > maxY) {
    change = true;
    maxY = y + 3;
  }

  if (change) {
    return { ...state, bounds: { minX, minY, maxX, maxY } };
  } else {
    return state;
  }
};

const initialState = {
  cells: {},
  bounds: {
    minX: -2,
    minY: -2,
    maxX: 2,
    maxY: 2
  },
  gameFinished: false
};

export default makeReducer(initialState, actions);
