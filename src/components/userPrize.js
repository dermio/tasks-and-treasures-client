import React from "react";
import { connect } from "react-redux";

import "./userPrize.css";
import ConnectedShowIfRoleIs from "./ShowIfRoleIs";

import CreateOrUpdatePrizeForm from "./create-update-prize-form";

import { getPrize, deletePrize } from "../actions/prizes";

export class UserPrize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddPrizeFormVisible: false // default do NOT show create prize form
    };
  }

  onAddPrizeButtonClick() { // Click create Prize, show Create Prize Form
    this.setState({
      isAddPrizeFormVisible: !this.state.isAddPrizeFormVisible
    });
  }

  componentDidMount() {
    this.props.dispatch(getPrize());
  }

  onDelete(event, prize) {
    console.log("[[[ CLICK DELETE PRIZE BUTTON ]]]");
    console.log(prize);
    this.props.dispatch(deletePrize(prize.id));
  }

  render() {
    return (
      <section className="userPrize">
        <h4>The Prize Area</h4>

        <ConnectedShowIfRoleIs userRole="parent">
          <React.Fragment>
            {this.state.isAddPrizeFormVisible &&
              !this.props.isTasksFinalized &&
              <CreateOrUpdatePrizeForm
                onPrizeCreated={
                  () => this.setState({
                    isAddPrizeFormVisible: false
                  })
                }
              />
            }
            {!this.state.isAddPrizeFormVisible &&
              !this.props.isTasksFinalized &&
              <button
                onClick={(e) => this.onAddPrizeButtonClick(e)}
                className="create-update-prize-btn"
              >
                {this.props.userPrize ? "Update" : "Create"} Prize
              </button>
            }

            {this.props.userPrize &&
              !this.props.isTasksFinalized &&
              <button
                onClick={(e) => this.onDelete(e, this.props.userPrize)}
                className="delete-prize-btn"
              >
                Delete Prize
              </button>
            }
          </React.Fragment>
        </ConnectedShowIfRoleIs>

        <p className="prize-info">
          {"Prize: "}
          <span className="awarded-prize">
            {this.props.userPrize && this.props.userPrize.prizeName}
          </span>
        </p>

        <ConnectedShowIfRoleIs userRole="child">
          <React.Fragment>
            {this.props.awardedPrize &&
              <button type="button">Get your Prize Kiddo!</button>
            }
          </React.Fragment>
        </ConnectedShowIfRoleIs>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  userPrize: state.prizes.userPrize,
  // Fix the awarded prize, it's hard coded to first item in array
  awardedPrize: state.auth.currentUser.awardedPrizes[0],
  isTasksFinalized: state.family.tasksFinalized
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
