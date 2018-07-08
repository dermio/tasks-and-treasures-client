import React from "react";
import { Field, reduxForm /*, focus */} from "redux-form";

// import Input from "./input";
import { login, clearAuth } from "../actions/auth";
//import { required, nonEmpty } from "../validators";

export class LoginForm extends React.Component {
  onSubmit(values) {
    let { username, password } = values;
    return this.props.dispatch(login(username, password));
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(clearAuth());
    // To logout don't need to talk to server. Just need to clear token.
    localStorage.removeItem("authToken");
    /* Once logged out need to redirect to login page.
    In React Router update a prop in the state and
    use Redirect component from the Router. */
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(
          values => this.onSubmit(values)
        )}
      >
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
        <button>LOGIN</button>

        <button type="button" onClick={(e) => {this.handleLogout(e)}}>
          LOG OUT
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  //onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);

