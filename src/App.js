import React from 'react'
import Main from "./components/Main"
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Compare from "./components/Compare";

function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/compare" element={<Compare/>} />
          </Routes>
        </Router>
    
    </div>
  )
}

export default App