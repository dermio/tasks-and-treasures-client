import React from "react";
import { Field, reduxForm /*, focus */} from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// import { required, nonEmpty } from "../validators";

/* Import Create Task action to dispatch create new task
inside onSubmit method */
import { createTask } from "../actions/tasks";

import "./create-task-form.css";

export class CreateTaskForm extends React.Component {
  //Method to handle submitting new Task
  onSubmit(values) {
    this.props.dispatch(createTask({
      taskName: values.taskname,
      onTaskCreated: this.props.onTaskCreated
    }));
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <form
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        className="create-task-form"
      >
        <label htmlFor="taskname">Task Name</label>
        <Field
          component="input"
          type="text"
          name="taskname"
          id="taskname"
        />
        <div className="create-task-form-buttons">
          <button type="submit" className="submit-create-task-btn">
            Submit Task
          </button>
          <button type="button" onClick={this.props.onTaskCreated}
            className="cancel-create-task-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    )
  }
}


const mapStateToProps = state => ({
  isLoggedIn: !!state.auth.currentUser
  // isLoggedIn: state.auth.currentUser !== null
});

const ConnectedCreateTaskForm = connect(mapStateToProps)(CreateTaskForm);

export default reduxForm({
  form: "createTask",
  //onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(ConnectedCreateTaskForm);
