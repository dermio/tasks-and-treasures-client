import React from "react";
import { shallow, mount } from "enzyme";

import { Task } from "./task";

describe("</Task >", () => {
  it("Renders without crashing", () => {
    shallow(
      <Task
        task={{
          completions: []
        }}
      />
    );
  });

  /* What else to test in the Task component?
  1 Has UpdateTaskForm
  2 buttons
  3 input
  */
});


/*
this.props is the object passed to <Task />
this.props.task, task is the prop passed to <Task task={{...}} />,
  task is they key, the value is an object
this.props.task.completions, completions is a key on the task prop object
  <Task task={{completions: []}} />, completions is the key, value is an array.
  completions has an array value because the find() method is chained after it.
*/

