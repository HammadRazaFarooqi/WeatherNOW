import React from 'react'
import Main from "./components/Main"
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Compare from "./components/Compare";
import MapComponent from './components/MapComponent';
import AQI from './components/AQI';

function App() {
  return (
    <div>
      
      <Router>
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/compare" element={<Compare/>} />
            <Route path="/map" element={<MapComponent/>} />
            <Route path="/aqi" element={<AQI/>} />
          </Routes>
        </Router>
    
    </div>
  )
}

export default App