import React from "react";
import { shallow, mount } from "enzyme";

import { Provider } from "react-redux";

import { UserTasksList } from "./userTasksList";

import { finalizeTasksList } from "../actions/family";

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
      dispatch: jest.fn()
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

  it("Dispatches `finalizeTasksList` from `onFinalizeTasksList`", () => {
    const store = {
      getState: () => ({
        auth: {
          currentUser: {
            role: "parent"
          }
        }
      }),
      subscribe: () => {},
      dispatch: jest.fn()
    };

    // Test if correct actions dispatched with Redux, using a spy
    const finalizeFunctionResult = finalizeTasksList();
    const finalizeFunction = () => { return finalizeFunctionResult; };
    const wrapper = shallow(
      <UserTasksList
        userTasks={[]}
        dispatch={store.dispatch}
        onFinalizeTasksListFunction={finalizeFunction}
      />
    );
    const instance = wrapper.instance();
    instance.onFinalizeTasksList();


    expect(store.dispatch).toHaveBeenCalledWith(finalizeFunctionResult);

    // console.log("[[[ DISPATCH finalizetaskslist ]]]", it);
  });
});


/* Ray says, Wrap the userTasks List, in the Higher order componenet. */

