const jwt = require("jsonwebtoken");

const generateRefreshToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3d",
  });
};

module.exports = generateRefreshToken;
