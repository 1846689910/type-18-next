import { withRouter } from "next/router";
const StateId = ({ router }) => {
  console.log(router.query);
  const { pipelineId, stateId } = router.query;
  return (
    <div>
      <div>
        <button
          onClick={() =>
            router.push({
              pathname: "/"
            })
          }
        >
          Back to Index
        </button>
      </div>
      <p>I am /pipelines/{pipelineId}/states/{stateId}</p>
    </div>
  );
};

export default withRouter(StateId);
