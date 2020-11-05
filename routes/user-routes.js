const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const auth = require('../middleware/auth');

// Register new user
router.route('/api/signup').post(userController.signupUser);

// Login
router.route('/api/login').post(userController.loginUser);

//Authentication for valid token which returns boolean
router.route('/isValidToken').post(userController.checkValidToken);

//Authenticate user
router.route('/', auth).get(userController.getAuthenticatedUser);

module.exports = router;
