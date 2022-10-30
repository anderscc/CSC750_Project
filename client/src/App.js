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
