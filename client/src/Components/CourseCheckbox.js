import React from "react";
import Checkbox from "./Checkbox";


const CourseCheckbox = ({value, onChange }) => {
    return (
        <div> Choose the Classes you are currently enrolled in:
            <Checkbox
                label = "CSC 001"
                onChange = {onChange}
            />
            <Checkbox
                label = "CSC 002"
                onChange = {onChange}
            />
        </div>
    );
  };

  export default CourseCheckbox;