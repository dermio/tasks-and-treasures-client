import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, withRouter, Redirect } from "react-router-dom";

import './App.css';

import LandingPage from "./landingPage";
import Dashboard from "./dashboard";
import CreateTaskForm from "./create-task-form";

// import LogoutButton from "./logout-button";
// import LoginForm  from "./login-form";


// function dashboard({ isLoggedIn }) {
//   // { isLoggedIn} is destructured props
//   if (!isLoggedIn) {
//     return <Redirect to="/"/>;
//   }

//   return (
//     <div>
//       <p>USER'S DASHBOARD</p>
//       <LogoutButton />
//     </div>
//   );
// }

// const Dashboard = connect(mapStateToProps)(dashboard);


// // landingPage component will eventually be moved to its own file.
// function landingPage(props) {
//   let { isLoggedIn } = props;
//   // If we are logged in redirect straight to the user's dashboard
//   if (isLoggedIn) {
//     return <Redirect to="/dashboard" />;
//   }

//   return (
//     <div className="home">
//       <h2>Welcome to Foo App</h2>
//       <LoginForm />
//       {/* <Link to="/register">Register</Link> */}
//     </div>
//   );
// }

// const LandingPage = connect(mapStateToProps)(landingPage);


class App extends Component {
  render() {
    return (
      <div className="App">
        App

        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={LandingPage} />
        <Route exact path="/register" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/createtask" component={CreateTaskForm} />
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
    //isLoggedIn: state.auth.currentUser !== null
  };
}

export default withRouter(connect(mapStateToProps)(App));
