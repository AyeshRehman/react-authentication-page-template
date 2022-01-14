import React, { Component } from "react";

class CustomDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeElementType: "dropdown"
    };
  }

  dropDownChanged(e) {
    if (e.target.value === "custom") {
      this.setState({ activeElementType: "input" });
    }
  }

  dropDownComp() {
    return (
      <select onChange={e => this.dropDownChanged(e)}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="custom">Type Your own</option>
      </select>
    );
  }

  inputFieldComp() {
    return <input />;
  }

  render() {
    return (
      <div >
        {this.state.activeElementType === "dropdown"
          ? this.dropDownComp()
          : this.inputFieldComp()}
      </div>
    );
  }
}

export default CustomDropDown;
