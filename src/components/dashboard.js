import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// import dashboard.css
import LogoutButton from "./logout-button";
import UserTasksList from "./userTasksList";

export class Dashboard extends React.Component {


  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <p>USER'S DASHBOARD</p>
        <LogoutButton />
        <UserTasksList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.auth.currentUser
  // isLoggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Dashboard);
