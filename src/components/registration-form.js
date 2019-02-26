import React from "react";
import { Field, reduxForm, /* focus */ } from "redux-form";
import { Link } from "react-router-dom";

import Input from "./Input";
import { registerUser } from "../actions/users";
import { login } from "../actions/auth";
import { required, nonEmpty, isTrimmed, length, matches } from "../validators";

import "./registration-form.css";

const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches("password");

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { username, password, familyCode, role } = values;
    const user = { username, password, familyCode, role };

    /* First Register user, then Login */
    return this.props.dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    return (
      <div className="registration">
        <form
          onSubmit={this.props.handleSubmit(
            values => this.onSubmit(values)
          )}
          className="registration-form"
        >
          <h3 className="registration-name">Registration Form</h3>
          <Field
            component={Input}
            type="text"
            name="username"
            label="Username"
            validate={[required, nonEmpty, isTrimmed]}
          />
          <Field
            component={Input}
            type="password"
            name="password"
            label="Password"
            validate={[required, passwordLength, isTrimmed]}
          />
          <Field
            component={Input}
            type="password"
            name="passwordConfirm"
            label="Confirm password"
            validate={[required, nonEmpty, matchesPassword]}
          />
          <Field
            component={Input}
            type="text"
            name="familyCode"
            label="Family code"
            validate={[required, nonEmpty, isTrimmed]}
          />

          <label htmlFor="role">Role</label>
          <label>
            <Field
              component="input"
              type="radio"
              name="role"
              value="parent"
              validate={[required]}
            />
            {" Parent"}
          </label>
          <label>
            <Field
              component="input"
              type="radio"
              name="role"
              value="child"
              validate={[required]}
            />
            {" Child"}
          </label>

          <button type="submit" className="registration-btn">
            Create account
          </button>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </form>
      </div>
    );
  }

}

export default reduxForm({
  form: "registration"
})(RegistrationForm);
