import React from "react";
import { connect } from "react-redux";
import TictactoeTable from "./TictactoeTable";
import TictactoeProgressBar from "./TictactoeProgressBar";

const Tictactoe = (props) => {
  return (
    <div className="Tictactoe">
      <h1 className="Tictactoe__header">Tic tac toe</h1>
      <TictactoeTable />
      <TictactoeProgressBar start={Date.now()} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { player: state.player.player, bounds: state.area.bounds };
};

export default connect(mapStateToProps)(Tictactoe);
