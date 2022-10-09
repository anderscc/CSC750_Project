import React, { Component } from "react";

//True for GA; false for TA - fixBUG

class StudentForm extends Component{
    constructor(args){
        super(args);
        this.state = {
            formValues : [{
            }]
        }
            this.handleSubmit = this.handleSubmit.bind(this)
    }
        
        handleChange(i, e) {
          let formValues = this.state.formValues;
          formValues[i][e.target.name] = e.target.value;
          this.setState({ formValues });
        }
      
        addFormFields() {
          this.setState(({
            formValues: [...this.state.formValues, { studentName: '',
                    classTimes:'',
                    hoursAvail:'',
                    coursePref:'',
                    facultyPref:'',
                    officeHours: '', 
                  }]
          }))

        }
      
        removeFormFields(i) {
          let formValues = this.state.formValues;
          formValues.splice(i, 1);
          this.setState({ formValues });
        }

      
        handleSubmit(event) {
          event.preventDefault();
          for(var i=0; i<this.state.formValues.length; i++){
            var data = {
              studentName: this.state.formValues[i].studentName,
              classTimes: this.state.formValues[i].classTimes,
              hoursAvail: this.state.formValues[i].hoursAvail,
              coursePref:this.state.formValues[i].coursePref,
              facultyPref:this.state.formValues[i].facultyPref,
              officeHours: this.state.formValues[i].officeHours,
              gaClassAttendance: this.state.formValues[i].gaClassAttendance,
            }
            this.props.handleData(data)
          }
        }
      
        render() {
      
          return (
              <form>
                {this.state.formValues.map((element, index) => (
                <div className="form-inline" key={index}>
                  <div className="mb-3">
                    <label htmlFor="studentName" className="form-label">What Semester are These Courses For?</label>
                      <select>
                        <option value="Fall 2022"> Fall 2022</option>
                        <option value=""> Spring 2023</option>
                        <option value=""> Summer 2023</option>
                        <option value=""> Fall 2023</option>
                      </select>
                  </div>
                    <label htmlFor="studentName" className="form-label">Student Name</label>
                        <input
                          name = "studentName"
                          type="text"
                          className="form-control"
                          ref="studentName"
                          placeholder="John Doe"
                          value={element.studentName}
                          onChange={e => this.handleChange(index, e)}
                        />
                      <label htmlFor="studentType" className="form-label">Is This a GA or TA:</label>
                        <input
                            name='studentType'
                            type="radio"
                            ref="studentType"
                            value = {element.studentType}
                            onChange={e => this.handleChange(index, e)}
                        /> GA
                        <input
                            name='studentType'
                            type="radio"
                            ref="studentType"
                            value = {element.studentType}
                            onChange={e => this.handleChange(index, e)}
                        /> TA
                    <br></br><label htmlFor="hoursAvail" className="form-label">GA Hours</label>
                        <input
                            name='hoursAvail'
                            type={"number"}
                            className="form-control"
                            ref="hoursAvail"
                            placeholder="E.g 10"
                            value = {element.hoursAvail}
                            onChange={e => this.handleChange(index, e)}
                        />
                    <label htmlFor="coursePref" className="form-label">Course Preference</label>
                        <input
                            name='coursePref'
                            type={"text"}
                            className="form-control"
                            ref="coursePref"
                            placeholder=""
                            value = {element.coursePref}
                            onChange={e => this.handleChange(index, e)}
                        />
                    <label htmlFor="facultyPref" className="form-label">Faculty Preference</label>
                        <input
                            name='facultyPref'
                            type={"text"}
                            className="form-control"
                            ref="facultyPref"
                            placeholder=""
                            value = {element.facultyPref}
                            onChange={e => this.handleChange(index, e)}
                        />
                    <label htmlFor="officeHours" className="form-label">Office Hours Duration</label>
                        <input
                            name='officeHours'
                            type={"text"}
                            className="form-control"
                            ref="officeHours"
                            placeholder="1"
                            value = {element.officeHours}
                            onChange={e => this.handleChange(index, e)}
                        />
                        <label htmlFor="officeHours" className="form-label">Class Times (Enter in this Format MW: 1:00PM - 2:00PM) Separate multiple classes with comma</label>
                            <input
                                name='classTimes'
                                type={"text"}
                                className="form-control"
                                ref="classTimes"
                                placeholder="MW: 1:00PM - 2:00PM, TH: 1:00PM - 2:00PM"
                                value = {element.classTimes}
                                
                            /><br></br>
                    {
                      index ? 
                        <button type="button"  className="button remove" onClick={() => this.removeFormFields(index)}>Remove</button> 
                      : null
                    }
                  </div>
                ))}
                <div className="button-section">
                    <button className="button add" type="button" onClick={() => this.addFormFields()}>Add</button>
                    <button className="button submit" type="submit" onClick={this.handleSubmit}>Submit</button>
                </div>
            </form>
          );
        }
}


export default StudentForm;
/*
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(i, e) {
    let formValues = this.state.formValues;
    formValues[i][e.target.name] = e.target.value;
    this.setState({ formValues });
  }

  addFormFields() {
    this.setState(({
      formValues: [...this.state.formValues, { name: "", email: "" }]
    }))
  }

  removeFormFields(i) {
    let formValues = this.state.formValues;
    formValues.splice(i, 1);
    this.setState({ formValues });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(JSON.stringify(this.state.formValues));
  }

  render() {

    return (
        <form  onSubmit={this.handleSubmit}>
          {this.state.formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              <label>Name</label>
              <input type="text" name="name" value={element.name || ""} onChange={e => this.handleChange(index, e)} />
              <label>Email</label>
              <input type="text" name="email" value={element.email || ""} onChange={e => this.handleChange(index, e)} />
              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => this.removeFormFields(index)}>Remove</button> 
                : null
              }
            </div>
          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => this.addFormFields()}>Add</button>
              <button className="button submit" type="submit">Submit</button>
          </div>
      </form>
    );
  }
}
*/
