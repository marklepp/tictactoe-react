import React from "react";
import { connect } from "react-redux";
import TictactoeRow from "./TictactoeRow";
import { inclusiverange } from "../utils";

const mouseDownHandler = (e) => {
  if (e.button === 1) {
    const element = document.querySelector(".js-table-wrapper");
    let pos = {
      // The current scroll
      left: element.scrollLeft,
      top: element.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY
    };

    const moveHandler = mouseMoveHandler(element, pos);
    let upHandler = mouseUpHandler(element, moveHandler);

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler, { once: true });

    e.stopPropagation();
    e.preventDefault();
    e.cancelBubble = false;
    return false;
  }
};

const mouseMoveHandler = (element, pos) => (e) => {
  // How far the mouse has been moved
  const dx = e.clientX - pos.x;
  const dy = e.clientY - pos.y;

  // Scroll the element
  element.scrollTop = pos.top - dy;
  element.scrollLeft = pos.left - dx;
  element.style.cursor = "grabbing";
  element.style.userSelect = "none";
};

const mouseUpHandler = (element, moveHandler) => () => {
  document.removeEventListener("mousemove", moveHandler);
  element.style.removeProperty("cursor");
  element.style.removeProperty("user-select");
};

const TictactoeTable = ({ minY, maxY }) => {
  return (
    <div
      className="js-table-wrapper Tictactoe__table-wrapper"
      onMouseDown={mouseDownHandler}
    >
      <table className="Tictactoe__table">
        <tbody className="Tictactoe__tbody">
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
