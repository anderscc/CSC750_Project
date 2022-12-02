import React, { Component } from 'react';
import {getAllSemester} from "../services/semesterService";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {addStudent, getAllStudent} from "../services/studentService";
import { ToastContainer, toast } from 'react-toastify';
import SimpleReactValidator from 'simple-react-validator';

//Student class which allows user to input details about GA's and TA's
class Student extends Component {
  constructor(args) {
    super(args);
    this.state = {
      student: {
        semYr: '',
        studentName: '',
        classTimes: '',
        hoursAvail: 20,
        officeHours: 0,
        studentType: 'GA'
      },
      semester: []

    }
    this.onChangeValue = this.onChangeValue.bind(this)
    this.__onSelect = this.__onSelect.bind(this)
    this.validator = new SimpleReactValidator();
  }

  onChangeValue(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      student: {
        ...this.state.student,
        [name]: value
      },
      semester: [...this.state.semester]
    });
  }

  __onSelect(option) {
    const value = option.value
    this.setState({
      student: {
        ...this.state.student,
        semYr: value
      },
      semester: [...this.state.semester]
    });
  }

  changeHandler = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      student: {
        ...this.state.student,
        [name]: value
      },
      semester: [...this.state.semester]
    });
  }
  onSubmit = async (event) => {
    event.preventDefault()
    if (this.validator.allValid()) {
              const response = await addStudent(this.state.student).catch(error => {
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
      toast.success('Student record added', {
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

  async componentDidMount() {
    let semester = await getAllSemester();
    semester = semester.map(item => ({value: item.id, label: item.Semester}))
    this.setState({...this.state, semester})
  }


  render() {
    return (
        <div className={'container-fluid'}>
          <h1>Student Page</h1>
          <form>
            <div>
              <div className='studentForm container'>
                <div className="mb-3">
                  <label htmlFor="semYr" className="form-label">Semester</label>
                  <Dropdown
                      options={this.state.semester}
                      name="semYr"
                      value={this.state.student.semYr}
                      onChange={this.__onSelect}
                      placeholder="Fall 2022"
                  />
                   {this.validator.message('semester', this.state.student.semYr, 'required|numeric')}
                </div>
                <div className="mb-3" onChange={this.onChangeValue}>
                  Select Student Type:
                  <input type="radio" name="studentType" value="GA" defaultChecked="true"/> GA
                  <input type="radio" name="studentType" value="TA"/> TA
                </div>
                <div className="mb-3">
                  <label htmlFor="studentName" className="form-label">Student Name</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                      name="studentName"
                      value={this.state.student.studentName}
                      onChange={this.changeHandler}
                  />
                    {this.validator.message('studentName', this.state.student.studentName, 'required|alpha_num_space')}
                </div>
                <div className="mb-3">
                  <label htmlFor="hoursAvail" className="form-label">GA Hours</label>
                  <input
                      name='hoursAvail'
                      type={"number"}
                      className="form-control"
                      placeholder="E.g 10"
                      value={this.state.student.hoursAvail}
                      onChange={this.changeHandler}
                  />
                    {this.validator.message('hoursAvail', this.state.student.hoursAvail, 'required|integer|min:10|max:20')}
                </div>
                <div className="mb-3">
                  <label htmlFor="officeHours" className="form-label">Office Hours Duration</label>
                  <input
                      name='officeHours'
                      type={"text"}
                      className="form-control"
                      placeholder="1"
                      defaultValue={this.state.student.officeHours}
                      onChange={this.changeHandler}
                  />
                    {this.validator.message('officeHours', this.state.student.officeHours, 'required|numeric')}
                </div>
                <div className="mb-3">
                  <label htmlFor="officeHours" className="form-label">Class Times (Enter in this Format MW: 1:00PM -
                    2:00PM) Separate multiple classes with comma</label>
                  <input
                      name='classTimes'
                      type={"text"}
                      className="form-control"
                      placeholder="MW 13:00 - 14:00, TH: 15:30 - 17:00"
                      defaultValue={this.state.student.officeHours}
                      onChange={this.changeHandler}
                  />
                     {this.validator.message('classTimes', this.state.student.classTimes, 'required|string')}
                </div>

              </div>
            </div>
          </form>

          <div className={"row"}>
            <div className={"col"}>
              {/* <button onClick={useNavigate('course')}>Next Page </button> */}
              <button onClick={this.onSubmit}>Add Student</button>

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
export default Student;