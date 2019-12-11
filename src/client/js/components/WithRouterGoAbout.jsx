import { withRouter } from "next/router";

const WithRouterGoAbout = ({ router }) => {
  console.log(`current pathname is ${router.pathname}`);
  const handler = () => {
    router.push({
      pathname: "/about",
      query: { name: "with router go about" }
    });
  };
  return <button onClick={handler}>WithRouterGoAbout</button>;
};

export default withRouter(WithRouterGoAbout);
