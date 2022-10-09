import React, { Component } from "react";


// Checkbox component to create custom checkbox that has custo labem
class Checkbox extends Component {
  constructor(args) {
    super(args);
    this.state = {
      label: this.props.label, value: this.props.Checkbox
    }
  }
  render(){
    return (
      <label>
        <input type="checkbox" value={this.value} />
        {this.label}
      </label>
    );
  };
}

  export default Checkbox;