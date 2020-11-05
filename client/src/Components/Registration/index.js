import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../Header';
import axios from 'axios';

export default function SignUp() {
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  // Add error

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newUser = { firstname, lastname, email, password, confirmPassword };

      await axios.post('/api/signup', newUser);

      history.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="base-container">
        <div>
          <h2>Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">First Name</label>
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <button className="btn-secondary mx-auto" type="submit">
            Sign Up
          </button>

          <div className="mx-auto">
            Already have an account? Please{' '}
            {<Link to="/login">Login here</Link>}
          </div>
        </form>
      </div>
    </div>
  );
}
