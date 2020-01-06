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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function RecomposeDemo() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(["wifi"]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    let newChecked = [...checked];

    if (currentIndex === -1) {
      if (value === "flight") newChecked = [];
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Grid container justify="center">
      <List
        subheader={<ListSubheader>Settings</ListSubheader>}
        className={classes.root}
      >
        <ListItem>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle("wifi")}
              checked={checked.indexOf("wifi") !== -1}
              inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <BluetoothIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle("bluetooth")}
              checked={checked.indexOf("bluetooth") !== -1}
              inputProps={{ "aria-labelledby": "switch-list-label-bluetooth" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FlightIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-flight" primary="Airplane Mode" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle("flight")}
              checked={checked.indexOf("flight") !== -1}
              inputProps={{ "aria-labelledby": "switch-list-label-flight" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Grid>
  );
}
