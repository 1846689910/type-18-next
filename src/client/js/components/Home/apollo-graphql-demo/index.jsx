import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { LocalProvider } from "./LocalContext";
import dynamic from "next/dynamic";

const useStyles = makeStyles({
  outer: {
    position: "relative"
  }
});

const MapDemo = dynamic(
  () => import(/* webpackChunkName: "MapDemo" */ "./Map"),
  {
    ssr: false,
    loading: () => (
      <Typography variant="h6">{"<MapDemo/>"} is loading ...</Typography>
    )
  }
);

const MarkerSelectDemo = dynamic(
  () => import(/* webpackChunkName: "MarkerSelectDemo" */ "./MarkerSelect"),
  {
    ssr: false,
    loading: () => (
      <Typography variant="h6">
        {"<MarkerSelectDemo/>"} is loading ...
      </Typography>
    )
  }
);

export default function ApolloGraphqlDemo() {
  const classes = useStyles();
  return (
    <LocalProvider>
      <Grid container justify="center" className={classes.outer}>
        <MapDemo />
        <MarkerSelectDemo />
      </Grid>
    </LocalProvider>
  );
}
