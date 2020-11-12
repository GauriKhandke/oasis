import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../LandingPage/style.css';
import logo from '../../images/logo.png';

class LandingPage extends Component {


  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-2">
          <div className="navbar-header mx-auto">
          <img className="logo" src={logo} alt="logo"></img>
            <h3 className="navbar-brand icon">Oasis</h3>
          </div>
          <div className="collapse navbar-collapse mx-auto" id="navbarNav">
            <div className="nav-link mx-auto">
              <button className="btn  btn-lg"> {<Link to="/login">Login</Link>}</button>
             
              <button className="btn  btn-lg">{<Link to="/contact">Contact</Link>}</button>
            </div>
          </div>
        </nav>
      
          <div className="landingImg">
            <div className="text-center">
              <h1>Discover Oasis</h1>
              <h2>Keep a Diary, One day it will keep you</h2>
            </div>
          </div>
        
      </>
    );
  }
}

export default LandingPage;
