import React, { Component, useState } from 'react';
import CourseCheckbox from '../Components/CourseCheckbox';
import { Link } from 'react-router-dom';



class Student extends Component{
  constructor(args) {
    super(args);
    this.state = {
      
    }
  }

  render(){
    console.log(this.props)
    return (
      <div>Testing page
        <form>
          <div className='studentForm container'>
            <div className="mb-3">
              <label htmlFor="studentName" className="form-label">Student Name</label>
              <input
                  type="text"
                  className="form-control"
                  ref="studentName"
                  placeholder="John Doe"
                  defaultValue={this.props.values.studentName}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="hoursAvail" className="form-label">GA Hours</label>
              <input
                  name='hoursAvail'
                  type={"number"}
                  className="form-control"
                  ref="hoursAvail"
                  placeholder="E.g 10"
                  defaultValue={this.props.values.hoursAvail}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="coursePref" className="form-label">Course Preference</label>
              <input
                  name='coursePref'
                  type={"text"}
                  className="form-control"
                  ref="coursePref"
                  placeholder=""
                  defaultValue ={this.props.values.coursePref}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="facultyPref" className="form-label">Faculty Preference</label>
              <input
                  name='facultyPref'
                  type={"text"}
                  className="form-control"
                  ref="facultyPref"
                  placeholder=""
                  defaultValue ={this.props.values.facultyPref}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="officeHours" className="form-label">Office Hours Duration</label>
              <input
                  name='officeHours'
                  type={"text"}
                  className="form-control"
                  ref="officeHours"
                  placeholder="1"
                  defaultValue={this.props.values.officeHours}
              />
            </div>
            <div className="mb-3">
                <label htmlFor="officeHours" className="form-label">Class Times (Enter in this Format MW: 1:00PM - 2:00PM) Separate multiple classes with comma</label>
                <input
                    name='classTimes'
                    type={"text"}
                    className="form-control"
                    ref="classTimes"
                    placeholder="MW: 1:00PM - 2:00PM, TH: 1:00PM - 2:00PM"
                    defaultValue={this.props.values.officeHours}
                />
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <button onClick ={this.previousStep.bind(this)}>Previous Page</button>
                    <button onClick={this.nextStep.bind(this)}>Next Page</button>
                </div>
            </div>

          </div>
      </form>
    </div>
    )
  }
    
//function to save values to parent and then advance to next page
  nextStep(e) {
    e.preventDefault()
    var data = {
      studentName: this.studentName.value,
      classTimes: this.classTimes.value,
      hoursAvail: this.hoursAvail.value,
      coursePref:this.coursePref.value,
      facultyPref:this.facultyPref.value,
      officeHours: this.officeHours.value
    }

    this.props.saveValues(data);
    this.props.nextStep();
  }

  //function to save values to parent and then go back to previous page
  previousStep(e) {
    var data = {
      studentName: this.studentName.value,
      classTimes: this.classTimes.value,
      hoursAvail: this.hoursAvail.value,
      coursePref:this.coursePref.value,
      facultyPref:this.facultyPref.value,
      officeHours: this.officeHours.value
    }

    this.props.saveValues(data);
    this.props.previousStep();
  }

  }

  export default Student;