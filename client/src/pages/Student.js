import React, { Component, useState } from 'react';
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
                        setStep = {this.state.setStep}
                        handleData = {this.handleData.bind(this)}/>
          <button onClick={this.nextStep.bind(this)}>Next Page </button>
      </div>
    )
  }
    
//function to save values to parent and then advance to next page
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
  }
}
  export default Student;