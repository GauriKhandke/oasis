import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import Alert from '../../Components/Alert';

// API
import API from '../../utils/API';

// Styling
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, makeStyles, Container } from '@material-ui/core';
import { Card, Jumbotron } from 'react-bootstrap';
import HomeIcon from '@material-ui/icons/Home';
import logo from '../../images/logo5.jpg';
import './style.css';

// Material UI styles
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
		marginTop: theme.spacing(3),
	},
	
	submit: {
		margin: theme.spacing(3, 0, 2),
		background: 'linear-gradient(45deg, #556270 30%, #ff6b6b 90%)',
	},
}));


// Sign up page
export default function Signup() {
	
	const classes = useStyles();

	// Set User data
	const [firstname, setFirstName] = useState();
	const [lastname, setLastName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();

	//set error for validations
	const [error, setError] = useState();

	const history = useHistory();

	// Handle sign up form submit
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {

			// Create new user
			const newUser = {
				firstname,
				lastname,
				email,
				password,
				confirmPassword,
			};

		// Register new user into database
			await API.SignUpRes(newUser);

			// After signup, go to login page
			history.push('/login');

		} catch (error) {
			error.response.data.msg && setError(error.response.data.msg);
		}
	};

	// Home button goes back to landing page 
	const gotoHome = () => {
		history.push('/');
	};


	// JSX
	return (
		<>
			<div className="background-img">
				
				{/* jumbotron  */}
				<Jumbotron className="JumbotronStyle" fluid="true" style={{ background:'#f5f5f5' , borderRadius: '5px', paddingLeft :'15px', paddingRight :'15px', paddingTop :'40px', paddingBottom :'65px', margin: '0px'}}>
          <div>

						{/* Logo */}
            <img className="signuplogo" src={logo} alt="logo"></img>
           
					 	{/* button for going back to landing page */}
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
				<div className="d-flex justify-content-center my-auto">
					
					{/* Sign up form card */}
					<Card
						className="shadow z-depth-8 card-border mx-2 mb-3"
						style={{ width: '30rem' }}
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
										Sign Up
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
										<Grid container spacing={2}>
											<Grid
												item
												xs={12}
												sm={6}
											>
												{/* Firstname input */}
												<TextField
													autoComplete="fname"
													name="firstname"
													variant="outlined"
													required
													fullWidth
													id="firstName"
													label="First Name"
													autoFocus
													onChange={(
														event
													) =>
														setFirstName(
															event
																.target
																.value
														)
													}
												/>
											</Grid>
											<Grid
												item
												xs={12}
												sm={6}
											>
												{/* Lastname input */}
												<TextField
													variant="outlined"
													required
													fullWidth
													id="lastName"
													label="Last Name"
													name="lastname"
													autoComplete="lname"
													onChange={(
														event
													) =>
														setLastName(
															event
																.target
																.value
														)
													}
												/>
											</Grid>
											<Grid item xs={12}>

												{/* Email Input */}
												<TextField
													variant="outlined"
													required
													fullWidth
													id="email"
													label="Email Address"
													name="email"
													autoComplete="email"
													onChange={(
														event
													) =>
														setEmail(
															event
																.target
																.value
														)
													}
												/>
											</Grid>
											<Grid item xs={12}>
												
												{/* Password Input */}
												<TextField
													variant="outlined"
													required
													fullWidth
													name="password"
													label="Password"
													type="password"
													id="password"
													autoComplete="current-password"
													onChange={(
														event
													) =>
														setPassword(
															event
																.target
																.value
														)
													}
												/>
											</Grid>
											<Grid item xs={12}>
												
												{/* Confirm Password input */}
												<TextField
													variant="outlined"
													required
													fullWidth
													name="confirmPassword"
													label="Confirm Password"
													type="password"
													id="confirmPassword"
													autoComplete="current-password"
													onChange={(
														event
													) =>
														setConfirmPassword(
															event
																.target
																.value
														)
													}
												/>
											</Grid>
										</Grid>

										{/* Submit button */}
										<Button
											type="submit"
											fullWidth
											variant="contained"
											color="primary"
											className={
												classes.submit
											}
										>
											Sign Up
										</Button>
										<Grid
											container
											justify="flex-end"
										>
											<Grid item>
												<Link
													href="/login"
													variant="body2"
												>
													Already have an
													account? Login
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
