import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Student from '../pages/Student';
import Course from '../pages/Course';
import ViewSchedule from '../pages/ViewSchedule';
import ViewRecords from "../pages/viewRecords";
import Lab from "../pages/Lab";

function RouterCustom({semesters}) {
    return (
        <>
            <Routes>
                <Route path='/' exact element={<Home />} />
                 <Route path='/home' exact element={<Home />} />
                <Route path='/student' exact element={<Student semesters={semesters}/>} />
                <Route path='/course' exact element={<Course semesters={semesters} />} />
                 <Route path='/lab' exact element={<Lab semesters={semesters} />} />
                <Route path='/viewSchedule' exact element={<ViewSchedule />} />
                <Route path='/viewRecords' exact element={<ViewRecords />} />
            </Routes>
        </>
    );
}

export default RouterCustom;