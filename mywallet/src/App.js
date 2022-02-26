import React, { Component } from 'react';
import {Route, Routes} from "react-router-dom";
import Login from './Login';
import './App.css';
import Signup from "./Signup";
import Home from "./Home";
class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
        </Routes> 
        </div>
      </div>
    );
  }
}

export default App;