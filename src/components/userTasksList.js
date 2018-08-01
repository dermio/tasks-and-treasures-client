import React from "react";
import { connect } from "react-redux";

import "./userTasksList.css";

import { fetchTasks } from "../actions/tasks";

export class UserTasksList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchTasks("mariobros"));
  }

  render() {
    let tasks = this.props.userTasks.map((task, index) =>
      <li key={index}>
        {task.taskName}
      </li>
    );

    return (
      <div className="userTasksList">
        <ul className="userTasksList-UL">
          {tasks}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userTasks: state.tasks.allUserTasks
});

export default connect(mapStateToProps)(UserTasksList);
