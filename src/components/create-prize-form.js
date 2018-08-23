import React from "react";
import { Field, reduxForm } from "redux-form";

export class CreatePrizeForm extends React.Component {
  onSubmit(values) {
    console.log(values);
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
        <button>Create Prize</button>
      </form>
    );
  }
}

export default reduxForm({
  form: "createPrize"
})(CreatePrizeForm);

