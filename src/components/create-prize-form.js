import React from "react";
import { Field, reduxForm } from "redux-form";

import { createOrUpdatePrize } from "../actions/prizes";

export class CreatePrizeOrUpdateForm extends React.Component {
  onSubmit(values) {
    this.props.dispatch(createOrUpdatePrize({
      prizeName: values.prizename,
      onPrizeCreated: this.props.onPrizeCreated
    }));
  }

  render() {
    return (
      <form onSubmit={
        this.props.handleSubmit(values => this.onSubmit(values))
      }>
        <label htmlFor="prizename">Prize Name</label>
        <Field
          component="input"
          type="text"
          name="prizename"
          id="prizename"
        />
        <button type="submit">Submit Prize</button>
        <button type="button" onClick={this.props.onPrizeCreated}>
          Cancel Create
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: "createPrize"
})(CreatePrizeOrUpdateForm);


/*
1. Not sure if I need mapStateToProps
2. Do I need connect from react-redux?

import { connect } from "react-redux";
const ConnectedCreatePrizeOrUpdateForm = connect()(CreatePrizeOrUpdateForm);

export default reduxForm({
  form: "createPrize"
})(ConnectedCreatePrizeOrUpdateForm);
*/
