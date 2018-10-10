import React from "react";
import { connect } from "react-redux";

import { getChildStatus } from "../actions/tasks";

export class ChildStatusList extends React.Component {
  componentDidMount() {
    // This is where I need to fetch my data
    this.props.dispatch(getChildStatus());
  }

  render() {
    let childStatusList = this.props.childStatusList.map((child, index) => (
      <div key={index}>
        <span>Child User: {child.username}</span>
      </div>
    ));

    return (
      <div>
        <h4>The Kiddies</h4>
        {childStatusList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  childStatusList: state.tasks.allChildStatus
});

export default connect(mapStateToProps)(ChildStatusList);
