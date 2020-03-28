import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Button,
  ButtonGroup,
  Menu,
  MenuItem
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useRouter } from "next/router";

/**
 *
 * @description tab button with dropdown menu
 */
export default function TabButtonGroup({ route, handleClick, classes }) {
  const [fileAnchor, setFileAnchor] = useState(null);
  const router = useRouter();
  return (
    <Fragment>
      <ButtonGroup className={classes.btnGroup}>
        <Button
          className={classes.btnGroup_btn}
          variant="contained"
          color={route.path === router.pathname ? "secondary" : "default"}
          onClick={() => handleClick(route.path)}
        >
          {route.label}
        </Button>
        <Button
          className={classes.folders_btn}
          variant="contained"
          onClick={e => setFileAnchor(e.target)}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      {route.label === "Folders" && (
        <FolderDropdown
          anchorEl={fileAnchor}
          classes={classes}
          handleClose={() => setFileAnchor(null)}
          routes={route.routes}
        />
      )}
    </Fragment>
  );
}
TabButtonGroup.propTypes = {
  route: PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    path: PropTypes.string,
    routes: PropTypes.object
  }),
  handleClick: PropTypes.func,
  classes: PropTypes.object
};

function FolderDropdown(props) {
  const { anchorEl, handleClose, routes, classes } = props;
  const router = useRouter();
  const handleClick = fileId => {
    handleClose();
    router.push(
      routes.path,
      routes.path.replace("[folderId]", 123).replace("[fileId]", fileId)
    );
  };
  return (
    <Menu
      id="simple-menu"
      className={classes.menu}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {routes.fileIds.map((x, i) => (
        <EachMenuItem
          key={i}
          fileId={x}
          query={router.query}
          onClick={() => handleClick(x)}
        >
          {`File${x}`}
        </EachMenuItem>
      ))}
    </Menu>
  );
}
FolderDropdown.propTypes = {
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func,
  routes: PropTypes.object,
  classes: PropTypes.object
};

const useStyles = makeStyles(theme => ({
  subMenuItem: ({ query, fileId }) => ({
    background:
      query && query.fileId === `${fileId}` ? theme.palette.secondary.main : "",
    color: query && query.fileId === `${fileId}` ? "white" : "",
    fontWeight: "bold"
  })
}));

const EachMenuItem = React.forwardRef(
  ({ children, query, fileId, ...props }, ref) => {
    const classes = useStyles({ query, fileId });
    return (
      <MenuItem ref={ref} className={classes.subMenuItem} {...props}>
        {children}
      </MenuItem>
    );
  }
);
EachMenuItem.propTypes = {
  children: PropTypes.string,
  query: PropTypes.object,
  fileId: PropTypes.number
};
