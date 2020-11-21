import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

//import reach hook data
import UserContext from '../Context/UserContext';

// Styling
import './style.css';

export default function AuthOptions() {

	// UserData from React Custom Hook
	const { userData, setUserData } = useContext(UserContext);

	const history = useHistory();

	// Logout function
	const logout = () => {

		// Set User data to undefined after logout
		setUserData({
			token: undefined,
			user: undefined,
		});
		
		// Clear local storage
		localStorage.setItem('auth-token', '');
		localStorage.setItem('user', '');
		
		// Redirect to landing page after logout
		history.push('/');
	};

	//if user click on search it redirects to search results page
	const searchPage = () => {
		history.push('/searchresults');
	};

	return (
		<div>
			{/* If user data is available, show search and logout buttons */}
			{userData.user ? (
				<>	
				    {/* button for logout */}
					 	<button
							className=" btn btn-outline-dark btn-md mr-2 float-right custom-btn"
							onClick={logout}
						>
							Logout
						</button>
						
						{/* button for search results page */}
						<button
							className=" btn btn-outline-dark btn-md mr-2 float-right custom-btn"
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
