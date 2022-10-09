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
          values: {
                studentName: '',
                classTimes:'',
                hoursAvail:0,
                coursePref:'',
                facultyPref:'',
                officeHours: 0,
                courseCode: '0',
                courseName: '',
                courseSection:'0',
                courseMeetTimes:'0',
                courseFaculty:'',
                courseActivities:'0',
                acitivityTimes:'0',
                gaPreference:'',
                classType:'',
                studentType:''
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

      //function to reset step to 0 (return to home page) after generating schedule
      resetStep(){
        this.setState({
          step: 0
        })
      }

      setStep(page){
        this.setState({
          step: page
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
                                previousStep = {this.previousStep.bind(this)}
                                setStep = {this.setStep.bind(this)}/>;
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
              return <ViewSchedule resetStep = {this.resetStep.bind(this)}
                                    previousStep = {this.previousStep.bind(this)}
                                    
              />
            default:
            return <Home />;
        }
    };
    render() {
        return(
            <div>
                {this.stepDisplay()}
        </div>
        )
    }
}

export default Main;