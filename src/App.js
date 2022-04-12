import "./index.css";
import Modal from "./components/Modal.js";
import React, { Component } from "react";
import Circle from "./components/Circle";
import Button from "./components/Button";

const circles = [0, 0, 0, 0];

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default class App extends Component {
  state = {
    score: 0,
    showGameOver: false,
    // circles: [false, false, false, false],
    current: -1,
  };

  timer = undefined;

  /*startHandler = (event) => {
    event.preventDefault();
    let updatedCircles = [false, false, false, false];
    const random = this.getRndInt(0, 3);
    updatedCircles[random] = true;
    this.setState({ circles: updatedCircles }); 
  };*/

  addScore = (i) => {
    console.log("addScore, circle number:", i);
    this.setState({
      score: this.state.score + 1,
    });
  };

  nextCircle = () => {
    let nextActive;
    do {
      nextActive = getRndInt(0, 3);
    } while (nextActive === this.state.current);
    this.setState({
      current: nextActive,
    });
    console.log("active circle:", this.state.current);

    this.timer = setTimeout(this.nextCircle, 1000);
  };

  startHandler = () => {
    this.nextCircle();
  };

  stopHandler = () => {
    clearTimeout(this.timer);
    this.setState({ showGameOver: true });
  };

  closeHandler = () => {
    window.location.reload();
    //this.setState({showGameOver:false, score:0, current: -1,});
  };

  render() {
    return (
      <div>
        <p>Your score:{this.state.score}</p>
        <p>Feed the raccoons!</p>
        <div className="circles">
          {circles.map((_, i) => (
            <Circle
              key={i}
              id={i}
              click={() => this.addScore(i)}
              active={this.state.current === i}
            />
          ))}
        </div>
        <div>
          <Button click={this.startHandler}>START</Button>
          <Button click={this.stopHandler}>STOP</Button>
        </div>
        {this.state.showGameOver && <Modal click={this.closeHandler} />}
      </div>
    );
  }
}
