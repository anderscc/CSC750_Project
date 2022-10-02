import React, { useState } from 'react';
import CourseCheckbox from '../Components/CourseCheckbox';
import { Link } from 'react-router-dom';



const Student = () => {
  //Creates state formFields and setFormfields variable and method
  const [formFields, setFormFields] = useState([
    {firstname: '', lastname: '', courses:'', hoursAvail:'', coursePref:'', facultyPref:''}
  ])

  //method to allow us to input data
  const handleFormChange = (index, event) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  //submit function
  //VALIDTION FUNCTION NEEDS TO BE IMPLEMENTED HERE
  const submit = (e) => {
    e.preventDefault();
    console.log(formFields)
  }

  //method to add Fields to form
  const addFields = () => {
    let newfield = {
      firstname: '', lastname: '', courses:'', hoursAvail:'', coursePref:'', facultyPref:''
    }
    setFormFields([...formFields, newfield])
  }

  //Function to remove a student row
  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  return (
    <div className='studentForm'>
      <form onSubmit={submit}>
        {formFields.map((form, index) => {
          return(
            <div key={index}>
                <input //First Name Input
                    name='fname'
                    placeholder='First Name'
                    onChange={event => handleFormChange(index, event)}
                    value={form.fname}
                />
                <input
                    name='lname'
                    placeholder='Last Name'
                    onChange={event => handleFormChange(index, event)}
                    value={form.lname}
                />
                <input
                    name='hoursAvail'
                    placeholder='Position'
                    onChange={event => handleFormChange(index, event)}
                    value={form.status}
                />
                  <CourseCheckbox
                  onChange = {event => handleFormChange(index, event)}
                  />
                <button onClick={() => removeFields(index)}>Remove</button>
              </div>
            )
        })}
        </form>
      <button onClick={addFields}>Add Student</button>
      <br/>
      <Link to="/course">
        <button>Next Page</button>
      </Link>
    </div>
  );
}
  export default Student;