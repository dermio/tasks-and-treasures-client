import React from "react";
import { connect } from "react-redux";

import { clearAuth, updateChildInterval } from "../actions/auth";

export class LogoutButton extends React.Component {
  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(clearAuth());
    // To logout don't need to talk to server. Just need to clear token.
    localStorage.removeItem("authToken");
    /* Once logged out need to redirect to login page.
    In React Router update a prop in the state and
    use Redirect component from the Router. */

    // Clear the setInterval from `pollForPrizeStatus` once logged out
    window.clearInterval(this.props.childInt);
    this.props.dispatch(updateChildInterval(null));
  }

  /* Using type="button" lets you skip the use of event.preventDefault
  so there are no errors. */

  render() {
    return (
      <form>
        <button type="button" onClick={(e) => {this.handleLogout(e)}}>
          LOG OUT
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  childInt: state.auth.childInt
});

export default connect(mapStateToProps)(LogoutButton);
