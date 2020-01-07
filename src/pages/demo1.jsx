import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Container, Typography, Button } from "@material-ui/core";
import { increase, decrease } from "../client/js/settings/actions";
import Nav from "../client/js/components/Nav";

export default function Demo1(props) {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  console.log(props.initObj);
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <Grid container item xs={12} justify="center">
            <Typography component="strong">{counter.value}</Typography>
          </Grid>
          <Grid container item xs={12}>
            <Grid container item xs={6} justify="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(increase())}
              >
                increase
              </Button>
            </Grid>
            <Grid container item xs={6} justify="center">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => dispatch(decrease())}
              >
                decrease
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
Demo1.propTypes = {
  initObj: PropTypes.object
};
Demo1.getInitialProps = async context => {  // eslint-disable-line
  const message = await Promise.resolve("Hello");
  return {
    initObj: { message }
  };
};
