import React, { Component } from 'react';
import 'react-dropdown/style.css';
import { getAllStudent} from "../services/studentService";
import {toast, ToastContainer} from "react-toastify";
import {addLab} from "../services/labService";

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
        labActivities: 'Grading, preparation',
        activityTimes: '',
        GAPref: '',
      },
      students: []
    }
    this.onChangeValue = this.onChangeValue.bind(this)
    this.__onSelect = this.__onSelect.bind(this)
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
    if(response != "error"){
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
  }
  render() {
    /*TODO: retrieve student names from database*/
    const option = [{ value: 'John' }, { value: 'Jane' }] //retrieve student names from database

    /*TODO: retrieve semester from database and create dropdown menu*/

    //console.log(defaultOption)
    return (
      <div className={'container-fluid'}>
        <h1> lab Page</h1>
        <div>
          <form>
            <div className='lab-form container'>
              <div className="mb-3">
                <label htmlFor="semYr" className="form-label">Semester</label>
                <select className="form-control" id="exampleFormControlSelect1" name={"semYr"} onChange={this.onChangeValue}>
                    <option>select</option>
                  {this.props.semesters.map((item, index) => (

                      <option value={item.id} key={index}>{item.Semester}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="labCode" className="form-label">lab Code</label>
                <input
                  type={"number"}
                  className="form-control"
                  name="labCode"
                  placeholder="0"
                  defaultValue={this.state.lab.labCode}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="labName" className="form-label">lab Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="labName"
                  placeholder="0"
                  defaultValue={this.state.lab.labName}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="labSection" className="form-label">lab Section</label>
                <input
                  type={"number"}
                  className="form-control"
                  name="labSection"
                  placeholder="0"
                  defaultValue={this.state.lab.labSection}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="labMeetTimes" className="form-label">lab Meet Times</label>
                <input
                  type="text"
                  className="form-control"
                  name="labMeetTimes"
                  placeholder="MWF 12:00 PM - 1:30 PM"
                  defaultValue={this.state.lab.labMeetTimes}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="labFaculty" className="form-label">lab Faculty</label>
                <input
                  type="text"
                  className="form-control"
                  name="labFaculty"
                  placeholder="John Doe"
                  defaultValue={this.state.lab.labFaculty}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="labActivities" className="form-label">Course Activities</label>
                <input
                  type="text"
                  className="form-control"
                  name="labActivities"
                  placeholder="Grading, preparation"
                  defaultValue={this.state.lab.labActivities}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="activityTimes" className="form-label">Activity Times in minutes</label>
                <input
                  type="float"
                  className="form-control"
                  name="activityTimes"
                  placeholder="30"
                  defaultValue={this.state.lab.activityTimes}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="GAPref" className="form-label">GA Preference</label>
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