import App from "next/app";
import React from "react";
import withReduxStore from "../client/settings/with-redux-store";
import { Provider } from "react-redux";

class _App extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
export default withReduxStore(_App);
