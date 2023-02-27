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
import {toast, ToastContainer} from "react-toastify";
import {addCourse} from "../services/courseService";
import {addStudent, getAllStudent} from "../services/studentService";
import SimpleReactValidator from 'simple-react-validator';

class Course extends Component {
  constructor(args) {
    super(args);
    this.state = {
      // Components in the list below are case sensitive. Please refer to server/scheduler/models.py for list of attributes.
      course: {
        semYr: "",
        courseCode: '',
        courseName: '',
        courseSection: '',
        courseMeetTimes: '',
        courseFaculty: '',
        activityTimes: '',
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
        activityTimes:{
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
    this.setState({course: {...this.state.course}, students: [...students]})
  }

  onChangeValue(event) {
    console.log(event.target.value);
    console.log(event.target.name)
    const name = event.target.name
    const value = event.target.value
    this.setState({
      course: {
        ...this.state.course,
        [name]: value
      }
    });
    console.log(event.target.value);
  }
  __onSelect(option) {
    console.log('You selected ', option)
    const value = option.value
    this.setState({
      course: {
        ...this.state.course,
        /* TODO:change the variable name to be the name of field for use in semester menu*/
        gaPreference: value
      }
    });
  }

  changeHandler = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      course: {
        ...this.state.course,
        [name]: value
      }
    });
  }
  onSubmit = async () => {
       if (this.validator.allValid()) {
        const response =  await addCourse(this.state.course).catch(() => {
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

      if(response != 'error') {
        toast.success('Course record added', {
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

    //console.log(defaultOption)
    return (
      <div className={'container-fluid'}>
        <h1> Course Page</h1>
        <div>
          <form>
            <div className='course-form container'>
              <div className="mb-3">
                <label htmlFor="semYr" className="form-label">Semester<span style ={{color:'red'}}>*</span></label>
                <select className="form-control" id="exampleFormControlSelect1" name={"semYr"} onChange={this.onChangeValue}>
                    <option>Select a semester</option>
                  {this.props.semesters.map((item, index) => (

                      <option value={item.id} key={index}>{item.Semester+' '+item.Year}</option>
                  ))}
                </select>
                {this.validator.message('semester', this.state.course.semYr, 'required|numeric')}
              </div>
              <div className="mb-3">
                <label htmlFor="courseCode" className="form-label">Course Code<span style ={{color:'red'}}>*</span>(Number Only)</label>
                <input
                  type={"number"}
                  className="form-control"
                  name="courseCode"
                  placeholder="130"
                  value={this.state.course.courseCode}
                  onChange={this.changeHandler}
                />
                {this.validator.message('courseCode', this.state.course.courseCode, 'required|numeric')}
              </div>
              <div className="mb-3">
                <label htmlFor="courseName" className="form-label">Course Name<span style ={{color:'red'}}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="courseName"
                  placeholder=""
                  defaultValue={this.state.course.courseName}
                  onChange={this.changeHandler}
                />
                {this.validator.message('courseName', this.state.course.courseName, 'required|alpha_num_space')}
              </div>
              <div className="mb-3">
                <label htmlFor="courseSection" className="form-label">Course Section<span style ={{color:'red'}}>*</span></label>
                <input
                  type={"number"}
                  className="form-control"
                  name="courseSection"
                  placeholder="0"
                  defaultValue={this.state.course.courseSection}
                  onChange={this.changeHandler}
                />
                {this.validator.message('courseSection', this.state.course.courseSection, 'required|numeric')}
              </div>
              <div className="mb-3">
                <label htmlFor="courseMeetTimes" className="form-label">Course Meet Times<span style ={{color:'red'}}>*</span> (Enter in this Format MW 13:00 -
                    14:00)<span color='red'>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="courseMeetTimes"
                  placeholder="MWF 12:00 - 13:30 "
                  defaultValue={this.state.course.courseMeetTimes}
                  onChange={this.changeHandler}
                />
                {this.validator.message('courseMeetTimes', this.state.course.courseMeetTimes, 'required|classTimes')}
              </div>
              <div className="mb-3">
                <label htmlFor="courseFaculty" className="form-label">Course Faculty<span style ={{color:'red'}}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="courseFaculty"
                  placeholder="John Doe"
                  defaultValue={this.state.course.courseFaculty}
                  onChange={this.changeHandler}
                />
                {this.validator.message('courseFaculty', this.state.course.courseFaculty, 'required|alpha_num_space')}
              </div>
              <div className="mb-3">
                <label htmlFor="activityTimes" className="form-label">Total GA/TA Time<span style ={{color:'red'}}>*</span></label>
                <input
                  type="float"
                  className="form-control"
                  name="activityTimes"
                  defaultValue={this.state.course.activityTimes}
                  onChange={this.changeHandler}
                />
                {this.validator.message('activityTimes', this.state.course.activityTimes, 'required|numeric|activityTimes')}
              </div>
              <div className="mb-3">
                <label htmlFor="gaPreference" className="form-label">GA Preference</label>
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
              {/* <button onClick={this.previousStep.bind(this)}>Previous Page</button>
              <button onClick={this.nextStep.bind(this)}>Next Page</button> */}
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
export default Course;
