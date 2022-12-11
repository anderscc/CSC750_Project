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



import React, { Component } from 'react';
import 'react-dropdown/style.css';
import { getAllStudent} from "../services/studentService";
import {toast, ToastContainer} from "react-toastify";
import {addLab} from "../services/labService";
import SimpleReactValidator from "simple-react-validator";

class lab extends Component {
  constructor(args) {
    super(args);
    this.state = {
      lab: {
        SemYr: "",
        labCode: '',
        labName: '',
        labSection: '',
        labMeetTimes: '',
        labFaculty: '',
        totalGATAHours: '',
        facultyTaught: true,
        LabPrepTime: '',
        GAPref: '',
      },
      students: []
    }
    this.onChangeValue = this.onChangeValue.bind(this)
    this.__onSelect = this.__onSelect.bind(this)
    this.validator = new SimpleReactValidator({
      validators:{
        classTimes:{
          message:"Please input valid class times according to the instruction.",
          rule:(val,params,validator)=>{
            return validator.helpers.testRegex(val,/^(M|T|W|R|F){1,5}\s([1]?(\d{1})|([1-2][1-4])):(([0-5](\d{1}))|(\d{1}))\s-\s([1]?(\d{1})|[1-2][1-4]):(([0-5](\d{1}))|(\d{1}))$/) && params.indexOf(val) === -1
          },
          required:true
        },
        totalGATAHours:{
          message:"*Total GA/TA Hours requested must be between 1-20*",
          rule:(val,params)=>{
            return val >0 && val <= 20
          },
        },
      }
    });
  }

  async componentDidMount() {
    let students = await getAllStudent()
    this.setState({lab: {...this.state.lab}, students: [...students]})
  }

  onChangeValue(event) {
    console.log(event.target.value);
    console.log(event.target.name)
    const name = event.target.name
    const value = event.target.value
    this.setState({
      lab: {
        ...this.state.lab,
        [name]: value
      }
    });
    console.log(event.target.value);
  }
  __onSelect(option) {
    console.log('You selected ', option)
    const value = option.value
    this.setState({
      lab: {
        ...this.state.lab,
        /* TODO:change the variable name to be the name of field for use in semester menu*/
        gaPreference: value
      }
    });
  }

