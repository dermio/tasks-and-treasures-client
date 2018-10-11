import React from "react";
import { connect } from "react-redux";

import "./ChildStatusList.css";
import { getChildStatus } from "../actions/tasks";

export class ChildStatusList extends React.Component {
  componentDidMount() {
    // This is where I need to fetch my data
    this.props.dispatch(getChildStatus());
  }

  render() {
    let childStatusList = this.props.childStatusList.map((child, index) => (
      <li key={index}>
        <div>Child User: {child.username}</div>
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
