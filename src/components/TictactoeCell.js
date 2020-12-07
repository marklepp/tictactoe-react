import React from "react";
import { connect } from "react-redux";
import { getCellValueFromStore } from "../redux/selectors";
import {
  clickCell,
  checkPlayerWin,
  nextPlayer,
  expandBounds
} from "../redux/actions";

const TictactoeCell = ({
  row,
  column,
  player,
  nextPlayer,
  cellValue,
  gameFinished,
  clickCell,
  checkPlayerWin,
  expandBounds
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
          clickCell(row, column, player);
          checkPlayerWin(player, row, column);
          nextPlayer(player);
          expandBounds({ x: column, y: row });
        }}
      ></td>
    );
  }
};

const mapStateToPropsCell = (state, ownProps) => {
  const { row, column } = ownProps;
  ownProps.cellValue = getCellValueFromStore(state, row, column);
  ownProps.gameFinished = state.area.gameFinished;
  ownProps.player = state.player.player;
  return { ...ownProps };
};

export default connect(mapStateToPropsCell, {
  clickCell,
  checkPlayerWin,
  nextPlayer,
  expandBounds
})(TictactoeCell);
