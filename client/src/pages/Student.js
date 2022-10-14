import React, { Component, useState } from 'react';
//import StudentForm from '../components/StudentForm';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Navigate, useNavigate } from 'react-router-dom';

//Student class which allows user to input details about GA's and TA's
class Student extends Component {
  constructor(args) {
    super(args);
    this.state = {
      student: {
        semester: '',
        studentName: '',
        classTimes: '',
        hoursAvail: 0,
        coursePref: '',
        facultyPref: '',
        officeHours: 0,
        studentType: 'GA'
      }
    }
    this.onChangeValue = this.onChangeValue.bind(this)
    this.__onSelect = this.__onSelect.bind(this)
  }

  onChangeValue(event) {
    console.log(event.target.value);
    console.log(event.target.name)
    const name = event.target.name
    const value = event.target.value
    this.setState({
      student: {
        ...this.state.student,
        [name]: value
      }
    });
    console.log(event.target.value);
  }
  __onSelect(option) {
    console.log('You selected ', option.value)
    const value = option.value
    this.setState({
      student: {
        ...this.state.student,
        semester: value
      }
    });
  }

  changeHandler = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      student: {
        ...this.state.student,
        [name]: value
      }
    });
  }
  onSubmit = () => {
    alert(JSON.stringify(this.state.student));
  }


  render() {
    const option = [{ value: 'Fall 2022' }, { value: 'Spring 2022' }, { value: 'Fall 2021' }] //retrieve student names from database

    return (
      <div className={'container-fluid'}>
        <h1>Student Page</h1>
        <form>
          <div>
            <div className='studentForm container'>
              <div className="mb-3">
                <label htmlFor="semester" className="form-label">Semester</label>
                <Dropdown
                  options={option}
                  name="semester"
                  value={this.state.student.semester}
                  onChange={this.__onSelect}
                  placeholder="Fall 2022"
                />
              </div>
              <div className="mb-3" onChange={this.onChangeValue}>
                Select Student Type:
                <input type="radio" name="studentType" value="GA" defaultChecked="true" /> GA
                <input type="radio" name="studentType" value="TA" /> TA
              </div>
              <div className="mb-3">
                <label htmlFor="studentName" className="form-label">Student Name</label>
                <input
                  type="text"
                  className="form-control"
                  ref="studentName"
                  placeholder="John Doe"
                  defaultValue={this.state.student.studentName}
                  onChange={this.changeHandler}
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
                  defaultValue={this.state.student.hoursAvail}
                  onChange={this.changeHandler}
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
                  defaultValue={this.state.student.coursePref}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="facultyPref" className="form-label">Faculty Preference</label>
                <input
                  name='coursePref'
                  type={"text"}
                  className="form-control"
                  ref="facultyPref"
                  placeholder=""
                  defaultValue={this.state.student.facultyPref}
                  onChange={this.changeHandler}
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
                  defaultValue={this.state.student.officeHours}
                  onChange={this.changeHandler}
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
                  defaultValue={this.state.student.officeHours}
                  onChange={this.changeHandler}
                />
              </div>

            </div>
          </div>
        </form>

        <div className={"row"}>
          <div className={"col"}>
            {/* <button onClick={useNavigate('course')}>Next Page </button> */}
            <button onClick={this.onSubmit}>Add Student</button>
          </div>
        </div>
      </div>
    )
  }




  /*//function to save values to parent and then advance to next page
    nextStep(e) {
      this.props.nextStep();
    }
  
    //function to save values to parent and then go back to previous page
    previousStep(e) {
      var data = {
        studentName: this.refs.studentName.value,
        classTimes: this.refs.classTimes.value,
        hoursAvail: this.refs.hoursAvail.value,
        coursePref:this.refs.coursePref.value,
        facultyPref:this.refs.facultyPref.value,
        officeHours: this.refs.officeHours.value,
        
      }
  
      this.props.saveValues(data);
      this.props.previousStep(data);
    }
  
    handleData(data){
      if(this.state.studentResult.length===0)
        {
        var handledData = {
          studentName: data.studentName,
          classTimes: data.classTimes,
          hoursAvail: data.hoursAvail,
          coursePref:data.coursePref,
          facultyPref:data.facultyPref,
          officeHours: data.officeHours,
        }
        this.props.students.push(handledData)
      } else{
          var handledData = {
            studentName: data.studentName,
            classTimes: data.classTimes,
            hoursAvail: data.hoursAvail,
            coursePref:data.coursePref,
            facultyPref:data.facultyPref,
            officeHours: data.officeHours,
          }
          this.props.saveValues(handledData);
    }
    this.props.nextStep.bind(this)
    }*/
}
export default Student;