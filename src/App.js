import "./index.css";
import Modal from "./components/Modal.js";
import React, { Component } from "react";
import Circle from "./components/Circle";
import Button from "./components/Button";
import startMusic from "./sounds/banjos.mp3";
import stopMusic from "./sounds/aww-sound-effect.mp3";
//import clickSound from "./sounds/crunch.wav";

//let clickSound = new Audio(click);
let startSound = new Audio(startMusic);
let stopSound = new Audio(stopMusic);

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
    pace: 1500,
    rounds: 0,
    gameOn: false,
  };

  timer = undefined;

  /*clickPlay = () => {
    if (clickSound.paused) {
      clickSound.play();
    } else {
      clickSound.currentTime = 0;
    }
  };*/

  /*startHandler = (event) => {
    event.preventDefault();
    let updatedCircles = [false, false, false, false];
    const random = this.getRndInt(0, 3);
    updatedCircles[random] = true;
    this.setState({ circles: updatedCircles }); 
  };*/

  addScore = (i) => {
    // clickSound.play();
    console.log(i, this.state.current);
    if (this.state.current !== i) {
      this.stopHandler();
      return;
    }
    console.log("addScore, circle number:", i);
    this.setState({
      score: this.state.score + 10,
      rounds: this.state.rounds - 1,
    });
  };

  nextCircle = () => {
    if (this.state.rounds >= 3) {
      this.stopHandler();
      return;
    }

    let nextActive;
    do {
      nextActive = getRndInt(0, 3);
    } while (nextActive === this.state.current);
    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });
    console.log("rounds", this.state.rounds);
    console.log("active circle:", this.state.current);

    this.timer = setTimeout(this.nextCircle, 1000);
  };

  startHandler = () => {
    startSound.play();
    startSound.loop = true;
    this.nextCircle();
    this.setState({ gameOn: true });
  };

  stopHandler = () => {
    stopSound.play();
    startSound.pause();
    clearTimeout(this.timer);
    this.setState({ showGameOver: true, gameOn: false });
  };

  closeHandler = () => {
    window.location.reload();
    //this.setState({showGameOver:false, score:0, current: -1,});
  };

  render() {
    return (
      <div>
        <p id="your-score">Your score:{this.state.score}</p>
        <p>Feed the raccoons!</p>
        <div className="circles">
          {circles.map((_, i) => (
            <Circle
              key={i}
              //id={i}
              click={() => this.addScore(i)}
              active={this.state.current === i}
              disabled={this.state.gameOn}
            />
          ))}
        </div>
        <div>
          {!this.state.gameOn && (
            <Button click={this.startHandler}>START</Button>
          )}
          {this.state.gameOn && <Button click={this.stopHandler}>STOP</Button>}
        </div>
        {this.state.showGameOver && (
          <Modal click={this.closeHandler} score={this.state.score} />
        )}
      </div>
    );
  }
}
