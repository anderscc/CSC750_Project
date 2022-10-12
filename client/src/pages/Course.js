
import React, { Component } from 'react';
import CourseForm from '../components/CourseForm';
  
class Course extends Component {
  constructor(args) {
    super(args);
    this.state = {
      courseResult: []
    }
  }
  render(){
    return (
      <CourseForm values = {this.state.values} 
        nextStep = {this.nextStep.bind(this)}
        previousStep = {this.previousStep.bind(this)}
        saveValues = {this.state.saveValues}
        setStep = {this.state.setStep}
        handleData = {this.handleData.bind(this)}/>
    )
}

//function to save values to parent and then advance to next page
nextStep(e) {
  this.props.nextStep();
}

//function to save values to parent and then go back to previous page
previousStep(e) {
  this.props.previousStep();
}

handleData(data){
  var handledData = {
    officeHours: data.studentName,
    courseCode: data.classTimes,
    courseName: data.hoursAvail,
    courseSection:data.coursePref,
    courseMeetTimes:data.facultyPref,
    courseFaculty: data.officeHours,
    courseActivities: data.officeHours,
    activityTimes: data.officeHours,
    gaPreference: data.officeHours,
    classType: data.officeHours,
  }
  this.state.courseResult.length===0? this.props.courses.push(handledData) : this.props.saveValues(handledData)
}
}
export default Course;

/*
    <div className={'container-fluid'}>
      <h1>This Course Page</h1>
      <div>
        <form>

          <div className='course-form container'>
            <div className="mb-3">
                <label htmlFor="studentName" className="form-label">Is This Class a Course or a Lab:</label><br></br>
                <input
                  type="radio"
                  ref="classType"
                  value = "Lab"
                  placeholder="John Doe"
                /> Course
                <input
                  type="radio"
                  ref="classType"
                  value = "Course"
                  placeholder="John Doe"
                /> Lab
              </div>
            <div className="mb-3">
              <label htmlFor="studentName" className="form-label">Course Code</label>
              <input
                type={"number"}
                className="form-control"
                ref="courseCode"
                placeholder="0"
                defaultValue={this.props.values.courseCode}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="hoursAvail" className="form-label">Course Name</label>
              <input
                name='hoursAvail'
                type="text"
                className="form-control"
                ref="courseName"
                placeholder="0"
                defaultValue={this.props.values.courseName}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="studentName" className="form-label">Course Section</label>
              <input
                type={"number"}
                className="form-control"
                ref="courseSection"
                placeholder="0"
                defaultValue={this.props.values.courseSection}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="studentName" className="form-label">Course Meet Times</label>
              <input
                type="text"
                className="form-control"
                ref="courseMeetTimes"
                placeholder="MWF 12:00 PM - 1:30 PM"
                defaultValue={this.props.values.courseMeetTimes}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="studentName" className="form-label">Course Faculty</label>
              <input
                type="text"
                className="form-control"
                ref="courseFaculty"
                placeholder="John Doe"
                defaultValue={this.props.values.courseFaculty}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="studentName" className="form-label">Course Activities</label>
              <input
                type="text"
                className="form-control"
                ref="courseActivities"
                placeholder="3 Quizzes, 4 Exams, 1 Mid-Term"
                defaultValue={this.props.values.courseActivities}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="studentName" className="form-label">Activity Times</label>
              <input
                type="text"
                className="form-control"
                ref="activityTimes"
                placeholder="30 minutes"
                defaultValue={this.props.values.activityTimes}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="studentName" className="form-label">GA Preference</label>
              <input
                type="text"
                className="form-control"
                ref="gaPreference"
                placeholder="John Doe"
                defaultValue={this.props.values.gaPreference}
              />
            </div>

          </div>
        </form>
        <div className={"row"}>
          <div className={"col"}>
            <button onClick ={this.previousStep.bind(this)}>Previous Page</button>
            <button onClick={this.nextStep.bind(this)}>Next Page</button>
          </div>
        </div>
      </div>
    </div>
  */