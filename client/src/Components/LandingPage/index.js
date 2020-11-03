import React, { Component } from 'react';
import Header from '../Header/index';
import '../LandingPage/style.css';

class LandingPage extends Component {

    render() {
        return (
            <div className="landingImg">
                <div className="container">
                    <Header />
                </div>
                <div className="content">
                    Welcome to Oasis
                </div>
            </div>
        );
    }
}

export default LandingPage;