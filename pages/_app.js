import App from "next/app";
import React from "react";
import withReduxStore from "../src/client/settings/with-redux-store";
import { Provider } from "react-redux";
import "../src/client/styles/style.css";  // TODO: after using `withCss`, Link routing will break. Can be fix to work by importing even an empty css file in `_app.js`

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
