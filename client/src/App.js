import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import RecentNotes from './Components/RecentNotes';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Journal from './Pages/Journal/Journal';
import UserContext from './Context/UserContext';

import API from './utils/API'
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

      const tokenResponse = await API.checkValidToken(token);

      if (tokenResponse.data) {
        const userResponse = await API.authenticateUser(token);
        console.log(userResponse.data);

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
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/journal" exact component={Journal} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}
export default App;
