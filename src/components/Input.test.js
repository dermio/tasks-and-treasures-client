import React from "react";
import { shallow } from "enzyme";

import Input from "./Input";


describe("<Input />", () => {
  it("Renders without crashing", () => {
    shallow(
      <Input
        meta={{}}
        input={{}}
      />
    );
  });


  /* Test is WRONG!, I want to test for <div> .form-error and .form-warning */
  it("Renders an error within the form",  () => {
    const wrapper = shallow(
      <Input
        meta={{
          touched: true, // How to pass props?
          error: true // How to pass props?
        }}
        input={{}}
      />
    );

    expect(
      wrapper.contains(<div className="form-warning"></div>)
    );
  });
});


/*
Any prop that renders in the component, need to be passed to the component
during the test to prevent test failure.

For example, <Input /> is passed two properties, `props.meta`
and `props.input`. `meta` and `input` are the key names, and their respective
values are assigned objects.
In `props.meta.touched` and `props.meta.warning`,
`touched` and `warning` are keys in the object `props.meta`.
In `props.input.name`, `name` is a key in the `props.input` object.
*/


/*
No brackets on import
TypeError: Cannot read property 'touched' of undefined


With bracket on import
TypeError: Cannot read property 'pathname' of undefined

Warning: React.createElement: type is invalid -- expected a string
(for built-in components) or a class/function (for composite components)
but got: undefined. You likely forgot to export your component
from the file it's defined in, or you might have mixed up default
and named imports.
*/
