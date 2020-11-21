const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

	// firstname of the user
	firstname: {
		type: String,
		trim: true,
		required: 'Firstname is required',
	},
	
	// lastname of the user
	lastname: {
		type: String,
		trim: true,
		required: 'Lastname is required',
	},

  //unique email of the user 
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: 'Email address is required',
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please fill a valid email address',
		],
	},

  //password of the user
	password: {
		type: String,
		required: 'Password is required',
		minLength: 6,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