  changeHandler = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      lab: {
        ...this.state.lab,
        [name]: value
      }
    });
  }
  onSubmit = async () => {
           if (this.validator.allValid()) {
             const response = await addLab(this.state.lab).catch(error => {
               toast.error('An error occurred', {
                 position: "top-right",
                 autoClose: 5000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "light",
               });
               return "error"

             });
             if (response != "error") {
               toast.success('Lab record added', {
                 position: "top-right",
                 autoClose: 5000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "light",
               })
             }
           }else {
    this.validator.showMessages();
    // rerender to show messages for the first time
    // you can use the autoForceUpdate option to do this automatically`
    this.forceUpdate();
  }
  }
  render() {
    /*TODO: retrieve student names from database*/
    const option = [{ value: 'John' }, { value: 'Jane' }] //retrieve student names from database

    /*TODO: retrieve semester from database and create dropdown menu*/

    //console.log(defaultOption)
    return (
      <div className={'container-fluid'}>
        <h1> Lab Page</h1>
        <div>
          <form>
            <div className='lab-form container'>
              <div className="mb-3">
                <label htmlFor="semYr" className="form-label">Semester<span style ={{color:'red'}}>*</span></label>
                <select className="form-control" id="exampleFormControlSelect1" name={"semYr"} onChange={this.onChangeValue}>
                    <option>Select a semester<span style ={{color:'red'}}>*</span></option>
                  {this.props.semesters.map((item, index) => (
                      <option value={item.id} key={index}>{item.Semester+' '+item.Year}</option>
                  ))}
                </select>
                {this.validator.message('Semester', this.state.lab.semYr, 'required|numeric')}
              </div>
              <div className="mb-3">
                <label htmlFor="labCode" className="form-label">Lab Code<span style ={{color:'red'}}>*</span>(Number Only)</label>
                <input
                  type={"number"}
                  className="form-control"
                  name="labCode"
                  placeholder="0"
                  defaultValue={this.state.lab.labCode}
                  onChange={this.changeHandler}
                />
                 {this.validator.message('labCode', this.state.lab.labCode, 'required|numeric')}
              </div>
              <div className="mb-3">
                <label htmlFor="labName" className="form-label">Lab Name<span style ={{color:'red'}}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="labName"
                  placeholder=""
                  defaultValue={this.state.lab.labName}
                  onChange={this.changeHandler}
                />
                {this.validator.message('labName', this.state.lab.labName, 'required|alpha_num_space')}
              </div>
              <div className="mb-3">
                <label htmlFor="labSection" className="form-label">Lab Section<span style ={{color:'red'}}>*</span></label>
                <input
                  type={"number"}
                  className="form-control"
                  name="labSection"
                  placeholder="0"
                  defaultValue={this.state.lab.labSection}
                  onChange={this.changeHandler}
                />
                {this.validator.message('labSection', this.state.lab.labSection, 'required|numeric')}
              </div>
              <div className="mb-3">
                <label htmlFor="labMeetTimes" className="form-label">Lab Meet Times<span style ={{color:'red'}}>*</span>(Enter in this Format MW 13:00 -
                    14:00)</label>
                <input
                  type="text"
                  className="form-control"
                  name="labMeetTimes"
                  placeholder="MWF 12:00 - 13:30"
                  defaultValue={this.state.lab.labMeetTimes}
                  onChange={this.changeHandler}
                />
                {this.validator.message('labMeetTimes', this.state.lab.labMeetTimes, 'required|classTimes')}
              </div>
              <div className="mb-3">
                <label htmlFor="labFaculty" className="form-label">Lab Faculty</label>
                <input
                  type="text"
                  className="form-control"
                  name="labFaculty"
                  placeholder="John Doe"
                  defaultValue={this.state.lab.labFaculty}
                  onChange={this.changeHandler}
                />
                {this.validator.message('labFaculty', this.state.lab.labFaculty, 'alpha_num_space')}
              </div>
              <div className="mb-3">
                <label htmlFor="totalGATAHours" className="form-label">Total GA/TA Time<span style ={{color:'red'}}>*</span></label>
                <input
                  type="float"
                  className="form-control"
                  name="totalGATAHours"
                  placeholder="2"
                  defaultValue={this.state.lab.totalGATAHours}
                  onChange={this.changeHandler}
                />
                {this.validator.message('totalGATAHours', this.state.lab.totalGATAHours, 'required|numeric|totalGATAHours')}
              </div>
              <div className="mb-3">
                <label htmlFor="totalGATAHours" className="form-label">Lab Prep Time in hours</label>
                <input
                  type="float"
                  className="form-control"
                  name="LabPrepTime"
                  placeholder="0"
                  defaultValue={this.state.lab.LabPrepTime}
                  onChange={this.changeHandler}
                />
                {this.validator.message('Lab preparation time', this.state.lab.LabPrepTime, 'numeric|min:0,num|max:10,num')}
              </div>
              <div className="mb-3" onChange={this.onChangeValue}>
                  Is this a Faculty taught lab?<span style ={{color:'red'}}>*</span>
                  <input type="radio" name="facultyTaught" value="true" defaultChecked="true"/> True
                  <input type="radio" name="facultyTaught" value="false"/> False
                </div>
              <div className="mb-3">
                <label htmlFor="GAPref" className="form-label">TA Preference (the person selected must be a TA)</label>
               <select className="form-control" id="exampleFormControlSelect1" name={"GAPref"} onChange={this.onChangeValue}>
                    <option>select</option>
                  {this.state.students.map((item, index) => (

                      <option value={item.id} key={index}>{item.studentName}</option>
                  ))}
                </select>
              </div>

            </div>
          </form>
          <div className={"row"}>
            <div className={"col"}>
              <button onClick={this.onSubmit}>Submit</button>
            </div>
          </div>
        </div>
                  <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
          />
          {/* Same as */}
          <ToastContainer/>
      </div>
    )
  }
}
export default lab;