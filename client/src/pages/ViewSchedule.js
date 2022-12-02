
import React, { Component } from 'react';

//it'll be one table
//get the data from api probably in array format
//go through each row of the array and display in the table
//[CSC701,Godwin Ekuma,...etc] dummy data array

//Needs to be a button that 
//Automatic download as well as click download


//<button r"../schedule.csv" - relative path
//take array file and convert into csv file in front-end

// var array = [ "geeks", "4", "geeks" ];
// var csv = array.toString();
// document.write(csv);
class ViewSchedule extends Component {
  render(){
    return (
      <div className={'container-fluid'}>
        <h1> This is the view schedule page</h1>

        <p> Click below to return to Home page and start a new 
          schedule or return to the Confirmation page: </p>
      </div>
    )
  }
}
  
export default ViewSchedule;
