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
        <div className={css1.css}>CSS Module + CSS</div>
      </Grid>
      <Grid item>
        <div className={scss1.scss}>CSS Module + SCSS</div>
      </Grid>
      <Grid item>
        <div className={less1.less}>CSS Module + LESS</div>
      </Grid>
      <Grid item>
        <div className={stylus1.stylus}>CSS Module + STYLUS</div>
      </Grid>
    </Grid>
  );
}
