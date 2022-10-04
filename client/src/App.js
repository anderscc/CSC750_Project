import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Navbar from './Components/Navbar';
import RouterCustom from './Router/Routes';
import Main from './pages/Main';


function App() {
  return (
    <Router>
      <Main/>
    </Router>

  //     <Router>
  //     <Navbar />
  //       <RouterCustom/>
  //     </Router>
    );
  }
    
  export default App;
