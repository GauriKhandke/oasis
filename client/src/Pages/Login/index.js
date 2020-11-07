import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import userContext from '../../Context/UserContext';
import Header from '../../Components/Header';
import API from '../../utils/API';
import './style.css';
import Alert from '../../Components/Alert';
// import { TokenExpiredError } from 'jsonwebtoken';

export default function Login() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState();

	const { setUserData } = useContext(userContext);
	const history = useHistory();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const loginUser = { email, password };
			const loginRes = await API.loginRes(loginUser);

			setUserData({
				token: loginRes.data.token,
				user: loginRes.data.user,
			});

			localStorage.setItem('auth-token', loginRes.data.token);
			history.push('/journal');
		} catch (error) {
			console.log('Error : ' + error);
			error.response.data.msg && setError(error.response.data.msg);
		}
	};

	return (
		<div>
			<Header />
			{error && < Alert message={error} type="danger" clearError={() => setError(undefined)} />}
			<div className="base-container mx-auto">
				<form className="login-form" onSubmit={handleSubmit}>
					<div className="form-group mx-auto">
						<h3>Login</h3>
						<label htmlFor="email">Email</label>
						<input
							type="text"
							name="email"
							placeholder="Email"
							onChange={(event) =>
								setEmail(event.target.value)
							}
						/>
					</div>
					<div className="form-group mx-auto">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							placeholder="Password"
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>
					</div>
					<button
						className="btn-secondary mx-auto"
						type="submit"
					>
						Login
					</button>

					<div className="mx-auto">
						Not a member? Please{' '}
						{<Link to="/signup">Sign Up</Link>}
					</div>
				</form>
			</div>
		</div>
	);
}
