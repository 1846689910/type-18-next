import React, { useContext } from "react";
import css1 from "../../../styles/moduled/App.module.css";
import less1 from "../../../styles/moduled/App.module.less";
import scss1 from "../../../styles/moduled/App.module.scss";
import stylus1 from "../../../styles/moduled/App.module.styl";
import { Grid, styled } from "@material-ui/core";
import MediaQueryContext from "../MediaQueryContext";

const CenteredGrid: React.ComponentType<{item: boolean}> = styled(Grid)({
  textAlign: "center",
});

export default function ModuledStyleDemo() {
  const { isTablet, isMobile } = useContext(MediaQueryContext);
  const itemProps = isMobile ? { xs: 12 } : isTablet ? { xs: 6 } : {};
  return (
    <Grid container justify="space-evenly">
      <CenteredGrid item {...itemProps}>
        <strong className={css1.css}>CSS Module</strong>
        {" + "}
        <strong className="css">CSS</strong>
      </CenteredGrid>
      <CenteredGrid item {...itemProps}>
        <strong className={scss1.scss}>CSS Module</strong>
        {" + "}
        <strong className="scss">SCSS</strong>
      </CenteredGrid>
      <CenteredGrid item {...itemProps}>
        <strong className={less1.less}>CSS Module</strong>
        {" + "}
        <strong className="less">LESS</strong>
      </CenteredGrid>
      <CenteredGrid item {...itemProps}>
        <strong className={stylus1.stylus}>CSS Module</strong>
        {" + "}
        <strong className="stylus">STYLUS</strong>
      </CenteredGrid>
    </Grid>
  );
}
