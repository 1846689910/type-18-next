import { useRouter } from "next/router";
import Nav from "../../client/js/components/Nav";
import { Container, Grid } from "@material-ui/core";


const PipelineId = () => {
  const router = useRouter();
  const { pipelineId } = router.query;
  return (
    <div>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <Grid container item xs={12} justify="center">
            This is pipeline page {pipelineId}
          </Grid>
          <Grid container item xs={12} justify="center"></Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default PipelineId;
