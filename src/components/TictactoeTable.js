import React from "react";
import { connect } from "react-redux";
import TictactoeRow from "./TictactoeRow";
import { inclusiverange } from "../utils";

const TictactoeTable = ({ minY, maxY }) => {
  return (
    <div className="Tictactoe__table-wrapper">
      <table className="Tictactoe__table">
        <tbody>
          {inclusiverange(minY, maxY).map((row) => (
            <TictactoeRow key={"r" + row} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    minY: state.area.bounds.minY,
    maxY: state.area.bounds.maxY
  };
};

export default connect(mapStateToProps, null)(TictactoeTable);
