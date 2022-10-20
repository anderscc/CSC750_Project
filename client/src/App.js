import React, {useEffect, useState} from 'react';
import './App.css';
import Main from './pages/Main';

import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Navbar from '../src/components/navbar';
import Home from '../src/pages/Home';
import Student from '../src/pages/Student';
import Course from '../src/pages/Course';
import ViewSchedule from '../src/pages/Confirmation';
import ViewRecord from '../src/pages/viewRecord';
import 'react-toastify/dist/ReactToastify.css';
import {getAllSemester} from "./services/semesterService";


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
    <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/home' exact element={<Home />} />
        <Route path='/student' exact element={<Student/>} />
        <Route path='/course' exact element={<Course semesters={semesters}/>} />
        <Route path='/viewSchedule' exact element={<ViewSchedule/>} />
        <Route path='/records' exact element={<ViewRecord/>} />
    </Routes>
    </Router>
);
}

export default App;
