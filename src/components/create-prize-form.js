import React from "react";
import { Field, reduxForm } from "redux-form";

import { createPrize } from "../actions/prizes";

export class CreatePrizeForm extends React.Component {
  onSubmit(values) {
    console.log(values);
    this.props.dispatch(createPrize({
      prizeName: values.prizename
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
      </form>
    );
  }
}

export default reduxForm({
  form: "createPrize"
})(CreatePrizeForm);


/*
1. Not sure if I need mapStateToProps
2. Do I need connect from react-redux?

import { connect } from "react-redux";
const ConnectedCreatePrizeForm = connect()(CreatePrizeForm);

export default reduxForm({
  form: "createPrize"
})(ConnectedCreatePrizeForm);
*/
