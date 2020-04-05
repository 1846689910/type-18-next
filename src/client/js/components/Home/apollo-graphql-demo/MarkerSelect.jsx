import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Grid, makeStyles, IconButton } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AddIcon from "@material-ui/icons/Add";
import Select, { components } from "react-select";
import LocalContext from "./LocalContext";
import Promise from "bluebird";
import { initLatLng, initZoom } from "./Map";
import Landmark from "../../../models/Landmark";
import MediaQueryContext from "../../MediaQueryContext";

const useStyles = makeStyles({
  markerSelect: {
    position: "absolute",
    zIndex: 99,
    top: "20px",
    left: "20px"
  },
  addIcon: {
    fontSize: "20px"
  },
  addBtn: {
    width: "35px"
  }
});

export default function MarkerSelect() {
  const classes = useStyles();
  const {
    landmarks,
    markers,
    map,
    selectedMarkerOption,
    setSelectedMarkerOption
  } = useContext(LocalContext);
  const [landmarkOptions, setLandmarkOptions] = useState([]);
  useEffect(() => {
    if (landmarks && markers.length > 0) {
      setLandmarkOptions(
        landmarks
          .map(({ name }, i) => ({
            value: markers[i],
            label: name
          }))
          .sort((x, y) => x.label.localeCompare(y.label))
      );
    }
  }, [landmarks, markers]);
  const handleChange = async selected => {
    const marker = selected.value;
    if (selectedMarkerOption) {
      selectedMarkerOption.value.closePopup();
      map.flyTo(initLatLng, initZoom, {
        animate: true,
        duration: 3,
        easeLinearity: 1
      });
      // await Promise && Promise.delay(3000);// next.js issue, Promise undefined
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    marker.fire("click");
    setSelectedMarkerOption(selected);
  };
  const { isTablet, isMobile } = useContext(MediaQueryContext);
  const gXs = isMobile ? 10 : isTablet ? 8 : 6;
  return (
    <Grid
      item
      xs={12}
      container
      justify="flex-start"
      className={classes.markerSelect}
    >
      <Grid item xs={gXs}>
        <Select
          value={selectedMarkerOption}
          options={landmarkOptions}
          onChange={handleChange}
          components={{
            Option: CustomOption,
            IndicatorsContainer: CustomIndicatorsContainer
          }}
        />
      </Grid>
    </Grid>
  );
}
function CustomOption({ children, ...props }) {
  const { label } = props.data;
  const {
    setShowEditor,
    landmarks,
    setPrevFields,
    deleteLandmark
  } = useContext(LocalContext);
  const handleUpdate = e => {
    e.stopPropagation();
    const obj = landmarks.find(x => x.name === label);
    const fields = Landmark.fromObject(obj).toFields();
    setPrevFields(fields);
    setShowEditor(true);
  };
  const handleDelete = e => {
    e.stopPropagation();
    const { id } = landmarks.find(x => x.name === label);
    deleteLandmark({ variables: { id } });
  };
  return (
    <components.Option {...props}>
      <Grid container alignItems="center" item xs={12}>
        <Grid item xs={10}>
          {children}
        </Grid>
        <Grid item xs={1} container alignItems="center">
          <IconButton size="small" onClick={handleUpdate} color="primary">
            <EditOutlinedIcon />
          </IconButton>
        </Grid>
        <Grid item xs={1} container alignItems="center">
          <IconButton size="small" onClick={handleDelete} color="secondary">
            <DeleteOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </components.Option>
  );
}
CustomOption.propTypes = {
  children: PropTypes.string,
  props: PropTypes.shape({
    data: PropTypes.object
  }),
  data: PropTypes.object
};
function CustomIndicatorsContainer({ children, ...props }) {
  const { setShowEditor, setPrevFields } = useContext(LocalContext);
  const classes = useStyles();
  const handleClick = e => {
    e.stopPropagation();
    setPrevFields(undefined);
    setShowEditor(true);
  };
  return (
    <div>
      <components.IndicatorsContainer {...props}>
        {children}
        <IconButton
          size="small"
          color="default"
          className={classes.addBtn}
          onClick={handleClick}
        >
          <AddIcon className={classes.addIcon} />
        </IconButton>
      </components.IndicatorsContainer>
    </div>
  );
}
CustomIndicatorsContainer.propTypes = {
  children: PropTypes.array,
  props: PropTypes.object
};
