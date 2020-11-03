import React, { Component } from "react";
import { Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import "./App.css";

function App() {
  return (
    <div>
      <Route path="/" exact component={LandingPage} />
    
    </div>
  );
}


export default App;
