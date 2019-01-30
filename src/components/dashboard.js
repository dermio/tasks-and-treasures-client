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
