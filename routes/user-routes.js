const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

// Register new user
router.route("/signup")
    .post(userController.signupUser);

// Login 
router.route("/login")
    .post(userController.loginUser);

module.exports = router;