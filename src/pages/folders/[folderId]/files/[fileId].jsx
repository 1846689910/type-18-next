import { Fragment } from "react";
import { withRouter } from "next/router";
import Nav from "../../../../client/js/components/Nav";
import { Container, Grid } from "@material-ui/core";

const FileId = ({ router }) => {
  const { folderId, fileId } = router.query;
  console.log(router);
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <Grid container item xs={12} justify="center">
            This is file page folder {folderId} file {fileId}
          </Grid>
          <Grid container item xs={12} justify="center"></Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default withRouter(FileId);
