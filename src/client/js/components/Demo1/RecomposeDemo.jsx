import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Switch
} from "@material-ui/core";
import WifiIcon from "@material-ui/icons/Wifi";
import FlightIcon from "@material-ui/icons/FlightTakeoff";
import BluetoothIcon from "@material-ui/icons/Bluetooth";
import {
  compose,
  withState,
  withHandlers,
  withProps,
  withContext,
  getContext
} from "recompose";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const enhance = compose(
  withState("checked", "setChecked", ["wifi"]),
  withHandlers({
    handleToggle: ({ checked, setChecked }) => value => event => {  // eslint-disable-line
      const currentIndex = checked.indexOf(value);
      let newChecked = [...checked];
      if (currentIndex === -1) {
        if (value === "flight") newChecked = [];
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
    }
  }),
  withProps({ title: "Settings" }),
  withProps({
    info: {
      wifi: { id: "switch-list-label-wifi", primary: "Wi-Fi" },
      bluetooth: { id: "switch-list-label-bluetooth", primary: "Bluetooth" },
      flight: { id: "switch-list-label-flight", primary: "Airplane Mode" }
    }
  })
);

const _Provider = ({ children }) => children;

const CustomProvider = withContext({ edge: PropTypes.string }, ({ edge }) => ({
  edge
}))(_Provider);

function _EachSwitch({ children, id, primary, handleToggle, checked, edge, caption }) {
  return (
    <ListItem>
      <ListItemIcon>
        {children}
      </ListItemIcon>
      <ListItemText id={id} primary={primary} />
      <ListItemSecondaryAction>
        <Switch
          edge={edge}
          onChange={handleToggle(caption)}
          checked={checked.indexOf(caption) !== -1}
          inputProps={{ "aria-labelledby": id }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
_EachSwitch.propTypes = {
  children: PropTypes.object,
  id: PropTypes.string,
  primary: PropTypes.string,
  handleToggle: PropTypes.func,
  checked: PropTypes.array,
  edge: PropTypes.string,
  caption: PropTypes.string
};
const EachSwitch = getContext({ edge: PropTypes.string })(_EachSwitch);

function RecomposeDemo({ handleToggle, checked, title, info }) {
  const classes = useStyles();
  const { wifi, bluetooth, flight } = info;
  return (
    <Grid container justify="center">
      <List
        subheader={<ListSubheader>{title}</ListSubheader>}
        className={classes.root}
      >
        <CustomProvider edge="end">
          <EachSwitch
            {...{ handleToggle, checked, id: wifi.id, primary: wifi.primary, caption: "wifi" }}
          >
            <WifiIcon />
          </EachSwitch>
          <EachSwitch
            {...{
              handleToggle,
              checked,
              id: bluetooth.id,
              primary: bluetooth.primary,
              caption: "bluetooth"
            }}
          >
            <BluetoothIcon />
          </EachSwitch>
          <EachSwitch
            {...{
              handleToggle,
              checked,
              id: flight.id,
              primary: flight.primary,
              caption: "flight"
            }}
          >
            <FlightIcon />
          </EachSwitch>
        </CustomProvider>
      </List>
    </Grid>
  );
}
RecomposeDemo.propTypes = {
  handleToggle: PropTypes.func,
  checked: PropTypes.array,
  title: PropTypes.string,
  info: PropTypes.object
};
export default enhance(RecomposeDemo);
