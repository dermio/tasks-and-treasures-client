import React from "react";
import { shallow, mount } from "enzyme";
import ShallowRenderer from 'react-test-renderer/shallow';

import { UserPrize } from "./userPrize";


describe("<UserPrize />", () => {
  it("Renders without crashing", () => {
    shallow(
      <UserPrize
        awardedPrizes={[]}

        /* Get TypeError: this.props.dispatch is not a function.
        Pass the component a key called `dispatch`, and the value
        is a function. */
        dispatch={(action) => {}}
      />
    );
  });

  it(`Clicking 'Create Prize' button calls onAddPrizeButtonClick(),
    and changes 'isAddPrizeFormVisible' state to true`,
    () => {
      const wrapper = shallow(
        <UserPrize
          awardedPrizes={[]}
          dispatch={(action) => {}}
        />
      );

      wrapper.instance().onAddPrizeButtonClick();
      wrapper.update();
      expect(wrapper.state("isAddPrizeFormVisible")).toEqual(true);
  });
});

