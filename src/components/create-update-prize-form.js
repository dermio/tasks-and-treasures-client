import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { createOrUpdatePrize } from "../actions/prizes";

import "./create-update-prize-form.css";

export class CreateOrUpdatePrizeForm extends React.Component {
  onSubmit(values) {
    this.props.dispatch(createOrUpdatePrize({
      prizeName: values.prizename,
      onPrizeCreated: this.props.onPrizeCreated
    }));
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        className="create-update-prize-form"
      >
        <label htmlFor="prizename">Prize Name</label>
        <Field
          component="input"
          type="text"
          name="prizename"
          id="prizename"
        />
        <div className="create-update-prize-form-buttons">
          <button type="submit" className="submit-update-prize-btn">
            Submit Prize
          </button>
          <button type="button" onClick={this.props.onPrizeCreated}
            className="cancel-update-prize-btn"
          >
            Cancel {this.props.userPrize ? "Update" : "Create"}
          </button>
        </div>
      </form>
    );
  }
}

/* old code
export default reduxForm({
  form: "createPrize"
})(CreateOrUpdatePrizeForm); */


/*
1. Not sure if I need mapStateToProps
2. Do I need connect from react-redux?

import { connect } from "react-redux";
const ConnectedCreateOrUpdatePrizeForm = connect()(CreateOrUpdatePrizeForm);

export default reduxForm({
  form: "createPrize"
})(ConnectedCreateOrUpdatePrizeForm);
*/


const mapStateToProps = state => ({
  userPrize: state.prizes.userPrize
});

const ConnectedCreateOrUpdatePrizeForm =
  connect(mapStateToProps)(CreateOrUpdatePrizeForm);

export default reduxForm({
  form: "createprize"
})(ConnectedCreateOrUpdatePrizeForm);
