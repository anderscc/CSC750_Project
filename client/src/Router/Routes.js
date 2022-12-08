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
                <Route path='/' exact element={<Home semesters={semesters}/>} />
                 <Route path='/home' exact element={<Home semesters={semesters} />} />
                <Route path='/student' exact element={<Student semesters={semesters}/>} />
                <Route path='/course' exact element={<Course semesters={semesters} />} />
                 <Route path='/lab' exact element={<Lab semesters={semesters} />} />
                <Route path='/viewSchedule' exact element={<ViewSchedule semesters={semesters} />} />
                <Route path='/viewRecords' exact element={<ViewRecords />} />
            </Routes>
        </>
    );
}

export default RouterCustom;