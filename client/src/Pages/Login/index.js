import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import userContext from '../../Context/UserContext';
import API from '../../utils/API';
import Alert from '../../Components/Alert';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Typography,
	makeStyles,
	Container,
} from '@material-ui/core';

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
		background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Login() {
	const classes = useStyles();

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
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				{error && (
					<Alert
						message={error}
						type="danger"
						clearError={() => setError(undefined)}
					/>
				)}
				<form
					className={classes.form}
					onSubmit={handleSubmit}
					noValidate
				>
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
						onChange={(event) => setEmail(event.target.value)}
					/>
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
							setPassword(event.target.value)
						}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Login
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
