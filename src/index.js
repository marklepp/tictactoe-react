import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";

import "./styles.css";

const initialState = { cells: {} };

const Cells = (state = initialState, action) => {
  switch (action.type) {
    case "CLICK_CELL": {
      const { row, column, player } = action.payload;
      const rowItem = state.cells[row] ? { ...state.cells[row] } : {};
      rowItem[column] = player;
      return {
        ...state,
        cells: {
          ...state.cells,
          [row]: rowItem
        }
      };
    }
    case "CHECK_WIN": {
      const { row, column, player } = action.payload;
      checkWinCondition(state, player, row, column);
      return { ...state };
    }
    default:
      return state;
  }
};

const clickCell = (row, column, player) => ({
  type: "CLICK_CELL",
  payload: { row, column, player }
});

const checkPlayerWin = (player, row, column) => ({
  type: "CHECK_WIN",
  payload: { row, column, player }
});

const store = createStore(Cells);

const getCells = (store) => store.cells;
const getCellValue = (cells, row, col) => {
  return cells[row] ? (cells[row][col] ? cells[row][col] : "") : "";
};
const getCellValueFromStore = (store, row, col) => {
  return getCellValue(getCells(store), row, col);
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
    if (winning === 5) {
      return true;
    }
  }
  return false;
};

const checkWinCondition = (store, player, row, column) => {
  const cells = getCells(store);

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

const inclusiverange = (from, to) => {
  var values = [];
  for (from; from <= to; from++) {
    values.push(from);
  }
  return values;
};

const nextPlayer = (player) => {
  if (player === "o" || !player) {
    player = "x";
  } else {
    player = "o";
  }
  return player;
};

const expandBounds = ({ x, y }, { minX, minY, maxX, maxY }, setBounds) => {
  if (x - 3 < minX) minX = x - 3;
  if (x + 3 > maxX) maxX = x + 3;
  if (y - 3 < minY) minY = y - 3;
  if (y + 3 > maxY) maxY = y + 3;
  setBounds({ minX, minY, maxX, maxY });
};

const mapStateToPropsCell = (state, ownProps) => {
  const { rownum, columnnum } = ownProps;
  ownProps.cellValue = getCellValueFromStore(state, rownum, columnnum);
  ownProps.gameFinished = state.gameFinished;
  return ownProps;
};

const TictactoeCell = connect(mapStateToPropsCell, {
  clickCell,
  checkPlayerWin
})(
  ({
    rownum,
    columnnum,
    bounds,
    setBounds,
    player,
    setPlayer,
    cellValue,
    gameFinished,
    clickCell,
    checkPlayerWin
  }) => {
    if (cellValue !== "" || gameFinished) {
      return (
        <td className="Tictactoe__cell" data-mark={cellValue}>
          {cellValue}
        </td>
      );
    } else {
      return (
        <td
          className="Tictactoe__cell"
          onClick={() => {
            clickCell(rownum, columnnum, player);
            checkPlayerWin(player, rownum, columnnum);
            setPlayer(nextPlayer(player));
            expandBounds({ x: columnnum, y: rownum }, bounds, setBounds);
          }}
        ></td>
      );
    }
  }
);

const TictactoeRow = (props) => {
  return (
    <tr className="Tictactoe__row">
      {inclusiverange(props.bounds.minX, props.bounds.maxX).map((columnnum) => (
        <TictactoeCell
          {...props}
          key={"r" + props.rownum + "c" + columnnum}
          columnnum={columnnum}
        />
      ))}
    </tr>
  );
};

const TictactoeTable = (props) => {
  return (
    <div className="Tictactoe__table-wrapper">
      <table className="Tictactoe__table">
        <tbody>
          {inclusiverange(props.bounds.minY, props.bounds.maxY).map(
            (rownum) => (
              <TictactoeRow {...props} key={"r" + rownum} rownum={rownum} />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

const TictactoeProgressBar = ({ player, turnTime, start, setPlayer }) => {
  const [percent, setPercent] = useState(0);
  requestAnimationFrame(() => {
    const newPercent = ((Date.now() - start) / turnTime) * 100.0;
    if (newPercent < 100) {
      setPercent(newPercent);
    } else {
      setPlayer(nextPlayer(player));
    }
  });
  return (
    <div className="Tictactoe__progressbar-wrapper">
      <div
        className="Tictactoe__progressbar-progress"
        data-player={player}
        style={{ width: percent.toString().concat("%") }}
      ></div>
    </div>
  );
};

const Tictactoe = (props) => {
  const turnTime = 10000;
  const [player, setPlayer] = useState(nextPlayer());

  const [bounds, setBounds] = useState({
    minX: -2,
    minY: -2,
    maxX: 2,
    maxY: 2
  });

  return (
    <div className="Tictactoe">
      <h1 className="Tictactoe__header">Tic tac toe</h1>
      <TictactoeTable
        bounds={bounds}
        setBounds={setBounds}
        player={player}
        setPlayer={setPlayer}
      />
      <TictactoeProgressBar
        player={player}
        turnTime={turnTime}
        start={Date.now()}
        setPlayer={setPlayer}
      />
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Tictactoe />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
