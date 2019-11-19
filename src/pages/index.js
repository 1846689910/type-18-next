import { connect } from "react-redux";
import MyLayout from "../client/components/MyLayout";
import fetch from "isomorphic-unfetch";
import Markdown from "react-markdown";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ParentComp } from "../client/components/Demo3";
import Promise from "bluebird";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";

const Index = props => {
  const { shows, url } = props;
  console.log(shows);
  const router = useRouter();
  console.log(router); // pathname
  const DemoDynamic = dynamic(() => import("../client/components/Demo1"));
  return (
    <Container maxWidth="md">
      <Box m={4}>
        <MyLayout>
          <p>I am index page</p>
          <DemoDynamic />
          <ParentComp />
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
      </Box>
    </Container>
  );
};
Index.getInitialProps = async function(context) {
  console.log(context);
  const res = Promise.delay(200).return([
    { show: 1 },
    { show: 2 },
    { show: 3 }
  ]);
  const data = await res;

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};
export default connect()(Index);
