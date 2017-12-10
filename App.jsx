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

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      curNumber: null,
      fourNumbers: null,
      running: false,
    };
    this.start = this.start.bind(this);
  }

  start() {
    this.setState({
      running: true,
      fourNumbers: getFourNumbers(),
      curNumber: Math.floor((Math.random() * 4) + 1),
    });
  }

  render() {
    return (
      <div className="game-container">
        {this.state.curNumber &&
          <div className="main-number center-number">{this.state.curNumber}</div>
        }
        {this.state.fourNumbers &&
          <div className="numbers-container">
            {this.state.fourNumbers.map(number => (
              <div
                className="center-number secondary-number"
                key={number}
              >{number}
              </div>
            ))}
          </div>
        }
        {!this.state.running &&
          <button onClick={this.start}>Start</button>
        }
      </div>
    );
  }
}
