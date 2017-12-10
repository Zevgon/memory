/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import './master.css';

const shuffle = (array) => {
  array = [...array];
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex > 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const getFourNumbers = () => shuffle(new Array(4).fill(0).map((_, idx) => idx + 1));
const getMainNumber = () => Math.floor((Math.random() * 4) + 1);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      curNumber: null,
      fourNumbers: null,
      running: false,
      stage: null,
      lost: false,
      clickTracker: [],
      showInstructions: false,
    };
    this.start = this.start.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleInstructions = this.toggleInstructions.bind(this);
  }

  getTrackedInfo(stage) {
    const info = this.state.clickTracker[stage - 1];
    return {
      position: info[0],
      value: info[1],
    };
  }

  start() {
    this.setState({
      running: true,
      fourNumbers: getFourNumbers(),
      curNumber: getMainNumber(),
      stage: 1,
      lost: false,
      won: false,
    });
  }

  checkStage1(clickedNumber) {
    switch (this.state.curNumber) {
      case 1:
        return clickedNumber === 2;
      case 2:
        return clickedNumber === 2;
      case 3:
        return clickedNumber === 3;
      case 4:
        return clickedNumber === 4;
      default:
        return false;
    }
  }

  checkStage2(clickedNumber, idx) {
    switch (this.state.curNumber) {
      case 1:
        return clickedNumber === 4;
      case 2:
        return idx === this.getTrackedInfo(1).position;
      case 3:
        return idx === 0;
      case 4:
        return idx === this.getTrackedInfo(1).position;
      default:
        return false;
    }
  }

  checkStage3(clickedNumber, idx) {
    switch (this.state.curNumber) {
      case 1:
        return clickedNumber === this.getTrackedInfo(2).value;
      case 2:
        return clickedNumber === this.getTrackedInfo(1).value;
      case 3:
        return idx === 2;
      case 4:
        return clickedNumber === 4;
      default:
        return false;
    }
  }

  checkStage4(clickeNumber, idx) {
    switch (this.state.curNumber) {
      case 1:
        return idx === this.getTrackedInfo(1).position;
      case 2:
        return idx === 0;
      case 3:
        return idx === this.getTrackedInfo(2).position;
      case 4:
        return idx === this.getTrackedInfo(2).position;
      default:
        return false;
    }
  }

  checkStage5(clickedNumber) {
    switch (this.state.curNumber) {
      case 1:
        return clickedNumber === this.getTrackedInfo(1).value;
      case 2:
        return clickedNumber === this.getTrackedInfo(2).value;
      case 3:
        return clickedNumber === this.getTrackedInfo(4).value;
      case 4:
        return clickedNumber === this.getTrackedInfo(3).value;
      default:
        return false;
    }
  }

  check(number, idx) {
    return this[`checkStage${this.state.stage}`](number, idx);
  }

  handleClick(clickedNumber, idx) {
    const clickTracker = this.state.clickTracker.map(tups => [...tups]);
    clickTracker.push([idx, clickedNumber]);

    if (this.check(clickedNumber, idx)) {
      if (this.state.stage === 5) {
        this.setState({
          won: true,
          running: false,
          fourNumbers: null,
          curNumber: null,
          stage: null,
        });
        return;
      }
      this.setState({
        stage: this.state.stage + 1,
        fourNumbers: getFourNumbers(),
        curNumber: getMainNumber(),
        clickTracker,
      });
    } else {
      this.setState({
        running: false,
        lost: true,
        fourNumbers: null,
        curNumber: null,
        stage: null,
      });
    }
  }

  toggleInstructions() {
    this.setState({
      showInstructions: !this.state.showInstructions,
    });
  }

  render() {
    return (
      <div className="game-container">
        {this.state.lost &&
          <div>Sorry, you lost.</div>
        }
        {this.state.won &&
          <div>Yay you win!!</div>
        }
        <div className="main-content">
          {this.state.curNumber &&
            <button className="main-number center-number">{this.state.curNumber}</button>
          }
          {this.state.fourNumbers &&
            <div className="numbers-container">
              {this.state.fourNumbers.map((number, idx) => (
                <button
                  className="center-number secondary-number"
                  key={number}
                  onClick={() => this.handleClick(number, idx)}
                >{number}
                </button>
              ))}
            </div>
          }
        </div>
        {!this.state.running &&
          <button
            onClick={this.start}
            className="pressed start-button"
          >
            <div className="start-text">
              Start
            </div>
          </button>
        }
        <button onClick={this.toggleInstructions}>
          {this.state.showInstructions ? 'Hide instructions' : 'Show instructions'}
        </button>
        {this.state.showInstructions &&
          <img className="instructions" alt="instructions" src="./images/instructions.png" />
        }
      </div>
    );
  }
}
