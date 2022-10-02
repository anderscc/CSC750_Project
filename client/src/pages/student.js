import React, { useState } from 'react';
import NextPage from '../Components/NextPage';
import CourseCheckbox from '../Components/CourseCheckbox';



const Student = () => {

  let newfield = {
      studentName: '',
      classTimes:'',
      hoursAvail:0,
      coursePref:'',
      facultyPref:'',
      officeHours: 0
    }
  //Creates state formFields and setFormfields variable and method
  const [formFields, setFormFields] = useState([newfield])

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
    setFormFields([...formFields, newfield])
  }

  //Function to remove a student row
  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  return (
    <div className='studentForm container'>
      <form onSubmit={submit}>
        {formFields.map((form, index) => {
          return(
            <div key={index}>
              <div className="mb-3">
                <label htmlFor="studentName" className="form-label">Student Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="studentName"
                    placeholder="John Doe"
                    onChange={event => handleFormChange(index, event)}
                    value={form.studentName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="hoursAvail" className="form-label">GA Hours</label>
                <input
                    name='hoursAvail'
                    type={"number"}
                    className="form-control"
                    id="hoursAvail"
                    placeholder="E.g 10"
                    onChange={event => handleFormChange(index, event)}
                    value={form.hoursAvail}
                />
              </div>
                <div className="mb-3">
                <label htmlFor="coursePref" className="form-label">Course Preference</label>
                <input
                    name='coursePref'
                    type={"text"}
                    className="form-control"
                    id="coursePref"
                    placeholder=""
                    onChange={event => handleFormChange(index, event)}
                    value={form.coursePref}
                />
              </div>
                <div className="mb-3">
                <label htmlFor="facultyPref" className="form-label">Faculty Preference</label>
                <input
                    name='coursePref'
                    type={"text"}
                    className="form-control"
                    id="facultyPref"
                    placeholder=""
                    onChange={event => handleFormChange(index, event)}
                    value={form.facultyPref}
                />
              </div>
                                <div className="mb-3">
                <label htmlFor="officeHours" className="form-label">Office Hours Duration</label>
                <input
                    name='officeHours'
                    type={"text"}
                    className="form-control"
                    id="officeHours"
                    placeholder="1"
                    onChange={event => handleFormChange(index, event)}
                    value={form.officeHours}
                />
              </div>

                <div className="mb-3">
                    <label htmlFor="officeHours" className="form-label">Class Times (Enter in this Format MW: 1:00PM - 2:00PM) Separate multiple classes with comma</label>
                    <input
                        name='classTimes'
                        type={"text"}
                        className="form-control"
                        id="classTimes"
                        placeholder="MW: 1:00PM - 2:00PM, TH: 1:00PM - 2:00PM"
                        onChange={event => handleFormChange(index, event)}
                        value={form.officeHours}
                    />
              </div>
                  <CourseCheckbox
                  onChange = {event => handleFormChange(index, event)}
                  />
                <div className={"row"}>
                    <div className={"col"}>
                         <button onClick={addFields}>Add Student</button>
                    </div>
                    <div className={"col"}>
                        <button onClick={() => removeFields(index)}>Remove</button>
                    </div>
                    <div className={"col"}>
                        <button onClick={submit}>Next Page</button>
                    </div>
                </div>
              </div>
            )
        })}
      </form>
    </div>
  );
}
  export default Student;