import React from "react";

import UpdateTaskForm from "./update-task-form";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingTask: false // span?
    };
  }

  render() {
    return (
      <li>
        {/* {
          this.state.isEditingTask ?
          <input /> :
          this.props.task.taskName
        } */}
        {
          this.state.isEditingTask ?
            <UpdateTaskForm
              task={this.props.task}
              onTaskUpdated={() => this.setState({ isEditingTask: false })}
              form={`updateForm[${this.props.task.id}]`}
            /> :
            <span>
              {this.props.task.taskName}
              <button onClick={e => this.setState({ isEditingTask: true })}>
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
  {this.state.isEditingTask ? <input /> : this.props.task.taskName}
  <button onClick={(e) =>{this.props.onUpdate(e, this.props.task)}}>
    Update Task
  </button>
  <button onClick={(e) =>{this.props.onDelete(e, this.props.task)}}>
    Delete Task
  </button>
</li>
*/