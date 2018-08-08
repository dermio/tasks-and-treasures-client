import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// import dashboard.css
import LogoutButton from "./logout-button";
import UserTasksList from "./userTasksList";
import UserPrize from "./userPrize";
import CreateTaskForm from "./create-task-form";

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

    // COMMENT out the IF-ELSE block later, and `createTaskFormOrButton`
    // Another way to render the CreateTaskForm or button
    /* let createTaskFormOrButton;
    if (this.state.isAddFormVisible) {
      createTaskFormOrButton = <CreateTaskForm />;
    } else {
      createTaskFormOrButton = (<button onClick={this.onAddButtonClick}>
        Create Task
      </button>);
    } */

    return (
      <div>
        <p>USER'S DASHBOARD</p>
        {/* {createTaskFormOrButton} */}
        {this.state.isAddFormVisible && <CreateTaskForm onTaskCreated={
          () => this.setState({
            isAddFormVisible: false
          })
        } />}
        {!this.state.isAddFormVisible && <button onClick={this.onAddButtonClick}>
          Create Task
        </button>}

        <LogoutButton />
        <UserTasksList />
        <UserPrize />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.auth.currentUser
  // isLoggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Dashboard);
