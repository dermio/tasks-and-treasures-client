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
            <UpdateTaskForm
              task={this.props.task}
              onTaskUpdated={() => this.setState({ isEditing: false })}
            /> :
            <span>
              {this.props.task.taskName}
              <button onClick={e => this.setState({ isEditing: true })}>
                Update Task
              </button>
            </span>
        }
        <button onClick={e => this.props.onDelete(e, this.props.task)} >
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