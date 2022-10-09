import React, { Component, useState } from 'react';
import StudentForm from '../components/StudentForm';

//Student class which allows user to input details about GA's and TA's
class Student extends Component{
  constructor(args) {
    super(args);
    this.state = {
      result: []
    }
  }

  render(){
    return (
      <div>
          <StudentForm values = {this.state.values} 
                        saveValues = {this.state.saveValues}
                        setStep = {this.state.setStep}
                        handleData = {this.handleData.bind(this)}/>
          <button onClick={this.nextStep.bind(this)}>Next Page </button>
      </div>
    )
  }
    
//function to save values to parent and then advance to next page
  nextStep(e) {
    // e.preventDefault()
    // var data = this.StudentForm.data

    // this.props.saveValues(data);
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
    if(this.state.result.length===0)
      {
      var handledData = {
        studentName: data.studentName,
        classTimes: data.classTimes,
        hoursAvail: data.hoursAvail,
        coursePref:data.coursePref,
        facultyPref:data.facultyPref,
        officeHours: data.officeHours,
      }
      this.state.result.push(handledData);
      this.props.saveValues(handledData);
    } else{
        var handledData = {
          studentName: data.studentName,
          classTimes: data.classTimes,
          hoursAvail: data.hoursAvail,
          coursePref:data.coursePref,
          facultyPref:data.facultyPref,
          officeHours: data.officeHours,
        }
        this.state.result.push(handledData);
        this.props.saveValues(handledData);
  }

  this.props.nextStep.bind(this)
  }


}
  export default Student;

//   <div>

// </div>

      // <div className={'container-fluid'}>
      //   <form>
      //     <div className='student-form container'>
      //       <div className="mb-3">
      //         <label htmlFor="studentName" className="form-label">Student Name</label>
      //         <input
      //             type="text"
      //             className="form-control"
      //             ref="studentName"
      //             placeholder="John Doe"
      //             defaultValue={this.props.values.studentName}
      //         />
            // </div>
            // <div className="mb-3">
            //   <label htmlFor="hoursAvail" className="form-label">GA Hours</label>
            //   <input
            //       name='hoursAvail'
            //       type={"number"}
            //       className="form-control"
            //       ref="hoursAvail"
            //       placeholder="E.g 10"
            //       defaultValue={this.props.values.hoursAvail}
            //   />
            // </div>
            // <div className="mb-3">
            //   <label htmlFor="coursePref" className="form-label">Course Preference</label>
            //   <input
            //       name='coursePref'
            //       type={"text"}
            //       className="form-control"
            //       ref="coursePref"
            //       placeholder=""
            //       defaultValue ={this.props.values.coursePref}
            //   />
            // </div>
            // <div className="mb-3">
            //   <label htmlFor="facultyPref" className="form-label">Faculty Preference</label>
            //   <input
            //       name='facultyPref'
            //       type={"text"}
            //       className="form-control"
            //       ref="facultyPref"
            //       placeholder=""
            //       defaultValue ={this.props.values.facultyPref}
            //   />
            // </div>
            // <div className="mb-3">
            //   <label htmlFor="officeHours" className="form-label">Office Hours Duration</label>
            //   <input
            //       name='officeHours'
            //       type={"text"}
            //       className="form-control"
            //       ref="officeHours"
            //       placeholder="1"
            //       defaultValue={this.props.values.officeHours}
            //   />
            // </div>
            // <div className="mb-3">
            //     <label htmlFor="officeHours" className="form-label">Class Times (Enter in this Format MW: 1:00PM - 2:00PM) Separate multiple classes with comma</label>
            //     <input
            //         name='classTimes'
            //         type={"text"}
            //         className="form-control"
            //         ref="classTimes"
            //         placeholder="MW: 1:00PM - 2:00PM, TH: 1:00PM - 2:00PM"
            //         defaultValue={this.props.values.officeHours}
            //     />
      //       </div>
      //     </div>
      //   </form>
      //   <div className={"row"}>
      //     <div className={"col"}>
      //       <button onClick ={this.previousStep.bind(this)}>Previous Page</button>
      //       <button onClick={this.nextStep.bind(this)}>Next Page</button>
      //     </div>
      //   </div>
      // </div>
