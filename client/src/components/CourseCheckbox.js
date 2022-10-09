import React, { Component } from "react";
import Checkbox from "./Checkbox";


class CourseCheckbox extends Component {
    constructor(args) {
        super(args);
        this.state = {
        }
    }

    render(){
        return (
            <div> Choose the Classes you are currently enrolled in:
                <Checkbox
                    label = "CSC 001"
                    value = {this.props.Checkbox}
                />
                <Checkbox
                    label = "CSC 002"
                    value = {this.props.Checkbox}
                />
            </div>
        );
    };
}

  export default CourseCheckbox;