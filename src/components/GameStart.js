import React from "react";

const GameStart = (props) => {
  return (
    <div className="Gamestart">
      <h1>Speed Game</h1>
      <p>Choose difficulty</p>
      <div className="startbuttons">{props.children}</div>
    </div>
  );
};

export default GameStart;
