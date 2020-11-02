const express = require("express");
const router = express.Router();
const bcrypt =require("bcryptjs");
const User = require("../models/userModel");

// Register new user
router.post("/signup", async ({body},res) =>{
    try {
      let { firstname, lastname, email, password , confirmPassword } = body;

        console.log("The signup list is : " + firstname,lastname,email)
      // Validations

      // validation for Empty Fields
      if(!firstname || !lastname || !email || !password || !confirmPassword){
        return res.status(400).json({ msg : "All fields are required!!"});
      }
      
      // validation for password length
      if(password.length < 8 ){
       return res.status(400).json({ msg : "Password should contain atleast 8 characters!!"});
      }
      
      // validation for matching password and confirm password
      if(password != confirmPassword){
        return res.status(400).json({ msg : "Password mismatch!!"});
      }
      
      // checking in the DB for unique email address
      const existingUser = await User.findOne({ email : email });
      
      // If user with email already exists
      if(existingUser)
        return res.status(400).json({ msg: "Email already exists!"});
      
      // hashing the password using bcrypt js
      const salt = await bcrypt.genSalt();
      const hashedPwd = await bcrypt.hash(password, salt);
      console.log(hashedPwd);
      
      // Create new user to register into db
      const newUser = new User({
        firstname,
        lastname,
        email,
        password : hashedPwd,
      });

      // saving the new user in the database
      const savedUser =await newUser.save();
      res.json(savedUser);
    }
    catch(err){
      res.status(500).json(err.message);
    }
});

module.exports = router;