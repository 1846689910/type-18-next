import React, { useEffect, useState } from "react";

export const ParentComp = () => {
  const refChildComp2 = React.createRef();
  const refChildComp3 = React.createRef();
  const [showComp4, setShowComp4] = useState(true);
  useEffect(() => {
    if (refChildComp2) console.log(refChildComp2.current.innerHTML); // I am ChildComp2
  });
  return (
    <>
      <div>I am ParentComp</div>
      <ChildComp />
      <ChildComp2 ref={refChildComp2} />
      {/* <ChildComp3 ref={refChildComp3} /> */}
      {/* 直接将ref设置在component上，而该component又没有将ref forward到内部的dom，这种情况不再允许 */}
      <div>
        {showComp4 ? <ChildComp4 /> : ""}
        <button onClick={() => setShowComp4(!showComp4)}>{showComp4 ? "Hide" : "Show"}Comp4</button>
      </div>
      
    </>
  );
};

export const ChildComp = () => {
  const _ref = React.createRef();
  useEffect(() => {
    // Hook: useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined
    // by default it runs after each render
    if (_ref) console.log(_ref.current.children[0]); // the <span> element
  });
  return (
    <React.Fragment>
      <div>I am ChildComp</div>
      <div ref={_ref}>
        <span>a inner span</span>
      </div>
    </React.Fragment>
  );
};

export const ChildComp2 = React.forwardRef((props, ref) => {
  // forward the ref from parent component to dom element of child component

  return (
    <>
      <div ref={ref}>I am ChildComp2</div>
    </>
  );
});

export const ChildComp3 = () => (
  <div>
    <div>I am ChildComp3</div>
  </div>
);

export const ChildComp4 = () => {
  const [num, setNum] = useState(0);  // easy way to define and set a local state, `const [val, setter] = useState(initialValue)`
  useEffect(() => console.log("num changed, so I was called"), [num]);
  const [color, setColor] = useState("red");
  useEffect(() => console.log("color changed, so I was called"), [color]);
  useEffect(() => console.log("I was called when either num or color changed"), [num, color]);
  useEffect(() => console.log("I was called after each change"));
  useEffect(() => console.log("componentDidMount"), []);
  return <>
    <div>
      <span>the local variable num is {num}</span>
      <button onClick={() => setNum(num + 1)}>+</button>
      <button onClick={() => setNum(num - 1)}>-</button>
    </div>
    <div><p style={{color}} onClick={() => setColor(color === "red" ? "blue" : "red")}>I am {color}</p></div>
  </>;
};
