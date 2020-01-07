import React from "react";
import "../../styles/App.scss";
import "../../styles/App.css";
import "../../styles/App.less";
import "../../styles/App.styl";
import css1 from "../../styles/moduled/App.module.css";
import less1 from "../../styles/moduled/App.module.less";
import scss1 from "../../styles/moduled/App.module.scss";
import stylus1 from "../../styles/moduled/App.module.styl";
import { Grid } from "@material-ui/core";

export default function ModuledStyleDemo() {
  return (
    <Grid container justify="space-evenly">
      <Grid item>
        <strong className={css1.css}>CSS Module + CSS</strong>
      </Grid>
      <Grid item>
        <strong className={scss1.scss}>CSS Module + SCSS</strong>
      </Grid>
      <Grid item>
        <strong className={less1.less}>CSS Module + LESS</strong>
      </Grid>
      <Grid item>
        <strong className={stylus1.stylus}>CSS Module + STYLUS</strong>
      </Grid>
    </Grid>
  );
}
