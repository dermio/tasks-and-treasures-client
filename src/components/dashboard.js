import React from "react";
import { connect } from "react-redux";

// import dashboard.css
import LogoutButton from "./logout-button";

export class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <p>USER'S DASHBOARD</p>
        <LogoutButton />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.auth.currentUser
  // isLoggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Dashboard);
