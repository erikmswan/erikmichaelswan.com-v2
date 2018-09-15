
import { createStore,
    compose,
    applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../rootReducer';


// apply middleware
const middleware = [thunk];

const createStoreWithMiddleware = compose(
    applyMiddleware(...middleware)
)(createStore);


// create the store
export const configuredStore = createStoreWithMiddleware(reducers);
