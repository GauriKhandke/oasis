import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../../auth/AuthOptions';
import logo from '../../images/logo5.jpg';
import { Jumbotron, Container } from 'react-bootstrap';
import './style.css';

function Header() {
  return (
    <Jumbotron className="JumbotronStyle" fluid="true" style={{ background:'#f5f5f5' , borderRadius: '5px', paddingLeft :'10px', paddingRight :'10px', paddingTop :'40px', paddingBottom :'65px', margin: '0px'}}>
      <div>
        <img className="logo" src={logo} alt="logo"></img>
      </div>
      <div>
         <AuthOptions />
      </div>   
    </Jumbotron>
  );
}

export default Header;
