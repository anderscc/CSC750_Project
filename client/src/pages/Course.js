import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class Course extends Component {
  constructor(args) {
    super(args);
    this.state = {
        course:{
            courseCode: '',
            courseName: '',
            courseSection:'',
            courseMeetTimes:'',
            courseFaculty:'',
            courseActivities:'',
            activityTimes:'',
            gaPreference:'',
            classType:'course',
            
        }

    }
    this.onChangeValue = this.onChangeValue.bind(this)
    this.__onSelect = this.__onSelect.bind(this)
  }

  onChangeValue(event) {
    console.log(event.target.value);
    const name=event.target.name
    const value=event.target.value
    this.setState({course:{
        ...this.state.course,
        [name]:value
    }});
    console.log(event.target.value);
  }
  __onSelect (option) {
    console.log('You selected ', option.value)
    const name=option.name
    const value=option.value
    this.setState({course:{
        ...this.state.course,
        [name]:value
    }});
  }

  changeHandler = e => {
    const name=e.target.ref
    const value=e.target.value
    this.setState({course:{
        ...this.state.course,
        [name]:value
    }});
}
    onSubmit=() =>{
        alert(JSON.stringify(this.state.course));
        }
  render(){
  const option = [{value: 'John', label: 'John' },{ value: 'Jane', label: 'Jane'}] //retrieve student names from database
  

  
  //console.log(defaultOption)
  return (
    <div className={'container-fluid'}>
      <h1>This Course Page</h1>
      <div>
        <form>

          <div className='course-form container'>
            <div className="mb-3" onChange={this.onChangeValue}>
                Select Class Type:
                <input type="radio" name="classType" value = "course" defaultChecked="true"  /> Course              
                <input type="radio" name="classType" value = "lab" /> Lab
            </div>
            <div className="mb-3">
              <label htmlFor="courseCode" className="form-label">Course Code</label>
              <input
                type={"number"}
                className="form-control"
                ref="courseCode"
                placeholder="0"
                defaultValue={this.state.course.courseCode}
                onChange={this.changeHandler}
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
                defaultValue={this.state.course.courseName}
                onChange={this.changeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="courseSection" className="form-label">Course Section</label>
              <input
                type={"number"}
                className="form-control"
                ref="courseSection"
                placeholder="0"
                defaultValue={this.state.course.courseSection}
                onChange={this.changeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="courseMeetTimes" className="form-label">Course Meet Times</label>
              <input
                type="text"
                className="form-control"
                ref="courseMeetTimes"
                placeholder="MWF 12:00 PM - 1:30 PM"
                defaultValue={this.state.course.courseMeetTimes}
                onChange={this.changeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="courseFaculty" className="form-label">Course Faculty</label>
              <input
                type="text"
                className="form-control"
                ref="courseFaculty"
                placeholder="John Doe"
                defaultValue={this.state.course.courseFaculty}
                onChange={this.changeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="courseActivities" className="form-label">Course Activities</label>
              <input
                type="text"
                className="form-control"
                ref="courseActivities"
                placeholder="Grading, preparation"
                defaultValue={this.state.course.courseActivities}
                onChange={this.changeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="activityTimes" className="form-label">Activity Times in minutes</label>
              <input
                type="float"
                className="form-control"
                ref="activityTimes"
                placeholder="30"
                defaultValue={this.state.course.ActivityTimes}
                onChange={this.changeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gaPreference" className="form-label">GA Preference</label>
              <Dropdown 
                options={option} 
                name="gaPreference"
                value={this.state.course.gaPreference} 
                onChange={this.__onSelect}
                placeholder="Select an option" 
                />
            </div>

          </div>
        </form>
        <div className={"row"}>
          <div className={"col"}>
            <button onClick ={this.previousStep.bind(this)}>Previous Page</button>
            <button onClick={this.nextStep.bind(this)}>Next Page</button>
            <button onClick={this.onSubmit}>Submit</button>
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
      classType: this.refs.classType.value,
    }

    this.props.saveValues(data);
    this.props.nextStep();
  }

  //function to go back to previous page
  previousStep(e) {
    console.log(this.refs.gaPreference)
    console.log(this.refs.courseCode)
    var data = {
      courseCode: this.refs.courseCode.value,
      courseName: this.refs.courseName.value,
      courseSection: this.refs.courseSection.value,
      courseMeetTimes:this.refs.courseMeetTimes.value,
      courseFaculty:this.refs.courseFaculty.value,
      courseActivities: this.refs.courseActivities.value,
      activityTimes: this.refs.activityTimes.value,
      gaPreference: this.refs.gaPreference.value,
      classType: this.refs.classType.value,
    }

    this.props.saveValues(data);
    this.props.previousStep();
  }
}
export default Course;