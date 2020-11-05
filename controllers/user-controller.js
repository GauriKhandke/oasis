const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const auth = require('../middleware/auth');

module.exports = {
	// Register new user
	signupUser: async ({ body }, res) => {
		try {
			let {
				firstname,
				lastname,
				email,
				password,
				confirmPassword,
			} = body;

			console.log(
				'The signup list is : ' + firstname,
				lastname,
				email,
				password
			);
			// Validations

			// validation for Empty Fields
			if (
				!firstname ||
				!lastname ||
				!email ||
				!password ||
				!confirmPassword
			) {
				return res
					.status(400)
					.json({ msg: 'All fields are required!!' });
			}

			// validation for password length
			if (password.length < 8) {
				return res
					.status(400)
					.json({
						msg:
							'Password should contain atleast 8 characters!!',
					});
			}

			// validation for matching password and confirm password
			if (password != confirmPassword) {
				return res.status(400).json({ msg: 'Password mismatch!!' });
			}

			// checking in the DB for unique email address
			const existingUser = await User.findOne({ email: email });

			// If user with email already exists
			if (existingUser)
				return res
					.status(400)
					.json({ msg: 'Email already exists!' });

			// hashing the password using bcrypt js
			const salt = await bcrypt.genSalt();
			const hashedPwd = await bcrypt.hash(password, salt);
			console.log(hashedPwd);

			// Create new user to register into db
			const newUser = new User({
				firstname,
				lastname,
				email,
				password: hashedPwd,
			});

			// saving the new user in the database
			const savedUser = await newUser.save();
			res.json(savedUser);
		} catch (err) {
			res.status(500).json(err.message);
		}
	},

	// Login user
	loginUser: async ({ body }, res) => {
		try {
			let { email, password } = body;
			console.log('Email,Password :' + email, password);

			//validations

			// validations for empty fields
			if (!email || !password)
				return res
					.status(400)
					.json({ msg: 'Fields cannot be empty!' });

			// fetching the data from DB
			const user = await User.findOne({ email: email });

			// If user does not exists
			if (!user)
				return res
					.status(400)
					.json({
						msg: 'No account registered with this email',
					});

			// Compare registered password with entered password
			const pwdMatch = await bcrypt.compare(password, user.password);

			// If password do not match
			if (!pwdMatch)
				return res.status(400).json({ msg: 'Invalid Credentials' });

			console.log('Password Match : ' + pwdMatch);

			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
			console.log('token: ' + token);

			res.json({
				token,
				user: {
					id: user._id,
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email,
				},
			});
		} catch (err) {
			res.status(500).json(err.message);
		}
	},

	checkValidToken: async (req, res) => {
		try {
			const token = req.header('x-auth-token');

			if (!token) return res.json(false);

			const verified = jwt.verify(token, process.env.JWT_SECRET);
			if (!verified) return res.json(false);

			console.log('Verified User : ' + JSON.stringify(verified));

			const user = await User.findById(verified.id);
			if (!user) return res.json(false);

			return res.json(true);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},

	getAuthenticatedUser: async (req, res) => {
		const user = await User.findById(req.userId);
		res.json({
			id: user._id,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
		});
	},
};
