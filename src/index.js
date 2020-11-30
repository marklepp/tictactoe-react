import React, { useState } from "react";
import ReactDOM from "react-dom";
//import { useSelector } from 'react-redux'
//import { createStore } from "redux";

import "./styles.css";

const inclusiverange = (from, to) => {
  var values = [];
  for (from; from <= to; from++) {
    values.push(from);
  }
  return values;
};

const initialState = {
  rows: inclusiverange(-2, 2).map((row) => {
    return {
      id: row,
      columns: inclusiverange(-2, 2).map((col) => {
        return { id: col, value: "" };
      })
    };
  })
};

const getOtherPlayer = (player) => {
  if (player === "o") {
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

const TictactoeCell = ({
  rownum,
  columnnum,
  bounds,
  setBounds,
  player,
  setPlayer
}) => {
  return (
    <td
      className="Tictactoe__cell"
      onClick={() => {
        setPlayer(getOtherPlayer(player));
        expandBounds({ x: columnnum, y: rownum }, bounds, setBounds);
      }}
    ></td>
  );
};

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
      setPlayer(getOtherPlayer(player));
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
  const [player, setPlayer] = useState("x");

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
    <App />
  </React.StrictMode>,
  rootElement
);
