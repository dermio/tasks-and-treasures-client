import React from "react";
import { connect } from "react-redux";

import "./userTasksList.css";

import { getTasks, createTask, deleteTask } from "../actions/tasks";

export class UserTasksList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getTasks("mariobros"));

    // The following 2 lines of code allow dispatching from browser console
    // Eventually move this code to actions/tasks.js and create-task-form.js
    window.dispatch = this.props.dispatch;
    window.createTask = createTask;

    /*
    Run this command with above 2 lines of code to dispatch in browser console
    dispatch(createTask({familyCode: "mariobros", taskName: "CLEAN THE CAR"}))
    */
  }

  onDelete = (event, task) => {
    event.preventDefault();
    this.props.dispatch(deleteTask(task.id));
  }

  render() {
    let tasks = this.props.userTasks.map((task, index) =>
      <li key={index}>
        {task.taskName}
        <button onClick={(e) =>{this.onDelete(e, task)}}>
          Delete Task
        </button>
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
