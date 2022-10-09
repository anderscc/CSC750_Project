import React, { Component } from "react";

//Confirmation page that summarizes previous pages contents
class Confirmation extends Component {

    render(){
        console.log(this.props.values)
        return(
            <div>
                <div className={'container'}>
                    <h2> Confirmation Page</h2>
                    <div className= "confirmation-page mb-3">
                        <h3>Student: </h3>
                            <li>Student Name: {this.props.values.studentName}</li>
                            <li>GA Hours: {this.props.values.hoursAvail} </li>
                            <li>Course Preference: {this.props.values.coursePref}</li>
                            <li>Faculty Preference: {this.props.facultyPref}</li>
                            <li>Office Hours: {this.props.values.officeHours}</li>
                            <li>Class Times: {this.props.values.classTimes} </li>
                    </div>
                <div>
                    <div>
                    <h3>Courses: </h3>
                        <li>Course Or Lab: {this.props.values.courseCode}</li>
                        <li>Course Code: {this.props.values.courseCode}</li>
                        <li>Course Name: {this.props.values.courseName} </li>
                        <li>Course Section: {this.props.values.courseSection}</li>
                        <li>Course Meet Times: {this.props.values.courseMeetTimes}</li>
                        <li>Course Faculty: {this.props.values.courseFaculty}</li>
                        <li>Course Activities: {this.props.values.courseActivities} </li>
                        <li>Activity Times: {this.props.values.activityTimes} </li>
                        <li>GA Preference: {this.props.values.gaPreference} </li>
                    </div><br></br>
                    <div className={"row"}>
                        <div className={"col"}>
                            <button onClick ={this.previousStep.bind(this)}>Previous Page</button>
                            <button onClick={this.submit.bind(this)}>Submit</button>
                        </div>
                    </div>
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
}

export default Confirmation;

