import Link from "next/link";
import { useRouter } from "next/router";
export default () => {
  const router = useRouter();
  const { name } = router.query;
  return (
    <div>
      <div>
        <Link href="/">
          <a>Index Page</a>
        </Link>
      </div>
      <p>I am about page</p>
      <p>The query name is {name}</p>
    </div>
  );
};
