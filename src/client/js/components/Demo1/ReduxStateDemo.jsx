import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { setCounterAction } from "../../settings/actions";

export default function ReduxStateDemo() {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  return (
    <Grid container>
      <Grid container item xs={12} justify="center">
        <Typography component="strong">{counter.value}</Typography>
      </Grid>
      <Grid container item xs={12}>
        <Grid container item xs={6} justify="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(setCounterAction(counter.value + 1))}
          >
            increase
          </Button>
        </Grid>
        <Grid container item xs={6} justify="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(setCounterAction(counter.value - 1))}
          >
            decrease
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
