import React from "react";
import { connect } from "react-redux";

import { getPrize, createPrize, deletePrize } from "../actions/prizes";

export class UserPrize extends React.Component {
  componentDidMount() {
    this.props.dispatch(getPrize());

    /* Temporarily added dispatch and createPrize as properties to
    the window object. Will use the methods to test creating a prize
    from the browser console. */
    window.dispatch = this.props.dispatch;
    window.createPrize = createPrize;

    window.deletePrize = deletePrize;

    /* Run the following code, after the two previous lines of code,
    to dispatch creating a prize in the browser console.
    dispatch(createPrize({familyCode: "mariobros", prizeName: "Disneyland"}))
    */
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
