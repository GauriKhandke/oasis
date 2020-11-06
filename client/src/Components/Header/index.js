import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../../auth/AuthOptions';
import './style.css';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-2">
      <div className="navbar-header">
        <h3 className="navbar-brand">Oasis</h3>
      </div>
      <AuthOptions />
    </nav>
  );
}

export default Header;
