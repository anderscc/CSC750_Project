import React, { Component } from "react";


class Home extends Component {
    constructor(args) {
        super(args);
        this.state = {
                semester: " ",
                year: " "
        }
      }

    render(){
        return(
            <div className={'container-fluid'}>
                <div>
                    <h1> Welcome to the Graduate Assistant Scheduler (GAS)!</h1>
                    <p> Here we aim to solve your problems of scheduling conflicts between
                        busy schedules of Graduate Assistants and Teaching Assistants as well
                        as meeting the needs of faculty and course requirements. This software also
                        schedules the necessary time required for lab meetings while respecting the time
                        constraints of half and full-time graduate/teaching assistants.
                    </p>
                </div>
                <div>
                    Here are the semesters that are currently existing in the system:
                    <select className="form-control" id="exampleFormControlSelect1" name={"semYr"} onChange={this.onChangeValue}>
                    <option>Select existing semester</option>
                  {this.props.semesters.map((item, index) => (

                      <option value={item.id} key={index}>{item.Semester+' '+item.Year}</option>
                  ))}
                </select>
                </div>
                <div>
                    If the semester you are looking for is not present and a new semester needs to be created, enter below:
                    <div>
                        <select id="semester" name="semester">
                        <option value="Fall">Fall</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        </select>
                    </div>
                    <div>
                    <label for="year">Year:</label>
                    <input type="text" id="year"></input>
                    {/* {this.validator.message('studentName', this.state.year, 'required|alpha_num_space')} */}
                    </div>
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
