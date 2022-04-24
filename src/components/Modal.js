import React from "react";

const Modal = (props) => {
  let message = "";
  if (props.score <= 50) {
    message = "Raccoons are still hungry.";
  } else if (props.score >= 51 && props.score <= 100) {
    message = "More snacks please.";
  } else {
    message = "Raccoons love you!";
  }

  return (
    <div className="overlay">
      <div className="Modal">
        <h2>Game Over</h2>
        <p>Score: {props.score}</p>
        <p className="result" name="result"></p>
        <p>{message}</p>
        <button onClick={props.click}>CLOSE</button>
      </div>
    </div>
  );
};

export default Modal;
