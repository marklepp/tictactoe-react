import React, { useState } from "react";
import { connect } from "react-redux";
import { nextPlayer } from "../redux/actions";
import { TURNTIME } from "../constants";

const TictactoeProgressBar = ({ player, start, gameFinished, nextPlayer }) => {
  const [percent, setPercent] = useState(0);
  requestAnimationFrame(() => {
    const newPercent = ((Date.now() - start) / TURNTIME) * 100.0;
    if (!gameFinished) {
      if (newPercent < 100) {
        setPercent(newPercent);
      } else {
        nextPlayer(player);
      }
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

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    player: state.player.player,
    gameFinished: state.area.gameFinished
  };
};

const mapDispatchToProps = { nextPlayer };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TictactoeProgressBar);
