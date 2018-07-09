import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, /* withRouter */ Redirect } from "react-router-dom";

import './App.css';

import LogoutButton from "./logout-button";
import LoginForm  from "./login-form";


// landingPage component will eventually be moved to its own file.
function landingPage(props) {
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
    </div>
  );
}

const LandingPage = connect(mapStateToProps)(landingPage);


class App extends Component {
  render() {
    return (
      <div className="App">
        Howdy
        {this.props.isLoggedIn && <LogoutButton />}
        <Route exact path="/" component={LandingPage} />
      </div>
    );
  }
}


// const mapStateToProps = (state) => ({
//   isLoggedIn: !!state.auth.currentUser
// });

function mapStateToProps(state) { // function declaration is hoisted
  return {
    isLoggedIn: !!state.auth.currentUser
  };
}

export default connect(mapStateToProps)(App);
