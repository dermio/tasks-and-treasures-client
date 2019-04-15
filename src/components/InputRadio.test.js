import React from "react";
import { shallow, mount } from "enzyme";

import InputRadio from "./InputRadio";


describe("<InputRadio />", () => {
  it("Renders without crashing", () => {
    shallow(
      <InputRadio
        input={{}}
      />
    );

    // let wrapper = shallow(<InputRadio />);
    // expect(wrapper.hasClass("form-input-radio")).toEqual(true);
  });

  /*
  Incomplete, need to test:
  1 ref input
  2 componentDidUpdate, prevProps.meta and props.meta
  */
});



/*
Import no bracket:
TypeError: Cannot read property 'name' of undefined


Import with bracket
TypeError: Cannot read property 'prototype' of undefined

Warning: React.createElement: type is invalid -- expected a string
(for built-in components) or a class/function (for composite components)
but got: undefined. You likely forgot to export your component
from the file it's defined in, or you might have mixed up default
and named imports.
*/
