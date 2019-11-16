import App from "next/app";
import React from "react";
import withReduxStore from "../client/settings/with-redux-store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../client/themes";
import "../client/styles/style.css"; // TODO: after using `withCss`, Link routing will break. Can be fix to work by importing even an empty css file in `_app.js`

class _App extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Kickstart an elegant, consistent, and simple baseline to build upon. */}
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </>
    );
  }
}
export default withReduxStore(_App);
