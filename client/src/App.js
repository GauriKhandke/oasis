import React, { Component } from "react";
import { Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import RegisterForm from './Components/Registration';
import "./App.css";

function App() {
  return (
    <div>
      <Route path="/" exact component={LandingPage} />
      <Route path="/register" exact component={RegisterForm} />
    </div>
  );
}


export default App;
