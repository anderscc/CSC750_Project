import React, { Component } from "react";
import SimpleReactValidator from 'simple-react-validator';
import {createSemester} from "../services/semesterService";
import { ToastContainer, toast } from 'react-toastify';

class Home extends Component {
    constructor(args) {
        super(args);
        this.state = {
            semYr:{
                semester: "Fall",
                year: "",}
        }
        this.onChangeValue = this.onChangeValue.bind(this)
        this.__onSelect = this.__onSelect.bind(this)
        this.validator = new SimpleReactValidator({
          });
      }
    __onSelect(option){
    console.log('You selected ', option.value)
    const value = option.value
    this.setState({
        semYr:{
            ...this.state.semYr,
            semester: value
        }
    });
    }

    onChangeValue(event) {
        const name = event.target.name
        const value = event.target.value
        console.log("Value has changed to:", event.target.value)
        this.setState({
            semYr:{
                ...this.state.semYr,
                [name]: value
            }
        });
      }

    changeHandler = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
        semYr:{
            ...this.state.semYr,
            [name]: value
        }
    });
    console.log("This is the year on the change Handler funntion",this.state.semYr.year)
    }

    onSubmit = async (event) => {
    event.preventDefault()
    if (this.validator.allValid()) {
                const response = await createSemester(this.state.semYr.year,this.state.semYr.semester).catch(error => {
                    toast.error('An error occurred', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
            return "error"

        });
    if(response != "error"){
        toast.success('Semester record created', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
        }
    }else {
    this.validator.showMessages();
    // rerender to show messages for the first time
    // you can use the autoForceUpdate option to do this automatically`
    this.forceUpdate();
    }
    }
    
    render(){
        return(
            <div className={'container-fluid'}>
                <div container>
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
                </div>
                <div className="mb-3">
                    If the semester you are looking for is not present and a new semester needs to be created, enter below:
                    <div>
                        <select className="form-control" onChange={this.onChangeValue} id="semester" name={"semester"}>
                        <option value="Fall">Fall</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        </select>
                    </div>
                    <div>
                    <label for="year">Year:</label>
                    <input 
                     type={"number"} 
                     name={"year"}
                     className="form-control"
                     value={this.state.year}
                     onChange={this.changeHandler}
                     />
                    {this.validator.message('year', this.state.semYr.year, 'required|numeric|min:2020,num|max:9999,num')}
                    </div>
                </div>
                <div>
                    <p> If you have previously generated a schedule, select which schedule you are
                        trying to use here to view previous data/schedules</p>
                    <button onClick={this.onSubmit}>Create Semester</button>
                </div>
          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
          />
          {/* Same as */}
          <ToastContainer/>
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
