import React from "react";
import { connect } from "react-redux";

import "./ChildStatusList.css";
import { pollGetChildStatus } from "../actions/tasks";
import { awardChildPrize, rejectChildPrize }
  from "../actions/prizes";
// import { getFamily } from "../actions/family";

export class ChildStatusList extends React.Component {
  componentDidMount() {
    // This is where I need to fetch my data

    /* Child's `tasksReadyForReview` property part of the condition
    to enable approve child tasks button for the Parent. */
    this.props.dispatch(pollGetChildStatus());
     // Get family data when page loads.
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
      <li key={child._id} className="single-child-status">
        <div>
          <span>Child User: {child.username}</span>
          <button
            disabled={
              !child.tasksReadyForReview ||
              child.awardedPrizes.includes(this.props.currentPrizeId)
            }
            onClick={() => this.onApproveChildTasks(child)}
            className="approve-child-tasks-btn"
          >
            {child.awardedPrizes.includes(this.props.currentPrizeId)
              ? "Prize was awarded" : String.fromCharCode(10004)}
          </button>

          <button
            disabled={
              !child.tasksReadyForReview ||
              child.awardedPrizes.includes(this.props.currentPrizeId)
            }
            onClick={() => this.onRejectChildTasks(child)}
            className="reject-child-tasks-btn"
          >
            &#x2718;
          </button>
        </div>
      </li>
    ));

    return (
      <section className="childStatusList">
        <h4>The Kiddies status, grade work</h4>
        <ul className="childStatusList-UL">
          {childStatusList}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  childStatusList: state.tasks.allChildStatus,
  currentPrizeId: (state.prizes.userPrize)
    ? state.prizes.userPrize.id : "not valid"
});

export default connect(mapStateToProps)(ChildStatusList);
