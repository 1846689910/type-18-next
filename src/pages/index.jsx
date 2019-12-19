import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "../client/styles/App.scss";
import "../client/styles/App.css";
import "../client/styles/App.less";
import "../client/styles/App.styl";
import { Container, Grid } from "@material-ui/core";
import Nav from "../client/js/components/Nav";
import DemoWrapper from "../client/js/components/DemoWrapper";
import ModuledStyleDemo from "../client/js/components/ModuledStyleDemo";
import DynamicImportDemo from "../client/js/components/DynamicImportDemo";
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
        </Grid>
      </Container>
    </Fragment>
  );
}
Index.propTypes = {
  shows: PropTypes.array
};

Index.getInitialProps = async function(context) {
  console.log("context:\n>>>>>>>");
  console.log(context);
  console.log("<<<<<<");
  const data = await Promise.resolve([{ show: 1 }, { show: 2 }, { show: 3 }]);

  console.log(`Show data fetched on server side. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};
