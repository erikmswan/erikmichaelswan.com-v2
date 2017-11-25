
// @flow



/*********
* Generics
**********/

export type Action<P> = {
    type    : string,
    payload : P
};

export type ActionMaybePayload<P> = {
    type     : string,
    payload? : P
};

export type Handler<S> = {
  [type: string]: (state: S, action: Action<*>) => S
};


/*******************
* Page Reducer
********************/

export type PageState = {
    +page : {}
};

export type SetPage = {};


/*******************
* Global object type
********************/

// We can import this alias to type our state in connected components.
// It will also serve as documentation as to what state 'segmentations' are available.

export type State = {
    page: PageState
};
