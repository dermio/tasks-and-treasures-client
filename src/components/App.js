import React, { Component } from 'react';
import './App.css';

import  LoginForm  from "./login-form";

class App extends Component {
  render() {
    return (
      <div className="App">
        Howdy
        <LoginForm />
      </div>
    );
  }
}

export default App;
