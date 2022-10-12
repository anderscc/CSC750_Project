import React, { Component } from 'react';
import StudentForm from '../components/StudentForm';

//Student class which allows user to input details about GA's and TA's
class Student extends Component{
  constructor(args) {
    super(args);
    this.state = {
      studentResult: []
    }
  }
  render(){
    return (
      <div>
          <StudentForm values = {this.state.values} 
                        nextStep = {this.nextStep.bind(this)}
                        saveValues = {this.state.saveValues}
                        previousStep = {this.previousStep.bind(this)}
                        setStep = {this.state.setStep}
                        handleData = {this.handleData.bind(this)}/>
      </div>
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
      studentName: data.studentName,
      classTimes: data.classTimes,
      hoursAvail: data.hoursAvail,
      coursePref:data.coursePref,
      facultyPref:data.facultyPref,
      officeHours: data.officeHours,
    }
    this.state.studentResult.length===0? this.props.students.push(handledData) : this.props.saveValues(handledData)
  }
}
  export default Student;