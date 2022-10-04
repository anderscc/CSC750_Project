import React from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from '../pages/home';
import Student from '../pages/student';
import Course from '../pages/course';
import ViewSchedule from '../pages/viewSchedule';
import Navbar from '../Components/navbar';
import Confirmation from '../pages/Confirmation';

function RouterCustom() {
    return (
        <>
        <Routes>
            <Route path='/home' exact element={<Home />} />
            <Route path='/student' exact element={<Student/>} />
            <Route path='/course' exact element={<Course/>} />
            <Route path='/viewSchedule' exact element={<ViewSchedule/>} />
            <Route path= '/confirmation' exact element = {<Confirmation/>}/>
        </Routes>
        <Routes>

        </Routes>
        </>
    );
    }
      
    export default RouterCustom;