import React from "react";
import { connect } from "react-redux";

import Task from "./task";
import "./userTasksList.css";

import {
  getTasks, deleteTask, updateTask,
  changeTaskCompletion, notifyParentTasksReadyForReview
} from "../actions/tasks";
import ConnectedShowIfRoleIs from "./ShowIfRoleIs";

export class UserTasksList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getTasks());

    window.updateTask = updateTask;
  }

  onDelete = (event, task) => {
    event.preventDefault();
    this.props.dispatch(deleteTask(task.id));
  }

  onChangeCompleted = (event, task) => {
    event.preventDefault();
    console.log("click CHECKED task button");
    this.props.dispatch(changeTaskCompletion({
      id: task.id,
      completed: !task.completedDate
    }));
  }

  onSubmitForApproval = (event) => {
    event.preventDefault();
    this.props.dispatch(notifyParentTasksReadyForReview());
  };

  render() {
    let tasks = this.props.userTasks.map((task, index) =>
      // <li key={index}>
      //   {task.taskName}
      //   <button onClick={(e) =>{this.onDelete(e, task)}}>
      //     Delete Task
      //   </button>
      //   <button onClick={(e) =>{this.onUpdate(e, task)}}>
      //     Update Task
      //   </button>
      // </li>
      <Task
        key={index}
        task={task}
        onDelete={(e) =>{this.onDelete(e, task)}}
        onChecked={(e) => {this.onChangeCompleted(e, task)}}
      />
    );

    return (
      <div className="userTasksList">
        <ul className="userTasksList-UL">
          {tasks}
        </ul>

        <ConnectedShowIfRoleIs userRole="child">
          <React.Fragment>
            <button
              disabled={this.props.userTasks.some(task => !task.completedDate)}
              onClick={this.onSubmitForApproval}
            >
              Notify Parent tasks are done
            </button>
          </React.Fragment>
        </ConnectedShowIfRoleIs>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userTasks: state.tasks.allUserTasks
});

export default connect(mapStateToProps)(UserTasksList);
