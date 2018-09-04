import React from "react";
import { Field, reduxForm /*, focus */} from "redux-form";

export class UpdateTaskForm extends React.Component {

  render() {
    <form>
      <label htmlFor="taskname">Task Name</label>
      <Field
        component="input"
        type="text"
        name="taskname"
        id="taskname"
      />
      <button type="Submit Task">Submit Task</button>
    </form>
  }
}