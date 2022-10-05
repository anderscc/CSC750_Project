import React, { Component } from "react";

class Home extends Component {
    constructor(args) {
        super(args);
        this.state = {
        }
      }

    render(){
        return(
            <div className={'container-fluid'}>
                <section className="home" id="home">
                <h1> Welcome to the Graduate Assistant Systems Scheduler (GASS)!</h1>
                <p> Here we aim to solve your problems of scheduling conflicts between
                    busy schedules of Graduate Assistants and Teaching Assistants as well
                    as meeting the needs of faculty and course requirements. This software also
                    schedules the necessary time required for lab meetings while respecting the time
                    constraints of half and full-time graduate/teaching assistants.
                </p>
                <p> This button below tests the next page feature to see if it is working</p>
                <button onClick={this.nextStep.bind(this)}>Next Page</button>
                
                </section>
            </div>
        )
    }
    
    //function to advance to the next page
    nextStep() {
        this.props.nextStep();
      }
}

export default Home;
