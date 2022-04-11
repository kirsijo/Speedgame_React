import React from "react";

function Gamearea(props) {
  return (
    <div className="game-area">
      <div className="circles">
        {props.circles.map((active, i) => (
          <Circle active={active} key={i} />
        ))}
      </div>
    </div>
  );
}

function Circle(props) {
  if (props.active) {
    return <div className="circle-active circle"></div>;
  } else {
    return <div className="circle"></div>;
  }
}

export default Gamearea;
