import React, { Fragment, useState } from "react";
import {
  makeStyles,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useRouter } from "next/router";

type TabButtonGroupProps = {
  route: {
    key?: string;
    path: string;
    label: string;
    routes?: {
      fileIds: number[];
      path: string;
    };
  };
  handleClick: (string) => void;
  classes: Record<string, string>;
};

/**
 *
 * @description tab button with dropdown menu
 */
export default function TabButtonGroup({
  route,
  handleClick,
  classes,
}: TabButtonGroupProps) {
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
          onClick={(e) => setFileAnchor(e.target)}
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

type FolderDropdownProps = {
  anchorEl: HTMLElement;
  handleClose: () => void;
  routes: {
    fileIds: number[];
    path: string;
  };
  classes: Record<string, string>;
};

function FolderDropdown(props: FolderDropdownProps) {
  const { anchorEl, handleClose, routes, classes } = props;
  const router = useRouter();
  const handleClick = (fileId: number) => {
    handleClose();
    router.push(
      routes.path,
      routes.path
        .replace("[folderId]", "123")
        .replace("[fileId]", fileId.toString()),
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

const useStyles = makeStyles((theme) => ({
  subMenuItem: ({
    query,
    fileId,
  }: {
    query: Record<string, unknown>;
    fileId: number;
  }) => ({
    background:
      query && query.fileId === `${fileId}` ? theme.palette.secondary.main : "",
    color: query && query.fileId === `${fileId}` ? "white" : "",
    fontWeight: "bold",
  }),
}));

type EachMenuItemProps = {
  children: string | React.ReactElement | React.ReactElement[];
  query: Record<string, unknown>;
  fileId: number;
  onClick: () => void;
};

const EachMenuItem = React.forwardRef<never, EachMenuItemProps>(
  // eslint-disable-next-line react/prop-types
  ({ children, query, fileId, ...restProps }, ref) => {
    const classes = useStyles({ query, fileId });
    return (
      <MenuItem ref={ref} className={classes.subMenuItem} {...restProps}>
        {children}
      </MenuItem>
    );
  },
);
