import React from "react";
import { connect } from "react-redux";

//import { fetchPrize } from "../actions/prizes";

export class UserPrize extends React.Component {
  render() {
    return <div>Box of Oreos</div>
  }
}

const mapStateToProps = (state) => ({
  userPrize: state.prizes.userPrize
});

export default connect(mapStateToProps)(UserPrize);
