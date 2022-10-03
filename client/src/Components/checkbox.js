import React from "react";



const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" onChange={onChange} />
        {label}
      </label>
    );
  };

  export default Checkbox;