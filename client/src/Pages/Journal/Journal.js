import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import Header from '../../Components/Header';
import UserContext from '../../Context/UserContext';

export default function Journal() {
	const { userData } = useContext(UserContext);

	return (
		<div>
			<Header />
			{userData.user ? (
				<div>
					<h1>Welcome to our Journal Page!!!</h1>
				</div>
			) : (
        <>
				<Link to="/login">Please login</Link>
        </>
			)}
		</div>
	);
}
