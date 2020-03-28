import App from "next/app";
import React from "react";
import withReduxStore from "../client/js/settings/with-redux-store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../client/styles/theme";
import "../client/styles/App.css"; // TODO: after using `withCss`, Link routing will break. Can be fix to work by importing even an empty css file in `_app.js`
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { MediaQueryProvider } from "../client/js/components/MediaQueryContext";
import fetch from "node-fetch";

global.fetch = fetch;

class _App extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }
  static graphqlUri = "/graphql"; // default value
  render() {
    const { Component, pageProps, store } = this.props;
    const apolloClient = new ApolloClient({
      uri: _App.graphqlUri
    });
    return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Kickstart an elegant, consistent, and simple baseline to build upon. */}
            <MediaQueryProvider>
              <Component {...pageProps} />
            </MediaQueryProvider>
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    );
  }
}
export default withReduxStore(_App);
