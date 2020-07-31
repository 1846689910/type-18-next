import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { useStore } from "../client/js/settings/store";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../client/styles/theme";
import "../client/styles/App.css"; // TODO: after using `withCss`, Link routing will break. Can be fix to work by importing even an empty css file in `_app.js`
import "../client/styles/App.scss";
import "../client/styles/App.less";
import "../client/styles/App.styl";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { MediaQueryProvider } from "../client/js/components/MediaQueryContext";
import fetch from "node-fetch";

global.fetch = fetch;

export default function App({ Component, pageProps }) {
  const store = useStore();
  const graphqlUri = "/graphql"; // default value
  const apolloClient = new ApolloClient({
    uri: graphqlUri,
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
App.propTypes = {
  Component: PropTypes.func,  // React.FunctionComponent
  pageProps: PropTypes.object,
};
App.getInitialProps = async () => {
  console.log(`Needs server-side-rendered page with Automatic Static Optimization disabled for getting nonEmpty router.query in demo2\n
      https://nextjs.org/docs/advanced-features/automatic-static-optimization#how-it-works`);
  return {};
};