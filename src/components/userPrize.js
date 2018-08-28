import React from "react";
import { connect } from "react-redux";

import { getPrize, createOrUpdatePrize, deletePrize } from "../actions/prizes";

export class UserPrize extends React.Component {
  componentDidMount() {
    this.props.dispatch(getPrize());

    /* Temporarily added dispatch and createPrize as properties to
    the window object. Will use the methods to test creating a prize
    from the browser console. */
    window.dispatch = this.props.dispatch;
    window.createPrize = createOrUpdatePrize;

    window.deletePrize = deletePrize;

    /* Run the following code, after the two previous lines of code,
    to dispatch creating a prize in the browser console.
    dispatch(createPrize({familyCode: "mariobros", prizeName: "Disneyland"}))
    */
  }

  onDelete(event, prize) {
    console.log("[[[ CLICK DELETE PRIZE BUTTON ]]]");
    console.log(prize);
    this.props.dispatch(deletePrize(prize.id));
  }

  render() {
    return (
      <div className="userPrize">
        {this.props.userPrize && this.props.userPrize.prizeName}
        {this.props.userPrize &&
          <button onClick={(e) => this.onDelete(e, this.props.userPrize)}>
            Delete Prize
          </button>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userPrize: state.prizes.userPrize
});

export default connect(mapStateToProps)(UserPrize);
