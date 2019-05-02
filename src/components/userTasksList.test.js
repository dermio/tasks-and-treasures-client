import React from "react";
import { shallow, mount } from "enzyme";

import { Provider } from "react-redux";

import { UserTasksList } from "./userTasksList";



describe("<UserTasksList />", () => {
  it("Renders without crashing", () => {
    shallow(
      <UserTasksList
        userTasks={[]}
        dispatch={() => {}}
      />
    );
  });


  it("When `Create Task` button is clicked, CreateTaskForm is visible", () => {
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
        <UserTasksList
          userTasks={[]}
          loggedInUser={"random"}
          submittedForReview={false}
          prize={null}
          dispatch={store.dispatch}
        />
      </Provider>
    );

    // Action click
    // Look for `form.create-task-form` if renders on button click
    wrapper.find("button.create-task-btn").simulate("click");
    expect(wrapper.find("form.create-task-form").length).toEqual(1)
  });
});


/* Ray says, Wrap the userTasks List, in the Higher order componenet. */

