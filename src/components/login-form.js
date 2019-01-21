import React from "react";
import { Field, reduxForm /*, focus */} from "redux-form";
import { Link } from "react-router-dom";

// import Input from "./input";
import { login } from "../actions/auth";
//import { required, nonEmpty } from "../validators";

import "./login-form.css";

export class LoginForm extends React.Component {
  onSubmit(values) {
    let { username, password } = values;
    return this.props.dispatch(login(username, password));
  }

  render() {
    return (
      <div className="login">
        <form
          onSubmit={this.props.handleSubmit(
            values => this.onSubmit(values)
          )}
          className="login-form"
        >
          <h3 className="login-name">Login Form</h3>
          <label htmlFor="username">Username</label>
          <Field
            component="input"
            type="text"
            name="username"
            id="username"

          />
          <label htmlFor="password">Password</label>
          <Field
            component="input"
            type="password"
            name="password"
            id="password"

          />
          <button className="login-btn">LOGIN</button>
          <Link to="/register">
            <button>Create account</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'login',
  //onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);

