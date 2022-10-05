
import React, { Component } from 'react';
  
class Course extends Component {
  constructor(args) {
    super(args);
    this.state = {
    }
  }

  render(){
  return (
    <div className={'container'}>
      <h1>This Course Page</h1>
        <div className={"row"}>
          <div className={"col"}>
            <button onClick ={this.previousStep.bind(this)}>Previous Page</button>
            <button onClick={this.nextStep.bind(this)}>Next Page</button>
          </div>
        </div>
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