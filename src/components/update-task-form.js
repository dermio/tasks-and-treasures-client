import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import { Field, reduxForm /*, focus */} from "redux-form";

import { updateTask } from "../actions/tasks";
import "./update-task-form.css";

export class UpdateTaskForm extends React.Component {
  onSubmit(values) {
    console.log(values);
    this.props.dispatch(updateTask({
      taskName: values.taskname,
      id: this.props.task.id,
      onTaskUpdated: this.props.onTaskUpdated
    }));
  }

  render() {
    return (
      <form
        onSubmit={
          this.props.handleSubmit(values => this.onSubmit(values))
        }
        className="update-task-form"
      >
        {/* <label htmlFor="taskname">Task Name</label> */}
        <Field
          component="input"
          type="text"
          name="taskname"
          id="taskname"
        />
        <div className="update-task-form-buttons">
          <button type="submit" className="submit-update-task-btn">
            Submit Update
          </button>
          <button type="button" onClick={this.props.onTaskUpdated}
            className="cancel-update-task-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

/* // old
const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    taskname: ownProps.task.taskName
  }
});

export default reduxForm({
  form: "updateTask"
}, mapStateToProps)(UpdateTaskForm); */


/* // jshin
export default compose( connect((state, props) => ({ initialValues: {
  taskname: props.task.taskName
} })), reduxForm({ form: "updateTask" }) )(UpdateTaskForm); */



export default compose(
  // mapStateToProps is argument for connect
  connect((state, props) => ({
    initialValues: { taskname: props.task.taskName }
  })),
  reduxForm({ form: "updateTask" })
)(UpdateTaskForm);
