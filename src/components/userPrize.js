import React from "react";
import { connect } from "react-redux";

import { getPrize, createOrUpdatePrize, deletePrize } from "../actions/prizes";
import ConnectedShowIfRoleIs from "./ShowIfRoleIs";

export class UserPrize extends React.Component {
  componentDidMount() {
    this.props.dispatch(getPrize());

    /* Temporarily added dispatch and createPrize as properties to
    the window object. Will use the methods to test creating a prize
    from the browser console. */
    window.dispatch = this.props.dispatch;
    window.createOrUpdatePrize = createOrUpdatePrize;
    // window.createPrize = createPrize; OLD code if createPrize imported

    window.deletePrize = deletePrize;

    /* Run the following code, after the two previous lines of code,
    to dispatch creating a prize in the browser console.
    dispatch(createPrize({familyCode: "mariobros", prizeName: "Disneyland"}))
    <- OR ->
    dispatch(createPrize({
      familyCode: "mariobros", prizeName: "Disneyland"
    }))
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

        <ConnectedShowIfRoleIs userRole="parent">
        <React.Fragment>
        {this.props.userPrize &&
          <button onClick={(e) => this.onDelete(e, this.props.userPrize)}>
            Delete Prize
          </button>
        }
        </React.Fragment>
        </ConnectedShowIfRoleIs>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userPrize: state.prizes.userPrize
});

export default connect(mapStateToProps)(UserPrize);

/*
Notes about JSX curly braces inside the <div className="userPrize">

1. The First pair of braces will render UI, the string Prize name,
if a `userPrize` property exists in the store.
If the `userPrize` property exists, both operands evaluate as `truthy`
which makes the `&&` expression evaluate to True. This returns the
Prize name as a string.

2. The Second pair of braces will render the Delete prize button if
the store contains a `userPrize` property. If the prize exists, there
should be a rendered button to delete the Prize.
The `&&` expression will evaluate to True. This returns a button element
with a function to delete the Prize.
*/
