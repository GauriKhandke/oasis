import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';
import './style.css';
import logo from '../../images/logo.png';
import Animation from './Animation';
class LandingPage extends Component {
  render() {
    return (
      <>
         <Jumbotron className="JumbotronStyle" fluid="true" style={{ background:'#f5f5f5' , borderRadius: '5px', paddingLeft :'15px', paddingRight :'15px', paddingTop :'40px', paddingBottom :'65px', margin: '0px'}}>
          <div>
            <img className="logo" src={logo} alt="logo"></img>
            <Link
              className="btn btn-outline-dark btn-md float-right custom-btn"
              to="/login" >
              Login
            </Link>
          </div>
        </Jumbotron>

        <div className="landingImg  ">
          <Animation>
            <div className="text-center">
            <div className="animation-center">
              <h4>Allow your words to escape you.</h4>
            </div>
            </div>
          </Animation>
        </div>
      </>
    );
  }
}

export default LandingPage;
