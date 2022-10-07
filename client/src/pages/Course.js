
import React, { Component } from 'react';

class Course extends Component {
  constructor(args) {
    super(args);
    this.state = {
    }
    // for radio button 
    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  formSubmit(event) {
    event.preventDefault();
    console.log(this.state.selectedOption)
  }

  

  render(){
  return (
    <div className={'container'}>
      <h1>Course Page</h1>
        <form onSubmit={this.formSubmit}>
            <div className='courseForm container'>
            <div className="mb-3">
              <label>
                <input name="courseType" type="radio" value="course" 
                checked={this.state.selectedOption === "course"}
                onChange={this.onValueChange}/>
                Course
              </label>
              {"    "}
              <label>
                <input name="courseType" type="radio" value="lab"
                checked={this.state.selectedOption === "lab"}
                onChange={this.onValueChange} />
                Lab
              </label>
            </div>  
            <div className="mb-3">
              <label htmlFor="courseCode" className="form-label">Course Code: </label>
                <input
                    type="text"
                    className="form-control"
                    ref="courseCode"
                    placeholder="CSC750"
                    defaultValue={this.props.values.courseCode}
                />
            </div>
            <div className="mb-3">
              <label htmlFor="courseSection" className="form-label">Course Section: </label>
                <input
                    type={"number"}
                    className="form-control"
                    ref="courseSection"
                    placeholder="001"
                    defaultValue={this.props.values.courseSection}
                />
              </div>
              <div className="mb-3">
              <label htmlFor="courseTime" className="form-label">Class Time: </label>
                <input
                    type={"number"}
                    className="form-control"
                    ref="courseSection"
                    placeholder="001"
                    defaultValue={this.props.values.courseMeetTimes}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="instructor" className="form-label">Instructor</label>
                <input
                    name='instructor'
                    type="text"
                    className="form-control"
                    ref="instructor"
                    placeholder="Dr. Iqbal"
                    defaultValue={this.props.values.instructor}
                />
              </div>
            
              <div className="mb-3">
                <label htmlFor="courseActivicty" className="form-label">Course Activity: </label>
                  <input
                      type="text"
                      className="form-control"
                      ref="courseActivicty"
                      placeholder="Grading"
                      defaultValue={this.props.values.courseActivity}
                  />
                  <input
                      type="text"
                      className="form-control"
                      ref="courseActivicty"
                      placeholder="0.5 hours"
                      defaultValue={this.props.values.courseActivity}
                  />
              </div>
              <div className="mb-3">
                <label htmlFor="gaPref" className="form-label">GA Preference</label>
                <input
                    name='GAPref'
                    type={"text"}
                    className="form-control"
                    ref="GAPref"
                    placeholder="None"
                    defaultValue ={this.props.values.GAPref}
                />
              </div>
              
        <div className={"row"}>
          <div className={"col"}>
            <button onClick ={this.previousStep.bind(this)}>Previous Page</button>
            <button onClick={this.nextStep.bind(this)}>Next Page</button>
          </div>
        </div>
    </div>
      </form>
    </div>

  )
}

//function to advance to next page
  nextStep(e) {
    this.props.nextStep();
  }

  //function to go back to previous page
  previousStep(e) {
    this.props.previousStep();
  }
}
export default Course;
