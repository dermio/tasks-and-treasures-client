import React from "react";
import { connect } from "react-redux";

import { clearAuth } from "../actions/auth";

export class LogoutButton extends React.Component {
  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(clearAuth());
    // To logout don't need to talk to server. Just need to clear token.
    localStorage.removeItem("authToken");
    /* Once logged out need to redirect to login page.
    In React Router update a prop in the state and
    use Redirect component from the Router. */
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


/* No state is connected to the component. The component is "dumb"
and doesn't require access to state. The component requires "connect"
from react-redux because it still dispatches actions to the store
which will change the state. */
export default connect()(LogoutButton);
