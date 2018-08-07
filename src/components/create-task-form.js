import React from "react";
import { Field, reduxForm /*, focus */} from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// import { required, nonEmpty } from "../validators";

/* Import Create Task action to dispatch create new task
inside onSubmit method */

export class CreateTaskForm extends React.Component {
  // Method to handle submitting new Task
  // onSubmit(values) {
  //   let { username, password } = values;
  //   return this.props.dispatch(login(username, password));
  // }

  // <form> needs onSubmit event handler for creating new Task
  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <form>
        <label htmlFor="taskname">Task Name</label>
        <Field
          component="input"
          type="text"
          name="taskname"
          id="taskname"
        />
        <button>Create Task</button>
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
