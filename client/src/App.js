import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Navbar from './Components/navbar';
import RouterCustom from './Router/Routes';

function App() {
  return (
      <Router>
      <Navbar />
        <RouterCustom/>
      </Router>
  );
  }
    
  export default App;
