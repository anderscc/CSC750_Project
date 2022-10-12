
import React, { Component } from 'react';
  
class ViewSchedule extends Component {
  render(){
    return (
      <div className={'container-fluid'}>
        <h1> This is the view schedule page</h1>

        <p> Click below to return to Home page and start a new 
          schedule or return to the Confirmation page: </p>
        <button onClick={this.previousStep.bind(this)}>Return</button>
        <button onClick={this.resetStep.bind(this)}>Home</button>
      </div>
    )
  }

    //function to go back to previous page
    previousStep(e) {
      this.props.previousStep();
    }

  //function to return to home page
  resetStep(){
    this.props.resetStep();
  }

}
  
export default ViewSchedule;
