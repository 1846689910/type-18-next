import React from "react";
import Link from "next/link";

const MyButton = React.forwardRef(({ href, onClick }, ref) => (
  <button href={href} onClick={onClick} ref={ref}>
    Click me
  </button>
));

export default () => {
  return (
    <Link href="/about">
      <MyButton />
    </Link>
  );
};
