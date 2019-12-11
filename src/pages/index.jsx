import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "../client/styles/App.scss";
import "../client/styles/App.css";
import "../client/styles/App.less";
import "../client/styles/App.styl";
import css1 from "../client/styles/moduled/App.module.css";
import less1 from "../client/styles/moduled/App.module.less";
import scss1 from "../client/styles/moduled/App.module.scss";
import stylus1 from "../client/styles/moduled/App.module.styl";
import { Container, Grid, Typography } from "@material-ui/core";
import Nav from "../client/js/components/Nav";

// import { useSelector } from "react-redux";
// import MyLayout from "../client/js/components/MyLayout";
// import fetch from "isomorphic-unfetch";
// import Markdown from "react-markdown";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// import { ParentComp } from "../client/js/components/Demo3";
import Promise from "bluebird";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
// import MuiLink from "@material-ui/core/Link";

function ModuledStyleDemo() {
  return (
    <Grid container justify="space-evenly">
      <Grid item>
        <div className={css1.css}>CSS Module + CSS</div>
      </Grid>
      <Grid item>
        <div className={scss1.scss}>CSS Module + SCSS</div>
      </Grid>
      <Grid item>
        <div className={less1.less}>CSS Module + LESS</div>
      </Grid>
      <Grid item>
        <div className={stylus1.stylus}>CSS Module + STYLUS</div>
      </Grid>
    </Grid>
  );
}

export default function Index(props) {
  const { shows } = props;
  console.log(shows);
  // const DemoDynamic = dynamic(() => import("../client/js/components/Demo1"));
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <Grid container justify="center">
            <Typography variant="h5">The {"<Home/>"} component</Typography>
          </Grid>
          <ModuledStyleDemo />
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
  const data = await (Promise.resolve([
    { show: 1 },
    { show: 2 },
    { show: 3 }
  ]));

  console.log(`Show data fetched on server side. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};
