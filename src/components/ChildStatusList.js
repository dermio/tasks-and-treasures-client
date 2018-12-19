import React from "react";
import { connect } from "react-redux";

import "./ChildStatusList.css";
import { pollGetChildStatus } from "../actions/tasks";
import { awardChildPrize, rejectChildPrize }
  from "../actions/prizes";
import { getFamily } from "../actions/family";

export class ChildStatusList extends React.Component {
  componentDidMount() {
    // This is where I need to fetch my data

    /* Child's `tasksReadyForReview` property part of the condition
    to enable approve child tasks button for the Parent. */
    this.props.dispatch(pollGetChildStatus());
    this.props.dispatch(getFamily()); // Get family data when page loads.
  }

  onApproveChildTasks = (child) => {
    console.log("[[[ PARENT APPROVES CHILD TASKS ]]]", child);

    this.props.dispatch(awardChildPrize(child));
  }

  onRejectChildTasks = (child) => {
    console.log("[[[ PARENT REJECT CHILD TASKS ]]]", child);

    this.props.dispatch(rejectChildPrize(child));
  }

  /* TODO: Modify button text, if the prize was already rewarded
  i.e. 'approve child tasks' vs 'prize already awarded' */
  render() {
    let childStatusList = this.props.childStatusList.map((child, index) => (
      <li key={index}>
        <div>
          <span>Child User: {child.username}</span>
          <button
            disabled={
              !child.tasksReadyForReview ||
              child.awardedPrizes.includes(this.props.currentPrizeId)
            }
            onClick={() => this.onApproveChildTasks(child)}
          >
            {child.awardedPrizes.includes(this.props.currentPrizeId)
              ? "Prize was awarded" :
              "Approve Tasks and Award Prize"}
          </button>

          <button
            disabled={
              !child.tasksReadyForReview ||
              child.awardedPrizes.includes(this.props.currentPrizeId)
            }
            onClick={() => this.onRejectChildTasks(child)}
          >
            Do Not Approve Child Tasks
          </button>
        </div>
      </li>
    ));

    return (
      <div className="childStatusList">
        <h4>The Kiddies</h4>
        <ul className="childStatusList-UL">
          {childStatusList}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  childStatusList: state.tasks.allChildStatus,
  currentPrizeId: (state.prizes.userPrize)
    ? state.prizes.userPrize.id : "not valid"
});

export default connect(mapStateToProps)(ChildStatusList);
