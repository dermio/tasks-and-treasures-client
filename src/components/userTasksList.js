import React from "react";
import { connect } from "react-redux";

import "./userTasksList.css";

import { getTasks, deleteTask } from "../actions/tasks";

export class UserTasksList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getTasks());
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
