import React from "react";
import { connect } from "react-redux";
import { /*Link,*/ Redirect } from "react-router-dom";

import LoginForm from "./login-form";
import RegistrationForm from "./registration-form";

export function LandingPage({ isLoggedIn, location }) {
  // If we are logged in redirect straight to the user's dashboard
  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  /* The location in props.location, or this.props.location, is a prop
  object provided by React Router. The location object has a pathname key
  that points to the current URL location of the app. */
  console.log(location.pathname);

  return (
    <main className="landingPage">
      {(location.pathname === "/login") ? <LoginForm /> : <RegistrationForm />}
    </main>
  );
}

/* Line 18, Register? */

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth.currentUser
});

export default connect(mapStateToProps)(LandingPage);
