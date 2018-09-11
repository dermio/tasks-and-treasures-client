import React from "react";
import { Field, reduxForm, /* focus */ } from "redux-form";

// import Input from "./input";

import { required, nonEmpty, isTrimmed, length, matches } from "../validators";

const passwordLength = length({ min: 10, max: 72 });

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
            validate={ [required, nonEmpty, isTrimmed] }
          />
        </form>
      </div>
    );
  }

}

export default reduxForm({
  form: "registration"
})(RegistrationForm);
