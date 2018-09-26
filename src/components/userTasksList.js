import React from "react";
import { connect } from "react-redux";

import Task from "./task";
import "./userTasksList.css";

import { getTasks, deleteTask, updateTask, changeTaskCompletion } from "../actions/tasks";

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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userTasks: state.tasks.allUserTasks
});

export default connect(mapStateToProps)(UserTasksList);
