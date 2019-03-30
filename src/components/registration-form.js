import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Input from "./Input";
import InputRadio from "./InputRadio";
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

    console.log(role);
    /* First Register user, then Login */
    return this.props.dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    /* Check if the radio button for role has been selected for
    creating a new user. */
    let showRoleError =
      this.props.registration &&
      this.props.registration.syncErrors &&
      !!this.props.registration.syncErrors.role &&
      this.props.registration.submitFailed;

    return (
      <div className="registration">
        <form
          onSubmit={this.props.handleSubmit(
            values => this.onSubmit(values)
          )}
          className="registration-form"
        >
          <h2 className="registration-name">Registration Form</h2>
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

          <fieldset className="radio-fieldset">
            <legend>Role</legend>
            {
              showRoleError ?
                <div className="form-error">Role is required</div> : ""
            }

            <Field
              component={InputRadio}
              type="radio"
              name="role"
              label="Parent"
              value="parent"
              validate={[required]}
            />

            <Field
              component={InputRadio}
              type="radio"
              name="role"
              label="Child"
              value="child"
              validate={[required]}
            />
          </fieldset>

          <div className="registration-form-buttons">
            <button type="submit" className="registration-btn"
              disabled={this.props.pristine || this.props.submitting}
            >
              Create account
            </button>
            <Link to="/login">
              <button className="goto-login-btn">Login</button>
            </Link>
          </div>

        </form>
      </div>
    );
  }

}


const mapStateToProps = state => ({
  registration: state.form.registration
});


/* The RegistrationForm is passed as a component to `reduxForm` HOC.
Have not figured how to access `state.form.registration.syncErrors`
to check the role validation using reduxForm. So pass the
reduxForm connected RegistrationForm to Redux itself via `connect`
in order to access syncErrors state. This is a hack.
There should be a way to use `reduxForm` alone, without
using `connect`. */
export default connect(mapStateToProps)(reduxForm({
  form: "registration",
  onSubmitFail: (errors, dispatch) =>
    dispatch( focus("registration", Object.keys(errors)[0] ) )
})(RegistrationForm));

