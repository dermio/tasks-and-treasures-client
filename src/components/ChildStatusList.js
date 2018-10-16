import React from "react";
import { connect } from "react-redux";

import "./ChildStatusList.css";
import { getChildStatus } from "../actions/tasks";
import { awardChildPrize } from "../actions/prizes";

export class ChildStatusList extends React.Component {
  componentDidMount() {
    // This is where I need to fetch my data
    this.props.dispatch(getChildStatus());
  }

  onApproveChildTasks = () => {
    console.log("[[[ PARENT APPROVES CHILD TASKS ]]]");

    this.props.dispatch(awardChildPrize);
  }

  render() {
    let childStatusList = this.props.childStatusList.map((child, index) => (
      <li key={index}>
        <div>
          <span>Child User: {child.username}</span>
          <button
            disabled={!child.tasksReadyForReview}
            onClick={this.onApproveChildTasks}
          >
            Approve Child Tasks
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
  childStatusList: state.tasks.allChildStatus
});

export default connect(mapStateToProps)(ChildStatusList);
