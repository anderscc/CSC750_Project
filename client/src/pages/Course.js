
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
      courseCode: data.courseCode,
      courseName: data.courseName,
      courseSection:data.courseSection,
      courseMeetTimes:data.courseMeetTimes,
      courseFaculty: data.courseFaculty,
      courseActivities: data.courseActivities,
      activityTimes: data.activityTimes,
      gaPreference: data.gaPreference,
      classType: data.classType,
    }
    this.state.courseResult.length===0? this.props.courses.push(handledData) : this.props.saveValues(handledData)
    }
}
export default Course;