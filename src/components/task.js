import React from "react";

import UpdateTaskForm from "./update-task-form";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false // span?
    };
  }

  render() {
    return (
      <li>
        {/* {
          this.state.isEditing ?
          <input /> :
          this.props.task.taskName
        } */}
        {
          this.state.isEditing ?
          <UpdateTaskForm /> :
          this.props.task.taskName
        }
        <button onClick={(e) =>{this.props.onUpdate(e, this.props.task)}}>
          Update Task
        </button>
        <button onClick={(e) =>{this.props.onDelete(e, this.props.task)}}>
          Delete Task
        </button>
      </li>
    );
  }
}


/*
<li>
  {this.state.isEditing ? <input /> : this.props.task.taskName}
  <button onClick={(e) =>{this.props.onUpdate(e, this.props.task)}}>
    Update Task
  </button>
  <button onClick={(e) =>{this.props.onDelete(e, this.props.task)}}>
    Delete Task
  </button>
</li>
*/