import React from "react";
// import "./InputRadio.css";

export default class InputRadio extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.meta.active && this.props.meta.active) {
      this.input.focus();
    }
  }

  render() {
    return (
      <div className="form-input-radio">
        <label htmlFor={this.props.input.name}>
          <input
            {...this.props.input}
            type={this.props.type}
            ref={input => (this.input = input)}
          />

          {this.props.label}
          {/* {error}
          {warning} */}

        </label>
      </div>
    );
  }
}
