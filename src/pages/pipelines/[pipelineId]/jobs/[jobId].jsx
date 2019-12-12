import { Fragment } from "react";
import { withRouter } from "next/router";
import Nav from "../../../../client/js/components/Nav";
import { Container, Grid } from "@material-ui/core";

const JobId = ({ router }) => {
  const { pipelineId, jobId } = router.query;
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <Grid container item xs={12} justify="center">
            This is job page pipeline {pipelineId} job {jobId}
          </Grid>
          <Grid container item xs={12} justify="center"></Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default withRouter(JobId);
