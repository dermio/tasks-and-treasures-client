import React from "react";
import { Field, reduxForm, /* focus */ } from "redux-form";

// import Input from "./input";

export class RegistrationForm extends React.Component {

  render() {
    return (
      <div>
        <h2>Registration Form</h2>
        <form>
          <label htmlFor="username">Username</label>
          <Field
            name="username"
            component="input"
          />
        </form>
      </div>
    );
  }

}

export default reduxForm({
  form: "registration"
})(RegistrationForm);
