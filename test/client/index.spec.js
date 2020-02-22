import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import { spy } from "sinon";
import Foo from "./resources/Foo";

spy(Foo.prototype, "componentDidMount");

describe("<Foo />", () => {
  it("calls componentDidMount", () => {
    const wrapper = mount(<Foo />);
    expect(wrapper.contains(<span>Hello World</span>)).to.equal(true);
    expect(Foo.prototype.componentDidMount).to.have.property("callCount", 1);
  });
});
