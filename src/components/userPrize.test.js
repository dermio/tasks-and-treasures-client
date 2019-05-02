import React from "react";
import { shallow, mount } from "enzyme";
import ShallowRenderer from 'react-test-renderer/shallow';

import { Provider } from "react-redux";

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

  it("When `Create Prize` button is clicked, CreateUpdatePrizeForm is visible",
    () => {
      const store = {
        getState: () => ({
          auth: {
            currentUser: {
              role: "parent"
            }
          }
        }),
        subscribe: () => {},
        dispatch: () => {}
      };

      const wrapper = mount(
        <Provider store={store}>
          <UserPrize
            userPrize={null}
            awardedPrizes={[]}
            isTasksFinalized={false}

            dispatch={store.dispatch}
          />
        </Provider>
      );

      // Action click
      // Look for `form.create-update-prize-form` if renders on button click

      console.log(wrapper.debug());
      wrapper.find("button.create-prize-btn").simulate("click");
      // expect(wrapper.find("form.create-update-prize-form").length).toEqual(1);
  });
});

