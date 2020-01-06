import React from "react";
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
import { compose, withState, withHandlers, withProps } from "recompose";

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
    handleToggle: ({ checked, setChecked }) => (value) => event => {
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

function RecomposeDemo({ handleToggle, checked, title, info }) {
  const classes = useStyles();
  const { wifi, bluetooth, flight } = info;
  return (
    <Grid container justify="center">
      <List
        subheader={<ListSubheader>{title}</ListSubheader>}
        className={classes.root}
      >
        <ListItem>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText id={wifi.id} primary={wifi.primary} />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle("wifi")}
              checked={checked.indexOf("wifi") !== -1}
              inputProps={{ "aria-labelledby": wifi.id }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <BluetoothIcon />
          </ListItemIcon>
          <ListItemText id={bluetooth.id} primary={bluetooth.primary} />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle("bluetooth")}
              checked={checked.indexOf("bluetooth") !== -1}
              inputProps={{ "aria-labelledby": bluetooth.id }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FlightIcon />
          </ListItemIcon>
          <ListItemText id={flight.id} primary={flight.primary} />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle("flight")}
              checked={checked.indexOf("flight") !== -1}
              inputProps={{ "aria-labelledby": flight.id }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Grid>
  );
}
export default enhance(RecomposeDemo);
