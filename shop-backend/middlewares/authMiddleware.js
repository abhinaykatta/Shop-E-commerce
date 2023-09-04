const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  if (
    req.headers?.authentication &&
    req.headers?.authentication?.startsWith("Bearer")
  ) {
    const tkn = req.headers.authentication.split(" ")[1];
    const decodedKey = jwt.verify(tkn, process.env.JWT_SECRET_KEY);
    const finduser = await User.findOne(decodedKey).select("-password");
    if (finduser) {
      res.status(200).json(finduser);
      next();
    } else {
      throw new Error("Bearer token not valid!!");
    }
  } else {
    throw new Error("No Authentication Headers!");
  }
};
