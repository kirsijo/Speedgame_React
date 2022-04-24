import "./index.css";
import Modal from "./components/Modal.js";
import React, { Component } from "react";
import Circle from "./components/Circle";
import Button from "./components/Button";
import startMusic from "./sounds/banjos.mp3";
import stopMusic from "./sounds/aww-sound-effect.mp3";
import click from "./sounds/crunch2.mp3";
import GameStart from "./components/GameStart";

let clickSound = new Audio(click);
let startSound = new Audio(startMusic);
let stopSound = new Audio(stopMusic);

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default class App extends Component {
  state = {
    score: 0,
    showGameOver: false,
    showStartGame: true,
    current: -1,
    pace: 1500,
    rounds: 0,
    gameOn: false,
    circles: [],
    difficulty: "",
  };

  timer = undefined;

  clickPlay = () => {
    if (clickSound.paused) {
      clickSound.play();
    } else {
      clickSound.currentTime = 0;
    }
  };

  addScore = (i) => {
    this.clickPlay();
    if (this.state.current !== i) {
      this.stopHandler();
      return;
    }
    console.log("addScore, circle number:", i);
    this.setState({
      score: this.state.score + 15,
      rounds: this.state.rounds - 1,
    });
  };

  nextCircle = () => {
    if (this.state.rounds >= 7) {
      console.log("calling stophandler", this.state.rounds);
      this.stopHandler();
      return;
    }

    let nextActive;
    do {
      nextActive = getRndInt(0, this.state.circles.length);
    } while (nextActive === this.state.current);
    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.8,
      rounds: this.state.rounds + 1,
    });

    this.timer = setTimeout(this.nextCircle, 1000);
  };

  startHandler = () => {
    this.setState({ showStartGame: false, gameOn: true, rounds: 0 });
    startSound.play();
    startSound.loop = true;
    this.nextCircle();
  };

  stopHandler = () => {
    stopSound.play();
    startSound.pause();
    clearTimeout(this.timer);
    this.setState({ showGameOver: true, gameOn: false });
  };

  closeHandler = () => {
    this.setState({
      showGameOver: false,
      score: 0,
      current: -1,
      showStartGame: true,
      rounds: 0,
    });
  };

  difficultyHandler = (level) => {
    let circlesArray;
    switch (level) {
      case "easy":
        circlesArray = Array.from({ length: 3 }, (x, i) => i);
        break;
      case "medium":
        circlesArray = Array.from({ length: 5 }, (x, i) => i);
        break;
      case "hard":
        circlesArray = Array.from({ length: 7 }, (x, i) => i);
        break;
    }
    this.setState({
      circles: circlesArray,
      showStartGame: false,
      gameOn: false,
      difficulty: level,
    });
  };

  render() {
    return (
      <div className={this.state.difficulty}>
        <p id="your-score">Your score:{this.state.score}</p>
        <p>Feed the raccoons!</p>
        <div className="circles">
          {this.state.circles.map((_, i) => (
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
        {this.state.showStartGame && (
          <GameStart>
            <Button click={() => this.difficultyHandler("easy")}>Easy</Button>
            <Button click={() => this.difficultyHandler("medium")}>
              Medium
            </Button>
            <Button click={() => this.difficultyHandler("hard")}>Hard</Button>
          </GameStart>
        )}
      </div>
    );
  }
}
