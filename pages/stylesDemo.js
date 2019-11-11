import Link from "next/link";
import {
  DemoCss,
  DemoLess,
  DemoSass,
  // DemoStylus
} from "../src/client/components/Demo2";
const Styles = () => {
  return (
    <div>
      <div>
        <Link href="/">
          <button>Back to Index</button>
        </Link>
      </div>
      <DemoCss/>
      <DemoSass/>
      <DemoLess/>
      {/* <DemoStylus/> */}
    </div>
  );
};
export default Styles;