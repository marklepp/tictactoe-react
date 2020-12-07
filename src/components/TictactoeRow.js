import React from "react";
import { connect } from "react-redux";
import TictactoeCell from "./TictactoeCell";
import { inclusiverange } from "../utils";

const TictactoeRow = ({ bounds, row }) => {
  return (
    <tr className="Tictactoe__row">
      {inclusiverange(bounds.minX, bounds.maxX).map((column) => (
        <TictactoeCell
          key={"r" + row + "c" + column}
          row={row}
          column={column}
        />
      ))}
    </tr>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { ...ownProps, bounds: state.area.bounds };
};

export default connect(mapStateToProps, null)(TictactoeRow);
