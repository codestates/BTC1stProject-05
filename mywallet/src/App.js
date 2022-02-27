import React, { Component } from 'react';
import {Route, Routes} from "react-router-dom";
import Login from './Login';
import './App.css';
import Signup from "./Signup";
import Home from "./Home";
import Template from './exploer/Template';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="App">
          <Routes>
            <Route path='/block' element={<Template type="Block"/>}/>
            <Route path='/tx' element={<Template type="Tx"/>}/>
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