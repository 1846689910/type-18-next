import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Grid, Container } from "@material-ui/core";
import Nav from "../client/js/components/Nav";
import RecomposeDemo from "../client/js/components/Demo1/RecomposeDemo";
import ReduxStateDemo from "../client/js/components/Demo1/ReduxStateDemo";
import DemoWrapper from "../client/js/components/DemoWrapper";

export default function Demo1(props) {
  console.log(props.initObj);
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <DemoWrapper title="Redux State Demo">
            <ReduxStateDemo />
          </DemoWrapper>
          <DemoWrapper title="Recompose Demo">
            <RecomposeDemo />
          </DemoWrapper>
        </Grid>
      </Container>
    </Fragment>
  );
}
Demo1.propTypes = {
  initObj: PropTypes.object
};
Demo1.getInitialProps = async context => {
  // eslint-disable-line
  const message = await Promise.resolve("Hello");
  return {
    initObj: { message }
  };
};
