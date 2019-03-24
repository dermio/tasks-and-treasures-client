import React from "react";
import { Field, reduxForm, focus} from "redux-form";
import { Link } from "react-router-dom";

import Input from "./Input";
import { login } from "../actions/auth";
import { required, nonEmpty } from "../validators";

import "./login-form.css";

export class LoginForm extends React.Component {
  onSubmit(values) {
    let { username, password } = values;
    return this.props.dispatch(login(username, password));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }

    return (
      <div className="login">
        <form
          onSubmit={this.props.handleSubmit(
            values => this.onSubmit(values)
          )}
          className="login-form"
        >
          {error}
          <h2 className="login-name">Login Form</h2>
          <Field
            component={Input}
            type="text"
            name="username"
            id="username"
            label="Username"
            validate={[required, nonEmpty]}
          />
          <Field
            component={Input}
            type="password"
            name="password"
            id="password"
            label="Password"
            validate={[required, nonEmpty]}
          />
          <div className="form-buttons">
            <button className="login-btn"
              disabled={this.props.pristine || this.props.submitting}
            >
              LOGIN
            </button>
            <Link to="/register">
              <button>Create account</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "login",
  onSubmitFail: (errors, dispatch) => dispatch(focus("login", "username"))
})(LoginForm);

