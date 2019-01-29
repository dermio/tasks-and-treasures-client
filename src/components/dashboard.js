import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./dashboard.css";
import UserTasksList from "./userTasksList";
import UserPrize from "./userPrize";

import ConnectedShowIfRoleIs from "./ShowIfRoleIs";
import ChildStatusList from "./ChildStatusList";

import { finalizeTasksList, resetTasksList } from "../actions/family";

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

  onFinalizeTasksList() {
    console.log("[[[ CLICK FINALIZE TASKS LIST ]]]");
    this.props.dispatch(finalizeTasksList());
  }

  onResetTasksList() {
    console.log("[[[ CLICK RESET TASKS LIST ]]]");
    this.props.dispatch(resetTasksList());
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <main className="Dashboard">
        <ConnectedShowIfRoleIs userRole="parent">
          <ChildStatusList />
        </ConnectedShowIfRoleIs>

        <UserTasksList />
        <UserPrize />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.auth.currentUser,
  userPrize: state.prizes.userPrize,
  loggedInUser: state.auth.currentUser ? state.auth.currentUser.username : "",
  isTasksFinalized: state.family.tasksFinalized
});

export default connect(mapStateToProps)(Dashboard);
