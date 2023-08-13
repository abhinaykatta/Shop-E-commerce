const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const generateRefreshToken = require("../config/generateRefreshToken");

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

const userLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.isPasswordMatched(password, user.password))) {
      const refreshToken = await generateRefreshToken(user?._id);
      const updateuser = await User.findByIdAndUpdate(
        user.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });

      const resuser = {
        _id: user?._id,
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        mobile: user?.mobile,
        token: await generateToken(user?._id),
      };

      res.json(resuser);
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = { userRegister, userLogin };
