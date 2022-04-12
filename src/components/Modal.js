import React from "react";

const Modal = (props) => {
  return (
    <div className="Modal">
      <h2>Game Over</h2>
      <p>Score: {props.score}</p>
      <p className="result" name="result"></p>
      <button onClick={props.click}>CLOSE</button>
    </div>
  );
};

export default Modal;
