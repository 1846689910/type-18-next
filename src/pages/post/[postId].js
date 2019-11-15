import Link from "next/link";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";
const Post = () => {
  const router = useRouter();
  const { postId: slug } = router.query;
  return (
    <div>
      <div>
        <Link href="/">
          <button>index page</button>
        </Link>
      </div>
      My Slug is {slug}
    </div>
  );
};
Post.getInitialProps = async context => {
  const { postId: id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};
export default Post;
