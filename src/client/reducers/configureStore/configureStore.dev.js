
import { createStore,
         compose,
         applyMiddleware }       from 'redux';
import thunk                     from 'redux-thunk';
import reducers                  from '../rootReducer';


// apply middleware
const middleware = [thunk];

const createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
)(createStore);


// prep the store configuration function that will replace the hot module
function configureStore(initialState) {
    const store = createStoreWithMiddleware(reducers, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../store', () => {
            const nextReducer = require('../store').default;
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

const configuredStore = configureStore(window[constants.storage] || {});

export { configuredStore };
