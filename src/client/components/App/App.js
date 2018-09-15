
// @flow

import 'styles/main.scss';
import * as React from 'react';
import { store } from 'reducers';
import { constants } from 'lib/env';
import { Masthead } from 'components';


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
            <div>
                <Masthead />
            </div>
        );
    }
}

export default App;
