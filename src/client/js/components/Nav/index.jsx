import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Container, Grid, AppBar, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import Title from "./Title";
import TabButton from "./TabButton";
import TabButtonGroup from "./TabButtonGroup";
import ForNextJsCustomHead from "./ForNextJsCustomHead";

const useStyles = makeStyles({
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
  }
});

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
      <Title classes={classes} />
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
                  <TabBtn
                    route={x}
                    key={i}
                    handleClick={tabButtonClick}
                    classes={classes}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Fragment>
  );
}
