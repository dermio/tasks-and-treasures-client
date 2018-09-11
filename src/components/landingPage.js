import React from "react";
import { connect } from "react-redux";
import { /*Link,*/ Redirect } from "react-router-dom";

import LoginForm from "./login-form";
import RegistrationForm from "./registration-form";

export function LandingPage(props) {
  let { isLoggedIn } = props;
  // If we are logged in redirect straight to the user's dashboard
  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="home">
      <h2>Welcome to Foo App</h2>
      <LoginForm />
      {/* <Link to="/register">Register</Link> */}
      <RegistrationForm />
    </div>
  );
}

/* Line 18, Register? */

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth.currentUser
});

export default connect(mapStateToProps)(LandingPage);
