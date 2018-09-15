
// @flow

import * as React from 'react';


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
      <h1>
        Erik Michael Swan
      </h1>
    );
  }
}

export default App;
