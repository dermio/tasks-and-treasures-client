import React from "react";
import { connect } from "react-redux";

import { getPrize } from "../actions/prizes";

export class UserPrize extends React.Component {
  componentDidMount() {
    // console.log("[[[ UserPrize mounted ]]]");
    this.props.dispatch(getPrize("mariobros"));
  }

  render() {
    return (
      <div className="userPrize">
        {this.props.userPrize && this.props.userPrize.prizeName}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userPrize: state.prizes.userPrize
});

export default connect(mapStateToProps)(UserPrize);
