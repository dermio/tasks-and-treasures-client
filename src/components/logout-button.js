import React from "react";
import { connect } from "react-redux";

import { clearAuth, updateChildInterval } from "../actions/auth";
import { stopPollGetChildStatus } from "../actions/tasks";

import "./logout-button.css";

export class LogoutButton extends React.Component {
  handleLogout(event) {
    if (event.preventDefault) { // event doesn't exist in jsdom, check for testing
      event.preventDefault();
    }

    this.props.dispatch(clearAuth());
    // To logout don't need to talk to server. Just need to clear token.

    if (window.localStorage) { // localStorage doesn't exist in jsdom, check for testing
      localStorage.removeItem("authToken");
    }

    /* Once logged out need to redirect to login page.
    In React Router update a prop in the state and
    use Redirect component from the Router. */

    // Clear the setInterval from `pollForPrizeStatus` once logged out
    window.clearInterval(this.props.childInt);
    this.props.dispatch(updateChildInterval(null));

    // Stop polling for get Child status once logged out
    this.props.dispatch(stopPollGetChildStatus());

    /* Lines 18-21, later can create thunks to dispatch these actions
    if desired. */
  }

  /* Using type="button" lets you skip the use of event.preventDefault
  so there are no errors. */

  render() {
    return (
      <form className="logout-form">
        <button type="button" className="logout-btn"
          onClick={(e) => {this.handleLogout(e)}}>
          Logout
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  childInt: state.auth.childInt
});

export default connect(mapStateToProps)(LogoutButton);
