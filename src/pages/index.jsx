import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "../client/styles/App.scss";
import "../client/styles/App.css";
import "../client/styles/App.less";
import "../client/styles/App.styl";
import { Container, Grid } from "@material-ui/core";
import Nav from "../client/js/components/Nav";
import DemoWrapper from "../client/js/components/DemoWrapper";
import ModuledStyleDemo from "../client/js/components/Home/ModuledStyleDemo";
import DynamicImportDemo from "../client/js/components/Home/dynamic-import-demo";
import ApolloGraphqlDemo from "../client/js/components/Home/apollo-graphql-demo";
import Promise from "bluebird";

export default function Index(props) {
  const { shows } = props;
  console.log(shows);
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <DemoWrapper title="CSS Module Demo">
            <ModuledStyleDemo />
          </DemoWrapper>
          <DemoWrapper title="Dynamic Import Demo">
            <DynamicImportDemo />
          </DemoWrapper>
          <DemoWrapper title="Apollo Graphql Demo">
            <ApolloGraphqlDemo />
          </DemoWrapper>
        </Grid>
      </Container>
    </Fragment>
  );
}
Index.propTypes = {
  shows: PropTypes.array
};

/**
 * @description dev server end-point for path `/`, please check https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 * @param {Object} context { env }
 */
export async function getStaticProps(context){
  console.log(context);
  const data = await Promise.resolve([{ show: 1 }, { show: 2 }, { show: 3 }]);
  console.log(`Show data fetched on server side. Count: ${data.length}`);
  return {
    props: {  // will be passed to the page component as props
      shows: data.map(entry => entry.show)
    }
  };
}
// Index.getInitialProps is deprecated
