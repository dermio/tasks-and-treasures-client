import React from "react";
import { connect } from "react-redux";

import UpdateTaskForm from "./update-task-form";
import ConnectedShowIfRoleIs from "./ShowIfRoleIs";
import { setEditingTask } from '../actions/tasks';

import "./task.css";

export class Task extends React.Component {
  render() {
    return (
      <li className="task-list">
        {this.props.isEditingTask ? (
          <ConnectedShowIfRoleIs userRole="parent">
            <React.Fragment>
              {!this.props.isTasksFinalized &&
                <UpdateTaskForm
                  task={this.props.task}
                  onTaskUpdated={() => this.props.dispatch(setEditingTask(this.props.task.id, false))}
                  form={`updateForm[${this.props.task.id}]`}
                />
              }
            </React.Fragment>
          </ConnectedShowIfRoleIs>
        ) : (
          <ConnectedShowIfRoleIs userRole="parent">
            <React.Fragment>
              <span>
                {this.props.task.taskName}
              </span>
              <div className="update-task-btn">
                {!this.props.isTasksFinalized &&
                  <button onClick={e => this.props.dispatch(setEditingTask(this.props.task.id, true))}>
                    Update Task
                  </button>
                }
              </div>
            </React.Fragment>
          </ConnectedShowIfRoleIs>
        )}
        <ConnectedShowIfRoleIs userRole="parent">
          <div className="delete-task-btn">
            {!this.props.isTasksFinalized &&
              <button onClick={e => this.props.onDelete(e, this.props.task)}>
                Delete Task
              </button>
            }
          </div>
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
            <span className="childCheckList">{this.props.task.taskName}</span>
          </React.Fragment>
        </ConnectedShowIfRoleIs>
      </li>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isTasksFinalized: state.family.tasksFinalized,

  // one obj task, ownProps is the prop passed down to Task
  // ownProps.task.id
  isEditingTask: !!state.tasks.tasksBeingEdited[ownProps.task.id] // boolean
});

export default connect(mapStateToProps)(Task);



/*
<span>
  {this.props.task.taskName}
  <ConnectedShowIfRoleIs userRole="parent">
    <React.Fragment>
      {!this.props.isTasksFinalized &&
        <button onClick={e => this.props.dispatch(setEditingTask(this.props.task.id, true))}>
          Update Task
        </button>
      }
    </React.Fragment>
  </ConnectedShowIfRoleIs>
</span>
*/
