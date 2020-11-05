import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import LoginForm from './Components/Login';
import RegisterForm from './Components/Registration';
import Journal from './Components/Pages/Journal';
import UserContext from './Context/UserContext';
import axios from 'axios';
import './App.css';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');

      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }

      const tokenResponse = await axios.post('/isValidToken', null, {
        headers: { 'x-auth-token': token },
      });

      if (tokenResponse.data) {
        const userResponse = await axios.get('/', {
          headers: { 'x-auth-token': token },
        });

        setUserData({
          token,
          user: userResponse.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <Route exact path="/" exact component={LandingPage} />
          <Route path="/login" exact component={LoginForm} />
          <Route path="/signup" exact component={RegisterForm} />
          <Route path="/journal" exact component={Journal} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}
export default App;
