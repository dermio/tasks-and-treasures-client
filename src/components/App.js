import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, withRouter, Redirect } from "react-router-dom";

import './App.css';

import LandingPage from "./landingPage";
import Dashboard from "./dashboard";
import CreateTaskForm from "./create-task-form";

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
