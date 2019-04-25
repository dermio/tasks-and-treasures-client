import React from "react";
import { shallow, mount } from "enzyme";

import { UserTasksList } from "./userTasksList";

import ShowIfRoleIs from "./ShowIfRoleIs";


describe("<UserTasksList />", () => {
  it("Renders without crashing", () => {
    shallow(
      <UserTasksList
        userTasks={[]}
        dispatch={() => {}}
      />
    );
  });


  // it("ShowIfRoleIs wrapper", () => {

  //   const WrapperShowIfRoleIs = mount(
  //     <ShowIfRoleIs
  //       userRole="parent"
  //     />
  //   );

  //   // wrapper.debug()

  //   const wrapper = shallow(
  //     <UserTasksList
  //       userTasks={[]}
  //       dispatch={() => {}}
  //     />
  //   );

  //   console.log("Wrapper.Debug", wrapper.debug())
  // });
});


/* Ray says, Wrap the userTasks List, in the Higher order componenet. */

