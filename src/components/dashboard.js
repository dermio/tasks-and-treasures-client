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
    title: <p className="RJoy-title-dj">Quick Tutorial for Parent User</p>,
    content: (
      <p className="RJoy-content-dj">
        Welcome to Tasks & Treasures. Click next to learn how to use the app
        as a parent.
      </p>
    ),
    placement: "top-start",
    locale: { skip: <strong aria-label="skip">S-K-I-P</strong> }
  },
  {
    target: ".userTasksList",
    title: <p className="RJoy-title-dj">1. Create some Tasks</p>,
    content: (
      <p className="RJoy-content-dj">
        A task is any work the parent gives the child to complete.
      </p>
    ),
    placement: "left-start"
  },
  {
    target: ".userPrize",
    title: <p className="RJoy-title-dj">2. Create a Prize</p>,
    content: (
      <p className="RJoy-content-dj">
        The prize is the child's reward for completing all tasks.
      </p>
    ),
    placement: "top-start"
  },
  {
    target: ".userTasksList",
    title: <p className="RJoy-title-dj">3. Finalize the Tasks list and Prize</p>,
    content: (
      <p className="RJoy-content-dj">
        The parent creates a tasks list and prize as a set. Finalize
        the tasks & prize before giving the list to the child.
      </p>
    ),
    placement: "left-start"
  },
  {
    target: ".childStatusList",
    title: <p className="RJoy-title-dj">4. Approve or reject Child's Tasks</p>,
    content: (
      <p className="RJoy-content-dj">
        After checking the child's work, the parent can approve or reject
        their work.
      </p>
    ),
    placement: "top-end"
  },
  {
    target: ".childStatusList",
    title: <p className="RJoy-title-dj">5. Reward the Prize</p>,
    content: (
      <p className="RJoy-content-dj">
        When the parent is satisfied all the tasks are done,
        reward the prize to the child.
      </p>
    ),
    placement: "top-end"
  }
];

export const childSteps = [
  {
    target: ".userTasksList",
    title: <p className="RJoy-title-dj">Quick Tutorial for Child User</p>,
    content: (
      <p className="RJoy-content-dj">
        Welcome to Tasks & Treasures. Click next to learn how to use the app
        as a child.
      </p>
    ),
    placement: "top-start",
    locale: { skip: <strong aria-label="skip">S-K-I-P</strong> }
  },
  {
    target: ".userTasksList",
    title: <p className="RJoy-title-dj">1. Check off completed Tasks</p>,
    content: (
      <p className="RJoy-content-dj">
        After completing a task, check the task off on the list.
      </p>
    ),
    placement: "top-start"
  },
  {
    target: ".userTasksList",
    title: <p className="RJoy-title-dj">2. Notify Parent Tasks are done</p>,
    content: (
      <p className="RJoy-content-dj">
        When all tasks are checked off, notify the parent.
        If the parent rejects the tasks, the parent button notification
        will become enabled again.
      </p>
    ),
    placement: "left-start"
  },
  {
    target: ".userPrize",
    title: <p className="RJoy-title-dj">3. Get Prize for finishing Tasks</p>,
    content: (
      <p className="RJoy-content-dj">
        Your prize is listed for completing all tasks. The past prizes
        you've earned are shown.
      </p>
    ),
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
      <main className="Dashboard" role="main">

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
