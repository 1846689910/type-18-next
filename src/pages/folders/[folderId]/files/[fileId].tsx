import React, { Fragment } from "react";
import { withRouter } from "next/router";
import Nav from "../../../../client/js/components/Nav";
import { Container, Grid } from "@material-ui/core";
import { WithRouterProps } from "next/dist/client/with-router";

const FileId = ({ router }: WithRouterProps) => {
  const { folderId, fileId } = router.query;
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <Grid container item xs={12} justify="center">
            <strong>This is file page folder {folderId} file {fileId}</strong>
          </Grid>
          <Grid container item xs={12} justify="center"></Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};
export default withRouter(FileId);
