import React from "react";
import { Provider } from "react-redux";
import { useStore } from "../client/js/settings/store";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../client/styles/theme";
import "../client/styles/App.css"; // TODO: after using `withCss`, Link routing will break. Can be fix to work by importing even an empty css file in `_app.js`
import "../client/styles/App.scss";
import "../client/styles/App.less";
import "../client/styles/App.styl";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { MediaQueryProvider } from "../client/js/components/MediaQueryContext";

type AppProps = {
  Component: () => React.ReactElement;
  pageProps: Record<string, unknown>;
};

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore();
  console.log(process.env.NODE_ENV);
  const isDev = process.env.NODE_ENV === "development";
  const graphqlUri = isDev
    ? "/graphql"
    : "https://micro-bus.vercel.app/_api/type-18-next"; // default value
  const cache = new InMemoryCache();
  const link = createHttpLink({
    uri: graphqlUri,
    fetch,
  });
  const apolloClient = new ApolloClient({
    cache,
    link,
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

App.getInitialProps = async () => {
  console.log(`Needs server-side-rendered page with Automatic Static Optimization disabled for getting nonEmpty router.query in demo2\n
      https://nextjs.org/docs/advanced-features/automatic-static-optimization#how-it-works`);
  return {};
};
