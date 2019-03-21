import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ReactJoyride from "react-joyride";

import "./dashboard.css";
import UserTasksList from "./userTasksList";
import UserPrize from "./userPrize";

import ConnectedShowIfRoleIs from "./ShowIfRoleIs";
import ChildStatusList from "./ChildStatusList";

export const parentSteps = [
  {
    target: ".userTasksList",
    content: <h3>Quick Tutorial for Parent User</h3>,
    placement: "top-start",
    locale: { skip: <strong aria-label="skip">S-K-I-P</strong> }
  },
  {
    target: ".userTasksList",
    content: <h3>1. Create some Tasks</h3>,
    placement: "left-start"
  },
  {
    target: ".userPrize",
    content: <h3>2. Create a Prize</h3>,
    placement: "top-start"
  },
  {
    target: ".userTasksList",
    content: <h3>3. Finalize the Tasks list and Prize</h3>,
    placement: "left-start"
  },
  {
    target: ".childStatusList",
    content: <h3>4. Approve or reject Child's Tasks</h3>,
    placement: "top-end"
  },
  {
    target: ".childStatusList",
    content: <h3>5. Reward the Prize</h3>,
    placement: "top-end"
  }
];

export const childSteps = [
  {
    target: ".userTasksList",
    content: <h3>Quick Tutorial for Child User</h3>,
    placement: "top-start",
    locale: { skip: <strong aria-label="skip">S-K-I-P</strong> }
  },
  {
    target: ".userTasksList",
    content: <h3>1. Check off completed Tasks</h3>,
    placement: "top-start"
  },
  {
    target: ".userTasksList",
    content: <h3>2. Notify Parent Tasks are done</h3>,
    placement: "left-start"
  },
  {
    target: ".userPrize",
    content: <h3>3. Get Prize for finishing Tasks</h3>,
    placement: "left-start"
  }
];

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      run: true,
      steps: (this.props.loggedInRole === "parent") ? parentSteps : childSteps
    };
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />
    }

    let { run, steps } = this.state;

    return (
      <main className="Dashboard">

        <ReactJoyride
          callback={this.handleJoyrideCallback}
          continuous
          run={run}
          scrollToFirstStep
          showProgress
          showSkipButton
          steps={steps}
          styles={{
            options: {
              zIndex: 10000,
            }
          }}
        />

        <section className="dashboard-container">
          <ConnectedShowIfRoleIs userRole="parent">
            <ChildStatusList />
          </ConnectedShowIfRoleIs>

          <UserTasksList />
        </section>
        <UserPrize />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.auth.currentUser,
  userPrize: state.prizes.userPrize,
  loggedInUser: state.auth.currentUser ? state.auth.currentUser.username : "",
  isTasksFinalized: state.family.tasksFinalized,
  loggedInRole: state.auth.currentUser ? state.auth.currentUser.role : ""
});

export default connect(mapStateToProps)(Dashboard);
