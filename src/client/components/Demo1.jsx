import { useSelector, useDispatch } from "react-redux";
import { increase, decrease, delayIncrease } from "../settings/actions";
const Demo1 = () => {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>I am Dynamically loaded Component</h3>
      <div className="d-3">
        <div id="counter">{counter.value}</div>
        <div>
          <button onClick={() => dispatch(increase())}>increase</button>
          <button onClick={() => dispatch(decrease())}>decrease</button>
          <button onClick={() => dispatch(delayIncrease())}>delay increase</button>
        </div>
      </div>
      <style jsx>{`
        .d-3 {
          display: flex;
          flex-flow: column wrap;
        }
      `}</style>
    </div>
  );
};

export default Demo1;
