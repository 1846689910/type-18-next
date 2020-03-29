import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  makeStyles,
  Button,
  Menu,
  MenuItem,
  IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  menu: {
    marginLeft: "-20px"
  },
  menuItem: {
    minWidth: "150px"
  },
  btn: {
    padding: "5px 0",
    minWidth: 0,
    width: "40px",
    zIndex: 999
  }
});

export default function MobileTabButton({ classes, tabs, handleClick }) {
  const [anchor, setAnchor] = useState(null);
  const mobileClasses = useStyles();
  return (
    <Fragment>
      <Button
        variant="contained"
        color="default"
        onClick={e => setAnchor(e.target)}
        size="small"
        className={mobileClasses.btn}
      >
        <MenuIcon />
      </Button>
      <Menu
        className={clsx(classes.menu, mobileClasses.menu)}
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
      >
        {tabs.map((x, i) =>
          x.routes ? (
            <CustomMenuItemWithSubmenu
              key={i}
              tab={x}
              setAnchor={setAnchor}
              handleClick={handleClick}
            />
          ) : (
            <CustomMenuItem key={i} tab={x} handleClick={handleClick} />
          )
        )}
      </Menu>
    </Fragment>
  );
}
MobileTabButton.propTypes = {
  classes: PropTypes.object,
  tabs: PropTypes.array,
  handleClick: PropTypes.func
};

const CustomMenuItem = React.forwardRef(({ tab, handleClick }, ref) => {
  const { label, path } = tab;
  return (
    <Fragment>
      <MenuItem ref={ref} onClick={() => handleClick(path)}>
        {label}
      </MenuItem>
    </Fragment>
  );
});
CustomMenuItem.propTypes = {
  tab: PropTypes.object,
  handleClick: PropTypes.func
};

const CustomMenuItemWithSubmenu = React.forwardRef(
  ({ tab, setAnchor: setUpperAnchor, handleClick: itemClick }, ref) => {
    const router = useRouter();
    const { label, routes } = tab;
    const [anchor, setAnchor] = useState(null);
    const handleClick = fileId => {
      router.push(
        routes.path,
        routes.path.replace("[folderId]", 123).replace("[fileId]", fileId)
      );
      setAnchor(null);
      setUpperAnchor(null);
    };
    return (
      <Fragment>
        <MenuItem ref={ref}>
          <div onClick={() => itemClick(tab.path)}>{label}</div>
          <IconButton size="small" onClick={e => setAnchor(e.target)}>
            <ArrowRightIcon />
          </IconButton>
        </MenuItem>
        {
          <Menu
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={() => setAnchor(null)}
          >
            {routes.fileIds.map((x, i) => (
              <MenuItem
                key={i}
                onClick={() => handleClick(x)}
              >{`File${x}`}</MenuItem>
            ))}
          </Menu>
        }
      </Fragment>
    );
  }
);
CustomMenuItemWithSubmenu.propTypes = {
  tab: PropTypes.object,
  setAnchor: PropTypes.func,
  handleClick: PropTypes.func
};
