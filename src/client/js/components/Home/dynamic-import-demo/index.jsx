import React from "react";
import dynamic from "next/dynamic";
import { Typography } from "@material-ui/core";

const ReactSelectDemo = dynamic(
  () =>
    import("./ReactSelectDemo").then(({ ReactSelectDemo }) => ReactSelectDemo),
  {
    loading: () => (
      <Typography variant="h6">
        {"<ReactSelectDemo/>"} is loading ...
      </Typography>
    ),
  }
);
const ReactWindowDemo = dynamic(() => import("./ReactWindowDemo"), {
  loading: () => (
    <Typography variant="h6">{"<ReactWindowDemo/>"} is loading ...</Typography>
  ),
});

export default () => (
  <>
    <ReactSelectDemo />
    <ReactWindowDemo />
  </>
);
