import React from "react";

import UpdateTaskForm from "./update-task-form";
import ConnectedShowIfRoleIs from "./ShowIfRoleIs";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingTask: false
    };
  }

  render() {
    return (
      <li>
        {this.state.isEditingTask ? (
          <ConnectedShowIfRoleIs userRole="parent">
            <React.Fragment>
              <UpdateTaskForm
                task={this.props.task}
                onTaskUpdated={() => this.setState({ isEditingTask: false })}
                form={`updateForm[${this.props.task.id}]`}
              />
            </React.Fragment>
          </ConnectedShowIfRoleIs>
        ) : (
          <span>
            {this.props.task.taskName}
            <ConnectedShowIfRoleIs userRole="parent">
              <React.Fragment>
                <button onClick={e => this.setState({ isEditingTask: true })}>
                  Update Task
                </button>
              </React.Fragment>
            </ConnectedShowIfRoleIs>
          </span>
        )}
        <ConnectedShowIfRoleIs userRole="parent">
          <React.Fragment>
            <button onClick={e => this.props.onDelete(e, this.props.task)}>
              Delete Task
            </button>
          </React.Fragment>
        </ConnectedShowIfRoleIs>

        <ConnectedShowIfRoleIs userRole="child">
          <React.Fragment>
            <input
              name="completedTask"
              type="checkbox"
              checked={!!this.props.task.completedDate}
              onChange={this.props.onChecked}
            />
          </React.Fragment>
        </ConnectedShowIfRoleIs>
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
