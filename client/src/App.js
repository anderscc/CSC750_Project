import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Navbar from '../src/Components/navbar';
import Home from '../src/pages/home';
import Student from '../src/pages/student';
import Course from '../src/pages/course';
import ViewSchedule from '../src/pages/viewSchedule';

function App() {
  return (
      <Router>
      <Navbar />
      <Routes>
          <Route path='/home' exact element={<Home />} />
          <Route path='/student' exact element={<Student/>} />
          <Route path='/course' exact element={<Course/>} />
          <Route path='/ViewSchedule' exact element={<ViewSchedule/>} />
      </Routes>
      </Router>
  );
  }
    
  export default App;
