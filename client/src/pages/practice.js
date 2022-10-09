<form>
<div className='studentForm container'>
      <div className="mb-3">
        <label htmlFor="studentName" className="form-label">Student Name</label>
        <input
            type="text"
            className="form-control"
            ref="studentName"
            placeholder="John Doe"
            defaultValue={this.props.values.studentName}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="hoursAvail" className="form-label">GA Hours</label>
        <input
            name='hoursAvail'
            type={"number"}
            className="form-control"
            ref="hoursAvail"
            placeholder="E.g 10"
            defaultValue={this.props.values.hoursAvail}
        />
      </div>
        <div className="mb-3">
        <label htmlFor="coursePref" className="form-label">Course Preference</label>
        <input
            name='coursePref'
            type={"text"}
            className="form-control"
            ref="coursePref"
            placeholder=""
            defaultValue ={this.props.values.coursePref}
        />
      </div>
        <div className="mb-3">
        <label htmlFor="facultyPref" className="form-label">Faculty Preference</label>
        <input
            name='coursePref'
            type={"text"}
            className="form-control"
            ref="facultyPref"
            placeholder=""
            defaultValue={this.prop.values.facultyPref}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="officeHours" className="form-label">Office Hours Duration</label>
        <input
            name='officeHours'
            type={"text"}
            className="form-control"
            ref="officeHours"
            placeholder="1"
            defaultValue={this.props.values.officeHours}
        />
      </div>
      <div className="mb-3">
          <label htmlFor="officeHours" className="form-label">Class Times (Enter in this Format MW: 1:00PM - 2:00PM) Separate multiple classes with comma</label>
          <input
              name='classTimes'
              type={"text"}
              className="form-control"
              ref="classTimes"
              placeholder="MW: 1:00PM - 2:00PM, TH: 1:00PM - 2:00PM"
              defaultValue={this.props.values.officeHours}
          />
      </div>
        <div className={"row"}>
            <div className={"col"}>
                <button onClick={this.nextStep.bind(this)}>Next Page</button>
                <button onClick = {this.previousStep(this)}>Previous Page</button>
            </div>
        </div>
      </div>
    <br/>
    </form>
