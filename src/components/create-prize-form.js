import React from "react";
import { Field, reduxForm } from "redux-form";

export class CreatePrizeForm extends React.Component {
  onSubmit(value) {
    console.log(value);
  }

  render() {
    return (
      <form onSubmit={
        this.props.handleSubmit(value => this.onSubmit(value))
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

