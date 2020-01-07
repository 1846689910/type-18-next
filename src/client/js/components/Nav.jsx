import React, { Fragment, useState, createRef, useEffect } from "react";
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
  MenuItem
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useRouter } from "next/router";
import { theme } from "../../styles/theme";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  hc: {
    height: "60px"
  },
  hcg: {
    height: "100%"
  }
});

function PipelineDropdown(props) {
  const { anchorEl, handleClose, dropdown } = props;
  const refs = dropdown.fileIds.map(() => createRef());
  const router = useRouter();
  const handleClick = fileId => {
    handleClose();
    router.push(
      dropdown.pathname,
      dropdown.pathname.replace("[folderId]", 123).replace("[fileId]", fileId)
    );
  };
  useEffect(() => {
    const idx = dropdown.fileIds.findIndex(x => `${x}` === router.query.jobId);
    if (idx > 0) {
      refs.forEach(x => x.current && (x.current.style.background = ""));
      refs[idx].current &&
        (refs[idx].current.style.background = theme.palette.secondary.main);
    }
  });
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      style={{ marginTop: "45px" }}
    >
      {dropdown.fileIds.map((x, i) => (
        <MenuItem key={i} onClick={() => handleClick(x, i)} ref={refs[i]}>
          File{x}
        </MenuItem>
      ))}
    </Menu>
  );
}
PipelineDropdown.propTypes = {
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func,
  dropdown: PropTypes.object
};

export default function Nav() {
  const classes = useStyles();
  const counter = useSelector(state => state.counter);
  const [fileAnchor, setFileAnchor] = useState(null);
  const tabs = [
    { pathname: "/", label: "Home" },
    { pathname: "/demo1", label: "Demo1" },
    {
      pathname: "/folders/[folderId]",
      label: "Folders",
      dropdown: {
        pathname: "/folders/[folderId]/files/[fileId]",
        fileIds: [123, 456, 789]
      }
    },
    { pathname: "/demo2/[counter]", label: "Demo2" }
  ];
  const router = useRouter();
  const handleClick = pathname => {
    let asString = pathname;
    if (pathname === "/folders/[folderId]") {
      asString = pathname.replace("[folderId]", 123);
    } else if (pathname === "/demo2/[counter]") {
      asString = pathname.replace("[counter]", counter.value);
    }
    router.push(pathname, asString);
  };
  return (
    <Fragment>
      <Container className={classes.hc} maxWidth="md">
        <Grid className={classes.hcg} container alignItems="flex-end">
          <Typography variant="h4" onClick={() => router.push("/")}>
            Type 18 next
          </Typography>
        </Grid>
      </Container>
      <AppBar position="static" className={classes.root}>
        <Container maxWidth="md">
          <Grid
            container
            style={{ width: "100%", height: "50px" }}
            alignItems="center"
          >
            <Grid container justify="center">
              {tabs.map((x, i) => (
                <Fragment key={i}>
                  <ButtonGroup
                    style={{
                      margin: "0 20px"
                    }}
                  >
                    <Button
                      variant="contained"
                      color={
                        x.pathname === router.pathname ? "secondary" : "default"
                      }
                      onClick={() => handleClick(x.pathname)}
                      style={{
                        fontWeight: "bold",
                        textTransform: "none"
                      }}
                    >
                      {x.label}
                    </Button>
                    {x.label === "Folders" ? (
                      <Button
                        variant="contained"
                        color={
                          x.pathname === "Folders" ? "secondary" : "default"
                        }
                        style={{ width: "20px" }}
                        onClick={e => setFileAnchor(e.target)}
                      >
                        <ArrowDropDownIcon />
                      </Button>
                    ) : (
                      ""
                    )}
                  </ButtonGroup>
                  {x.label === "Folders" ? (
                    <PipelineDropdown
                      anchorEl={fileAnchor}
                      handleClose={() => setFileAnchor(null)}
                      dropdown={x.dropdown}
                    />
                  ) : (
                    ""
                  )}
                </Fragment>
              ))}
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Fragment>
  );
}
