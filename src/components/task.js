import React from "react";
import { connect } from "react-redux";

import UpdateTaskForm from "./update-task-form";
import ConnectedShowIfRoleIs from "./ShowIfRoleIs";

export class Task extends React.Component {
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
              {!this.props.isTasksFinalized &&
                <UpdateTaskForm
                  task={this.props.task}
                  onTaskUpdated={() => this.setState({ isEditingTask: false })}
                  form={`updateForm[${this.props.task.id}]`}
                />
              }
            </React.Fragment>
          </ConnectedShowIfRoleIs>
        ) : (
          <span>
            {this.props.task.taskName}
            <ConnectedShowIfRoleIs userRole="parent">
              <React.Fragment>
                {!this.props.isTasksFinalized &&
                  <button onClick={e => this.setState({ isEditingTask: true })}>
                    Update Task
                  </button>
                }
              </React.Fragment>
            </ConnectedShowIfRoleIs>
          </span>
        )}
        <ConnectedShowIfRoleIs userRole="parent">
          <React.Fragment>
            {!this.props.isTasksFinalized &&
              <button onClick={e => this.props.onDelete(e, this.props.task)}>
                Delete Task
              </button>
            }
          </React.Fragment>
        </ConnectedShowIfRoleIs>

        <ConnectedShowIfRoleIs userRole="child">
          <React.Fragment>
            <input
              name="completedTask"
              type="checkbox"
              checked={
                !!this.props.task.completions.find(completion =>
                  completion.completedByUser === this.props.loggedInUser
                )
              }
              onChange={this.props.onChecked}
            />
          </React.Fragment>
        </ConnectedShowIfRoleIs>
      </li>
    );
  }
}

const mapStateToProps = state => ({
  isTasksFinalized: state.family.tasksFinalized
});

export default connect(mapStateToProps)(Task);
