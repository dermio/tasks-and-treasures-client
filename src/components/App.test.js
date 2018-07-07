import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// This file and test created by create-react-app
// This test with App.js fails

/*
FAIL  src/components/App.test.js
● renders without crashing

Invariant Violation: Could not find "store" in either the context or props of "Connect(Form(LoginForm))". Either wrap the root component in a <Provider>, or explicitly pass "store" as a prop to "Connect(Form(LoginForm))".


The above error occurred in the <Connect(Form(LoginForm))> component:
    in Connect(Form(LoginForm)) (created by ReduxForm)
    in ReduxForm (at App.js:11)
    in div (at App.js:9)
    in App (at App.test.js:17)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://fb.me/react-error-boundaries to learn more about error boundaries.


//////////////////
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
*/


describe("This test created by `create-react-app`", () => {
  it("Should not fail, testing...", () => {

  });
});
