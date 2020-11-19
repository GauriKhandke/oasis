import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Journal from './Pages/Journal/Journal';
import SearchResults from './Pages/SearchResults/SearchResults';
import TextEditor from './Components/TextEditor';
import UserContext from './Context/UserContext';
import API from './utils/API';
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
					<Route path="/searchresults" exact component={SearchResults}/>
					{/* <Route path="/editor" exact component={TextEditor}/> */}
				</Switch>
			</UserContext.Provider>
		</Router>
	);
}
export default App;
