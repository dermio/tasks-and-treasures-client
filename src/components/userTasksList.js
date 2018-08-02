import React from "react";
import { connect } from "react-redux";

import "./userTasksList.css";

import { fetchTasks, createTask } from "../actions/tasks";

export class UserTasksList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchTasks("mariobros"));

    // The following 2 lines of code allow dispatching from browser console
    // Eventually move this code to actions/tasks.js and create-task-form.js
    window.dispatch = this.props.dispatch;
    window.createTask = createTask;

    /*
    Run this command with above 2 lines of code to dispatch in browser console
    dispatch(createTask({familyCode: "mariobros", taskName: "CLEAN THE CAR"}))
    */
  }

  render() {
    let tasks = this.props.userTasks.map((task, index) =>
      <li key={index}>
        {task.taskName}
      </li>
    );

    return (
      <div className="userTasksList">
        <ul className="userTasksList-UL">
          {tasks}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userTasks: state.tasks.allUserTasks
});

export default connect(mapStateToProps)(UserTasksList);
