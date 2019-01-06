
// @flow

import 'styles/main.scss';
import './App.scss';
import * as React from 'react';
import { store } from 'reducers';
import { HTMLComment } from 'components';
import { constants } from 'lib/env';

// saving redux state for hot reloading
// save individual stores
if (process.env.NODE_ENV !== 'production') {
  store.subscribe(() => {
    window[constants.storage] = store.getState();
  });
}

export class App extends React.Component {

  state = {
    name: 'Erik Michael Swan.'
  };
  textCache = 'Erik Michael Swan.';
  charPool = 'abcdefghijklmnopkrstuvwxyz';
  upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  lettersToSwitch = 2;
  timesToAnimate = 2;
  increment = 90;

  switchLettersRandomly = () => {
    const { name } = this.state;
    let textArray = name.split('');

    this.setBackToNormal();

    for (let i = 0; i < this.lettersToSwitch; i++) {
      const thisRandomIndex = this.getRandomNumInRange(name.length - 1);
      textArray.splice(
        thisRandomIndex,
        1,
        this.decideCase(
          textArray[thisRandomIndex],
          this.getRandomChar(this.charPool, this.charPool.length - 1)
        )
      );
    }

    this.setState({
      name: textArray.join('')
    });
  }

  decideCase = (letterToReplace, replacementLetter) => {
    return letterToReplace.toLowerCase() === letterToReplace
      ? replacementLetter
      : replacementLetter.toUpperCase();
  }
  getRandomNumInRange = range => Math.floor(Math.random() * range);
  getRandomChar = (charPool, range) => charPool[this.getRandomNumInRange(range)];
  setBackToNormal = () => this.setState({ name: this.textCache });

  sweetLetterEffect = () => {
    for (let i = 0; i < this.timesToAnimate; i++) {
      setTimeout(this.switchLettersRandomly, 0 + (this.increment * i));
    }

    setTimeout(this.setBackToNormal, this.timesToAnimate * this.increment);
  }

  render(): React.Node {
    const { name } = this.state;

    const nameJSX = (
      <a className="name" href="https://www.linkedin.com/in/erikmichaelswan/" target="_blank" rel="noopener noreferrer">
        <span onMouseOver={this.sweetLetterEffect}>
          {name}
        </span>
      </a>
    );

    return (
      <div className="app-container">
        <h1>
          <HTMLComment text={`
            I wanted to know the name of every stone and flower and insect and bird and beast. I wanted to know where it got its color, where it got its life - but there was no one to tell me.
            – George Washington Carver
          `} />
          Hi, I'm {nameJSX}
        </h1>
        <h2>I make user interfaces and write sometimes.</h2>
        <a className="last" href="mailto:erikmswan@gmail.com">Tell me what you're thinking.</a>
      </div>
    );
  }
}

export default App;
