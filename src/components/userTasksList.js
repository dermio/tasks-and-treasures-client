import React from "react";
import { connect } from "react-redux";

import Task from "./task";
import "./userTasksList.css";

import { getTasks, deleteTask, updateTask } from "../actions/tasks";

export class UserTasksList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getTasks());
  }

  onDelete = (event, task) => {
    event.preventDefault();
    this.props.dispatch(deleteTask(task.id));
  }

  onUpdate = (event, task) => {
    event.preventDefault();
    console.log("click UPDATE task button");
    this.props.dispatch(updateTask(task.id, task.taskName));
  }

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
        onUpdate={(e) =>{this.onUpdate(e, task)}}
      />
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
