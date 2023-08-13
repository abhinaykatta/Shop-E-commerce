const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//Controller to register user
const userRegister = asyncHandler(async (req, res) => {
  //console.log(req.body);

  const email = req.body.email;

  //find if user already exists

  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    //Create new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    //Throw error if user Exists!
    throw new Error("User Already Exists");
  }
  res.send();
});

module.exports = { userRegister };
