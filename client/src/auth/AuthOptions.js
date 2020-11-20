import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import { Button } from 'react-bootstrap';

import './style.css';

import Header from '../Components/Header';

export default function AuthOptions() {
	const { userData, setUserData } = useContext(UserContext);

	const history = useHistory();

	const logout = () => {
		setUserData({
			token: undefined,
			user: undefined,
		});
		localStorage.setItem('auth-token', '');
		localStorage.setItem('user', '');
		history.push('/');
	};

	const searchPage = () => {
		history.push('/searchresults');
	};

	return (
		<div>
			{userData.user ? (
				<>	
				 
					 	<button
							className=" btn btn-outline-dark btn-md mr-2 float-right"
							onClick={logout}
						>
							Logout
						</button>

						<button
							className=" btn btn-outline-dark btn-md mr-2 float-right"
							onClick={searchPage}
						>
					
							Search
						</button>
					
				</>
			) : (
				<></>
			)}
		</div>
	);
}
