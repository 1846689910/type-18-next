import * as React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import { spy } from "sinon";
import Foo from "./resources/Foo";
import { Typography } from "@material-ui/core";

spy(Foo.prototype, "componentDidMount");

describe("<Foo />", () => {
  it("calls componentDidMount", () => {
    const wrapper = mount(<Foo/>);
    expect(wrapper.contains(<span>Hello World</span>)).to.equal(true);
    expect(
      wrapper.contains(
        <Typography>
          <span>Hello World</span>
        </Typography>
      )
    ).to.equal(true);
    expect(Foo.prototype.componentDidMount).to.have.property("callCount", 1);
  });
});
