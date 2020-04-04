import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  setSelectOptionsAction,
  setSelectedOptionAction,
} from "../../../settings/actions";
import { useSelector, useDispatch } from "react-redux";
import Select, { components } from "react-select";
import { Grid, makeStyles } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles({
  outer: {
    margin: "10px 0",
  },
  label: (attr) => ({
    color: attr.color,
  }),
  optionFiber: (attr) => ({
    fontSize: "14px",
    color: attr.isDisabled ? "gray" : attr.color,
  }),
});

const colourOptions = async () => [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

export function ReactSelectDemo() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectOptions = useSelector((state) => state.selectOptions);
  const selectedOption = useSelector((state) => state.selectedOption);
  useEffect(() => {
    (async () => {
      const _options = await colourOptions();
      dispatch(setSelectOptionsAction(_options));
      dispatch(setSelectedOptionAction(_options.filter((_) => _.isFixed)));
    })();
  }, []);
  const handleChange = (selected, action) => {  // eslint-disable-line
    dispatch(setSelectedOptionAction(selected));
  };
  return (
    <Grid className={classes.outer} container justify="center">
      <Grid item xs={4} container justify="center">
        <Select
          isMulti
          value={selectedOption.value}
          name="colors"
          options={selectOptions.value}
          className="basic-multi-select"
          classNamePrefix="select"
          maxMenuHeight={210}
          onChange={handleChange}
          styles={{
            container: (base) => ({
              ...base,
              minWidth: "300px",
            }),
          }}
          components={{
            MultiValueLabel: CustomMultiValueLabel,
            Option: CustomOption,
          }}
        />
      </Grid>
    </Grid>
  );
}
function CustomMultiValueLabel({ children, ...props }) {
  const classes = useStyles(props.data);
  return (
    <components.MultiValueLabel {...props}>
      <strong className={classes.label}>{children}</strong>
    </components.MultiValueLabel>
  );
}
CustomMultiValueLabel.propTypes = {
  children: PropTypes.string,
  data: PropTypes.object,
  props: PropTypes.shape({
    data: PropTypes.shape({
      color: PropTypes.string,
    }),
  }),
};
function CustomOption({ children, ...props }) {
  const classes = useStyles(props.data);
  return (
    <components.Option {...props}>
      <Grid container alignItems="center" item xs={12}>
        <Grid item xs={1} container alignItems="center">
          <FiberManualRecordIcon className={classes.optionFiber} />
        </Grid>
        <Grid item xs={11}>
          {children}
        </Grid>
      </Grid>
    </components.Option>
  );
}
CustomOption.propTypes = {
  children: PropTypes.string,
  data: PropTypes.object,
  props: PropTypes.object,
};
