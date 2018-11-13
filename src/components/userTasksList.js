import React from "react";
import { connect } from "react-redux";

import Task from "./task";
import "./userTasksList.css";

import { pollForPrizeStatus } from "../actions/prizes";
import {
  getTasks, deleteTask, changeTaskCompletion, notifyParentTasksReadyForReview
} from "../actions/tasks";
import ConnectedShowIfRoleIs from "./ShowIfRoleIs";

export class UserTasksList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getTasks());
    this.props.dispatch(pollForPrizeStatus());
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
      completed: !task.completions.find(
        completion => completion.completedByUser === this.props.loggedInUser
      )
    }));
  }

  onSubmitForApproval = (event) => {
    event.preventDefault();
    this.props.dispatch(notifyParentTasksReadyForReview());
  };

  render() {
    let tasks = this.props.userTasks.map((task, index) =>
      <Task
        key={index}
        task={task}
        onDelete={(e) =>{this.onDelete(e, task)}}
        onChecked={(e) => {this.onChangeCompleted(e, task)}}
        loggedInUser={this.props.loggedInUser}
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
              // disabled={this.props.userTasks.some(task => !task.completedDate)}
              disabled={
                this.props.userTasks.some(task => {
                  return !task.completions.find(user => {
                    return user.completedByUser === this.props.loggedInUser;
                  });
                }) || this.props.submittedForReview
              }
              onClick={this.onSubmitForApproval}
            >
              Notify Parent tasks are done
            </button>

            {/* Mock UI for Child prize */}
            <div>
              <h4>Show Child Prize</h4>
              <p>{this.props.userAwardedPrize[0]}</p>
            </div>
          </React.Fragment>
        </ConnectedShowIfRoleIs>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userTasks: state.tasks.allUserTasks,
  loggedInUser: state.auth.currentUser.id,
  submittedForReview: state.auth.currentUser.tasksReadyForReview,

  userAwardedPrize: state.auth.currentUser // new
});

export default connect(mapStateToProps)(UserTasksList);
