import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, withRouter, Redirect } from "react-router-dom";

import './App.css';

import LandingPage from "./landingPage";
import Dashboard from "./dashboard";
import Header from "./Header";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={LandingPage} />
        <Route exact path="/register" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
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
