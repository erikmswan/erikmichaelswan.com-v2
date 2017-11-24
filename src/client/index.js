
// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { store } from './reducers/store';
import { App } from './components/App/App';


const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
};

render(App);


// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/App/App', () => { render(App); });
}
