const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var validator = require('validator');
const db = require('../models');

module.exports = {
  
  // Register new user
  signupUser: async ({ body }, res) => {
    try {
      
      let { firstname, lastname, email, password, confirmPassword } = body;

      // validation for Empty Fields
      if (!firstname || !lastname || !email || !password || !confirmPassword) {
        return res.status(400).json({ msg: 'Fields cannot be empty' });
      }

      // validation for email
      if (!validator.isEmail(email))
        return res.status(400).json({
          msg: 'Please enter a valid Email',
        });

      // validation for password length
      if (password.length < 8) {
        return res.status(400).json({
          msg: 'Password should contain atleast 8 characters!',
        });
      }

      // validation for matching password and confirm password
      if (password != confirmPassword) {
        return res.status(400).json({ msg: 'Password mismatch!!' });
      }

      // checking in the DB for unique email address
      const existingUser = await db.User.findOne({ email: email });

      // If user with email already exists
      if (existingUser)
        return res.status(400).json({ msg: 'Email already exists!' });

      // hashing the password using bcrypt js
      const salt = await bcrypt.genSalt();
      const hashedPwd = await bcrypt.hash(password, salt);

      // Create new user to register into db
	   const newUser = new db.User({
        firstname,
        lastname,
        email,
        password: hashedPwd,
      });
     
      //saves the user data in the DB after clicking on signup
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
	 
      //validations

      // validations for empty fields
      if (!email || !password)
        return res.status(400).json({ msg: 'Fields cannot be empty' });

      // validations for email
      if (!validator.isEmail(email))
        return res.status(400).json({
          msg: 'Please Enter a valid Email !!',
        });

      // fetching the data from DB
      const user = await db.User.findOne({ email: email });

      // If user does not exists
      if (!user)
        return res.status(400).json({
          msg: 'No account registered with this email',
        });

      // Compare registered password with entered password
      const pwdMatch = await bcrypt.compare(password, user.password);

      // If password do not match
      if (!pwdMatch)
        return res.status(400).json({ msg: 'Invalid Credentials' });
      
        //on login a random JWT token is generated for user authentication
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

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

      // If token is invalid 
      if (!token) return res.json(false);
      
      //verifying the token to check if it is valid
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
      
      //After JWT token is verified,check the user credentials
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);

      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
