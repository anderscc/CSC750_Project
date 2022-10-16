import React, { Component } from "react";
import {addStudent} from "../services/studentService";

class StudentForm extends Component{
    constructor(args){
        super(args);
        this.state = {
            formValues : [{
            }]
        }
            this.nextPage = this.nextPage.bind(this)
            this.addNewStudent = this.addNewStudent.bind(this)
    }
        
    //function to save elements as it receives input
        handleChange(i, e) {
          let formValues = this.state.formValues;
          formValues[i][e.target.name] = e.target.value;
          this.setState({ formValues });
        }

        async addNewStudent(){
            const currentFormIndex = this.state.formValues.length - 1;
            const currentForm = {...this.state.formValues[currentFormIndex]};
            await addStudent(currentForm);
        }
      
        //function to add additional fields as needed
        async addFormFields() {
        await this.addNewStudent();
          this.setState(({
            formValues: [...this.state.formValues, { semYr_id:'',
                    studentName: '',
                    classTimes:'',
                    hoursAvail:'',
                    coursePref:'',
                    facultyPref:'',
                    officeHours: '',
                  }]
          }))
        }     
        
        //function to remove the last form field
        removeFormFields(i) {
          let formValues = this.state.formValues;
          formValues.splice(i, 1);
          this.setState({ formValues });
        }

      // function to save each student and then go to the next page
        async nextPage(event) {
          event.preventDefault();
          //loop through each student and save values into an array to be saved to parent
          for(var i=0; i<this.state.formValues.length; i++){
            var data = {
              semester: this.state.formValues[i].semester,
              studentName: this.state.formValues[i].studentName,
              classTimes: this.state.formValues[i].classTimes,
              hoursAvail: this.state.formValues[i].hoursAvail,
              coursePref: this.state.formValues[i].coursePref,
              facultyPref: this.state.formValues[i].facultyPref,
              officeHours: this.state.formValues[i].officeHours,
              gaClassAttendance: this.state.formValues[i].gaClassAttendance,
            }
            this.props.handleData(data);
          }
          this.props.nextStep()
        }

        //function to go back to previous page
        previousPage(event) {
            this.props.previousStep()
        }
  render(){
    return(
        <form className="container">
          {this.state.formValues.map((element, index) => (
          <div className="form-inline" key={index}>
              <label htmlFor="semYr" className="form-label">What Semester are These Courses For?</label>
              <select onChange={e => this.handleChange(index, e)} name="semYr" ref="semYr">
                  <option>Select an option</option>
                  {

                      this.props.semester.map((item, index) => (

                          <option value={item.id} key={index}>{item.Semester}</option>
                      ))
                  }
              </select>
              <label htmlFor="studentName" className="form-label">Student Name</label>
                  <input
                    name="studentName"
                    type="text"
                    className="form-control"
                    ref="studentName"
                    placeholder="John Doe"
                    value={element.studentName}
                    onChange={e => this.handleChange(index, e)}
                  />
                <label htmlFor="studentType" className="form-label">Is This a GA or TA:</label>
                  <input
                      name='studentType'
                      type="radio"
                      ref="studentType"
                      value="GA"
                      onChange={e => this.handleChange(index, e)}
                  /> GA
                  <input
                      name='studentType'
                      type="radio"
                      ref="studentType"
                      value="TA"
                      onChange={e => this.handleChange(index, e)}
                  /> TA
              <br></br><label htmlFor="hoursAvail" className="form-label">GA Hours</label>
                  <input
                      name='hoursAvail'
                      type={"number"}
                      className="form-control"
                      ref="hoursAvail"
                      placeholder="E.g 10"
                      value={element.hoursAvail}
                      onChange={e => this.handleChange(index, e)}
                  />
              <label htmlFor="coursePref" className="form-label">Course Preference</label>
                  <input
                      name='coursePref'
                      type={"text"}
                      className="form-control"
                      ref="coursePref"
                      placeholder=""
                      value={element.coursePref}
                      onChange={e => this.handleChange(index, e)}
                  />
              <label htmlFor="facultyPref" className="form-label">Faculty Preference</label>
                  <input
                      name='facultyPref'
                      type={"text"}
                      className="form-control"
                      ref="facultyPref"
                      placeholder=""
                      value={element.facultyPref}
                      onChange={e => this.handleChange(index, e)}
                  />
              <label htmlFor="officeHours" className="form-label">Office Hours Duration</label>
                  <input
                      name='officeHours'
                      type={"text"}
                      className="form-control"
                      ref="officeHours"
                      placeholder="1"
                      value={element.officeHours}
                      onChange={e => this.handleChange(index, e)}
                  />
                  <label htmlFor="officeHours" className="form-label">Class Times (Enter in this Format MW: 1:00PM - 2:00PM) Separate multiple classes with comma</label>
                      <input
                          name='classTimes'
                          type="text"
                          className="form-control"
                          ref="classTimes"
                          placeholder="MW: 1:00PM - 2:00PM, TH: 1:00PM - 2:00PM"
                          value={element.classTimes}
                          onChange={e => this.handleChange(index, e)}
                        /><br></br>
              {
                index ? 
                  <button type="button"  className="button add-remove" onClick={() => this.removeFormFields(index)}>Remove</button> 
                : null
              }
            </div>
          ))}
          <div className="button-section">
              <button className="button add-remove" type="button" onClick={() => this.addFormFields()}>Add Student</button>
              <button className="button submit" type="button" onClick={this.previousPage.bind(this)}>Previous Page</button>
              <button className="button submit" type="button" onClick={this.nextPage.bind(this)}>Next Page</button>   
          </div>
      </form>
    );
  }
}
export default StudentForm;