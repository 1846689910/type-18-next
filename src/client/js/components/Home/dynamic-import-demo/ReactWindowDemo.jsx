import React from "react";
import { FixedSizeList } from "react-window";
import PropTypes from "prop-types";
import { Grid, makeStyles, MenuItem } from "@material-ui/core";

const useStyles = makeStyles({
  outer: {
    margin: "10px 0"
  },
  list: {
    border: "1px solid rgba(0,0,0,0.3)",
    minWidth: "300px"
  }
});

const Row = ({ data, index, style }) => {  // eslint-disable-line
  return <MenuItem style={style}>Row {index}</MenuItem>;
};
Row.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
  style: PropTypes.object
};

export default () => {
  const classes = useStyles();
  return (
    <Grid className={classes.outer} container justify="center">
      <Grid item xs={4} container justify="center">
        <FixedSizeList
          className={classes.list}
          height={150}
          itemCount={1000}
          itemSize={35}
          width={300}
          itemData={{ classes }}
        >
          {Row}
        </FixedSizeList>
      </Grid>
    </Grid>
  );
};
