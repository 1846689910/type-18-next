import React, { Fragment, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  Container,
  Grid,
  AppBar,
  makeStyles,
  Typography,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Chip
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useRouter } from "next/router";
import Head from "next/head";
import MediaQueryContext, { QUERY } from "./MediaQueryContext";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import TabletMacIcon from "@material-ui/icons/TabletMac";
import LaptopIcon from "@material-ui/icons/Laptop";
import HdIcon from "@material-ui/icons/Hd";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  hc: {
    height: "60px"
  },
  hcg: {
    height: "100%"
  },
  menu: {
    marginTop: "45px"
  },
  container_grid: {
    width: "100%",
    height: "50px"
  },
  btnGroup: {
    margin: "0 20px",
    textTransform: "none",
    fontWeight: "bold"
  },
  btnGroup_btn: {
    fontWeight: "bold",
    textTransform: "none"
  },
  folders_btn: {
    width: "20px"
  },
  subMenuItem: ({ query, fileId }) => ({
    background:
      query && query.fileId === `${fileId}` ? theme.palette.secondary.main : ""
  })
}));

export default function Nav() {
  const classes = useStyles();
  const counter = useSelector(state => state.counter);
  const router = useRouter();
  const tabs = [
    { path: "/", label: "Home" },
    { path: "/demo1", label: "Demo1" },
    {
      path: "/folders/[folderId]",
      label: "Folders",
      routes: {
        path: "/folders/[folderId]/files/[fileId]",
        fileIds: [123, 456, 789]
      }
    },
    { path: "/demo2/[counter]", label: "Demo2" }
  ];
  const tabButtonClick = path => {
    let asString = path;
    if (path === "/folders/[folderId]") {
      asString = path.replace("[folderId]", 123);
    } else if (path === "/demo2/[counter]") {
      asString = path.replace("[counter]", counter.value);
    }
    router.push(path, asString);
  };
  return (
    <Fragment>
      <ForNextJsCustomHead asPath={router.asPath} />
      <Title />
      <AppBar position="static" className={classes.root}>
        <Container maxWidth="md">
          <Grid
            container
            className={classes.container_grid}
            alignItems="center"
          >
            <Grid container justify="center">
              {tabs.map((x, i) => {
                const TabBtn = x.routes ? TabButtonGroup : TabButton;
                return (
                  <TabBtn route={x} key={i} handleClick={tabButtonClick} />
                );
              })}
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Fragment>
  );
}
/**
 *
 * @description regular tab button
 */
function TabButton({ route, handleClick }) {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Button
      className={classes.btnGroup}
      variant="contained"
      color={route.path === router.pathname ? "secondary" : "default"}
      onClick={() => handleClick(route.path)}
    >
      {route.label}
    </Button>
  );
}
TabButton.propTypes = {
  route: PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    path: PropTypes.string
  }),
  handleClick: PropTypes.func
};
/**
 *
 * @description tab button with dropdown menu
 */
function TabButtonGroup({ route, handleClick }) {
  const classes = useStyles();
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
  handleClick: PropTypes.func
};

function Title() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Container className={classes.hc} maxWidth="md">
      <Grid
        className={classes.hcg}
        container
        alignItems="flex-end"
        justify="space-between"
      >
        <Typography variant="h4" onClick={() => router.push("/")}>
          Type 18 next
        </Typography>
        <MediaChip />
      </Grid>
    </Container>
  );
}

function MediaChip() {
  const { media } = useContext(MediaQueryContext);
  let icon;
  switch (media) {
    case QUERY.MOBILE_S:
    case QUERY.MOBILE_M:
    case QUERY.MOBILE_L:
      icon = <SmartphoneIcon />;
      break;
    case QUERY.TABLET:
      icon = <TabletMacIcon />;
      break;
    case QUERY.LAPTOP:
    case QUERY.LAPTOP_L:
      icon = <LaptopIcon />;
      break;
    default:
      icon = <HdIcon />;
  }
  return <Chip label={media} icon={icon} variant="outlined" size="small" />;
}

function FolderDropdown(props) {
  const { anchorEl, handleClose, routes } = props;
  const router = useRouter();
  const handleClick = fileId => {
    handleClose();
    router.push(
      routes.path,
      routes.path.replace("[folderId]", 123).replace("[fileId]", fileId)
    );
  };
  const classes = useStyles();
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
  routes: PropTypes.object
};

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
function ForNextJsCustomHead({ asPath }) {
  const atHome = asPath === "/";
  return (
    <Head>
      <title>{`type-18-next ${atHome ? "" : asPath}`}</title>
      {asPath && (
        <link
          key="leaflet-css"
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/leaflet.css"
          integrity="sha256-SHMGCYmST46SoyGgo4YR/9AlK1vf3ff84Aq9yK4hdqM="
          crossOrigin="anonymous"
        />
      )}
    </Head>
  );
}
ForNextJsCustomHead.propTypes = {
  asPath: PropTypes.string
};
