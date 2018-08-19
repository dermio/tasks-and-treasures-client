import React from "react";
import { connect } from "react-redux";

import { getPrize, createPrize } from "../actions/prizes";

export class UserPrize extends React.Component {
  componentDidMount() {
    this.props.dispatch(getPrize("mariobros"));

    /* Temporarily added dispatch and createPrize as properties to
    the window object. Will use the methods to test creating a prize
    from the browser console. */
    window.dispatch = this.props.dispatch;
    window.createPrize = createPrize;
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
