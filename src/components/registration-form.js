import React from "react";
import { Field, reduxForm, /* focus */ } from "redux-form";

// import Input from "./input";

import { required, nonEmpty, isTrimmed, length, matches } from "../validators";

const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches("password");

export class RegistrationForm extends React.Component {

  render() {
    return (
      <div>
        <h2>Registration Form</h2>
        <form>
          <label htmlFor="username">Username</label>
          <Field
            component="input"
            type="text"
            name="username"
            validate={[required, nonEmpty, isTrimmed]}
          />
          <label htmlFor="password">Password</label>
          <Field
            component="input"
            type="password"
            name="password"
            validate={[required, passwordLength, isTrimmed]}
          />
          <label htmlFor="passwordConfirm">Confirm password</label>
          <Field
            component="input"
            type="password"
            name="passwordConfirm"
            validate={[required, nonEmpty, matchesPassword]}
          />
        </form>
      </div>
    );
  }

}

export default reduxForm({
  form: "registration"
})(RegistrationForm);
