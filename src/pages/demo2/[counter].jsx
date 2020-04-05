import React, { Fragment } from "react";
import { Container, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import Nav from "../../client/js/components/Nav";

export default function Demo2() {
  const router = useRouter();
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <Grid container item xs={12} justify="center">
            <strong>I am {router.asPath}</strong>
          </Grid>
          <Grid container item xs={12} justify="center"></Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
