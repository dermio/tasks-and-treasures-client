import React from "react";
import { connect } from "react-redux";

import "./Header.css";

import LogoutButton from "./logout-button";

export class Header extends React.Component {
  render() {
    return (
      <header>
        {/* <div className="hidden"></div> */}
        <h1 className="app-title">Tasks and Treasures</h1>
        <div className="user-info">
          {this.props.isLoggedIn && (
            <span>
              {this.props.currentUser.role} : {this.props.loggedInUser}
            </span>
          )}
          {this.props.isLoggedIn && <LogoutButton />}
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  isLoggedIn: !!state.auth.currentUser,
  userPrize: state.prizes.userPrize,
  loggedInUser: state.auth.currentUser ? state.auth.currentUser.username : "",
  isTasksFinalized: state.family.tasksFinalized
});

export default connect(mapStateToProps)(Header);
