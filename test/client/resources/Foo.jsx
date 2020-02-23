import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default class Foo extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log("mounted");
  }
  render(){
    return <Grid container justify="center">
      <Typography><span>Hello World</span></Typography>
    </Grid>;
  }
}