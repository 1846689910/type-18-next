import _css from "../styles/style.css";
import _sass from "../styles/style.scss";
import _less from "../styles/style.less";
import _stylus from "../styles/style.styl";

export const DemoCss = () => (
  <div className={_css.message}>This is demo for CSS</div>
);

export const DemoSass = () => (
  <div className={_sass.message}>This is demo for SASS</div>
);

export const DemoLess = () => (
  <div className={_less.message}>This is demo for LESS</div>
);

export const DemoStylus = () => (
  <div className={_stylus.message}>This is demo for STYLUS</div>
);
