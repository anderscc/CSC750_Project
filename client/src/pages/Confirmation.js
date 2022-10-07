import React, { Component } from "react";

//Confirmation page that summarizes previous pages contents
class Confirmation extends Component {
    render(){
        return(
            <div>
                <h2> Confirmation Page</h2>
                <h3>Student: </h3>
                <div>
                    <li>Student Name: {this.props.values.studentName}</li>
                    <li>GA Hours: {this.props.values.hoursAvail} </li>
                    <li>Course Preference: {this.props.values.coursePref}</li>
                    <li>Faculty Preference: {this.props.values.facultyPref}</li>
                    <li>Office Hours: {this.props.values.officeHours}</li>
                    <li>Class Times: {this.props.values.classTimes} </li>
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
}

export default Confirmation;

