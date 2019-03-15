import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ReactJoyride from "react-joyride";

import "./dashboard.css";
import UserTasksList from "./userTasksList";
import UserPrize from "./userPrize";

import ConnectedShowIfRoleIs from "./ShowIfRoleIs";
import ChildStatusList from "./ChildStatusList";

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      run: true,
      steps: [
        {
          target: ".userTasksList",
          content: <h3>Quick Tutorial</h3>,
          placement: "top",
          locale: { skip: <strong aria-label="skip">S-K-I-P</strong> }
        }
        ,
        {
          target: ".userTasksList",
          content: <h3>Continue</h3>,
          locale: { close: <strong>WHY NO WORK?</strong> }
        }
        ,
        {
          target: ".userTasksList",
          content: <h3>more...</h3>
        }
      ]
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
  isTasksFinalized: state.family.tasksFinalized
});

export default connect(mapStateToProps)(Dashboard);
