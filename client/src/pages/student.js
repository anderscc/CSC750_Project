import React, { useState } from 'react';

const Student = () => {
  const [formFields, setFormFields] = useState([
    {firstname: '', lastname: '', courses:'', status:''}
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

  const addFields = () => {
    let newfield = {
      firstname: '', lastname: '', courses:'', status:''
    }
    setFormFields([...formFields, newfield])
  }

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
                <input
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
                    name='courses'
                    placeholder='Enrolled Courses'
                    onChange={event => handleFormChange(index, event)}
                    value={form.courses}
                />
                <input
                    name='status'
                    placeholder='Position'
                    onChange={event => handleFormChange(index, event)}
                    value={form.status}
                />
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          )
        })}
      </form>
      <button onClick={addFields}>Add Student</button>
      <br/>
      <button onClick={submit}>Submit</button>
    </div>
  );
}
  export default Student;