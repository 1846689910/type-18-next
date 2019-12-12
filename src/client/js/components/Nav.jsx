import React, { Fragment, useState } from "react";
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
  const router = useRouter();
  const handleClick = jobId => {
    handleClose();
    router.push(
      dropdown.pathname,
      dropdown.pathname.replace("[pipelineId]", 123).replace("[jobId]", jobId)
    );
  };
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      style={{ marginTop: "45px" }}
    >
      {dropdown.jobIds.map((x, i) => (
        <MenuItem key={i} onClick={() => handleClick(x)}>
          Job{x}
        </MenuItem>
      ))}
    </Menu>
  );
}

export default function Nav() {
  const classes = useStyles();
  const counter = useSelector(state => state.counter);
  const [jobAnchor, setJobAnchor] = useState(null);
  const tabs = [
    { pathname: "/", label: "Home" },
    { pathname: "/demo1", label: "Demo1" },
    {
      pathname: "/pipelines/[pipelineId]",
      label: "Pipelines",
      dropdown: {
        pathname: "/pipelines/[pipelineId]/jobs/[jobId]",
        jobIds: [123, 456, 789]
      }
    },
    { pathname: "/demo2/[counter]", label: "Demo2" }
  ];
  const router = useRouter();
  const handleClick = pathname => {
    let asString = pathname;
    if (pathname === "/pipelines/[pipelineId]") {
      asString = pathname.replace("[pipelineId]", 123);
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
                    {x.label === "Pipelines" ? (
                      <Button
                        variant="contained"
                        color={
                          x.pathname === "Pipelines" ? "secondary" : "default"
                        }
                        style={{ width: "20px" }}
                        onClick={e => setJobAnchor(e.target)}
                      >
                        <ArrowDropDownIcon />
                      </Button>
                    ) : (
                      ""
                    )}
                  </ButtonGroup>
                  {x.label === "Pipelines" ? (
                    <PipelineDropdown
                      anchorEl={jobAnchor}
                      handleClose={() => setJobAnchor(null)}
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
