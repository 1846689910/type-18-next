import React from "react";
import { Container, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import Nav from "../../client/js/components/Nav";

export default function Demo2() {
  const router = useRouter();
  return (
    <>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <Grid container item xs={12} justify="center">
            I am {router.asPath}
          </Grid>
          <Grid container item xs={12} justify="center"></Grid>
        </Grid>
      </Container>
    </>
  );
}
