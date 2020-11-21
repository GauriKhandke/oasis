import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import LandingPage from './Components/LandingPage';

// Pages
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Journal from './Pages/Journal/Journal';
import SearchResults from './Pages/SearchResults/SearchResults';

// react custom hook
import UserContext from './Context/UserContext';

// API
import API from './utils/API';

function App() {

	//  Set User data 
	const [userData, setUserData] = useState({
		token: undefined,
		user: undefined,
	});


	useEffect(() => {
		
		// Check for user authentication
		const checkLoggedIn = async () => {
			
			// Fetch auth-token from local storage
			let token = localStorage.getItem('auth-token');

			if (token === null) {
				localStorage.setItem('auth-token', '');
				token = '';
			}
			
      // API call to check for a valid token
			const tokenResponse = await API.checkValidToken(token);

			// If there is a valid token
			if (tokenResponse.data) {

				// Check user authentication
				const userResponse = await API.authenticateUser(token);

				// set the user data and token
				setUserData({
					token,
					user: userResponse.data,
				});
			}
		};

		checkLoggedIn();
	}, []);

	// JSX
	return (
		// Routes for pages
		<Router>
			
			{/* Context API */}
			<UserContext.Provider value={{ userData, setUserData }}>

				{/* Router */}
				<Switch>
					<Route exact path="/" exact component={LandingPage} />
					<Route path="/login" exact component={Login} />
					<Route path="/signup" exact component={Signup} />
					<Route path="/journal" exact component={Journal} />
					<Route path="/searchresults" exact component={SearchResults}/>
				</Switch>

			</UserContext.Provider>
		</Router>
	);
}
export default App;
