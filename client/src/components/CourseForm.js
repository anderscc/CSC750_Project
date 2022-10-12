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
            officeHours: '',
            courseCode: '',
            courseName: '',
            courseSection: '',
            courseMeetTimes: '',
            courseFaculty: '',
            courseActivities: '',
            acitivityTimes: '',
            gaPreference: '',
            classType: '',
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
            officeHours:this.state.formValues[i].officeHours,
            courseCode:this.state.formValues[i].courseCode,
            courseName:this.state.formValues[i].courseName,
            courseSection:this.state.formValues[i].courseSection,
            courseMeetTimes:this.state.formValues[i].courseMeetTimes,
            courseFaculty:this.state.formValues[i].courseFaculty,
            courseActivities:this.state.formValues[i].courseActivities,
            acitivityTimes:this.state.formValues[i].acitivityTimes,
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
                                value = "Lab"
                            /> Course
                            <input
                                type="radio"
                                ref="classType"
                                value = "Course"
                            /> Lab
                            </div>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">Course Code</label>
                            <input
                                name = 'courseCode'
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
                                name='hoursAvail'
                                type="text"
                                className="form-control"
                                ref="courseName"
                                placeholder="0"
                                value = {element.courseName}
                                onChange={e => this.handleChange(index, e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">Course Section</label>
                            <input
                                type={"number"}
                                className="form-control"
                                ref="courseSection"
                                placeholder="0"
                                value = {element.courseSection}
                                onChange={e => this.handleChange(index, e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">Course Meet Times</label>
                            <input
                                type="text"
                                className="form-control"
                                ref="courseMeetTimes"
                                placeholder="MWF 12:00 PM - 1:30 PM"
                                value = {element.courseMeetTimes}
                                onChange={e => this.handleChange(index, e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">Course Faculty</label>
                            <input
                                type="text"
                                className="form-control"
                                ref="courseFaculty"
                                placeholder="John Doe"
                                value = {element.courseFaculty}
                                onChange={e => this.handleChange(index, e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">Course Activities</label>
                            <input
                                type="text"
                                className="form-control"
                                ref="courseActivities"
                                placeholder="3 Quizzes, 4 Exams, 1 Mid-Term"
                                value = {element.courseActivities}
                                onChange={e => this.handleChange(index, e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">Activity Times</label>
                            <input
                            type="text"
                            className="form-control"
                            ref="activityTimes"
                            placeholder="30 minutes"
                            value = {element.activityTimes}
                            onChange={e => this.handleChange(index, e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">GA Preference</label>
                            <input
                            type="text"
                            className="form-control"
                            ref="gaPreference"
                            placeholder="John Doe"
                            value = {element.gaPreference}
                            onChange={e => this.handleChange(index, e)}
                            />
                        </div>
                        {
                      index ? 
                        <button type="button"  className="button remove" onClick={() => this.removeFormFields(index)}>Remove</button> 
                      : null
                    }
                  </div>
                ))}
                <div className="button-section">
                    <button className="button add" type="button" onClick={() => this.addFormFields()}>Add Course</button><br></br>
                    <button className="button submit" type="button" onClick={this.previousPage.bind(this)}>Previous Page</button>  
                    <button className="button submit" type="button" onClick={this.nextPage.bind(this)}>Next Page</button> 
                  </div>
              </form>
        )
    }
}

export default CourseForm;