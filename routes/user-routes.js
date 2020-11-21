const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const auth = require('../middleware/auth');
const User = require('../models/user');

// Register new user
router.route('/api/signup').post(userController.signupUser);

// Login
router.route('/api/login').post(userController.loginUser);

//Authentication for valid token which returns boolean
router.route('/isValidToken').post(userController.checkValidToken);

//Authenticate user
router.get('/', auth , async (req, res) => {

  // Find User into database to authenticate user
	const user = await User.findById(req.user);

  // Send user information to client side
    res.json({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
  });
});

module.exports = router;
