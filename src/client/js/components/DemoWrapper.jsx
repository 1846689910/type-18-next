import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Divider, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    margin: "20px 0 0px 0"
  },
  typography: {
    fontSize: "18px"
  },
  divider: {
    width: "100%",
    marginBottom: "20px"
  }
});

export default function DemoWrapper({ children, title }) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid className={classes.title} container justify="flex-start">
        {/* this is a row */}
        <Typography variant="h6" className={classes.typography}>
          <strong>{title}</strong>
        </Typography>
      </Grid>
      <Divider className={classes.divider} />
      {children}
    </Grid>
  );
};
DemoWrapper.propTypes = {
  children: PropTypes.object,
  title: PropTypes.string
};