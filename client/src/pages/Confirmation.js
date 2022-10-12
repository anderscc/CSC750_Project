import React, { Component } from "react";

//Confirmation page that summarizes previous pages contents
class Confirmation extends Component {
    constructor(args){
        super(args);
        this.state = {
            formValues : [{
            }]
        }
    }

    render(){
        console.log(this.props.students)
        console.log(this.props.courses)
        return(
            <div className={'container'}>
                <h2> Confirmation Page</h2>
                <h3>Student:</h3>
                <div>
                {this.props.students.map((element, index) => (
                <div className="form-inline" key={index}>
                    <li>Student Name: {element.studentName}</li>
                    <li>Class Times: {element.classTimes}</li>
                    <li>Hours Avail: {element.hoursAvail}</li>
                    <li>Course Pref: {element.coursePref}</li>
                    <li>Faculty Pref: {element.facultyPref}</li><br></br>
                </div>
                ))}
                <h3>Courses:</h3>
                {this.props.courses.map((element, index) => (
                <div className="form-inline" key={index}>
                    <li>Course Code: {element.courseCode}</li>
                    <li>Course Name: {element.courseName}</li>
                    <li>Course Section: {element.courseSection}</li>
                    <li>Course Meet Times: {element.courseMeetTimes}</li>
                    <li>Course Activities: {element.courseActivities}</li>
                    <li>Activity Times: {element.activityTimes}</li>
                    <li>GA Preference: {element.gaPreference}</li>
                    <li>Class Type: {element.classType}</li>
                    <br></br>
                </div>
                ))}
                </div>
                    <div className={"row"}>
                        <div className={"col"}>
                            <button onClick ={this.previousStep.bind(this)}>Previous Page</button>
                            <button onClick={this.submit.bind(this)}>Submit</button>
                        </div>
                    </div>
                </div>
        )
    }

//function to submit form - INCOMPLETE
    submit(e) {
        e.preventDefault();
        this.props.nextStep();
    } 

    //function to go back to previous page - INCOMPLETE
  previousStep(e) {
    this.props.previousStep();
  }

  addFormFields(students){
console.log(" ")
  }
}

export default Confirmation;

