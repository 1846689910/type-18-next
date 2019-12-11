import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Grid,
  AppBar,
  Tabs,
  Tab,
  makeStyles,
  styled,
  Typography
} from "@material-ui/core";
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
export const MyTab = styled(Tab)({
  textTransform: "none",
  color: "white",
  fontWeight: "bold",
  fontSize: "15px"
});

export default function Nav() {
  const classes = useStyles();
  const counter = useSelector(state => state.counter);
  const tabs = [
    { pathname: "/", label: "Home" },
    { pathname: "/demo1", label: "Demo1" },
    { pathname: "/pipelines/[pipelineId]", label: "Pipelines" },
    { pathname: "/demo2/[counter]", label: "Demo2" }
  ];
  const router = useRouter();
  const [value, setValue] = useState(router.pathname);
  const handleChange = (event, newValue) => {
    const pathname = newValue;
    let asString = pathname;
    if (pathname === "/pipelines/[pipelineId]") {
      asString = pathname.replace("[pipelineId]", 123);
    } else if (pathname === "/demo2/[counter]") {
      asString = pathname.replace("[counter]", counter.value);
    }
    setValue(pathname);
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
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          centered
        >
          {
            tabs.map((x, i) => <MyTab label={x.label} value={x.pathname} key={i} />)
          }
        </Tabs>
      </AppBar>
    </Fragment>
  );
}
