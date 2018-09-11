import React from "react";

import { connect } from "react-redux";

export function ShowIfRoleIs({ shouldShow, children }) {
  if (!shouldShow) {
    return null;
  }
  return ({ ...children });
}

const mapStateToProps = (state, ownProps) => ({
  shouldShow: ownProps.role === state.auth.currentUser.role
});

export default connect(mapStateToProps)(ShowIfRoleIs);
