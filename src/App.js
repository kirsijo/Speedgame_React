import "./index.css";
import Modal from "./components/Modal.js";
import React, { Component } from "react";
import Gamearea from "./components/Gamearea";

export default class App extends Component {
  state = {
    score: 0,
    showGameOver: false,
    result: "",
    circles: [false, false, false, false],
  };

  getRndInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  startHandler = (event) => {
    event.preventDefault();
    let updatedCircles = [false, false, false, false];
    const random = this.getRndInt(0, 3);
    updatedCircles[random] = true;
    this.setState({ circles: updatedCircles });
  };

  circleClickHandler = () => {};

  render() {
    return (
      <div>
        <p id="your-score">
          Your score <span id="score" name="score"></span>
        </p>
        <p>Feed the raccoons!</p>
        <Gamearea circles={this.state.circles} />
        <button className="start-game" onClick={this.startHandler}>
          Start game
        </button>
        <Modal />
      </div>
    );
  }
}
