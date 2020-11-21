import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

// Styling
import { Jumbotron } from 'react-bootstrap';
import Animation from './Animation';
import logo from '../../images/logo5.jpg';
import './style.css';

class LandingPage extends Component {
  render() {
    return (
      <>
       {/* Jumbotron  */}
         <Jumbotron className="JumbotronStyle" fluid="true" style={{ background:'#f5f5f5' , borderRadius: '5px', paddingLeft :'15px', paddingRight :'15px', paddingTop :'40px', paddingBottom :'65px', margin: '0px'}}>
          
          <div>
            {/* Logo */}
            <img className="logo" src={logo} alt="logo"></img>

            {/* Login Button */}
            <Link
              className="btn btn-outline-dark btn-md float-right custom-btn"
              to="/login" >
              Login
            </Link>
          </div>
        </Jumbotron>
        
        {/*Animation for the landing page text  */}
        <div className="landingImg">
          <Animation />
        </div>
      </>
    );
  }
}

export default LandingPage;
