import React from 'react';
import './App.css';
import Main from './pages/Main';

import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Student from '../src/pages/Student';
import Course from '../src/pages/Course';
import ViewSchedule from '../src/pages/Confirmation';
import ViewRecord from '../src/pages/viewRecord';


function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
        <Route path='/home' exact element={<Home />} />
        <Route path='/student' exact element={<Student/>} />
        <Route path='/course' exact element={<Course/>} />
        <Route path='/viewSchedule' exact element={<ViewSchedule/>} />
        <Route path='/confirmation' exact element={<ViewRecord/>} />
    </Routes>
    </Router>
);
}

export default App;
