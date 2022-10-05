import React, {Component, useState} from "react";
import Home from "./Home";
import Student from "./Student";
import Course from "./Course";
import ViewSchedule from "./ViewSchedule";
import Confirmation from "./Confirmation";


class Main extends Component  {
    constructor(args){
        super(args);
        this.state = {
          //fields for all forms
          values: {
                studentName: '',
                classTimes:'',
                hoursAvail:0,
                coursePref:'',
                facultyPref:'',
                officeHours: 0
          },
          step: 0
        }
    }
    
    //function to save values of child components to parent component (Main)
      saveValues(values) {
        this.setState({
          values: Object.assign({}, this.state.values, values)
        })
      }
    
      //function to increment switch - go to next Page
      nextStep() {
        this.setState({
          step: this.state.step +1
        })
      }
    
      //function to decrement switch - go to previous Page
      previousStep() {
        this.setState({
          step: this.state.step -1
        })
      }

      // switch function to flip between pages and render component based on page
    stepDisplay = () => {
        switch (this.state.step) {
            case 0:
                return <Home nextStep = {this.nextStep.bind(this)}/>
            case 1:
            return <Student values = {this.state.values} 
                                saveValues = {this.saveValues.bind(this)} 
                                nextStep = {this.nextStep.bind(this)} 
                                previousStep = {this.previousStep.bind(this)}/>;
            case 2:
            return <Course values = {this.state.values} 
                            saveValues = {this.saveValues.bind(this)} 
                            nextStep = {this.nextStep.bind(this)} 
                            previousStep = {this.previousStep.bind(this)}/>;
            case 3:
            return <Confirmation values = {this.state.values} 
                                    saveValues = {this.saveValues.bind(this)} 
                                    nextStep = {this.nextStep.bind(this)} 
                                    previousStep = {this.previousStep.bind(this)} />;
            case 4:
              return <ViewSchedule/>
            default:
            return <Home />;
        }
    };
    render() {
        return(
            <div>
                <span>Step {this.state.step}</span>
                {this.stepDisplay()}
        </div>
        )
    }
}

export default Main;