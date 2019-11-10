import { connect } from "react-redux";
import MyLayout from "../client/components/MyLayout";
import fetch from "isomorphic-unfetch";
import Markdown from "react-markdown";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Index = props => {
  const { shows, url } = props;
  console.log(shows);
  const router = useRouter();
  console.log(router);  // pathname
  const DemoDynamic = dynamic(() => import("../client/components/Demo1"));
  return (
    <MyLayout>
      <p>I am index page</p>
      <DemoDynamic />
      <div>
        <Markdown
          source={`
This is our blog post.
Yes. We can have a [link](/about).
And we can have a title as well.

### This is a title

And here's the content.
      `}
        />
      </div>
      <style jsx>{`
        p {
          color: red;
        }
      `}</style>
      <style jsx global>{`
        .markdown {
          font-family: "Arial";
        }
        .markdown a {
          text-decoration: none;
          color: blue;
        }
        .markdown a:hover {
          opacity: 0.6;
        }
        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
      `}</style>
    </MyLayout>
  );
};
Index.getInitialProps = async function(context) {
  console.log(context);
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};
export default connect()(Index);
