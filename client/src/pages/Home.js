import React, { Component } from "react";

class Home extends Component {
    constructor(args) {
        super(args);
        this.state = {
        }
      }

    render(){
        return(
            <div className={'container-fluid'}>
                <div>
                    <h1> Welcome to the Graduate Assistant Systems Scheduler (GASS)!</h1>
                    <p> Here we aim to solve your problems of scheduling conflicts between
                        busy schedules of Graduate Assistants and Teaching Assistants as well
                        as meeting the needs of faculty and course requirements. This software also
                        schedules the necessary time required for lab meetings while respecting the time
                        constraints of half and full-time graduate/teaching assistants.
                    </p>
                </div>
                <div>
                    <p> This button below tests the next page feature to see if it is working</p>
                    <button onClick={this.nextStep.bind(this)}>Next Page</button>
                </div>
                <div>
                    <p> If you have previously generated a schedule, select which schedule you are
                        trying to use here to view previous data/schedules</p>
                    <button onClick = {this.previousData.bind(this)}>Previous Data</button>
                </div>
                
            </div>
        )
    }
    
    //function to advance to the next page
    nextStep() {
        this.props.nextStep();
      }
    
    //function to allow user to retrieve data from previously generated schedule
    previousData(){
        var data = {
            studentName: this.props.values.studentName,
            classTimes: this.props.values.classTimes,
            hoursAvail: this.props.values.hoursAvail,
            coursePref:this.props.values.coursePref,
            facultyPref:this.props.values.facultyPref,
            officeHours: this.props.values.officeHours,
          }
      
          this.props.saveValues(data);
    }
}

export default Home;
