
// @flow

import { combineReducers,
         createStore } from 'redux';
import { pageReducer }        from 'reducers';

const reducers = combineReducers({
    page : pageReducer
});

const store = createStore(reducers);

export { store };
