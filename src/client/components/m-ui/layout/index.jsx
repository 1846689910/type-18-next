import { Fragment } from "react";
import { BasicGrid, FullWidthGrid, NestedGrid, AutoGridNoWrap, Interative } from "./Grid";
import { Divider } from "@material-ui/core";

export default () => (
  <Fragment>
    <BasicGrid />
    <Divider />
    <FullWidthGrid />
    <NestedGrid />
    <AutoGridNoWrap/>
    <Interative/>
  </Fragment>
);
