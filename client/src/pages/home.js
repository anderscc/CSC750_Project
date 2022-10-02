import React from "react";

const Home = () => {
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
            </section>
        </div>
    )
}

export default Home;