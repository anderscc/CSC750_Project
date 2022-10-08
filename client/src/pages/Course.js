import React, { Component } from 'react';
import { useState } from 'react';
class Course extends Component {
  constructor(args) {
    super(args);
    this.state = {
        type:"course",
        courseName:"",
        classTime:"",
        courseSection:"",
        instructor:"",
        courseActivity:"",
        GAPref:"",
        courseCode:"",
    }
    // for radio button 
    this.onValueChange = this.onValueChange.bind(this);


    this.formSubmit = this.formSubmit.bind(this);
  }

  onValueChange(event,state_var) {
    this.setState({
      state_var: event.target.value
    });
    alert(this.state.state_var)
  }

  formSubmit(event) {
    event.preventDefault();
    console.log(this.state.selectedOption)
  }

  

  render(){
  return (
    <div className={'container'}>
      <h1>Course Page</h1>
        <form onSubmit={this.formSubmit}>
            <div className='courseForm container'>
            <div className="mb-3">
              <label>
                <input defaultChecked="true" name="courseType" type="radio" value="course" 
                checked={this.state.type = this.value}
                onChange={this.onValueChange("type")}/>
                Course
              </label>
              {"    "}
              <label>
                <input name="courseType" type="radio" value="lab"
                checked={this.state.selectedOption = this.value}
                onChange={this.onValueChange} />
                Lab
              </label>
            </div>  
            <div className="mb-3">
              <label htmlFor="courseCode" className="form-label">Course Code: </label>
                <input
                    type="text"
                    className="form-control"
                    ref="courseCode"
                    placeholder="CSC750"
                    defaultValue={this.props.values.courseName}
                />
            </div>
            <div className="mb-3">
              <label htmlFor="courseSection" className="form-label">Course Section: </label>
                <input
                    type={"number"}
                    className="form-control"
                    ref="courseSection"
                    placeholder="001"
                    defaultValue={this.props.values.courseSection}
                />
              </div>
            <div className="mb-3">
              <label htmlFor="courseTime" className="form-label">Class Time: </label>
              <input
                type={"yexy"}
                className="form-control"
                ref="classTime"
                placeholder="eg. MWF 5:00pm - 5:45pm"
                defaultValue={this.props.values.classTime}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="instructor" className="form-label">Instructor</label>
                <input
                    name='instructor'
                    type="text"
                    className="form-control"
                    ref="instructor"
                    placeholder="Dr. Iqbal"
                    defaultValue={this.props.values.instructor}
                />
            </div>
            
              <div className="mb-3">
                <label htmlFor="courseActivicty" className="form-label">Course Activity: </label>
                  <input
                      type="text"
                      className="form-control"
                      ref="courseActivicty"
                      placeholder="Grading"
                      defaultValue={this.props.values.courseActivity}
                  />
                  <input
                      type="text"
                      className="form-control"
                      ref="courseActivicty"
                      placeholder="0.5 hours"
                      defaultValue={this.props.values.courseActivity}
                  />
              </div>
              <div className="mb-3">
                <label htmlFor="gaPref" className="form-label">GA Preference</label>
                <input
                    name='GAPref'
                    type={"text"}
                    className="form-control"
                    ref="GAPref"
                    placeholder="None"
                    defaultValue ={this.props.values.GAPref}
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

//function to advance to next page
  nextStep(e) {
    var data = {
        courseCode: this.refs.courseCode.value,
        courseName: this.refs.courseName.value,
        courseSection: this.refs.courseSection.value,
        courseMeetTimes:this.refs.courseMeetTimes.value,
        courseFaculty:this.refs.courseFaculty.value,
        courseActivities: this.refs.courseActivities.value,
        activityTimes: this.refs.activityTimes.value,
        gaPreference: this.refs.gaPreference.value,
      }
  
      this.props.saveValues(data);
      this.props.nextStep();
    }
  

  //function to go back to previous page
  previousStep(e) {
    var data = {
        courseCode: this.refs.courseCode.value,
        courseName: this.refs.courseName.value,
        courseSection: this.refs.courseSection.value,
        courseMeetTimes:this.refs.courseMeetTimes.value,
        courseFaculty:this.refs.courseFaculty.value,
        courseActivities: this.refs.courseActivities.value,
        activityTimes: this.refs.activityTimes.value,
        gaPreference: this.refs.gaPreference.value,
    }
  
      this.props.saveValues(data);
      this.props.previousStep();
}
}
export default Course;

