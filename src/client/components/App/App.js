
// @flow

import 'styles/main.scss';
import * as React from 'react';
import { store } from 'reducers';
import { constants } from 'lib/env';


// saving redux state for hot reloading
// save individual stores
if (NODE_ENV !== 'production') {
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
        const test: string = 12;
        test;
    }

    render(): React.Node {
        return (
            <div>
                <h1>
                    Hello, World! whaaaa
                </h1>
            </div>
        );
    }
}

export default App;
