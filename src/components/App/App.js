
// @flow

import 'styles/main.scss';
import './App.scss';
import * as React from 'react';
import { store } from 'reducers';
import { constants } from 'lib/env';


// saving redux state for hot reloading
// save individual stores
if (process.env.NODE_ENV !== 'production') {
  store.subscribe(() => {
    window[constants.storage] = store.getState();
  });
}


// types

type Props = {
    // nothing yet
};


// component

export class App extends React.Component<Props> {

  constructor(props: Props): void {
    super(props);
  }

  render(): React.Node {
    return (
      <div className="app-container">
        <h1>
          Hi, I'm Erik&nbsp;Michael&nbsp;Swan.
        </h1>
        <h2>I make user interfaces for the web.</h2>
        <a href="mailto:erikmswan@gmail.com">Tell me what you're thinking.</a>
      </div>
    );
  }
}

export default App;
