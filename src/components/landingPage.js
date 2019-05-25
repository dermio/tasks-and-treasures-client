import React from "react";
import { connect } from "react-redux";
import { /*Link,*/ Redirect } from "react-router-dom";

import "./landingPage.css";
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
    <main className="landingPage" role="main">
      {!isLoggedIn &&
        <div className="welcome-login-signup">
          <span>Parents create tasks for their kids.
          Kids complete the tasks list and receive a prize.</span><br />
          <span>Two users roles are required for the app - a parent user and
          and a child user.</span><br />
          <span>Both users need to have the same family code.</span>
        </div>
      }
      {(location.pathname === "/login") ? <LoginForm /> : <RegistrationForm />}
    </main>
  );
}

/* Line 18, Register? */

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth.currentUser
});

export default connect(mapStateToProps)(LandingPage);
