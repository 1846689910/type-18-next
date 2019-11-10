import Link from "next/link";
import { useRouter } from "next/router";

const PipelineId = () => {
  const router = useRouter();
  const { pipelineId } = router.query;
  console.log(router);
  return (
    <div>
      <Link href="/">
        <button>Back to Index</button>
      </Link>
      <p>This is pipeline page {pipelineId}</p>
    </div>
  );
};
export default PipelineId;
