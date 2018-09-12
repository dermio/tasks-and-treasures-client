/* Currently the functional component does not use JSX.
The console warns: 'React' is defined but never used no-unused-vars
Later if the component requres the use of JSX, react will need
to beimported */
// import React from "react";

import { connect } from "react-redux";

export function ShowIfRoleIs({ shouldShow, children }) {
  if (!shouldShow) {
    return null;
  }
  return ({ ...children });
}

const mapStateToProps = (state, ownProps) => ({
  shouldShow: ownProps.userRole === state.auth.currentUser.role
});

export default connect(mapStateToProps)(ShowIfRoleIs);
