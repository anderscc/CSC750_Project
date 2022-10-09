import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
class Course extends Component {
  constructor(args) {
    super(args);
    this.state = {
        type:"course",
        courseName:"",
        classTime:"",
        courseSection:"",
        instructor:"",
        courseActivity:"",
        GAPref:"",
        courseCode:"",
    }
    // for radio button 
    this.onValueChange = this.onValueChange.bind(this);


    this.formSubmit = this.formSubmit.bind(this);
  }

  onValueChange(event,state_var) {
    this.setState({
      state_var: event.target.value
    });
    alert(this.state.state_var)
  }

  formSubmit(event) {
    event.preventDefault();
    console.log(this.state.selectedOption)
  }



  render(){
  return (
    <div className={'container-fluid'}>
      <h1>This Course Page</h1>
      <div>
        <form>
          <div className='course-form container'>
            <div className="mb-3">
              <label htmlFor="courseCode" className="form-label">Course Code</label>
              <input
                type={"number"}
                className="form-control"
                ref="courseCode"
                placeholder="0"
                defaultValue={this.props.values.courseCode}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="courseName" className="form-label">Course Name</label>
              <input
                name='hoursAvail'
                type="text"
                className="form-control"
                ref="courseName"
                placeholder="0"
                defaultValue={this.props.values.courseName}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="courseSection" className="form-label">Course Section</label>
              <input
                type={"number"}
                className="form-control"
                ref="courseSection"
                placeholder="0"
                defaultValue={this.props.values.courseSection}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="courseMeetTimes" className="form-label">Course Meet Times</label>
              <input
                type="text"
                className="form-control"
                ref="courseMeetTimes"
                placeholder="MWF 12:00 PM - 1:30 PM"
                defaultValue={this.props.values.courseMeetTimes}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="courseFaculty" className="form-label">Course Faculty</label>
              <input
                type="text"
                className="form-control"
                ref="courseFaculty"
                placeholder="John Doe"
                defaultValue={this.props.values.courseFaculty}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="courseActivities" className="form-label">Course Activities</label>
              <input
                type="text"
                className="form-control"
                ref="courseActivities"
                placeholder="Grading, preparation"
                defaultValue={this.props.values.courseActivities}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="activityTimes" className="form-label">Total Activity Times</label>
              <input
                type="text"
                className="form-control"
                ref="activityTimes"
                placeholder="30 minutes"
                defaultValue={this.props.values.activityTimes}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="GAPref" className="form-label">GA Preference</label>
              <Dropdown options={this.props.values.studentName} 
                onChange={this._onSelect} 
                value={this.props.values.studentName[0]} 
                placeholder="Select an option" 
                />
            </div>
          </div>
        </form>
        <div className={"row"}>
          <div className={"col"}>
            <button onClick ={this.previousStep.bind(this)}>Previous Page</button>
            <button onClick={this.nextStep.bind(this)}>Next Page</button>
          </div>
        </div>
      </div>
    </div>

  )
}

//function to advance to next page
  nextStep(e) {
    e.preventDefault();
    var data = {
      courseCode: this.refs.courseCode.value,
      courseName: this.refs.courseName.value,
      courseSection: this.refs.courseSection.value,
      courseMeetTimes:this.refs.courseMeetTimes.value,
      courseFaculty:this.refs.courseFaculty.value,
      courseActivities: this.refs.courseActivities.value,
      activityTimes: this.refs.activityTimes.value,
      gaPreference: this.refs.gaPreference.value,
    }

    this.props.saveValues(data);
    this.props.nextStep();
  }

  //function to go back to previous page
  previousStep(e) {
    var data = {
      courseCode: this.refs.courseCode.value,
      courseName: this.refs.courseName.value,
      courseSection: this.refs.courseSection.value,
      courseMeetTimes:this.refs.courseMeetTimes.value,
      courseFaculty:this.refs.courseFaculty.value,
      courseActivities: this.refs.courseActivities.value,
      activityTimes: this.refs.activityTimes.value,
      gaPreference: this.refs.gaPreference.value,
    }

    this.props.saveValues(data);
    this.props.previousStep();
  }
}
export default Course;

