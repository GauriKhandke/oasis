import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../LandingPage/style.css';
import logo from '../../images/logo.png';
import Animation from './Animation';
class LandingPage extends Component {
  render() {
    return (
      <>
          <nav className="jumbotron position-fixed">
            <img className="logo" src={logo} alt="logo"></img>
            <h3 className="position-fixed icon">Oasis</h3>
            <div>
              <Link className="btn btn-outline-dark btn-lg float-right" to="/login">Login</Link>
            </div>
          </nav>
    
          <div className="landingImg">
          <Animation>
            <div className="text-center">
              <h1>Discover Oasis</h1>
              <h2>Keep a Diary, One day it will keep you</h2>
            </div>
            </Animation>
          </div>

      </>
    );
  }
}

export default LandingPage;