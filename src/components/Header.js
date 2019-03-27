import React from "react";
import { connect } from "react-redux";

import "./Header.css";
import owly from "../images/owly.png";

import LogoutButton from "./logout-button";

export class Header extends React.Component {
  render() {
    return (
      <header role="banner">
        {/* <div className="hidden"></div> */}
        <div className="title-owly-badge">
          <img src={owly} alt="owly" className="owly-img"/>
          <h1 className="app-title">Tasks and Treasures</h1>
        </div>

        <div className="user-info">
          {this.props.isLoggedIn && (
            <span className="logged-in-user">
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
