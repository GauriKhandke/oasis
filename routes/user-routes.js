const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const auth = require('../middleware/auth');
const User = require('../models');

// Register new user
router.route('/api/signup').post(userController.signupUser);

// Login
router.route('/api/login').post(userController.loginUser);

//Authentication for valid token which returns boolean
router.route('/isValidToken').post(userController.checkValidToken);

//Authenticate user
router.get('/', auth , async (req, res) => {
	const user = await User.findById(req.user);
	console.log("User Id is " + req.user);
    res.json({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
  });
});

module.exports = router;
