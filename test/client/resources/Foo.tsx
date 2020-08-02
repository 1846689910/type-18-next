import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

export default class Foo extends React.Component<{}, {}> {
  componentDidMount() {
    console.log("mounted");
  }
  render() {
    return (
      <Grid container justify="center">
        <Typography>
          <span>Hello World</span>
        </Typography>
      </Grid>
    );
  }
}
