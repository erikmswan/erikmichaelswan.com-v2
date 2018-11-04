// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import log from "loglevel";
import { store } from "./reducers/store";
import { App } from "./components/App/App";

// set our loglevel
log.setLevel(process.env.NODE_ENV === "production" ? "error" : "debug");

const render = Component => {
  const appDOM = document.getElementById("app");
  try {
    if (appDOM == null) {
      throw new TypeError(
        "Could not find element with id 'app', so I didn't load the app."
      );
    }
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <Component />
        </Provider>
      </AppContainer>,
      appDOM
    );
  } catch (error) {
    log.debug(error);
  }
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./components/App/App", () => {
    render(require("./components/App/App").default);
  });
}
