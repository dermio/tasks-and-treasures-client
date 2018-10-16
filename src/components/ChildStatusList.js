import React from "react";
import { connect } from "react-redux";

import "./ChildStatusList.css";
import { getChildStatus } from "../actions/tasks";

export class ChildStatusList extends React.Component {
  componentDidMount() {
    // This is where I need to fetch my data
    this.props.dispatch(getChildStatus());
  }

  approveChildTasks = () => {
    console.log("[[[ PARENT APPROVES CHILD TASKS ]]]");
  }

  render() {
    let childStatusList = this.props.childStatusList.map((child, index) => (
      <li key={index}>
        <div>
          <span>Child User: {child.username}</span>
          <button
            disabled={!child.tasksReadyForReview}
            onClick={this.approveChildTasks}
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
