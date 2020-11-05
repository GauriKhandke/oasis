import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../../auth/AuthOptions';
import './style.css';

function Header() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light py-2">
      <div class="navbar-header">
        <h3 class="navbar-brand">Oasis</h3>
      </div>
      <AuthOptions />
    </nav>
  );
}

export default Header;
