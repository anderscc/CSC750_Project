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



import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Navbar from '../src/components/navbar';
import 'react-toastify/dist/ReactToastify.css';
import {getAllSemester} from "./services/semesterService";
import RouterCustom from "./Router/Routes";


function App() {

    let [semesters, setSemesters] = useState([])

    useEffect( () => {
            const  getSemesterOptions = async () =>{
                const semesters = await getAllSemester();
                setSemesters(semesters)
            }

            getSemesterOptions()

    }, [])

  return (
    <Router>
    <Navbar />
        <RouterCustom semesters={semesters} />
    </Router>
);
}

export default App;
