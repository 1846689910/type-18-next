import React, { Fragment } from "react";
import { useRouter } from "next/router";
import Nav from "../../client/js/components/Nav";
import { Container, Grid } from "@material-ui/core";

const FolderId = () => {
  const router = useRouter();
  const { folderId } = router.query;
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <Grid container item xs={12} justify="center">
            <strong>This is folder page {folderId}</strong>
          </Grid>
          <Grid container item xs={12} justify="center"></Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};
export default FolderId;
