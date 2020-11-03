import React, { Component } from "react";
import { Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import RegisterForm from './Components/Registration';
import LoginForm from './Components/Login';
import "./App.css";

function App() {
  return (
    <div>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" exact component={LoginForm} />
      <Route path="/register" exact component={RegisterForm} />
    </div>
  );
}


export default App;
