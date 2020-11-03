import React, { Component } from 'react';
import Header from './Header';
import '../Landing.css';

class LandingPage extends Component {

    render() {

        return (
            <div className="landingImg">
                <div className="container">
                    <Header />
                </div>
                <div className="content">
                    <h1>Welcome to Oasis</h1>
                </div>
            </div>
        );
    }
}

export default LandingPage;