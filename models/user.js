const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstname: {
		type: String,
		trim: true,
		required: 'Firstname is required',
	},

	lastname: {
		type: String,
		trim: true,
		required: 'Lastname is required',
	},

	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: 'Email address is required',
		// validate: [email, 'Please fill a valid email address'],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please fill a valid email address',
		],
	},

	password: {
		type: String,
		required: 'Password is required',
		minLength: 6,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
