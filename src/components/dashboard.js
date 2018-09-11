import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// import dashboard.css
import LogoutButton from "./logout-button";
import UserTasksList from "./userTasksList";
import UserPrize from "./userPrize";
import CreateTaskForm from "./create-task-form";
import CreatePrizeOrUpdateForm from "./create-prize-form";

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddTaskFormVisible: false, // default do NOT show create task form
      isAddPrizeFormVisible: false // default do NOT show create prize form
    };
  }

  // Task button shown is local to Dashboard component. Dashboard
  // is responsible for this state. No need to use Redux.
  onAddTaskButtonClick() { // Click create Task, show Create Task form
    this.setState({
      isAddTaskFormVisible: !this.state.isAddTaskFormVisible
    });
  }

  onAddPrizeButtonClick() { // Click create Prize, show Create Prize Form
    this.setState({
      isAddPrizeFormVisible: !this.state.isAddPrizeFormVisible
    });
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
          <button onClick={(e) => this.onAddTaskButtonClick(e)}>
            Create Task
          </button>
        }

        <LogoutButton />
        <UserTasksList />
        <UserPrize />
        {this.state.isAddPrizeFormVisible &&
          <CreatePrizeOrUpdateForm
            onPrizeCreated={
              () => this.setState({
                isAddPrizeFormVisible: false
              })
            }
          />
        }
        {!this.state.isAddPrizeFormVisible &&
          <button onClick={(e) => this.onAddPrizeButtonClick(e)}>
            {this.props.userPrize ? "Update" : "Create"} Prize
          </button>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.auth.currentUser,
  userPrize: state.prizes.userPrize
});

export default connect(mapStateToProps)(Dashboard);
