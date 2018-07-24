import React from "react";
import { connect } from "react-redux";

import { fetchTasks } from "../actions/tasks";

export class UserTasksList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchTasks("mariobros"));
  }

  render() {
    return (
      <div>
        {this.props.userTasks.map((task) => <p>{task.taskName}</p>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userTasks: state.tasks.allUserTasks
});

export default connect(mapStateToProps)(UserTasksList);
