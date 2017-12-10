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

const getFourNumbers = () => shuffle(new Array(4).fill(0).map((_, idx) => idx));
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
    };
    this.start = this.start.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  check(number) {
    return number === 2;
  }

  handleClick(number) {
    if (this.check(number)) {
      if (this.state.stage === 5) {
        this.setState({
          won: true,
          running: false,
        });
        return;
      }
      this.setState({
        stage: this.state.stage + 1,
        fourNumbers: getFourNumbers(),
        curNumber: getMainNumber(),
      });
    } else {
      this.setState({
        running: false,
        lost: true,
      });
    }
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
        {this.state.stage &&
          <div
            className="stage-num center-number"
          >Stage: {this.state.stage}
          </div>
        }
        {this.state.curNumber &&
          <div className="main-number center-number">{this.state.curNumber}</div>
        }
        {this.state.fourNumbers &&
          <div className="numbers-container">
            {this.state.fourNumbers.map(number => (
              <button
                className="center-number secondary-number"
                key={number}
                onClick={() => this.handleClick(number)}
              >{number}
              </button>
            ))}
          </div>
        }
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
      </div>
    );
  }
}
