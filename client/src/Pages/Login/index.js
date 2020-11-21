import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

// react custom hook
import userContext from '../../Context/UserContext';

// API calls
import API from '../../utils/API';

//Bootstrap alert component for validations
import Alert from '../../Components/Alert';

// Styling
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, makeStyles, Container } from '@material-ui/core';
import { Card, Jumbotron } from 'react-bootstrap';
import HomeIcon from '@material-ui/icons/Home';
import logo from '../../images/logo5.jpg';
import './style.css';

// Material UI styles for login form
const useStyles = makeStyles((theme) => ({
	
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},

	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},

	submit: {
		background: 'linear-gradient(45deg, #556270 30%, #ff6b6b 90%)',
		margin: theme.spacing(3, 0, 2),
	},
}));

// Login component
export default function Login() {
	
	// Use material ui styles
	const classes = useStyles();
	
 	// Set Email
	const [email, setEmail] = useState();

	// Set Password
	const [password, setPassword] = useState();

	// Set error for validation
	const [error, setError] = useState();
	
	// User Date from react custom hooks
	const { setUserData } = useContext(userContext);
	const history = useHistory();



	// Handle login button submit
	const handleSubmit = async (event) => {
	
		event.preventDefault();

		try {
			const loginUser = { email, password };
			
			// API call to check the User Authentication
			const loginRes = await API.loginRes(loginUser);

			// Set User data if user is authenticated
			setUserData({
				token: loginRes.data.token,
				user: loginRes.data.user,
			});

			// Store auth-token and user data into local storage
			localStorage.setItem('auth-token', loginRes.data.token);
			localStorage.setItem('user', loginRes.data.user);
			
			// If authenticated user, go to journal page 
			history.push('/journal');

		} catch (error) {
			
			error.response.data.msg && setError(error.response.data.msg);
		}
	};

	
	// If the user clicks on clicks go back to landing page
	const gotoHome = () => {
		history.push('/');
	};

	
	// Login JSX 
	return (
		<>
			<div className="background-img">
			<Jumbotron className="JumbotronStyle" fluid="true" style={{ background:'#f5f5f5' , borderRadius: '5px', paddingLeft :'15px', paddingRight :'15px', paddingTop :'40px', paddingBottom :'65px', margin: '0px'}}>
          <div>
						{/* Logo */}
            <img className="logo" src={logo} alt="logo"></img>
						
						{/* Home button to go back to landing page */}
            <button
              className="btn btn-outline-dark btn-md float-right custom-btn"
              onClick = {gotoHome} >
              <HomeIcon style= {{ fontSize: 25 }} />
            </button>
          </div>
        </Jumbotron>
				<br />
				<br />
				<br />
				
				{/* login Form*/}
				<div className="d-flex justify-content-center my-auto">
					
					{/* Login form card */}
					<Card
						className="shadow z-depth-8 card-border"
						style={{ width: '25rem' }}
					>
						<Card.Body>
							<Container component="main" maxWidth="xs">
								<CssBaseline />
								<div className={classes.paper}>
									<Avatar
										className={classes.avatar}
									></Avatar>
									<Typography
										component="h1"
										variant="h5"
									>
										Login
									</Typography>

									{/* Validation alert */}
									{error && (
										<Alert
											message={error}
											type="danger"
											clearError={() =>
												setError(undefined)
											}
										/>
									)}
									<form
										className={classes.form}
										onSubmit={handleSubmit}
										noValidate
									>
										
										{/* Email Input */}
										<TextField
											variant="outlined"
											margin="normal"
											required
											fullWidth
											id="email"
											label="Email Address"
											name="email"
											autoComplete="email"
											autoFocus
											onChange={(event) =>
												setEmail(
													event.target
														.value
												)
											}
										/>

										{/* Password input */}
										<TextField
											variant="outlined"
											margin="normal"
											required
											fullWidth
											name="password"
											label="Password"
											type="password"
											id="password"
											autoComplete="current-password"
											onChange={(event) =>
												setPassword(
													event.target
														.value
												)
											}
										/>

										{/* Login Button */}
										<Button
											type="submit"
											fullWidth
											variant="contained"
											color="primary"
											className={
												classes.submit
											}
										>
											Login
										</Button>

										<Grid container>
											<Grid item xs></Grid>
											<Grid item>
												<Link
													href="/signup"
													variant="body2"
												>
													{
														"Don't have an account? Sign Up"
													}
												</Link>
											</Grid>
										</Grid>
									</form>
								</div>
							</Container>
						</Card.Body>
					</Card>
				</div>
			</div>
		</>
	);
}
