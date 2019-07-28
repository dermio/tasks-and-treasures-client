import React from "react";
import { connect } from "react-redux";

import Task from "./task";
import "./userTasksList.css";

import { pollForPrizeStatus } from "../actions/prizes";
import {
  getTasks, deleteTask, changeTaskCompletion, notifyParentTasksReadyForReview
} from "../actions/tasks";
import ConnectedShowIfRoleIs from "./ShowIfRoleIs";

import { finalizeTasksList, resetTasksList, getFamily } from "../actions/family";
import CreateTaskForm from "./create-task-form";

export class UserTasksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddTaskFormVisible: false, // default do NOT show create task form
    };
  }

  static defaultProps = {
    onFinalizeTasksListFunction: finalizeTasksList
  };

  /******************************
   * Parent methods from Dashboard
  ******************************/
  /* Task button shown is local to UserTasksList component. UserTasksList
  is responsible for this state. No need to use Redux. */
  onAddTaskButtonClick() { // Click create Task, show Create Task form
    this.setState({
      isAddTaskFormVisible: !this.state.isAddTaskFormVisible
    });
  }

  onFinalizeTasksList() {
    console.log("[[[ CLICK FINALIZE TASKS LIST ]]]");
    this.props.dispatch(this.props.onFinalizeTasksListFunction());
  }

  onResetTasksList() {
    console.log("[[[ CLICK RESET TASKS LIST ]]]");
    this.props.dispatch(resetTasksList());
  }

  /******************************
   * Original methods for UserTasksList
  ******************************/
  componentDidMount() {
    this.props.dispatch(getTasks());
    this.props.dispatch(pollForPrizeStatus());

    this.props.dispatch(getFamily());
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
      <section className="userTasksList">
        <h2>Tasks List</h2>

        <ConnectedShowIfRoleIs userRole="parent">
          <React.Fragment>
            <article className="create-finalize-reset-tasks">
              {this.state.isAddTaskFormVisible &&
                <CreateTaskForm
                  onTaskCreated={
                    () => this.setState({ isAddTaskFormVisible: false })
                  }
                />
              }
              {!this.state.isAddTaskFormVisible &&
                !this.props.isTasksFinalized &&
                <button
                  onClick={(e) => this.onAddTaskButtonClick(e)}
                  className="create-task-btn"
                >
                  Create Task
                </button>
              }
              {!this.state.isAddTaskFormVisible &&
                !this.props.isTasksFinalized &&
                this.props.currentTasks && // Check if tasks is null
                this.props.currentTasks.length > 0 &&
                <button
                  disabled={!this.props.currentPrize}
                  onClick={e => this.onFinalizeTasksList(e)}
                  className="finalize-tasks-button"
                >
                  {
                    !this.props.currentPrize ?
                      "PLEASE create a Prize to " : ""
                  }
                  Finalize Tasks List
                </button>
              }
              {!this.state.isAddTaskFormVisible &&
                this.props.isTasksFinalized &&
                <button
                  onClick={e => this.onResetTasksList(e)}
                  className="reset-tasks-button"
                >
                  Reset Tasks List
                </button>
              }
            </article>

          </React.Fragment>
        </ConnectedShowIfRoleIs>

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
                }) || this.props.submittedForReview || !this.props.isTasksFinalized
              }
              onClick={this.onSubmitForApproval}
            >
              Notify Parent tasks are done
            </button>
          </React.Fragment>
        </ConnectedShowIfRoleIs>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  userTasks: state.tasks.allUserTasks,
  loggedInUser: state.auth.currentUser.id,
  submittedForReview: state.auth.currentUser.tasksReadyForReview,

  prize:
    (state &&
    state.auth &&
    state.auth.currentUser &&
    state.auth.currentUser.awardedPrizes)
      ? state.auth.currentUser.awardedPrizes[0]
      : "", // new
  
    isTasksFinalized: state.family.tasksFinalized,

  currentPrize: 
    (state &&
    state.family) ? state.family.currentPrize : null,

  currentTasks:
      (state &&
      state.family) ? state.family.currentTasks : [],
});

export default connect(mapStateToProps)(UserTasksList);
