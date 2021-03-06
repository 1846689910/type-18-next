import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { get, isNaN } from "lodash";
import Nav from "../../client/js/components/Nav";
import { setCounterAction } from "../../client/js/settings/actions";

export default function Demo2(): React.ReactElement {
  const dispatch = useDispatch();
  const mainCounter = useSelector(
    (state: { counter: { value: number } }) => state.counter.value,
  );
  const router = useRouter();
  useEffect(() => {
    const counter = parseInt(get(router, "query.counter", 0));
    if (mainCounter !== counter && !isNaN(counter)) {
      dispatch(setCounterAction(counter));
    }
  }, []);
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <Grid container item xs={12} justify="center">
            <strong>I am {router.asPath}</strong>
          </Grid>
          <Grid container item xs={12} justify="center"></Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
