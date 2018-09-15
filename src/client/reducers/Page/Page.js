
// @flow

import type {
    Handler,
    Action,
    PageState,
    SetPage } from 'reducers/types';
import { createReducer } from 'reducers/createReducer';
import _ from 'lodash';
import { constants } from 'lib/env';


const defaultState = {
    page : {}
};

// Rather than use a function with a switch case inside,
// we create 'handlers'. This Handler's generic type requires
// a type alias of the whole reducer's state.
const handlers: Handler<PageState> = {

    // Rather than switch cases, the 'type' of actions will return
    // a function with the state and action parameters.
    // This allows us to segement our action types from each other
    // so that we don't have to do superfluous refinements.
    [constants.setPage](state, action: Action<SetPage>) {
        const newState = _.cloneDeep(state);
        newState.page = action.payload;
        return newState;
    }
};

// Make sure to insert our defaultState and 'handlers' into
// the 'createReducer' function, which wraps all of our reducers.
const pageReducer = createReducer(defaultState, handlers);
export { pageReducer, defaultState };
