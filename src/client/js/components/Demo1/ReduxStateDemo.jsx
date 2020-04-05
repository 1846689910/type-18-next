import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Button, styled } from "@material-ui/core";
import { setCounterAction } from "../../settings/actions";

const Btn = styled(Button)({ fontWeight: "bold" });

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
          <Btn
            variant="contained"
            color="primary"
            onClick={() => dispatch(setCounterAction(counter.value + 1))}
          >
            increase
          </Btn>
        </Grid>
        <Grid container item xs={6} justify="center">
          <Btn
            variant="contained"
            color="secondary"
            onClick={() => dispatch(setCounterAction(counter.value - 1))}
          >
            decrease
          </Btn>
        </Grid>
      </Grid>
    </Grid>
  );
}
