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
      isAddFormVisible: false // default do NOT show create task form
    };
  }

  // Button shows is local to Dashboard component. Dashboard
  // is responsible for this state. No need to use Redux.
  onAddButtonClick = () => {
    this.setState({
      isAddFormVisible: !this.state.isAddFormVisible
    })
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <p>USER'S DASHBOARD</p>
        {this.state.isAddFormVisible &&
          <CreateTaskForm
            onTaskCreated={
              () => this.setState({
                isAddFormVisible: false
              })
            }
          />
        }
        {!this.state.isAddFormVisible &&
          <button onClick={this.onAddButtonClick}>
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
