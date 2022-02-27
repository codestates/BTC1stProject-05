import React, { Component } from 'react';
import {Route, Routes} from "react-router-dom";
import Login from './Login';
import './App.css';
import Signup from "./Signup";
import Home from "./Home";
import Template from './exploer/Template';
import Specific from './exploer/Specific';

class App extends Component {
  render() {
    return (
      <>
        <Routes>
          <Route exact path='/specific' element={<Specific />}/>
          <Route exact path='/block' element={<Template type="Block"/>}/>
          <Route exact path='/tx' element={<Template type="Tx"/>}/>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes> 
      </>
    );
  }
}

export default App;