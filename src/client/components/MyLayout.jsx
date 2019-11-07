import Link from "next/link";
import MyButton from "./MyButton";
import UseObjGoAbout from "./UseObjGoAbout";
import WithRouterGoAbout from "./WithRouterGoAbout";
import Router from "next/router";

let i = 0;
Router.events.on("routeChangeStart", url => {
  console.log(`router starts routing to ${url}`);
});

export const Header = () => {
  i++;
  return (
    <div>
      <img src="/electrode.png" alt="electrode"/>
      <Link href="/about">
        <button title="About Page">About Page</button>
      </Link>
      <Link href="/about">
        <span>I am span to About</span>
      </Link>
      <MyButton />
      <UseObjGoAbout />
      <WithRouterGoAbout />
      <Link href={`/post/[postId]`} as={`/post/${i}`}>
        <button>post page</button>
      </Link>
      {
      /**
      * However, if a query and route param name are the same, route parameters will override the matching query params.
      * For example, /post/abc?pid=bcd will have the query object: { pid: 'abc' }.
      */
      }
      {"  "}
      <span>
        Click{" "}
        <Link href={{ pathname: "/about", query: { name: "Zeit" } }}>
          <a>here</a>
        </Link>{" "}
        to read more
      </span>
      {"  "}
      <Link href="/secondary/my-greeting"><a>to greeting</a></Link>
      <Link href="/pipelines/[pipelineId]" as="/pipelines/abc"><button>Pipelines</button></Link>
      <Link href="/pipelines/[pipelineId]/states/[stateId]" as="/pipelines/123/states/456"><button>States</button></Link>
    </div>
  );
};

const MyLayout = props => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};
export default MyLayout;