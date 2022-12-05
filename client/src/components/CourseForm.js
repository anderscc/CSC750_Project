// Copyright (c) 2022 Caleb Bryant, Wenyu Zhao, Calvin Anderson, Godwin Ekuma, Oluwatobi Atolagbe
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE


import React, { Component } from "react";

class CourseForm extends Component{
    constructor(args){
        super(args);
        this.state = {
            formValues : [{
            }]
        }
            this.nextPage = this.nextPage.bind(this)
    }
    
    //function to save elements as it receives input
    handleChange(i, e) {
        let formValues = this.state.formValues;
        formValues[i][e.target.name] = e.target.value;
        this.setState({ formValues });
      }
    
      //function to add additional fields as needed
      addFormFields() {
        this.setState(({
          formValues: [...this.state.formValues, {
            courseCode:'',
            courseName:'',
            courseSection:'',
            courseMeetTimes:'',
            courseFaculty:'',
            courseActivities:'',
            acitivityTimes:'',
            gaPreference:'',
            classType:'',
            }]
        }))
      }

      //function to remove the last form field
      removeFormFields(i) {
        let formValues = this.state.formValues;
        formValues.splice(i, 1);
        this.setState({ formValues });
      }

      //function to save current values and then move to the next page
      nextPage(event) {
        event.preventDefault();

        //loop through form values for each course and save the values into an array
        for(var i=0; i<this.state.formValues.length; i++){
          var data = {
            courseCode:this.state.formValues[i].courseCode,
            courseName:this.state.formValues[i].courseName,
            courseSection:this.state.formValues[i].courseSection,
            courseMeetTimes:this.state.formValues[i].courseMeetTimes,
            courseFaculty:this.state.formValues[i].courseFaculty,
            courseActivities:this.state.formValues[i].courseActivities,
            activityTimes:this.state.formValues[i].acitivityTimes,
            gaPreference:this.state.formValues[i].gaPreference,
            classType:this.state.formValues[i].classType,
          }
          this.props.handleData(data);
        }
        this.props.nextStep()
      }

      //function to save current values and then move to the previous page
      previousPage(event) {
        this.props.previousStep()
      }
    render() {
        return(
              <form className="container">
                {this.state.formValues.map((element, index) => (
                    <div>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">Is This Class a Course or a Lab:</label><br></br>
                            <input
                                type="radio"
                                ref="classType"
                                value="Lab"
                                
                            /> Course
                            <input
                                type="radio"
                                ref="classType"
                                value="Course"
                            /> Lab
                            </div>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">Course Code</label>
                            <input
                                name='courseCode'
                                type={"number"}
                                className="form-control"
                                ref="courseCode"
                                placeholder="0"
                                value={element.courseCode}
                                onChange={e => this.handleChange(index, e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hoursAvail" className="form-label">Course Name</label>
                            <input
                                name='courseName'
                                type="text"
                                className="form-control"
                                ref="courseName"
                                placeholder="0"
                                value={element.courseName}
                                onChange={e => this.handleChange(index, e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">Course Section</label>
                            <input
                                name='courseSection'
                                type={"number"}
                                className="form-control"
                                ref="courseSection"
                                placeholder="0"
                                value={element.courseSection}
                                onChange={e => this.handleChange(index, e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">Course Meet Times</label>
                            <input
                                name='courseMeetTimes'
                                type="text"
                                className="form-control"
                                ref="courseMeetTimes"
                                placeholder="MWF 12:00 PM - 1:30 PM"
                                value={element.courseMeetTimes}
                                onChange={e => this.handleChange(index, e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">Course Faculty</label>
                            <input
                                name='courseFaculty'
                                type="text"
                                className="form-control"
                                ref="courseFaculty"
                                placeholder="John Doe"
                                value={element.courseFaculty}
                                onChange={e => this.handleChange(index, e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">Course Activities</label>
                            <input
                                name='courseActivities'
                                type="text"
                                className="form-control"
                                ref="courseActivities"
                                placeholder="3 Quizzes, 4 Exams, 1 Mid-Term"
                                value={element.courseActivities}
                                onChange={e => this.handleChange(index, e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">Activity Times</label>
                            <input
                                name='activityTimes'
                                type="text"
                                className="form-control"
                                ref="activityTimes"
                                placeholder="30 minutes"
                                value={element.activityTimes}
                                onChange={e => this.handleChange(index, e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">GA Preference</label>
                            <input
                                name='gaPreference'
                                type="text"
                                className="form-control"
                                ref="gaPreference"
                                placeholder="John Doe"
                                value={element.gaPreference}
                                onChange={e => this.handleChange(index, e)}
                            />
                        </div>
                        {
                      index ? 
                        <button className="button add-remove" type="button" onClick={() => this.removeFormFields(index)}>Remove</button> 
                      : null
                    }
                  </div>
                ))}
                <div className="button-section">
                    <button className="button add-remove" type="button" onClick={() => this.addFormFields()}>Add Course</button><br></br>
                    <button className="button submit" type="button" onClick={this.previousPage.bind(this)}>Previous Page</button>  
                    <button className="button submit" type="button" onClick={this.nextPage.bind(this)}>Next Page</button> 
                  </div>
              </form>
        )
    }
}

export default CourseForm;