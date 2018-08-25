import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// import dashboard.css
import LogoutButton from "./logout-button";
import UserTasksList from "./userTasksList";
import UserPrize from "./userPrize";
import CreateTaskForm from "./create-task-form";
import CreatePrizeForm from "./create-prize-form";

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddTaskFormVisible: false // default do NOT show create task form
    };
  }

  // Task button shown is local to Dashboard component. Dashboard
  // is responsible for this state. No need to use Redux.
  onAddTaskButtonClick = () => {
    this.setState({
      isAddTaskFormVisible: !this.state.isAddTaskFormVisible
    })
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <p>USER'S DASHBOARD</p>
        {this.state.isAddTaskFormVisible &&
          <CreateTaskForm
            onTaskCreated={
              () => this.setState({
                isAddTaskFormVisible: false
              })
            }
          />
        }
        {!this.state.isAddTaskFormVisible &&
          <button onClick={this.onAddTaskButtonClick}>
            Create Task
          </button>
        }

        <LogoutButton />
        <UserTasksList />
        <UserPrize />
        <CreatePrizeForm />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.auth.currentUser
});

export default connect(mapStateToProps)(Dashboard);
