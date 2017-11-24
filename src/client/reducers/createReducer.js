
// @flow

import type { Action } from './types';

export function createReducer(defaultState: ?{}, handlers: {}) {
    return function reducer(state: ?{} = defaultState, action: Action<*>) {
        return typeof handlers[action.type] === 'function'
            ? handlers[action.type](state, action)
            : state;
    };
}

export default createReducer;
