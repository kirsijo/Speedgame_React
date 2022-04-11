import React from "react";

export default function Modal(props) {
  return (
    <div className="Modal">
      <p>Game Over</p>
      <p>Score: {props.score}</p>
      <p className="result" name="result"></p>
      <button type="button" className="closebutton" id="close">
        CLOSE
      </button>
    </div>
  );
}
