import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
export default () => {
  const router = useRouter();
  const { name } = router.query;
  const counter = useSelector(state => state.counter);
  return (
    <div>
      <div>
        <Link href="/">
          <a>Index Page</a>
        </Link>
      </div>
      <p>I am about page, counter: {counter.value}</p>
      <p>The query name is {name}</p>
    </div>
  );
};
