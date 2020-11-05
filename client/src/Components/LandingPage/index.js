import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../LandingPage/style.css';

class LandingPage extends Component {
  render() {
    return (
      <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light py-2">
          <div class="navbar-header">
            <h3 class="navbar-brand">Oasis</h3>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="landingImg">
          <div className="content">Welcome to Oasis</div>
        </div>
      </>
    );
  }
}

export default LandingPage;
